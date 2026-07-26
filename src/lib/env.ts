/**
 * ============================================================================
 * BIRD 2026-2035 · Centralized Environment Configuration
 * ============================================================================
 *
 * Single source of truth for all runtime environment variables.
 * Validated at module load time using Zod — fails fast with a clear message
 * if any required variable is missing or malformed.
 *
 * Usage:
 *   import { ENV, EDGE_FUNCTIONS, BRAND_ASSETS } from "@/lib/env";
 *   const response = await fetch(EDGE_FUNCTIONS.AI_STRATEGY_ASSISTANT, {...});
 * ============================================================================
 */

import { z } from "zod";

// ─── Schema Definition ─────────────────────────────────────────────────────
const envSchema = z.object({
  // Supabase Auth + Database (required)
  VITE_SUPABASE_URL: z.string().url().min(1),
  VITE_SUPABASE_ANON_KEY: z.string().min(20),

  // Optional: Service role key (only for admin/dev tooling, never in client builds)
  VITE_SUPABASE_SERVICE_KEY: z.string().optional(),

  // Optional: Sentry DSN for error tracking
  VITE_SENTRY_DSN: z.string().url().optional(),

  // Optional: Branding asset overrides
  VITE_BRAND_LOGO_URL: z.string().url().optional(),
  VITE_AI_STRATEGIST_AVATAR_URL: z.string().url().optional(),
  VITE_BANNER_INVESTMENT_URL: z.string().url().optional(),

  // Optional: External platform URLs
  VITE_PWA_EXTERNAL_URL: z.string().url().optional(),
  VITE_USER_MANUAL_URL: z.string().url().optional(),
  VITE_DEVELOPER_DOCS_URL: z.string().url().optional(),
});

// ─── Runtime Parsing ───────────────────────────────────────────────────────
const parsed = envSchema.safeParse({
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  VITE_SUPABASE_SERVICE_KEY: import.meta.env.VITE_SUPABASE_SERVICE_KEY,
  VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  VITE_BRAND_LOGO_URL: import.meta.env.VITE_BRAND_LOGO_URL,
  VITE_AI_STRATEGIST_AVATAR_URL: import.meta.env.VITE_AI_STRATEGIST_AVATAR_URL,
  VITE_BANNER_INVESTMENT_URL: import.meta.env.VITE_BANNER_INVESTMENT_URL,
  VITE_PWA_EXTERNAL_URL: import.meta.env.VITE_PWA_EXTERNAL_URL,
  VITE_USER_MANUAL_URL: import.meta.env.VITE_USER_MANUAL_URL,
  VITE_DEVELOPER_DOCS_URL: import.meta.env.VITE_DEVELOPER_DOCS_URL,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(
    `\n[BIRD Env Config] Invalid or missing environment variables:\n${issues}\n\n` +
      `Please ensure a .env file exists in the project root with:\n` +
      `  VITE_SUPABASE_URL=https://your-project.supabase.co\n` +
      `  VITE_SUPABASE_ANON_KEY=your-anon-key\n`
  );
}

/** Validated environment variables. */
export const ENV = parsed.data;

// ─── Supabase Project ──────────────────────────────────────────────────────
export const SUPABASE_PROJECT = {
  URL: ENV.VITE_SUPABASE_URL,
  ANON_KEY: ENV.VITE_SUPABASE_ANON_KEY,
  SERVICE_KEY: ENV.VITE_SUPABASE_SERVICE_KEY,
} as const;

// ─── Edge Function Endpoints ───────────────────────────────────────────────
// All functions are hosted on the SAME Supabase project (no cross-project calls).
const EDGE_BASE = `${ENV.VITE_SUPABASE_URL}/functions/v1`;

export const EDGE_FUNCTIONS = {
  AI_STRATEGY_ASSISTANT: `${EDGE_BASE}/ai-strategy-assistant`,
  CRM_DISPATCHER: `${EDGE_BASE}/crm-dispatcher`,
  EMAIL_NOTIFICATIONS: `${EDGE_BASE}/email-notifications`,
  STRATEGIC_PLANNER_SYNC: `${EDGE_BASE}/strategic-planner-sync`,
  SURVEY_SUBMIT: `${EDGE_BASE}/survey-submit`,
} as const;

// ─── Branding Assets (CDN) ─────────────────────────────────────────────────
export const BRAND_ASSETS = {
  LOGO_URL:
    ENV.VITE_BRAND_LOGO_URL ||
    `${ENV.VITE_SUPABASE_URL}/storage/v1/object/public/bird-images/MTIT%20Logo.png`,
  AI_AVATAR_URL:
    ENV.VITE_AI_STRATEGIST_AVATAR_URL || `${ENV.VITE_SUPABASE_URL}/storage/v1/object/public/bird-images/ASilva%20Innovations%20Logo.png`,
  BIRD_VALIDATION_SURVEY_BANNER_URL:
    ENV.VITE_VAIDATION_SURVEY_BANNER_URL ||
    `${ENV.VITE_SUPABASE_URL}/storage/v1/object/public/validation-survey-images/Validation%20Survey%20Banner.png`,
} as const;

// ─── External URLs ─────────────────────────────────────────────────────────
export const EXTERNAL_URLS = {
  PWA:
    ENV.VITE_PWA_EXTERNAL_URL ||
    "https://bangsamoro-investment-roadmap.asilvainnovations.com",
  USER_MANUAL:
    ENV.VITE_USER_MANUAL_URL ||
    "https://bird-user-manual.asilvainnovations.com",
  DEV_DOCS:
    ENV.VITE_DEVELOPER_DOCS_URL ||
    "https://asilvainnovations.github.io/strat-planner-pwa/developer-doc.html",
} as const;

// ─── Build-time Constants ──────────────────────────────────────────────────
export const BUILD_INFO = {
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
} as const;
