-- Optional per-member photo for the /coaches cards. When NULL the card keeps
-- the coloured initials avatar. Values are either a site-relative path under
-- public/ (e.g. /images/coaches/naren.webp) or an absolute https URL.

ALTER TABLE team_members ADD COLUMN IF NOT EXISTS photo_url text;

UPDATE team_members
SET photo_url = $$/images/coaches/naren.webp$$, updated_at = now()
WHERE category = $$specialist$$ AND name = $$Naren$$;
