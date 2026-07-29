// ─────────────────────────────────────────────────────────────────────────────
// BIRD 2026–2035 · Supabase Client & Edge Function Service Layer
// Primary Supabase project: cacimkjpkxflrtgspiay.supabase.co
//
// AUDIT FIX (2026-07-29):
// - Removed duplicate function definitions (getAuthHeaders, getEdgeFunctionHeaders,
//   triggerEmailNotification were declared twice with conflicting signatures).
// - Removed dead EDGE_FUNCTIONS entries (ai-strategy-assistant, strategic-planner-sync,
//   crm-dispatcher) that pointed at non-existent directories or unmigrated tables.
// - Removed dead service calls (fetchPlannerState, saveFullState, saveSinglePlan,
//   archivePlan) whose only consumer (useStrategicPlan.ts) was deleted.
// - Renamed SURVEY_ANALYTICS → ANALYTICS to match the typed consumer in
//   SurveyDashboard.tsx (EDGE_FUNCTIONS.ANALYTICS).
// - Kept BRAND_ASSETS and EXTERNAL_URLS for downstream branding components.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// ── Edge Function Endpoints ───────────────────────────────────────────────────
const EDGE_BASE = `${supabaseUrl}/functions/v1`;

export const EDGE_FUNCTIONS = {
  EMAIL_NOTIFICATIONS:  `${EDGE_BASE}/email-notifications`,
  SUBMIT_SURVEY:        `${EDGE_BASE}/survey-submit`,
  ANALYTICS:            `${EDGE_BASE}/survey-analytics`,
  AI_STRATEGY_ASSISTANT:`${EDGE_BASE}/ai-strategy-assistant`,
} as const;

// ── Branding Assets (CDN) ─────────────────────────────────────────────────────
export const BRAND_ASSETS = {
  LOGO_URL:
    (import.meta.env.VITE_BRAND_LOGO_URL as string) ||
    `${supabaseUrl}/storage/v1/object/public/bird-images/MTIT%20Logo.png`,
  AI_AVATAR_URL:
    (import.meta.env.VITE_AI_STRATEGIST_AVATAR_URL as string) ||
    `${supabaseUrl}/storage/v1/object/public/bird-images/ASilva%20Innovations%20Logo.png`,
  BANNER_URL:
    (import.meta.env.VITE_VALIDATION_SURVEY_BANNER_URL as string) ||
    `${supabaseUrl}/storage/v1/object/public/validation-survey-images/Validation%20Survey%20Banner.png`,
} as const;

// ── External URLs ──────────────────────────────────────────────────────────────
export const EXTERNAL_URLS = {
  PWA:
    (import.meta.env.VITE_PWA_EXTERNAL_URL as string) ||
    "https://bird-app.asilvainnovations.com",
  USER_MANUAL:
    (import.meta.env.VITE_USER_MANUAL_URL as string) ||
    "https://user-manual.asilvainnovations.com",
  DEV_DOCS:
    (import.meta.env.VITE_DEVELOPER_DOCS_URL as string) ||
    "https://asilvainnovations.github.io/strat-planner-pwa/developer-doc.html",
} as const;

// ── Auth / Header Helpers ─────────────────────────────────────────────────────

/**
 * Returns headers for Edge Function calls that require a user JWT token.
 */
export function getAuthHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

/**
 * Returns standard headers for Edge Function fetch() calls using the anon key.
 * Includes the anon key as Authorization bearer for Supabase auth context.
 */
export function getEdgeFunctionHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${supabaseKey}`,
    apikey: supabaseKey,
  };
}

// ── EDGE FUNCTION SERVICE CALLS ───────────────────────────────────────────────

/** POST: Send welcome or notification email */
export async function triggerEmailNotification(
  payload: { to: string; subject: string; html: string }
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(EDGE_FUNCTIONS.EMAIL_NOTIFICATIONS, {
      method: "POST",
      headers: getEdgeFunctionHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Email notification failed: ${res.statusText}`);
    return { success: true };
  } catch (err) {
    console.error("[supabase] triggerEmailNotification error:", err);
    return { success: false, error: String(err) };
  }
}

/** POST: Submit survey data */
export async function submitSurvey(
  data: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(EDGE_FUNCTIONS.SUBMIT_SURVEY, {
      method: "POST",
      headers: getEdgeFunctionHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Submission failed" }));
      throw new Error(err.message || `HTTP ${res.status}`);
    }
    return { success: true };
  } catch (err) {
    console.error("[supabase] submitSurvey error:", err);
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}
