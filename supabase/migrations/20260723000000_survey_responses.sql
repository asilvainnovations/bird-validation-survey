-- supabase/migrations/20260723000000_survey_responses.sql
-- BIRD Validation Survey Database Schema
-- Updated: 2026-07-23 · Fully idempotent, aligned with SurveyWizard.tsx and survey-schema.ts

-- 1. Create the main responses table
create table if not exists public.survey_responses (
  id uuid default gen_random_uuid() primary key,
  
  -- Top-level indexed columns for fast dashboard filtering
  demo_province text,
  demo_category text,
  
  -- Consent and metadata
  -- SECURITY FIX (2026-07-30 audit): default changed from `true` to `false`.
  -- A safe-by-default column means a bug or missed code path fails closed
  -- (submission not counted as consented) rather than failing open. The
  -- Edge Function (survey-submit) always sets this explicitly after its own
  -- server-side re-validation of q01_consent_participate — it should never
  -- rely on this default, but the default itself should not paper over a
  -- future mistake by silently marking things as consented.
  consent_final boolean default false not null,
  submission_source text default 'web' not null,
  
  -- Rate limiting: a salted hash of the submitter's IP (never the raw IP —
  -- see survey-submit/index.ts). Used only to detect rapid repeat submissions;
  -- not reversible to an actual IP address, so it does not itself become a
  -- new piece of stored PII.
  submitter_ip_hash text,
  
  -- Full payload storage (260+ fields)
  response_data jsonb not null,
  
  -- Audit timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 1b. Idempotent upgrade path for an ALREADY-EXISTING table: CREATE TABLE IF NOT EXISTS
-- above is a no-op once the table exists, so an existing production table needs these
-- applied explicitly rather than picking up the new column/default from the block above.
alter table public.survey_responses
  add column if not exists submitter_ip_hash text;

alter table public.survey_responses
  alter column consent_final set default false;

-- Enforce at the database level (not just app code) that a row can never be
-- read/updated into an inconsistent state where consent_final is null.
alter table public.survey_responses
  alter column consent_final set not null;


-- 2. Add indexes for common dashboard queries
create index if not exists idx_survey_responses_province on public.survey_responses(demo_province);
create index if not exists idx_survey_responses_category on public.survey_responses(demo_category);
create index if not exists idx_survey_responses_created_at on public.survey_responses(created_at desc);
create index if not exists idx_survey_responses_consent on public.survey_responses(consent_final) where consent_final = true;
-- Supports the rate-limit check in survey-submit/index.ts, which runs on every submission.
create index if not exists idx_survey_responses_ip_hash_created on public.survey_responses(submitter_ip_hash, created_at desc);

-- 3. Enable Row Level Security (RLS)
alter table public.survey_responses enable row level security;

-- 4. Anon insert policy — SAFETY NET, not the current gatekeeper.
-- CORRECTION (2026-07-30 audit): the original comment here said "Frontend Edge
-- Function uses anon key", which is inaccurate — supabase/functions/survey-submit
-- actually inserts using SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS entirely.
-- That means the real consent gate today lives in survey-submit/index.ts's own
-- application-level check, not here. This policy exists so that IF a direct
-- client-side (anon-key) insert path is ever added later, it can't insert a
-- non-consented row — it does not currently protect against a bug in the Edge
-- Function's own logic, since service_role ignores RLS altogether.
drop policy if exists "Allow anonymous public submissions" on public.survey_responses;
create policy "Allow anonymous public submissions"
on public.survey_responses 
for insert 
to anon
with check (consent_final = true);

-- 5. Allow Service Role to read all data (Used by Analytics/MEL Dashboard & Admin)
drop policy if exists "Service role can read all responses" on public.survey_responses;
create policy "Service role can read all responses"
on public.survey_responses 
for select 
to service_role
using (true);

-- 6. Allow Service Role to update responses (For admin corrections if needed)
drop policy if exists "Service role can update responses" on public.survey_responses;
create policy "Service role can update responses"
on public.survey_responses 
for update 
to service_role
using (true);

-- 6a. SECURITY FIX (2026-07-31, Supabase Advisor: "Security Definer View"):
-- required before survey_response_stats can safely be switched to
-- security_invoker below. Without this policy, anon has zero SELECT access
-- on this table at all (only the insert policy above exists for anon) — so
-- flipping the view to security_invoker without this would make the public
-- dashboard's direct anon-key view queries return nothing. This policy
-- mirrors the view's own WHERE clause exactly, so the same rows that are
-- visible today stay visible — but now genuinely enforced by RLS at the
-- table level, not merely by the view's hardcoded filter.
drop policy if exists "Anon can read consented, anonymized responses" on public.survey_responses;
create policy "Anon can read consented, anonymized responses"
on public.survey_responses
for select
to anon, authenticated
using (
  consent_final = true
  and (response_data->>'q1_consent_anonymize')::boolean is true
);

-- 7. Drop existing view to prevent column order/name mismatch errors during replacement
-- (This does NOT delete any data from the underlying survey_responses table)
drop view if exists public.survey_response_stats cascade;

-- 8. Create a PII-stripped view for the public live analytics dashboard
-- This view safely exposes non-sensitive segmentation data and key metrics
--
-- PRIVACY FIX (2026-07-30 audit): `demo_position` (free-text job title) was
-- previously exposed here and granted to `anon` (i.e. publicly, unauthenticated,
-- to anyone on the internet). In a stakeholder survey with a small respondent
-- pool per province/category, a specific job title combined with province and
-- category is realistically re-identifying (DPA 2012 / general privacy-by-design
-- concern) even though no name or email is included. Removed entirely rather
-- than partially masked, since there is no safe generalization of a free-text
-- job title without a controlled vocabulary. `demo_expertise` (a multi-select
-- from a fixed list, not free text) is lower-risk and retained.
--
-- Additionally, rows are now only exposed here if the respondent explicitly
-- consented to anonymized aggregate use (q1_consent_anonymize = true), not
-- merely to participating in the survey (consent_final / q1_consent_participate).
-- These are two distinct consent questions in survey-schema.ts and should not be
-- conflated — a respondent can consent to participate without consenting to
-- have their (even de-identified) answers appear in a public-facing dashboard.
create view public.survey_response_stats
-- SECURITY FIX (2026-07-31, Supabase Advisor: "Security Definer View"):
-- without this, the view runs with the permissions of whoever created it
-- (an elevated role), not the actual querying user — meaning any RLS meant
-- to apply to the querying role is silently bypassed. security_invoker=true
-- makes this view respect the real querying user's own RLS, same as if they
-- queried survey_responses directly. Requires the companion "Anon can read
-- consented, anonymized responses" policy above to keep working correctly.
with (security_invoker = true)
as
select
  id,
  demo_province,
  demo_category,
  submission_source,
  created_at,
  
  -- Extract key non-PII segmentation fields
  response_data->'demo_expertise' as demo_expertise,
  
  -- Extract consent status (aligned with survey-schema.ts: q1_consent_participate)
  (response_data->>'q1_consent_participate')::boolean as consented_participate,
  (response_data->>'q1_consent_anonymize')::boolean as consented_anonymize,
  
  -- Extract strategic matrices for dashboard visualization
  response_data->'q10_matrix' as ieds_matrix,
  
  -- Extract computed BIRD scores (if appended by Edge Function or frontend)
  (response_data->>'bird_score_strength_ri')::numeric as score_strength_ri,
  (response_data->>'bird_score_opportunity_ri')::numeric as score_opportunity_ri,
  (response_data->>'bird_score_weakness_risk')::numeric as score_weakness_risk,
  (response_data->>'bird_score_threat_vi')::numeric as score_threat_vi

from public.survey_responses
where consent_final = true
  -- BUG FIX (2026-07-31): was q01_consent_anonymize (old padded field name).
  -- Since consent_final's own gate + api.ts store this under q1_consent_anonymize
  -- (no leading zero), this WHERE clause was silently excluding every real
  -- submission from the current submission flow — response_data->>'q01_...'
  -- is always NULL for data actually keyed under q1_..., and NULL::boolean
  -- is true evaluates to false, not NULL, so every row got filtered out.
  and (response_data->>'q1_consent_anonymize')::boolean is true;

-- 9. Grant read access to the public view for anon users (Live Dashboard)
grant select on public.survey_response_stats to anon;

-- 10. Add a trigger to automatically update the `updated_at` column
drop trigger if exists on_survey_response_updated on public.survey_responses;
drop function if exists public.handle_updated_at() cascade;

create function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger on_survey_response_updated
  before update on public.survey_responses
  for each row
  execute function public.handle_updated_at();
