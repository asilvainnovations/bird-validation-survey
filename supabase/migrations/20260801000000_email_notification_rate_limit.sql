-- supabase/migrations/20260801000000_email_notification_rate_limit.sql
-- BIRD 2026-2035 · Rate-limit tracking for the email-notifications Edge Function
--
-- WHY THIS EXISTS: email-notifications is called directly from browser-side
-- code (src/hooks/useAuth.ts, src/lib/supabase.ts) using the public anon key
-- — meaning anyone who extracts that key from the app's JS bundle (trivial,
-- since it's meant to be public) can call this endpoint directly, with no
-- authentication check on who's asking. Left unrestricted, this is a real
-- abuse vector: unlimited outbound emails via this project's Resend account.
--
-- Deno Edge Functions are stateless between invocations, so a real rate
-- limit needs persistent storage — this table, queried the same way
-- survey-submit already rate-limits against survey_responses (count of
-- recent rows for a given salted IP hash, within a time window).

create table if not exists public.email_notification_log (
  id uuid primary key default gen_random_uuid(),
  ip_hash text not null,
  email_type text,
  created_at timestamptz not null default now()
);

create index if not exists idx_email_notification_log_ip_hash_created
  on public.email_notification_log (ip_hash, created_at);

-- Locked down entirely: this is internal bookkeeping, never meant to be
-- readable or writable by anon/authenticated at all. RLS enabled with zero
-- policies means only the service_role (which bypasses RLS by design) can
-- touch this table — exactly what the Edge Function uses.
alter table public.email_notification_log enable row level security;

-- Housekeeping: rows older than the rate-limit window are useless. This
-- keeps the table small indefinitely without needing a scheduled job —
-- cheap enough to run on every write given the tiny row size here.
create or replace function public.prune_email_notification_log()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from public.email_notification_log
  where created_at < now() - interval '1 day';
  return new;
end;
$$;

drop trigger if exists trg_prune_email_notification_log on public.email_notification_log;
create trigger trg_prune_email_notification_log
  after insert on public.email_notification_log
  execute function public.prune_email_notification_log();
