-- Fix 1: Replace the live view to match the corrected migration on disk.
-- The live DB view still uses q01_ field names (which never match real
-- submissions keyed under q1_) and exposes demo_position (free-text PII).
-- This brings the live view in line with supabase/migrations/20260723000000_survey_responses.sql.

drop view if exists public.survey_response_stats cascade;

create view public.survey_response_stats
with (security_invoker = true)
as
select
  id,
  demo_province,
  demo_category,
  submission_source,
  created_at,
  response_data->'demo_expertise' as demo_expertise,
  (response_data->>'q1_consent_participate')::boolean as consented_participate,
  (response_data->>'q1_consent_anonymize')::boolean as consented_anonymize,
  response_data->'q10_matrix' as ieds_matrix,
  (response_data->>'bird_score_strength_ri')::numeric as score_strength_ri,
  (response_data->>'bird_score_opportunity_ri')::numeric as score_opportunity_ri,
  (response_data->>'bird_score_weakness_risk')::numeric as score_weakness_risk,
  (response_data->>'bird_score_threat_vi')::numeric as score_threat_vi
from public.survey_responses
where consent_final = true
  and (response_data->>'q1_consent_anonymize')::boolean is true;

grant select on public.survey_response_stats to anon;

-- Fix 2: Replace the overly permissive anon INSERT policy.
-- The live policy "Allow anonymous public submissions" has WITH CHECK (true),
-- meaning anyone can insert any row directly via the anon key -- bypassing
-- the consent gate that only exists in the edge function. Replace with
-- consent_final = true check so direct anon inserts also require consent.
-- (The edge function uses service_role which bypasses RLS, so its own
-- consent check is the real gatekeeper, but this closes the direct-insert
-- hole.)
drop policy if exists "Allow anonymous public submissions" on public.survey_responses;
create policy "Allow anonymous public submissions"
on public.survey_responses
for insert
to anon
with check (consent_final = true);

-- Fix 3: Remove the overly broad "Allow public read access for dashboard"
-- policy that grants anon SELECT on ALL rows (including non-consented,
-- non-anonymized) via the base table. The view above already provides
-- the only public read path that should exist, and it filters to
-- consented+anonymized rows only.
drop policy if exists "Allow public read access for dashboard" on public.survey_responses;

-- Fix 4: Drop "Allow service role to insert" -- service_role bypasses RLS
-- entirely, so this policy is a no-op that only adds confusion.
drop policy if exists "Allow service role to insert" on public.survey_responses;