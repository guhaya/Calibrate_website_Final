-- CALIBRATE form builder: dynamic intake form fields, pricing rates, submissions.
-- Run this once in the Supabase SQL Editor for the project referenced by
-- NEXT_PUBLIC_SUPABASE_URL (Dashboard -> SQL Editor -> New query -> paste -> Run).

create extension if not exists "pgcrypto";

-- ─── Intake form fields (form builder) ───────────────────────────────
create table if not exists form_fields (
  id uuid primary key default gen_random_uuid(),
  order_index int not null default 0,
  section text,
  label text not null,
  help_text text,
  field_type text not null default 'text'
    check (field_type in ('text','textarea','email','phone','number','select','radio','checkbox','date','scale')),
  options jsonb not null default '[]'::jsonb,
  placeholder text,
  required boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists form_fields_order_idx on form_fields (order_index);

-- ─── Pricing rates (coaching plans/tiers) ────────────────────────────
create table if not exists pricing_rates (
  id uuid primary key default gen_random_uuid(),
  order_index int not null default 0,
  name text not null,
  tagline text,
  price numeric not null default 0,
  currency text not null default 'INR',
  billing_note text,
  discount_label text,
  features jsonb not null default '[]'::jsonb,
  highlight boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pricing_rates_order_idx on pricing_rates (order_index);

-- ─── Form submissions (client applications) ──────────────────────────
create table if not exists form_submissions (
  id uuid primary key default gen_random_uuid(),
  answers jsonb not null default '{}'::jsonb,
  name text,
  email text,
  phone text,
  status text not null default 'new' check (status in ('new','reviewed','archived')),
  created_at timestamptz not null default now()
);

create index if not exists form_submissions_created_idx on form_submissions (created_at desc);

-- ─── Row Level Security ───────────────────────────────────────────────
-- Anon (browser) key: can read active fields/rates and insert submissions only.
-- All writes to form_fields/pricing_rates and all reads of form_submissions
-- go through server API routes using the service role key, which bypasses RLS.

alter table form_fields enable row level security;
alter table pricing_rates enable row level security;
alter table form_submissions enable row level security;

drop policy if exists "public read active form fields" on form_fields;
create policy "public read active form fields"
  on form_fields for select
  using (active = true);

drop policy if exists "public read active pricing rates" on pricing_rates;
create policy "public read active pricing rates"
  on pricing_rates for select
  using (active = true);

drop policy if exists "public insert submissions" on form_submissions;
create policy "public insert submissions"
  on form_submissions for insert
  with check (true);

-- ─── Table-level grants ───────────────────────────────────────────────
-- RLS policies only take effect once the role has the underlying SQL
-- privilege. Tables created via the SQL Editor (unlike the dashboard
-- table UI) don't get these by default, so grant them explicitly.

grant usage on schema public to anon, authenticated, service_role;

grant select on form_fields to anon, authenticated;
grant select on pricing_rates to anon, authenticated;
grant insert on form_submissions to anon, authenticated;

grant all on form_fields to service_role;
grant all on pricing_rates to service_role;
grant all on form_submissions to service_role;

-- ─── Seed data: current hardcoded intake questions and rates ─────────
-- Guarded so re-running this migration never duplicates rows.
insert into form_fields (order_index, section, label, help_text, field_type, options, placeholder, required, active)
select * from (values
  (1, 'About You', 'Full name', null, 'text', '[]'::jsonb, 'Jane Doe', true, true),
  (2, 'About You', 'Email address', null, 'email', '[]'::jsonb, 'you@email.com', true, true),
  (3, 'About You', 'Phone number (WhatsApp)', 'We use this for weekly check-ins.', 'phone', '[]'::jsonb, '+91 98765 43210', true, true),
  (4, 'About You', 'Age', null, 'number', '[]'::jsonb, '28', true, true),
  (5, 'Goals', 'Primary goal', null, 'select', '["Fat loss","Muscle gain","Body recomposition","Athletic performance"]'::jsonb, null, true, true),
  (6, 'Goals', 'What have you tried before?', 'Gym programmes, apps, other coaches, anything.', 'textarea', '[]'::jsonb, null, false, true),
  (7, 'Lifestyle', 'Occupation', null, 'text', '[]'::jsonb, 'Software Engineer', false, true),
  (8, 'Lifestyle', 'Average hours worked per day', null, 'number', '[]'::jsonb, '10', false, true),
  (9, 'Lifestyle', 'Do you have gym access?', null, 'radio', '["Full gym","Home gym","Bodyweight only"]'::jsonb, null, true, true),
  (10, 'Lifestyle', 'Days per week you can train', null, 'select', '["3","4","5","6"]'::jsonb, null, true, true)
) as seed(order_index, section, label, help_text, field_type, options, placeholder, required, active)
where not exists (select 1 from form_fields);

insert into pricing_rates (order_index, name, tagline, price, currency, billing_note, discount_label, features, highlight, active)
select * from (values
  (1, 'Monthly', 'Flexible commitment', 25000::numeric, 'INR', 'per month, minimum 3-month commitment', null,
    '["Calibration Assessment Report","Custom training programme","Personalised nutrition protocol","Weekly check-in & adjustments","WhatsApp coach support"]'::jsonb, false, true),
  (2, 'Quarterly', 'Best value', 65000::numeric, 'INR', 'billed upfront, full 3-month programme', 'Save ₹10,000',
    '["Everything in Monthly","Quarterly re-calibration audit","Priority application review","Saves ₹10,000 vs monthly"]'::jsonb, true, true)
) as seed(order_index, name, tagline, price, currency, billing_note, discount_label, features, highlight, active)
where not exists (select 1 from pricing_rates);
