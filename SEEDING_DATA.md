# Test Data Seeding Guide

## Quick Start

To populate the marketplace with test properties, users, and offers:

### Step 1: Copy the SQL below
Go to your **Supabase Dashboard** → **SQL Editor** → **New Query**

### Step 2: Run this SQL

```sql
-- Insert Test Agent (Listing Agent)
INSERT INTO users (id, email, first_name, last_name, user_type, approved, created_at)
VALUES (
  gen_random_uuid(),
  'agent@homeoffer.pro',
  'Sarah',
  'Johnson',
  'agent',
  true,
  NOW()
) ON CONFLICT DO NOTHING;

-- Insert Test Buyer 1
INSERT INTO users (id, email, first_name, last_name, user_type, approved, created_at)
VALUES (
  gen_random_uuid(),
  'buyer1@homeoffer.pro',
  'John',
  'Smith',
  'buyer',
  true,
  NOW()
) ON CONFLICT DO NOTHING;

-- Insert Test Buyer 2
INSERT INTO users (id, email, first_name, last_name, user_type, approved, created_at)
VALUES (
  gen_random_uuid(),
  'buyer2@homeoffer.pro',
  'Emma',
  'Williams',
  'buyer',
  true,
  NOW()
) ON CONFLICT DO NOTHING;

-- Get Agent ID for properties
WITH agent_data AS (
  SELECT id FROM users WHERE email = 'agent@homeoffer.pro' LIMIT 1
)
-- Insert Test Property 1: Luxury Downtown Condo
INSERT INTO properties (
  id, address, city, state, zip, bedrooms, bathrooms, sqft,
  images, starting_offer, listing_agent_id, offer_period_days,
  offer_end_date, status, created_at
)
SELECT
  gen_random_uuid(),
  '456 Downtown Plaza',
  'San Francisco',
  'CA',
  '94102',
  3,
  2,
  2500,
  ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000'],
  500000,
  agent_data.id,
  12,
  NOW() + INTERVAL '12 days',
  'active',
  NOW()
FROM agent_data
WHERE NOT EXISTS (SELECT 1 FROM properties WHERE address = '456 Downtown Plaza');

-- Get Agent ID for properties
WITH agent_data AS (
  SELECT id FROM users WHERE email = 'agent@homeoffer.pro' LIMIT 1
)
-- Insert Test Property 2: Beachfront Villa
INSERT INTO properties (
  id, address, city, state, zip, bedrooms, bathrooms, sqft,
  images, starting_offer, listing_agent_id, offer_period_days,
  offer_end_date, status, created_at
)
SELECT
  gen_random_uuid(),
  '789 Coastal Drive',
  'Malibu',
  'CA',
  '90265',
  5,
  4,
  5000,
  ARRAY['https://images.unsplash.com/photo-1512917774080-9cbd6face401?w=1000'],
  1200000,
  agent_data.id,
  12,
  NOW() + INTERVAL '12 days',
  'active',
  NOW()
FROM agent_data
WHERE NOT EXISTS (SELECT 1 FROM properties WHERE address = '789 Coastal Drive');

-- Get Agent ID for properties
WITH agent_data AS (
  SELECT id FROM users WHERE email = 'agent@homeoffer.pro' LIMIT 1
)
-- Insert Test Property 3: Mountain Retreat
INSERT INTO properties (
  id, address, city, state, zip, bedrooms, bathrooms, sqft,
  images, starting_offer, listing_agent_id, offer_period_days,
  offer_end_date, status, created_at
)
SELECT
  gen_random_uuid(),
  '321 Alpine Ridge',
  'Boulder',
  'CO',
  '80301',
  4,
  3,
  3500,
  ARRAY['https://images.unsplash.com/photo-1570129477492-45c003d96f8a?w=1000'],
  800000,
  agent_data.id,
  12,
  NOW() + INTERVAL '12 days',
  'active',
  NOW()
FROM agent_data
WHERE NOT EXISTS (SELECT 1 FROM properties WHERE address = '321 Alpine Ridge');

-- Add Sample Offers for Property 1
WITH property_data AS (
  SELECT id FROM properties WHERE address = '456 Downtown Plaza' LIMIT 1
),
buyer_data AS (
  SELECT id FROM users WHERE email = 'buyer1@homeoffer.pro' LIMIT 1
)
INSERT INTO offers (id, property_id, buyer_id, amount, is_highest, created_at)
SELECT
  gen_random_uuid(),
  property_data.id,
  buyer_data.id,
  525000,
  true,
  NOW()
FROM property_data, buyer_data
WHERE NOT EXISTS (
  SELECT 1 FROM offers 
  WHERE amount = 525000 AND property_id = property_data.id
);

-- Add Sample Offers for Property 2
WITH property_data AS (
  SELECT id FROM properties WHERE address = '789 Coastal Drive' LIMIT 1
),
buyer_data AS (
  SELECT id FROM users WHERE email = 'buyer2@homeoffer.pro' LIMIT 1
)
INSERT INTO offers (id, property_id, buyer_id, amount, is_highest, created_at)
SELECT
  gen_random_uuid(),
  property_data.id,
  buyer_data.id,
  1250000,
  true,
  NOW()
FROM property_data, buyer_data
WHERE NOT EXISTS (
  SELECT 1 FROM offers 
  WHERE amount = 1250000 AND property_id = property_data.id
);

-- Approve Buyers for Properties
WITH agent_data AS (
  SELECT id FROM users WHERE email = 'agent@homeoffer.pro' LIMIT 1
),
buyer1_data AS (
  SELECT id FROM users WHERE email = 'buyer1@homeoffer.pro' LIMIT 1
),
prop1_data AS (
  SELECT id FROM properties WHERE address = '456 Downtown Plaza' LIMIT 1
)
INSERT INTO agent_approvals (
  id, property_id, buyer_id, listing_agent_id, approved, approved_at, created_at
)
SELECT
  gen_random_uuid(),
  prop1_data.id,
  buyer1_data.id,
  agent_data.id,
  true,
  NOW(),
  NOW()
FROM agent_data, buyer1_data, prop1_data
WHERE NOT EXISTS (
  SELECT 1 FROM agent_approvals
  WHERE buyer_id = buyer1_data.id AND property_id = prop1_data.id
);

-- Approve Buyer 2 for Property 2
WITH agent_data AS (
  SELECT id FROM users WHERE email = 'agent@homeoffer.pro' LIMIT 1
),
buyer2_data AS (
  SELECT id FROM users WHERE email = 'buyer2@homeoffer.pro' LIMIT 1
),
prop2_data AS (
  SELECT id FROM properties WHERE address = '789 Coastal Drive' LIMIT 1
)
INSERT INTO agent_approvals (
  id, property_id, buyer_id, listing_agent_id, approved, approved_at, created_at
)
SELECT
  gen_random_uuid(),
  prop2_data.id,
  buyer2_data.id,
  agent_data.id,
  true,
  NOW(),
  NOW()
FROM agent_data, buyer2_data, prop2_data
WHERE NOT EXISTS (
  SELECT 1 FROM agent_approvals
  WHERE buyer_id = buyer2_data.id AND property_id = prop2_data.id
);
```

### Step 3: Test the Marketplace

**Test Credentials:**

**Agent Login:**
- Email: `agent@homeoffer.pro`
- Password: Create via signup (or set manually)

**Buyer 1 Login:**
- Email: `buyer1@homeoffer.pro`
- Password: Create via signup

**Buyer 2 Login:**
- Email: `buyer2@homeoffer.pro`
- Password: Create via signup

### Step 4: Explore

1. **Browse Properties:** https://homeoffer-pro.vercel.app/properties
2. **View Offers:** Click any property to see live offers
3. **Buyer Dashboard:** https://homeoffer-pro.vercel.app/buyer (see your offers)
4. **Seller Dashboard:** https://homeoffer-pro.vercel.app/seller (manage listings)

---

## What You'll See

**3 Live Properties:**
1. Downtown Condo - $500k starting, $525k highest offer
2. Beachfront Villa - $1.2M starting, $1.25M highest offer
3. Mountain House - $800k starting, no offers yet

**Live Countdown Timers** - All properties have 12 days remaining

**Active Offers** - Buyers have submitted competitive offers

**Approved Buyers** - Buyers are pre-approved to make offers

---

## Notes

- Passwords are NOT pre-set. You must create accounts via signup flow first.
- Or, use Supabase to manually create auth accounts if needed
- Test data will remain until you manually delete it
- You can add more properties/offers by running the SQL again with different addresses

---

## Clean Up (Delete Test Data)

To remove all test data:

```sql
-- Delete all offers
DELETE FROM offers;

-- Delete all agent approvals
DELETE FROM agent_approvals;

-- Delete all properties
DELETE FROM properties;

-- Delete all users
DELETE FROM users;
```

**⚠️ WARNING: This deletes EVERYTHING. Only do this if you're starting fresh.**

---

Done! Your marketplace now looks FULL and is ready to demo! 🚀
