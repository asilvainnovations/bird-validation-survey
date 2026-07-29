import React, { useState, useCallback, useEffect, useRef } from "react";
import { submitSurvey } from "@/lib/api";
import { surveySchema, type SurveySchemaType } from "@/lib/survey-schema";
import { Toaster, toast } from "sonner";
import { BarChart3 } from "lucide-react";

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

const LOCALSTORAGE_KEY = "bird-survey-draft-v1";

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN WIZARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const SurveyWizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [birdScores, setBirdScores] = useState<Record<string, number>>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

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
    consent_participate: false,
    consent_anonymize: false,
    consent_email_copy: false,
    consent_voluntary: false,
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
    q2_network_accuracy: "",
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
    // Strengths
    q4_s1_aff_base_impact: undefined,
    q4_s1_aff_base_likelihood: undefined,
    q4_s2_renewable_energy_impact: undefined,
    q4_s2_renewable_energy_likelihood: undefined,
    q4_s3_lake_lanao_impact: undefined,
    q4_s3_lake_lanao_likelihood: undefined,
    q4_s4_seaweed_dominance_impact: undefined,
    q4_s4_seaweed_dominance_likelihood: undefined,
    // Weaknesses
    q4_w1_land_tenure_impact: undefined,
    q4_w1_land_tenure_likelihood: undefined,
    // Opportunities
    q4_o1_renewable_invest_impact: undefined,
    q4_o1_renewable_invest_likelihood: undefined,
    q4_o2_carbon_markets_impact: undefined,
    q4_o2_carbon_markets_likelihood: undefined,
    q4_o3_pes_impact: undefined,
    q4_o3_pes_likelihood: undefined,
    q4_o4_forestry_code_impact: undefined,
    q4_o4_forestry_code_likelihood: undefined,
    // Threats
    q4_t1_pestalotiopsis_impact: undefined,
    q4_t1_pestalotiopsis_likelihood: undefined,
  });

  // ── Section 5: Cluster 2 — Transformers ──
  const [s5, setS5] = useState<Section5Data>({
    q5_1_transformers_banner_understanding: undefined,
    q5_2_halal_advantage_understanding: undefined,
    q5_3_farm_to_market_understanding: undefined,
    q5_4_economic_zones_understanding: undefined,
    q5_5_growth_underinvestment_accuracy: "",
    q5_6_growth_underinvestment_followup: "",
    // Strengths
    q5_s1_halal_legitimacy_impact: undefined,
    q5_s1_halal_legitimacy_likelihood: undefined,
    q5_s2_domestic_demand_impact: undefined,
    q5_s2_domestic_demand_likelihood: undefined,
    q5_s3_polloc_freeport_impact: undefined,
    q5_s3_polloc_freeport_likelihood: undefined,
    q5_s4_cultural_heritage_impact: undefined,
    q5_s4_cultural_heritage_likelihood: undefined,
    // Weaknesses
    q5_w1_halal_cert_impact: undefined,
    q5_w1_halal_cert_likelihood: undefined,
    q5_w2_cold_chain_impact: undefined,
    q5_w2_cold_chain_likelihood: undefined,
    q5_w3_market_linkages_impact: undefined,
    q5_w3_market_linkages_likelihood: undefined,
    // Threats
    q5_t1_standards_recognition_impact: undefined,
    q5_t1_standards_recognition_likelihood: undefined,
  });

  // ── Section 6: Cluster 3 — Enablers ──
  const [s6, setS6] = useState<Section6Data>({
    q6_1_halal_sector_rank: "",
    q6_2_sequencing_effectiveness: undefined,
    q6_3_begmp_confidence: undefined,
    q6_4_tourism_confidence: undefined,
    q6_5_digital_tourism_rank: [],
    q6_6_moral_governance_realistic: "",
    q6_s1_youth_pop_impact: undefined,
    q6_s1_youth_pop_likelihood: undefined,
    q6_s2_lanao_growth_impact: undefined,
    q6_s2_lanao_growth_likelihood: undefined,
    q6_w1_infra_deficits_impact: undefined,
    q6_w1_infra_deficits_likelihood: undefined,
    q6_w2_poverty_impact: undefined,
    q6_w2_poverty_likelihood: undefined,
    q6_w3_literacy_impact: undefined,
    q6_w3_literacy_likelihood: undefined,
    q6_w4_malnutrition_impact: undefined,
    q6_w4_malnutrition_likelihood: undefined,
    q6_w5_skills_mismatch_impact: undefined,
    q6_w5_skills_mismatch_likelihood: undefined,
    q6_w6_tech_adoption_impact: undefined,
    q6_w6_tech_adoption_likelihood: undefined,
    q6_w7_underspending_impact: undefined,
    q6_w7_underspending_likelihood: undefined,
    q6_o1_tourism_recovery_impact: undefined,
    q6_o1_tourism_recovery_likelihood: undefined,
    q6_o2_digital_leapfrog_impact: undefined,
    q6_o2_digital_leapfrog_likelihood: undefined,
    q6_t1_cyber_insecurity_impact: undefined,
    q6_t1_cyber_insecurity_likelihood: undefined,
    q6_arch_limits_growth_accuracy: "",
    q6_arch_limits_growth_followup: "",
  });

  // ── Section 7: Cluster 4 — Connectors ──
  const [s7, setS7] = useState<Section7Data>({
    q7_1_connectivity_priority: "",
    q7_2_integration_challenge: "",
    q7_3_priority_node: "",
    q7_4_trapped_value_province: "",
    q7_5_bridge_impact: "",
    q7_6_gateway_province: "",
    q7_7_priority_vector: "",
    q7_8_uae_feasibility: undefined,
    q7_9_bimpeaga_leverage: undefined,
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
    q8_1_finance_tier_priority: "",
    q8_2_roadmap_achievable: undefined,
    q8_3_priority_action: "",
    q8_4_islamic_authority: "",
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
    q9_1_moral_governance_derisk: undefined,
    q9_2_critical_loop: "",
    q9_3_regulatory_priority: "",
    q9_4_revenue_channel: "",
    q9_5_stakeholder_alignment: "",
    q9_6_reform_priority: "",
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
    q10_1_ieds_preference: "",
    q10_2_sequence_a_priority: undefined,
    q10_3_sequence_b_priority: undefined,
    q10_4_sequence_c_priority: undefined,
    q10_5_sequencing_logic: "",
    q10_6_risk_mitigation: "",
    q10_7_outcomes_achievable: undefined,
    q10_matrix: {
      heds: { economic_impact: 5, feasibility: 5, identity_alignment: 5, systems_leverage: 5, risk_return: 5, inclusivity: 5, sustainability: 5 },
      gems: { economic_impact: 5, feasibility: 5, identity_alignment: 5, systems_leverage: 5, risk_return: 5, inclusivity: 5, sustainability: 5 },
      ifes: { economic_impact: 5, feasibility: 5, identity_alignment: 5, systems_leverage: 5, risk_return: 5, inclusivity: 5, sustainability: 5 },
      ieds: { economic_impact: 5, feasibility: 5, identity_alignment: 5, systems_leverage: 5, risk_return: 5, inclusivity: 5, sustainability: 5 },
    },
    q10_leverage_points_clarity: undefined,
    q10_activating_leverage: undefined,
    q10_capacity_traps: undefined,
    q10_iceberg_model: undefined,
    q10_collaborative_governance: undefined,
    q10_strategic_ranking: "",
  });

  // ── Section 11: Metrics Architecture & KPIs ──
  const [s11, setS11] = useState<Section11Data>({
    q11_1_calibration_appropriate: "",
    q11_2_governance_kpi_importance: undefined,
    q11_3_resilience_kpi_importance: undefined,
    q11_4_inclusivity_kpi_importance: undefined,
    q11_5_peace_kpi_importance: undefined,
    q11_6_cluster_kpi_sufficient: "",
    q11_7_benchmark_priority: "",
    q_s11_drifting_goals: "",
    q_s11_drifting_goals_followup: "",
  });

  // ── Section 12: Balanced Scorecard ──
  const [s12, setS12] = useState<Section12Data>({
    q12_1_learning_growth_alignment: undefined,
    q12_2_internal_process_alignment: undefined,
    q12_3_stakeholder_alignment: undefined,
    q12_4_financial_alignment: undefined,
    q12_5_strongest_pathway: "",
    q12_6_vision_clarity: undefined,
    q12_7_vision_achievable: undefined,
    q12_8_mission_alignment: undefined,
    q12_9_bsc_useful: undefined,
    q12_10_adaptive_frequency: "",
  });

  // ── Section 13: Priority Actions & Budget ──
  const [s13, setS13] = useState<Section13Data>({
    q13_1_funding_mix_fair: undefined,
    q13_2_targets_realistic: undefined,
    q13_3_high_risk_concern: undefined,
    q13_4_medium_risk_concern: undefined,
    q13_5_low_risk_concern: undefined,
    q13_6_budget_priority_phase: "",
    q13_7_budget_priority_cluster: "",
    q13_8_blended_finance_opinion: "",
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
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // LOCALSTORAGE PERSISTENCE (LOAD)
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCALSTORAGE_KEY);
      if (saved) {
        const draft = JSON.parse(saved);
        if (draft.step !== undefined) setStep(draft.step);
        if (draft.s0) setS0(draft.s0);
        if (draft.s1) setS1(draft.s1);
        if (draft.s2) setS2(draft.s2);
        if (draft.s3) setS3(draft.s3);
        if (draft.s4) setS4(draft.s4);
        if (draft.s5) setS5(draft.s5);
        if (draft.s6) setS6(draft.s6);
        if (draft.s7) setS7(draft.s7);
        if (draft.s8) setS8(draft.s8);
        if (draft.s9) setS9(draft.s9);
        if (draft.s10) setS10(draft.s10);
        if (draft.s11) setS11(draft.s11);
        if (draft.s12) setS12(draft.s12);
        if (draft.s13) setS13(draft.s13);
        if (draft.s14) setS14(draft.s14);
        if (draft.s15) setS15(draft.s15);
        if (draft.birdScores) setBirdScores(draft.birdScores);
        toast.info("Previous draft restored. Continue where you left off.");
      }
    } catch {
      // ignore corrupt localStorage
    }
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // LOCALSTORAGE PERSISTENCE (SAVE)
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    const draft = { step, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, birdScores };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(draft));
    setHasUnsavedChanges(true);
  }, [step, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, birdScores]);

  // ═══════════════════════════════════════════════════════════════════════════
  // BEFOREUNLOAD GUARD
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && step < STEP_LABELS.length - 1) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasUnsavedChanges, step]);

  // ═══════════════════════════════════════════════════════════════════════════
  // SCROLL TO TOP ON STEP CHANGE
  // ═══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // ── BIRD Score Computation (real-time) ──
  const computeBIRDScores = useCallback(() => {
    const scores: Record<string, number> = {};

    // Section 3: Strengths
    if (s3.q_s1_halal_legitimacy_impact && s3.q_s1_halal_legitimacy_likelihood) scores.s1_halal_ri = calculateStrengthRI(s3.q_s1_halal_legitimacy_impact, s3.q_s1_halal_legitimacy_likelihood);
    if (s3.q_s1_bimpeaga_impact && s3.q_s1_bimpeaga_likelihood) scores.s1_bimpeaga_ri = calculateStrengthRI(s3.q_s1_bimpeaga_impact, s3.q_s1_bimpeaga_likelihood);
    if (s3.q_s1_aff_base_impact && s3.q_s1_aff_base_likelihood) scores.s1_aff_ri = calculateStrengthRI(s3.q_s1_aff_base_impact, s3.q_s1_aff_base_likelihood);

    // Section 4: Foundations (S, W, O, T)
    if (s4.q4_s1_aff_base_impact && s4.q4_s1_aff_base_likelihood) scores.s4_aff_ri = calculateStrengthRI(s4.q4_s1_aff_base_impact, s4.q4_s1_aff_base_likelihood);
    if (s4.q4_s2_renewable_energy_impact && s4.q4_s2_renewable_energy_likelihood) scores.s4_renewable_ri = calculateStrengthRI(s4.q4_s2_renewable_energy_impact, s4.q4_s2_renewable_energy_likelihood);
    if (s4.q4_w1_land_tenure_impact && s4.q4_w1_land_tenure_likelihood) scores.s4_land_tenure_risk = calculateWeaknessRisk(s4.q4_w1_land_tenure_impact, s4.q4_w1_land_tenure_likelihood);
    if (s4.q4_o2_carbon_markets_impact && s4.q4_o2_carbon_markets_likelihood) scores.s4_carbon_ri = calculateOpportunityRI(s4.q4_o2_carbon_markets_impact, s4.q4_o2_carbon_markets_likelihood);
    if (s4.q4_t1_pestalotiopsis_impact && s4.q4_t1_pestalotiopsis_likelihood) scores.s4_pestalotiopsis_vi = calculateThreatVI(s4.q4_t1_pestalotiopsis_impact, s4.q4_t1_pestalotiopsis_likelihood);

    // Section 5: Transformers (S, W, T)
    if (s5.q5_s1_halal_legitimacy_impact && s5.q5_s1_halal_legitimacy_likelihood) scores.s5_halal_legitimacy_ri = calculateStrengthRI(s5.q5_s1_halal_legitimacy_impact, s5.q5_s1_halal_legitimacy_likelihood);
    if (s5.q5_w1_halal_cert_impact && s5.q5_w1_halal_cert_likelihood) scores.s5_halal_cert_risk = calculateWeaknessRisk(s5.q5_w1_halal_cert_impact, s5.q5_w1_halal_cert_likelihood);
    if (s5.q5_w2_cold_chain_impact && s5.q5_w2_cold_chain_likelihood) scores.s5_cold_chain_risk = calculateWeaknessRisk(s5.q5_w2_cold_chain_impact, s5.q5_w2_cold_chain_likelihood);
    if (s5.q5_t1_standards_recognition_impact && s5.q5_t1_standards_recognition_likelihood) scores.s5_standards_vi = calculateThreatVI(s5.q5_t1_standards_recognition_impact, s5.q5_t1_standards_recognition_likelihood);

    // Section 6: Enablers (S, W, O, T)
    if (s6.q6_s1_youth_pop_impact && s6.q6_s1_youth_pop_likelihood) scores.s6_youth_ri = calculateStrengthRI(s6.q6_s1_youth_pop_impact, s6.q6_s1_youth_pop_likelihood);
    if (s6.q6_s2_lanao_growth_impact && s6.q6_s2_lanao_growth_likelihood) scores.s6_lanao_ri = calculateStrengthRI(s6.q6_s2_lanao_growth_impact, s6.q6_s2_lanao_growth_likelihood);
    if (s6.q6_w1_infra_deficits_impact && s6.q6_w1_infra_deficits_likelihood) scores.s6_infra_risk = calculateWeaknessRisk(s6.q6_w1_infra_deficits_impact, s6.q6_w1_infra_deficits_likelihood);
    if (s6.q6_w3_literacy_impact && s6.q6_w3_literacy_likelihood) scores.s6_literacy_risk = calculateWeaknessRisk(s6.q6_w3_literacy_impact, s6.q6_w3_literacy_likelihood);
    if (s6.q6_o2_digital_leapfrog_impact && s6.q6_o2_digital_leapfrog_likelihood) scores.s6_digital_ri = calculateOpportunityRI(s6.q6_o2_digital_leapfrog_impact, s6.q6_o2_digital_leapfrog_likelihood);
    if (s6.q6_t1_cyber_insecurity_impact && s6.q6_t1_cyber_insecurity_likelihood) scores.s6_cyber_vi = calculateThreatVI(s6.q6_t1_cyber_insecurity_impact, s6.q6_t1_cyber_insecurity_likelihood);

    // Section 7: Connectors (S, W, O, T)
    if (s7.q_s7_bimpeaga_loc_impact && s7.q_s7_bimpeaga_loc_likelihood) scores.s7_bimpeaga_ri = calculateStrengthRI(s7.q_s7_bimpeaga_loc_impact, s7.q_s7_bimpeaga_loc_likelihood);
    if (s7.q_s7_domestic_halal_impact && s7.q_s7_domestic_halal_likelihood) scores.s7_domestic_ri = calculateStrengthRI(s7.q_s7_domestic_halal_impact, s7.q_s7_domestic_halal_likelihood);
    if (s7.q_s7_infra_deficits_impact && s7.q_s7_infra_deficits_likelihood) scores.s7_infra_risk = calculateWeaknessRisk(s7.q_s7_infra_deficits_impact, s7.q_s7_infra_deficits_likelihood);
    if (s7.q_s7_market_linkages_impact && s7.q_s7_market_linkages_likelihood) scores.s7_linkages_risk = calculateWeaknessRisk(s7.q_s7_market_linkages_impact, s7.q_s7_market_linkages_likelihood);
    if (s7.q_s7_asean_halal_impact && s7.q_s7_asean_halal_likelihood) scores.s7_asean_ri = calculateOpportunityRI(s7.q_s7_asean_halal_impact, s7.q_s7_asean_halal_likelihood);
    if (s7.q_s7_uae_corridor_impact && s7.q_s7_uae_corridor_likelihood) scores.s7_uae_ri = calculateOpportunityRI(s7.q_s7_uae_corridor_impact, s7.q_s7_uae_corridor_likelihood);
    if (s7.q_s7_halal_competition_impact && s7.q_s7_halal_competition_likelihood) scores.s7_competition_vi = calculateThreatVI(s7.q_s7_halal_competition_impact, s7.q_s7_halal_competition_likelihood);

    // Section 8: Financiers (S, W, O, T)
    if (s8.q_s8_islamic_finance_fw_impact && s8.q_s8_islamic_finance_fw_likelihood) scores.s8_islamic_ri = calculateStrengthRI(s8.q_s8_islamic_finance_fw_impact, s8.q_s8_islamic_finance_fw_likelihood);
    if (s8.q_s8_peace_dividend_impact && s8.q_s8_peace_dividend_likelihood) scores.s8_peace_ri = calculateStrengthRI(s8.q_s8_peace_dividend_impact, s8.q_s8_peace_dividend_likelihood);
    if (s8.q_s8_financial_penetration_impact && s8.q_s8_financial_penetration_likelihood) scores.s8_penetration_risk = calculateWeaknessRisk(s8.q_s8_financial_penetration_impact, s8.q_s8_financial_penetration_likelihood);
    if (s8.q_s8_literacy_impact && s8.q_s8_literacy_likelihood) scores.s8_literacy_risk = calculateWeaknessRisk(s8.q_s8_literacy_impact, s8.q_s8_literacy_likelihood);
    if (s8.q_s8_islamic_ecosystem_impact && s8.q_s8_islamic_ecosystem_likelihood) scores.s8_ecosystem_ri = calculateOpportunityRI(s8.q_s8_islamic_ecosystem_impact, s8.q_s8_islamic_ecosystem_likelihood);
    if (s8.q_s8_uae_corridor_impact && s8.q_s8_uae_corridor_likelihood) scores.s8_uae_ri = calculateOpportunityRI(s8.q_s8_uae_corridor_impact, s8.q_s8_uae_corridor_likelihood);
    if (s8.q_s8_halal_standards_impact && s8.q_s8_halal_standards_likelihood) scores.s8_standards_vi = calculateThreatVI(s8.q_s8_halal_standards_impact, s8.q_s8_halal_standards_likelihood);

    // Section 9: Operating Systems (S, W, O, T)
    if (s9.q_s9_policy_recognition_impact && s9.q_s9_policy_recognition_likelihood) scores.s9_policy_ri = calculateStrengthRI(s9.q_s9_policy_recognition_impact, s9.q_s9_policy_recognition_likelihood);
    if (s9.q_s9_peace_dividend_impact && s9.q_s9_peace_dividend_likelihood) scores.s9_peace_ri = calculateStrengthRI(s9.q_s9_peace_dividend_impact, s9.q_s9_peace_dividend_likelihood);
    if (s9.q_s9_literacy_impact && s9.q_s9_literacy_likelihood) scores.s9_literacy_risk = calculateWeaknessRisk(s9.q_s9_literacy_impact, s9.q_s9_literacy_likelihood);
    if (s9.q_s9_underspending_impact && s9.q_s9_underspending_likelihood) scores.s9_underspend_risk = calculateWeaknessRisk(s9.q_s9_underspending_impact, s9.q_s9_underspending_likelihood);
    if (s9.q_s9_carbon_markets_impact && s9.q_s9_carbon_markets_likelihood) scores.s9_carbon_ri = calculateOpportunityRI(s9.q_s9_carbon_markets_impact, s9.q_s9_carbon_markets_likelihood);
    if (s9.q_s9_postconflict_impact && s9.q_s9_postconflict_likelihood) scores.s9_recon_ri = calculateOpportunityRI(s9.q_s9_postconflict_impact, s9.q_s9_postconflict_likelihood);
    if (s9.q_s9_security_incidents_impact && s9.q_s9_security_incidents_likelihood) scores.s9_security_vi = calculateThreatVI(s9.q_s9_security_incidents_impact, s9.q_s9_security_incidents_likelihood);
    if (s9.q_s9_political_transition_impact && s9.q_s9_political_transition_likelihood) scores.s9_political_vi = calculateThreatVI(s9.q_s9_political_transition_impact, s9.q_s9_political_transition_likelihood);

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

  const totalSteps = STEP_LABELS.length;

  // ── Submission ──
  const handleSubmit = async () => {
    if (!s15.q15_4_ready_to_submit) {
      toast.error("Please confirm you are ready to submit.");
      return;
    }
    if (s1.consent_participate !== true) {
      toast.error("You must consent to participate in Section 1 before submitting.");
      setStep(1);
      return;
    }

    setSubmitting(true);
    try {
      // Typed as Record<string, unknown> rather than Partial<SurveySchemaType>:
      // the SWOT/archetype fields in SurveySchemaType are generated from
      // swot-content.ts via a Record-returning helper, which TypeScript can't
      // statically narrow to literal keys. SurveySchemaType remains the
      // authoritative reference for field names (see swot-content.ts); this
      // object is still built to match it field-for-field.
      const payload: Record<string, unknown> = {
        q0_1_ready: s0.q0_1_ready || undefined,
        q0_2_ecosystem_understanding: s0.q0_2_ecosystem_understanding || undefined,
        q0_3_systems_thinking_value: s0.q0_3_systems_thinking_value,
        q0_4_cld_understanding: s0.q0_4_cld_understanding,
        q0_5_feedback_loops_understanding: s0.q0_5_feedback_loops_understanding,
        q0_6_leverage_points_understanding: s0.q0_6_leverage_points_understanding,

        q01_consent_participate: s1.consent_participate,
        q01_consent_anonymize: s1.consent_anonymize,
        q01_consent_email_copy: s1.consent_email_copy,
        q01_consent_voluntary: s1.consent_voluntary,

        q02_demo_name: s2.demo_name || undefined,
        q02_demo_email: s2.demo_email || undefined,
        q02_demo_organization: s2.demo_organization || undefined,
        q02_demo_position: s2.demo_position || undefined,
        q02_demo_province: s2.demo_province || undefined,
        q02_demo_category: s2.demo_category || undefined,
        q02_demo_expertise: s2.demo_expertise,
        // survey-submit's edge function reads demo_province/demo_category
        // with a `|| payload.q02_demo_province` fallback, so the q02_-
        // prefixed fields above are sufficient — no unprefixed duplicates needed.
        q02_network_accuracy: s2.q2_network_accuracy || undefined,

        // NOTE: field keys renamed to the q03_ / q3_cld{n}_ canonical
        // prefixes (see src/lib/swot-content.ts). Section3Data itself (in
        // Section3_BEIE_SystemsThinking.tsx) still exposes the old q3_1_.../
        // q_s1_... names below — that component still needs to be updated to
        // match this canonical mapping; tracked as follow-up work.
        q03_beie_video_understanding: s3.q3_1_beie_video_understanding,
        q03_systems_reframing_accuracy: s3.q3_2_systems_reframing_accuracy,
        q03_sector_to_ecosystem_shift: s3.q3_3_sector_to_ecosystem_shift,
        q03_beie_framework_clarity: s3.q3_4_beie_framework_clarity,
        q03_operating_systems_understanding: s3.q3_5_operating_systems_understanding,
        q03_five_clusters_understanding: s3.q3_6_five_clusters_understanding,
        // The two Causal Loop Diagram validation questions that DO belong to
        // Section 3 (see ARCHETYPES_BY_SECTION[3] in swot-content.ts). Wired
        // through the existing q3_7/q3_8 state fields until Section3's own
        // component is updated to the q3_cld1_/q3_cld2_ field names directly.
        q3_cld1_investment_development_accuracy: s3.q3_7_investment_development_loop || undefined,
        q3_cld2_governance_confidence_accuracy: s3.q3_8_governance_investor_loop || undefined,

        q4_1_foundations_banner_understanding: s4.q4_1_foundations_banner_understanding,
        q4_2_tragedy_commons_accuracy: s4.q4_2_tragedy_commons_accuracy || undefined,
        q4_3_tragedy_followup: s4.q4_3_tragedy_followup || undefined,
        q4_s1_aff_base_impact: s4.q4_s1_aff_base_impact,
        q4_s1_aff_base_likelihood: s4.q4_s1_aff_base_likelihood,
        q4_s2_renewable_energy_impact: s4.q4_s2_renewable_energy_impact,
        q4_s2_renewable_energy_likelihood: s4.q4_s2_renewable_energy_likelihood,
        q4_s3_lake_lanao_impact: s4.q4_s3_lake_lanao_impact,
        q4_s3_lake_lanao_likelihood: s4.q4_s3_lake_lanao_likelihood,
        q4_s4_seaweed_dominance_impact: s4.q4_s4_seaweed_dominance_impact,
        q4_s4_seaweed_dominance_likelihood: s4.q4_s4_seaweed_dominance_likelihood,
        q4_w1_land_tenure_impact: s4.q4_w1_land_tenure_impact,
        q4_w1_land_tenure_likelihood: s4.q4_w1_land_tenure_likelihood,
        q4_o1_renewable_invest_impact: s4.q4_o1_renewable_invest_impact,
        q4_o1_renewable_invest_likelihood: s4.q4_o1_renewable_invest_likelihood,
        q4_o2_carbon_markets_impact: s4.q4_o2_carbon_markets_impact,
        q4_o2_carbon_markets_likelihood: s4.q4_o2_carbon_markets_likelihood,
        q4_o3_pes_impact: s4.q4_o3_pes_impact,
        q4_o3_pes_likelihood: s4.q4_o3_pes_likelihood,
        q4_o4_forestry_code_impact: s4.q4_o4_forestry_code_impact,
        q4_o4_forestry_code_likelihood: s4.q4_o4_forestry_code_likelihood,
        q4_t1_pestalotiopsis_impact: s4.q4_t1_pestalotiopsis_impact,
        q4_t1_pestalotiopsis_likelihood: s4.q4_t1_pestalotiopsis_likelihood,

        // NOTE: field keys remapped to the canonical q05_ / q5_arch_growth_underinvest_
        // prefixes (see src/lib/swot-content.ts + survey-schema.ts). Section5Data itself
        // (in Section5_Transformers.tsx) still exposes the old q5_1_.../q5_5_/q5_6_ names
        // below — that component still needs updating to match this canonical mapping
        // directly; tracked as follow-up work (same pattern already applied to Section 3/4).
        q05_transformers_banner_understanding: s5.q5_1_transformers_banner_understanding,
        q05_halal_advantage_understanding: s5.q5_2_halal_advantage_understanding,
        q05_farm_to_market_understanding: s5.q5_3_farm_to_market_understanding,
        q05_economic_zones_understanding: s5.q5_4_economic_zones_understanding,
        q5_arch_growth_underinvest_accuracy: s5.q5_5_growth_underinvestment_accuracy || undefined,
        q5_arch_growth_underinvest_followup: s5.q5_6_growth_underinvestment_followup || undefined,
        q5_s1_halal_legitimacy_impact: s5.q5_s1_halal_legitimacy_impact,
        q5_s1_halal_legitimacy_likelihood: s5.q5_s1_halal_legitimacy_likelihood,
        q5_s2_domestic_demand_impact: s5.q5_s2_domestic_demand_impact,
        q5_s2_domestic_demand_likelihood: s5.q5_s2_domestic_demand_likelihood,
        q5_s3_polloc_freeport_impact: s5.q5_s3_polloc_freeport_impact,
        q5_s3_polloc_freeport_likelihood: s5.q5_s3_polloc_freeport_likelihood,
        q5_s4_cultural_heritage_impact: s5.q5_s4_cultural_heritage_impact,
        q5_s4_cultural_heritage_likelihood: s5.q5_s4_cultural_heritage_likelihood,
        q5_w1_halal_cert_impact: s5.q5_w1_halal_cert_impact,
        q5_w1_halal_cert_likelihood: s5.q5_w1_halal_cert_likelihood,
        q5_w2_cold_chain_impact: s5.q5_w2_cold_chain_impact,
        q5_w2_cold_chain_likelihood: s5.q5_w2_cold_chain_likelihood,
        q5_w3_market_linkages_impact: s5.q5_w3_market_linkages_impact,
        q5_w3_market_linkages_likelihood: s5.q5_w3_market_linkages_likelihood,
        q5_t1_standards_recognition_impact: s5.q5_t1_standards_recognition_impact,
        q5_t1_standards_recognition_likelihood: s5.q5_t1_standards_recognition_likelihood,

        q06_halal_sector_rank: s6.q6_1_halal_sector_rank || undefined,
        q06_infra_sequencing_effectiveness: s6.q6_2_sequencing_effectiveness,
        q06_begmp_confidence: s6.q6_3_begmp_confidence,
        q06_tourism_confidence: s6.q6_4_tourism_confidence,
        q06_digital_tourism_rank: s6.q6_5_digital_tourism_rank,
        q06_moral_governance_realistic: s6.q6_6_moral_governance_realistic || undefined,
        q6_s1_youth_pop_impact: s6.q6_s1_youth_pop_impact,
        q6_s1_youth_pop_likelihood: s6.q6_s1_youth_pop_likelihood,
        q6_s2_lanao_growth_impact: s6.q6_s2_lanao_growth_impact,
        q6_s2_lanao_growth_likelihood: s6.q6_s2_lanao_growth_likelihood,
        q6_w1_infra_deficits_impact: s6.q6_w1_infra_deficits_impact,
        q6_w1_infra_deficits_likelihood: s6.q6_w1_infra_deficits_likelihood,
        q6_w2_poverty_impact: s6.q6_w2_poverty_impact,
        q6_w2_poverty_likelihood: s6.q6_w2_poverty_likelihood,
        q6_w3_literacy_impact: s6.q6_w3_literacy_impact,
        q6_w3_literacy_likelihood: s6.q6_w3_literacy_likelihood,
        q6_w4_malnutrition_impact: s6.q6_w4_malnutrition_impact,
        q6_w4_malnutrition_likelihood: s6.q6_w4_malnutrition_likelihood,
        q6_w5_skills_mismatch_impact: s6.q6_w5_skills_mismatch_impact,
        q6_w5_skills_mismatch_likelihood: s6.q6_w5_skills_mismatch_likelihood,
        q6_w6_tech_adoption_impact: s6.q6_w6_tech_adoption_impact,
        q6_w6_tech_adoption_likelihood: s6.q6_w6_tech_adoption_likelihood,
        q6_w7_underspending_impact: s6.q6_w7_underspending_impact,
        q6_w7_underspending_likelihood: s6.q6_w7_underspending_likelihood,
        q6_o1_tourism_recovery_impact: s6.q6_o1_tourism_recovery_impact,
        q6_o1_tourism_recovery_likelihood: s6.q6_o1_tourism_recovery_likelihood,
        q6_o2_digital_leapfrog_impact: s6.q6_o2_digital_leapfrog_impact,
        q6_o2_digital_leapfrog_likelihood: s6.q6_o2_digital_leapfrog_likelihood,
        q6_t1_cyber_insecurity_impact: s6.q6_t1_cyber_insecurity_impact,
        q6_t1_cyber_insecurity_likelihood: s6.q6_t1_cyber_insecurity_likelihood,
        q6_arch_limits_growth_accuracy: s6.q6_arch_limits_growth_accuracy || undefined,
        q6_arch_limits_growth_followup: s6.q6_arch_limits_growth_followup || undefined,

        q7_1_connectivity_priority: s7.q7_1_connectivity_priority || undefined,
        q7_2_integration_challenge: s7.q7_2_integration_challenge || undefined,
        q7_3_priority_node: s7.q7_3_priority_node || undefined,
        q7_4_trapped_value_province: s7.q7_4_trapped_value_province || undefined,
        q7_5_bridge_impact: s7.q7_5_bridge_impact || undefined,
        q7_6_gateway_province: s7.q7_6_gateway_province || undefined,
        q7_7_priority_vector: s7.q7_7_priority_vector || undefined,
        q7_8_uae_feasibility: s7.q7_8_uae_feasibility,
        q7_9_bimpeaga_leverage: s7.q7_9_bimpeaga_leverage,
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

        q8_1_finance_tier_priority: s8.q8_1_finance_tier_priority || undefined,
        q8_2_roadmap_achievable: s8.q8_2_roadmap_achievable,
        q8_3_priority_action: s8.q8_3_priority_action || undefined,
        q8_4_islamic_authority: s8.q8_4_islamic_authority || undefined,
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

        q9_1_moral_governance_derisk: s9.q9_1_moral_governance_derisk,
        q9_2_critical_loop: s9.q9_2_critical_loop || undefined,
        q9_3_regulatory_priority: s9.q9_3_regulatory_priority || undefined,
        q9_4_revenue_channel: s9.q9_4_revenue_channel || undefined,
        q9_5_stakeholder_alignment: s9.q9_5_stakeholder_alignment || undefined,
        q9_6_reform_priority: s9.q9_6_reform_priority || undefined,
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

        q10_1_ieds_preference: s10.q10_1_ieds_preference || undefined,
        q10_2_sequence_a_priority: s10.q10_2_sequence_a_priority,
        q10_3_sequence_b_priority: s10.q10_3_sequence_b_priority,
        q10_4_sequence_c_priority: s10.q10_4_sequence_c_priority,
        q10_5_sequencing_logic: s10.q10_5_sequencing_logic || undefined,
        q10_6_risk_mitigation: s10.q10_6_risk_mitigation || undefined,
        q10_7_outcomes_achievable: s10.q10_7_outcomes_achievable,
        q10_matrix: s10.q10_matrix,
        q10_leverage_points_clarity: s10.q10_leverage_points_clarity,
        q10_activating_leverage: s10.q10_activating_leverage,
        q10_capacity_traps: s10.q10_capacity_traps,
        q10_iceberg_model: s10.q10_iceberg_model,
        q10_collaborative_governance: s10.q10_collaborative_governance,
        q10_strategic_ranking: s10.q10_strategic_ranking || undefined,

        q11_1_calibration_appropriate: s11.q11_1_calibration_appropriate || undefined,
        q11_2_governance_kpi_importance: s11.q11_2_governance_kpi_importance,
        q11_3_resilience_kpi_importance: s11.q11_3_resilience_kpi_importance,
        q11_4_inclusivity_kpi_importance: s11.q11_4_inclusivity_kpi_importance,
        q11_5_peace_kpi_importance: s11.q11_5_peace_kpi_importance,
        q11_6_cluster_kpi_sufficient: s11.q11_6_cluster_kpi_sufficient || undefined,
        q11_7_benchmark_priority: s11.q11_7_benchmark_priority || undefined,
        q_s11_drifting_goals: s11.q_s11_drifting_goals || undefined,
        q_s11_drifting_goals_followup: s11.q_s11_drifting_goals_followup || undefined,

        q12_1_learning_growth_alignment: s12.q12_1_learning_growth_alignment,
        q12_2_internal_process_alignment: s12.q12_2_internal_process_alignment,
        q12_3_stakeholder_alignment: s12.q12_3_stakeholder_alignment,
        q12_4_financial_alignment: s12.q12_4_financial_alignment,
        q12_5_strongest_pathway: s12.q12_5_strongest_pathway || undefined,
        q12_6_vision_clarity: s12.q12_6_vision_clarity,
        q12_7_vision_achievable: s12.q12_7_vision_achievable,
        q12_8_mission_alignment: s12.q12_8_mission_alignment,
        q12_9_bsc_useful: s12.q12_9_bsc_useful,
        q12_10_adaptive_frequency: s12.q12_10_adaptive_frequency || undefined,

        q13_1_funding_mix_fair: s13.q13_1_funding_mix_fair,
        q13_2_targets_realistic: s13.q13_2_targets_realistic,
        q13_3_high_risk_concern: s13.q13_3_high_risk_concern,
        q13_4_medium_risk_concern: s13.q13_4_medium_risk_concern,
        q13_5_low_risk_concern: s13.q13_5_low_risk_concern,
        q13_6_budget_priority_phase: s13.q13_6_budget_priority_phase || undefined,
        q13_7_budget_priority_cluster: s13.q13_7_budget_priority_cluster || undefined,
        q13_8_blended_finance_opinion: s13.q13_8_blended_finance_opinion || undefined,

        q14_1_engagement_type: s14.q14_1_engagement_type,
        q14_2_contact_method: s14.q14_2_contact_method || undefined,
        q14_3_timing: s14.q14_3_timing || undefined,
        q14_4_role_contribution: s14.q14_4_role_contribution || undefined,
        q14_5_additional_comments: s14.q14_5_additional_comments || undefined,

        q15_1_confirm_accurate: s15.q15_1_confirm_accurate,
        q15_2_consent_anonymous_use: s15.q15_2_consent_anonymous_use,
        q15_3_consent_voluntary: s15.q15_3_consent_voluntary,
        q15_4_ready_to_submit: s15.q15_4_ready_to_submit,

        // Reaching this line is only possible because of the guard at the top
        // of handleSubmit(), which returns early unless
        // s1.consent_participate === true. consent_final therefore always
        // reflects a real, affirmative consent answer — it is never set
        // unconditionally.
        consent_final: true as const,
      };

      await submitSurvey(payload);
      toast.success("Survey submitted successfully! Your input shapes the Emerging Bangsamoro.");
      localStorage.removeItem(LOCALSTORAGE_KEY);
      setHasUnsavedChanges(false);
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
    <div ref={mainRef} className="min-h-screen bg-gradient-to-br from-[#ecfdf5] via-white to-[#d1fae5] dark:from-[#011a12] dark:via-[#022c22] dark:to-[#1B4D3E] relative">
      <Toaster position="top-right" richColors />

      {/* ── Progress Bar (Acts as the SOLE header for the survey) ── */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-[#022c22]/80 backdrop-blur-md border-b border-[#C9A84C]/20">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider">BIRD Validation</span>
              <span className="text-xs text-[#64748b]">|</span>
              <span className="text-xs text-[#022c22] dark:text-[#ecfdf5]">Step {step + 1} of {totalSteps}</span>
            </div>
            <a 
              href="/dashboard" 
              className="text-xs font-semibold text-[#1B4D3E] dark:text-[#C9A84C] hover:text-[#C9A84C] dark:hover:text-[#E8C560] flex items-center gap-1 transition-colors"
            >
              <BarChart3 className="w-3.5 h-3.5" /> Live Dashboard
            </a>
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
                      ? "bg-[#1B4D3E]/20 dark:bg-[#C9A84C]/20 text-[#1B4D3E] dark:text-[#ecfdf5]" 
                      : "bg-[#C9A84C]/10 text-[#64748b]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── BIRD Score Panel (visible on SWOT steps) ── */}
      {step >= 3 && step <= 9 && Object.keys(birdScores).length > 0 && (
        <div className="max-w-5xl mx-auto px-4 pt-4">
          <div className="rounded-lg border border-[#C9A84C]/20 bg-[#022c22]/5 dark:bg-[#1B4D3E]/20 p-3 flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-wider">Live Scores:</span>
            {Object.entries(birdScores).slice(0, 6).map(([key, val]) => (
              <span 
                key={key} 
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#C9A84C]/10 text-[#022c22] dark:text-[#ecfdf5] font-semibold border border-[#C9A84C]/20"
              >
                {key.replace(/_/g, " ")}: {val.toFixed(2)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <main className="max-w-5xl mx-auto px-4 py-8 pb-24">
        {renderStep()}
      </main>

      {/* ── Navigation Footer ── */}
      <div className="sticky bottom-0 z-40 bg-white/90 dark:bg-[#022c22]/90 backdrop-blur-md border-t border-[#C9A84C]/20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={goPrev} 
            disabled={step === 0}
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-[#C9A84C]/30 text-[#022c22] dark:text-[#ecfdf5] hover:bg-[#C9A84C]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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
