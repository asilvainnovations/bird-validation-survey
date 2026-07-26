// ─────────────────────────────────────────────────────────────────────────────
// BIRD 2026–2035 · Supabase Client & Edge Function Service Layer
// Primary Supabase project: cacimkjpkxflrtgspiay.supabase.co
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@supabase/supabase-js";
import { ENV, EDGE_FUNCTIONS, BRAND_ASSETS, EXTERNAL_URLS } from "@/lib/env";

// Re-export env constants so existing imports don't break immediately
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
// This is guarded behind a build check; in production, service-key ops
// should only happen inside Edge Functions.
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

// ── Typed Headers Helper ────────────────────────────────────────────────────
/**
 * Returns standard headers for Edge Function fetch() calls.
 * Includes the anon key as Authorization bearer for Supabase auth context.
 */
export function getEdgeFunctionHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ENV.VITE_SUPABASE_ANON_KEY}`,
    "apikey": ENV.VITE_SUPABASE_ANON_KEY,
  };
}

// ── Edge Function Invokers ──────────────────────────────────────────────────
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
        await new Promise((r) => setTimeout(r, 1000 * (i + 1))); // exponential-ish backoff
      }
    }
  }
  throw lastError;
}
