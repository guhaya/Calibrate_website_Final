-- Team/coach roster shown on /coaches, editable from /admin (new "Team"
-- section). Previously hardcoded as module-level arrays in
-- app/coaches/page.tsx; this seeds those exact values so nothing changes
-- visually until the coach edits something.
--
-- One flexible table across all three categories rather than three tables,
-- since the fields overlap heavily (name/role/description/color/initials)
-- and only a few are category-specific (bio/credentials/stats for the head
-- coach; experience/specialisation for trainers; credentials_line for
-- specialists).
--
-- All text literals below use dollar-quoting ($$...$$) instead of single
-- quotes, so apostrophes in names/copy never need escaping.

CREATE TABLE IF NOT EXISTS team_members (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category         text NOT NULL CHECK (category IN ('head_coach', 'trainer', 'specialist')),
  order_index      integer NOT NULL DEFAULT 0,
  name             text NOT NULL,
  handle           text,
  role             text,
  location         text,
  experience       text,
  specialisation   text,
  credentials_line text,
  description      text,
  bio              text[],
  credentials      text[],
  stats            jsonb,
  color            text,
  initials         text,
  active           boolean NOT NULL DEFAULT true,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS team_members_order_idx ON team_members (category, order_index);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public read active team members" ON team_members;
CREATE POLICY "public read active team members"
  ON team_members FOR SELECT
  USING (active = true);

GRANT SELECT ON team_members TO anon, authenticated;
GRANT ALL ON team_members TO service_role;

INSERT INTO team_members
  (category, order_index, name, handle, role, location, experience, specialisation, credentials_line, description, bio, credentials, stats, color, initials, active)
SELECT $$head_coach$$, 0, $$Guhayavarman$$, $$@fitguhay$$, $$Founder & Head Coach$$, $$Chennai, Tamil Nadu$$, NULL, NULL, NULL, NULL,
  ARRAY[
    $$I started CALIBRATE because I kept seeing the same pattern: smart, motivated people failing to reach their goals, not from lack of effort, but from lack of the right system. Engineers, founders, product managers putting in the work but getting nowhere.$$,
    $$The fitness industry profits from confusion. CALIBRATE is built on the opposite principle, the same data-driven frameworks used in precision engineering, applied to body optimisation. Your body is a process. Processes can be optimised.$$
  ],
  ARRAY[
    $$Level 4 Personal Training Certification$$,
    $$Sports Nutrition Specialist$$,
    $$DMAIC-certified performance protocol$$,
    $$Competitive athlete background$$,
    $$Based in Chennai, Tamil Nadu$$
  ],
  $$[{"value":"10+","label":"Active clients"},{"value":"5+","label":"Years coaching"},{"value":"12+","label":"Countries reached"},{"value":"200+","label":"Transformations"}]$$::jsonb,
  $$#FFDE02$$, $$G$$, true
WHERE NOT EXISTS (SELECT 1 FROM team_members);

INSERT INTO team_members
  (category, order_index, name, handle, role, location, experience, specialisation, credentials_line, description, bio, credentials, stats, color, initials, active)
SELECT $$trainer$$, 0, $$Ashok$$, NULL, $$Personal Trainer - Certified Strength & Conditioning Coach$$, $$Bangalore$$, $$10+ years$$, $$Strength & Conditioning$$, NULL,
  $$Ashok brings over a decade of strength and conditioning expertise to CALIBRATE. As an online trainer, he designs progressive programming for clients across all levels, from foundational strength work to performance-focused conditioning cycles.$$,
  NULL, NULL, NULL, $$#FFDE02$$, $$A$$, true
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = $$Ashok$$);

INSERT INTO team_members
  (category, order_index, name, handle, role, location, experience, specialisation, credentials_line, description, bio, credentials, stats, color, initials, active)
SELECT $$trainer$$, 1, $$Rajavel$$, NULL, $$Certified Personal Trainer$$, $$Mumbai$$, $$8+ years$$, $$Personal Training$$, NULL,
  $$Rajavel is a certified personal trainer with eight years of experience working with clients across diverse goals and backgrounds. His coaching is grounded in building sustainable habits and consistent progress, no extremes, no shortcuts.$$,
  NULL, NULL, NULL, $$#22C55E$$, $$R$$, true
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = $$Rajavel$$);

INSERT INTO team_members
  (category, order_index, name, handle, role, location, experience, specialisation, credentials_line, description, bio, credentials, stats, color, initials, active)
SELECT $$trainer$$, 2, $$Balaji$$, NULL, $$NASM CPT - Online Trainer$$, $$Coimbatore$$, $$5+ years$$, $$NASM Certified Training$$, NULL,
  $$Balaji is NASM-certified and specialises in online coaching, delivering structured, evidence-based programmes remotely. His methodical approach ensures clients get expert-level training regardless of where they are based.$$,
  NULL, NULL, NULL, $$#3B82F6$$, $$B$$, true
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = $$Balaji$$);

INSERT INTO team_members
  (category, order_index, name, handle, role, location, experience, specialisation, credentials_line, description, bio, credentials, stats, color, initials, active)
SELECT $$specialist$$, 0, $$Naren$$, NULL, $$Nutritionist & Fitness Data Analyst$$, $$Malaysia$$, NULL, NULL, $$Nutritionist - Fitness Data Analyst - 10+ years$$,
  $$Naren combines nutritional expertise with data-driven fitness analysis, a rare combination that lets him translate raw client metrics into precise dietary strategies. With over a decade of experience, he handles complex nutrition protocols and performance-level goals.$$,
  NULL, NULL, NULL, $$#A855F7$$, $$N$$, true
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = $$Naren$$);

INSERT INTO team_members
  (category, order_index, name, handle, role, location, experience, specialisation, credentials_line, description, bio, credentials, stats, color, initials, active)
SELECT $$specialist$$, 1, $$Karthika D'Souza$$, NULL, $$Dietician & Clinical Health Analyst$$, $$Malaysia$$, NULL, NULL, $$Registered Dietician - Clinical Health Analyst - 10+ years$$,
  $$Karthika brings clinical-grade expertise to the team, managing medical dietary requirements, health risk analysis, and evidence-based nutrition intervention for clients who need specialist-level dietary support.$$,
  NULL, NULL, NULL, $$#F97316$$, $$K$$, true
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE name = $$Karthika D'Souza$$);
