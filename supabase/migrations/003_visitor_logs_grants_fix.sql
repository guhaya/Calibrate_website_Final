-- Same root cause as 002_grants_fix.sql, applied to the pre-existing
-- visitor_logs table: it has no grants either, so /api/track (anon insert)
-- and /api/admin/visitors (service_role select, which the admin login
-- screen piggybacks on) both fail with "permission denied". This is why
-- admin login shows "Incorrect password" even with the correct password.
-- Safe to run any number of times.

grant insert on visitor_logs to anon, authenticated;
grant all on visitor_logs to service_role;
