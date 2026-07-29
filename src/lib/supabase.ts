// ─────────────────────────────────────────────────────────────────────────────
// BIRD 2026–2035 · Supabase Client & Edge Function Service Layer
// Primary Supabase project: cacimkjpkxflrtgspiay.supabase.co
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set."
  );
}
export const supabaseServer = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: true,
  },
});

// ── Edge Function Endpoints ───────────────────────────────────────────────────
const EDGE_BASE = `${supabaseUrl}/functions/v1`;

export const EDGE_FUNCTIONS = {
  AI_STRATEGY_ASSISTANT: `${EDGE_BASE}/ai-strategy-assistant`,
  STRATEGIC_PLANNER_SYNC: `${EDGE_BASE}/strategic-planner-sync`,
  EMAIL_NOTIFICATIONS:    `${EDGE_BASE}/email-notifications`,
  CRM_DISPATCHER:         `${EDGE_BASE}/crm-dispatcher`,
  SUBMIT_SURVEY:          `${EDGE_BASE}/survey-submit`,
  SURVEY_ANALYTICS:       `${EDGE_BASE}/survey-analytics`,
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

// ── Header Helpers ─────────────────────────────────────────────────────────────

/**
 * Returns headers for Edge Function calls that require a user JWT token.
 * Used by planner sync operations that pass the user's auth token.
 */
export const getAuthHeaders = (token: string): HeadersInit => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

/**
 * Returns standard headers for Edge Function fetch() calls using the anon key.
 * Includes the anon key as Authorization bearer for Supabase auth context.
 * This is the missing export that api.ts requires.
 */
export function getEdgeFunctionHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${supabaseKey}`,
    apikey: supabaseKey,
  };
}

// ── EDGE FUNCTION SERVICE CALLS ───────────────────────────────────────────────

/** GET: Fetch the user's full strategic planner state from the sync edge function */
export async function fetchPlannerState(token: string): Promise<any | null> {
  try {
    const res = await fetch(EDGE_FUNCTIONS.STRATEGIC_PLANNER_SYNC, {
      method: "GET",
      headers: getAuthHeaders(token),
    });
    if (!res.ok) {
      if (res.status === 404) return { plans: [], currentPlanId: null };
      throw new Error(`Sync fetch failed: ${res.statusText}`);
    }
    return res.json();
  } catch (err) {
    console.error("[supabase] fetchPlannerState error:", err);
    return null;
  }
}

/** POST: Save the full planner state (plans array + currentPlanId) */
export async function saveFullState(
  plans: any[],
  currentPlanId: string | null,
  token: string,
): Promise<boolean> {
  try {
    const res = await fetch(EDGE_FUNCTIONS.STRATEGIC_PLANNER_SYNC, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ plans, currentPlanId }),
    });
    if (!res.ok) throw new Error(`Sync save failed: ${res.statusText}`);
    return true;
  } catch (err) {
    console.error("[supabase] saveFullState error:", err);
    return false;
  }
}

/** POST: Save a single plan (incremental update) */
export async function saveSinglePlan(plan: any, token: string): Promise<boolean> {
  try {
    const res = await fetch(EDGE_FUNCTIONS.STRATEGIC_PLANNER_SYNC, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ plan }),
    });
    if (!res.ok) throw new Error(`Plan save failed: ${res.statusText}`);
    return true;
  } catch (err) {
    console.error("[supabase] saveSinglePlan error:", err);
    return false;
  }
}

/** DELETE: Soft-delete (archive) a plan */
export async function archivePlan(planId: string, token: string): Promise<boolean> {
  try {
    const res = await fetch(`${EDGE_FUNCTIONS.STRATEGIC_PLANNER_SYNC}?plan_id=${planId}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });
    if (!res.ok) throw new Error(`Archive failed: ${res.statusText}`);
    return true;
  } catch (err) {
    console.error("[supabase] archivePlan error:", err);
    return false;
  }
}

/** POST: Send welcome or notification email */
export async function triggerEmailNotification(
  type: "welcome" | "share" | "kpi_alert" | "weekly_digest",
  userId: string,
  metadata?: Record<string, unknown>,
): Promise<boolean> {
  try {
    const res = await fetch(EDGE_FUNCTIONS.EMAIL_NOTIFICATIONS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, user_id: userId, ...metadata }),
    });
    return res.ok;
  } catch (err) {
    console.error("[supabase] triggerEmailNotification error:", err);
    return false;
  }
}
