// supabase/functions/survey-submit/index.ts
// BIRD 2026–2035 · Survey Submission Edge Function
// Updated: 2026-07-26 — Aligned with latest SurveyWizard.tsx & survey-schema.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:8080",
  "https://bird-validation-survey.bolt.host",
  "https://asilvainnovations.com",
  "https://bird-survey.asilvainnovations.com",
];

const corsHeaders = (origin: string | null) => ({
  "Access-Control-Allow-Origin": origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(req.headers.get("Origin")) });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const payload = await req.json();

    // ── Critical Validation: Ensure consent is explicitly true ──
    // We check multiple possible consent keys to ensure robustness across schema versions
    const hasConsent = 
      payload.consent_final === true || 
      payload.q01_consent_participate === true || 
      payload.q1_1_consent_participate === true;

    if (!hasConsent) {
      return new Response(
        JSON.stringify({ error: "Consent is required to submit the survey." }),
        { status: 400, headers: { ...corsHeaders(req.headers.get("Origin")), "Content-Type": "application/json" } }
      );
    }

    // ── Extract filtering columns for the specific database columns ──
    // We check multiple possible key variations to ensure robustness
    const demoProvince = 
      payload.demo_province || 
      payload.q02_demo_province || 
      payload.q2_demo_province || 
      null;

    const demoCategory = 
      payload.demo_category || 
      payload.q02_demo_category || 
      payload.q2_demo_category || 
      null;

    // ── Construct the database record ──
    const dbRecord = {
      demo_province: demoProvince,
      demo_category: demoCategory,
      consent_final: true,
      submission_source: "web",
      response_data: payload, // The entire flat payload goes safely into the JSONB column
    };

    // ── Insert into database ──
    const { data, error } = await supabaseClient
      .from("survey_responses")
      .insert(dbRecord)
      .select("id")
      .single();

    if (error) {
      console.error("Database insertion error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save survey response.", details: error.message }),
        { status: 500, headers: { ...corsHeaders(req.headers.get("Origin")), "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders(req.headers.get("Origin")), "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { ...corsHeaders(req.headers.get("Origin")), "Content-Type": "application/json" } }
    );
  }
});
