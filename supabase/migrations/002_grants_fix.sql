-- Fixes "permission denied for table form_fields" (and same for
-- pricing_rates/form_submissions). The SQL Editor doesn't auto-grant
-- table privileges to anon/service_role the way the dashboard table UI
-- does, so RLS policies were being blocked before they even ran.
-- Safe to run any number of times.

grant usage on schema public to anon, authenticated, service_role;

grant select on form_fields to anon, authenticated;
grant select on pricing_rates to anon, authenticated;
grant insert on form_submissions to anon, authenticated;

grant all on form_fields to service_role;
grant all on pricing_rates to service_role;
grant all on form_submissions to service_role;
