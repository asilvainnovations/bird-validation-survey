// ─────────────────────────────────────────────────────────────────────────────
// BIRD 2026–2035 · Supabase Client & Edge Function Service Layer
// Primary Supabase project: cacimkjpkxflrtgspiay.supabase.co
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";
import { ENV, EDGE_FUNCTIONS, BRAND_ASSETS, EXTERNAL_URLS } from "@/lib/env";

// Re-export env constants so existing imports don't break
export { EDGE_FUNCTIONS, BRAND_ASSETS, EXTERNAL_URLS };

// ── Primary Supabase client (auth + data) ────────────────────────────────────
export const supabase = createClient(ENV.VITE_SUPABASE_URL, ENV.VITE_SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// ── Admin client (elevated operations — NEVER ship to browser in production) ─
export function createAdminClient() {
  if (!ENV.VITE_SUPABASE_SERVICE_KEY) {
    throw new Error(
      "[Supabase] VITE_SUPABASE_SERVICE_KEY is required for admin operations. " +
        "If you are in a browser context, use Edge Functions instead."
    );
  }
  return createClient(ENV.VITE_SUPABASE_URL, ENV.VITE_SUPABASE_SERVICE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// ── Header Helpers ────────────────────────────────────────────────────────────

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
 */
export function getEdgeFunctionHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ENV.VITE_SUPABASE_ANON_KEY}`,
    apikey: ENV.VITE_SUPABASE_ANON_KEY,
  };
}

// ── Generic Edge Function Invoker ───────────────────────────────────────────
/**
 * Generic typed fetch wrapper for Edge Functions.
 * Handles JSON serialization, error parsing, and timeout.
 */
export async function invokeEdgeFunction<T = unknown>(
  endpoint: string,
  payload: Record<string, unknown>,
  options: { timeoutMs?: number; retries?: number } = {}
): Promise<T> {
  const { timeoutMs = 30000, retries = 1 } = options;

  const attempt = async (): Promise<T> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: getEdgeFunctionHeaders(),
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timer);

      if (!response.ok) {
        const text = await response.text().catch(() => "Unknown error");
        throw new Error(`Edge Function ${response.status}: ${text}`);
      }

      return (await response.json()) as T;
    } catch (err) {
      clearTimeout(timer);
      throw err;
    }
  };

  let lastError: Error | undefined;
  for (let i = 0; i <= retries; i++) {
    try {
      return await attempt();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (i < retries) {
        await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
      }
    }
  }
  throw lastError;
}

// ── STRATEGIC PLANNER SYNC ──────────────────────────────────────────────────

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

/** POST: Save the full planner state (plans + currentPlanId) */
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

/** POST: Save a single plan */
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

/** DELETE: Archive (soft-delete) a plan by ID */
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

// ── EMAIL NOTIFICATIONS ─────────────────────────────────────────────────────

/** POST: Send welcome or notification email via the email-notifications Edge Function */
export async function triggerEmailNotification(
  type: "welcome" | "share" | "kpi_alert" | "weekly_digest",
  userId: string,
  metadata?: Record<string, unknown>,
): Promise<boolean> {
  try {
    const res = await fetch(EDGE_FUNCTIONS.EMAIL_NOTIFICATIONS, {
      method: "POST",
      headers: getEdgeFunctionHeaders(),
      body: JSON.stringify({ type, user_id: userId, ...metadata }),
    });
    return res.ok;
  } catch (err) {
    console.error("[supabase] triggerEmailNotification error:", err);
    return false;
  }
}
