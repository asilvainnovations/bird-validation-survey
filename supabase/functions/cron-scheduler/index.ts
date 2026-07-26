/**
 * ============================================================================
 * BIRD 2026-2035 — Cron Scheduler Edge Function
 * ============================================================================
 *
 * Replaces the legacy Node.js cron script (was misplaced in src/pages/api/cron).
 * Deployed as a Supabase Edge Function and triggered via pg_cron or HTTP call.
 *
 * Tasks:
 *   1. Survey response aggregation & completion-rate calculation
 *   2. Analytics cache warming
 *   3. Health check ping
 *   4. Stale session cleanup
 *
 * Trigger methods:
 *   A. HTTP POST  → https://<project>.supabase.co/functions/v1/cron-scheduler
 *   B. pg_cron    → SELECT cron.schedule('bird-cron', '0 */6 * * *',
 *                     $$ SELECT net.http_post(...); $$);
 * ============================================================================
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.110.8";

// ─── Configuration ─────────────────────────────────────────────────────────
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const HEALTH_ENDPOINT = Deno.env.get("HEALTH_ENDPOINT") || "";
const CRON_DRY_RUN = Deno.env.get("CRON_DRY_RUN") === "true";
const FETCH_TIMEOUT_MS = 15_000;
const SURVEY_SECTION_COUNT = 16;

// ─── Logger ────────────────────────────────────────────────────────────────
function log(level: string, message: string, meta?: Record<string, unknown>) {
  const entry = { ts: new Date().toISOString(), level, message, ...meta };
  console.log(JSON.stringify(entry));
}

// ─── Supabase Client ───────────────────────────────────────────────────────
function getAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// ─── Task 1: Aggregate Survey Completion Rates ─────────────────────────────
async function aggregateSurveyCompletion() {
  log("info", "[Task] aggregateSurveyCompletion — starting");
  const supabase = getAdminClient();

  const { data: responses, error } = await supabase
    .from("survey_responses")
    .select("id, section_data, created_at, updated_at")
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) {
    log("error", "[Task] aggregateSurveyCompletion — fetch failed", { error: error.message });
    return { success: false, error: error.message };
  }

  const total = responses?.length ?? 0;
  const completed = (responses ?? []).filter((r: { section_data?: Record<string, unknown> }) => {
    const sections = Object.keys(r.section_data ?? {});
    return sections.length >= SURVEY_SECTION_COUNT;
  }).length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (!CRON_DRY_RUN) {
    const { error: upsertErr } = await supabase
      .from("survey_analytics")
      .upsert({
        metric: "completion_rate",
        value: completionRate,
        total_responses: total,
        completed_responses: completed,
        computed_at: new Date().toISOString(),
      }, { onConflict: "metric" });

    if (upsertErr) {
      log("error", "[Task] aggregateSurveyCompletion — upsert failed", { error: upsertErr.message });
      return { success: false, error: upsertErr.message };
    }
  }

  log("info", "[Task] aggregateSurveyCompletion — done", { total, completed, completionRate });
  return { success: true, total, completed, completionRate };
}

// ─── Task 2: Warm Analytics Cache ──────────────────────────────────────────
async function warmAnalyticsCache() {
  log("info", "[Task] warmAnalyticsCache — starting");
  const supabase = getAdminClient();

  const metrics = [
    { name: "total_responses", query: "survey_responses" },
    { name: "total_users", query: "profiles" },
    { name: "avg_completion_time", query: "survey_responses" },
  ];

  const results: Record<string, unknown> = {};

  for (const m of metrics) {
    const { count, error } = await supabase
      .from(m.query)
      .select("*", { count: "exact", head: true });

    if (error) {
      log("warn", `[Task] warmAnalyticsCache — ${m.name} failed`, { error: error.message });
      results[m.name] = null;
    } else {
      results[m.name] = count ?? 0;
    }
  }

  if (!CRON_DRY_RUN) {
    const { error } = await supabase
      .from("survey_analytics")
      .upsert(
        Object.entries(results).map(([key, value]) => ({
          metric: key,
          value: value ?? 0,
          computed_at: new Date().toISOString(),
        })),
        { onConflict: "metric" }
      );

    if (error) {
      log("error", "[Task] warmAnalyticsCache — upsert failed", { error: error.message });
      return { success: false, error: error.message };
    }
  }

  log("info", "[Task] warmAnalyticsCache — done", results);
  return { success: true, ...results };
}

// ─── Task 3: Health Check Ping ─────────────────────────────────────────────
async function healthCheckPing() {
  if (!HEALTH_ENDPOINT) {
    log("warn", "[Task] healthCheckPing — skipped (HEALTH_ENDPOINT not set)");
    return { success: true, skipped: true };
  }

  log("info", "[Task] healthCheckPing — starting", { endpoint: HEALTH_ENDPOINT });

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const res = await fetch(HEALTH_ENDPOINT, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const ok = res.status >= 200 && res.status < 300;
    log(ok ? "info" : "error", "[Task] healthCheckPing — result", {
      status: res.status,
      ok,
    });
    return { success: ok, status: res.status };
  } catch (err) {
    log("error", "[Task] healthCheckPing — failed", {
      error: err instanceof Error ? err.message : String(err),
    });
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── Task 4: Stale Session Cleanup ─────────────────────────────────────────
async function cleanupStaleSessions() {
  log("info", "[Task] cleanupStaleSessions — starting");
  const supabase = getAdminClient();

  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days ago

  if (!CRON_DRY_RUN) {
    const { error } = await supabase
      .from("survey_drafts")
      .delete()
      .lt("updated_at", cutoff)
      .eq("submitted", false);

    if (error) {
      log("error", "[Task] cleanupStaleSessions — delete failed", { error: error.message });
      return { success: false, error: error.message };
    }
  }

  log("info", "[Task] cleanupStaleSessions — done", { cutoff });
  return { success: true, cutoff };
}

// ─── Main Handler ──────────────────────────────────────────────────────────
Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  // Only accept POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Optional: verify a simple bearer token for cron security
  const authHeader = req.headers.get("authorization") || "";
  const cronSecret = Deno.env.get("CRON_SECRET") || "";
  if (cronSecret && !authHeader.includes(cronSecret)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
      });
  }

  log("info", "=== CRON SCHEDULER RUN START ===", { dryRun: CRON_DRY_RUN });

  const results = {
    surveyCompletion: await aggregateSurveyCompletion(),
    analyticsCache: await warmAnalyticsCache(),
    healthCheck: await healthCheckPing(),
    sessionCleanup: await cleanupStaleSessions(),
  };

  const allOk = Object.values(results).every((r: { success: boolean }) => r.success);
  log("info", "=== CRON SCHEDULER RUN END ===", { allOk, results });

  return new Response(
    JSON.stringify({ success: allOk, dryRun: CRON_DRY_RUN, results }, null, 2),
    {
      status: allOk ? 200 : 207,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
});
