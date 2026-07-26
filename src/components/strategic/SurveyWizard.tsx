import React, { useState, useCallback } from "react";
import { submitSurvey } from "@/lib/api";
import { surveySchema, type SurveySchemaType } from "@/lib/survey-schema";
import { Toaster, toast } from "sonner";

// ─── SECTION COMPONENTS & TYPES ──────────────────────────────────────────────
import Section0_Orientation, { type Section0Data } from "./Section0_Orientation";
import Section1_Privacy, { type Section1Data } from "./Section1_Privacy";
import Section2_Demographics, { type Section2Data } from "./Section2_Demographics";
import Section3_BEIE_SystemsThinking, { type Section3Data } from "./Section3_BEIE_SystemsThinking";
import Section4_Foundations, { type Section4Data } from "./Section4_Foundations";
import Section5_Transformers, { type Section5Data } from "./Section5_Transformers";
import Section6_Enablers, { type Section6Data } from "./Section6_Enablers";
import Section7_Connectors, { type Section7Data } from "./Section7_Connectors";
import Section8_Financiers, { type Section8Data } from "./Section8_Financiers";
import Section9_OperatingSystems, { type Section9Data } from "./Section9_OperatingSystems";
import Section10_IEDS, { type Section10Data } from "./Section10_IEDS";
import Section11_Metrics, { type Section11Data } from "./Section11_Metrics";
import Section12_BalancedScorecard, { type Section12Data } from "./Section12_BalancedScorecard";
import Section13_PriorityActions, { type Section13Data } from "./Section13_PriorityActions";
import Section14_AccessResources, { type Section14Data } from "./Section14_AccessResources";
import Section15_Submission, { type Section15Data } from "./Section15_Submission";

// ─── BIRD FORMULAS ───────────────────────────────────────────────────────────
import {
  calculateStrengthRI,
  calculateOpportunityRI,
  calculateWeaknessRisk,
  calculateThreatVI,
} from "@/lib/formulas";

// ─── STEP LABELS (16 steps: 0–15) ────────────────────────────────────────────
const STEP_LABELS = [
  "Welcome",                    // 0
  "Privacy & Consent",          // 1
  "Your Profile",               // 2
  "Systems Thinking",           // 3
  "Cluster 1: Foundations",     // 4
  "Cluster 2: Transformers",    // 5
  "Cluster 3: Enablers",        // 6
  "Cluster 4: Connectors",      // 7
  "Cluster 5: Financiers",      // 8
  "Operating Systems",          // 9
  "IEDS & 3-Phase Plan",        // 10
  "Metrics & KPIs",             // 11
  "Balanced Scorecard",         // 12
  "Priority Actions & Budget",  // 13
  "Resources & Engagements",    // 14
  "Review & Submit",            // 15
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN WIZARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const SurveyWizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [birdScores, setBirdScores] = useState<Record<string, number>>({});

  // ── Section 0: Welcome & Orientation ──
  const [s0, setS0] = useState<Section0Data>({
    q0_1_ready: "",
    q0_2_ecosystem_understanding: "",
    q0_3_systems_thinking_value: undefined,
    q0_4_cld_understanding: undefined,
    q0_5_feedback_loops_understanding: undefined,
    q0_6_leverage_points_understanding: undefined,
  });

  // ── Section 1: Privacy & Consent ──
  const [s1, setS1] = useState<Section1Data>({
    q1_1_consent_participate: false,
    q1_2_consent_anonymize: false,
    q1_3_consent_email_copy: false,
    q1_4_consent_voluntary: false,
  });

  // ── Section 2: Demographics ──
  const [s2, setS2] = useState<Section2Data>({
    demo_name: "",
    demo_email: "",
    demo_organization: "",
    demo_position: "",
    demo_province: "",
    demo_category: "",
    demo_expertise: [],
  });

  // ── Section 3: BEIE & Systems Thinking ──
  const [s3, setS3] = useState<Section3Data>({
    q3_1_beie_video_understanding: undefined,
    q3_2_systems_reframing_accuracy: undefined,
    q3_3_sector_to_ecosystem_shift: undefined,
    q3_4_beie_framework_clarity: undefined,
    q3_5_operating_systems_understanding: undefined,
    q3_6_five_clusters_understanding: undefined,
    q3_7_investment_development_loop: "",
    q3_8_governance_investor_loop: "",
    q_s1_halal_legitimacy_impact: undefined,
    q_s1_halal_legitimacy_likelihood: undefined,
    q_s1_bimpeaga_impact: undefined,
    q_s1_bimpeaga_likelihood: undefined,
    q_s1_aff_base_impact: undefined,
    q_s1_aff_base_likelihood: undefined,
  });

  // ── Section 4: Cluster 1 — Foundations ──
  const [s4, setS4] = useState<Section4Data>({
    q4_1_foundations_banner_understanding: undefined,
    q4_2_tragedy_commons_accuracy: "",
    q4_3_tragedy_followup: "",
    q4_4_climate_impact: undefined,
    q4_5_climate_likelihood: undefined,
    q4_6_pestalotiopsis_impact: undefined,
    q4_7_pestalotiopsis_likelihood: undefined,
    q4_8_postharvest_impact: undefined,
    q4_9_postharvest_likelihood: undefined,
    q4_10_poverty_impact: undefined,
    q4_11_poverty_likelihood: undefined,
    q4_12_limits_growth_accuracy: "",
    q4_13_limits_followup: "",
    q_s4_climate_impact: undefined,
    q_s4_climate_likelihood: undefined,
    q_s4_pestalotiopsis_impact: undefined,
    q_s4_pestalotiopsis_likelihood: undefined,
    q_s4_postharvest_impact: undefined,
    q_s4_postharvest_likelihood: undefined,
    q_s4_poverty_impact: undefined,
    q_s4_poverty_likelihood: undefined,
    q_s4_tragedy_commons: "",
    q_s4_tragedy_followup: "",
    q_s4_limits_growth: "",
  });

  // ── Section 5: Cluster 2 — Transformers ──
  const [s5, setS5] = useState<Section5Data>({
    q5_1_transformers_banner_understanding: undefined,
    q5_2_halal_advantage_understanding: undefined,
    q5_3_farm_to_market_understanding: undefined,
    q5_4_economic_zones_understanding: undefined,
    q5_5_growth_underinvestment_accuracy: "",
    q5_6_growth_underinvestment_followup: "",
    q5_7_halal_cert_impact: undefined,
    q5_8_halal_cert_likelihood: undefined,
    q5_9_skills_mismatch_impact: undefined,
    q5_10_skills_mismatch_likelihood: undefined,
    q5_11_global_halal_impact: undefined,
    q5_12_global_halal_likelihood: undefined,
    q5_13_uae_corridor_impact: undefined,
    q5_14_uae_corridor_likelihood: undefined,
    q5_15_competition_impact: undefined,
    q5_16_competition_likelihood: undefined,
    q_s5_halal_cert_impact: undefined,
    q_s5_halal_cert_likelihood: undefined,
    q_s5_skills_mismatch_impact: undefined,
    q_s5_skills_mismatch_likelihood: undefined,
    q_s5_global_halal_impact: undefined,
    q_s5_global_halal_likelihood: undefined,
    q_s5_uae_corridor_impact: undefined,
    q_s5_uae_corridor_likelihood: undefined,
    q_s5_competition_impact: undefined,
    q_s5_competition_likelihood: undefined,
    q_s5_fixes_fail: "",
    q_s5_fixes_followup: "",
    q_s5_successful: "",
    q_s5_successful_followup: "",
  });

  // ── Section 6: Cluster 3 — Enablers ──
  const [s6, setS6] = useState<Section6Data>({
    q6_1_enablers_banner_understanding: undefined,
    q6_2_skills_gap_understanding: undefined,
    q6_3_enabling_grid_understanding: undefined,
    q6_4_digital_transformation_understanding: undefined,
    q6_5_tourism_master_plan_understanding: undefined,
    q6_6_tourism_digital_connectivity_understanding: undefined,
    q6_7_activating_enablers_understanding: undefined,
    q6_8_limits_growth_enablers_accuracy: "",
    q6_9_limits_growth_enablers_followup: "",
    q6_10_youth_pop_impact: undefined,
    q6_11_youth_pop_likelihood: undefined,
    q6_12_renewable_energy_impact: undefined,
    q6_13_renewable_energy_likelihood: undefined,
    q6_14_polloc_impact: undefined,
    q6_15_polloc_likelihood: undefined,
    q6_16_infra_deficits_impact: undefined,
    q6_17_infra_deficits_likelihood: undefined,
    q6_18_literacy_impact: undefined,
    q6_19_literacy_likelihood: undefined,
    q6_20_skills_mismatch_impact: undefined,
    q6_21_skills_mismatch_likelihood: undefined,
    q6_22_tech_adoption_impact: undefined,
    q6_23_tech_adoption_likelihood: undefined,
    q6_24_renewable_invest_impact: undefined,
    q6_25_renewable_invest_likelihood: undefined,
    q6_26_tourism_potential_impact: undefined,
    q6_27_tourism_potential_likelihood: undefined,
    q6_28_political_transition_impact: undefined,
    q6_29_political_transition_likelihood: undefined,
    q6_30_cost_overruns_impact: undefined,
    q6_31_cost_overruns_likelihood: undefined,
    q6_32_natl_coord_impact: undefined,
    q6_33_natl_coord_likelihood: undefined,
    q6_34_shifting_burden: "",
    q6_35_shifting_followup: "",
    q6_36_growth_underinvest: "",
    q6_37_growth_followup: "",
    q_s6_youth_pop_impact: undefined,
    q_s6_youth_pop_likelihood: undefined,
    q_s6_renewable_energy_impact: undefined,
    q_s6_renewable_energy_likelihood: undefined,
    q_s6_polloc_impact: undefined,
    q_s6_polloc_likelihood: undefined,
    q_s6_infra_deficits_impact: undefined,
    q_s6_infra_deficits_likelihood: undefined,
    q_s6_literacy_impact: undefined,
    q_s6_literacy_likelihood: undefined,
    q_s6_skills_mismatch_impact: undefined,
    q_s6_skills_mismatch_likelihood: undefined,
    q_s6_tech_adoption_impact: undefined,
    q_s6_tech_adoption_likelihood: undefined,
    q_s6_renewable_invest_impact: undefined,
    q_s6_renewable_invest_likelihood: undefined,
    q_s6_tourism_potential_impact: undefined,
    q_s6_tourism_potential_likelihood: undefined,
    q_s6_political_transition_impact: undefined,
    q_s6_political_transition_likelihood: undefined,
    q_s6_cost_overruns_impact: undefined,
    q_s6_cost_overruns_likelihood: undefined,
    q_s6_natl_coord_impact: undefined,
    q_s6_natl_coord_likelihood: undefined,
    q_s6_shifting_burden: "",
    q_s6_shifting_followup: "",
    q_s6_growth_underinvest: "",
    q_s6_growth_followup: "",
  });

  // ── Section 7: Cluster 4 — Connectors ──
  const [s7, setS7] = useState<Section7Data>({
    q7_1_connectors_banner_understanding: undefined,
    q7_2_connectivity_capital_understanding: undefined,
    q7_3_integrating_zones_understanding: undefined,
    q7_4_provincial_nodes_understanding: undefined,
    q7_5_trapped_value_understanding: undefined,
    q7_6_revitalizing_maritime_understanding: undefined,
    q7_7_shattering_isolation_understanding: undefined,
    q7_8_basilan_tawitawi_understanding: undefined,
    q7_9_global_integration_understanding: undefined,
    q7_10_uae_gcc_understanding: undefined,
    q7_11_bimpeaga_map_understanding: undefined,
    q7_12_success_successful_accuracy: "",
    q7_13_success_successful_followup: "",
    q7_14_bimpeaga_loc_impact: undefined,
    q7_15_bimpeaga_loc_likelihood: undefined,
    q7_16_domestic_halal_impact: undefined,
    q7_17_domestic_halal_likelihood: undefined,
    q7_18_polloc_impact: undefined,
    q7_19_polloc_likelihood: undefined,
    q7_20_islamic_finance_impact: undefined,
    q7_21_islamic_finance_likelihood: undefined,
    q7_22_infra_deficits_impact: undefined,
    q7_23_infra_deficits_likelihood: undefined,
    q7_24_fragmented_policy_impact: undefined,
    q7_25_fragmented_policy_likelihood: undefined,
    q7_26_market_linkages_impact: undefined,
    q7_27_market_linkages_likelihood: undefined,
    q7_28_tech_adoption_impact: undefined,
    q7_29_tech_adoption_likelihood: undefined,
    q7_30_asean_halal_impact: undefined,
    q7_31_asean_halal_likelihood: undefined,
    q7_32_bimpeaga_integration_impact: undefined,
    q7_33_bimpeaga_integration_likelihood: undefined,
    q7_34_uae_corridor_impact: undefined,
    q7_35_uae_corridor_likelihood: undefined,
    q7_36_tourism_potential_impact: undefined,
    q7_37_tourism_potential_likelihood: undefined,
    q7_38_halal_competition_impact: undefined,
    q7_39_halal_competition_likelihood: undefined,
    q7_40_security_incidents_impact: undefined,
    q7_41_security_incidents_likelihood: undefined,
    q7_42_price_volatility_impact: undefined,
    q7_43_price_volatility_likelihood: undefined,
    q7_44_natl_coord_impact: undefined,
    q7_45_natl_coord_likelihood: undefined,
    q7_46_escalation: "",
    q7_47_escalation_followup: "",
    q7_48_limits_growth: "",
    q7_49_limits_followup: "",
    q_s7_bimpeaga_loc_impact: undefined,
    q_s7_bimpeaga_loc_likelihood: undefined,
    q_s7_domestic_halal_impact: undefined,
    q_s7_domestic_halal_likelihood: undefined,
    q_s7_polloc_impact: undefined,
    q_s7_polloc_likelihood: undefined,
    q_s7_islamic_finance_impact: undefined,
    q_s7_islamic_finance_likelihood: undefined,
    q_s7_infra_deficits_impact: undefined,
    q_s7_infra_deficits_likelihood: undefined,
    q_s7_fragmented_policy_impact: undefined,
    q_s7_fragmented_policy_likelihood: undefined,
    q_s7_market_linkages_impact: undefined,
    q_s7_market_linkages_likelihood: undefined,
    q_s7_tech_adoption_impact: undefined,
    q_s7_tech_adoption_likelihood: undefined,
    q_s7_asean_halal_impact: undefined,
    q_s7_asean_halal_likelihood: undefined,
    q_s7_bimpeaga_integration_impact: undefined,
    q_s7_bimpeaga_integration_likelihood: undefined,
    q_s7_uae_corridor_impact: undefined,
    q_s7_uae_corridor_likelihood: undefined,
    q_s7_tourism_potential_impact: undefined,
    q_s7_tourism_potential_likelihood: undefined,
    q_s7_halal_competition_impact: undefined,
    q_s7_halal_competition_likelihood: undefined,
    q_s7_security_incidents_impact: undefined,
    q_s7_security_incidents_likelihood: undefined,
    q_s7_price_volatility_impact: undefined,
    q_s7_price_volatility_likelihood: undefined,
    q_s7_natl_coord_impact: undefined,
    q_s7_natl_coord_likelihood: undefined,
    q_s7_escalation: "",
    q_s7_escalation_followup: "",
    q_s7_limits_growth: "",
    q_s7_limits_followup: "",
  });

  // ── Section 8: Cluster 5 — Financiers ──
  const [s8, setS8] = useState<Section8Data>({
    q8_1_financiers_banner_understanding: undefined,
    q8_2_capital_bloodstream_understanding: undefined,
    q8_3_islamic_finance_roadmap_understanding: undefined,
    q8_4_shifting_burden_financiers_accuracy: "",
    q8_5_shifting_burden_financiers_followup: "",
    q8_6_domestic_halal_impact: undefined,
    q8_7_domestic_halal_likelihood: undefined,
    q8_8_youth_pop_impact: undefined,
    q8_9_youth_pop_likelihood: undefined,
    q8_10_policy_recognition_impact: undefined,
    q8_11_policy_recognition_likelihood: undefined,
    q8_12_islamic_finance_fw_impact: undefined,
    q8_13_islamic_finance_fw_likelihood: undefined,
    q8_14_peace_dividend_impact: undefined,
    q8_15_peace_dividend_likelihood: undefined,
    q8_16_infra_deficits_impact: undefined,
    q8_17_infra_deficits_likelihood: undefined,
    q8_18_literacy_impact: undefined,
    q8_19_literacy_likelihood: undefined,
    q8_20_financial_penetration_impact: undefined,
    q8_21_financial_penetration_likelihood: undefined,
    q8_22_fragmented_policy_impact: undefined,
    q8_23_fragmented_policy_likelihood: undefined,
    q8_24_skills_mismatch_impact: undefined,
    q8_25_skills_mismatch_likelihood: undefined,
    q8_26_global_halal_impact: undefined,
    q8_27_global_halal_likelihood: undefined,
    q8_28_renewable_invest_impact: undefined,
    q8_29_renewable_invest_likelihood: undefined,
    q8_30_asean_halal_impact: undefined,
    q8_31_asean_halal_likelihood: undefined,
    q8_32_islamic_ecosystem_impact: undefined,
    q8_33_islamic_ecosystem_likelihood: undefined,
    q8_34_uae_corridor_impact: undefined,
    q8_35_uae_corridor_likelihood: undefined,
    q8_36_halal_competition_impact: undefined,
    q8_37_halal_competition_likelihood: undefined,
    q8_38_halal_standards_impact: undefined,
    q8_39_halal_standards_likelihood: undefined,
    q8_40_security_incidents_impact: undefined,
    q8_41_security_incidents_likelihood: undefined,
    q8_42_political_transition_impact: undefined,
    q8_43_political_transition_likelihood: undefined,
    q8_44_big_man: "",
    q8_45_big_man_followup: "",
    q8_46_shifting_burden: "",
    q8_47_shifting_followup: "",
    q_s8_domestic_halal_impact: undefined,
    q_s8_domestic_halal_likelihood: undefined,
    q_s8_youth_pop_impact: undefined,
    q_s8_youth_pop_likelihood: undefined,
    q_s8_policy_recognition_impact: undefined,
    q_s8_policy_recognition_likelihood: undefined,
    q_s8_islamic_finance_fw_impact: undefined,
    q_s8_islamic_finance_fw_likelihood: undefined,
    q_s8_peace_dividend_impact: undefined,
    q_s8_peace_dividend_likelihood: undefined,
    q_s8_infra_deficits_impact: undefined,
    q_s8_infra_deficits_likelihood: undefined,
    q_s8_literacy_impact: undefined,
    q_s8_literacy_likelihood: undefined,
    q_s8_financial_penetration_impact: undefined,
    q_s8_financial_penetration_likelihood: undefined,
    q_s8_fragmented_policy_impact: undefined,
    q_s8_fragmented_policy_likelihood: undefined,
    q_s8_skills_mismatch_impact: undefined,
    q_s8_skills_mismatch_likelihood: undefined,
    q_s8_global_halal_impact: undefined,
    q_s8_global_halal_likelihood: undefined,
    q_s8_renewable_invest_impact: undefined,
    q_s8_renewable_invest_likelihood: undefined,
    q_s8_asean_halal_impact: undefined,
    q_s8_asean_halal_likelihood: undefined,
    q_s8_islamic_ecosystem_impact: undefined,
    q_s8_islamic_ecosystem_likelihood: undefined,
    q_s8_uae_corridor_impact: undefined,
    q_s8_uae_corridor_likelihood: undefined,
    q_s8_halal_competition_impact: undefined,
    q_s8_halal_competition_likelihood: undefined,
    q_s8_halal_standards_impact: undefined,
    q_s8_halal_standards_likelihood: undefined,
    q_s8_security_incidents_impact: undefined,
    q_s8_security_incidents_likelihood: undefined,
    q_s8_political_transition_impact: undefined,
    q_s8_political_transition_likelihood: undefined,
    q_s8_big_man: "",
    q_s8_big_man_followup: "",
    q_s8_shifting_burden: "",
    q_s8_shifting_followup: "",
  });

  // ── Section 9: Operating Systems ──
  const [s9, setS9] = useState<Section9Data>({
    q9_1_os_banner_understanding: undefined,
    q9_2_moral_governance_derisk_understanding: undefined,
    q9_3_regulatory_architecture_understanding: undefined,
    q9_4_jmc_2026_01_understanding: undefined,
    q9_5_fixes_fail_os_accuracy: "",
    q9_6_fixes_fail_os_followup: "",
    q9_7_big_man_archetype_accuracy: "",
    q9_8_big_man_archetype_followup: "",
    q9_9_policy_recommendations_stakeholders_understanding: undefined,
    q9_10_policy_recommendations_activating_understanding: undefined,
    q9_11_policy_recognition_impact: undefined,
    q9_12_policy_recognition_likelihood: undefined,
    q9_13_islamic_finance_impact: undefined,
    q9_14_islamic_finance_likelihood: undefined,
    q9_15_cultural_heritage_impact: undefined,
    q9_16_cultural_heritage_likelihood: undefined,
    q9_17_peace_dividend_impact: undefined,
    q9_18_peace_dividend_likelihood: undefined,
    q9_19_literacy_impact: undefined,
    q9_20_literacy_likelihood: undefined,
    q9_21_fragmented_policy_impact: undefined,
    q9_22_fragmented_policy_likelihood: undefined,
    q9_23_underspending_impact: undefined,
    q9_24_underspending_likelihood: undefined,
    q9_25_carbon_markets_impact: undefined,
    q9_26_carbon_markets_likelihood: undefined,
    q9_27_pes_impact: undefined,
    q9_28_pes_likelihood: undefined,
    q9_29_postconflict_impact: undefined,
    q9_30_postconflict_likelihood: undefined,
    q9_31_forestry_code_impact: undefined,
    q9_32_forestry_code_likelihood: undefined,
    q9_33_security_incidents_impact: undefined,
    q9_34_security_incidents_likelihood: undefined,
    q9_35_political_transition_impact: undefined,
    q9_36_political_transition_likelihood: undefined,
    q9_37_fragmented_agency_impact: undefined,
    q9_38_fragmented_agency_likelihood: undefined,
    q9_39_investment_loop: "",
    q9_40_investment_loop_followup: "",
    q9_41_governance_loop: "",
    q9_42_governance_loop_followup: "",
    q_s9_policy_recognition_impact: undefined,
    q_s9_policy_recognition_likelihood: undefined,
    q_s9_islamic_finance_impact: undefined,
    q_s9_islamic_finance_likelihood: undefined,
    q_s9_cultural_heritage_impact: undefined,
    q_s9_cultural_heritage_likelihood: undefined,
    q_s9_peace_dividend_impact: undefined,
    q_s9_peace_dividend_likelihood: undefined,
    q_s9_literacy_impact: undefined,
    q_s9_literacy_likelihood: undefined,
    q_s9_fragmented_policy_impact: undefined,
    q_s9_fragmented_policy_likelihood: undefined,
    q_s9_underspending_impact: undefined,
    q_s9_underspending_likelihood: undefined,
    q_s9_carbon_markets_impact: undefined,
    q_s9_carbon_markets_likelihood: undefined,
    q_s9_pes_impact: undefined,
    q_s9_pes_likelihood: undefined,
    q_s9_postconflict_impact: undefined,
    q_s9_postconflict_likelihood: undefined,
    q_s9_forestry_code_impact: undefined,
    q_s9_forestry_code_likelihood: undefined,
    q_s9_security_incidents_impact: undefined,
    q_s9_security_incidents_likelihood: undefined,
    q_s9_political_transition_impact: undefined,
    q_s9_political_transition_likelihood: undefined,
    q_s9_fragmented_agency_impact: undefined,
    q_s9_fragmented_agency_likelihood: undefined,
    q_s9_investment_loop: "",
    q_s9_investment_loop_followup: "",
    q_s9_governance_loop: "",
    q_s9_governance_loop_followup: "",
  });

  // ── Section 10: IEDS & Three-Phase Implementation ──
  const [s10, setS10] = useState<Section10Data>({
    q10_1_strategic_options_video_understanding: undefined,
    q10_2_leverage_points_identification_understanding: undefined,
    q10_3_activating_leverage_points_understanding: undefined,
    q10_4_leverage_capacity_traps_understanding: undefined,
    q10_5_leverage_governance_traps_understanding: undefined,
    q10_6_architecting_collaborative_governance_understanding: undefined,
    q10_7_archetypes_leverage_points_understanding: undefined,
    q10_8_strategic_options_ranking: "",
    q10_9_ieds_execution_engine_understanding: undefined,
    q10_10_ieds_preference: "",
    q10_11_sequence_a_priority: undefined,
    q10_12_sequence_b_priority: undefined,
    q10_13_sequence_c_priority: undefined,
    q10_14_sequencing_logic: "",
    q10_15_risk_mitigation: "",
    q10_16_outcomes_achievable: undefined,
    q10_matrix: {
      heds: { economic_impact: 5, feasibility: 5, identity_alignment: 5, systems_leverage: 5, risk_return: 5, inclusivity: 5, sustainability: 5 },
      gems: { economic_impact: 5, feasibility: 5, identity_alignment: 5, systems_leverage: 5, risk_return: 5, inclusivity: 5, sustainability: 5 },
      ifes: { economic_impact: 5, feasibility: 5, identity_alignment: 5, systems_leverage: 5, risk_return: 5, inclusivity: 5, sustainability: 5 },
      ieds: { economic_impact: 5, feasibility: 5, identity_alignment: 5, systems_leverage: 5, risk_return: 5, inclusivity: 5, sustainability: 5 },
    },
  });

  // ── Section 11: Metrics Architecture & KPIs ──
  const [s11, setS11] = useState<Section11Data>({
    q11_1_metrics_architecture_understanding: undefined,
    q11_2_drifting_goals_accuracy: "",
    q11_3_drifting_goals_followup: "",
    q11_4_calibration_appropriate: "",
    q11_5_governance_kpi_importance: undefined,
    q11_6_resilience_kpi_importance: undefined,
    q11_7_inclusivity_kpi_importance: undefined,
    q11_8_peace_kpi_importance: undefined,
    q11_9_cluster_kpi_sufficient: "",
    q11_10_benchmark_priority: "",
  });

  // ── Section 12: Balanced Scorecard ──
  const [s12, setS12] = useState<Section12Data>({
    q12_1_bsc_video_understanding: undefined,
    q12_2_bsc_intangibles_understanding: undefined,
    q12_3_bsc_economic_outcomes_understanding: undefined,
    q12_4_vision_understanding: undefined,
    q12_5_learning_growth_alignment: undefined,
    q12_6_internal_process_alignment: undefined,
    q12_7_stakeholder_alignment: undefined,
    q12_8_financial_alignment: undefined,
    q12_9_strongest_pathway: "",
    q12_10_vision_clarity: undefined,
    q12_11_vision_achievable: undefined,
    q12_12_mission_alignment: undefined,
    q12_13_bsc_useful: undefined,
    q12_14_adaptive_frequency: "",
  });

  // ── Section 13: Priority Actions & Budget ──
  const [s13, setS13] = useState<Section13Data>({
    q13_1_capital_deployment_understanding: undefined,
    q13_2_funding_mix_fair: undefined,
    q13_3_targets_realistic: undefined,
    q13_4_high_risk_concern: undefined,
    q13_5_medium_risk_concern: undefined,
    q13_6_low_risk_concern: undefined,
    q13_7_budget_priority_phase: "",
    q13_8_budget_priority_cluster: "",
    q13_9_blended_finance_opinion: "",
  });

  // ── Section 14: Access to Resources & Engagements ──
  const [s14, setS14] = useState<Section14Data>({
    q14_1_engagement_type: [],
    q14_2_contact_method: "",
    q14_3_timing: "",
    q14_4_role_contribution: "",
    q14_5_additional_comments: "",
  });

  // ── Section 15: Review & Submit ──
  const [s15, setS15] = useState<Section15Data>({
    q15_1_confirm_accurate: false,
    q15_2_consent_anonymous_use: false,
    q15_3_consent_voluntary: false,
    q15_4_ready_to_submit: false,
    q15_5_overall_assessment: undefined,
    q15_6_strongest_aspects: "",
    q15_7_weakest_aspects: "",
    q15_8_recommend: "",
    q15_9_modifications: "",
    q15_10_final_comments: "",
  });

  // ── BIRD Score Computation (real-time) ──
  const computeBIRDScores = useCallback(() => {
    const scores: Record<string, number> = {};

    // Section 3: Strengths
    if (s3.q_s1_halal_legitimacy_impact && s3.q_s1_halal_legitimacy_likelihood) {
      scores.s1_halal_ri = calculateStrengthRI(s3.q_s1_halal_legitimacy_impact, s3.q_s1_halal_legitimacy_likelihood);
    }
    if (s3.q_s1_bimpeaga_impact && s3.q_s1_bimpeaga_likelihood) {
      scores.s1_bimpeaga_ri = calculateStrengthRI(s3.q_s1_bimpeaga_impact, s3.q_s1_bimpeaga_likelihood);
    }
    if (s3.q_s1_aff_base_impact && s3.q_s1_aff_base_likelihood) {
      scores.s1_aff_ri = calculateStrengthRI(s3.q_s1_aff_base_impact, s3.q_s1_aff_base_likelihood);
    }

    // Section 4: Threats & Weaknesses
    if (s4.q_s4_climate_impact && s4.q_s4_climate_likelihood) {
      scores.s4_climate_vi = calculateThreatVI(s4.q_s4_climate_impact, s4.q_s4_climate_likelihood);
    }
    if (s4.q_s4_pestalotiopsis_impact && s4.q_s4_pestalotiopsis_likelihood) {
      scores.s4_pestalotiopsis_vi = calculateThreatVI(s4.q_s4_pestalotiopsis_impact, s4.q_s4_pestalotiopsis_likelihood);
    }
    if (s4.q_s4_postharvest_impact && s4.q_s4_postharvest_likelihood) {
      scores.s4_postharvest_risk = calculateWeaknessRisk(s4.q_s4_postharvest_impact, s4.q_s4_postharvest_likelihood);
    }
    if (s4.q_s4_poverty_impact && s4.q_s4_poverty_likelihood) {
      scores.s4_poverty_risk = calculateWeaknessRisk(s4.q_s4_poverty_impact, s4.q_s4_poverty_likelihood);
    }

    // Section 5: Mixed (W, O, T)
    if (s5.q_s5_halal_cert_impact && s5.q_s5_halal_cert_likelihood) {
      scores.s5_halal_risk = calculateWeaknessRisk(s5.q_s5_halal_cert_impact, s5.q_s5_halal_cert_likelihood);
    }
    if (s5.q_s5_global_halal_impact && s5.q_s5_global_halal_likelihood) {
      scores.s5_global_ri = calculateOpportunityRI(s5.q_s5_global_halal_impact, s5.q_s5_global_halal_likelihood);
    }
    if (s5.q_s5_competition_impact && s5.q_s5_competition_likelihood) {
      scores.s5_competition_vi = calculateThreatVI(s5.q_s5_competition_impact, s5.q_s5_competition_likelihood);
    }

    // Section 6: Enablers (S, W, O, T)
    if (s6.q_s6_youth_pop_impact && s6.q_s6_youth_pop_likelihood) {
      scores.s6_youth_ri = calculateStrengthRI(s6.q_s6_youth_pop_impact, s6.q_s6_youth_pop_likelihood);
    }
    if (s6.q_s6_renewable_energy_impact && s6.q_s6_renewable_energy_likelihood) {
      scores.s6_renewable_ri = calculateStrengthRI(s6.q_s6_renewable_energy_impact, s6.q_s6_renewable_energy_likelihood);
    }
    if (s6.q_s6_infra_deficits_impact && s6.q_s6_infra_deficits_likelihood) {
      scores.s6_infra_risk = calculateWeaknessRisk(s6.q_s6_infra_deficits_impact, s6.q_s6_infra_deficits_likelihood);
    }
    if (s6.q_s6_literacy_impact && s6.q_s6_literacy_likelihood) {
      scores.s6_literacy_risk = calculateWeaknessRisk(s6.q_s6_literacy_impact, s6.q_s6_literacy_likelihood);
    }
    if (s6.q_s6_renewable_invest_impact && s6.q_s6_renewable_invest_likelihood) {
      scores.s6_renewableO_ri = calculateOpportunityRI(s6.q_s6_renewable_invest_impact, s6.q_s6_renewable_invest_likelihood);
    }
    if (s6.q_s6_political_transition_impact && s6.q_s6_political_transition_likelihood) {
      scores.s6_political_vi = calculateThreatVI(s6.q_s6_political_transition_impact, s6.q_s6_political_transition_likelihood);
    }

    // Section 7: Connectors (S, W, O, T)
    if (s7.q_s7_bimpeaga_loc_impact && s7.q_s7_bimpeaga_loc_likelihood) {
      scores.s7_bimpeaga_ri = calculateStrengthRI(s7.q_s7_bimpeaga_loc_impact, s7.q_s7_bimpeaga_loc_likelihood);
    }
    if (s7.q_s7_domestic_halal_impact && s7.q_s7_domestic_halal_likelihood) {
      scores.s7_domestic_ri = calculateStrengthRI(s7.q_s7_domestic_halal_impact, s7.q_s7_domestic_halal_likelihood);
    }
    if (s7.q_s7_infra_deficits_impact && s7.q_s7_infra_deficits_likelihood) {
      scores.s7_infra_risk = calculateWeaknessRisk(s7.q_s7_infra_deficits_impact, s7.q_s7_infra_deficits_likelihood);
    }
    if (s7.q_s7_market_linkages_impact && s7.q_s7_market_linkages_likelihood) {
      scores.s7_linkages_risk = calculateWeaknessRisk(s7.q_s7_market_linkages_impact, s7.q_s7_market_linkages_likelihood);
    }
    if (s7.q_s7_asean_halal_impact && s7.q_s7_asean_halal_likelihood) {
      scores.s7_asean_ri = calculateOpportunityRI(s7.q_s7_asean_halal_impact, s7.q_s7_asean_halal_likelihood);
    }
    if (s7.q_s7_uae_corridor_impact && s7.q_s7_uae_corridor_likelihood) {
      scores.s7_uae_ri = calculateOpportunityRI(s7.q_s7_uae_corridor_impact, s7.q_s7_uae_corridor_likelihood);
    }
    if (s7.q_s7_halal_competition_impact && s7.q_s7_halal_competition_likelihood) {
      scores.s7_competition_vi = calculateThreatVI(s7.q_s7_halal_competition_impact, s7.q_s7_halal_competition_likelihood);
    }

    // Section 8: Financiers (S, W, O, T)
    if (s8.q_s8_islamic_finance_fw_impact && s8.q_s8_islamic_finance_fw_likelihood) {
      scores.s8_islamic_ri = calculateStrengthRI(s8.q_s8_islamic_finance_fw_impact, s8.q_s8_islamic_finance_fw_likelihood);
    }
    if (s8.q_s8_peace_dividend_impact && s8.q_s8_peace_dividend_likelihood) {
      scores.s8_peace_ri = calculateStrengthRI(s8.q_s8_peace_dividend_impact, s8.q_s8_peace_dividend_likelihood);
    }
    if (s8.q_s8_financial_penetration_impact && s8.q_s8_financial_penetration_likelihood) {
      scores.s8_penetration_risk = calculateWeaknessRisk(s8.q_s8_financial_penetration_impact, s8.q_s8_financial_penetration_likelihood);
    }
    if (s8.q_s8_literacy_impact && s8.q_s8_literacy_likelihood) {
      scores.s8_literacy_risk = calculateWeaknessRisk(s8.q_s8_literacy_impact, s8.q_s8_literacy_likelihood);
    }
    if (s8.q_s8_islamic_ecosystem_impact && s8.q_s8_islamic_ecosystem_likelihood) {
      scores.s8_ecosystem_ri = calculateOpportunityRI(s8.q_s8_islamic_ecosystem_impact, s8.q_s8_islamic_ecosystem_likelihood);
    }
    if (s8.q_s8_uae_corridor_impact && s8.q_s8_uae_corridor_likelihood) {
      scores.s8_uae_ri = calculateOpportunityRI(s8.q_s8_uae_corridor_impact, s8.q_s8_uae_corridor_likelihood);
    }
    if (s8.q_s8_halal_standards_impact && s8.q_s8_halal_standards_likelihood) {
      scores.s8_standards_vi = calculateThreatVI(s8.q_s8_halal_standards_impact, s8.q_s8_halal_standards_likelihood);
    }

    // Section 9: Operating Systems (S, W, O, T)
    if (s9.q_s9_policy_recognition_impact && s9.q_s9_policy_recognition_likelihood) {
      scores.s9_policy_ri = calculateStrengthRI(s9.q_s9_policy_recognition_impact, s9.q_s9_policy_recognition_likelihood);
    }
    if (s9.q_s9_peace_dividend_impact && s9.q_s9_peace_dividend_likelihood) {
      scores.s9_peace_ri = calculateStrengthRI(s9.q_s9_peace_dividend_impact, s9.q_s9_peace_dividend_likelihood);
    }
    if (s9.q_s9_literacy_impact && s9.q_s9_literacy_likelihood) {
      scores.s9_literacy_risk = calculateWeaknessRisk(s9.q_s9_literacy_impact, s9.q_s9_literacy_likelihood);
    }
    if (s9.q_s9_underspending_impact && s9.q_s9_underspending_likelihood) {
      scores.s9_underspend_risk = calculateWeaknessRisk(s9.q_s9_underspending_impact, s9.q_s9_underspending_likelihood);
    }
    if (s9.q_s9_carbon_markets_impact && s9.q_s9_carbon_markets_likelihood) {
      scores.s9_carbon_ri = calculateOpportunityRI(s9.q_s9_carbon_markets_impact, s9.q_s9_carbon_markets_likelihood);
    }
    if (s9.q_s9_postconflict_impact && s9.q_s9_postconflict_likelihood) {
      scores.s9_recon_ri = calculateOpportunityRI(s9.q_s9_postconflict_impact, s9.q_s9_postconflict_likelihood);
    }
    if (s9.q_s9_security_incidents_impact && s9.q_s9_security_incidents_likelihood) {
      scores.s9_security_vi = calculateThreatVI(s9.q_s9_security_incidents_impact, s9.q_s9_security_incidents_likelihood);
    }
    if (s9.q_s9_political_transition_impact && s9.q_s9_political_transition_likelihood) {
      scores.s9_political_vi = calculateThreatVI(s9.q_s9_political_transition_impact, s9.q_s9_political_transition_likelihood);
    }

    setBirdScores(scores);
  }, [s3, s4, s5, s6, s7, s8, s9]);

  // ── Navigation ──
  const goNext = () => {
    if (step < STEP_LABELS.length - 1) {
      setStep(step + 1);
      computeBIRDScores();
    }
  };

  const goPrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const totalSteps = STEP_LABELS.length; // 16 steps (0–15)

  // ── Submission (Exhaustive Payload Mapping) ──
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload: Partial<SurveySchemaType> = {
        // Step 0
        q0_1_ready: s0.q0_1_ready || undefined,
        q0_2_ecosystem_understanding: s0.q0_2_ecosystem_understanding || undefined,
        q0_3_systems_thinking_value: s0.q0_3_systems_thinking_value,
        q0_4_cld_understanding: s0.q0_4_cld_understanding,
        q0_5_feedback_loops_understanding: s0.q0_5_feedback_loops_understanding,
        q0_6_leverage_points_understanding: s0.q0_6_leverage_points_understanding,

        // Step 1
        q1_1_consent_participate: s1.q1_1_consent_participate,
        q1_2_consent_anonymize: s1.q1_2_consent_anonymize,
        q1_3_consent_email_copy: s1.q1_3_consent_email_copy,
        q1_4_consent_voluntary: s1.q1_4_consent_voluntary,

        // Step 2
        demo_name: s2.demo_name || undefined,
        demo_email: s2.demo_email || undefined,
        demo_organization: s2.demo_organization || undefined,
        demo_position: s2.demo_position || undefined,
        demo_province: s2.demo_province || undefined,
        demo_category: s2.demo_category || undefined,
        demo_expertise: s2.demo_expertise,

        // Step 3
        q3_1_beie_video_understanding: s3.q3_1_beie_video_understanding,
        q3_2_systems_reframing_accuracy: s3.q3_2_systems_reframing_accuracy,
        q3_3_sector_to_ecosystem_shift: s3.q3_3_sector_to_ecosystem_shift,
        q3_4_beie_framework_clarity: s3.q3_4_beie_framework_clarity,
        q3_5_operating_systems_understanding: s3.q3_5_operating_systems_understanding,
        q3_6_five_clusters_understanding: s3.q3_6_five_clusters_understanding,
        q3_7_investment_development_loop: s3.q3_7_investment_development_loop || undefined,
        q3_8_governance_investor_loop: s3.q3_8_governance_investor_loop || undefined,
        q_s1_halal_legitimacy_impact: s3.q_s1_halal_legitimacy_impact,
        q_s1_halal_legitimacy_likelihood: s3.q_s1_halal_legitimacy_likelihood,
        q_s1_bimpeaga_impact: s3.q_s1_bimpeaga_impact,
        q_s1_bimpeaga_likelihood: s3.q_s1_bimpeaga_likelihood,
        q_s1_aff_base_impact: s3.q_s1_aff_base_impact,
        q_s1_aff_base_likelihood: s3.q_s1_aff_base_likelihood,

        // Step 4
        q4_1_foundations_banner_understanding: s4.q4_1_foundations_banner_understanding,
        q4_2_tragedy_commons_accuracy: s4.q4_2_tragedy_commons_accuracy || undefined,
        q4_3_tragedy_followup: s4.q4_3_tragedy_followup || undefined,
        q4_4_climate_impact: s4.q4_4_climate_impact,
        q4_5_climate_likelihood: s4.q4_5_climate_likelihood,
        q4_6_pestalotiopsis_impact: s4.q4_6_pestalotiopsis_impact,
        q4_7_pestalotiopsis_likelihood: s4.q4_7_pestalotiopsis_likelihood,
        q4_8_postharvest_impact: s4.q4_8_postharvest_impact,
        q4_9_postharvest_likelihood: s4.q4_9_postharvest_likelihood,
        q4_10_poverty_impact: s4.q4_10_poverty_impact,
        q4_11_poverty_likelihood: s4.q4_11_poverty_likelihood,
        q4_12_limits_growth_accuracy: s4.q4_12_limits_growth_accuracy || undefined,
        q4_13_limits_followup: s4.q4_13_limits_followup || undefined,
        q_s4_climate_impact: s4.q_s4_climate_impact,
        q_s4_climate_likelihood: s4.q_s4_climate_likelihood,
        q_s4_pestalotiopsis_impact: s4.q_s4_pestalotiopsis_impact,
        q_s4_pestalotiopsis_likelihood: s4.q_s4_pestalotiopsis_likelihood,
        q_s4_postharvest_impact: s4.q_s4_postharvest_impact,
        q_s4_postharvest_likelihood: s4.q_s4_postharvest_likelihood,
        q_s4_poverty_impact: s4.q_s4_poverty_impact,
        q_s4_poverty_likelihood: s4.q_s4_poverty_likelihood,
        q_s4_tragedy_commons: s4.q_s4_tragedy_commons || undefined,
        q_s4_tragedy_followup: s4.q_s4_tragedy_followup || undefined,
        q_s4_limits_growth: s4.q_s4_limits_growth || undefined,

        // Step 5
        q5_1_transformers_banner_understanding: s5.q5_1_transformers_banner_understanding,
        q5_2_halal_advantage_understanding: s5.q5_2_halal_advantage_understanding,
        q5_3_farm_to_market_understanding: s5.q5_3_farm_to_market_understanding,
        q5_4_economic_zones_understanding: s5.q5_4_economic_zones_understanding,
        q5_5_growth_underinvestment_accuracy: s5.q5_5_growth_underinvestment_accuracy || undefined,
        q5_6_growth_underinvestment_followup: s5.q5_6_growth_underinvestment_followup || undefined,
        q5_7_halal_cert_impact: s5.q5_7_halal_cert_impact,
        q5_8_halal_cert_likelihood: s5.q5_8_halal_cert_likelihood,
        q5_9_skills_mismatch_impact: s5.q5_9_skills_mismatch_impact,
        q5_10_skills_mismatch_likelihood: s5.q5_10_skills_mismatch_likelihood,
        q5_11_global_halal_impact: s5.q5_11_global_halal_impact,
        q5_12_global_halal_likelihood: s5.q5_12_global_halal_likelihood,
        q5_13_uae_corridor_impact: s5.q5_13_uae_corridor_impact,
        q5_14_uae_corridor_likelihood: s5.q5_14_uae_corridor_likelihood,
        q5_15_competition_impact: s5.q5_15_competition_impact,
        q5_16_competition_likelihood: s5.q5_16_competition_likelihood,
        q_s5_halal_cert_impact: s5.q_s5_halal_cert_impact,
        q_s5_halal_cert_likelihood: s5.q_s5_halal_cert_likelihood,
        q_s5_skills_mismatch_impact: s5.q_s5_skills_mismatch_impact,
        q_s5_skills_mismatch_likelihood: s5.q_s5_skills_mismatch_likelihood,
        q_s5_global_halal_impact: s5.q_s5_global_halal_impact,
        q_s5_global_halal_likelihood: s5.q_s5_global_halal_likelihood,
        q_s5_uae_corridor_impact: s5.q_s5_uae_corridor_impact,
        q_s5_uae_corridor_likelihood: s5.q_s5_uae_corridor_likelihood,
        q_s5_competition_impact: s5.q_s5_competition_impact,
        q_s5_competition_likelihood: s5.q_s5_competition_likelihood,
        q_s5_fixes_fail: s5.q_s5_fixes_fail || undefined,
        q_s5_fixes_followup: s5.q_s5_fixes_followup || undefined,
        q_s5_successful: s5.q_s5_successful || undefined,
        q_s5_successful_followup: s5.q_s5_successful_followup || undefined,

        // Step 6
        q6_1_enablers_banner_understanding: s6.q6_1_enablers_banner_understanding,
        q6_2_skills_gap_understanding: s6.q6_2_skills_gap_understanding,
        q6_3_enabling_grid_understanding: s6.q6_3_enabling_grid_understanding,
        q6_4_digital_transformation_understanding: s6.q6_4_digital_transformation_understanding,
        q6_5_tourism_master_plan_understanding: s6.q6_5_tourism_master_plan_understanding,
        q6_6_tourism_digital_connectivity_understanding: s6.q6_6_tourism_digital_connectivity_understanding,
        q6_7_activating_enablers_understanding: s6.q6_7_activating_enablers_understanding,
        q6_8_limits_growth_enablers_accuracy: s6.q6_8_limits_growth_enablers_accuracy || undefined,
        q6_9_limits_growth_enablers_followup: s6.q6_9_limits_growth_enablers_followup || undefined,
        q6_10_youth_pop_impact: s6.q6_10_youth_pop_impact,
        q6_11_youth_pop_likelihood: s6.q6_11_youth_pop_likelihood,
        q6_12_renewable_energy_impact: s6.q6_12_renewable_energy_impact,
        q6_13_renewable_energy_likelihood: s6.q6_13_renewable_energy_likelihood,
        q6_14_polloc_impact: s6.q6_14_polloc_impact,
        q6_15_polloc_likelihood: s6.q6_15_polloc_likelihood,
        q6_16_infra_deficits_impact: s6.q6_16_infra_deficits_impact,
        q6_17_infra_deficits_likelihood: s6.q6_17_infra_deficits_likelihood,
        q6_18_literacy_impact: s6.q6_18_literacy_impact,
        q6_19_literacy_likelihood: s6.q6_19_literacy_likelihood,
        q6_20_skills_mismatch_impact: s6.q6_20_skills_mismatch_impact,
        q6_21_skills_mismatch_likelihood: s6.q6_21_skills_mismatch_likelihood,
        q6_22_tech_adoption_impact: s6.q6_22_tech_adoption_impact,
        q6_23_tech_adoption_likelihood: s6.q6_23_tech_adoption_likelihood,
        q6_24_renewable_invest_impact: s6.q6_24_renewable_invest_impact,
        q6_25_renewable_invest_likelihood: s6.q6_25_renewable_invest_likelihood,
        q6_26_tourism_potential_impact: s6.q6_26_tourism_potential_impact,
        q6_27_tourism_potential_likelihood: s6.q6_27_tourism_potential_likelihood,
        q6_28_political_transition_impact: s6.q6_28_political_transition_impact,
        q6_29_political_transition_likelihood: s6.q6_29_political_transition_likelihood,
        q6_30_cost_overruns_impact: s6.q6_30_cost_overruns_impact,
        q6_31_cost_overruns_likelihood: s6.q6_31_cost_overruns_likelihood,
        q6_32_natl_coord_impact: s6.q6_32_natl_coord_impact,
        q6_33_natl_coord_likelihood: s6.q6_33_natl_coord_likelihood,
        q6_34_shifting_burden: s6.q6_34_shifting_burden || undefined,
        q6_35_shifting_followup: s6.q6_35_shifting_followup || undefined,
        q6_36_growth_underinvest: s6.q6_36_growth_underinvest || undefined,
        q6_37_growth_followup: s6.q6_37_growth_followup || undefined,
        q_s6_youth_pop_impact: s6.q_s6_youth_pop_impact,
        q_s6_youth_pop_likelihood: s6.q_s6_youth_pop_likelihood,
        q_s6_renewable_energy_impact: s6.q_s6_renewable_energy_impact,
        q_s6_renewable_energy_likelihood: s6.q_s6_renewable_energy_likelihood,
        q_s6_polloc_impact: s6.q_s6_polloc_impact,
        q_s6_polloc_likelihood: s6.q_s6_polloc_likelihood,
        q_s6_infra_deficits_impact: s6.q_s6_infra_deficits_impact,
        q_s6_infra_deficits_likelihood: s6.q_s6_infra_deficits_likelihood,
        q_s6_literacy_impact: s6.q_s6_literacy_impact,
        q_s6_literacy_likelihood: s6.q_s6_literacy_likelihood,
        q_s6_skills_mismatch_impact: s6.q_s6_skills_mismatch_impact,
        q_s6_skills_mismatch_likelihood: s6.q_s6_skills_mismatch_likelihood,
        q_s6_tech_adoption_impact: s6.q_s6_tech_adoption_impact,
        q_s6_tech_adoption_likelihood: s6.q_s6_tech_adoption_likelihood,
        q_s6_renewable_invest_impact: s6.q_s6_renewable_invest_impact,
        q_s6_renewable_invest_likelihood: s6.q_s6_renewable_invest_likelihood,
        q_s6_tourism_potential_impact: s6.q_s6_tourism_potential_impact,
        q_s6_tourism_potential_likelihood: s6.q_s6_tourism_potential_likelihood,
        q_s6_political_transition_impact: s6.q_s6_political_transition_impact,
        q_s6_political_transition_likelihood: s6.q_s6_political_transition_likelihood,
        q_s6_cost_overruns_impact: s6.q_s6_cost_overruns_impact,
        q_s6_cost_overruns_likelihood: s6.q_s6_cost_overruns_likelihood,
        q_s6_natl_coord_impact: s6.q_s6_natl_coord_impact,
        q_s6_natl_coord_likelihood: s6.q_s6_natl_coord_likelihood,
        q_s6_shifting_burden: s6.q_s6_shifting_burden || undefined,
        q_s6_shifting_followup: s6.q_s6_shifting_followup || undefined,
        q_s6_growth_underinvest: s6.q_s6_growth_underinvest || undefined,
        q_s6_growth_followup: s6.q_s6_growth_followup || undefined,

        // Step 7
        q7_1_connectors_banner_understanding: s7.q7_1_connectors_banner_understanding,
        q7_2_connectivity_capital_understanding: s7.q7_2_connectivity_capital_understanding,
        q7_3_integrating_zones_understanding: s7.q7_3_integrating_zones_understanding,
        q7_4_provincial_nodes_understanding: s7.q7_4_provincial_nodes_understanding,
        q7_5_trapped_value_understanding: s7.q7_5_trapped_value_understanding,
        q7_6_revitalizing_maritime_understanding: s7.q7_6_revitalizing_maritime_understanding,
        q7_7_shattering_isolation_understanding: s7.q7_7_shattering_isolation_understanding,
        q7_8_basilan_tawitawi_understanding: s7.q7_8_basilan_tawitawi_understanding,
        q7_9_global_integration_understanding: s7.q7_9_global_integration_understanding,
        q7_10_uae_gcc_understanding: s7.q7_10_uae_gcc_understanding,
        q7_11_bimpeaga_map_understanding: s7.q7_11_bimpeaga_map_understanding,
        q7_12_success_successful_accuracy: s7.q7_12_success_successful_accuracy || undefined,
        q7_13_success_successful_followup: s7.q7_13_success_successful_followup || undefined,
        q7_14_bimpeaga_loc_impact: s7.q7_14_bimpeaga_loc_impact,
        q7_15_bimpeaga_loc_likelihood: s7.q7_15_bimpeaga_loc_likelihood,
        q7_16_domestic_halal_impact: s7.q7_16_domestic_halal_impact,
        q7_17_domestic_halal_likelihood: s7.q7_17_domestic_halal_likelihood,
        q7_18_polloc_impact: s7.q7_18_polloc_impact,
        q7_19_polloc_likelihood: s7.q7_19_polloc_likelihood,
        q7_20_islamic_finance_impact: s7.q7_20_islamic_finance_impact,
        q7_21_islamic_finance_likelihood: s7.q7_21_islamic_finance_likelihood,
        q7_22_infra_deficits_impact: s7.q7_22_infra_deficits_impact,
        q7_23_infra_deficits_likelihood: s7.q7_23_infra_deficits_likelihood,
        q7_24_fragmented_policy_impact: s7.q7_24_fragmented_policy_impact,
        q7_25_fragmented_policy_likelihood: s7.q7_25_fragmented_policy_likelihood,
        q7_26_market_linkages_impact: s7.q7_26_market_linkages_impact,
        q7_27_market_linkages_likelihood: s7.q7_27_market_linkages_likelihood,
        q7_28_tech_adoption_impact: s7.q7_28_tech_adoption_impact,
        q7_29_tech_adoption_likelihood: s7.q7_29_tech_adoption_likelihood,
        q7_30_asean_halal_impact: s7.q7_30_asean_halal_impact,
        q7_31_asean_halal_likelihood: s7.q7_31_asean_halal_likelihood,
        q7_32_bimpeaga_integration_impact: s7.q7_32_bimpeaga_integration_impact,
        q7_33_bimpeaga_integration_likelihood: s7.q7_33_bimpeaga_integration_likelihood,
        q7_34_uae_corridor_impact: s7.q7_34_uae_corridor_impact,
        q7_35_uae_corridor_likelihood: s7.q7_35_uae_corridor_likelihood,
        q7_36_tourism_potential_impact: s7.q7_36_tourism_potential_impact,
        q7_37_tourism_potential_likelihood: s7.q7_37_tourism_potential_likelihood,
        q7_38_halal_competition_impact: s7.q7_38_halal_competition_impact,
        q7_39_halal_competition_likelihood: s7.q7_39_halal_competition_likelihood,
        q7_40_security_incidents_impact: s7.q7_40_security_incidents_impact,
        q7_41_security_incidents_likelihood: s7.q7_41_security_incidents_likelihood,
        q7_42_price_volatility_impact: s7.q7_42_price_volatility_impact,
        q7_43_price_volatility_likelihood: s7.q7_43_price_volatility_likelihood,
        q7_44_natl_coord_impact: s7.q7_44_natl_coord_impact,
        q7_45_natl_coord_likelihood: s7.q7_45_natl_coord_likelihood,
        q7_46_escalation: s7.q7_46_escalation || undefined,
        q7_47_escalation_followup: s7.q7_47_escalation_followup || undefined,
        q7_48_limits_growth: s7.q7_48_limits_growth || undefined,
        q7_49_limits_followup: s7.q7_49_limits_followup || undefined,
        q_s7_bimpeaga_loc_impact: s7.q_s7_bimpeaga_loc_impact,
        q_s7_bimpeaga_loc_likelihood: s7.q_s7_bimpeaga_loc_likelihood,
        q_s7_domestic_halal_impact: s7.q_s7_domestic_halal_impact,
        q_s7_domestic_halal_likelihood: s7.q_s7_domestic_halal_likelihood,
        q_s7_polloc_impact: s7.q_s7_polloc_impact,
        q_s7_polloc_likelihood: s7.q_s7_polloc_likelihood,
        q_s7_islamic_finance_impact: s7.q_s7_islamic_finance_impact,
        q_s7_islamic_finance_likelihood: s7.q_s7_islamic_finance_likelihood,
        q_s7_infra_deficits_impact: s7.q_s7_infra_deficits_impact,
        q_s7_infra_deficits_likelihood: s7.q_s7_infra_deficits_likelihood,
        q_s7_fragmented_policy_impact: s7.q_s7_fragmented_policy_impact,
        q_s7_fragmented_policy_likelihood: s7.q_s7_fragmented_policy_likelihood,
        q_s7_market_linkages_impact: s7.q_s7_market_linkages_impact,
        q_s7_market_linkages_likelihood: s7.q_s7_market_linkages_likelihood,
        q_s7_tech_adoption_impact: s7.q_s7_tech_adoption_impact,
        q_s7_tech_adoption_likelihood: s7.q_s7_tech_adoption_likelihood,
        q_s7_asean_halal_impact: s7.q_s7_asean_halal_impact,
        q_s7_asean_halal_likelihood: s7.q_s7_asean_halal_likelihood,
        q_s7_bimpeaga_integration_impact: s7.q_s7_bimpeaga_integration_impact,
        q_s7_bimpeaga_integration_likelihood: s7.q_s7_bimpeaga_integration_likelihood,
        q_s7_uae_corridor_impact: s7.q_s7_uae_corridor_impact,
        q_s7_uae_corridor_likelihood: s7.q_s7_uae_corridor_likelihood,
        q_s7_tourism_potential_impact: s7.q_s7_tourism_potential_impact,
        q_s7_tourism_potential_likelihood: s7.q_s7_tourism_potential_likelihood,
        q_s7_halal_competition_impact: s7.q_s7_halal_competition_impact,
        q_s7_halal_competition_likelihood: s7.q_s7_halal_competition_likelihood,
        q_s7_security_incidents_impact: s7.q_s7_security_incidents_impact,
        q_s7_security_incidents_likelihood: s7.q_s7_security_incidents_likelihood,
        q_s7_price_volatility_impact: s7.q_s7_price_volatility_impact,
        q_s7_price_volatility_likelihood: s7.q_s7_price_volatility_likelihood,
        q_s7_natl_coord_impact: s7.q_s7_natl_coord_impact,
        q_s7_natl_coord_likelihood: s7.q_s7_natl_coord_likelihood,
        q_s7_escalation: s7.q_s7_escalation || undefined,
        q_s7_escalation_followup: s7.q_s7_escalation_followup || undefined,
        q_s7_limits_growth: s7.q_s7_limits_growth || undefined,
        q_s7_limits_followup: s7.q_s7_limits_followup || undefined,

        // Step 8
        q8_1_financiers_banner_understanding: s8.q8_1_financiers_banner_understanding,
        q8_2_capital_bloodstream_understanding: s8.q8_2_capital_bloodstream_understanding,
        q8_3_islamic_finance_roadmap_understanding: s8.q8_3_islamic_finance_roadmap_understanding,
        q8_4_shifting_burden_financiers_accuracy: s8.q8_4_shifting_burden_financiers_accuracy || undefined,
        q8_5_shifting_burden_financiers_followup: s8.q8_5_shifting_burden_financiers_followup || undefined,
        q8_6_domestic_halal_impact: s8.q8_6_domestic_halal_impact,
        q8_7_domestic_halal_likelihood: s8.q8_7_domestic_halal_likelihood,
        q8_8_youth_pop_impact: s8.q8_8_youth_pop_impact,
        q8_9_youth_pop_likelihood: s8.q8_9_youth_pop_likelihood,
        q8_10_policy_recognition_impact: s8.q8_10_policy_recognition_impact,
        q8_11_policy_recognition_likelihood: s8.q8_11_policy_recognition_likelihood,
        q8_12_islamic_finance_fw_impact: s8.q8_12_islamic_finance_fw_impact,
        q8_13_islamic_finance_fw_likelihood: s8.q8_13_islamic_finance_fw_likelihood,
        q8_14_peace_dividend_impact: s8.q8_14_peace_dividend_impact,
        q8_15_peace_dividend_likelihood: s8.q8_15_peace_dividend_likelihood,
        q8_16_infra_deficits_impact: s8.q8_16_infra_deficits_impact,
        q8_17_infra_deficits_likelihood: s8.q8_17_infra_deficits_likelihood,
        q8_18_literacy_impact: s8.q8_18_literacy_impact,
        q8_19_literacy_likelihood: s8.q8_19_literacy_likelihood,
        q8_20_financial_penetration_impact: s8.q8_20_financial_penetration_impact,
        q8_21_financial_penetration_likelihood: s8.q8_21_financial_penetration_likelihood,
        q8_22_fragmented_policy_impact: s8.q8_22_fragmented_policy_impact,
        q8_23_fragmented_policy_likelihood: s8.q8_23_fragmented_policy_likelihood,
        q8_24_skills_mismatch_impact: s8.q8_24_skills_mismatch_impact,
        q8_25_skills_mismatch_likelihood: s8.q8_25_skills_mismatch_likelihood,
        q8_26_global_halal_impact: s8.q8_26_global_halal_impact,
        q8_27_global_halal_likelihood: s8.q8_27_global_halal_likelihood,
        q8_28_renewable_invest_impact: s8.q8_28_renewable_invest_impact,
        q8_29_renewable_invest_likelihood: s8.q8_29_renewable_invest_likelihood,
        q8_30_asean_halal_impact: s8.q8_30_asean_halal_impact,
        q8_31_asean_halal_likelihood: s8.q8_31_asean_halal_likelihood,
        q8_32_islamic_ecosystem_impact: s8.q8_32_islamic_ecosystem_impact,
        q8_33_islamic_ecosystem_likelihood: s8.q8_33_islamic_ecosystem_likelihood,
        q8_34_uae_corridor_impact: s8.q8_34_uae_corridor_impact,
        q8_35_uae_corridor_likelihood: s8.q8_35_uae_corridor_likelihood,
        q8_36_halal_competition_impact: s8.q8_36_halal_competition_impact,
        q8_37_halal_competition_likelihood: s8.q8_37_halal_competition_likelihood,
        q8_38_halal_standards_impact: s8.q8_38_halal_standards_impact,
        q8_39_halal_standards_likelihood: s8.q8_39_halal_standards_likelihood,
        q8_40_security_incidents_impact: s8.q8_40_security_incidents_impact,
        q8_41_security_incidents_likelihood: s8.q8_41_security_incidents_likelihood,
        q8_42_political_transition_impact: s8.q8_42_political_transition_impact,
        q8_43_political_transition_likelihood: s8.q8_43_political_transition_likelihood,
        q8_44_big_man: s8.q8_44_big_man || undefined,
        q8_45_big_man_followup: s8.q8_45_big_man_followup || undefined,
        q8_46_shifting_burden: s8.q8_46_shifting_burden || undefined,
        q8_47_shifting_followup: s8.q8_47_shifting_followup || undefined,
        q_s8_domestic_halal_impact: s8.q_s8_domestic_halal_impact,
        q_s8_domestic_halal_likelihood: s8.q_s8_domestic_halal_likelihood,
        q_s8_youth_pop_impact: s8.q_s8_youth_pop_impact,
        q_s8_youth_pop_likelihood: s8.q_s8_youth_pop_likelihood,
        q_s8_policy_recognition_impact: s8.q_s8_policy_recognition_impact,
        q_s8_policy_recognition_likelihood: s8.q_s8_policy_recognition_likelihood,
        q_s8_islamic_finance_fw_impact: s8.q_s8_islamic_finance_fw_impact,
        q_s8_islamic_finance_fw_likelihood: s8.q_s8_islamic_finance_fw_likelihood,
        q_s8_peace_dividend_impact: s8.q_s8_peace_dividend_impact,
        q_s8_peace_dividend_likelihood: s8.q_s8_peace_dividend_likelihood,
        q_s8_infra_deficits_impact: s8.q_s8_infra_deficits_impact,
        q_s8_infra_deficits_likelihood: s8.q_s8_infra_deficits_likelihood,
        q_s8_literacy_impact: s8.q_s8_literacy_impact,
        q_s8_literacy_likelihood: s8.q_s8_literacy_likelihood,
        q_s8_financial_penetration_impact: s8.q_s8_financial_penetration_impact,
        q_s8_financial_penetration_likelihood: s8.q_s8_financial_penetration_likelihood,
        q_s8_fragmented_policy_impact: s8.q_s8_fragmented_policy_impact,
        q_s8_fragmented_policy_likelihood: s8.q_s8_fragmented_policy_likelihood,
        q_s8_skills_mismatch_impact: s8.q_s8_skills_mismatch_impact,
        q_s8_skills_mismatch_likelihood: s8.q_s8_skills_mismatch_likelihood,
        q_s8_global_halal_impact: s8.q_s8_global_halal_impact,
        q_s8_global_halal_likelihood: s8.q_s8_global_halal_likelihood,
        q_s8_renewable_invest_impact: s8.q_s8_renewable_invest_impact,
        q_s8_renewable_invest_likelihood: s8.q_s8_renewable_invest_likelihood,
        q_s8_asean_halal_impact: s8.q_s8_asean_halal_impact,
        q_s8_asean_halal_likelihood: s8.q_s8_asean_halal_likelihood,
        q_s8_islamic_ecosystem_impact: s8.q_s8_islamic_ecosystem_impact,
        q_s8_islamic_ecosystem_likelihood: s8.q_s8_islamic_ecosystem_likelihood,
        q_s8_uae_corridor_impact: s8.q_s8_uae_corridor_impact,
        q_s8_uae_corridor_likelihood: s8.q_s8_uae_corridor_likelihood,
        q_s8_halal_competition_impact: s8.q_s8_halal_competition_impact,
        q_s8_halal_competition_likelihood: s8.q_s8_halal_competition_likelihood,
        q_s8_halal_standards_impact: s8.q_s8_halal_standards_impact,
        q_s8_halal_standards_likelihood: s8.q_s8_halal_standards_likelihood,
        q_s8_security_incidents_impact: s8.q_s8_security_incidents_impact,
        q_s8_security_incidents_likelihood: s8.q_s8_security_incidents_likelihood,
        q_s8_political_transition_impact: s8.q_s8_political_transition_impact,
        q_s8_political_transition_likelihood: s8.q_s8_political_transition_likelihood,
        q_s8_big_man: s8.q_s8_big_man || undefined,
        q_s8_big_man_followup: s8.q_s8_big_man_followup || undefined,
        q_s8_shifting_burden: s8.q_s8_shifting_burden || undefined,
        q_s8_shifting_followup: s8.q_s8_shifting_followup || undefined,

        // Step 9
        q9_1_os_banner_understanding: s9.q9_1_os_banner_understanding,
        q9_2_moral_governance_derisk_understanding: s9.q9_2_moral_governance_derisk_understanding,
        q9_3_regulatory_architecture_understanding: s9.q9_3_regulatory_architecture_understanding,
        q9_4_jmc_2026_01_understanding: s9.q9_4_jmc_2026_01_understanding,
        q9_5_fixes_fail_os_accuracy: s9.q9_5_fixes_fail_os_accuracy || undefined,
        q9_6_fixes_fail_os_followup: s9.q9_6_fixes_fail_os_followup || undefined,
        q9_7_big_man_archetype_accuracy: s9.q9_7_big_man_archetype_accuracy || undefined,
        q9_8_big_man_archetype_followup: s9.q9_8_big_man_archetype_followup || undefined,
        q9_9_policy_recommendations_stakeholders_understanding: s9.q9_9_policy_recommendations_stakeholders_understanding,
        q9_10_policy_recommendations_activating_understanding: s9.q9_10_policy_recommendations_activating_understanding,
        q9_11_policy_recognition_impact: s9.q9_11_policy_recognition_impact,
        q9_12_policy_recognition_likelihood: s9.q9_12_policy_recognition_likelihood,
        q9_13_islamic_finance_impact: s9.q9_13_islamic_finance_impact,
        q9_14_islamic_finance_likelihood: s9.q9_14_islamic_finance_likelihood,
        q9_15_cultural_heritage_impact: s9.q9_15_cultural_heritage_impact,
        q9_16_cultural_heritage_likelihood: s9.q9_16_cultural_heritage_likelihood,
        q9_17_peace_dividend_impact: s9.q9_17_peace_dividend_impact,
        q9_18_peace_dividend_likelihood: s9.q9_18_peace_dividend_likelihood,
        q9_19_literacy_impact: s9.q9_19_literacy_impact,
        q9_20_literacy_likelihood: s9.q9_20_literacy_likelihood,
        q9_21_fragmented_policy_impact: s9.q9_21_fragmented_policy_impact,
        q9_22_fragmented_policy_likelihood: s9.q9_22_fragmented_policy_likelihood,
        q9_23_underspending_impact: s9.q9_23_underspending_impact,
        q9_24_underspending_likelihood: s9.q9_24_underspending_likelihood,
        q9_25_carbon_markets_impact: s9.q9_25_carbon_markets_impact,
        q9_26_carbon_markets_likelihood: s9.q9_26_carbon_markets_likelihood,
        q9_27_pes_impact: s9.q9_27_pes_impact,
        q9_28_pes_likelihood: s9.q9_28_pes_likelihood,
        q9_29_postconflict_impact: s9.q9_29_postconflict_impact,
        q9_30_postconflict_likelihood: s9.q9_30_postconflict_likelihood,
        q9_31_forestry_code_impact: s9.q9_31_forestry_code_impact,
        q9_32_forestry_code_likelihood: s9.q9_32_forestry_code_likelihood,
        q9_33_security_incidents_impact: s9.q9_33_security_incidents_impact,
        q9_34_security_incidents_likelihood: s9.q9_34_security_incidents_likelihood,
        q9_35_political_transition_impact: s9.q9_35_political_transition_impact,
        q9_36_political_transition_likelihood: s9.q9_36_political_transition_likelihood,
        q9_37_fragmented_agency_impact: s9.q9_37_fragmented_agency_impact,
        q9_38_fragmented_agency_likelihood: s9.q9_38_fragmented_agency_likelihood,
        q9_39_investment_loop: s9.q9_39_investment_loop || undefined,
        q9_40_investment_loop_followup: s9.q9_40_investment_loop_followup || undefined,
        q9_41_governance_loop: s9.q9_41_governance_loop || undefined,
        q9_42_governance_loop_followup: s9.q9_42_governance_loop_followup || undefined,
        q_s9_policy_recognition_impact: s9.q_s9_policy_recognition_impact,
        q_s9_policy_recognition_likelihood: s9.q_s9_policy_recognition_likelihood,
        q_s9_islamic_finance_impact: s9.q_s9_islamic_finance_impact,
        q_s9_islamic_finance_likelihood: s9.q_s9_islamic_finance_likelihood,
        q_s9_cultural_heritage_impact: s9.q_s9_cultural_heritage_impact,
        q_s9_cultural_heritage_likelihood: s9.q_s9_cultural_heritage_likelihood,
        q_s9_peace_dividend_impact: s9.q_s9_peace_dividend_impact,
        q_s9_peace_dividend_likelihood: s9.q_s9_peace_dividend_likelihood,
        q_s9_literacy_impact: s9.q_s9_literacy_impact,
        q_s9_literacy_likelihood: s9.q_s9_literacy_likelihood,
        q_s9_fragmented_policy_impact: s9.q_s9_fragmented_policy_impact,
        q_s9_fragmented_policy_likelihood: s9.q_s9_fragmented_policy_likelihood,
        q_s9_underspending_impact: s9.q_s9_underspending_impact,
        q_s9_underspending_likelihood: s9.q_s9_underspending_likelihood,
        q_s9_carbon_markets_impact: s9.q_s9_carbon_markets_impact,
        q_s9_carbon_markets_likelihood: s9.q_s9_carbon_markets_likelihood,
        q_s9_pes_impact: s9.q_s9_pes_impact,
        q_s9_pes_likelihood: s9.q_s9_pes_likelihood,
        q_s9_postconflict_impact: s9.q_s9_postconflict_impact,
        q_s9_postconflict_likelihood: s9.q_s9_postconflict_likelihood,
        q_s9_forestry_code_impact: s9.q_s9_forestry_code_impact,
        q_s9_forestry_code_likelihood: s9.q_s9_forestry_code_likelihood,
        q_s9_security_incidents_impact: s9.q_s9_security_incidents_impact,
        q_s9_security_incidents_likelihood: s9.q_s9_security_incidents_likelihood,
        q_s9_political_transition_impact: s9.q_s9_political_transition_impact,
        q_s9_political_transition_likelihood: s9.q_s9_political_transition_likelihood,
        q_s9_fragmented_agency_impact: s9.q_s9_fragmented_agency_impact,
        q_s9_fragmented_agency_likelihood: s9.q_s9_fragmented_agency_likelihood,
        q_s9_investment_loop: s9.q_s9_investment_loop || undefined,
        q_s9_investment_loop_followup: s9.q_s9_investment_loop_followup || undefined,
        q_s9_governance_loop: s9.q_s9_governance_loop || undefined,
        q_s9_governance_loop_followup: s9.q_s9_governance_loop_followup || undefined,

        // Step 10
        q10_1_strategic_options_video_understanding: s10.q10_1_strategic_options_video_understanding,
        q10_2_leverage_points_identification_understanding: s10.q10_2_leverage_points_identification_understanding,
        q10_3_activating_leverage_points_understanding: s10.q10_3_activating_leverage_points_understanding,
        q10_4_leverage_capacity_traps_understanding: s10.q10_4_leverage_capacity_traps_understanding,
        q10_5_leverage_governance_traps_understanding: s10.q10_5_leverage_governance_traps_understanding,
        q10_6_architecting_collaborative_governance_understanding: s10.q10_6_architecting_collaborative_governance_understanding,
        q10_7_archetypes_leverage_points_understanding: s10.q10_7_archetypes_leverage_points_understanding,
        q10_8_strategic_options_ranking: s10.q10_8_strategic_options_ranking || undefined,
        q10_9_ieds_execution_engine_understanding: s10.q10_9_ieds_execution_engine_understanding,
        q10_10_ieds_preference: s10.q10_10_ieds_preference || undefined,
        q10_11_sequence_a_priority: s10.q10_11_sequence_a_priority,
        q10_12_sequence_b_priority: s10.q10_12_sequence_b_priority,
        q10_13_sequence_c_priority: s10.q10_13_sequence_c_priority,
        q10_14_sequencing_logic: s10.q10_14_sequencing_logic || undefined,
        q10_15_risk_mitigation: s10.q10_15_risk_mitigation || undefined,
        q10_16_outcomes_achievable: s10.q10_16_outcomes_achievable,
        q10_matrix: s10.q10_matrix,

        // Step 11
        q11_1_metrics_architecture_understanding: s11.q11_1_metrics_architecture_understanding,
        q11_2_drifting_goals_accuracy: s11.q11_2_drifting_goals_accuracy || undefined,
        q11_3_drifting_goals_followup: s11.q11_3_drifting_goals_followup || undefined,
        q11_4_calibration_appropriate: s11.q11_4_calibration_appropriate || undefined,
        q11_5_governance_kpi_importance: s11.q11_5_governance_kpi_importance,
        q11_6_resilience_kpi_importance: s11.q11_6_resilience_kpi_importance,
        q11_7_inclusivity_kpi_importance: s11.q11_7_inclusivity_kpi_importance,
        q11_8_peace_kpi_importance: s11.q11_8_peace_kpi_importance,
        q11_9_cluster_kpi_sufficient: s11.q11_9_cluster_kpi_sufficient || undefined,
        q11_10_benchmark_priority: s11.q11_10_benchmark_priority || undefined,

        // Step 12
        q12_1_bsc_video_understanding: s12.q12_1_bsc_video_understanding,
        q12_2_bsc_intangibles_understanding: s12.q12_2_bsc_intangibles_understanding,
        q12_3_bsc_economic_outcomes_understanding: s12.q12_3_bsc_economic_outcomes_understanding,
        q12_4_vision_understanding: s12.q12_4_vision_understanding,
        q12_5_learning_growth_alignment: s12.q12_5_learning_growth_alignment,
        q12_6_internal_process_alignment: s12.q12_6_internal_process_alignment,
        q12_7_stakeholder_alignment: s12.q12_7_stakeholder_alignment,
        q12_8_financial_alignment: s12.q12_8_financial_alignment,
        q12_9_strongest_pathway: s12.q12_9_strongest_pathway || undefined,
        q12_10_vision_clarity: s12.q12_10_vision_clarity,
        q12_11_vision_achievable: s12.q12_11_vision_achievable,
        q12_12_mission_alignment: s12.q12_12_mission_alignment,
        q12_13_bsc_useful: s12.q12_13_bsc_useful,
        q12_14_adaptive_frequency: s12.q12_14_adaptive_frequency || undefined,

        // Step 13
        q13_1_capital_deployment_understanding: s13.q13_1_capital_deployment_understanding,
        q13_2_funding_mix_fair: s13.q13_2_funding_mix_fair,
        q13_3_targets_realistic: s13.q13_3_targets_realistic,
        q13_4_high_risk_concern: s13.q13_4_high_risk_concern,
        q13_5_medium_risk_concern: s13.q13_5_medium_risk_concern,
        q13_6_low_risk_concern: s13.q13_6_low_risk_concern,
        q13_7_budget_priority_phase: s13.q13_7_budget_priority_phase || undefined,
        q13_8_budget_priority_cluster: s13.q13_8_budget_priority_cluster || undefined,
        q13_9_blended_finance_opinion: s13.q13_9_blended_finance_opinion || undefined,

        // Step 14
        q14_1_engagement_type: s14.q14_1_engagement_type,
        q14_2_contact_method: s14.q14_2_contact_method || undefined,
        q14_3_timing: s14.q14_3_timing || undefined,
        q14_4_role_contribution: s14.q14_4_role_contribution || undefined,
        q14_5_additional_comments: s14.q14_5_additional_comments || undefined,

        // Step 15
        q15_1_confirm_accurate: s15.q15_1_confirm_accurate,
        q15_2_consent_anonymous_use: s15.q15_2_consent_anonymous_use,
        q15_3_consent_voluntary: s15.q15_3_consent_voluntary,
        q15_4_ready_to_submit: s15.q15_4_ready_to_submit,
        q15_5_overall_assessment: s15.q15_5_overall_assessment,
        q15_6_strongest_aspects: s15.q15_6_strongest_aspects || undefined,
        q15_7_weakest_aspects: s15.q15_7_weakest_aspects || undefined,
        q15_8_recommend: s15.q15_8_recommend || undefined,
        q15_9_modifications: s15.q15_9_modifications || undefined,
        q15_10_final_comments: s15.q15_10_final_comments || undefined,
      };

      await submitSurvey(payload);
      toast.success("Survey submitted successfully! Your input shapes the Emerging Bangsamoro.");
    } catch (err) {
      toast.error("Submission failed. Please try again or contact support.");
      console.error("Survey submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Step Rendering ──
  const renderStep = () => {
    switch (step) {
      case 0: return <Section0_Orientation data={s0} onChange={setS0} />;
      case 1: return <Section1_Privacy data={s1} onChange={setS1} />;
      case 2: return <Section2_Demographics data={s2} onChange={setS2} />;
      case 3: return <Section3_BEIE_SystemsThinking data={s3} onChange={setS3} />;
      case 4: return <Section4_Foundations data={s4} onChange={setS4} />;
      case 5: return <Section5_Transformers data={s5} onChange={setS5} />;
      case 6: return <Section6_Enablers data={s6} onChange={setS6} />;
      case 7: return <Section7_Connectors data={s7} onChange={setS7} />;
      case 8: return <Section8_Financiers data={s8} onChange={setS8} />;
      case 9: return <Section9_OperatingSystems data={s9} onChange={setS9} />;
      case 10: return <Section10_IEDS data={s10} onChange={setS10} />;
      case 11: return <Section11_Metrics data={s11} onChange={setS11} />;
      case 12: return <Section12_BalancedScorecard data={s12} onChange={setS12} />;
      case 13: return <Section13_PriorityActions data={s13} onChange={setS13} />;
      case 14: return <Section14_AccessResources data={s14} onChange={setS14} />;
      case 15: return <Section15_Submission data={s15} onChange={setS15} />;
      default: return null;
    }
  };

  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ecfdf5] via-white to-[#d1fae5] relative">
      <Toaster position="top-right" richColors />

      {/* ── Progress Bar ── */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#C9A84C]/20">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider">BIRD Validation</span>
              <span className="text-xs text-[#64748b]">|</span>
              <span className="text-xs text-[#022c22]">Step {step + 1} of {totalSteps}</span>
            </div>
            <span className="text-xs font-bold text-[#022c22]">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-[#C9A84C]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C9A84C] to-[#1B4D3E] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-1 mt-2 overflow-x-auto pb-1 scrollbar-hide">
            {STEP_LABELS.map((label, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap transition-all ${
                  i === step
                    ? "bg-[#C9A84C] text-white font-bold"
                    : i < step
                      ? "bg-[#1B4D3E]/20 text-[#1B4D3E]"
                      : "bg-[#C9A84C]/10 text-[#64748b]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── BIRD Score Panel (visible on SWOT steps) ─ */}
      {step >= 3 && step <= 9 && Object.keys(birdScores).length > 0 && (
        <div className="max-w-5xl mx-auto px-4 pt-4">
          <div className="rounded-lg border border-[#C9A84C]/20 bg-[#022c22]/5 p-3 flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-wider">Live Scores:</span>
            {Object.entries(birdScores).slice(0, 6).map(([key, val]) => (
              <span
                key={key}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9A84C]/10 text-[#022c22] font-semibold border border-[#C9A84C]/20"
              >
                {key.replace(/_/g, " ")}: {val.toFixed(2)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {renderStep()}
      </main>

      {/* ─ Navigation Footer ── */}
      <div className="sticky bottom-0 z-50 bg-white/90 backdrop-blur-md border-t border-[#C9A84C]/20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={step === 0}
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#C9A84C]/30 text-[#022c22] hover:bg-[#C9A84C]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            ← Previous
          </button>
          <span className="text-xs text-[#64748b] hidden sm:block">{STEP_LABELS[step]}</span>
          {step === totalSteps - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-[#C9A84C] to-[#1B4D3E] hover:opacity-90 disabled:opacity-50 transition-all shadow-lg flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Submitting...
                </>
              ) : (
                "Submit Survey ✓"
              )}
            </button>
          ) : (
            <button
              onClick={goNext}
              className="px-6 py-2 rounded-lg text-sm font-bold text-white bg-[#1B4D3E] hover:bg-[#022c22] transition-all shadow-lg flex items-center gap-2"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyWizard;
