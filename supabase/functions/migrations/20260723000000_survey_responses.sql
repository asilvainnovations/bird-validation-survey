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
  consent_final boolean default true not null,
  submission_source text default 'web' not null,
  
  -- Full payload storage (260+ fields)
  response_data jsonb not null,
  
  -- Audit timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Add indexes for common dashboard queries
create index if not exists idx_survey_responses_province on public.survey_responses(demo_province);
create index if not exists idx_survey_responses_category on public.survey_responses(demo_category);
create index if not exists idx_survey_responses_created_at on public.survey_responses(created_at desc);
create index if not exists idx_survey_responses_consent on public.survey_responses(consent_final) where consent_final = true;

-- 3. Enable Row Level Security (RLS)
alter table public.survey_responses enable row level security;

-- 4. Allow anonymous public submissions (Frontend Edge Function uses anon key)
drop policy if exists "Allow anonymous public submissions" on public.survey_responses;
create policy "Allow anonymous public submissions"
on public.survey_responses 
for insert 
to anon
with check (true);

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

-- 7. Drop existing view to prevent column order/name mismatch errors during replacement
-- (This does NOT delete any data from the underlying survey_responses table)
drop view if exists public.survey_response_stats cascade;

-- 8. Create a PII-stripped view for the public live analytics dashboard
-- This view safely exposes non-sensitive segmentation data and key metrics
create view public.survey_response_stats as
select
  id,
  demo_province,
  demo_category,
  submission_source,
  created_at,
  
  -- Extract key non-PII segmentation fields
  response_data->'demo_expertise' as demo_expertise,
  response_data->>'demo_position' as demo_position,
  
  -- Extract consent status (aligned with survey-schema.ts: q1_1_consent_participate)
  (response_data->>'q1_1_consent_participate')::boolean as consented_participate,
  (response_data->>'q1_2_consent_anonymize')::boolean as consented_anonymize,
  
  -- Extract strategic matrices for dashboard visualization
  response_data->'q10_matrix' as ieds_matrix,
  
  -- Extract computed BIRD scores (if appended by Edge Function or frontend)
  (response_data->>'bird_score_strength_ri')::numeric as score_strength_ri,
  (response_data->>'bird_score_opportunity_ri')::numeric as score_opportunity_ri,
  (response_data->>'bird_score_weakness_risk')::numeric as score_weakness_risk,
  (response_data->>'bird_score_threat_vi')::numeric as score_threat_vi

from public.survey_responses
where consent_final = true;

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
