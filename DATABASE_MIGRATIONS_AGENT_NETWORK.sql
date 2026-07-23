-- HomeOffer.pro agent membership, production, and two-tier network ledger
-- Run once in the Supabase SQL editor before enabling Stripe checkout.
-- Rewards are records only. No trigger in this migration pays an agent.

create extension if not exists pgcrypto;

alter table public.users
  add column if not exists referral_code text,
  add column if not exists referred_by_agent_id uuid references public.users(id) on delete set null;

update public.users
set referral_code = upper(substr(md5(id::text), 1, 8))
where user_type = 'agent' and referral_code is null;

create unique index if not exists users_referral_code_unique
  on public.users (referral_code)
  where referral_code is not null;

create index if not exists users_referred_by_agent_idx
  on public.users (referred_by_agent_id);

create table if not exists public.agent_memberships (
  user_id uuid primary key references public.users(id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  stripe_price_id text,
  status text not null default 'incomplete'
    check (status in (
      'incomplete', 'incomplete_expired', 'trialing', 'active',
      'past_due', 'canceled', 'unpaid', 'paused'
    )),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.agent_transactions (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid not null references public.users(id) on delete restrict,
  property_id uuid references public.properties(id) on delete set null,
  escrow_number text,
  closed_at date,
  sale_price numeric(14, 2) check (sale_price is null or sale_price >= 0),
  platform_fee numeric(14, 2) not null default 0 check (platform_fee >= 0),
  agent_compensation numeric(14, 2) not null default 0 check (agent_compensation >= 0),
  status text not null default 'pending'
    check (status in ('pending', 'broker_approved', 'paid', 'void')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists agent_transactions_agent_idx
  on public.agent_transactions (agent_id, closed_at desc);

create table if not exists public.agent_rewards (
  id uuid primary key default gen_random_uuid(),
  beneficiary_agent_id uuid not null references public.users(id) on delete restrict,
  source_agent_id uuid not null references public.users(id) on delete restrict,
  transaction_id uuid references public.agent_transactions(id) on delete set null,
  tier smallint not null check (tier in (1, 2)),
  amount numeric(12, 2) not null check (amount >= 0),
  status text not null default 'pending'
    check (status in ('pending', 'broker_review', 'approved', 'paid', 'void')),
  broker_name text,
  broker_approved_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (beneficiary_agent_id, source_agent_id, transaction_id, tier)
);

create index if not exists agent_rewards_beneficiary_idx
  on public.agent_rewards (beneficiary_agent_id, status);

create table if not exists public.stripe_webhook_events (
  event_id text primary key,
  event_type text not null,
  received_at timestamptz not null default now(),
  processed_at timestamptz
);

alter table public.agent_memberships enable row level security;
alter table public.agent_transactions enable row level security;
alter table public.agent_rewards enable row level security;
alter table public.stripe_webhook_events enable row level security;

drop policy if exists "Agents read own membership" on public.agent_memberships;
create policy "Agents read own membership"
  on public.agent_memberships for select
  using (auth.uid() = user_id);

drop policy if exists "Agents read own transactions" on public.agent_transactions;
create policy "Agents read own transactions"
  on public.agent_transactions for select
  using (auth.uid() = agent_id);

drop policy if exists "Agents read own reward ledger" on public.agent_rewards;
create policy "Agents read own reward ledger"
  on public.agent_rewards for select
  using (auth.uid() = beneficiary_agent_id);

-- An agent may choose a sponsor once. This does not establish payment eligibility.
create or replace function public.claim_agent_sponsor(sponsor_code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  current_profile public.users%rowtype;
  sponsor_id uuid;
begin
  select * into current_profile
  from public.users
  where id = auth.uid()
  for update;

  if current_profile.id is null or current_profile.user_type <> 'agent' then
    raise exception 'Agent account required';
  end if;

  if current_profile.referred_by_agent_id is not null then
    raise exception 'A sponsor is already assigned';
  end if;

  select id into sponsor_id
  from public.users
  where referral_code = upper(trim(sponsor_code))
    and user_type = 'agent';

  if sponsor_id is null then
    raise exception 'Sponsor code not found';
  end if;

  if sponsor_id = auth.uid() then
    raise exception 'An agent cannot sponsor themselves';
  end if;

  update public.users
  set referred_by_agent_id = sponsor_id
  where id = auth.uid();

  return sponsor_id;
end;
$$;

grant execute on function public.claim_agent_sponsor(text) to authenticated;

-- Backfill codes for newly-created agents and keep updated_at columns current.
create or replace function public.set_agent_referral_code()
returns trigger
language plpgsql
as $$
begin
  if new.user_type = 'agent' and new.referral_code is null then
    new.referral_code := upper(substr(md5(new.id::text), 1, 8));
  end if;
  return new;
end;
$$;

drop trigger if exists users_set_agent_referral_code on public.users;
create trigger users_set_agent_referral_code
before insert or update of user_type on public.users
for each row execute function public.set_agent_referral_code();

-- IMPORTANT OPERATING RULES
-- 1. Insert transactions and rewards only from a trusted admin workflow.
-- 2. Keep rewards pending until license, responsible broker, written agreement,
--    transaction eligibility, and RESPA/state-law review are documented.
-- 3. Pay transaction compensation through the responsible broker.
-- 4. Never expose SUPABASE_SERVICE_ROLE_KEY in browser code.
