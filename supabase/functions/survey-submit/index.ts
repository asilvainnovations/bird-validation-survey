import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:8080",
  "https://bird-validation-survey.bolt.host",
  "https://asilvainnovations.com",
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

    // Critical Validation: Ensure consent is explicitly true
    if (payload.q01_consent_participate !== true && payload.consent_final !== true) {
      return new Response(
        JSON.stringify({ error: "Consent is required to submit the survey." }),
        { status: 400, headers: { ...corsHeaders(req.headers.get("Origin")), "Content-Type": "application/json" } }
      );
    }

    // ✅ FIX: Extract filtering columns and wrap the rest in response_data
    // This prevents Postgres from throwing "column does not exist" errors for the 150+ survey fields
    const dbRecord = {
      // Handle schema key variations (q02_demo_province vs demo_province)
      demo_province: payload.demo_province || payload.q02_demo_province || null,
      demo_category: payload.demo_category || payload.q02_demo_category || null,
      consent_final: true,
      submission_source: "web",
      response_data: payload, // The entire flat payload goes safely into the JSONB column
    };

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
