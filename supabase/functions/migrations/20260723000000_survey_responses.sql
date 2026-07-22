-- ============================================================================
-- BIRD 2026-2035 Validation Survey Database Schema
-- Target: Supabase PostgreSQL
-- Compliance: DPA 2012 (Philippines) - PII isolation and strict RLS
-- ============================================================================

-- 1. Create the main survey_responses table
-- We use a hybrid approach: explicit columns for high-frequency filtering/indexing,
-- and a JSONB column for the flexible 150+ field survey payload.
CREATE TABLE IF NOT EXISTS public.survey_responses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    
    -- Core filtering fields (extracted for fast indexing)
    demo_province text,
    demo_category text,
    consent_final boolean DEFAULT false,
    
    -- Full payload storage (matches SurveySchemaType from survey-schema.ts)
    response_data jsonb DEFAULT '{}'::jsonb NOT NULL,
    
    -- Metadata
    submission_source text DEFAULT 'web' -- e.g., 'web', 'mobile', 'kiosk'
);

-- 2. Create Indexes for Performance
-- Optimizes dashboard filtering and MEL reporting
CREATE INDEX IF NOT EXISTS idx_survey_responses_province ON public.survey_responses(demo_province);
CREATE INDEX IF NOT EXISTS idx_survey_responses_category ON public.survey_responses(demo_category);
CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at ON public.survey_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_survey_responses_consent ON public.survey_responses(consent_final) WHERE consent_final = true;

-- 3. Row-Level Security (RLS)
-- DPA 2012 Compliance: Ensure data is protected at the database level
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow anyone (including anonymous users) to INSERT a response
-- This is required for the public-facing survey to work without login
CREATE POLICY "Allow public insert for survey responses" 
ON public.survey_responses 
FOR INSERT 
WITH CHECK (true);

-- Policy 2: Allow authenticated users (admins/MEL team) to READ responses
-- Prevents public scraping of survey data
CREATE POLICY "Allow authenticated read for survey responses" 
ON public.survey_responses 
FOR SELECT 
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Policy 3: Allow service_role (Edge Functions) to UPDATE/DELETE if needed for moderation
CREATE POLICY "Allow service role full access" 
ON public.survey_responses 
FOR ALL 
USING (auth.role() = 'service_role') 
WITH CHECK (auth.role() = 'service_role');

-- 4. Create PII-Stripped View for MEL Dashboard
-- This view explicitly excludes sensitive fields (name, email, organization) 
-- to ensure safe querying by dashboard applications or BI tools.
CREATE OR REPLACE VIEW public.survey_response_stats AS
SELECT 
    id,
    created_at,
    demo_province,
    demo_category,
    submission_source,
    
    -- Extract key metrics directly from the JSONB payload for easy dashboard querying
    (response_data->>'q0_3_systems_thinking_value')::numeric AS systems_thinking_value,
    (response_data->>'q10_1_ieds_preference')::text AS ieds_preference,
    (response_data->>'q12_6_vision_clarity')::numeric AS vision_clarity_score,
    (response_data->>'q13_2_targets_realistic')::numeric AS targets_realistic_score,
    
    -- Example: Extract a specific SWOT score if needed for aggregation
    (response_data->>'q_s1_halal_legitimacy_impact')::numeric AS s1_halal_impact,
    (response_data->>'q_s1_halal_legitimacy_likelihood')::numeric AS s1_halal_likelihood
    
    -- NOTE: demo_name, demo_email, and demo_organization are intentionally OMITTED
FROM public.survey_responses
WHERE consent_final = true;

-- 5. Secure the View
-- Ensure the view inherits the same RLS restrictions as the base table
ALTER VIEW public.survey_response_stats SET (security_invoker = on);

-- 6. Add Helpful Comments for Future Developers
COMMENT ON TABLE public.survey_responses IS 'Stores all BIRD 2026-2035 Validation Survey submissions. Full payload is in response_data (jsonb).';
COMMENT ON COLUMN public.survey_responses.response_data IS 'JSONB object matching the Zod SurveySchemaType. Contains all 16 sections of the survey.';
COMMENT ON VIEW public.survey_response_stats IS 'PII-stripped view of survey responses for safe use in the MEL Dashboard and analytics.';

-- ============================================================================
-- Execution Complete. 
-- Next Step: Verify in Supabase Table Editor and test Edge Function submission.
-- ============================================================================