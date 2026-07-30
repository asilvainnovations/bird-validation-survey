// src/lib/swot-content.ts
// ─────────────────────────────────────────────────────────────────────────────
// BIRD 2026–2035 · Canonical SWOT & Systems-Archetype Content Registry
//
// SINGLE SOURCE OF TRUTH. Every SWOT scale item and every CLD/Archetype
// validation question the survey asks is defined exactly ONCE, here.
//
// AUTHORITATIVE SOURCE (2026-07-30): "Copy_of_SWOT_Analysis_for_Validation_
// Survey.pdf" — the official BIRD SWOT Analysis chapter, Tables 3-1 through
// 3-4, which includes an explicit "BEIE Attribution" column per factor. This
// supersedes SWOT_Scale_Questions.md and CLDs_Systems_Archetypes_Questions.md
// wherever they conflict — the PDF is more current and more complete (55
// factors vs. 44 in the earlier markdown export). "OS: Moral Governance",
// "OS: Peace", and "OS: Resilience" in the PDF's attribution column all map
// to Section 9 (Operating Systems) here — that section covers all three.
//
// survey-schema.ts, SurveyWizard.tsx, and every SectionN_*.tsx component MUST
// read field names from this file rather than re-typing them. This is the fix
// for the schema-drift bug class identified in the 2026-07-29 audit, where the
// same ~40 factors were hand-copied with different names into 4+ separate
// files and silently diverged.
//
// Naming convention: q{sectionNumber}_{s|w|o|t}{itemIndex}_{slug}
//   e.g. q6_s1_youth_pop_impact / q6_s1_youth_pop_likelihood
//
// Note on the one real conflict between the two source docs: SWOT_Scale_
// Questions.md's Section 3 preamble lists "Limits to Growth" and "Tragedy of
// the Commons" as example archetype questions, but its own note says SWOT
// scale items are mapped to Sections 4–9, and CLDs_Systems_Archetypes_
// Questions.md's authoritative Summary Table assigns Tragedy of the Commons
// to Section 4 and Limits to Growth to Section 6. This file follows the CLD
// doc's Summary Table as ground truth; Section 3 carries only the two Causal
// Loop Diagram questions (Investment-Development Cycle, Governance-Investor
// Confidence Loop) plus general BEIE framework comprehension questions.
// ─────────────────────────────────────────────────────────────────────────────

export type SwotCategory = "S" | "W" | "O" | "T";

export interface SwotItem {
  /** e.g. "S1", "W2", "O3", "T1" — matches the ID column in SWOT_Scale_Questions.md */
  id: string;
  category: SwotCategory;
  /** Short label shown as the row heading */
  label: string;
  /** Full factor description shown to the respondent */
  factor: string;
  /** Base field slug; final fields are `${field}_impact` / `${field}_likelihood` */
  field: string;
}

export interface ArchetypeQuestion {
  /** Matches the "#" column in the CLD doc's Summary Table */
  id: number;
  slug: string;
  name: string;
  type: "swot-archetype" | "cld-loop" | "governance-scale";
  imageKey: string; // key into BIRD_IMAGES
  description: string;
  /** Field prefix; produces `${field}_accuracy` (or `_scale`) + `${field}_followup` */
  field: string;
  /** The multiple-choice options for the second (follow-up) question */
  followupOptions: string[];
  followupLabel: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4 — Cluster 1: Foundations
// ═══════════════════════════════════════════════════════════════════════════
export const SECTION4_SWOT: SwotItem[] = [
  { id: "S1", category: "S", field: "q4_s1_aff_base", label: "Strong AFF Base", factor: "BARMM has strong resources in rubber, coconut, seaweed, fisheries, halal farm products, and rice." },
  { id: "S2", category: "S", field: "q4_s2_renewable_energy", label: "Renewable Energy Endowments", factor: "BARMM has untapped hydro (Lake Lanao), solar, and biomass energy potential." },
  { id: "S3", category: "S", field: "q4_s3_lake_lanao", label: "Lake Lanao", factor: "Multi-purpose resource for freshwater supply, hydroelectric power, and eco-tourism opportunities in Lanao del Sur." },
  { id: "S4", category: "S", field: "q4_s4_seaweed_dominance", label: "Tawi-Tawi's Global Seaweed Dominance", factor: "Tawi-Tawi produces 40% of the Philippines' seaweed output, providing a massive, ready-made resource base for industrial carrageenan processing." },
  { id: "W1", category: "W", field: "q4_w1_land_tenure", label: "Complex Land Tenure (SGA)", factor: "The Special Geographic Area faces a difficult overlay of Ancestral Domain (CADT), private titles, and public land, creating friction for large-scale agro-industrial parks." },
  { id: "O1", category: "O", field: "q4_o1_renewable_invest", label: "Renewable Energy Investments", factor: "Growing interest in solar farms, hydro rehabilitation, and biomass projects aligning with BARMM's clean energy potential." },
  { id: "O2", category: "O", field: "q4_o2_carbon_markets", label: "Carbon Markets & REDD+", factor: "BARMM's forests and carbon stocks can be monetized through carbon credits, creating new revenue for communities and LGUs." },
  { id: "O3", category: "O", field: "q4_o3_pes", label: "Payment for Ecosystem Services (PES)", factor: "LGUs can earn income by protecting watersheds, coastlines, and mangroves — turning conservation into a revenue source." },
  { id: "O4", category: "O", field: "q4_o4_forestry_code", label: "Bangsamoro Forestry Code", factor: "Pending legislation could open sustainable timber, non-timber forest products (NTFPs), and forest nursery investments." },
  { id: "T1", category: "T", field: "q4_t1_pestalotiopsis", label: "Rubber Pestalotiopsis Disease", factor: "A fungal disease is attacking rubber plantations in Basilan and could spread to other rubber-producing areas, threatening farmer livelihoods." },
];

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 5 — Cluster 2: Transformers
// ═══════════════════════════════════════════════════════════════════════════
export const SECTION5_SWOT: SwotItem[] = [
  { id: "S1", category: "S", field: "q5_s1_halal_legitimacy", label: "Halal Legitimacy & Cultural Credibility", factor: "Authentic Muslim-majority identity providing unmatched authenticity for halal branding." },
  { id: "S2", category: "S", field: "q5_s2_domestic_demand", label: "Domestic Halal Demand", factor: "5.69M Muslim consumer base driving local market absorption." },
  { id: "S3", category: "S", field: "q5_s3_polloc_freeport", label: "Polloc Freeport & Economic Zone", factor: "Strategic logistics hub and trade gateway in Maguindanao del Norte." },
  { id: "S4", category: "S", field: "q5_s4_cultural_heritage", label: "Rich Cultural Heritage", factor: "Maranao, Yakan, and Tausug heritage as assets for creative/tourism industries." },
  { id: "W1", category: "W", field: "q5_w1_halal_cert", label: "Weak Halal Certification System", factor: "Resource-constrained BHB with limited international recognition." },
  { id: "W2", category: "W", field: "q5_w2_cold_chain", label: "Limited Agro-Processing/Cold Chain", factor: "High post-harvest losses (20–40%) constraining value addition." },
  { id: "W3", category: "W", field: "q5_w3_market_linkages", label: "Weak Market Linkages", factor: "Limited access to buyers and price information for producers." },
  { id: "T1", category: "T", field: "q5_t1_standards_recognition", label: "Standards Recognition Risk", factor: "BARMM certifications not yet aligned with OIC/SMIIC international standards." },
];

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 6 — Cluster 3: Enablers
// ═══════════════════════════════════════════════════════════════════════════
export const SECTION6_SWOT: SwotItem[] = [
  { id: "S1", category: "S", field: "q6_s1_youth_pop", label: "Young, Growing Population", factor: "Demographic dividend with 3.43% annual growth (highest in PH)." },
  { id: "S2", category: "S", field: "q6_s2_lanao_growth", label: "Lanao del Sur's Growth Momentum", factor: "Currently BARMM's fastest-growing provincial economy (5.02% in 2023)." },
  { id: "W1", category: "W", field: "q6_w1_infra_deficits", label: "Critical Infrastructure Deficits", factor: "Energy, transport, digital, and water gaps." },
  { id: "W2", category: "W", field: "q6_w2_poverty", label: "Highest Poverty Incidence", factor: "34.8% limiting domestic market depth and purchasing power." },
  { id: "W3", category: "W", field: "q6_w3_literacy", label: "Lowest Functional Literacy Rate", factor: "59.3%, creating a severe human capital constraint." },
  { id: "W4", category: "W", field: "q6_w4_malnutrition", label: "Severe Child Malnutrition", factor: "45% stunting rate among children under five." },
  { id: "W5", category: "W", field: "q6_w5_skills_mismatch", label: "Skills Mismatch", factor: "TVIs not fully aligned with emerging industry needs (e.g., halal manufacturing)." },
  { id: "W6", category: "W", field: "q6_w6_tech_adoption", label: "Low Technology Adoption", factor: "Slow uptake of modern farming and processing technologies." },
  { id: "W7", category: "W", field: "q6_w7_fragmented_data", label: "Fragmented Data Systems", factor: "Agencies often use incompatible databases, leading to a siloed view that causes delayed procurement and slow certification cycles." },
  { id: "O1", category: "O", field: "q6_o1_tourism_recovery", label: "Tourism Recovery", factor: "Isabela City Tourism Champion (2024) and Lake Lanao eco-tourism potential." },
  { id: "O2", category: "O", field: "q6_o2_digital_leapfrog", label: "Digital Leapfrogging (BIFOSS)", factor: "Implementing the Bangsamoro Investment Facilitation One-Stop Shop for 1-day business registration." },
  { id: "T1", category: "T", field: "q6_t1_cyber_insecurity", label: "Cyber Insecurity & AI Risks", factor: "Emerging threats from misinformation, cyberattacks, and adverse AI outcomes disrupting digital governance." },
  { id: "T2", category: "T", field: "q6_t2_infra_cost_overruns", label: "Infrastructure Cost Overruns", factor: "Delays and budget escalations in critical infrastructure projects can discourage investors and slow the build-out of roads, power, and ports." },
];

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 7 — Cluster 4: Connectors
// ═══════════════════════════════════════════════════════════════════════════
export const SECTION7_SWOT: SwotItem[] = [
  { id: "S1", category: "S", field: "q7_s1_bimpeaga_location", label: "Strategic Location (BIMP-EAGA)", factor: "Proximity to Sabah and ASEAN trade corridors." },
  { id: "O1", category: "O", field: "q7_o1_global_halal", label: "Global Halal Market", factor: "USD 2.3 trillion market with growing demand." },
  { id: "O2", category: "O", field: "q7_o2_asean_halal", label: "ASEAN Halal Economy", factor: "USD 1.38 trillion addressable market; target to capture 30% share." },
  { id: "O3", category: "O", field: "q7_o3_bimpeaga_integration", label: "BIMP-EAGA Regional Integration", factor: "Cross-border trade facilitation and eco-corridors." },
  { id: "O4", category: "O", field: "q7_o4_uae_corridor", label: "UAE/GCC Halal Export Corridor", factor: "MAFAR-Prime Group partnership opening Middle Eastern markets." },
  { id: "O5", category: "O", field: "q7_o5_landbridge", label: "Mindanao Central Logistics Land-Bridge", factor: "SGA serves as the primary land bridge connecting Polloc Freeport to General Santos and Davao export gateways." },
  { id: "T1", category: "T", field: "q7_t1_halal_competition", label: "Competition from Halal Hubs", factor: "Malaysia, Indonesia, and Thailand holding established market share." },
  { id: "T2", category: "T", field: "q7_t2_economic_downturn", label: "Global Economic Downturn", factor: "Perceived as a top global risk, weakening demand for BARMM's key exports like Halal and rubber." },
  { id: "T3", category: "T", field: "q7_t3_price_volatility", label: "Market Price Volatility", factor: "Global commodity fluctuations for rubber, coconut, and seaweed." },
];

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 8 — Cluster 5: Financiers
// ═══════════════════════════════════════════════════════════════════════════
export const SECTION8_SWOT: SwotItem[] = [
  { id: "S1", category: "S", field: "q8_s1_islamic_finance_framework", label: "Islamic Finance Legal Framework", factor: "RA 11439 enabling Shariah-compliant capital mobilization." },
  { id: "W1", category: "W", field: "q8_w1_financial_penetration", label: "Minimal Formal Financial Penetration", factor: "Capital access barriers for MSMEs, especially in rural/island areas." },
  { id: "O1", category: "O", field: "q8_o1_islamic_ecosystem", label: "Islamic Finance Ecosystem", factor: "Growing global Shariah-compliant capital pool seeking ethical investments." },
];

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 9 — Operating Systems
// ═══════════════════════════════════════════════════════════════════════════
export const SECTION9_SWOT: SwotItem[] = [
  { id: "S1", category: "S", field: "q9_s1_policy_recognition", label: "Growing Policy Recognition", factor: "Institutional mandates via BOL, BIC, SIPP, and BHIDP." },
  { id: "S2", category: "S", field: "q9_s2_peace_dividend", label: "Peace Dividend Momentum", factor: "Basilan ASG-free declaration (2024) and stabilized security in select zones." },
  { id: "W1", category: "W", field: "q9_w1_fragmented_policy", label: "Fragmented Policy Frameworks", factor: "Governance coordination gaps and underspending in budget execution." },
  { id: "W2", category: "W", field: "q9_w2_underspending", label: "Underspending in Budget Execution", factor: "Delays in development program rollout; absorptive capacity challenge. (Moved here from Enablers — official BEIE Attribution is OS: Moral Governance, not Enablers.)" },
  { id: "O1", category: "O", field: "q9_o1_postconflict", label: "Post-Conflict Reconstruction", factor: "Marawi MAA commercial redevelopment and normalization." },
  { id: "O2", category: "O", field: "q9_o2_climate_adaptation_finance", label: "Climate Adaptation Finance", factor: "Tawi-Tawi can leverage a $10 million Adaptation Fund synergy to boost the climate resiliency of coastal communities." },
  { id: "T1", category: "T", field: "q9_t1_climate_change", label: "Climate Change Vulnerabilities", factor: "El Niño, flooding, and shifting rainfall patterns (4.2% AFF contraction in 2024)." },
  { id: "T2", category: "T", field: "q9_t2_drifting_goals", label: '"Drifting Goals" Syndrome', factor: "Political/institutional pressure leading to lowering standards rather than fixing root infrastructure problems." },
  { id: "T3", category: "T", field: "q9_t3_security_incidents", label: "Residual Security Incidents", factor: "Rido, remnant armed groups, and investor perception risks." },
  { id: "T4", category: "T", field: "q9_t4_political_transition", label: "Political Transition Uncertainties", factor: "First parliamentary elections and governance continuity risks." },
  { id: "T5", category: "T", field: "q9_t5_natl_coordination", label: "Limited National Coordination", factor: "Gaps in BARMM-specific infrastructure funding from the national government." },
  { id: "T6", category: "T", field: "q9_t6_fragmented_mandates", label: "Risk of Fragmented Mandates", factor: "Islamic banking, halal certification, and trade agencies operating in silos." },
];

export const SWOT_BY_SECTION: Record<number, SwotItem[]> = {
  4: SECTION4_SWOT,
  5: SECTION5_SWOT,
  6: SECTION6_SWOT,
  7: SECTION7_SWOT,
  8: SECTION8_SWOT,
  9: SECTION9_SWOT,
};

const ACCURACY_OPTIONS = ["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"];

// ═══════════════════════════════════════════════════════════════════════════
// CAUSAL LOOP DIAGRAMS & SYSTEMS ARCHETYPES
// Section assignment follows the CLD doc's authoritative Summary Table.
// ═══════════════════════════════════════════════════════════════════════════
export const ARCHETYPES_BY_SECTION: Record<number, ArchetypeQuestion[]> = {
  3: [
    {
      id: 1, slug: "investment_development_loop", name: "Investment-Development Virtuous Cycle",
      type: "cld-loop", imageKey: "investmentVirtuousCycle", field: "q3_cld1_investment_development",
      description: "This reinforcing loop shows how strategic investment creates a self-sustaining cycle of growth: investments create jobs and incomes, which grow the local market, improve the business climate, and attract further investment.",
      followupLabel: "Which sector shows the strongest investment-development reinforcing cycle?",
      followupOptions: ["Agro-industry", "Halal manufacturing", "Renewable energy", "Tourism"],
    },
    {
      id: 2, slug: "governance_investor_confidence_loop", name: "Governance-Investor Confidence Loop",
      type: "cld-loop", imageKey: "investmentGovernanceCycles", field: "q3_cld2_governance_confidence",
      description: "This loop illustrates how transparent, accountable governance builds investor trust, leading to more investment approvals, a stronger tax base, better infrastructure, and further improved governance capacity.",
      followupLabel: "Which governance reform would most strengthen this loop?",
      followupOptions: ["Transparency improvements", "Accountability mechanisms", "Islamic ethics integration", "Anti-corruption measures"],
    },
  ],
  4: [
    {
      id: 3, slug: "tragedy_of_commons", name: "Tragedy of the Commons",
      type: "swot-archetype", imageKey: "tragedyCommons", field: "q4_arch_tragedy_commons",
      description: "Uncoordinated exploitation of shared natural resources (agriculture, fisheries, forestry, energy, environment) leads to systemic collapse without governance intervention such as the Bangsamoro Forestry Code, carbon markets, and community co-management.",
      followupLabel: "If this archetype applies, which shared resource is most at risk of over-exploitation?",
      followupOptions: ["Watersheds", "Fishing grounds", "Forest reserves", "Agricultural land"],
    },
  ],
  5: [
    {
      id: 4, slug: "growth_and_underinvestment", name: "Growth and Underinvestment",
      type: "swot-archetype", imageKey: "growthUnderinvestment", field: "q5_arch_growth_underinvest",
      description: "Rapid investment expansion stalls when institutional capacity (certifiers, staff, infrastructure) fails to keep pace, creating backlogs, delays, and eroding investor confidence.",
      followupLabel: "Which capacity constraint most affects your sector?",
      followupOptions: ["Halal certification delays", "Infrastructure bottlenecks", "Skills shortage", "Processing facilities"],
    },
  ],
  6: [
    {
      id: 5, slug: "limits_to_growth", name: "Limits to Growth",
      type: "swot-archetype", imageKey: "limitsGrowth", field: "q6_arch_limits_growth",
      description: "Rapid investment expansion eventually slows when structural ceilings — weak infrastructure, limited skills, environmental constraints — are reached, plateauing progress unless capacity-building measures are introduced.",
      followupLabel: "Which constraint most limits growth in your sector?",
      followupOptions: ["Infrastructure gaps", "Skills shortage", "Environmental constraints", "Funding limitations"],
    },
  ],
  7: [
    {
      id: 6, slug: "success_to_the_successful", name: "Success to the Successful",
      type: "swot-archetype", imageKey: "successSuccessful", field: "q7_arch_success_successful",
      description: "Initial advantages reinforce uneven development between BARMM's mainland (infrastructure, administrative centrality) and island provinces (isolation, poor connectivity), widening the gap over time.",
      followupLabel: "Which island province has the greatest untapped potential, and what investment would unlock it?",
      followupOptions: ["Tawi-Tawi (seaweed, BIMP-EAGA)", "Basilan (rubber, ZBIP)", "Sulu (fisheries, tourism)"],
    },
  ],
  8: [
    {
      id: 7, slug: "shifting_the_burden", name: "Shifting the Burden",
      type: "swot-archetype", imageKey: "shiftingBurden", field: "q8_arch_shifting_burden",
      description: "BARMM relies on conventional banking as a symptomatic fix for limited Shariah-compliant financing access, temporarily meeting capital needs without resolving the structural gap despite RA 11439's legal framework.",
      followupLabel: "Describe a case where a short-term capital fix either led to long-term reform or failed and the problem returned.",
      followupOptions: ["Led to long-term reform", "Failed and problem returned", "Mixed results"],
    },
  ],
  9: [
    {
      id: 8, slug: "moral_governance_derisks_capital", name: "Moral Governance De-Risks Capital",
      type: "governance-scale", imageKey: "moralGovernanceDeRisks", field: "q9_arch_moral_governance_derisk",
      description: "A reinforcing feedback loop: transparent systems (like BIFOSS) lower bureaucratic friction, raising investor confidence and FDI, which boosts revenue and strengthens governance capacity further.",
      followupLabel: "Which aspect of moral governance most reduces investment risk?",
      followupOptions: ["Transparency", "Accountability", "Efficiency", "Islamic ethics"],
    },
    {
      id: 9, slug: "fixes_that_fail", name: "Fixes that Fail",
      type: "swot-archetype", imageKey: "fixesThatFail", field: "q9_arch_fixes_fail",
      description: "Ad-hoc tax incentives, fragmented subsidies, and short-term security operations create an illusion of progress while institutional weaknesses (procurement delays, slow halal certification, poor coordination) persist and compound.",
      followupLabel: "Which sectors best fit this archetype? Which have avoided this trap?",
      followupOptions: ["Halal manufacturing", "Agro-processing", "Renewable energy", "Tourism"],
    },
    {
      id: 10, slug: "escalation", name: "Escalation",
      type: "swot-archetype", imageKey: "escalationArchetype", field: "q9_arch_escalation",
      description: "When one group (clan, province, or agency) mobilizes to protect its interests, others perceive it as a threat and counter-mobilize — a reinforcing cycle of competitive spirals that diverts resources from productive development.",
      followupLabel: "In which domain do you see this escalation dynamic most clearly?",
      followupOptions: ["Clan rivalries (rido)", "Inter-provincial competition", "Inter-agency rivalry", "External market competition"],
    },
    {
      id: 11, slug: "big_man_archetype", name: "The Big Man Archetype",
      type: "swot-archetype", imageKey: "bigManArchetype", field: "q9_arch_big_man",
      description: "Concentrated political power around dominant clan leaders creates a self-reinforcing cycle: patronage erodes governance (R1), exclusion breeds conflict (R2), and patronage-based hiring depletes development resources (R3).",
      followupLabel: "Which of the three reinforcing loops is most active in BARMM today?",
      followupOptions: ["R1: Patronage eroding governance", "R2: Exclusion fueling conflict", "R3: Patronage draining development resources"],
    },
  ],
  11: [
    {
      id: 12, slug: "drifting_goals", name: "Drifting Goals",
      type: "swot-archetype", imageKey: "driftingGoals", field: "q11_arch_drifting_goals",
      description: "BARMM's development ambitions weaken over time when persistent performance gaps lead institutions to normalize lowered 'realistic' targets instead of fixing systemic constraints (electrification, literacy, halal certification).",
      followupLabel: "Which of the balancing loops is most observable in BARMM today?",
      followupOptions: [
        "B1: Persistent performance gaps create pressure to reduce targets",
        "B2: Agencies respond with short-term fixes that rarely close structural gaps",
      ],
    },
  ],
};

export { ACCURACY_OPTIONS };
