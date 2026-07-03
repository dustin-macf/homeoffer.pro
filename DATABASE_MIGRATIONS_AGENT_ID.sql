-- Migration: Add agent_id column to users table
-- Purpose: Link buyers to their buyer's agents
-- Date: July 3, 2026

-- Step 1: Add agent_id column (foreign key to users.id)
ALTER TABLE users ADD COLUMN agent_id UUID NULL REFERENCES users(id) ON DELETE SET NULL;

-- Step 2: Create index for fast lookups
CREATE INDEX idx_users_agent_id ON users(agent_id);

-- Step 3: Verify
-- SELECT id, email, user_type, agent_id FROM users LIMIT 5;
