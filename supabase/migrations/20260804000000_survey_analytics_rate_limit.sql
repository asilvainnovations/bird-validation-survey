-- supabase/migrations/20260804000000_survey_analytics_rate_limit.sql
-- BIRD 2026-2035 · Rate-limit tracking for the survey-analytics Edge Function
--
-- WHY THIS EXISTS (found during 2026-08-04 audit): survey-analytics runs a
-- full aggregation query across survey_responses on every call, is publicly
-- reachable with no authentication (by design — it powers the public
-- dashboard), and had zero rate limiting at all, unlike survey-submit,
-- email-notifications, and ai-strategy-assistant, which all already have
-- this same protection. Same pattern as those: a dedicated table, since
-- Edge Functions are stateless between invocations and this endpoint has no
-- natural per-call row to count against otherwise.

create table if not exists public.analytics_rate_limit_log (
  id uuid primary key default gen_random_uuid(),
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_analytics_rate_limit_log_ip_hash_created
  on public.analytics_rate_limit_log (ip_hash, created_at);

alter table public.analytics_rate_limit_log enable row level security;
-- Locked down entirely: internal bookkeeping only. RLS enabled with zero
-- policies means only service_role (which bypasses RLS) can touch this.

create or replace function public.prune_analytics_rate_limit_log()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from public.analytics_rate_limit_log
  where created_at < now() - interval '1 day';
  return new;
end;
$$;

drop trigger if exists trg_prune_analytics_rate_limit_log on public.analytics_rate_limit_log;
create trigger trg_prune_analytics_rate_limit_log
  after insert on public.analytics_rate_limit_log
  execute function public.prune_analytics_rate_limit_log();
