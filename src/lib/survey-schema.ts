// src/lib/survey-schema.ts
// BIRD 2026–2035 · Validation Survey Zod Schema
// Single source of truth for all 16 survey sections.
//
// SWOT and archetype/CLD fields below are GENERATED from src/lib/swot-content.ts
// rather than hand-typed, so this schema can never drift from the canonical
// BEIE-cluster attribution again (see swot-content.ts header for rationale).

import { z } from "zod";
import { SWOT_BY_SECTION, ARCHETYPES_BY_SECTION } from "./swot-content";

// ── Reusable field validators ───────────────────────────────────────────────
const optionalString = z.string().optional();
const optionalNumber = z.number().min(0).max(5).optional();
const optionalBoolean = z.boolean().optional();
const optionalStringArray = z.array(z.string()).default([]);
const requiredBoolean = z.boolean({ required_error: "This consent is required" });

// ── Generate { [field_impact]: optionalNumber, [field_likelihood]: optionalNumber } ──
function swotFieldsFor(sectionNumbers: number[]): Record<string, z.ZodTypeAny> {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const n of sectionNumbers) {
    for (const item of SWOT_BY_SECTION[n] ?? []) {
      shape[`${item.field}_impact`] = optionalNumber;
      shape[`${item.field}_likelihood`] = optionalNumber;
    }
  }
  return shape;
}

// ── Generate { [field_accuracy/scale]: optionalString/Number, [field_followup]: optionalString } ──
function archetypeFieldsFor(sectionNumbers: number[]): Record<string, z.ZodTypeAny> {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const n of sectionNumbers) {
    for (const q of ARCHETYPES_BY_SECTION[n] ?? []) {
      shape[`${q.field}_accuracy`] = q.type === "governance-scale" ? optionalNumber : optionalString;
      shape[`${q.field}_followup`] = optionalString;
    }
  }
  return shape;
}

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
  q0_1_ready: optionalString,
  q0_2_ecosystem_understanding: optionalString,
  q0_3_systems_thinking_value: optionalNumber,
  q0_4_cld_understanding: optionalNumber,
  q0_5_feedback_loops_understanding: optionalNumber,
  q0_6_leverage_points_understanding: optionalNumber,

  // ═══ Step 1: Privacy & Consent (the ONLY fields this schema treats as required) ═══
  q01_consent_participate: requiredBoolean.describe("Consent to participate"),
  q01_consent_anonymize: optionalBoolean,
  q01_consent_email_copy: optionalBoolean,
  q01_consent_voluntary: optionalBoolean,

  // ═══ Step 2: Respondent Profile ═══
  q2_name: optionalString,
  q2_email: z.string().email("Invalid email format").optional().or(z.literal("")),
  q2_organization: optionalString,
  q2_position: optionalString,
  q2_province: optionalString,
  q2_category: optionalString,
  q2_expertise: optionalStringArray,
  
  // SCHEMA CONFLICT RESOLUTION: 
  // Converted plain text to a proper inline comment to prevent TS1005/TS1127 syntax errors.
  // Note: q2_network_accuracy changed from optionalString → optionalNumber
  // because it now uses LikertScale (1–5) instead of free-text options.
  q2_network_accuracy: optionalNumber,
  
  // ═══ Step 3: BEIE & Systems Thinking ═══
  // No SWOT scale items belong here — SWOT_Scale_Questions.md maps them to
  // Sections 4-9 only. Section 3 carries framework comprehension + the two
  // Causal Loop Diagram validation questions (see swot-content.ts §3).
  q03_beie_video_understanding: optionalNumber,
  q03_systems_reframing_accuracy: optionalNumber,
  q03_sector_to_ecosystem_shift: optionalNumber,
  q03_beie_framework_clarity: optionalNumber,
  q03_operating_systems_understanding: optionalNumber,
  q03_five_clusters_understanding: optionalNumber,
  ...archetypeFieldsFor([3]),

  // ═══ Step 4: Cluster 1 — Foundations ═══
  q04_foundations_banner_understanding: optionalNumber,
  ...swotFieldsFor([4]),
  ...archetypeFieldsFor([4]),

  // ═══ Step 5: Cluster 2 — Transformers ═══
  q05_transformers_banner_understanding: optionalNumber,
  q05_halal_advantage_understanding: optionalNumber,
  q05_farm_to_market_understanding: optionalNumber,
  q05_economic_zones_understanding: optionalNumber,
  ...swotFieldsFor([5]),
  ...archetypeFieldsFor([5]),

  // ═══ Step 6: Cluster 3 — Enablers ═══
  q06_halal_sector_rank: optionalString,
  q06_infra_sequencing_effectiveness: optionalNumber,
  q06_begmp_confidence: optionalNumber,
  q06_tourism_confidence: optionalNumber,
  q06_digital_tourism_rank: optionalStringArray,
  q06_moral_governance_realistic: optionalString,
  ...swotFieldsFor([6]),
  ...archetypeFieldsFor([6]),

  // ═══ Step 7: Cluster 4 — Connectors ═══
  q07_connectivity_priority: optionalString,
  q07_integration_challenge: optionalString,
  q07_priority_node: optionalString,
  q07_trapped_value_province: optionalString,
  q07_bridge_impact: optionalString,
  q07_gateway_province: optionalString,
  q07_priority_vector: optionalString,
  q07_uae_feasibility: optionalNumber,
  q07_bimpeaga_leverage: optionalNumber,
  ...swotFieldsFor([7]),
  ...archetypeFieldsFor([7]),

  // ═══ Step 8: Cluster 5 — Financiers ═══
  q08_finance_tier_priority: optionalString,
  q08_roadmap_achievable: optionalNumber,
  q08_priority_action: optionalString,
  q08_islamic_authority: optionalString,
  ...swotFieldsFor([8]),
  ...archetypeFieldsFor([8]),

  // ═══ Step 9: Operating Systems ═══
  q09_regulatory_priority: optionalString,
  q09_revenue_channel: optionalString,
  q09_stakeholder_alignment: optionalString,
  q09_reform_priority: optionalString,
  ...swotFieldsFor([9]),
  ...archetypeFieldsFor([9]),

  // ═══ Step 10: IEDS & 3-Phase Plan ═══
  q10_ieds_preference: optionalString,
  q10_matrix: iedsMatrixSchema,
  q10_sequencing_logic: optionalString,
  q10_leverage_points: optionalNumber,
  q10_ieds_execution: optionalNumber,

  // ═══ Step 11: Metrics Architecture & KPIs ═══
  q11_calibration_appropriate: optionalString,
  q11_governance_kpi_importance: optionalNumber,
  q11_resilience_kpi_importance: optionalNumber,
  q11_inclusivity_kpi_importance: optionalNumber,
  q11_peace_kpi_importance: optionalNumber,
  q11_cluster_kpi_sufficient: optionalString,
  q11_benchmark_priority: optionalString,
  ...archetypeFieldsFor([11]), // Drifting Goals

  // ═══ Step 12: Balanced Scorecard ═══
  q12_learning_growth_alignment: optionalNumber,
  q12_internal_process_alignment: optionalNumber,
  q12_stakeholder_alignment: optionalNumber,
  q12_financial_alignment: optionalNumber,
  q12_strongest_pathway: optionalString,
  q12_vision_clarity: optionalNumber,
  q12_vision_achievable: optionalNumber,
  q12_mission_alignment: optionalNumber,
  q12_bsc_useful: optionalNumber,
  q12_adaptive_frequency: optionalString,

  // ═══ Step 13: Priority Actions & Budget ═══
  q13_funding_mix_fair: optionalNumber,
  q13_targets_realistic: optionalNumber,
  q13_high_risk_concern: optionalNumber,
  q13_medium_risk_concern: optionalNumber,
  q13_low_risk_concern: optionalNumber,
  q13_budget_priority_phase: optionalString,
  q13_budget_priority_cluster: optionalString,
  q13_blended_finance_opinion: optionalString,

  // ═══ Step 14: Resources & Engagement ═══
  q14_engagement_type: optionalStringArray,
  q14_contact_method: optionalString,
  q14_timing: optionalString,
  q14_role_contribution: optionalString,
  q14_additional_comments: optionalString,

  // ═══ Step 15: Review & Submission ═══
  q15_confirm_accurate: optionalBoolean,
  q15_consent_anonymous_use: optionalBoolean,
  q15_consent_voluntary: optionalBoolean,
  q15_ready_to_submit: optionalBoolean,

  // consent_final is NEVER hardcoded by the client (see api.ts) — it is derived
  // strictly from q01_consent_participate at submission time, and the edge
  // function independently re-validates it server-side.
  consent_final: z.literal(true, {
    errorMap: () => ({ message: "You must confirm accuracy and consent to submit" }),
  }),
});

export type SurveySchemaType = z.infer<typeof surveySchema>;

// ── Re-exported so components can import everything survey-related from one place ──
export { SWOT_BY_SECTION, ARCHETYPES_BY_SECTION } from "./swot-content";
export type { SwotItem, ArchetypeQuestion, SwotCategory } from "./swot-content";
