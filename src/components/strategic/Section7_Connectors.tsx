// src/components/strategic/Section7_Connectors.tsx
// BIRD 2026–2035 · Section 7: Cluster 4 — Connectors
// Updated: 2026-07-27 · Strict alignment with SurveyWizard.tsx, .md SWOT & archetypes

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MAGNITUDE_SCALE, LIKELIHOOD_SCALE } from "@/lib/scaleLabels";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  TrendingUp,
  Target,
  AlertTriangle,
} from "lucide-react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import { UNIVERSAL_QUESTIONS, universalFieldName } from "@/lib/universalQuestions";
import { LikertScale } from "@/lib/primitives/LikertScale";
import {
  calculateStrengthRI,
  calculateWeaknessRisk,
  calculateOpportunityRI,
  calculateThreatVI,
} from "@/lib/formulas";

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
  q7_arch_success_successful_accuracy: string;
  q7_arch_success_successful_followup: string;
  // Strengths
  q7_s1_bimpeaga_location_impact?: number;
  q7_s1_bimpeaga_location_likelihood?: number;
  // Opportunities
  q7_o1_global_halal_impact?: number;
  q7_o1_global_halal_likelihood?: number;
  q7_o2_asean_halal_impact?: number;
  q7_o2_asean_halal_likelihood?: number;
  q7_o3_bimpeaga_integration_impact?: number;
  q7_o3_bimpeaga_integration_likelihood?: number;
  q7_o4_uae_corridor_impact?: number;
  q7_o4_uae_corridor_likelihood?: number;
  q7_o5_landbridge_impact?: number;
  q7_o5_landbridge_likelihood?: number;
  // Threats
  q7_t1_halal_competition_impact?: number;
  q7_t1_halal_competition_likelihood?: number;
  q7_t2_economic_downturn_impact?: number;
  q7_t2_economic_downturn_likelihood?: number;
  q7_t3_price_volatility_impact?: number;
  q7_t3_price_volatility_likelihood?: number;
  // Universal cross-cluster questions (see src/lib/universalQuestions.ts)
  q7_universal_confidence?: number;
  q7_universal_readiness?: number;
  q7_universal_urgency?: number;
}

interface Section7Props {
  data: Section7Data;
  onChange: (data: Section7Data) => void;
}

// ── Design tokens ────────────────────────────────────────────────────────────
const activeBtn =
  "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 dark:bg-[#1B4D3E] dark:text-white dark:border-[#1B4D3E]";
const inactiveBtn =
  "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#ecfdf5]/30 dark:hover:bg-[#C9A84C]/10";
const activeScale =
  "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
const inactiveScale =
  "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]";

const archetypeOptions = [
  "Very accurately",
  "Somewhat accurately",
  "Needs revision",
  "Not accurate",
];

// ═══════════════════════════════════════════════════════════════════════════════
export const Section7_Connectors: React.FC<Section7Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section7Data>(
    field: K,
    value: Section7Data[K]
  ) => onChange({ ...data, [field]: value });

  const renderScale = (field: keyof Section7Data) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((v) => (
        <Button
          key={v}
          type="button"
          variant="outline"
          size="icon"
          className={cn(
            "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
            data[field] === v ? activeScale : inactiveScale
          )}
          onClick={() => update(field, v as any)}
        >
          {v}
        </Button>
      ))}
    </div>
  );

  const renderSwotPair = (
    label: string,
    desc: string,
    impactField: keyof Section7Data,
    likelihoodField: keyof Section7Data,
    category: "strength" | "weakness" | "opportunity" | "threat"
  ) => {
    const impact = data[impactField] as number | undefined;
    const likelihood = data[likelihoodField] as number | undefined;
    let score: number | null = null;
    let scoreLabel = "";
    let badgeClass = "";

    if (impact && likelihood) {
      switch (category) {
        case "strength":
          score = calculateStrengthRI(impact, likelihood);
          scoreLabel = "RI";
          badgeClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
          break;
        case "weakness":
          score = calculateWeaknessRisk(impact, likelihood);
          scoreLabel = "Risk";
          badgeClass = "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300";
          break;
        case "opportunity":
          score = calculateOpportunityRI(impact, likelihood);
          scoreLabel = "RI";
          badgeClass = "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300";
          break;
        case "threat":
          score = calculateThreatVI(impact, likelihood);
          scoreLabel = "VI";
          badgeClass = "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
          break;
      }
    }

    return (
      <div className="space-y-4 p-4 rounded-lg border border-[#C9A84C]/20 bg-emerald-50/40 dark:bg-[#1B4D3E]/10">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#C9A84C]" />
          <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            {label}
          </p>
          {score !== null && (
            <Badge variant="secondary" className={cn("ml-auto border", badgeClass)}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {scoreLabel}: {score.toFixed(2)}
            </Badge>
          )}
        </div>
        <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70">{desc}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs font-medium text-[#065f46] dark:text-[#ecfdf5]/70 mb-2 block">
              Impact
            </Label>
            <div className="grid grid-cols-5 gap-1">
              {[1, 2, 3, 4, 5].map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-auto flex-col gap-0.5 py-1.5 px-1 rounded-lg border text-xs font-semibold transition-all",
                    impact === v
                      ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                      : "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                  onClick={() => update(impactField, v as any)}
                >
                  <span>{v}</span>
                  <span className="text-[8px] font-normal leading-tight text-center">{MAGNITUDE_SCALE[v - 1].label}</span>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium text-[#065f46] dark:text-[#ecfdf5]/70 mb-2 block">
              Likelihood
            </Label>
            <div className="grid grid-cols-5 gap-1">
              {[1, 2, 3, 4, 5].map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-auto flex-col gap-0.5 py-1.5 px-1 rounded-lg border text-xs font-semibold transition-all",
                    likelihood === v
                      ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                      : "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                  onClick={() => update(likelihoodField, v as any)}
                >
                  <span>{v}</span>
                  <span className="text-[8px] font-normal leading-tight text-center">{LIKELIHOOD_SCALE[v - 1].label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <Globe className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
          Section 7: Cluster 4 — Connectors: Linking Local Value to Global Demand
        </h2>
      </div>
      <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 -mt-2 max-w-3xl">
        The Connectors cluster maps how Bangsamoro connects its halal and cultural assets to international markets through BIMP-EAGA and UAE/GCC trade corridors.
      </p>

      {/* ── 1. Cluster Banner Image ──────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.cluster4Connectors.url}
          alt={BIRD_IMAGES.cluster4Connectors.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            {BIRD_IMAGES.cluster4Connectors.description}
          </p>
        </div>
      </div>

      {/* ── 2. Connectivity Capital Matrix ───────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
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
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            Three pillars define Bangsamoro's infrastructure and digital investment priorities:
            <strong> Physical Pipelines</strong> (₱627M MPW projects, 1,000km farm-to-market roads),
            <strong> Digital Backbones</strong> (fiber-optic, e-governance, 1-day business registration by 2028),
            <strong> Market-Access Assets</strong> (cold-chain in Tawi-Tawi, 10 provincial port upgrades).
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            Which connectivity pillar should receive the highest priority investment?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {[
              "Physical pipelines (roads, ports)",
              "Digital backbones (broadband, e-gov)",
              "Market-access assets (cold-chain, logistics)",
            ].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left",
                  data.q7_1_connectivity_priority === opt ? activeBtn : inactiveBtn
                )}
                onClick={() => update("q7_1_connectivity_priority", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 3. Critical Test ─────────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
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
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            The Connectivity Map and Ethical Bloodstream Pyramid show that true integration requires both physical and financial connectivity.
          </p>
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

      {/* ── 4. Provincial Specialized Nodes ──────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
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
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            Six provincial hubs: <strong>Mainland</strong> (Maguindanao del Norte & Cotabato — Admin/Halal Hub, Maguindanao del Sur — Agri-Industrial Breadbasket, Lanao del Sur — Clean Energy & Agro-Hub, SGA — Agro-Industrial Corridor) and <strong>Archipelagic</strong> (Basilan — Logistics Gateway, Tawi-Tawi — Maritime Gateway).
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            Which provincial node should be the highest priority for connectivity investment?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {[
              "Maguindanao del Norte (Polloc/Halal Hub)",
              "Maguindanao del Sur (Agro-Industrial)",
              "Lanao del Sur (Energy/Agro)",
              "Basilan (Logistics Gateway)",
              "Tawi-Tawi (Maritime Gateway)",
              "SGA (Mindanao Bridge)",
            ].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left",
                  data.q7_3_priority_node === opt ? activeBtn : inactiveBtn
                )}
                onClick={() => update("q7_3_priority_node", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 5. The Trapped Value ─────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
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
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            Shows how limited connectivity traps economic potential — Basilan's 48,386ha rubber and Tawi-Tawi's 40% of national seaweed output isolated from global trade. The Law of Sequencing highlights the Zamboanga-Basilan Interconnection and digital backbones as essential unlock steps.
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            Which trapped-value province would benefit most from immediate connectivity investment?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {[
              "Basilan (rubber, aquaculture)",
              "Tawi-Tawi (seaweed, BIMP-EAGA)",
              "Sulu (fisheries, tourism)",
              "Lanao del Sur (energy, agriculture)",
            ].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left",
                  data.q7_4_trapped_value_province === opt ? activeBtn : inactiveBtn
                )}
                onClick={() => update("q7_4_trapped_value_province", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 6. Shattering Geographic Isolation ─────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
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
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            Three key initiatives: <strong>Zamboanga–Basilan Interconnection</strong> (6.67B, 69kV transmission), <strong>Basilan–Zamboanga Bridge</strong> (31km corridor by 2030), <strong>Bongao Bridge Tawi-Tawi</strong> (541m span). Systemic interventions improving market access and labor mobility.
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            Which bridge/interconnection project will have the most transformative impact?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {[
              "Zamboanga-Basilan Interconnection (energy)",
              "Basilan-Zamboanga Bridge (transport)",
              "Bongao Bridge Tawi-Tawi (intra-provincial)",
            ].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left",
                  data.q7_5_bridge_impact === opt ? activeBtn : inactiveBtn
                )}
                onClick={() => update("q7_5_bridge_impact", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 7. Basilan and Tawi-Tawi ─────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
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
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            <strong>Basilan — The Archipelagic Catalyst:</strong> 48,366ha rubber, coastal aquaculture, ZBIP power project, Basilan-Zamboanga Bridge. <strong>Tawi-Tawi — The Maritime & Eco-Tourism Hub:</strong> BIMP-EAGA location, marine biodiversity, maritime gateway for trade and blue economy.
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            Which province has greater potential to become Bangsamoro's primary maritime trade gateway?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {[
              "Basilan (rubber, ZBIP, closer to Mindanao)",
              "Tawi-Tawi (seaweed, BIMP-EAGA, direct Sabah route)",
              "Both equally — they serve different corridors",
            ].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left",
                  data.q7_6_gateway_province === opt ? activeBtn : inactiveBtn
                )}
                onClick={() => update("q7_6_gateway_province", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 8. Global Integration Vectors ────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
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
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            <strong>Vector 1 — BIMP-EAGA Corridor:</strong> proximity-based maritime trade, 3% of ASEAN halal market via Tawi-Tawi. <strong>Vector 2 — UAE & GCC Corridor:</strong> standards-based air/sea logistics, $2.3T global halal market via Polloc Freeport and OIC/SMIIC accreditation.
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            Which global integration vector should Bangsamoro prioritize?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {[
              "BIMP-EAGA (regional, proximity-based, lower barriers)",
              "UAE/GCC (global, higher value, standards-based)",
              "Both simultaneously — they complement each other",
            ].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left",
                  data.q7_7_priority_vector === opt ? activeBtn : inactiveBtn
                )}
                onClick={() => update("q7_7_priority_vector", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 9. UAE & GCC Connectivity ────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
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
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            Three hubs linked to $2.3T global halal market: <strong>Basilan</strong> (₱23.15B GDP, Archipelagic Logistics Gateway, ZBIP), <strong>Maguindanao del Norte</strong> (₱81.91B GDP, Admin & Halal Hub, Polloc), <strong>Maguindanao del Sur</strong> (₱39.54B GDP, Agri-Industrial Breadbasket).
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            How realistic is BARMM's goal of capturing a meaningful share of the UAE/GCC halal market by 2030?
          </Label>
          {renderScale("q7_8_uae_feasibility")}
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">1 = Not realistic, 5 = Very realistic</p>
        </CardContent>
      </Card>

      {/* ── 10. BIMP-EAGA Connectivity Map ───────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
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
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            Tawi-Tawi and Basilan as maritime gateways feeding BIMP-EAGA. Maguindanao del Norte and Polloc Freeport as halal export centers to UAE/GCC. Maguindanao del Sur and Lanao del Sur as inland production zones.
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            How effectively is Bangsamoro leveraging the BIMP-EAGA corridor for regional trade?
          </Label>
          {renderScale("q7_9_bimpeaga_leverage")}
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">1 = Not effectively, 5 = Very effectively</p>
        </CardContent>
      </Card>

      {/* ── 11. SWOT Scale Questions ───────────────────────────── */}
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
          {renderSwotPair(
            "S1 — Strategic BIMP-EAGA Location",
            "Proximity to Sabah and ASEAN trade corridors.",
            "q7_s1_bimpeaga_location_impact",
            "q7_s1_bimpeaga_location_likelihood",
            "strength"
          )}

          {/* Opportunities */}
          {renderSwotPair(
            "O1 — Global Halal Market",
            "USD 2.3 trillion market with growing demand.",
            "q7_o1_global_halal_impact",
            "q7_o1_global_halal_likelihood",
            "opportunity"
          )}
          {renderSwotPair(
            "O2 — ASEAN Halal Economy",
            "USD 1.38 trillion addressable market; target to capture 30% share.",
            "q7_o2_asean_halal_impact",
            "q7_o2_asean_halal_likelihood",
            "opportunity"
          )}
          {renderSwotPair(
            "O3 — BIMP-EAGA Regional Integration",
            "Cross-border trade facilitation and eco-corridors.",
            "q7_o3_bimpeaga_integration_impact",
            "q7_o3_bimpeaga_integration_likelihood",
            "opportunity"
          )}
          {renderSwotPair(
            "O4 — UAE/GCC Halal Export Corridor",
            "MAFAR-Prime Group partnership opening Middle Eastern markets.",
            "q7_o4_uae_corridor_impact",
            "q7_o4_uae_corridor_likelihood",
            "opportunity"
          )}
          {renderSwotPair(
            "O5 — Mindanao Central Logistics Land-Bridge",
            "SGA serves as the primary land bridge connecting Polloc Freeport to General Santos and Davao export gateways.",
            "q7_o5_landbridge_impact",
            "q7_o5_landbridge_likelihood",
            "opportunity"
          )}

          {/* Threats */}
          {renderSwotPair(
            "T1 — Competition from Halal Hubs",
            "Malaysia, Indonesia, and Thailand holding established market share.",
            "q7_t1_halal_competition_impact",
            "q7_t1_halal_competition_likelihood",
            "threat"
          )}
          {renderSwotPair(
            "T2 — Global Economic Downturn",
            "Perceived as a top global risk, weakening demand for BARMM's key exports like Halal and rubber.",
            "q7_t2_economic_downturn_impact",
            "q7_t2_economic_downturn_likelihood",
            "threat"
          )}
          {renderSwotPair(
            "T3 — Market Price Volatility",
            "Global commodity fluctuations for rubber, coconut, and seaweed.",
            "q7_t3_price_volatility_impact",
            "q7_t3_price_volatility_likelihood",
            "threat"
          )}
        </CardContent>
      </Card>

      {/* ── 12. Archetype: Success to the Successful ─────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            Archetype: Success to the Successful
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Success%20to%20the%20Successful%20Aarchetype.png"
              alt="Success to the Successful Archetype"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90 leading-relaxed">
            "Success to the Successful" illustrates how initial advantages reinforce uneven development between BARMM's mainland and island provinces. It captures a self-reinforcing cycle where success breeds more success, widening the gap between the mainland (Maguindanao del Norte, Lanao del Sur — ₱81.91B GDP, 4.1% GRDP growth) and island provinces (Tawi-Tawi 1.1%, Sulu 1.13%, Basilan 1.6%) — threatening BARMM's goal of inclusive, balanced development.
          </p>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              How accurately does "Success to the Successful" reflect the imbalance between mainland and island provinces?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {archetypeOptions.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q7_arch_success_successful_accuracy === opt ? activeBtn : inactiveBtn
                  )}
                  onClick={() => update("q7_arch_success_successful_accuracy", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {(data.q7_arch_success_successful_accuracy === "Very accurately" ||
            data.q7_arch_success_successful_accuracy === "Somewhat accurately") && (
            <div className="space-y-3 pt-4 border-t border-[#C9A84C]/20 animate-in fade-in slide-in-from-top-2 duration-200">
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
                Which island province has the greatest untapped potential, and what investment would unlock it?
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Tawi-Tawi (seaweed, BIMP-EAGA)",
                  "Basilan (rubber, ZBIP)",
                  "Sulu (fisheries, tourism)",
                ].map((opt) => (
                  <Button
                    key={opt}
                    type="button"
                    variant="outline"
                    className={cn(
                      "justify-start h-auto py-3 text-sm text-left",
                      data.q7_arch_success_successful_followup === opt ? activeBtn : inactiveBtn
                    )}
                    onClick={() => update("q7_arch_success_successful_followup", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
              <Textarea
                placeholder="Or describe another province and investment..."
                rows={2}
                value={data.q7_arch_success_successful_followup || ""}
                onChange={(e) => update("q7_arch_success_successful_followup", e.target.value)}
                className="w-full rounded-lg border border-[#C9A84C]/30 bg-white dark:bg-[#022c22]/50 px-3 py-2 text-sm text-[#022c22] dark:text-[#ecfdf5] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 resize-y"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Cross-Cluster Assessment (universal, same 3 questions every cluster) ── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Cross-Cluster Assessment
          </CardTitle>
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 pt-1">
            These three questions are asked identically in every cluster section, so your
            answers can be compared across all of BARMM&apos;s investment priorities.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {UNIVERSAL_QUESTIONS.map((q) => {
            const fieldName = universalFieldName(7, q.id);
            return (
              <LikertScale
                key={q.id}
                name={fieldName}
                label={q.label}
                scale={q.scale}
                value={(data as never as Record<string, number | undefined>)[fieldName]}
                onChange={(v) => update(fieldName as never, v as never)}
              />
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default Section7_Connectors;
