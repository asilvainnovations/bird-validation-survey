import React from "react";
import { Leaf, AlertTriangle, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SurveySchemaType } from "@/lib/survey-schema";
import { BIRD_IMAGES } from "@/lib/bird-urls";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export type Section4Data = Pick<
  SurveySchemaType,
  | "q_s4_climate_impact"
  | "q_s4_climate_likelihood"
  | "q_s4_pestalotiopsis_impact"
  | "q_s4_pestalotiopsis_likelihood"
  | "q_s4_postharvest_impact"
  | "q_s4_postharvest_likelihood"
  | "q_s4_poverty_impact"
  | "q_s4_poverty_likelihood"
  | "q_s4_limits_growth"
  | "q_s4_tragedy_commons"
  | "q_s4_tragedy_followup"
>;

interface Section4Props {
  data: Section4Data;
  onChange: (data: Section4Data) => void;
}

export const Section4_Foundations: React.FC<Section4Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section4Data>(field: K, value: Section4Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  const tragedyAgree = data.q_s4_tragedy_commons === "Very accurately" || data.q_s4_tragedy_commons === "Somewhat accurately";
  
  const activeBtnClass = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90";
  const inactiveBtnClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";
  const activeScaleClass = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
  const inactiveScaleClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";

  const swotFactors = [
    {
      id: "climate",
      label: "T1: Climate Change Vulnerabilities",
      desc: "El Niño, floods, and changing rainfall patterns already caused a 4.2% drop in agriculture in 2024 and threaten food security.",
      impactField: "q_s4_climate_impact" as keyof Section4Data,
      likelihoodField: "q_s4_climate_likelihood" as keyof Section4Data,
    },
    {
      id: "pestalotiopsis",
      label: "T10: Rubber Pestalotiopsis Disease",
      desc: "A fungal disease attacking rubber plantations in Basilan that could spread to other areas, threatening farmer livelihoods.",
      impactField: "q_s4_pestalotiopsis_impact" as keyof Section4Data,
      likelihoodField: "q_s4_pestalotiopsis_likelihood" as keyof Section4Data,
    },
    {
      id: "postharvest",
      label: "W7: Limited Agro-Processing and Cold Chain",
      desc: "Without proper storage, 20–40% of farm produce is lost after harvest, cutting farmer income.",
      impactField: "q_s4_postharvest_impact" as keyof Section4Data,
      likelihoodField: "q_s4_postharvest_likelihood" as keyof Section4Data,
    },
    {
      id: "poverty",
      label: "W2: Highest Poverty Incidence",
      desc: "At 34.8%, poverty limits domestic market size and consumer purchasing power.",
      impactField: "q_s4_poverty_impact" as keyof Section4Data,
      likelihoodField: "q_s4_poverty_likelihood" as keyof Section4Data,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Leaf className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">Section 4: Cluster 1 — Foundations</h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        The Foundations cluster sustains the Bangsamoro economy. Agriculture contributes 32.4% of GRDP (₱97.2B). All other clusters depend on its health.
      </p>

      {/* 1. Cluster Image */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.cluster1Foundations.url}
          alt={BIRD_IMAGES.cluster1Foundations.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">Source: Cluster 1 | Foundations: The Infrastructure-First Resource Base</p>
        </div>
      </div>

      {/* 2. Context Card */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6">
          <p className="text-sm text-[#065f46]">
            Highlights four sectors: <strong>Agri-Fisheries</strong> (32.4% of GRDP, ₱97.2B), <strong>Energy</strong> (75.86% renewable mix), <strong>Forestry</strong> (untapped carbon potential), and <strong>Environment</strong> (green economy as revenue generator).
          </p>
        </CardContent>
      </Card>

      {/* 3. SWOT Scale Questions — THREATS & WEAKNESSES */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">THREAT / WEAKNESS</span>
            External Threats & Internal Weaknesses to Foundations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-xs text-[#065f46] italic -mt-4">
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
                        className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data[factor.impactField] === v ? activeScaleClass : inactiveScaleClass)}
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
                        className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data[factor.likelihoodField] === v ? activeScaleClass : inactiveScaleClass)}
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

      {/* 4. Systems Archetype: Limits to Growth */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-semibold text-[#022c22]">Archetype: Limits to Growth</h3>
          </div>
          <p className="text-sm text-[#065f46]">
            This archetype describes a common pattern: initial success triggers growth, but eventually the system encounters constraints that slow or halt progress. Without addressing these limiting factors, the system plateaus or declines.
          </p>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
            <img
              src={BIRD_IMAGES.limitsGrowth.url}
              alt={BIRD_IMAGES.limitsGrowth.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22] mb-4">
            In BARMM's context: Agricultural and energy sector growth encounters balancing loops — infrastructure gaps, climate shocks, and funding limits slow progress despite initial gains.
          </p>
          <Label className="text-sm font-medium text-[#022c22] mb-3 block">
            How accurately does "Limits to Growth" describe the barriers facing BARMM's agricultural and energy expansion?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q_s4_limits_growth === opt ? activeBtnClass : inactiveBtnClass)}
                onClick={() => update("q_s4_limits_growth", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 5. Systems Archetype: Tragedy of the Commons */}
      <Card className="border-2 border-amber-500/40 bg-amber-50/30 backdrop-blur-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            <h3 className="text-base font-semibold text-[#022c22]">Archetype: Tragedy of the Commons — A Warning</h3>
          </div>
          <div className="bg-amber-100/50 border-l-4 border-amber-600 p-4 rounded-r-lg">
            <p className="text-sm text-amber-900 font-medium mb-2">⚠️ This archetype represents a critical warning scenario</p>
            <p className="text-sm text-amber-800">
              The "Tragedy of the Commons" occurs when shared resources are over-exploited due to lack of proper governance. It is <strong>not inevitable</strong> — it serves as a warning of what happens when individual actors prioritize short-term gains over collective long-term sustainability.
            </p>
          </div>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
            <img
              src={BIRD_IMAGES.tragedyCommons.url}
              alt={BIRD_IMAGES.tragedyCommons.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22] mb-4">
            Shared resources get over-exploited when governance is fragmented. Each actor gains individually, but collective impact depletes the resource base — watersheds degrade, fisheries collapse, forests disappear.
          </p>
          <Label className="text-sm font-medium text-[#022c22] mb-3 block">
            How accurately does the "Tragedy of the Commons" reflect <strong>potential</strong> resource management challenges in BARMM's agriculture, fisheries, and forestry sectors?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q_s4_tragedy_commons === opt ? activeBtnClass : inactiveBtnClass)}
                onClick={() => update("q_s4_tragedy_commons", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
          
          {/* Conditional Follow-up */}
          {tragedyAgree && (
            <div className="mt-4 pt-4 border-t border-[#C9A84C]/20 space-y-3">
              <Label className="text-sm font-medium text-[#022c22] block">
                If this archetype applies, which shared resource is <strong>most at risk</strong> of over-exploitation?
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {["Watersheds", "Fishing grounds", "Forest reserves", "Agricultural land"].map((opt) => (
                  <Button
                    key={opt}
                    type="button"
                    variant="outline"
                    className={cn("justify-start h-auto py-3 text-sm text-left", data.q_s4_tragedy_followup === opt ? activeBtnClass : inactiveBtnClass)}
                    onClick={() => update("q_s4_tragedy_followup", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-amber-800 italic">
                Identifying the most vulnerable resource helps prioritize governance interventions to prevent the tragedy before it occurs.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Section4_Foundations;
