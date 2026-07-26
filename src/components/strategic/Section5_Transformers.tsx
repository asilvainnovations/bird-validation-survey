import React from "react";
import { Factory, AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SurveySchemaType } from "@/lib/survey-schema";
import { BIRD_IMAGES } from "@/lib/bird-urls";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type Section5Data = Pick<
  SurveySchemaType,
  | "q5_1_transformers_banner_understanding"
  | "q5_2_halal_advantage_understanding"
  | "q5_3_farm_to_market_understanding"
  | "q5_4_economic_zones_understanding"
  | "q5_5_growth_underinvestment_accuracy"
  | "q5_6_growth_underinvestment_followup"
  | "q5_7_halal_cert_impact"
  | "q5_8_halal_cert_likelihood"
  | "q5_9_skills_mismatch_impact"
  | "q5_10_skills_mismatch_likelihood"
  | "q5_11_global_halal_impact"
  | "q5_12_global_halal_likelihood"
  | "q5_13_uae_corridor_impact"
  | "q5_14_uae_corridor_likelihood"
  | "q5_15_competition_impact"
  | "q5_16_competition_likelihood"
>;

interface Section5Props {
  data: Section5Data;
  onChange: (data: Section5Data) => void;
}

const ACCURACY_OPTIONS = ["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"] as const;
const CONSTRAINT_OPTIONS = [
  "Halal certification delays",
  "Infrastructure bottlenecks",
  "Skills shortage",
  "Processing facilities",
] as const;

export const Section5_Transformers: React.FC<Section5Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section5Data>(field: K, value: Section5Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  const growthAgree = data.q5_5_growth_underinvestment_accuracy === "Very accurately" || data.q5_5_growth_underinvestment_accuracy === "Somewhat accurately";

  const activeBtn = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 dark:bg-[#C9A84C] dark:text-[#022c22] dark:border-[#C9A84C]";
  const inactiveBtn = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] dark:bg-[#022c22]/50 dark:text-[#ecfdf5] dark:border-[#C9A84C]/30";
  const activeScale = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
  const inactiveScale = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] dark:bg-[#022c22]/50 dark:text-[#ecfdf5] dark:border-[#C9A84C]/30";

  const understandingQuestions = [
    {
      field: "q5_1_transformers_banner_understanding" as keyof Section5Data,
      label: "How well do you understand the Transformers cluster as the engine of value creation in BARMM?",
    },
    {
      field: "q5_2_halal_advantage_understanding" as keyof Section5Data,
      label: "How well do you understand Bangsamoro's cultural and geographic advantage in the ASEAN halal market?",
    },
    {
      field: "q5_3_farm_to_market_understanding" as keyof Section5Data,
      label: "How well do you understand the MAFAR halal farm-to-market pipeline and its four stages?",
    },
    {
      field: "q5_4_economic_zones_understanding" as keyof Section5Data,
      label: "How well do you understand the role of Polloc Freeport and WOW Matanog SEZ in industrial scaling?",
    },
  ];

  const swotFactors = [
    {
      id: "halal_cert",
      label: "W1: Weak Halal Certification System",
      desc: "Resource-constrained BHB with limited international recognition. Certification takes 45–60 days vs. Malaysia's 15-day benchmark.",
      impactField: "q5_7_halal_cert_impact" as keyof Section5Data,
      likelihoodField: "q5_8_halal_cert_likelihood" as keyof Section5Data,
    },
    {
      id: "skills_mismatch",
      label: "W3: Skills Mismatch",
      desc: "TVIs not fully aligned with emerging industry needs in halal manufacturing, cold-chain logistics, and agro-processing.",
      impactField: "q5_9_skills_mismatch_impact" as keyof Section5Data,
      likelihoodField: "q5_10_skills_mismatch_likelihood" as keyof Section5Data,
    },
    {
      id: "global_halal",
      label: "O1: Global Halal Market (USD 2.3T)",
      desc: "Massive global demand for Shariah-compliant products. BARMM's Muslim-majority identity provides unmatched authenticity.",
      impactField: "q5_11_global_halal_impact" as keyof Section5Data,
      likelihoodField: "q5_12_global_halal_likelihood" as keyof Section5Data,
    },
    {
      id: "uae_corridor",
      label: "O4: UAE/GCC Halal Export Corridor",
      desc: "MAFAR-Prime Group partnership opening Middle Eastern markets. Direct air and sea links to Dubai and GCC halal hubs.",
      impactField: "q5_13_uae_corridor_impact" as keyof Section5Data,
      likelihoodField: "q5_14_uae_corridor_likelihood" as keyof Section5Data,
    },
    {
      id: "competition",
      label: "T1: Competition from Halal Hubs",
      desc: "Malaysia, Indonesia, and Thailand hold established market share with mature certification and logistics ecosystems.",
      impactField: "q5_15_competition_impact" as keyof Section5Data,
      likelihoodField: "q5_16_competition_likelihood" as keyof Section5Data,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Factory className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22] dark:text-[#ecfdf5]">Section 5: Cluster 2 — Transformers</h2>
      </div>
      <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
        The Transformers cluster converts raw materials into higher-value halal products. This is where cultural authenticity becomes economic advantage.
      </p>

      {/* 1. Cluster Banner Image */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.cluster2Transformers.url}
          alt={BIRD_IMAGES.cluster2Transformers.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">{BIRD_IMAGES.cluster2Transformers.description}</p>
        </div>
      </div>

      {/* 2. Understanding Questions */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm dark:bg-[#022c22]/80 dark:border-[#C9A84C]/30">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22] dark:text-[#ecfdf5]">Framework Understanding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {understandingQuestions.map((q, idx) => (
            <div key={q.field} className={cn("space-y-3", idx < understandingQuestions.length - 1 && "pb-6 border-b border-[#C9A84C]/20 dark:border-[#C9A84C]/10")}>
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
                {q.label} (1 = not at all, 5 = completely)
              </Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <Button
                    key={v}
                    type="button"
                    variant="outline"
                    size="icon"
                    className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data[q.field] === v ? activeScale : inactiveScale)}
                    onClick={() => update(q.field, v)}
                  >
                    {v}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 3. Halal Industry Advantage Image */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm dark:bg-[#022c22]/80 dark:border-[#C9A84C]/30">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src={BIRD_IMAGES.halalIndustryAdvantage.url}
              alt={BIRD_IMAGES.halalIndustryAdvantage.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">{BIRD_IMAGES.halalIndustryAdvantage.title}</p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            <strong>Three key sectors:</strong> Halal Food & Beverage (coconut-based by-products), Halal Cosmetics (beauty for Muslim consumers), Halal Pharmaceuticals (compliant medicine). The BIMP-EAGA trade corridor connects Bangsamoro to a large regional Muslim population.
          </p>
        </CardContent>
      </Card>

      {/* 4. Farm-to-Market Pipeline Image */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm dark:bg-[#022c22]/80 dark:border-[#C9A84C]/30">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src={BIRD_IMAGES.farmToMarketPipeline.url}
              alt={BIRD_IMAGES.farmToMarketPipeline.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">{BIRD_IMAGES.farmToMarketPipeline.title}</p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            <strong>Four stages:</strong> Input Supply (hatcheries, feed mills), Cold Chain & Logistics (roads, ice plants, cold storage), Processing (halal livestock, poultry, seaweed), Market Linkage (halal pasalubong centers, BIMP-EAGA export).
          </p>
        </CardContent>
      </Card>

      {/* 5. SWOT Scales: Weaknesses, Opportunities, Threats */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm dark:bg-[#022c22]/80 dark:border-[#C9A84C]/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">SWOT ASSESSMENT</span>
            Transformers Cluster Factors
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

      {/* 6. Industrial and Economic Zones Image */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm dark:bg-[#022c22]/80 dark:border-[#C9A84C]/30">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src={BIRD_IMAGES.industrialEconomicZones.url}
              alt={BIRD_IMAGES.industrialEconomicZones.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">{BIRD_IMAGES.industrialEconomicZones.title}</p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            <strong>Polloc Freeport & EcoZone</strong> (119-hectare agro-industrial hub in Parang, ADB-funded) and <strong>WOW Matanog Special Economic Zone</strong> (upcoming Bangsamoro Halal Park).
          </p>
        </CardContent>
      </Card>

      {/* 7. Archetype: Growth and Underinvestment */}
      <Card className="border-2 border-amber-500/40 bg-amber-50/30 backdrop-blur-sm dark:bg-amber-900/10 dark:border-amber-500/30">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">Archetype: Growth and Underinvestment</h3>
          </div>
          <div className="bg-amber-100/50 border-l-4 border-amber-600 p-4 rounded-r-lg dark:bg-amber-900/20 dark:border-amber-400">
            <p className="text-sm text-amber-900 dark:text-amber-200 font-medium mb-2">⚠️ Capacity Gap Warning</p>
            <p className="text-sm text-amber-800 dark:text-amber-300/80 leading-relaxed">
              "Growth and Underinvestment" illustrates how rapid investment expansion stalls when institutional capacity fails to keep pace. As investment increases, facilitation capacity (certifiers, staff, infrastructure) expands—but when it hits its ceiling, processing slows, creating backlogs that erode investor confidence and dampen growth.
            </p>
          </div>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
            <img
              src={BIRD_IMAGES.growthUnderinvestment.url}
              alt={BIRD_IMAGES.growthUnderinvestment.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
            How accurately does "Growth and Underinvestment" describe the gap between BARMM's investment growth and its institutional capacity?
          </Label>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {ACCURACY_OPTIONS.map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q5_5_growth_underinvestment_accuracy === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q5_5_growth_underinvestment_accuracy", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
          {growthAgree && (
            <div className="mt-4 pt-4 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/10 space-y-3">
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
                Which capacity constraint most affects your sector?
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {CONSTRAINT_OPTIONS.map((opt) => (
                  <Button
                    key={opt}
                    type="button"
                    variant="outline"
                    className={cn("justify-start h-auto py-3 text-sm text-left", data.q5_6_growth_underinvestment_followup === opt ? activeBtn : inactiveBtn)}
                    onClick={() => update("q5_6_growth_underinvestment_followup", opt)}
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

export default Section5_Transformers;
