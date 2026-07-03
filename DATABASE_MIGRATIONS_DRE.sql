-- Migration: Add California DRE License Number to Users
-- Purpose: Unique identifier for real estate agents
-- Date: July 3, 2026

-- Step 1: Add DRE license fields to users table
ALTER TABLE users ADD COLUMN dre_license_number VARCHAR(20) NULL UNIQUE;
ALTER TABLE users ADD COLUMN dre_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN dre_verified_at TIMESTAMP NULL;
ALTER TABLE users ADD COLUMN broker_name VARCHAR(255) NULL;
ALTER TABLE users ADD COLUMN broker_dre_number VARCHAR(20) NULL;

-- Step 2: Create index for fast lookups
CREATE INDEX idx_users_dre_license ON users(dre_license_number);

-- Step 3: Add agent_dre_lookup function for buyers to find agents
CREATE OR REPLACE FUNCTION find_agent_by_dre(dre_num VARCHAR)
RETURNS TABLE (
  id UUID,
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR,
  phone_number VARCHAR,
  dre_license_number VARCHAR,
  dre_verified BOOLEAN,
  broker_name VARCHAR,
  user_type VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.first_name,
    u.last_name,
    u.email,
    u.phone_number,
    u.dre_license_number,
    u.dre_verified,
    u.broker_name,
    u.user_type
  FROM users u
  WHERE u.dre_license_number = dre_num
    AND u.user_type = 'agent'
    AND u.dre_verified = TRUE;
END;
$$ LANGUAGE plpgsql;

-- Step 4: Verification queries
-- SELECT * FROM users WHERE user_type = 'agent' AND dre_verified = TRUE ORDER BY first_name;
-- SELECT * FROM find_agent_by_dre('12345678');

-- Step 5: Example data update (uncomment to use)
-- UPDATE users SET dre_license_number = '12345678', dre_verified = TRUE WHERE email = 'agent@example.com';
