// src/lib/survey-schema.ts
// BIRD 2026–2035 · Validation Survey Zod Schema
// Single source of truth for all 16 survey sections (Refactored for consistency)

import { z } from "zod";

// ── Reusable field validators ───────────────────────────────────────────────
const optionalString = z.string().optional();
const optionalNumber = z.number().min(0).max(5).optional(); // 0-5 scale for pilot mode
const optionalBoolean = z.boolean().optional();
const optionalStringArray = z.array(z.string()).default([]);
const requiredBoolean = z.boolean({ required_error: "This consent is required" });

// ── IEDS Matrix sub-schema ──────────────────────────────────────────────────
const matrixRowSchema = z.object({
  economic_impact: z.number().min(0).max(10).default(5),
  feasibility: z.number().min(0).max(10).default(5),
  identity_alignment: z.number().min(0).max(10).default(5),
  systems_leverage: z.number().min(0).max(10).default(5),
  risk_return: z.number().min(0).max(10).default(5),
  inclusivity: z.number().min(0).max(10).default(5),
  sustainability: z.number().min(0).max(10).default(5),
});

const iedsMatrixSchema = z.object({
  heds: matrixRowSchema,
  gems: matrixRowSchema,
  ifes: matrixRowSchema,
  ieds: matrixRowSchema,
});

// ── Main Survey Schema ──────────────────────────────────────────────────────
export const surveySchema = z.object({
  // ═══ Step 0: Welcome & Orientation ═══
  q00_ready_to_begin: optionalBoolean,

  // ═══ Step 1: Privacy & Consent (ONLY REQUIRED FIELDS IN PILOT MODE) ═══
  q01_consent_participate: requiredBoolean.describe("Consent to participate"),
  q01_consent_anonymize: optionalBoolean,
  q01_consent_email_copy: optionalBoolean,

  // ═══ Step 2: Respondent Profile ═══
  q02_demo_category: optionalString,
  q02_demo_province: optionalString,
  q02_demo_expertise: optionalStringArray,
  q02_demo_name: optionalString,
  q02_demo_email: z.string().email("Invalid email format").optional().or(z.literal("")),
  q02_demo_organization: optionalString,

  // ═══ Step 3: BEIE & Systems Thinking ═══
  q03_beie_understanding: optionalString,
  q03_beie_relevance: optionalString,
  q03_beie_collaboration: optionalString,
  q03_systems_thinking_value: optionalNumber,

  // ═══ Step 4: Cluster 1 — Foundations ═══
  q04_priorities: optionalStringArray,
  q04_feasibility: optionalNumber,
  q04_mag_logistics: optionalString,
  q04_s_climate_impact: optionalNumber,
  q04_s_climate_likelihood: optionalNumber,
  q04_s_tragedy_commons: optionalString,
  q04_s_limits_growth: optionalString,

  // ═══ Step 5: Cluster 2 — Transformers ═══
  q05_barrier: optionalString,
  q05_halal_park: optionalString,
  q05_s_fixes_fail: optionalString,
  q05_s_successful: optionalString,
  q05_s_halal_cert_impact: optionalNumber,
  q05_s_halal_cert_likelihood: optionalNumber,

  // ═══ Step 6: Cluster 3 — Enablers ═══
  q06_infra: optionalNumber,
  q06_sectors: optionalStringArray,
  q06_s_shifting_burden: optionalString,
  q06_s_growth_underinvest: optionalString,
  q06_s_skills_mismatch_impact: optionalNumber,
  q06_s_skills_mismatch_likelihood: optionalNumber,

  // ═══ Step 7: Cluster 4 — Connectors ═══
  q07_bimpeaga: optionalNumber,
  q07_markets: optionalStringArray,
  q07_s_escalation: optionalString,
  q07_s_limits_growth: optionalString,
  q07_s_uae_corridor_impact: optionalNumber,
  q07_s_uae_corridor_likelihood: optionalNumber,

  // ═══ Step 8: Cluster 5 — Financiers ═══
  q08_finance_tier: optionalString,
  q08_instruments: optionalStringArray,
  q08_s_big_man: optionalString,
  q08_s_shifting_burden: optionalString,
  q08_s_islamic_finance_impact: optionalNumber,
  q08_s_islamic_finance_likelihood: optionalNumber,

  // ═══ Step 9: Operating Systems ═══
  q09_moral_governance_importance: optionalNumber, // Moved from misplaced q2_1
  q09_archetype: optionalString,                   // Moved from misplaced q2_3
  q09_s_governance_loop: optionalString,
  q09_s_investment_loop: optionalString,

  // ═══ Step 10: IEDS & 3-Phase Plan ═══
  q10_ieds_preference: optionalString,
  q10_matrix: iedsMatrixSchema,
  q10_sequencing_logic: optionalString,

  // ═══ Step 11: Metrics & KPIs ═══
  q11_calibration_appropriate: optionalString,
  q11_governance_kpi_importance: optionalNumber,
  q11_resilience_kpi_importance: optionalNumber,

  // ═══ Step 12: Balanced Scorecard ═══
  q12_learning_growth_alignment: optionalNumber,
  q12_strongest_pathway: optionalString,
  q12_vision_clarity: optionalNumber,

  // ═══ Step 13: Priority Actions & Budget ═══
  q13_budget_priority_phase: optionalString,
  q13_budget_priority_cluster: optionalString,
  q13_targets_realistic: optionalNumber,

  // ═══ Step 14: Resources & Engagement ═══
  q14_engagement_type: optionalStringArray,
  q14_contact_method: optionalString,
  q14_additional_comments: optionalString,

  // ═══ Step 15: Review & Submission ═══
  q15_confirm_accurate: optionalBoolean,
  q15_consent_voluntary: optionalBoolean,
  consent_final: z.literal(true, {
    errorMap: () => ({ message: "You must confirm accuracy and consent to submit" }),
  }),
});

export type SurveySchemaType = z.infer<typeof surveySchema>;
