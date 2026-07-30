// src/lib/survey-schema.ts
// BIRD 2026–2035 · Validation Survey Zod Schema
// Single source of truth for all 16 survey sections.
//
// FIXES APPLIED (2026-07-30 audit):
// 1. Normalized padded section prefixes (q01→q09) to unpadded (q1→q9)
//    so manual fields match the generator output from swot-content.ts.
// 2. Added missing Section 9 fields (q9_1_moral_governance_derisk,
//    q9_2_critical_loop) and Section 10 fields (sequence A/B/C,
//    leverage_points_clarity, activating_leverage, capacity_traps,
//    iceberg_model, collaborative_governance, strategic_ranking) that
//    existed in SurveyWizard.tsx but were absent from the schema.
// 3. Removed phantom SWOT fields from Sections 7–9 that did not exist in
//    swot-content.ts; only canonical SWOT_BY_SECTION items are generated.
// 4. Archetype fields are produced by archetypeFieldsFor() directly from
//    ARCHETYPES_BY_SECTION — no hand-typed duplicates.

import { z } from "zod";
import { SWOT_BY_SECTION, ARCHETYPES_BY_SECTION } from "./swot-content";

const optionalString = z.string().optional();
const optionalNumber = z.number().min(0).max(5).optional();
const optionalBoolean = z.boolean().optional();
const optionalStringArray = z.array(z.string()).default([]);
const requiredBoolean = z.boolean({ required_error: "This consent is required" });

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

export const surveySchema = z.object({
  // Step 0
  q0_1_ready: optionalString,
  q0_3_systems_thinking_value: optionalNumber,
  q0_4_cld_understanding: optionalString,
  q0_5_feedback_loops_understanding: optionalString,
  q0_6_leverage_points_understanding: optionalString,

  // Step 1 — only required fields
  q1_consent_participate: requiredBoolean.describe("Consent to participate"),
  q1_consent_anonymize: optionalBoolean,
  q1_consent_email_copy: optionalBoolean,
  q1_consent_voluntary: optionalBoolean,

  // Step 2
  q2_demo_category: optionalString,
  q2_demo_province: optionalString,
  q2_demo_expertise: optionalStringArray,
  q2_demo_name: optionalString,
  q2_demo_email: z.string().email("Invalid email format").optional().or(z.literal("")),
  q2_demo_organization: optionalString,
  q2_demo_position: optionalString,
  q2_network_accuracy: optionalString,

  // Step 3
  q3_1_beie_video_understanding: optionalNumber,
  q3_2_systems_reframing_accuracy: optionalNumber,
  q3_3_sector_to_ecosystem_shift: optionalNumber,
  q3_4_beie_framework_clarity: optionalNumber,
  q3_5_operating_systems_understanding: optionalNumber,
  q3_6_five_clusters_understanding: optionalNumber,
  ...archetypeFieldsFor([3]), // q3_cld1_…, q3_cld2_…

  // Step 4
  q4_1_foundations_banner_understanding: optionalNumber,
  ...swotFieldsFor([4]),
  ...archetypeFieldsFor([4]), // q4_arch_tragedy_commons_…

  // Step 5
  q5_1_transformers_banner_understanding: optionalNumber,
  q5_2_halal_advantage_understanding: optionalNumber,
  q5_3_farm_to_market_understanding: optionalNumber,
  q5_4_economic_zones_understanding: optionalNumber,
  ...swotFieldsFor([5]),
  ...archetypeFieldsFor([5]), // q5_arch_growth_underinvest_…

  // Step 6
  q6_1_halal_sector_rank: optionalString,
  q6_2_sequencing_effectiveness: optionalNumber,
  q6_3_begmp_confidence: optionalNumber,
  q6_4_tourism_confidence: optionalNumber,
  q6_5_digital_tourism_rank: optionalStringArray,
  q6_6_moral_governance_realistic: optionalString,
  ...swotFieldsFor([6]),
  ...archetypeFieldsFor([6]), // q6_arch_limits_growth_…

  // Step 7
  q7_1_connectivity_priority: optionalString,
  q7_2_integration_challenge: optionalString,
  q7_3_priority_node: optionalString,
  q7_4_trapped_value_province: optionalString,
  q7_5_bridge_impact: optionalString,
  q7_6_gateway_province: optionalString,
  q7_7_priority_vector: optionalString,
  q7_8_uae_feasibility: optionalNumber,
  q7_9_bimpeaga_leverage: optionalNumber,
  ...swotFieldsFor([7]),
  ...archetypeFieldsFor([7]), // q7_arch_success_successful_…

  // Step 8
  q8_1_finance_tier_priority: optionalString,
  q8_2_roadmap_achievable: optionalNumber,
  q8_3_priority_action: optionalString,
  q8_4_islamic_authority: optionalString,
  ...swotFieldsFor([8]),
  ...archetypeFieldsFor([8]), // q8_arch_shifting_burden_…

  // Step 9 — NOTE: added q9_1 / q9_2 which existed in wizard but were missing
  q9_1_moral_governance_derisk: optionalNumber,
  q9_2_critical_loop: optionalString,
  q9_3_regulatory_priority: optionalString,
  q9_4_revenue_channel: optionalString,
  q9_5_stakeholder_alignment: optionalString,
  q9_6_reform_priority: optionalString,
  ...swotFieldsFor([9]),
  ...archetypeFieldsFor([9]), // q9_arch_moral_governance_derisk_…, fixes_fail, escalation, big_man

  // Step 10 — expanded to match all wizard fields
  q10_1_ieds_preference: optionalString,
  q10_2_sequence_a_priority: optionalNumber,
  q10_3_sequence_b_priority: optionalNumber,
  q10_4_sequence_c_priority: optionalNumber,
  q10_5_sequencing_logic: optionalString,
  q10_6_risk_mitigation: optionalString,
  q10_7_outcomes_achievable: optionalNumber,
  q10_matrix: iedsMatrixSchema,
  q10_leverage_points_clarity: optionalNumber,
  q10_activating_leverage: optionalNumber,
  q10_capacity_traps: optionalNumber,
  q10_iceberg_model: optionalNumber,
  q10_collaborative_governance: optionalNumber,
  q10_strategic_ranking: optionalString,

  // Step 11
  q11_1_calibration_appropriate: optionalString,
  q11_2_governance_kpi_importance: optionalNumber,
  q11_3_resilience_kpi_importance: optionalNumber,
  q11_4_inclusivity_kpi_importance: optionalNumber,
  q11_5_peace_kpi_importance: optionalNumber,
  q11_6_cluster_kpi_sufficient: optionalString,
  q11_7_benchmark_priority: optionalString,
  ...archetypeFieldsFor([11]), // q11_arch_drifting_goals_…

  // Step 12
  q12_1_learning_growth_alignment: optionalNumber,
  q12_2_internal_process_alignment: optionalNumber,
  q12_3_stakeholder_alignment: optionalNumber,
  q12_4_financial_alignment: optionalNumber,
  q12_5_strongest_pathway: optionalString,
  q12_6_vision_clarity: optionalNumber,
  q12_7_vision_achievable: optionalNumber,
  q12_8_mission_alignment: optionalNumber,
  q12_9_bsc_useful: optionalNumber,
  q12_10_adaptive_frequency: optionalString,

  // Step 13
  q13_1_funding_mix_fair: optionalNumber,
  q13_2_targets_realistic: optionalNumber,
  q13_3_high_risk_concern: optionalNumber,
  q13_4_medium_risk_concern: optionalNumber,
  q13_5_low_risk_concern: optionalNumber,
  q13_6_budget_priority_phase: optionalString,
  q13_7_budget_priority_cluster: optionalString,
  q13_8_blended_finance_opinion: optionalString,

  // Step 14
  q14_1_engagement_type: optionalStringArray,
  q14_2_contact_method: optionalString,
  q14_3_timing: optionalString,
  q14_4_role_contribution: optionalString,
  q14_5_additional_comments: optionalString,

  // Step 15
  q15_1_confirm_accurate: optionalBoolean,
  q15_2_consent_anonymous_use: optionalBoolean,
  q15_3_consent_voluntary: optionalBoolean,
  q15_4_ready_to_submit: optionalBoolean,

  consent_final: z.literal(true, {
    errorMap: () => ({ message: "You must confirm accuracy and consent to submit" }),
  }),
});

export type SurveySchemaType = z.infer<typeof surveySchema>;

export { SWOT_BY_SECTION, ARCHETYPES_BY_SECTION } from "./swot-content";
export type { SwotItem, ArchetypeQuestion, SwotCategory } from "./swot-content";
