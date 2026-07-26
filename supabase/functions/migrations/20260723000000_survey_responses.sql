-- supabase/migrations/20260723000000_survey_responses.sql
-- BIRD 2026-2035 Validation Survey Database Schema

-- ============================================================================
-- 1. CREATE MAIN RESPONSES TABLE
-- ============================================================================
-- Hybrid approach: indexed columns for fast filtering + JSONB for full payload
CREATE TABLE IF NOT EXISTS public.survey_responses (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Top-level indexed columns for dashboard filtering
    demo_province text,
    demo_category text,
    
    -- Consent and metadata
    consent_final boolean DEFAULT true NOT NULL,
    submission_source text DEFAULT 'web' NOT NULL,
    
    -- Full payload storage (260+ fields from 16-section wizard)
    response_data jsonb NOT NULL,
    
    -- Audit timestamps
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- ============================================================================
-- Optimize common dashboard queries
CREATE INDEX IF NOT EXISTS idx_survey_responses_province 
    ON public.survey_responses(demo_province);

CREATE INDEX IF NOT EXISTS idx_survey_responses_category 
    ON public.survey_responses(demo_category);

CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at 
    ON public.survey_responses(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_survey_responses_consent 
    ON public.survey_responses(consent_final) 
    WHERE consent_final = true;

-- GIN index for fast JSONB queries (if needed for advanced analytics)
CREATE INDEX IF NOT EXISTS idx_survey_responses_data 
    ON public.survey_responses USING GIN (response_data);

-- ============================================================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow anonymous public submissions (Frontend Edge Function uses anon key)
DROP POLICY IF EXISTS "Allow anonymous public submissions" ON public.survey_responses;
CREATE POLICY "Allow anonymous public submissions"
    ON public.survey_responses
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Policy 2: Allow Service Role to read all data (MEL Dashboard & Admin)
DROP POLICY IF EXISTS "Service role can read all responses" ON public.survey_responses;
CREATE POLICY "Service role can read all responses"
    ON public.survey_responses
    FOR SELECT
    TO service_role
    USING (true);

-- Policy 3: Allow Service Role to update responses (Admin corrections)
DROP POLICY IF EXISTS "Service role can update responses" ON public.survey_responses;
CREATE POLICY "Service role can update responses"
    ON public.survey_responses
    FOR UPDATE
    TO service_role
    USING (true);

-- ============================================================================
-- 4. CREATE ENHANCED PII-STRIPPED VIEW FOR MEL DASHBOARD
-- ============================================================================
-- This view safely exposes non-sensitive segmentation data and key metrics
-- while protecting personally identifiable information (PII)

DROP VIEW IF EXISTS public.survey_response_stats CASCADE;

CREATE VIEW public.survey_response_stats AS
SELECT
    id,
    created_at,
    
    -- Demographics (non-PII segmentation)
    demo_province,
    demo_category,
    submission_source,
    response_data->>'demo_position' AS demo_position,
    response_data->'demo_expertise' AS demo_expertise,
    
    -- Consent status (aligned with survey-schema.ts)
    (response_data->>'q1_1_consent_participate')::boolean AS consented_participate,
    (response_data->>'q1_2_consent_anonymize')::boolean AS consented_anonymize,
    (response_data->>'q1_3_consent_email_copy')::boolean AS consented_email_copy,
    (response_data->>'q1_4_consent_voluntary')::boolean AS consented_voluntary,
    
    -- Section 0: Systems Thinking metrics
    (response_data->>'q0_3_systems_thinking_value')::numeric AS systems_thinking_value,
    
    -- Section 3: BEIE Framework understanding
    response_data->>'q3_2_beie_understanding' AS beie_understanding,
    response_data->>'q3_3_beie_relevance' AS beie_relevance,
    response_data->>'q3_4_cluster_position' AS cluster_position,
    
    -- Section 10: IEDS Strategic Preferences
    response_data->>'q10_1_ieds_preference' AS ieds_preference,
    response_data->'q10_matrix' AS ieds_matrix,
    (response_data->>'q10_7_outcomes_achievable')::numeric AS outcomes_achievable,
    
    -- Section 11: KPI Importance Ratings
    (response_data->>'q11_2_governance_kpi_importance')::numeric AS governance_kpi_importance,
    (response_data->>'q11_3_resilience_kpi_importance')::numeric AS resilience_kpi_importance,
    (response_data->>'q11_4_inclusivity_kpi_importance')::numeric AS inclusivity_kpi_importance,
    (response_data->>'q11_5_peace_kpi_importance')::numeric AS peace_kpi_importance,
    
    -- Section 12: Balanced Scorecard
    response_data->>'q12_5_strongest_pathway' AS strongest_pathway,
    (response_data->>'q12_6_vision_clarity')::numeric AS vision_clarity,
    (response_data->>'q12_7_vision_achievable')::numeric AS vision_achievable,
    
    -- Section 13: Budget & Targets
    (response_data->>'q13_1_funding_mix_fair')::numeric AS funding_mix_fair,
    (response_data->>'q13_2_targets_realistic')::numeric AS targets_realistic,
    response_data->>'q13_6_budget_priority_phase' AS budget_priority_phase,
    response_data->>'q13_7_budget_priority_cluster' AS budget_priority_cluster,
    
    -- Section 15: Final Consent
    (response_data->>'q15_1_confirm_accurate')::boolean AS confirm_accurate,
    (response_data->>'q15_4_ready_to_submit')::boolean AS ready_to_submit
    
FROM public.survey_responses
WHERE consent_final = true;

-- ============================================================================
-- 5. GRANT READ ACCESS TO PUBLIC VIEW
-- ============================================================================
-- Allow anonymous users to query the PII-stripped view (Live Dashboard)
GRANT SELECT ON public.survey_response_stats TO anon;

-- ============================================================================
-- 6. CREATE AUTO-UPDATE TRIGGER FOR updated_at
-- ============================================================================
DROP TRIGGER IF EXISTS on_survey_response_updated ON public.survey_responses;
DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;

CREATE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_survey_response_updated
    BEFORE UPDATE ON public.survey_responses
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- 7. ADD HELPFUL COMMENTS
-- ============================================================================
COMMENT ON TABLE public.survey_responses IS 
    'BIRD 2026-2035 Validation Survey responses. Hybrid table with indexed columns for fast filtering and JSONB for full 260+ field payload from 16-section wizard.';

COMMENT ON VIEW public.survey_response_stats IS 
    'PII-stripped view for MEL Dashboard analytics. Excludes demo_name, demo_email, demo_organization. Includes key metrics from all 16 sections.';

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
-- Next steps:
-- 1. Deploy Edge Function: supabase functions deploy survey-submit
-- 2. Test submission from frontend
-- 3. Verify data appears in survey_response_stats view
-- 4. Connect MEL Dashboard to the view
