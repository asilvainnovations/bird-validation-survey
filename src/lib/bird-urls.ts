// src/lib/bird-urls.ts
// BIRD 2026–2035 · Centralized URL Registry
// Videos, Images, and Site Pages for Context, Reference, Visualizations & Interactions
// Updated: 2026-07-23 — Complete URL mapping per user specifications

export const BIRD_VIDEOS = {
  overview: {
    title: "Bangsamoro Investment Roadmap 2026‑2035 | Southeast Asia's Hub for Ethical & Sustainable Growth",
    url: "https://youtu.be/UCi2dVUmSbE",
    duration: "~7 min",
    section: "general",
    description: "Discover how the Bangsamoro Investment Roadmap (BIRD) 2026‑2035 positions BARMM as Southeast Asia's hub for resilient, ethical, and sustainable investments — highlighting its growth momentum, the risks ahead, and the frameworks driving transformation.",
  },
  systemsThinking: {
    title: "Systems Thinking: Moving from Checklists to Interconnected Investment Ecosystem",
    url: "https://youtu.be/VBAHk0WYz_c",
    duration: "~10 min",
    section: "section0",
    description: "Discover how the Bangsamoro Investment Roadmap (BIRD 2026–2035) turns fragmented efforts into a unified engine of growth. This video unpacks: Systems Thinking — shifting from checklists to interconnected strategies; Feedback Loops — cycles that amplify progress and stabilize change; Causal Loop Diagrams — visuals that expose traps and leverage points; and Leverage Strategies — small shifts sparking big gains in governance, infrastructure, and equity.",
  },
  beieFramework: {
    title: "Bangsamoro Economic & Investment Ecosystem (BEIE) Framework",
    url: "https://youtu.be/0J491Vqya_4",
    duration: "~3 min",
    section: "section3",
    description: "Discover how the Bangsamoro Economic and Investment Ecosystem (BEIE) Framework is transforming BARMM into a resilient, ethical, and globally connected hub. This video explains the 2026‑2035 Investment Roadmap, highlighting how synchronized ecosystems—Foundations, Transformers, Enablers, Connectors, and Financiers—work together to drive unstoppable growth.",
  },
  strategicOptions: {
    title: "Strategic Options & Path to Growth",
    url: "https://youtu.be/kb_snh8mo1k",
    duration: "~7 min",
    section: "section10",
    description: "Discover the strategic choices shaping Bangsamoro's Investment Roadmap 2026–2035. This video shows how well-crafted strategies and priorities can fuel inclusive growth, sustainability, and regional competitiveness in BARMM.",
  },
} as const;

export const BIRD_IMAGES = {
  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 0: VALIDATION SURVEY & ORIENTATION
  // ═══════════════════════════════════════════════════════════════════════════════
  validationSurveyBanner: {
    title: "BIRD Validation Survey 2026-2035",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Validation%20Survey%20Banner.png",
    category: "survey",
    section: "section0",
    alt: "BIRD validation survey banner",
    description: "Official validation survey banner for the BIRD 2026-2035 stakeholder consultation process.",
  },
  anatomyCLD: {
    title: "Anatomy of Causal Loop Diagram",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/3-Anatomy%20of%20CLD.png",
    category: "systems",
    section: "section0",
    alt: "Anatomy of Causal Loop Diagram",
    description: "A Causal Loop Diagram (CLD) has interconnected elements: Variables — factors that change over time; Links — arrows showing influence; Polarity — marked as 's' for same-direction and 'o' for opposite-direction effects.",
  },
  anatomySystemTraps: {
    title: "Anatomy of Systems Traps",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/6-Anatomy%20of%20Systems%20Traps.png",
    category: "systems",
    section: "section0",
    alt: "Feedback Loops and Leverage Points",
    description: "Visual explanation of feedback loops (Reinforcing and Balancing) and Meadows' Leverage Hierarchy showing Transformative (L1–L2), Systemic (L5–L6), and Incremental (L10) leverage points.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 3: BEIE FRAMEWORK & SYSTEMS THINKING
  // ═══════════════════════════════════════════════════════════════════════════════
  systemsBasedReframing: {
    title: "Why the Need for Systems-Based Reframing",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Why%20the%20need%20for%20Systems-Based%20reframing.png",
    category: "framework",
    section: "section3",
    alt: "Systems-Based Reframing",
    description: "Conveys the shift from traditional, siloed approaches to investment planning toward a more integrated, systems-oriented perspective.",
  },
  sectorToEcosystem: {
    title: "From Sector-Based Planning to BEIE Approach",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/From%20Sector-Based%20Planning%20to%20BEIE%20Approach.png",
    category: "framework",
    section: "section3",
    alt: "Mental Model Shift",
    description: "Illustrates the mental model shift from siloed development to an interconnected ecosystem that drives inclusive and sustainable growth.",
  },
  beieFramework: {
    title: "Bangsamoro Economic and Investment Ecosystem (BEIE)",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/BEIE%20Framework%20-1%20.png",
    category: "framework",
    section: "section3",
    alt: "BEIE Framework",
    description: "Presents a circular system powered by Moral Governance at its center, with five interconnected components: Foundations, Transformers, Financiers, Connectors, and Enablers.",
  },
  operatingSystems: {
    title: "Operating Systems: Moral Governance",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/OS.png",
    category: "governance",
    section: "section3",
    alt: "Moral Governance Operating System",
    description: "Moral Governance serves as the central operating system with three foundational pillars: Peace, Resilience, and Inclusivity.",
  },
  fiveClusters: {
    title: "Five Interconnected Clusters",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/bird-images/5%20Interconnected%20Clusters.png",
    category: "framework",
    section: "section3",
    alt: "Five Clusters",
    description: "The Parts of the Engine: Foundations, Financiers, Transformers, Enablers, and Connectors working together as one economic engine.",
  },
  investmentVirtuousCycle: {
    title: "Investment-Development Virtuous Cycle",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/14.%20Investment-Development%20Virtuous%20Cycle.png",
    category: "systems",
    section: "section3",
    alt: "Virtuous Cycle",
    description: "Reinforcing loop showing how strategic investment triggers a self-sustaining cycle of growth across BARMM's economy.",
  },
  investmentGovernanceCycles: {
    title: "Investment and Governance Cycles",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/Investment%20and%20Governance%20Cycles.png",
    category: "systems",
    section: "section3",
    alt: "Investment Governance Cycles",
    description: "Two interconnected reinforcing loops (R1: Investment-Development, R2: Governance-Investor Confidence) that drive sustained development.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 4: CLUSTER 1 - FOUNDATIONS
  // ═══════════════════════════════════════════════════════════════════════════════
  cluster1Foundations: {
    title: "Cluster 1: Foundations",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%201-Foundations.png",
    category: "cluster",
    section: "section4",
    alt: "Foundations Cluster",
    description: "The Infrastructure-First Resource Base: Agri-Fisheries, Energy, Forestry, and Environment forming the groundwork for economic development.",
  },
  tragedyCommons: {
    title: "Tragedy of the Commons Archetype",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tragedy%20of%20the%20Commons%20Archetype.png",
    category: "archetype",
    section: "section4",
    alt: "Tragedy of the Commons",
    description: "Warning of how uncoordinated exploitation of shared natural resources leads to systemic collapse across BARMM's Foundations cluster.",
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // SECTION 5: CLUSTER 2 - TRANSFORMERS
  // ═══════════════════════════════════════════════════════════════════════════════
  cluster2Transformers: {
    title: "Cluster 2: Transformers",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%202%20_%20Transformers.png",
    category: "cluster",
    section: "section5",
    alt: "Transformers Cluster",
    description: "Engines of Value Creation: Raw Material → High-Value Processing → Premium Export targeting the ASEAN Halal market.",
  },
  halalIndustryAdvantage: {
    title: "The Halal Industry Advantage: Capitalizing Cultural Advantage",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Capitalizing%20Cultural%20Advantage%20-%20Halal%20Industry%20Adv.png",
    category: "cluster",
    section: "section5",
    alt: "Halal Industry Advantage",
    description: "Highlights Bangsamoro's cultural and geographic strengths in capturing the ASEAN halal market through Food & Beverage, Cosmetics, and Pharmaceuticals.",
  },
  farmToMarketPipeline: {
    title: "Transformers: MAFAR Halal Farm-to-Market Pipeline",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Transformers-Farm-to-Market%20Pipeline%20.png",
    category: "cluster",
    section: "section5",
    alt: "Farm-to-Market Pipeline",
    description: "Structured value chain: Input Supply → Cold Chain & Logistics → Processing → Market Linkage with BIMP-EAGA integration.",
  },
  industrialEconomicZones: {
    title: "Industrial & Economic Zones",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Industrial%20and%20Economic%20Zones.png",
    category: "cluster",
    section: "section5",
    alt: "Industrial Zones",
    description: "Strategic hubs: Polloc Freeport & EcoZone and WOW Matanog Special Economic Zone (Bangsamoro Halal Park).",
  },
  growthUnderinvestment: {
    title: "Growth and Underinvestment Archetype",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Growth%20and%20Underinvestment%20(1).png",
    category: "archetype",
    section: "section5",
    alt: "Growth and Underinvestment",
    description: "Illustrates how rapid investment expansion stalls when institutional capacity fails to keep pace.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 6: CLUSTER 3 - ENABLERS
  // ═══════════════════════════════════════════════════════════════════════════════
  cluster3Enablers: {
    title: "Cluster 3: Enablers",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%203%20Enablers.png",
    category: "cluster",
    section: "section6",
    alt: "Enablers Cluster",
    description: "Constructing the Support Architecture: Digital Connectivity, Physical Infrastructure, Education & Skills, Health & Social Protection.",
  },
  skillsEducationGap: {
    title: "Skills and Education Gap",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Skills%20and%20Education%20Gap.png",
    category: "cluster",
    section: "section6",
    alt: "Skills Gap Analysis",
    description: "Gap Analysis Matrix showing how Bangsamoro's workforce training lags behind industry needs in Agriculture, Infrastructure, and Halal Industry.",
  },
  enablingGrid: {
    title: "The Enabling Grid & The Law of Sequencing",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Layer%202%20-%20The%20Enabling%20Grid%20and%20Lawof%20Sequencing.png",
    category: "cluster",
    section: "section6",
    alt: "Enabling Grid",
    description: "Sequential stages: Energy Priming → Physical Mobility → Logistics Integrity → Industrial Scaling.",
  },
  digitalTransformation: {
    title: "Digital Transformation Master Plan",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Digital%20Transformation%20Master%20Plan.png",
    category: "cluster",
    section: "section6",
    alt: "Digital Transformation",
    description: "BEGMP roadmap: Broadband & Connectivity, Smart Cities, E-Government, and Cybersecurity.",
  },
  tourismMasterPlan: {
    title: "Tourism Master Plan (BTDP 2024–2033)",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tourism%20Master%20Plan.png",
    category: "cluster",
    section: "section6",
    alt: "Tourism Master Plan",
    description: "Ten-year strategy with three phases: Organizing (2025–2026), Stabilizing (2027–2028), Institutionalizing (2029–2033).",
  },
  tourismDigitalConnectivity: {
    title: "Tourism and Digital Connectivity",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tourism%20and%20Digital%20Connectivity.png",
    category: "cluster",
    section: "section6",
    alt: "Tourism Digital",
    description: "Reinforcing Loop II: Digital Infrastructure & Smart Tourism enabling broader economic development.",
  },
  activatingEnablers: {
    title: "Activating the Enablers: Infra Primed by Moral Governance",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Activating%20the%20Enablers%20-%20Infra%20Primed%20by%20Moral%20Governance.png",
    category: "governance",
    section: "section6",
    alt: "Activating Enablers",
    description: "Moral Governance as operating system powering physical development: 100% Electrification, 85% Broadband, 30% Logistics Cost Reduction.",
  },
  limitsGrowth: {
    title: "Limits to Growth Archetype",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Limits%20to%20Growth%20Archetype.png",
    category: "archetype",
    section: "section6",
    alt: "Limits to Growth",
    description: "Illustrates how rapid investment expansion slows when structural ceilings are reached.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 7: CLUSTER 4 - CONNECTORS
  // ═══════════════════════════════════════════════════════════════════════════════
  cluster4Connectors: {
    title: "Cluster 4: Connectors",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Cluster%204_%20Connectors.png",
    category: "cluster",
    section: "section7",
    alt: "Connectors Cluster",
    description: "Linking Local Value to Global Demand: BIMP-EAGA Corridor and UAE & GCC trade routes.",
  },
  connectivityCapital: {
    title: "The Connectivity Capital",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/The%20Connectivity%20Capital%20.png",
    category: "connectivity",
    section: "section7",
    alt: "Connectivity Capital",
    description: "Categorizing the Investment Pipeline: Physical Pipelines, Digital Backbones, Market-Access Assets.",
  },
  integratingZones: {
    title: "Critical Test: Integrating Zones & Scaling Capital",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/Critical%20Test%20-%20Integrating%20Zones%20and%20Scaling%20Capiral%20-%20Think%20of%20one%20challenge%20%20we%20must%20overcome%20to%20achieve%20this%20vision.png",
    category: "connectivity",
    section: "section7",
    alt: "Integrating Zones",
    description: "Visualizes challenge of linking physical connectivity with ethical financing.",
  },
  provincialSpecializedNode: {
    title: "Layer 1: Provincial Specialized Node and Equity - One Bangsamoro",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Layer%201%20-%20Provincial%20-%20Geopolitical%20Specialized%20Nodes.png",
    category: "provincial",
    section: "section7",
    alt: "Provincial Nodes",
    description: "Geopolitical Specialized Nodes: Mainland Nodes (Maguindanao, Lanao, SGA) and Archipelagic Hubs (Basilan, Tawi-Tawi).",
  },
  trappedValue: {
    title: "The Trapped Value",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/The%20Trapped%20Value.png",
    category: "provincial",
    section: "section7",
    alt: "Trapped Value",
    description: "Geographic Reality: We Cannot Export Value We Cannot Move — farm-to-market roads and ports must precede agro-industrial scale-up.",
  },
  revitalizingMaritime: {
    title: "Revitalizing the Maritime Trade",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Revitalizing%20the%20Maritime%20Trade.png",
    category: "connectivity",
    section: "section7",
    alt: "Maritime Trade",
    description: "Mapping maritime trade flows and proposed port and logistics upgrades to unlock regional exports.",
  },
  shatteringIsolation: {
    title: "Shattering Geographic Isolation",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Shattering%20Geographical%20Isolation.png",
    category: "connectivity",
    section: "section7",
    alt: "Archipelagic Bridge",
    description: "Strategic infrastructure: Zamboanga-Basilan Interconnection (₱6.67B), Basilan-Zamboanga Bridge (31km), Bongao Bridge (541m).",
  },
  basilanTawiTawi: {
    title: "Basilan and Tawi-Tawi",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Basilan%20and%20tawi-Tawi.png",
    category: "provincial",
    section: "section7",
    alt: "Island Provinces",
    description: "Provincial Endowments & Strategic Leverages: Basilan (Logistics Gateway) and Tawi-Tawi (Maritime & Eco-Tourism Hub).",
  },
  globalIntegration: {
    title: "Global Integration Vectors",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Global%20Integration%20Vectors.png",
    category: "connectivity",
    section: "section7",
    alt: "Global Integration",
    description: "Layer 3: BIMP-EAGA Corridor (3% ASEAN halal market) and UAE & GCC Corridor ($2.3T global halal market).",
  },
  uaeGccConnectivity: {
    title: "BARMM Strategic Connectivity vis-à-vis UAE & GCC",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/UAE%20&%20GCC.png",
    category: "connectivity",
    section: "section7",
    alt: "UAE GCC",
    description: "Geographic map linking Bangsamoro's key provinces to the $2.3 trillion global halal market.",
  },
  barmmConnectivityBIMPEAGA: {
    title: "BARMM Strategic Connectivity Map",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/BARMM%20Connectivity-BIMP-EAGA.png",
    category: "connectivity",
    section: "section7",
    alt: "BIMP-EAGA",
    description: "Links provincial hubs to BIMP-EAGA Corridor and UAE & GCC Route.",
  },
  successSuccessful: {
    title: "Success to the Successful Archetype",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Success%20to%20the%20Successful%20Aarchetype.png",
    category: "archetype",
    section: "section7",
    alt: "Success to Successful",
    description: "Illustrates how initial advantages reinforce uneven development between mainland and island provinces.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 8: CLUSTER 5 - FINANCIERS
  // ═══════════════════════════════════════════════════════════════════════════════
  cluster5Financiers: {
    title: "Cluster 5: Financiers",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/38.%20Cluster%205_%20Financiers.png",
    category: "cluster",
    section: "section8",
    alt: "Financiers Cluster",
    description: "Powering the Bloodstream of the Economy: Islamic finance through ethical and faith-aligned capital mechanisms.",
  },
  financiersCapitalBloodstream: {
    title: "The Capital Bloodstream",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Financiers.png",
    category: "cluster",
    section: "section8",
    alt: "Capital Bloodstream",
    description: "Scaling Shariah-Compliant Finance: Macro-Capital (Islamic Banking & Sukuk), Risk Mitigation (Takaful), Micro-Access (Islamic Microfinance & Waqf).",
  },
  islamicFinanceRoadmap: {
    title: "Islamic Finance Roadmap (2024–2028)",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Islamic%20Finance%20Roadmap.png",
    category: "cluster",
    section: "section8",
    alt: "Islamic Finance",
    description: "Six progressive layers from Strengthen Islamic Banking Foundation to Develop Human Capital.",
  },
  shiftingBurden: {
    title: "Shifting the Burden Archetype",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Shifting%20the%20Burden.png",
    category: "archetype",
    section: "section8",
    alt: "Shifting Burden",
    description: "BARMM's reliance on conventional banking instead of fully investing in Islamic finance institutions.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 9: OPERATING SYSTEMS
  // ═══════════════════════════════════════════════════════════════════════════════
  operatingSystemsOS: {
    title: "Operating Systems: Moral Governance",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/OS.png",
    category: "governance",
    section: "section9",
    alt: "Moral Governance",
    description: "Central operating system with three pillars: Peace, Resilience, and Inclusivity.",
  },
  moralGovernanceDeRisks: {
    title: "How Moral Governance De-Risks Capital",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/How%20moral%20Governance%20De-Risks%20Capital.png",
    category: "governance",
    section: "section9",
    alt: "De-Risks Capital",
    description: "Reinforcing feedback loop: Moral Governance → Transparency → Investor Confidence → FDI → Revenue → Governance Capacity.",
  },
  regulatoryArchitecture: {
    title: "Regulatory Architecture of BIRD 2026–2035",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Regulatory%20Architecture.png",
    category: "governance",
    section: "section9",
    alt: "Regulatory Architecture",
    description: "Five pillars supporting Bangsamoro Organic Law: 2nd BDP & SIPP, BHIDP, BSEMP, RA 11439 & CREATE MORE Act, Pending Forestry Code.",
  },
  draftJMC: {
    title: "Draft Joint Memorandum Circular 2026-01",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Draft%20JMC%202026-01.png",
    category: "governance",
    section: "section9",
    alt: "Draft JMC",
    description: "Transforms Conservation into Municipal Revenue Streams: Carbon Credits, PES, Eco-Tourism User Fees.",
  },
  fixesThatFail: {
    title: "Fixes that Fail Archetype",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Fixes%20that%20Fail%20Archetype.png",
    category: "archetype",
    section: "section9",
    alt: "Fixes that Fail",
    description: "BARMM's reliance on short-term remedies undermines long-term institutional reform.",
  },
  bigManArchetype: {
    title: "The Big Man Archetype",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/The%20Big%20Man%20Archetype.png",
    category: "archetype",
    section: "section9",
    alt: "Big Man",
    description: "Concentrated political power creates self-reinforcing system of instability: R1 (Patronage-Governance), R2 (Exclusion-Conflict), R3 (Resource Depletion).",
  },
  policyRecommendationsMakers: {
    title: "Policy Recommendations: Policymakers-Planners-Investors",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Policy%20Recommendations-Policy%20Makers-Planners-Investors.png",
    category: "governance",
    section: "section9",
    alt: "Policy Makers",
    description: "Synchronized Mandate: Institutional, Fiscal, and Regulatory reforms for collaborative governance.",
  },
  policyRecommendationsActivating: {
    title: "Policy Recommendations: Activating the Framework",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Policy%20recommendations-Institutional-Fiscal-Regulatory.png",
    category: "governance",
    section: "section9",
    alt: "Activating Framework",
    description: "Three integrated reforms: Institutional (BIF-Net), Fiscal (SIPP & CREATE MORE), Regulatory (BEIE).",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 10: IEDS & STRATEGIC OPTIONS
  // ═══════════════════════════════════════════════════════════════════════════════
  identifyLeveragePoints: {
    title: "How to Identify Leverage Points",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/How%20to%20Identify%20Leverage%20Points.png",
    category: "leverage",
    section: "section10",
    alt: "Identify Leverage",
    description: "Three-step process using Donella Meadows' Hierarchy (L1–L12): Diagnostic Synthesis, Mapping the Loops, Tiered Selection.",
  },
  activatingLeveragePoints: {
    title: "Activating Leverage Points",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/Activating%20Leverage%20Points.png",
    category: "leverage",
    section: "section10",
    alt: "Activating Leverage",
    description: "Strategic Leverage Points: L3 (Goals & Operating System), L5 (Rules & Incentives), L6 (Information Flows).",
  },
  leverageCapacityTraps: {
    title: "Leverage Points in Capacity Traps",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Leverage%20Points%20for%20Capacity%20Traps.png",
    category: "leverage",
    section: "section10",
    alt: "Capacity Traps",
    description: "Prescription: Front-Loading the Ecosystem Enablers — L10 (Stock-Flow Structure) to break Limits to Growth.",
  },
  icebergModel: {
    title: "Leverage Points in Governance Traps: The Iceberg Model",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Iceberg%20Model%20Paradigm.png",
    category: "leverage",
    section: "section10",
    alt: "Iceberg Model",
    description: "Systems Thinking Paradigm: Events (Top 10%), Structures (Body 40%), Mental Models (Base 50%).",
  },
  collaborativeGovernance: {
    title: "Architecting Collaborative Governance",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Leverage%20Points%20in%20Governance.png",
    category: "leverage",
    section: "section10",
    alt: "Collaborative Governance",
    description: "Transition from clashing nodes to synchronized network: L1 (Paradigm), L2 (Mindset), L5 (Rules).",
  },
  archetypesLeveragePoints: {
    title: "6 Archetypes and Leverage Points",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Archetypes%20&%20Leverage%20Points.png",
    category: "leverage",
    section: "section10",
    alt: "Archetypes Leverage",
    description: "Mapping strategic leverage points onto identified systems archetypes.",
  },
  strategicOptions: {
    title: "Four Strategic Options",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/Strategic%20Options.png",
    category: "roadmap",
    section: "section10",
    alt: "Strategic Options",
    description: "Four Distinct Pathways: HEDS (Halal Economy), GEMS (Green Economy), IFES (Infrastructure-First), IEDS (Integrated Ecosystem).",
  },
  strategicOptionsRanking: {
    title: "Strategic Options Ranking",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/3.%20Strategic%20Options%20Ranking.png",
    category: "roadmap",
    section: "section10",
    alt: "Options Ranking",
    description: "Comparative evaluation across seven weighted criteria: Economic Impact, Systems Leverage, Identity Alignment, Inclusivity, Sustainability, Feasibility, Risk-Return.",
  },
  iedsExecution: {
    title: "The Execution Engine: IEDS",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/The%20Execution%20Engine%20-IEDS.png",
    category: "roadmap",
    section: "section10",
    alt: "IEDS Execution",
    description: "Three golden phases: Phase 1 (2026–2028) Activate Enablers, Phase 2 (2029–2032) Scale Transformers, Phase 3 (2033–2035) Consolidate Connectors.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 11: METRICS ARCHITECTURE
  // ═══════════════════════════════════════════════════════════════════════════════
  metricsArchitecture: {
    title: "Metrics Architecture",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/9.%20Metrics%20Architecture.png",
    category: "metrics",
    section: "section11",
    alt: "Metrics Architecture",
    description: "Four-tier measurement framework: Tier 1 (Global Standards), Tier 2 (National Alignment), Tier 3 (Regional Execution), Tier 4 (Local Impact).",
  },
  driftingGoals: {
    title: "Drifting Goals Archetype",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/Drifting%20Goals.png",
    category: "archetype",
    section: "section11",
    alt: "Drifting Goals",
    description: "Illustrates how development ambitions weaken when institutions lower standards instead of addressing root causes.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 12: BALANCED SCORECARD
  // ═══════════════════════════════════════════════════════════════════════════════
  bscIntangibles: {
    title: "The Balanced Scorecard: Intangibles to Financial Impact",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/BSC%20Intangibles%20to%20Financial%20Impact.png",
    category: "framework",
    section: "section12",
    alt: "Balanced Scorecard",
    description: "Four-perspective pyramid: Learning & Growth → Internal Processes → Customer/Stakeholder → Financial Impact (550B GRDP, 20,000+ jobs, <20% poverty).",
  },
  economicOutcomesBSC: {
    title: "Economic Outcomes in Balanced Scorecard View",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/18.%20Economic%20Outcomes%20in%20BSC.png",
    category: "framework",
    section: "section12",
    alt: "Economic Outcomes",
    description: "Four-layer perspectives shaped like a growing tree: Roots (Learning & Growth), Trunk (Internal Process), Branches (Stakeholder), Fruit (Financial).",
  },
  vision2035: {
    title: "Vision 2035",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/5.%20Vision.png",
    category: "framework",
    section: "section12",
    alt: "Vision 2035",
    description: "By 2035, Bangsamoro will be recognized as Southeast Asia's leading hub for resilient, ethical, inclusive, and sustainable investments.",
  },

  // ═══════════════════════════════════════════════════════════════════════════════
  // SECTION 13: PRIORITY ACTIONS & BUDGET
  // ═══════════════════════════════════════════════════════════════════════════════
  totalCapitalDeployment: {
    title: "Total Capital Deployment Per Phase",
    url: "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Total%20Capital%20Deployment%20per%20Phase.png",
    category: "roadmap",
    section: "section13",
    alt: "Capital Deployment",
    description: "Budget/Time Staircase: Phase 1 (2026–2028) ₱15B, Phase 2 (2029–2032) ₱20B, Phase 3 (2033–2035) ₱20B — Total ₱55B.",
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// BIRD SITES — Complete URL Mapping
// ═══════════════════════════════════════════════════════════════════════════════
export const BIRD_SITES = {
  home: {
    title: "BIRD Home",
    url: "https://bangsamoro-investment-roadmap.asilvainnovations.com",
    description: "Main BIRD 2026-2035 landing page with executive summary, key highlights, and stakeholder access portals.",
  },
  roadmap: {
    title: "Investment Roadmap",
    url: "https://bird-roadmap.asilvainnovations.com",
    description: "Interactive roadmap visualization with phase details, milestones, progress tracking, and public dashboards.",
  },
  dashboard: {
    title: "Strategic Dashboard",
    url: "https://bird-dashboard.asilvainnovations.com",
    description: "Public strategic dashboard with real-time KPIs, progress indicators, and transparent performance reporting.",
  },
  validationSurvey: {
    title: "Validation Survey",
    url: "https://bird-survey.asilvainnovations.com",
    description: "Standalone validation survey portal for stakeholder feedback collection, analysis, and reporting.",
  },
  resources: {
    title: "Resources",
    url: "https://bird-resources.asilvainnovations.com",
    description: "Comprehensive BIRD documentation library: reports, presentations, data sets, and multimedia resources.",
  },
  surveyDashboard: {
    title: "Validation Survey Dashboard",
    url: "https://bird-survey-dashboard.asilvainnovations.com",
    description: "Real-time survey analytics and response visualization dashboard.",
  },
  surveyBriefing: {
    title: "Survey Briefing",
    url: "https://bird-survey-orientation.asilvainnovations.com",
    description: "Survey orientation and guidance portal with methodology explainer, FAQ, and stakeholder preparation resources.",
  },
  actionPlan: {
    title: "Action Plan",
    url: "https://bird-action-plan.asilvainnovations.com",
    description: "Priority Actions and Programs (PAPs) with detailed implementation timelines and responsible agencies.",
  },
  birdApp: {
    title: "BIRD App",
    url: "https://bird-app.asilvainnovations.com",
    description: "Main BIRD strategic planning application with all modules: SWOT, Systems Thinking, BSC, PAPs, MEL, and AI Assistant.",
  },
  userManual: {
    title: "BIRD App User Manual",
    url: "https://user-manual.asilvainnovations.com",
    description: "Comprehensive user guide for the BIRD strategic planning application.",
  },
  contact: {
    title: "Contact",
    url: "https://bird-contact.asilvainnovations.com",
    description: "Contact page for the Bangsamoro Board of Investments - Ministry of Trade, Investment and Tourism.",
  },
  actorsValueMap: {
    title: "Actors and Value Map",
    url: "https://bird-actors-value-map.asilvainnovations.com",
    description: "Interactive map of stakeholders and value chains in the Bangsamoro investment ecosystem.",
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════
export type BIRDVideo = typeof BIRD_VIDEOS[keyof typeof BIRD_VIDEOS];
export type BIRDImage = typeof BIRD_IMAGES[keyof typeof BIRD_IMAGES];
export type BIRDSite = typeof BIRD_SITES[keyof typeof BIRD_SITES];

// ══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════
/** Get all images for a specific section ID */
export function getImagesForSection(sectionId: string): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.section === sectionId);
}

/** Get all videos for a specific section ID */
export function getVideosForSection(sectionId: string): BIRDVideo[] {
  return Object.values(BIRD_VIDEOS).filter(vid => vid.section === sectionId);
}

/** Get images by category */
export function getImagesByCategory(category: BIRDImage["category"]): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === category);
}

// ── Category-specific shortcuts ──────────────────────────────────────────────
export function getArchetypeImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "archetype");
}

export function getClusterImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "cluster");
}

export function getProvincialImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img =>
    img.category === "provincial" || img.category === "provincial-outlook"
  );
}

export function getConnectivityImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "connectivity");
}

export function getFrameworkImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "framework");
}

export function getSystemsImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "systems");
}

export function getLeverageImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "leverage");
}

export function getRoadmapImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "roadmap");
}

export function getSurveyImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "survey");
}

export function getMetricsImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "metrics");
}

export function getGovernanceImages(): BIRDImage[] {
  return Object.values(BIRD_IMAGES).filter(img => img.category === "governance");
}

// ── Search & discovery ───────────────────────────────────────────────────────
/** Search images by keyword in title, alt, or description */
export function searchImages(query: string): BIRDImage[] {
  const q = query.toLowerCase();
  return Object.values(BIRD_IMAGES).filter(
    img =>
      img.title.toLowerCase().includes(q) ||
      img.alt.toLowerCase().includes(q) ||
      (img as BIRDImage & { description?: string }).description?.toLowerCase().includes(q)
  );
}

/** Get total counts for dashboard display */
export function getMediaCounts() {
  return {
    videos: Object.keys(BIRD_VIDEOS).length,
    images: Object.keys(BIRD_IMAGES).length,
    sites: Object.keys(BIRD_SITES).length,
    sections: new Set(Object.values(BIRD_IMAGES).map(i => i.section)).size,
  };
}

/** Get all available sections that have content */
export function getAvailableSections(): string[] {
  const sections = new Set<string>();
  Object.values(BIRD_IMAGES).forEach(img => sections.add(img.section));
  Object.values(BIRD_VIDEOS).forEach(vid => sections.add(vid.section));
  return Array.from(sections).sort();
}

// ─── EXTERNAL APP URLS ─────────────────────────────────────────────────────
/** Canonical URL of the standalone BIRD Validation Survey app. */
export const VALIDATION_SURVEY_URL = BIRD_SITES.validationSurvey.url;

/** Open an external URL in a new, safe browser tab. */
export function openExternal(url: string) {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

/** Open the standalone Validation Survey in a new tab. */
export function openValidationSurvey() {
  openExternal(VALIDATION_SURVEY_URL);
}
