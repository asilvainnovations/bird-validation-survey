// src/lib/survey-schema.ts
// BIRD 2026–2035 · Validation Survey Zod Schema
// Single source of truth for all 16 survey sections
// Updated: 2026-07-23 — Aligned with BEIE Framework and SWOT distribution

import { z } from "zod";

// ── Reusable field validators ───────────────────────────────────────────────
const optionalString = z.string().optional();
const optionalNumber = z.number().min(0).max(5).optional();
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
  // ═══ Step 0: Welcome & Orientation ══
  q0_1_ready: optionalString,
  q0_2_ecosystem_understanding: optionalString,
  q0_3_systems_thinking_value: optionalNumber,
  q0_4_cld_understanding: optionalNumber,
  q0_5_feedback_loops_understanding: optionalNumber,

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
  q03_systems_reframing_agreement: optionalNumber,
  // SWOT Strengths (Transformers Cluster)
  q_s1_halal_legitimacy_impact: optionalNumber,
  q_s1_halal_legitimacy_likelihood: optionalNumber,
  q_s4_domestic_halal_impact: optionalNumber,
  q_s4_domestic_halal_likelihood: optionalNumber,
  q_s10_cultural_heritage_impact: optionalNumber,
  q_s10_cultural_heritage_likelihood: optionalNumber,
  q_s6_polloc_impact: optionalNumber,
  q_s6_polloc_likelihood: optionalNumber,

  // ═══ Step 4: Cluster 1 — Foundations ═══
  // SWOT Strengths
  q_s3_aff_base_impact: optionalNumber,
  q_s3_aff_base_likelihood: optionalNumber,
  q_s8_renewable_energy_impact: optionalNumber,
  q_s8_renewable_energy_likelihood: optionalNumber,
  q_s11_lake_lanao_impact: optionalNumber,
  q_s11_lake_lanao_likelihood: optionalNumber,
  // SWOT Opportunities
  q_s2_renewable_invest_impact: optionalNumber,
  q_s2_renewable_invest_likelihood: optionalNumber,
  q_s7_carbon_markets_impact: optionalNumber,
  q_s7_carbon_markets_likelihood: optionalNumber,
  q_s8_pes_impact: optionalNumber,
  q_s8_pes_likelihood: optionalNumber,
  // SWOT Threats
  q_s10_pestalotiopsis_impact: optionalNumber,
  q_s10_pestalotiopsis_likelihood: optionalNumber,
  // Archetype: Tragedy of the Commons
  q_s4_tragedy_commons: optionalString,
  q_s4_tragedy_followup: optionalString,

  // ═══ Step 5: Cluster 2 — Transformers ═══
  // SWOT Weaknesses
  q_s7_cold_chain_impact: optionalNumber,
  q_s7_cold_chain_likelihood: optionalNumber,
  q_s3_halal_cert_impact: optionalNumber,
  q_s3_halal_cert_likelihood: optionalNumber,
  q_s3_standards_recognition_impact: optionalNumber,
  q_s3_standards_recognition_likelihood: optionalNumber,
  // Archetype: Growth and Underinvestment
  q_s5_growth_underinvest: optionalString,
  q_s5_growth_followup: optionalString,

  // ═══ Step 6: Cluster 3 — Enablers ═══
  // SWOT Weaknesses
  q_s2_poverty_impact: optionalNumber,
  q_s2_poverty_likelihood: optionalNumber,
  q_s4_literacy_impact: optionalNumber,
  q_s4_literacy_likelihood: optionalNumber,
  q_s8_skills_mismatch_impact: optionalNumber,
  q_s8_skills_mismatch_likelihood: optionalNumber,
  // SWOT Strengths
  q_s5_youth_pop_impact: optionalNumber,
  q_s5_youth_pop_likelihood: optionalNumber,
  // Infrastructure sequencing questions
  q06_infra_sequencing_effectiveness: optionalNumber,
  q06_digital_confidence: optionalNumber,
  q06_tourism_confidence: optionalNumber,
  q06_moral_governance_realistic: optionalString,
  // Archetype: Limits to Growth
  q_s6_limits_growth: optionalString,
  q_s6_limits_followup: optionalString,

  // ═══ Step 7: Cluster 4 — Connectors ═══
  // SWOT Strengths
  q_s2_bimpeaga_impact: optionalNumber,
  q_s2_bimpeaga_likelihood: optionalNumber,
  q_s7_domestic_halal_impact: optionalNumber,
  q_s7_domestic_halal_likelihood: optionalNumber,
  // SWOT Opportunities
  q_s1_global_halal_impact: optionalNumber,
  q_s1_global_halal_likelihood: optionalNumber,
  q_s6_uae_corridor_impact: optionalNumber,
  q_s6_uae_corridor_likelihood: optionalNumber,
  // Connectivity questions
  q07_connectivity_integration: optionalNumber,
  q07_maritime_revitalization: optionalNumber,
  q07_geographic_isolation: optionalNumber,
  // Archetype: Success to the Successful
  q_s3_success_successful: optionalString,
  q_s3_success_followup: optionalString,

  // ═══ Step 8: Cluster 5 — Financiers ═══
  // SWOT Strengths
  q_s9_islamic_finance_impact: optionalNumber,
  q_s9_islamic_finance_likelihood: optionalNumber,
  // Archetype: Shifting the Burden
  q_s1_shifting_burden: optionalString,
  q_s1_shifting_followup: optionalString,

  // ═══ Step 9: Operating Systems ═══
  // SWOT Strengths
  q_s7_policy_recognition_impact: optionalNumber,
  q_s7_policy_recognition_likelihood: optionalNumber,
  q_s12_peace_dividend_impact: optionalNumber,
  q_s12_peace_dividend_likelihood: optionalNumber,
  // SWOT Opportunities
  q_s9_forestry_code_impact: optionalNumber,
  q_s9_forestry_code_likelihood: optionalNumber,
  q_s9_cultural_heritage_impact: optionalNumber,
  q_s9_cultural_heritage_likelihood: optionalNumber,
  // SWOT Threats
  q_s9_security_incidents_impact: optionalNumber,
  q_s9_security_incidents_likelihood: optionalNumber,
  q_s5_political_transition_impact: optionalNumber,
  q_s5_political_transition_likelihood: optionalNumber,
  // Governance questions
  q09_moral_governance_derisk: optionalNumber,
  q09_regulatory_architecture: optionalNumber,
  q09_jmc_revenue: optionalNumber,
  // Archetype: Fixes that Fail
  q_s2_fixes_fail: optionalString,
  q_s2_fixes_followup: optionalString,
  // Archetype: Big Man
  q_s6_big_man: optionalString,
  q_s6_big_man_followup: optionalString,

  // ═══ Step 10: IEDS & 3-Phase Plan ═══
  q10_ieds_preference: optionalString,
  q10_matrix: iedsMatrixSchema,
  q10_sequencing_logic: optionalString,
  q10_leverage_points: optionalNumber,
  q10_ieds_execution: optionalNumber,

  // ══ Step 11: Metrics Architecture & KPIs ═══
  q11_calibration_appropriate: optionalString,
  q11_governance_kpi_importance: optionalNumber,
  q11_resilience_kpi_importance: optionalNumber,
  q11_inclusivity_kpi_importance: optionalNumber,
  q11_peace_kpi_importance: optionalNumber,
  q11_cluster_kpi_sufficient: optionalString,
  q11_benchmark_priority: optionalString,
  // Archetype: Drifting Goals
  q_s11_drifting_goals: optionalString,
  q_s11_drifting_followup: optionalString,

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
  consent_final: z.literal(true, {
    errorMap: () => ({ message: "You must confirm accuracy and consent to submit" }),
  }),
});

export type SurveySchemaType = z.infer<typeof surveySchema>;
