// src/components/strategic/Section7_Connectors.tsx
// BIRD 2026–2035 · Section 7: Cluster 4 — Connectors
// Updated: 2026-07-23 · Strict shadcn/ui components, comprehensive images & SWOT

import React from "react";
import { Globe, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SurveySchemaType } from "@/lib/survey-schema";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type Section7Data = Pick<
  SurveySchemaType,
  | "q_s7_bimpeaga_loc_impact"
  | "q_s7_bimpeaga_loc_likelihood"
  | "q_s7_domestic_halal_impact"
  | "q_s7_domestic_halal_likelihood"
  | "q_s7_polloc_impact"
  | "q_s7_polloc_likelihood"
  | "q_s7_islamic_finance_impact"
  | "q_s7_islamic_finance_likelihood"
  | "q_s7_infra_deficits_impact"
  | "q_s7_infra_deficits_likelihood"
  | "q_s7_fragmented_policy_impact"
  | "q_s7_fragmented_policy_likelihood"
  | "q_s7_market_linkages_impact"
  | "q_s7_market_linkages_likelihood"
  | "q_s7_tech_adoption_impact"
  | "q_s7_tech_adoption_likelihood"
  | "q_s7_asean_halal_impact"
  | "q_s7_asean_halal_likelihood"
  | "q_s7_bimpeaga_integration_impact"
  | "q_s7_bimpeaga_integration_likelihood"
  | "q_s7_uae_corridor_impact"
  | "q_s7_uae_corridor_likelihood"
  | "q_s7_tourism_potential_impact"
  | "q_s7_tourism_potential_likelihood"
  | "q_s7_halal_competition_impact"
  | "q_s7_halal_competition_likelihood"
  | "q_s7_security_incidents_impact"
  | "q_s7_security_incidents_likelihood"
  | "q_s7_price_volatility_impact"
  | "q_s7_price_volatility_likelihood"
  | "q_s7_natl_coord_impact"
  | "q_s7_natl_coord_likelihood"
  | "q_s7_escalation"
  | "q_s7_escalation_followup"
  | "q_s7_limits_growth"
  | "q_s7_limits_followup"
  | "q7_1_connectivity_priority"
  | "q7_2_integration_challenge"
  | "q7_3_priority_node"
  | "q7_4_trapped_value_province"
  | "q7_5_bridge_impact"
  | "q7_6_gateway_province"
  | "q7_7_priority_vector"
  | "q7_8_uae_feasibility"
  | "q7_9_bimpeaga_leverage"
>;

interface Section7Props {
  data: Section7Data;
  onChange: (data: Section7Data) => void;
}

export const Section7_Connectors: React.FC<Section7Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section7Data>(field: K, value: Section7Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  const activeBtn = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90";
  const inactiveBtn = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";
  const activeScale = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
  const inactiveScale = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";

  const swotFactors = [
    // Strengths
    {
      id: "bimpeaga_loc",
      label: "S2: Strategic BIMP-EAGA Location",
      desc: "BARMM is close to Sabah and ASEAN trade routes, making it a natural gateway for regional trade.",
      impactField: "q_s7_bimpeaga_loc_impact" as keyof Section7Data,
      likelihoodField: "q_s7_bimpeaga_loc_likelihood" as keyof Section7Data,
    },
    {
      id: "domestic_halal",
      label: "S4: Large Domestic Halal Market",
      desc: "5.69 million Muslim consumers create strong built-in local demand for halal products and services.",
      impactField: "q_s7_domestic_halal_impact" as keyof Section7Data,
      likelihoodField: "q_s7_domestic_halal_likelihood" as keyof Section7Data,
    },
    {
      id: "polloc",
      label: "S6: Polloc Freeport & Economic Zone",
      desc: "Strategic logistics and trade hub serving as a gateway for goods entering and leaving BARMM.",
      impactField: "q_s7_polloc_impact" as keyof Section7Data,
      likelihoodField: "q_s7_polloc_likelihood" as keyof Section7Data,
    },
    // Weaknesses
    {
      id: "infra_deficits",
      label: "W1: Critical Infrastructure Deficits",
      desc: "Gaps in energy, roads, digital connectivity, and water supply — especially in island provinces.",
      impactField: "q_s7_infra_deficits_impact" as keyof Section7Data,
      likelihoodField: "q_s7_infra_deficits_likelihood" as keyof Section7Data,
    },
    {
      id: "fragmented_policy",
      label: "W6: Fragmented Policy Frameworks",
      desc: "Different ministries lack coordination, causing delays and underspending.",
      impactField: "q_s7_fragmented_policy_impact" as keyof Section7Data,
      likelihoodField: "q_s7_fragmented_policy_likelihood" as keyof Section7Data,
    },
    {
      id: "market_linkages",
      label: "W9: Weak Market Linkages",
      desc: "Farmers and producers struggle to find buyers and get fair price information.",
      impactField: "q_s7_market_linkages_impact" as keyof Section7Data,
      likelihoodField: "q_s7_market_linkages_likelihood" as keyof Section7Data,
    },
    {
      id: "tech_adoption",
      label: "W10: Low Technology Adoption",
      desc: "Slow uptake of modern tools for farming, processing, and online selling.",
      impactField: "q_s7_tech_adoption_impact" as keyof Section7Data,
      likelihoodField: "q_s7_tech_adoption_likelihood" as keyof Section7Data,
    },
    // Opportunities
    {
      id: "asean_halal",
      label: "O3: ASEAN Halal Economy",
      desc: "USD 1.38 trillion market. BARMM can target a share through BIMP-EAGA corridor and halal parks.",
      impactField: "q_s7_asean_halal_impact" as keyof Section7Data,
      likelihoodField: "q_s7_asean_halal_likelihood" as keyof Section7Data,
    },
    {
      id: "bimpeaga_integration",
      label: "O5: BIMP-EAGA Regional Integration",
      desc: "Cross-border trade agreements and eco-corridors with Sabah can open new markets.",
      impactField: "q_s7_bimpeaga_integration_impact" as keyof Section7Data,
      likelihoodField: "q_s7_bimpeaga_integration_likelihood" as keyof Section7Data,
    },
    {
      id: "uae_corridor",
      label: "O6: UAE/GCC Halal Export Corridor",
      desc: "Partnerships like MAFAR-Prime Group connect BARMM producers directly to Middle East buyers.",
      impactField: "q_s7_uae_corridor_impact" as keyof Section7Data,
      likelihoodField: "q_s7_uae_corridor_likelihood" as keyof Section7Data,
    },
    {
      id: "tourism_potential",
      label: "O11: Tourism Recovery Potential",
      desc: "Isabela City named Tourism Champion 2024; Lake Lanao has untapped eco-tourism potential.",
      impactField: "q_s7_tourism_potential_impact" as keyof Section7Data,
      likelihoodField: "q_s7_tourism_potential_likelihood" as keyof Section7Data,
    },
    // Threats
    {
      id: "halal_competition",
      label: "T2: Competition from Established Halal Hubs",
      desc: "Malaysia, Indonesia, and Thailand already dominate the halal market.",
      impactField: "q_s7_halal_competition_impact" as keyof Section7Data,
      likelihoodField: "q_s7_halal_competition_likelihood" as keyof Section7Data,
    },
    {
      id: "security_incidents",
      label: "T4: Residual Security Incidents",
      desc: "Clan conflicts and armed groups create fear among investors and tourists.",
      impactField: "q_s7_security_incidents_impact" as keyof Section7Data,
      likelihoodField: "q_s7_security_incidents_likelihood" as keyof Section7Data,
    },
    {
      id: "price_volatility",
      label: "T7: Global Market Price Volatility",
      desc: "World prices for rubber, coconut, and seaweed fluctuate often.",
      impactField: "q_s7_price_volatility_impact" as keyof Section7Data,
      likelihoodField: "q_s7_price_volatility_likelihood" as keyof Section7Data,
    },
    {
      id: "natl_coord",
      label: "T8: Limited National Government Coordination",
      desc: "Gaps in funding and alignment with national programs leave BARMM behind.",
      impactField: "q_s7_natl_coord_impact" as keyof Section7Data,
      likelihoodField: "q_s7_natl_coord_likelihood" as keyof Section7Data,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Globe className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 7: Cluster 4 — Connectors: Linking Local Value to Global Demand
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        The Connectors cluster maps how Bangsamoro connects its halal and cultural assets to international markets through BIMP-EAGA and UAE/GCC trade corridors.
      </p>

      {/* 1. Cluster Banner Image */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.cluster4Connectors.url}
          alt={BIRD_IMAGES.cluster4Connectors.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            Cluster 4 | Connectors: Linking Local Value to Global Demand
          </p>
        </div>
      </div>

      {/* 2. Connectivity Capital Matrix */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
            The Connectivity Capital Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/The%20Connectivity%20Capital%20.png"
              alt="The Connectivity Capital Matrix"
              className="w-full h-auto max-h-[500px] object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            Three pillars define Bangsamoro's infrastructure and digital investment priorities: 
            <strong> Physical Pipelines</strong> (₱627M MPW projects, 1,000km farm-to-market roads), 
            <strong> Digital Backbones</strong> (fiber-optic, e-governance, 1-day business registration by 2028), 
            <strong> Market-Access Assets</strong> (cold-chain in Tawi-Tawi, 10 provincial port upgrades).
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            Which connectivity pillar should receive the highest priority investment?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {["Physical pipelines (roads, ports)", "Digital backbones (broadband, e-gov)", "Market-access assets (cold-chain, logistics)"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q7_1_connectivity_priority === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q7_1_connectivity_priority", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. Critical Test - Integrating Zones */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
            The Critical Test: Integrating Zones & Scaling Capital
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/Critical%20Test%20-%20Integrating%20Zones%20and%20Scaling%20Capiral%20-%20Think%20of%20one%20challenge%20%20we%20must%20overcome%20to%20achieve%20this%20vision.png"
              alt="The Critical Test: Integrating Zones & Scaling Capital"
              className="w-full h-auto max-h-[500px] object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            The Connectivity Map (Basilan-Zamboanga Bridge, Polloc Freeport, UAE Halal Export Corridors) and the Ethical Bloodstream Pyramid (Islamic Banking & Sukuk, Takaful, Microfinance & Waqf) show that true integration requires both physical and financial connectivity.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            What is the single biggest challenge to integrating BARMM's economic zones with global trade corridors?
          </Label>
          <Textarea
            rows={3}
            value={data.q7_2_integration_challenge || ""}
            onChange={(e) => update("q7_2_integration_challenge", e.target.value)}
            placeholder="Describe the biggest integration challenge..."
            className="w-full border-[#C9A84C]/30"
          />
        </CardContent>
      </Card>

      {/* 4. Layer 1 - Provincial Specialized Nodes */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
            Layer 1: Provincial Specialized Nodes — "One Bangsamoro"
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Layer%201%20-%20Provincial%20-%20Geopolitical%20Specialized%20Nodes.png"
              alt="Layer 1 - Provincial Specialized Nodes"
              className="w-full h-auto max-h-[500px] object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            Six provincial hubs: <strong>Mainland</strong> (Maguindanao del Norte & Cotabato — Admin/Halal Hub, Maguindanao del Sur — Agri-Industrial Breadbasket, Lanao del Sur — Clean Energy & Agro-Hub, SGA — Agro-Industrial Corridor) and <strong>Archipelagic</strong> (Basilan — Logistics Gateway, Tawi-Tawi — Maritime Gateway).
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            Which provincial node should be the highest priority for connectivity investment?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {["Maguindanao del Norte (Polloc/Halal Hub)", "Maguindanao del Sur (Agro-Industrial)", "Lanao del Sur (Energy/Agro)", "Basilan (Logistics Gateway)", "Tawi-Tawi (Maritime Gateway)", "SGA (Mindanao Bridge)"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q7_3_priority_node === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q7_3_priority_node", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 5. The Trapped Value */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
            The Trapped Value: Geographic Reality
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/The%20Trapped%20Value.png"
              alt="The Trapped Value"
              className="w-full h-auto max-h-[500px] object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            Shows how limited connectivity traps economic potential — Basilan's 48,386ha rubber and Tawi-Tawi's 40% of national seaweed output isolated from global trade. The Law of Sequencing highlights the Zamboanga-Basilan Interconnection and digital backbones as essential unlock steps.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            Which trapped-value province would benefit most from immediate connectivity investment?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {["Basilan (rubber, aquaculture)", "Tawi-Tawi (seaweed, BIMP-EAGA)", "Sulu (fisheries, tourism)", "Lanao del Sur (energy, agriculture)"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q7_4_trapped_value_province === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q7_4_trapped_value_province", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 6. Shattering Geographic Isolation */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
            Shattering Geographic Isolation: The Archipelagic Bridge
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Shattering%20Geographical%20Isolation.png"
              alt="Shattering Geographic Isolation"
              className="w-full h-auto max-h-[500px] object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            Three key initiatives: <strong>Zamboanga–Basilan Interconnection</strong> (6.67B, 69kV transmission), <strong>Basilan–Zamboanga Bridge</strong> (31km corridor by 2030), <strong>Bongao Bridge Tawi-Tawi</strong> (541m span). Systemic interventions improving market access and labor mobility.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            Which bridge/interconnection project will have the most transformative impact on Bangsamoro's economy?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {["Zamboanga-Basilan Interconnection (energy)", "Basilan-Zamboanga Bridge (transport)", "Bongao Bridge Tawi-Tawi (intra-provincial)"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q7_5_bridge_impact === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q7_5_bridge_impact", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 7. Basilan and Tawi-Tawi */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
            Basilan and Tawi-Tawi: Provincial Endowments & Strategic Leverages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Basilan%20and%20tawi-Tawi.png"
              alt="Basilan and Tawi-Tawi"
              className="w-full h-auto max-h-[500px] object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            <strong>Basilan — The Archipelagic Catalyst:</strong> 48,366ha rubber, coastal aquaculture, ZBIP power project, Basilan-Zamboanga Bridge. <strong>Tawi-Tawi — The Maritime & Eco-Tourism Hub:</strong> BIMP-EAGA location, marine biodiversity, maritime gateway for trade and blue economy.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            Which province — Basilan or Tawi-Tawi — has greater potential to become Bangsamoro's primary maritime trade gateway?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {["Basilan (rubber, ZBIP, closer to Mindanao)", "Tawi-Tawi (seaweed, BIMP-EAGA, direct Sabah route)", "Both equally — they serve different corridors"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q7_6_gateway_province === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q7_6_gateway_province", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 8. Global Integration Vectors */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
            Layer 3: Global Integration Vectors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Global%20Integration%20Vectors.png"
              alt="Global Integration Vectors"
              className="w-full h-auto max-h-[500px] object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            <strong>Vector 1 — BIMP-EAGA Corridor:</strong> proximity-based maritime trade, 3% of ASEAN halal market via Tawi-Tawi. <strong>Vector 2 — UAE & GCC Corridor:</strong> standards-based air/sea logistics, $2.3T global halal market via Polloc Freeport and OIC/SMIIC accreditation.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            Which global integration vector should Bangsamoro prioritize?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {["BIMP-EAGA (regional, proximity-based, lower barriers)", "UAE/GCC (global, higher value, standards-based)", "Both simultaneously — they complement each other"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q7_7_priority_vector === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q7_7_priority_vector", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 9. UAE & GCC Connectivity */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
            BARMM Connectivity vis-à-vis UAE & GCC
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/UAE%20&%20GCC.png"
              alt="UAE & GCC Connectivity"
              className="w-full h-auto max-h-[500px] object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            Three hubs linked to $2.3T global halal market: <strong>Basilan</strong> (₱23.15B GDP, Archipelagic Logistics Gateway, ZBIP), <strong>Maguindanao del Norte</strong> (₱81.91B GDP, Admin & Halal Hub, Polloc), <strong>Maguindanao del Sur</strong> (₱39.54B GDP, Agri-Industrial Breadbasket).
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            How realistic is BARMM's goal of capturing a meaningful share of the UAE/GCC halal market by 2030?
          </Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((v) => (
              <Button
                key={v}
                type="button"
                variant="outline"
                size="icon"
                className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q7_8_uae_feasibility === v ? activeScale : inactiveScale)}
                onClick={() => update("q7_8_uae_feasibility", v)}
              >
                {v}
              </Button>
            ))}
          </div>
          <p className="text-xs text-[#065f46]">1 = Not realistic, 5 = Very realistic</p>
        </CardContent>
      </Card>

      {/* 10. BIMP-EAGA Connectivity Map */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
            BARMM Strategic Connectivity Map
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/BARMM%20Connectivity-BIMP-EAGA.png"
              alt="BARMM Strategic Connectivity Map"
              className="w-full h-auto max-h-[500px] object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            Tawi-Tawi and Basilan as maritime gateways feeding BIMP-EAGA. Maguindanao del Norte and Polloc Freeport as halal export centers to UAE/GCC. Maguindanao del Sur and Lanao del Sur as inland production zones.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            On a scale of 1–5, how effectively is Bangsamoro leveraging the BIMP-EAGA corridor for regional trade?
          </Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((v) => (
              <Button
                key={v}
                type="button"
                variant="outline"
                size="icon"
                className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q7_9_bimpeaga_leverage === v ? activeScale : inactiveScale)}
                onClick={() => update("q7_9_bimpeaga_leverage", v)}
              >
                {v}
              </Button>
            ))}
          </div>
          <p className="text-xs text-[#065f46]">1 = Not effectively, 5 = Very effectively</p>
        </CardContent>
      </Card>

      {/* 11. SWOT Scale Questions */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
              SWOT
            </span>
            Connectors Cluster: Strengths, Weaknesses, Opportunities, Threats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-xs text-[#065f46] italic">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          {swotFactors.map((factor, idx) => (
            <div key={factor.id} className={cn("space-y-3", idx < swotFactors.length - 1 && "pb-6 border-b border-[#C9A84C]/20")}>
              <p className="text-sm font-medium text-[#022c22]">
                <strong>{factor.label}.</strong> {factor.desc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46]">Impact (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button
                        key={v}
                        type="button"
                        variant="outline"
                        size="icon"
                        className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data[factor.impactField] === v ? activeScale : inactiveScale)}
                        onClick={() => update(factor.impactField, v)}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46]">Likelihood (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button
                        key={v}
                        type="button"
                        variant="outline"
                        size="icon"
                        className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data[factor.likelihoodField] === v ? activeScale : inactiveScale)}
                        onClick={() => update(factor.likelihoodField, v)}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 12. Systems Archetype: Escalation */}
      <Card className="border-2 border-amber-500/40 bg-amber-50/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Archetype: Escalation (Cycles of Exclusion & Retaliation)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Cycles%20of%20Exclusion%20and%20Retaliation.png"
              alt="Escalation Archetype"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            When one group perceives a threat, it mobilizes to protect its interests — triggering counter-mobilization. The result is a reinforcing cycle of competitive spirals that diverts resources from productive development to contestation.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            How accurately does the &quot;Escalation&quot; archetype reflect competitive dynamics among clans, provinces, or agencies competing for trade corridors and connectivity investments in BARMM?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q_s7_escalation === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q_s7_escalation", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
          {(data.q_s7_escalation === "Very accurately" || data.q_s7_escalation === "Somewhat accurately") && (
            <div className="mt-4 pt-4 border-t border-[#C9A84C]/20 space-y-3">
              <Label className="text-sm font-medium text-[#022c22] block">
                In which domain do you see this most clearly?
              </Label>
              <Textarea
                rows={2}
                value={data.q_s7_escalation_followup || ""}
                onChange={(e) => update("q_s7_escalation_followup", e.target.value)}
                placeholder="Describe where you see escalation dynamics most clearly..."
                className="w-full border-[#C9A84C]/30"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* 13. Systems Archetype: Limits to Growth */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Archetype: Limits to Growth
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/9LtG.png"
              alt="Limits to Growth Archetype"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            Trade and connectivity growth encounters balancing loops — infrastructure gaps, security concerns, and funding limits slow progress despite initial gains from BIMP-EAGA and UAE partnerships.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            How accurately does &quot;Limits to Growth&quot; describe the barriers facing BARMM's trade corridor expansion and connectivity build-out?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q_s7_limits_growth === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q_s7_limits_growth", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
          {(data.q_s7_limits_growth === "Very accurately" || data.q_s7_limits_growth === "Somewhat accurately") && (
            <div className="mt-4 pt-4 border-t border-[#C9A84C]/20 space-y-3">
              <Label className="text-sm font-medium text-[#022c22] block">
                Which bottleneck is most limiting?
              </Label>
              <Textarea
                rows={2}
                value={data.q_s7_limits_followup || ""}
                onChange={(e) => update("q_s7_limits_followup", e.target.value)}
                placeholder="Describe the most limiting bottleneck..."
                className="w-full border-[#C9A84C]/30"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Section7_Connectors;
