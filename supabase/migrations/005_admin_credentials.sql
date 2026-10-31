-- Moves the admin password from the ADMIN_PASSWORD Vercel env var into the
-- database, so it can be changed from inside /admin (Settings) without a
-- redeploy. lib/adminAuth.ts still falls back to ADMIN_PASSWORD if this
-- table is empty, so nothing breaks before this migration runs.
--
-- Single row (id fixed at 1). password_hash is "salt:scrypt-hash" hex,
-- produced by lib/adminAuth.ts's hashPassword() (Node crypto.scryptSync,
-- no extra dependency). No row is seeded: re-running this migration must
-- never replace the live password, and a credential does not belong in a
-- public repo. Until a row exists, ADMIN_PASSWORD applies.

CREATE TABLE IF NOT EXISTS admin_credentials (
  id            integer PRIMARY KEY DEFAULT 1,
  password_hash text NOT NULL,
  updated_at    timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT admin_credentials_single_row CHECK (id = 1)
);

ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON admin_credentials FROM anon, authenticated;
GRANT ALL ON admin_credentials TO service_role;
