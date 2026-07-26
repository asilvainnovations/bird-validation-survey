import React from "react";
import { Leaf, AlertTriangle, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SurveySchemaType } from "@/lib/survey-schema";
import { BIRD_IMAGES } from "@/lib/bird-urls";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type Section4Data = Pick<
  SurveySchemaType,
  | "q4_1_foundations_banner_understanding"
  | "q4_2_tragedy_commons_accuracy"
  | "q4_3_tragedy_followup"
  | "q4_4_climate_impact"
  | "q4_5_climate_likelihood"
  | "q4_6_pestalotiopsis_impact"
  | "q4_7_pestalotiopsis_likelihood"
  | "q4_8_postharvest_impact"
  | "q4_9_postharvest_likelihood"
  | "q4_10_poverty_impact"
  | "q4_11_poverty_likelihood"
  | "q4_12_limits_growth_accuracy"
  | "q4_13_limits_followup"
>;

interface Section4Props {
  data: Section4Data;
  onChange: (data: Section4Data) => void;
}

const ACCURACY_OPTIONS = ["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"] as const;
const TRAGEDY_RESOURCES = ["Watersheds", "Fishing grounds", "Forest reserves", "Agricultural land"] as const;
const LIMITS_CONSTRAINTS = ["Infrastructure gaps", "Skills shortage", "Environmental constraints", "Funding limitations"] as const;

export const Section4_Foundations: React.FC<Section4Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section4Data>(field: K, value: Section4Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  const activeBtn = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 dark:bg-[#C9A84C] dark:text-[#022c22] dark:border-[#C9A84C]";
  const inactiveBtn = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] dark:bg-[#022c22]/50 dark:text-[#ecfdf5] dark:border-[#C9A84C]/30";
  const activeScale = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
  const inactiveScale = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] dark:bg-[#022c22]/50 dark:text-[#ecfdf5] dark:border-[#C9A84C]/30";

  const tragedyAgree = data.q4_2_tragedy_commons_accuracy === "Very accurately" || data.q4_2_tragedy_commons_accuracy === "Somewhat accurately";
  const limitsAgree = data.q4_12_limits_growth_accuracy === "Very accurately" || data.q4_12_limits_growth_accuracy === "Somewhat accurately";

  const swotFactors = [
    {
      id: "climate",
      label: "T1: Climate Change / El Niño",
      desc: "El Niño, flooding, and shifting rainfall patterns caused a 4.2% AFF contraction in 2024. Threatens agriculture, fisheries, and forestry across all provinces.",
      impactField: "q4_4_climate_impact" as keyof Section4Data,
      likelihoodField: "q4_5_climate_likelihood" as keyof Section4Data,
    },
    {
      id: "pestalotiopsis",
      label: "T1: Rubber Pestalotiopsis Disease",
      desc: "A fungal disease attacking rubber plantations in Basilan that could spread to other rubber-producing areas, threatening farmer livelihoods and export capacity.",
      impactField: "q4_6_pestalotiopsis_impact" as keyof Section4Data,
      likelihoodField: "q4_7_pestalotiopsis_likelihood" as keyof Section4Data,
    },
    {
      id: "postharvest",
      label: "W2: Post-Harvest Losses",
      desc: "High post-harvest losses (20–40%) due to limited cold-chain and agro-processing facilities constrain value addition and farmer incomes.",
      impactField: "q4_8_postharvest_impact" as keyof Section4Data,
      likelihoodField: "q4_9_postharvest_likelihood" as keyof Section4Data,
    },
    {
      id: "poverty",
      label: "W2: Poverty Incidence (34.8%)",
      desc: "Highest poverty incidence in the Philippines limits domestic market depth, purchasing power, and productive investment in the Foundations cluster.",
      impactField: "q4_10_poverty_impact" as keyof Section4Data,
      likelihoodField: "q4_11_poverty_likelihood" as keyof Section4Data,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Leaf className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22] dark:text-[#ecfdf5]">Section 4: Cluster 1 — Foundations</h2>
      </div>
      <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
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
          <p className="text-xs italic text-white/70">{BIRD_IMAGES.cluster1Foundations.description}</p>
        </div>
      </div>

      {/* 2. Context Card */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm dark:bg-[#022c22]/80 dark:border-[#C9A84C]/30">
        <CardContent className="pt-6">
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            Highlights four sectors: <strong>Agri-Fisheries</strong> (32.4% of GRDP, ₱97.2B), <strong>Energy</strong> (75.86% renewable mix), <strong>Forestry</strong> (untapped carbon potential), and <strong>Environment</strong> (green economy as revenue generator).
          </p>
        </CardContent>
      </Card>

      {/* 3. Banner Understanding */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm dark:bg-[#022c22]/80 dark:border-[#C9A84C]/30">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22] dark:text-[#ecfdf5]">Framework Understanding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            How well do you understand the Foundations cluster and its role in the BEIE framework? (1 = not at all, 5 = completely)
          </Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((v) => (
              <Button
                key={v}
                type="button"
                variant="outline"
                size="icon"
                className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q4_1_foundations_banner_understanding === v ? activeScale : inactiveScale)}
                onClick={() => update("q4_1_foundations_banner_understanding", v)}
              >
                {v}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 4. SWOT Scale Questions */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm dark:bg-[#022c22]/80 dark:border-[#C9A84C]/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-[#C9A84C]/10 text-[#C9A84C]">SWOT ASSESSMENT</span>
            Foundations Cluster Factors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/50 italic -mt-4">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          {swotFactors.map((factor, idx) => (
            <div key={factor.id} className={cn("space-y-3", idx < swotFactors.length - 1 && "pb-6 border-b border-[#C9A84C]/20 dark:border-[#C9A84C]/10")}>
              <p className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
                <strong>{factor.label}.</strong> {factor.desc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/50">Impact (1–5)</p>
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
                  <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/50">Likelihood (1–5)</p>
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

      {/* 5. Archetype: Tragedy of the Commons */}
      <Card className="border-2 border-amber-500/40 bg-amber-50/30 backdrop-blur-sm dark:bg-amber-900/10 dark:border-amber-500/30">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <h3 className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">Archetype: Tragedy of the Commons</h3>
          </div>
          <div className="bg-amber-100/50 border-l-4 border-amber-600 p-4 rounded-r-lg dark:bg-amber-900/20 dark:border-amber-400">
            <p className="text-sm text-amber-900 dark:text-amber-200 font-medium mb-2">⚠️ Critical Warning Scenario</p>
            <p className="text-sm text-amber-800 dark:text-amber-300/80 leading-relaxed">
              The "Tragedy of the Commons" occurs when shared resources are over-exploited due to lack of proper governance. Uncoordinated exploitation of agriculture, fisheries, and forestry leads to systemic collapse. Without intervention—such as the Bangsamoro Forestry Code, carbon markets, and community co-management—the Foundations cluster risks degradation.
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
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
            How accurately does the "Tragedy of the Commons" reflect potential resource management challenges in BARMM?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {ACCURACY_OPTIONS.map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q4_2_tragedy_commons_accuracy === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q4_2_tragedy_commons_accuracy", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
          {tragedyAgree && (
            <div className="mt-4 pt-4 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/10 space-y-3">
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
                If this archetype applies, which shared resource is most at risk of over-exploitation?
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {TRAGEDY_RESOURCES.map((opt) => (
                  <Button
                    key={opt}
                    type="button"
                    variant="outline"
                    className={cn("justify-start h-auto py-3 text-sm text-left", data.q4_3_tragedy_followup === opt ? activeBtn : inactiveBtn)}
                    onClick={() => update("q4_3_tragedy_followup", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 6. Archetype: Limits to Growth */}
      <Card className="border-2 border-rose-500/40 bg-rose-50/30 backdrop-blur-sm dark:bg-rose-900/10 dark:border-rose-500/30">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-6 h-6 text-rose-600 dark:text-rose-400" />
            <h3 className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">Archetype: Limits to Growth</h3>
          </div>
          <div className="bg-rose-100/50 border-l-4 border-rose-600 p-4 rounded-r-lg dark:bg-rose-900/20 dark:border-rose-400">
            <p className="text-sm text-rose-900 dark:text-rose-200 font-medium mb-2">📉 Structural Ceiling Warning</p>
            <p className="text-sm text-rose-800 dark:text-rose-300/80 leading-relaxed">
              The "Limits to Growth" archetype illustrates how rapid investment expansion eventually slows when structural ceilings—like weak infrastructure, limited skills, and environmental constraints—are reached. Growth without parallel investment in enabling infrastructure and skills inevitably plateaus, underscoring the need for systemic capacity development.
            </p>
          </div>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
            <img
              src={BIRD_IMAGES.limitsGrowth.url}
              alt={BIRD_IMAGES.limitsGrowth.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
            How accurately does "Limits to Growth" describe the barriers facing BARMM's agricultural and energy expansion?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {ACCURACY_OPTIONS.map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q4_12_limits_growth_accuracy === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q4_12_limits_growth_accuracy", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
          {limitsAgree && (
            <div className="mt-4 pt-4 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/10 space-y-3">
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
                Which constraint most limits growth in your sector?
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {LIMITS_CONSTRAINTS.map((opt) => (
                  <Button
                    key={opt}
                    type="button"
                    variant="outline"
                    className={cn("justify-start h-auto py-3 text-sm text-left", data.q4_13_limits_followup === opt ? activeBtn : inactiveBtn)}
                    onClick={() => update("q4_13_limits_followup", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Section4_Foundations;
