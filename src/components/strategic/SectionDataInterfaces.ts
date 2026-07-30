// src/components/strategic/SectionDataInterfaces.ts
// BIRD 2026–2035 · Canonical Section Data Interfaces
// Aligned to survey-schema.ts and swot-content.ts (2026-07-30)
//
// INSTRUCTION: Paste each interface into its respective SectionN_*.tsx file,
// replacing the old SectionNData export. No other component logic changes are
// required — only the field names in the interface and the destructured state.

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 0 — Welcome & Orientation
// ─────────────────────────────────────────────────────────────────────────────
export interface Section0Data {
  q0_1_ready: string;
  q0_2_ecosystem_understanding: string;
  q0_3_systems_thinking_value: number | undefined;
  q0_4_cld_understanding: number | undefined;
  q0_5_feedback_loops_understanding: number | undefined;
  q0_6_leverage_points_understanding: number | undefined;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — Privacy & Consent
// ─────────────────────────────────────────────────────────────────────────────
export interface Section1Data {
  q1_consent_participate: boolean;
  q1_consent_anonymize: boolean;
  q1_consent_email_copy: boolean;
  q1_consent_voluntary: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — Respondent Profile (Demographics)
// ─────────────────────────────────────────────────────────────────────────────
export interface Section2Data {
  q2_demo_name: string;
  q2_demo_email: string;
  q2_demo_organization: string;
  q2_demo_position: string;
  q2_demo_province: string;
  q2_demo_category: string;
  q2_demo_expertise: string[];
  q2_network_accuracy: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — BEIE & Systems Thinking
// Archetypes from ARCHETYPES_BY_SECTION[3]:
//   q3_cld1_investment_development_{accuracy,followup}
//   q3_cld2_governance_confidence_{accuracy,followup}
// ─────────────────────────────────────────────────────────────────────────────
export interface Section3Data {
  q3_1_beie_video_understanding: number | undefined;
  q3_2_systems_reframing_accuracy: number | undefined;
  q3_3_sector_to_ecosystem_shift: number | undefined;
  q3_4_beie_framework_clarity: number | undefined;
  q3_5_operating_systems_understanding: number | undefined;
  q3_6_five_clusters_understanding: number | undefined;
  q3_cld1_investment_development_accuracy: string;
  q3_cld1_investment_development_followup: string;
  q3_cld2_governance_confidence_accuracy: string;
  q3_cld2_governance_confidence_followup: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 — Cluster 1: Foundations
// SWOT from SWOT_BY_SECTION[4] + archetype from ARCHETYPES_BY_SECTION[4]
// ─────────────────────────────────────────────────────────────────────────────
export interface Section4Data {
  q4_1_foundations_banner_understanding: number | undefined;
  q4_arch_tragedy_commons_accuracy: string;
  q4_arch_tragedy_commons_followup: string;
  // Strengths
  q4_s1_aff_base_impact: number | undefined;
  q4_s1_aff_base_likelihood: number | undefined;
  q4_s2_renewable_energy_impact: number | undefined;
  q4_s2_renewable_energy_likelihood: number | undefined;
  q4_s3_lake_lanao_impact: number | undefined;
  q4_s3_lake_lanao_likelihood: number | undefined;
  q4_s4_seaweed_dominance_impact: number | undefined;
  q4_s4_seaweed_dominance_likelihood: number | undefined;
  // Weaknesses
  q4_w1_land_tenure_impact: number | undefined;
  q4_w1_land_tenure_likelihood: number | undefined;
  // Opportunities
  q4_o1_renewable_invest_impact: number | undefined;
  q4_o1_renewable_invest_likelihood: number | undefined;
  q4_o2_carbon_markets_impact: number | undefined;
  q4_o2_carbon_markets_likelihood: number | undefined;
  q4_o3_pes_impact: number | undefined;
  q4_o3_pes_likelihood: number | undefined;
  q4_o4_forestry_code_impact: number | undefined;
  q4_o4_forestry_code_likelihood: number | undefined;
  // Threats
  q4_t1_pestalotiopsis_impact: number | undefined;
  q4_t1_pestalotiopsis_likelihood: number | undefined;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5 — Cluster 2: Transformers
// SWOT from SWOT_BY_SECTION[5] + archetype from ARCHETYPES_BY_SECTION[5]
// ─────────────────────────────────────────────────────────────────────────────
export interface Section5Data {
  q5_1_transformers_banner_understanding: number | undefined;
  q5_2_halal_advantage_understanding: number | undefined;
  q5_3_farm_to_market_understanding: number | undefined;
  q5_4_economic_zones_understanding: number | undefined;
  q5_arch_growth_underinvest_accuracy: string;
  q5_arch_growth_underinvest_followup: string;
  // Strengths
  q5_s1_halal_legitimacy_impact: number | undefined;
  q5_s1_halal_legitimacy_likelihood: number | undefined;
  q5_s2_domestic_demand_impact: number | undefined;
  q5_s2_domestic_demand_likelihood: number | undefined;
  q5_s3_polloc_freeport_impact: number | undefined;
  q5_s3_polloc_freeport_likelihood: number | undefined;
  q5_s4_cultural_heritage_impact: number | undefined;
  q5_s4_cultural_heritage_likelihood: number | undefined;
  // Weaknesses
  q5_w1_halal_cert_impact: number | undefined;
  q5_w1_halal_cert_likelihood: number | undefined;
  q5_w2_cold_chain_impact: number | undefined;
  q5_w2_cold_chain_likelihood: number | undefined;
  q5_w3_market_linkages_impact: number | undefined;
  q5_w3_market_linkages_likelihood: number | undefined;
  // Threats
  q5_t1_standards_recognition_impact: number | undefined;
  q5_t1_standards_recognition_likelihood: number | undefined;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6 — Cluster 3: Enablers
// SWOT from SWOT_BY_SECTION[6] + archetype from ARCHETYPES_BY_SECTION[6]
// ─────────────────────────────────────────────────────────────────────────────
export interface Section6Data {
  q6_1_halal_sector_rank: string;
  q6_2_sequencing_effectiveness: number | undefined;
  q6_3_begmp_confidence: number | undefined;
  q6_4_tourism_confidence: number | undefined;
  q6_5_digital_tourism_rank: string[];
  q6_6_moral_governance_realistic: string;
  q6_arch_limits_growth_accuracy: string;
  q6_arch_limits_growth_followup: string;
  // Strengths
  q6_s1_youth_pop_impact: number | undefined;
  q6_s1_youth_pop_likelihood: number | undefined;
  q6_s2_lanao_growth_impact: number | undefined;
  q6_s2_lanao_growth_likelihood: number | undefined;
  // Weaknesses
  q6_w1_infra_deficits_impact: number | undefined;
  q6_w1_infra_deficits_likelihood: number | undefined;
  q6_w2_poverty_impact: number | undefined;
  q6_w2_poverty_likelihood: number | undefined;
  q6_w3_literacy_impact: number | undefined;
  q6_w3_literacy_likelihood: number | undefined;
  q6_w4_malnutrition_impact: number | undefined;
  q6_w4_malnutrition_likelihood: number | undefined;
  q6_w5_skills_mismatch_impact: number | undefined;
  q6_w5_skills_mismatch_likelihood: number | undefined;
  q6_w6_tech_adoption_impact: number | undefined;
  q6_w6_tech_adoption_likelihood: number | undefined;
  q6_w7_underspending_impact: number | undefined;
  q6_w7_underspending_likelihood: number | undefined;
  // Opportunities
  q6_o1_tourism_recovery_impact: number | undefined;
  q6_o1_tourism_recovery_likelihood: number | undefined;
  q6_o2_digital_leapfrog_impact: number | undefined;
  q6_o2_digital_leapfrog_likelihood: number | undefined;
  // Threats
  q6_t1_cyber_insecurity_impact: number | undefined;
  q6_t1_cyber_insecurity_likelihood: number | undefined;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7 — Cluster 4: Connectors
// SWOT from SWOT_BY_SECTION[7] + archetype from ARCHETYPES_BY_SECTION[7]
// ─────────────────────────────────────────────────────────────────────────────
export interface Section7Data {
  q7_1_connectivity_priority: string;
  q7_2_integration_challenge: string;
  q7_3_priority_node: string;
  q7_4_trapped_value_province: string;
  q7_5_bridge_impact: string;
  q7_6_gateway_province: string;
  q7_7_priority_vector: string;
  q7_8_uae_feasibility: number | undefined;
  q7_9_bimpeaga_leverage: number | undefined;
  q7_arch_success_successful_accuracy: string;
  q7_arch_success_successful_followup: string;
  // Strengths
  q7_s1_bimpeaga_location_impact: number | undefined;
  q7_s1_bimpeaga_location_likelihood: number | undefined;
  // Opportunities
  q7_o1_global_halal_impact: number | undefined;
  q7_o1_global_halal_likelihood: number | undefined;
  q7_o2_asean_halal_impact: number | undefined;
  q7_o2_asean_halal_likelihood: number | undefined;
  q7_o3_bimpeaga_integration_impact: number | undefined;
  q7_o3_bimpeaga_integration_likelihood: number | undefined;
  q7_o4_uae_corridor_impact: number | undefined;
  q7_o4_uae_corridor_likelihood: number | undefined;
  q7_o5_landbridge_impact: number | undefined;
  q7_o5_landbridge_likelihood: number | undefined;
  // Threats
  q7_t1_halal_competition_impact: number | undefined;
  q7_t1_halal_competition_likelihood: number | undefined;
  q7_t2_economic_downturn_impact: number | undefined;
  q7_t2_economic_downturn_likelihood: number | undefined;
  q7_t3_price_volatility_impact: number | undefined;
  q7_t3_price_volatility_likelihood: number | undefined;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 8 — Cluster 5: Financiers
// SWOT from SWOT_BY_SECTION[8] + archetype from ARCHETYPES_BY_SECTION[8]
// ─────────────────────────────────────────────────────────────────────────────
export interface Section8Data {
  q8_1_finance_tier_priority: string;
  q8_2_roadmap_achievable: number | undefined;
  q8_3_priority_action: string;
  q8_4_islamic_authority: string;
  q8_arch_shifting_burden_accuracy: string;
  q8_arch_shifting_burden_followup: string;
  // Strengths
  q8_s1_islamic_finance_framework_impact: number | undefined;
  q8_s1_islamic_finance_framework_likelihood: number | undefined;
  // Weaknesses
  q8_w1_financial_penetration_impact: number | undefined;
  q8_w1_financial_penetration_likelihood: number | undefined;
  // Opportunities
  q8_o1_islamic_ecosystem_impact: number | undefined;
  q8_o1_islamic_ecosystem_likelihood: number | undefined;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 9 — Operating Systems
// SWOT from SWOT_BY_SECTION[9] + archetypes from ARCHETYPES_BY_SECTION[9]
// ─────────────────────────────────────────────────────────────────────────────
export interface Section9Data {
  q9_1_moral_governance_derisk: number | undefined;
  q9_2_critical_loop: string;
  q9_3_regulatory_priority: string;
  q9_4_revenue_channel: string;
  q9_5_stakeholder_alignment: string;
  q9_6_reform_priority: string;
  // Archetypes (governance-scale + swot-archetype)
  q9_arch_moral_governance_derisk_accuracy: number | undefined;
  q9_arch_moral_governance_derisk_followup: string;
  q9_arch_fixes_fail_accuracy: string;
  q9_arch_fixes_fail_followup: string;
  q9_arch_escalation_accuracy: string;
  q9_arch_escalation_followup: string;
  q9_arch_big_man_accuracy: string;
  q9_arch_big_man_followup: string;
  // Strengths
  q9_s1_policy_recognition_impact: number | undefined;
  q9_s1_policy_recognition_likelihood: number | undefined;
  q9_s2_peace_dividend_impact: number | undefined;
  q9_s2_peace_dividend_likelihood: number | undefined;
  // Weaknesses
  q9_w1_fragmented_policy_impact: number | undefined;
  q9_w1_fragmented_policy_likelihood: number | undefined;
  // Opportunities
  q9_o1_postconflict_impact: number | undefined;
  q9_o1_postconflict_likelihood: number | undefined;
  // Threats
  q9_t1_climate_change_impact: number | undefined;
  q9_t1_climate_change_likelihood: number | undefined;
  q9_t2_drifting_goals_impact: number | undefined;
  q9_t2_drifting_goals_likelihood: number | undefined;
  q9_t3_security_incidents_impact: number | undefined;
  q9_t3_security_incidents_likelihood: number | undefined;
  q9_t4_political_transition_impact: number | undefined;
  q9_t4_political_transition_likelihood: number | undefined;
  q9_t5_natl_coordination_impact: number | undefined;
  q9_t5_natl_coordination_likelihood: number | undefined;
  q9_t6_fragmented_mandates_impact: number | undefined;
  q9_t6_fragmented_mandates_likelihood: number | undefined;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 10 — IEDS & Three-Phase Implementation
// ─────────────────────────────────────────────────────────────────────────────
export interface IEDSMatrixRow {
  economic_impact: number;
  feasibility: number;
  identity_alignment: number;
  systems_leverage: number;
  risk_return: number;
  inclusivity: number;
  sustainability: number;
}

export interface Section10Data {
  q10_1_ieds_preference: string;
  q10_2_sequence_a_priority: number | undefined;
  q10_3_sequence_b_priority: number | undefined;
  q10_4_sequence_c_priority: number | undefined;
  q10_5_sequencing_logic: string;
  q10_6_risk_mitigation: string;
  q10_7_outcomes_achievable: number | undefined;
  q10_matrix: {
    heds: IEDSMatrixRow;
    gems: IEDSMatrixRow;
    ifes: IEDSMatrixRow;
    ieds: IEDSMatrixRow;
  };
  q10_leverage_points_clarity: number | undefined;
  q10_activating_leverage: number | undefined;
  q10_capacity_traps: number | undefined;
  q10_iceberg_model: number | undefined;
  q10_collaborative_governance: number | undefined;
  q10_strategic_ranking: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 11 — Metrics Architecture & KPIs
// Archetype from ARCHETYPES_BY_SECTION[11]
// ─────────────────────────────────────────────────────────────────────────────
export interface Section11Data {
  q11_1_calibration_appropriate: string;
  q11_2_governance_kpi_importance: number | undefined;
  q11_3_resilience_kpi_importance: number | undefined;
  q11_4_inclusivity_kpi_importance: number | undefined;
  q11_5_peace_kpi_importance: number | undefined;
  q11_6_cluster_kpi_sufficient: string;
  q11_7_benchmark_priority: string;
  q11_arch_drifting_goals_accuracy: string;
  q11_arch_drifting_goals_followup: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 12 — Balanced Scorecard
// ─────────────────────────────────────────────────────────────────────────────
export interface Section12Data {
  q12_1_learning_growth_alignment: number | undefined;
  q12_2_internal_process_alignment: number | undefined;
  q12_3_stakeholder_alignment: number | undefined;
  q12_4_financial_alignment: number | undefined;
  q12_5_strongest_pathway: string;
  q12_6_vision_clarity: number | undefined;
  q12_7_vision_achievable: number | undefined;
  q12_8_mission_alignment: number | undefined;
  q12_9_bsc_useful: number | undefined;
  q12_10_adaptive_frequency: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 13 — Priority Actions & Budget
// ─────────────────────────────────────────────────────────────────────────────
export interface Section13Data {
  q13_1_funding_mix_fair: number | undefined;
  q13_2_targets_realistic: number | undefined;
  q13_3_high_risk_concern: number | undefined;
  q13_4_medium_risk_concern: number | undefined;
  q13_5_low_risk_concern: number | undefined;
  q13_6_budget_priority_phase: string;
  q13_7_budget_priority_cluster: string;
  q13_8_blended_finance_opinion: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 14 — Access to Resources & Engagements
// ─────────────────────────────────────────────────────────────────────────────
export interface Section14Data {
  q14_1_engagement_type: string[];
  q14_2_contact_method: string;
  q14_3_timing: string;
  q14_4_role_contribution: string;
  q14_5_additional_comments: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 15 — Review & Submission
// ─────────────────────────────────────────────────────────────────────────────
export interface Section15Data {
  q15_1_confirm_accurate: boolean;
  q15_2_consent_anonymous_use: boolean;
  q15_3_consent_voluntary: boolean;
  q15_4_ready_to_submit: boolean;
}
