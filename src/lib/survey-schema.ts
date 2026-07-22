// src/lib/survey-schema.ts
// BIRD 2026–2035 · Validation Survey Zod Schema
// Single source of truth for all 16 survey sections
// Updated: 2026-07-23 — Fully aligned with SurveyWizard payload and Edge Function

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
  // ═══ Step 0: Welcome & Orientation ═══
  q0_1_ready: optionalString,
  q0_2_ecosystem_understanding: optionalString,
  q0_3_systems_thinking_value: optionalNumber,
  q0_4_cld_understanding: optionalNumber,
  q0_5_feedback_loops_understanding: optionalNumber,

  // ═══ Step 1: Privacy & Consent ═══
  q01_consent_participate: requiredBoolean.describe("Consent to participate"),
  q01_consent_anonymize: optionalBoolean,
  q01_consent_email_copy: optionalBoolean,
  q01_consent_voluntary: optionalBoolean,

  // ═══ Step 2: Respondent Profile ═══
  q02_demo_category: optionalString,
  q02_demo_province: optionalString,
  q02_demo_expertise: optionalStringArray,
  q02_demo_name: optionalString,
  q02_demo_email: z.string().email("Invalid email format").optional().or(z.literal("")),
  q02_demo_organization: optionalString,
  q02_demo_position: optionalString,

  // ═══ Step 3: BEIE & Systems Thinking ═══
  q3_1_beie_collaboration: optionalString,
  q3_2_beie_understanding: optionalString,
  q3_3_beie_relevance: optionalString,
  q3_4_cluster_position: optionalString,
  q_s1_halal_legitimacy_impact: optionalNumber,
  q_s1_halal_legitimacy_likelihood: optionalNumber,
  q_s1_bimpeaga_impact: optionalNumber,
  q_s1_bimpeaga_likelihood: optionalNumber,
  q_s1_aff_base_impact: optionalNumber,
  q_s1_aff_base_likelihood: optionalNumber,

  // ═══ Step 4: Cluster 1 — Foundations ═══
  q4_1_priorities: optionalStringArray,
  q4_2_maguindanao_logistics: optionalString,
  q4_3_feasibility: optionalNumber,
  q_s4_climate_impact: optionalNumber,
  q_s4_climate_likelihood: optionalNumber,
  q_s4_pestalotiopsis_impact: optionalNumber,
  q_s4_pestalotiopsis_likelihood: optionalNumber,
  q_s4_postharvest_impact: optionalNumber,
  q_s4_postharvest_likelihood: optionalNumber,
  q_s4_poverty_impact: optionalNumber,
  q_s4_poverty_likelihood: optionalNumber,
  q_s4_tragedy_commons: optionalString,
  q_s4_tragedy_followup: optionalString,
  q_s4_limits_growth: optionalString,

  // ═══ Step 5: Cluster 2 — Transformers ═══
  q5_1_cold_chain: optionalString,
  q5_2_economic_zones: optionalString,
  q5_3_barrier: optionalString,
  q5_4_halal_park: optionalString,
  q_s5_halal_cert_impact: optionalNumber,
  q_s5_halal_cert_likelihood: optionalNumber,
  q_s5_skills_mismatch_impact: optionalNumber,
  q_s5_skills_mismatch_likelihood: optionalNumber,
  q_s5_global_halal_impact: optionalNumber,
  q_s5_global_halal_likelihood: optionalNumber,
  q_s5_uae_corridor_impact: optionalNumber,
  q_s5_uae_corridor_likelihood: optionalNumber,
  q_s5_competition_impact: optionalNumber,
  q_s5_competition_likelihood: optionalNumber,
  q_s5_fixes_fail: optionalString,
  q_s5_fixes_followup: optionalString,
  q_s5_successful: optionalString,
  q_s5_successful_followup: optionalString,

  // ═══ Step 6: Cluster 3 — Enablers ═══
  q_s6_youth_pop_impact: optionalNumber, q_s6_youth_pop_likelihood: optionalNumber,
  q_s6_renewable_energy_impact: optionalNumber, q_s6_renewable_energy_likelihood: optionalNumber,
  q_s6_polloc_impact: optionalNumber, q_s6_polloc_likelihood: optionalNumber,
  q_s6_infra_deficits_impact: optionalNumber, q_s6_infra_deficits_likelihood: optionalNumber,
  q_s6_literacy_impact: optionalNumber, q_s6_literacy_likelihood: optionalNumber,
  q_s6_skills_mismatch_impact: optionalNumber, q_s6_skills_mismatch_likelihood: optionalNumber,
  q_s6_tech_adoption_impact: optionalNumber, q_s6_tech_adoption_likelihood: optionalNumber,
  q_s6_renewable_invest_impact: optionalNumber, q_s6_renewable_invest_likelihood: optionalNumber,
  q_s6_tourism_potential_impact: optionalNumber, q_s6_tourism_potential_likelihood: optionalNumber,
  q_s6_political_transition_impact: optionalNumber, q_s6_political_transition_likelihood: optionalNumber,
  q_s6_cost_overruns_impact: optionalNumber, q_s6_cost_overruns_likelihood: optionalNumber,
  q_s6_natl_coord_impact: optionalNumber, q_s6_natl_coord_likelihood: optionalNumber,
  q_s6_shifting_burden: optionalString, q_s6_shifting_followup: optionalString,
  q_s6_growth_underinvest: optionalString, q_s6_growth_followup: optionalString,
  q6_1_halal_sector_rank: optionalString, q6_2_sequencing_effectiveness: optionalNumber,
  q6_3_begmp_confidence: optionalNumber, q6_4_tourism_confidence: optionalNumber,
  q6_5_digital_tourism_rank: optionalStringArray, q6_6_moral_governance_realistic: optionalString,

  // ═══ Step 7: Cluster 4 — Connectors ═══
  q_s7_bimpeaga_loc_impact: optionalNumber, q_s7_bimpeaga_loc_likelihood: optionalNumber,
  q_s7_domestic_halal_impact: optionalNumber, q_s7_domestic_halal_likelihood: optionalNumber,
  q_s7_polloc_impact: optionalNumber, q_s7_polloc_likelihood: optionalNumber,
  q_s7_islamic_finance_impact: optionalNumber, q_s7_islamic_finance_likelihood: optionalNumber,
  q_s7_infra_deficits_impact: optionalNumber, q_s7_infra_deficits_likelihood: optionalNumber,
  q_s7_fragmented_policy_impact: optionalNumber, q_s7_fragmented_policy_likelihood: optionalNumber,
  q_s7_market_linkages_impact: optionalNumber, q_s7_market_linkages_likelihood: optionalNumber,
  q_s7_tech_adoption_impact: optionalNumber, q_s7_tech_adoption_likelihood: optionalNumber,
  q_s7_asean_halal_impact: optionalNumber, q_s7_asean_halal_likelihood: optionalNumber,
  q_s7_bimpeaga_integration_impact: optionalNumber, q_s7_bimpeaga_integration_likelihood: optionalNumber,
  q_s7_uae_corridor_impact: optionalNumber, q_s7_uae_corridor_likelihood: optionalNumber,
  q_s7_tourism_potential_impact: optionalNumber, q_s7_tourism_potential_likelihood: optionalNumber,
  q_s7_halal_competition_impact: optionalNumber, q_s7_halal_competition_likelihood: optionalNumber,
  q_s7_security_incidents_impact: optionalNumber, q_s7_security_incidents_likelihood: optionalNumber,
  q_s7_price_volatility_impact: optionalNumber, q_s7_price_volatility_likelihood: optionalNumber,
  q_s7_natl_coord_impact: optionalNumber, q_s7_natl_coord_likelihood: optionalNumber,
  q_s7_escalation: optionalString, q_s7_escalation_followup: optionalString,
  q_s7_limits_growth: optionalString, q_s7_limits_followup: optionalString,
  q7_1_connectivity_priority: optionalString, q7_2_integration_challenge: optionalString,
  q7_3_priority_node: optionalString, q7_4_trapped_value_province: optionalString,
  q7_5_bridge_impact: optionalString, q7_6_gateway_province: optionalString,
  q7_7_priority_vector: optionalString, q7_8_uae_feasibility: optionalNumber,
  q7_9_bimpeaga_leverage: optionalNumber,

  // ═══ Step 8: Cluster 5 — Financiers ═══
  q_s8_domestic_halal_impact: optionalNumber, q_s8_domestic_halal_likelihood: optionalNumber,
  q_s8_youth_pop_impact: optionalNumber, q_s8_youth_pop_likelihood: optionalNumber,
  q_s8_policy_recognition_impact: optionalNumber, q_s8_policy_recognition_likelihood: optionalNumber,
  q_s8_islamic_finance_fw_impact: optionalNumber, q_s8_islamic_finance_fw_likelihood: optionalNumber,
  q_s8_peace_dividend_impact: optionalNumber, q_s8_peace_dividend_likelihood: optionalNumber,
  q_s8_infra_deficits_impact: optionalNumber, q_s8_infra_deficits_likelihood: optionalNumber,
  q_s8_literacy_impact: optionalNumber, q_s8_literacy_likelihood: optionalNumber,
  q_s8_financial_penetration_impact: optionalNumber, q_s8_financial_penetration_likelihood: optionalNumber,
  q_s8_fragmented_policy_impact: optionalNumber, q_s8_fragmented_policy_likelihood: optionalNumber,
  q_s8_skills_mismatch_impact: optionalNumber, q_s8_skills_mismatch_likelihood: optionalNumber,
  q_s8_global_halal_impact: optionalNumber, q_s8_global_halal_likelihood: optionalNumber,
  q_s8_renewable_invest_impact: optionalNumber, q_s8_renewable_invest_likelihood: optionalNumber,
  q_s8_asean_halal_impact: optionalNumber, q_s8_asean_halal_likelihood: optionalNumber,
  q_s8_islamic_ecosystem_impact: optionalNumber, q_s8_islamic_ecosystem_likelihood: optionalNumber,
  q_s8_uae_corridor_impact: optionalNumber, q_s8_uae_corridor_likelihood: optionalNumber,
  q_s8_halal_competition_impact: optionalNumber, q_s8_halal_competition_likelihood: optionalNumber,
  q_s8_halal_standards_impact: optionalNumber, q_s8_halal_standards_likelihood: optionalNumber,
  q_s8_security_incidents_impact: optionalNumber, q_s8_security_incidents_likelihood: optionalNumber,
  q_s8_political_transition_impact: optionalNumber, q_s8_political_transition_likelihood: optionalNumber,
  q_s8_big_man: optionalString, q_s8_big_man_followup: optionalString,
  q_s8_shifting_burden: optionalString, q_s8_shifting_followup: optionalString,
  q8_1_finance_tier_priority: optionalString, q8_2_roadmap_achievable: optionalNumber,
  q8_3_priority_action: optionalString, q8_4_islamic_authority: optionalString,

  // ═══ Step 9: Operating Systems ═══
  q_s9_policy_recognition_impact: optionalNumber, q_s9_policy_recognition_likelihood: optionalNumber,
  q_s9_islamic_finance_impact: optionalNumber, q_s9_islamic_finance_likelihood: optionalNumber,
  q_s9_cultural_heritage_impact: optionalNumber, q_s9_cultural_heritage_likelihood: optionalNumber,
  q_s9_peace_dividend_impact: optionalNumber, q_s9_peace_dividend_likelihood: optionalNumber,
  q_s9_literacy_impact: optionalNumber, q_s9_literacy_likelihood: optionalNumber,
  q_s9_fragmented_policy_impact: optionalNumber, q_s9_fragmented_policy_likelihood: optionalNumber,
  q_s9_underspending_impact: optionalNumber, q_s9_underspending_likelihood: optionalNumber,
  q_s9_carbon_markets_impact: optionalNumber, q_s9_carbon_markets_likelihood: optionalNumber,
  q_s9_pes_impact: optionalNumber, q_s9_pes_likelihood: optionalNumber,
  q_s9_postconflict_impact: optionalNumber, q_s9_postconflict_likelihood: optionalNumber,
  q_s9_forestry_code_impact: optionalNumber, q_s9_forestry_code_likelihood: optionalNumber,
  q_s9_security_incidents_impact: optionalNumber, q_s9_security_incidents_likelihood: optionalNumber,
  q_s9_political_transition_impact: optionalNumber, q_s9_political_transition_likelihood: optionalNumber,
  q_s9_fragmented_agency_impact: optionalNumber, q_s9_fragmented_agency_likelihood: optionalNumber,
  q_s9_investment_loop: optionalString, q_s9_investment_loop_followup: optionalString,
  q_s9_governance_loop: optionalString, q_s9_governance_loop_followup: optionalString,
  q9_1_moral_governance_derisk: optionalNumber, q9_2_critical_loop: optionalString,
  q9_3_regulatory_priority: optionalString, q9_4_revenue_channel: optionalString,
  q9_5_stakeholder_alignment: optionalString, q9_6_reform_priority: optionalString,

  // ═══ Step 10: IEDS & 3-Phase Plan ═══
  q10_1_ieds_preference: optionalString, q10_2_sequence_a_priority: optionalNumber,
  q10_3_sequence_b_priority: optionalNumber, q10_4_sequence_c_priority: optionalNumber,
  q10_5_sequencing_logic: optionalString, q10_6_risk_mitigation: optionalString,
  q10_7_outcomes_achievable: optionalNumber, q10_matrix: iedsMatrixSchema.optional(),

  // ═══ Step 11: Metrics Architecture ═══
  q11_1_calibration_appropriate: optionalString, q11_2_governance_kpi_importance: optionalNumber,
  q11_3_resilience_kpi_importance: optionalNumber, q11_4_inclusivity_kpi_importance: optionalNumber,
  q11_5_peace_kpi_importance: optionalNumber, q11_6_cluster_kpi_sufficient: optionalString,
  q11_7_benchmark_priority: optionalString,

  // ═══ Step 12: Balanced Scorecard ═══
  q12_1_learning_growth_alignment: optionalNumber, q12_2_internal_process_alignment: optionalNumber,
  q12_3_stakeholder_alignment: optionalNumber, q12_4_financial_alignment: optionalNumber,
  q12_5_strongest_pathway: optionalString, q12_6_vision_clarity: optionalNumber,
  q12_7_vision_achievable: optionalNumber, q12_8_mission_alignment: optionalNumber,
  q12_9_bsc_useful: optionalNumber, q12_10_adaptive_frequency: optionalString,

  // ═══ Step 13: Priority Actions & Budget ═══
  q13_1_funding_mix_fair: optionalNumber, q13_2_targets_realistic: optionalNumber,
  q13_3_high_risk_concern: optionalNumber, q13_4_medium_risk_concern: optionalNumber,
  q13_5_low_risk_concern: optionalNumber, q13_6_budget_priority_phase: optionalString,
  q13_7_budget_priority_cluster: optionalString, q13_8_blended_finance_opinion: optionalString,

  // ═══ Step 14: Resources & Engagement ═══
  q14_1_engagement_type: optionalStringArray, q14_2_contact_method: optionalString,
  q14_3_timing: optionalString, q14_4_role_contribution: optionalString,
  q14_5_additional_comments: optionalString,

  // ═══ Step 15: Review & Submit ═══
  q15_1_confirm_accurate: optionalBoolean, q15_2_consent_anonymous_use: optionalBoolean,
  q15_3_consent_voluntary: optionalBoolean, q15_4_ready_to_submit: optionalBoolean,
  consent_final: z.literal(true, {
    errorMap: () => ({ message: "You must confirm accuracy and consent to submit" }),
  }).optional().default(true),
});

export type SurveySchemaType = z.infer<typeof surveySchema>;
