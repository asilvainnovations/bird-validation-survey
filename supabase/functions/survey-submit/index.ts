import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:8080",
  "https://bird-validation-survey.bolt.host",
  "https://asilvainnovations.com",
];

// SECURITY FIX (2026-07-30 audit): previously fell back to ALLOWED_ORIGINS[0]
// (a localhost dev origin) for any unrecognized Origin header. Browsers only
// honor a CORS response if Access-Control-Allow-Origin matches the *actual*
// requesting origin, so this never granted real cross-origin access — but it
// was sloppy and misleading to read. Omit the header entirely for unknown
// origins instead, so the intent ("we don't allow this origin") is explicit.
function corsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

// Rate limiting: allow at most this many submissions from the same submitter
// (identified by a salted hash of their IP — never the raw IP) within the
// window below. Deno edge functions are stateless between invocations, so
// this is backed by a DB lookup rather than in-memory state.
const RATE_LIMIT_MAX_SUBMISSIONS = 3;
const RATE_LIMIT_WINDOW_MINUTES = 30;

// A per-deployment secret used to salt the IP hash, so the hash can't be
// brute-forced back to a raw IP by anyone who only has DB read access (they'd
// also need this secret, which lives only in Supabase's env/secrets store).
const IP_HASH_SALT = Deno.env.get("IP_HASH_SALT") ?? "bird-2026-2035-fallback-salt";

async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(`${IP_HASH_SALT}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(req.headers.get("Origin")) });
  }

  const origin = req.headers.get("Origin");

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const payload = await req.json();

    // SECURITY FIX (2026-07-30 audit): the previous check accepted the
    // submission if EITHER q01_consent_participate OR the client-supplied
    // consent_final was true. consent_final is set unconditionally by the
    // client (see src/lib/api.ts) and is not trustworthy input on its own —
    // an attacker could POST `{ consent_final: true }` with no real consent
    // answer and pass validation. The server must derive consent solely from
    // the actual consent question, never from a client-asserted derived flag.
    if (payload.q01_consent_participate !== true) {
      return new Response(
        JSON.stringify({ error: "Consent is required to submit the survey." }),
        { status: 400, headers: { ...corsHeaders(origin), "Content-Type": "application/json" } }
      );
    }

    // Rate limiting: look up recent submissions from this submitter (by IP hash)
    // within the window, and reject with 429 if the limit has been hit. This
    // runs after the cheap consent check (fail fast on bad requests before
    // doing a DB round-trip) but before the actual insert.
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
    const ipHash = await hashIp(clientIp);

    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();
    const { count: recentCount, error: rateLimitError } = await supabaseClient
      .from("survey_responses")
      .select("id", { count: "exact", head: true })
      .eq("submitter_ip_hash", ipHash)
      .gte("created_at", windowStart);

    if (rateLimitError) {
      // Fail open on the rate-limit *check* itself (a DB hiccup here shouldn't
      // block a legitimate one-time survey submission), but log it so it's
      // visible — this should not happen under normal operation.
      console.error("Rate limit check error (failing open):", rateLimitError);
    } else if ((recentCount ?? 0) >= RATE_LIMIT_MAX_SUBMISSIONS) {
      return new Response(
        JSON.stringify({ error: "Too many submissions from this network. Please try again later." }),
        { status: 429, headers: { ...corsHeaders(origin), "Content-Type": "application/json" } }
      );
    }

    // ✅ FIX: Extract filtering columns and wrap the rest in response_data
    // This prevents Postgres from throwing "column does not exist" errors for the 150+ survey fields
    const dbRecord = {
      // Handle schema key variations (q2_demo_province vs bare demo_province)
      demo_province: payload.demo_province || payload.q2_demo_province || null,
      demo_category: payload.demo_category || payload.q2_demo_category || null,
      // Derived strictly from the validated consent answer above — never
      // trusted from the client's own consent_final field.
      consent_final: true,
      submission_source: "web",
      submitter_ip_hash: ipHash,
      response_data: payload, // The entire flat payload goes safely into the JSONB column
    };

    const { data, error } = await supabaseClient
      .from("survey_responses")
      .insert(dbRecord)
      .select("id")
      .single();

    if (error) {
      // SECURITY FIX (2026-07-30 audit): previously returned `error.message`
      // (raw Postgres error text) directly to the client, which can leak
      // internal schema/column details useful to an attacker probing the
      // endpoint. Log the real error server-side; return a generic message.
      console.error("Database insertion error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save survey response. Please try again." }),
        { status: 500, headers: { ...corsHeaders(origin), "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders(origin), "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { ...corsHeaders(origin), "Content-Type": "application/json" } }
    );
  }
});
