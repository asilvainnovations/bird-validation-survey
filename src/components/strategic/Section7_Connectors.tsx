// src/components/strategic/Section7_Connectors.tsx
// BIRD 2026–2035 · Section 7: Cluster 4 — Connectors
// Updated: 2026-07-30 · Strict alignment with reusable primitives and survey architecture

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Globe } from "lucide-react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import { ARCHETYPES_BY_SECTION } from "@/lib/swot-content";

// ─── REUSABLE PRIMITIVES ─────────────────────────────────────────────────────
import { ImageWithFallback } from "@/components/primitives/ImageWithFallback";
import { ArchetypeCard } from "@/components/primitives/ArchetypeCard";
import { SWOTScalePair } from "@/components/primitives/SWOTScalePair";
import { LikertScale } from "@/components/primitives/LikertScale";
import { SectionProgress } from "@/components/primitives/SectionProgress";

// ── Types (exact runtime contract with SurveyWizard.tsx s7 state) ────────────
export interface Section7Data {
  q7_1_connectivity_priority: string;
  q7_2_integration_challenge: string;
  q7_3_priority_node: string;
  q7_4_trapped_value_province: string;
  q7_5_bridge_impact: string;
  q7_6_gateway_province: string;
  q7_7_priority_vector: string;
  q7_8_uae_feasibility?: number;
  q7_9_bimpeaga_leverage?: number;
  q_s7_bimpeaga_loc_impact?: number;
  q_s7_bimpeaga_loc_likelihood?: number;
  q_s7_domestic_halal_impact?: number;
  q_s7_domestic_halal_likelihood?: number;
  q_s7_polloc_impact?: number;
  q_s7_polloc_likelihood?: number;
  q_s7_islamic_finance_impact?: number;
  q_s7_islamic_finance_likelihood?: number;
  q_s7_infra_deficits_impact?: number;
  q_s7_infra_deficits_likelihood?: number;
  q_s7_fragmented_policy_impact?: number;
  q_s7_fragmented_policy_likelihood?: number;
  q_s7_market_linkages_impact?: number;
  q_s7_market_linkages_likelihood?: number;
  q_s7_tech_adoption_impact?: number;
  q_s7_tech_adoption_likelihood?: number;
  q_s7_asean_halal_impact?: number;
  q_s7_asean_halal_likelihood?: number;
  q_s7_bimpeaga_integration_impact?: number;
  q_s7_bimpeaga_integration_likelihood?: number;
  q_s7_uae_corridor_impact?: number;
  q_s7_uae_corridor_likelihood?: number;
  q_s7_tourism_potential_impact?: number;
  q_s7_tourism_potential_likelihood?: number;
  q_s7_halal_competition_impact?: number;
  q_s7_halal_competition_likelihood?: number;
  q_s7_security_incidents_impact?: number;
  q_s7_security_incidents_likelihood?: number;
  q_s7_price_volatility_impact?: number;
  q_s7_price_volatility_likelihood?: number;
  q_s7_natl_coord_impact?: number;
  q_s7_natl_coord_likelihood?: number;
  q_s7_escalation: string;
  q_s7_escalation_followup: string;
  q_s7_limits_growth: string;
  q_s7_limits_followup: string;
}

interface Section7Props {
  data: Section7Data;
  onChange: (data: Section7Data) => void;
}

// Design tokens for custom selection buttons
const activeBtn =
  "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 dark:bg-[#1B4D3E] dark:text-white dark:border-[#1B4D3E]";
const inactiveBtn =
  "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#ecfdf5]/30 dark:hover:bg-[#C9A84C]/10";

export const Section7_Connectors: React.FC<Section7Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section7Data>(field: K, value: Section7Data[K]) => 
    onChange({ ...data, [field]: value });

  return (
    <div className="space-y-8">
      {/* ── Section Progress ────────────────────────────────────── */}
      <SectionProgress 
        current={7} 
        total={16} 
        labels={[
          "Welcome", "Privacy", "Profile", "Systems", "Foundations", 
          "Transformers", "Enablers", "Connectors", "Financiers", 
          "Operating Systems", "IEDS", "Metrics", "BSC", "Budget", 
          "Resources", "Submit"
        ]} 
      />

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <Globe className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
          Section 7: Cluster 4 — Connectors
        </2>
      </div>
      <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 -mt-2 max-w-3xl">
        The Connectors cluster maps how Bangsamoro connects its halal and cultural assets to international markets through BIMP-EAGA and UAE/GCC trade corridors.
      </p>

      {/* ── 1. Cluster Banner Image ─────────────────────────────── */}
      <ImageWithFallback
        src={BIRD_IMAGES.cluster4Connectors?.url || ""}
        alt={BIRD_IMAGES.cluster4Connectors?.alt || "Cluster 4 Connectors Banner"}
        description={BIRD_IMAGES.cluster4Connectors?.description || "Bangsamoro connectivity and trade corridors."}
        className="w-full h-auto max-h-[500px] object-contain rounded-xl border border-[#C9A84C]/30 shadow-lg"
      />

      {/* ── 2. Archetype Validation ─────────────────────────────── */}
      {ARCHETYPES_BY_SECTION[7]?.map((archetype, idx) => {
        const field = archetype.field as keyof Section7Data;
        const followUpField = `${field}_followup` as keyof Section7Data;
        return (
          <ArchetypeCard
            key={idx}
            archetype={archetype}
            value={data[field] as string}
            onChange={(val) => update(field, val)}
            followUpValue={data[followUpField] as string}
            onFollowUpChange={(val) => update(followUpField, val)}
          />
        );
      })}

      {/* ── 3. SWOT Scale Table ─────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              SWOT
            </span>
            Connectors Cluster: Strengths, Weaknesses, Opportunities, Threats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>

          {/* Strengths */}
          <SWOTScalePair
            factorLabel="S1 — Strategic BIMP-EAGA Location"
            description="BARMM is close to Sabah and ASEAN trade routes, making it a natural gateway for regional trade."
            impact={data.q_s7_bimpeaga_loc_impact}
            likelihood={data.q_s7_bimpeaga_loc_likelihood}
            onImpactChange={(v) => update("q_s7_bimpeaga_loc_impact", v)}
            onLikelihoodChange={(v) => update("q_s7_bimpeaga_loc_likelihood", v)}
            category="strength"
          />
          <SWOTScalePair
            factorLabel="S4 — Large Domestic Halal Market"
            description="5.69 million Muslim consumers create strong built-in local demand for halal products and services."
            impact={data.q_s7_domestic_halal_impact}
            likelihood={data.q_s7_domestic_halal_likelihood}
            onImpactChange={(v) => update("q_s7_domestic_halal_impact", v)}
            onLikelihoodChange={(v) => update("q_s7_domestic_halal_likelihood", v)}
            category="strength"
          />
          <SWOTScalePair
            factorLabel="S6 — Polloc Freeport & Economic Zone"
            description="Strategic logistics and trade hub serving as a gateway for goods entering and leaving BARMM."
            impact={data.q_s7_polloc_impact}
            likelihood={data.q_s7_polloc_likelihood}
            onImpactChange={(v) => update("q_s7_polloc_impact", v)}
            onLikelihoodChange={(v) => update("q_s7_polloc_likelihood", v)}
            category="strength"
          />

          {/* Weaknesses */}
          <SWOTScalePair
            factorLabel="W1 — Critical Infrastructure Deficits"
            description="Gaps in energy, roads, digital connectivity, and water supply — especially in island provinces."
            impact={data.q_s7_infra_deficits_impact}
            likelihood={data.q_s7_infra_deficits_likelihood}
            onImpactChange={(v) => update("q_s7_infra_deficits_impact", v)}
            onLikelihoodChange={(v) => update("q_s7_infra_deficits_likelihood", v)}
            category="weakness"
          />
          <SWOTScalePair
            factorLabel="W6 — Fragmented Policy Frameworks"
            description="Different ministries lack coordination, causing delays and underspending in connectivity projects."
            impact={data.q_s7_fragmented_policy_impact}
            likelihood={data.q_s7_fragmented_policy_likelihood}
            onImpactChange={(v) => update("q_s7_fragmented_policy_impact", v)}
            onLikelihoodChange={(v) => update("q_s7_fragmented_policy_likelihood", v)}
            category="weakness"
          />
          <SWOTScalePair
            factorLabel="W9 — Weak Market Linkages"
            description="Farmers and producers struggle to find buyers and get fair price information for exports."
            impact={data.q_s7_market_linkages_impact}
            likelihood={data.q_s7_market_linkages_likelihood}
            onImpactChange={(v) => update("q_s7_market_linkages_impact", v)}
            onLikelihoodChange={(v) => update("q_s7_market_linkages_likelihood", v)}
            category="weakness"
          />
          <SWOTScalePair
            factorLabel="W10 — Low Technology Adoption"
            description="Slow uptake of modern tools for farming, processing, and online selling across the trade corridor."
            impact={data.q_s7_tech_adoption_impact}
            likelihood={data.q_s7_tech_adoption_likelihood}
            onImpactChange={(v) => update("q_s7_tech_adoption_impact", v)}
            onLikelihoodChange={(v) => update("q_s7_tech_adoption_likelihood", v)}
            category="weakness"
          />

          {/* Opportunities */}
          <SWOTScalePair
            factorLabel="O2 — ASEAN Halal Economy"
            description="USD 1.38 trillion addressable market; BARMM can target a share through BIMP-EAGA corridor and halal parks."
            impact={data.q_s7_asean_halal_impact}
            likelihood={data.q_s7_asean_halal_likelihood}
            onImpactChange={(v) => update("q_s7_asean_halal_impact", v)}
            onLikelihoodChange={(v) => update("q_s7_asean_halal_likelihood", v)}
            category="opportunity"
          />
          <SWOTScalePair
            factorLabel="O3 — BIMP-EAGA Regional Integration"
            description="Cross-border trade agreements and eco-corridors with Sabah can open new markets for Bangsamoro producers."
            impact={data.q_s7_bimpeaga_integration_impact}
            likelihood={data.q_s7_bimpeaga_integration_likelihood}
            onImpactChange={(v) => update("q_s7_bimpeaga_integration_impact", v)}
            onLikelihoodChange={(v) => update("q_s7_bimpeaga_integration_likelihood", v)}
            category="opportunity"
          />
          <SWOTScalePair
            factorLabel="O4 — UAE/GCC Halal Export Corridor"
            description="Partnerships like MAFAR-Prime Group connect BARMM producers directly to Middle East buyers."
            impact={data.q_s7_uae_corridor_impact}
            likelihood={data.q_s7_uae_corridor_likelihood}
            onImpactChange={(v) => update("q_s7_uae_corridor_impact", v)}
            onLikelihoodChange={(v) => update("q_s7_uae_corridor_likelihood", v)}
            category="opportunity"
          />
          <SWOTScalePair
            factorLabel="O5 — Mindanao Central Logistics Land-Bridge"
            description="SGA serves as the primary land bridge connecting Polloc Freeport to General Santos and Davao export gateways."
            impact={data.q_s7_tourism_potential_impact}
            likelihood={data.q_s7_tourism_potential_likelihood}
            onImpactChange={(v) => update("q_s7_tourism_potential_impact", v)}
            onLikelihoodChange={(v) => update("q_s7_tourism_potential_likelihood", v)}
            category="opportunity"
          />

          {/* Threats */}
          <SWOTScalePair
            factorLabel="T1 — Competition from Halal Hubs"
            description="Malaysia, Indonesia, and Thailand already dominate the halal market with established certification and logistics."
            impact={data.q_s7_halal_competition_impact}
            likelihood={data.q_s7_halal_competition_likelihood}
            onImpactChange={(v) => update("q_s7_halal_competition_impact", v)}
            onLikelihoodChange={(v) => update("q_s7_halal_competition_likelihood", v)}
            category="threat"
          />
          <SWOTScalePair
            factorLabel="T3 — Residual Security Incidents"
            description="Clan conflicts and armed groups create fear among investors and tourists along trade corridors."
            impact={data.q_s7_security_incidents_impact}
            likelihood={data.q_s7_security_incidents_likelihood}
            onImpactChange={(v) => update("q_s7_security_incidents_impact", v)}
            onLikelihoodChange={(v) => update("q_s7_security_incidents_likelihood", v)}
            category="threat"
          />
          <SWOTScalePair
            factorLabel="T4 — Global Market Price Volatility"
            description="World prices for rubber, coconut, and seaweed fluctuate often, affecting producer incomes."
            impact={data.q_s7_price_volatility_impact}
            likelihood={data.q_s7_price_volatility_likelihood}
            onImpactChange={(v) => update("q_s7_price_volatility_impact", v)}
            onLikelihoodChange={(v) => update("q_s7_price_volatility_likelihood", v)}
            category="threat"
          />
          <SWOTScalePair
            factorLabel="T5 — Limited National Government Coordination"
            description="Gaps in funding and alignment with national programs leave BARMM connectivity projects behind schedule."
            impact={data.q_s7_natl_coord_impact}
            likelihood={data.q_s7_natl_coord_likelihood}
            onImpactChange={(v) => update("q_s7_natl_coord_impact", v)}
            onLikelihoodChange={(v) => update("q_s7_natl_coord_likelihood", v)}
            category="threat"
          />
        </CardContent>
      </Card>

      {/* ── 4. Additional Questions Tied to Specific Images ─────── */}
      
      {/* Q1: Connectivity Capital Matrix */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            The Connectivity Capital Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImageWithFallback 
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/The%20Connectivity%20Capital%20.png"
            alt="The Connectivity Capital Matrix"
            description="Three pillars define Bangsamoro's infrastructure and digital investment priorities: Physical Pipelines, Digital Backbones, Market-Access Assets."
            className="w-full h-auto max-h-[500px] object-contain rounded-xl border border-[#C9A84C]/30"
          />
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
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

      {/* Q2: Critical Test */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            The Critical Test: Integrating Zones & Scaling Capital
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImageWithFallback 
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/Critical%20Test%20-%20Integrating%20Zones%20and%20Scaling%20Capiral%20-%20Think%20of%20one%20challenge%20%20we%20must%20overcome%20to%20achieve%20this%20vision.png"
            alt="The Critical Test"
            description="The Connectivity Map and Ethical Bloodstream Pyramid show that true integration requires both physical and financial connectivity."
            className="w-full h-auto max-h-[500px] object-contain rounded-xl border border-[#C9A84C]/30"
          />
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            What is the single biggest challenge to integrating BARMM's economic zones with global trade corridors?
          </Label>
          <Textarea
            rows={3}
            value={data.q7_2_integration_challenge || ""}
            onChange={(e) => update("q7_2_integration_challenge", e.target.value)}
            placeholder="Describe the biggest integration challenge..."
            className="w-full rounded-lg border border-[#C9A84C]/30 bg-white dark:bg-[#022c22]/50 px-3 py-2 text-sm text-[#022c22] dark:text-[#ecfdf5] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 resize-y"
          />
        </CardContent>
      </Card>

      {/* Q3: Provincial Specialized Nodes */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Layer 1: Provincial Specialized Nodes — "One Bangsamoro"
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImageWithFallback 
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Layer%201%20-%20Provincial%20-%20Geopolitical%20Specialized%20Nodes.png"
            alt="Layer 1 - Provincial Specialized Nodes"
            description="Six provincial hubs: Mainland (Maguindanao del Norte & Cotabato, Maguindanao del Sur, Lanao del Sur, SGA) and Archipelagic (Basilan, Tawi-Tawi)."
            className="w-full h-auto max-h-[500px] object-contain rounded-xl border border-[#C9A84C]/30"
          />
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
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

      {/* Q4: The Trapped Value */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            The Trapped Value: Geographic Reality
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImageWithFallback 
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/The%20Trapped%20Value.png"
            alt="The Trapped Value"
            description="Shows how limited connectivity traps economic potential — Basilan's rubber and Tawi-Tawi's seaweed output isolated from global trade."
            className="w-full h-auto max-h-[500px] object-contain rounded-xl border border-[#C9A84C]/30"
          />
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
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

      {/* Q5: Shattering Geographic Isolation */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Shattering Geographic Isolation: The Archipelagic Bridge
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImageWithFallback 
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Shattering%20Geographical%20Isolation.png"
            alt="Shattering Geographic Isolation"
            description="Three key initiatives: Zamboanga–Basilan Interconnection, Basilan–Zamboanga Bridge, Bongao Bridge Tawi-Tawi."
            className="w-full h-auto max-h-[500px] object-contain rounded-xl border border-[#C9A84C]/30"
          />
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            Which bridge/interconnection project will have the most transformative impact?
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

      {/* Q6: Basilan and Tawi-Tawi */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Basilan and Tawi-Tawi: Provincial Endowments & Strategic Leverages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImageWithFallback 
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Basilan%20and%20tawi-Tawi.png"
            alt="Basilan and Tawi-Tawi"
            description="Basilan: Archipelagic Catalyst. Tawi-Tawi: Maritime & Eco-Tourism Hub."
            className="w-full h-auto max-h-[500px] object-contain rounded-xl border border-[#C9A84C]/30"
          />
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            Which province has greater potential to become Bangsamoro's primary maritime trade gateway?
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

      {/* Q7: Global Integration Vectors */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Layer 3: Global Integration Vectors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImageWithFallback 
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Global%20Integration%20Vectors.png"
            alt="Global Integration Vectors"
            description="Vector 1: BIMP-EAGA Corridor. Vector 2: UAE & GCC Corridor."
            className="w-full h-auto max-h-[500px] object-contain rounded-xl border border-[#C9A84C]/30"
          />
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
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
        </CardContent
