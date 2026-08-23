-- visitor_logs has RLS enabled but no INSERT policy, so every write from
-- /api/track (anon key) was silently rejected with "new row violates
-- row-level security policy". The route doesn't check the insert error,
-- so it always reported {"ok":true} even though nothing was saved.
-- Safe to run any number of times.

alter table visitor_logs enable row level security;

drop policy if exists "public insert visitor logs" on visitor_logs;
create policy "public insert visitor logs"
  on visitor_logs for insert
  with check (true);
