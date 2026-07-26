/**
 * BIRD 2026–2035 · Browser Supabase Client
 *
 * Lightweight wrapper for browser-only Supabase initialization.
 * Uses standard @supabase/supabase-js (NO @supabase/ssr — that is for Next.js).
 */

import { createClient } from "@supabase/supabase-js";
import { ENV } from "@/lib/env";

export function createBrowserSupabaseClient() {
  return createClient(ENV.VITE_SUPABASE_URL, ENV.VITE_SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}
