-- Moves the admin password from the ADMIN_PASSWORD Vercel env var into the
-- database, so it can be changed from inside /admin (Settings) without a
-- redeploy. lib/adminAuth.ts still falls back to ADMIN_PASSWORD if this
-- table is empty, so nothing breaks before this migration runs.
--
-- Single row (id fixed at 1). password_hash is "salt:scrypt-hash" hex,
-- produced by lib/adminAuth.ts's hashPassword() (Node crypto.scryptSync,
-- no extra dependency). Seeded here with the password requested at
-- migration time — change it from Settings afterward.

CREATE TABLE IF NOT EXISTS admin_credentials (
  id            integer PRIMARY KEY DEFAULT 1,
  password_hash text NOT NULL,
  updated_at    timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT admin_credentials_single_row CHECK (id = 1)
);

ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON admin_credentials FROM anon, authenticated;
GRANT ALL ON admin_credentials TO service_role;

INSERT INTO admin_credentials (id, password_hash)
VALUES (1, 'a5baa053d0e708f288f7b56f11ae0e30:7ea6434c1ea7386d91255c34f0a754182cc6077ca884d92a634ebe18a14ac1665eb79f3064c30c3f359ca0eb26c8834ee99a973d0d4624c5c70f8fb5da065011')
ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash, updated_at = now();
