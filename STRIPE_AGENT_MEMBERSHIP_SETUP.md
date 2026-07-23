# Stripe Agent Membership Launch Checklist

The application code supports a $7/month agent subscription, Stripe-hosted Checkout, Stripe's customer billing portal, and webhook-synchronized membership status.

## 1. Apply the database migration

Run `DATABASE_MIGRATIONS_AGENT_NETWORK.sql` once in the Supabase SQL editor.

This creates:

- agent membership records;
- referral codes and sponsor relationships;
- closed-transaction and two-tier reward ledgers;
- Stripe webhook idempotency records; and
- row-level security policies.

## 2. Create the Stripe product

In Stripe live mode:

1. Create a product named **HomeOffer.pro Agent Membership**.
2. Add a recurring price of **$7.00 USD per month**.
3. Copy the live price ID beginning with `price_`.
4. Enable the Stripe Customer Portal for payment-method updates and cancellation.

## 3. Add production environment variables

Set these server-side values in the hosting provider:

- `STRIPE_SECRET_KEY`
- `STRIPE_AGENT_PRICE_ID`
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL=https://homeoffer.pro`

The existing public Supabase URL and anonymous key remain required. Never expose the Stripe secret, webhook secret, or Supabase service-role key in browser code.

## 4. Register the webhook

Create a Stripe webhook endpoint:

`https://homeoffer.pro/api/stripe/webhook`

Subscribe it to:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Copy the signing secret beginning with `whsec_` into `STRIPE_WEBHOOK_SECRET`.

## 5. Connect the business bank account

In the Stripe Dashboard, open **Settings → Bank accounts and currencies** (or **Payout settings**), add the HomeOffer.pro business bank account, complete verification, and choose the payout schedule.

Do not put bank routing or account numbers in the website repository, Supabase, support messages, or the escrow-demand form.

## 6. Test before enabling live enrollment

1. Complete one test-mode subscription with a Stripe test card.
2. Confirm the webhook changes the membership to `active`.
3. Open the Customer Portal and confirm cancellation and payment-method updates.
4. Trigger a failed renewal and confirm the dashboard shows the updated status.
5. Repeat one real $7 live-mode transaction, then refund it if appropriate.

## Compensation safety gate

The software records transaction and network rewards but does not pay them automatically. Keep all rewards in `pending` or `broker_review` until California counsel and the responsible broker approve:

- the licensed compensation path;
- the underlying services and agreements;
- the listing addendum and buyer-facing compensation disclosure;
- the escrow instruction; and
- the agent's license and broker affiliation.

Transaction-based compensation to a California salesperson must flow through the responsible broker. Do not use Stripe Connect or direct agent payouts until counsel approves the complete structure.
