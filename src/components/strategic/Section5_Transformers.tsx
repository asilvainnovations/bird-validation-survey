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
  | "q5_1_cold_chain"
  | "q5_2_economic_zones"
  | "q5_3_barrier"
  | "q5_4_halal_park"
  | "q_s5_halal_cert_impact"
  | "q_s5_halal_cert_likelihood"
  | "q_s5_skills_mismatch_impact"
  | "q_s5_skills_mismatch_likelihood"
  | "q_s5_global_halal_impact"
  | "q_s5_global_halal_likelihood"
  | "q_s5_uae_corridor_impact"
  | "q_s5_uae_corridor_likelihood"
  | "q_s5_competition_impact"
  | "q_s5_competition_likelihood"
  | "q_s5_fixes_fail"
  | "q_s5_fixes_followup"
  | "q_s5_successful"
  | "q_s5_successful_followup"
>;

interface Section5Props {
  data: Section5Data;
  onChange: (data: Section5Data) => void;
}

export const Section5_Transformers: React.FC<Section5Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section5Data>(field: K, value: Section5Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  const fixesFailAgree = data.q_s5_fixes_fail === "Very accurately" || data.q_s5_fixes_fail === "Somewhat accurately";
  const successfulAgree = data.q_s5_successful === "Very accurately" || data.q_s5_successful === "Somewhat accurately";

  const activeBtnClass = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 dark:bg-[#C9A84C] dark:text-[#022c22] dark:border-[#C9A84C]";
  const inactiveBtnClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] dark:bg-[#022c22]/50 dark:text-[#ecfdf5] dark:border-[#C9A84C]/30";
  const activeScaleClass = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
  const inactiveScaleClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] dark:bg-[#022c22]/50 dark:text-[#ecfdf5] dark:border-[#C9A84C]/30";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Factory className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22] dark:text-[#ecfdf5]">Section 5: Cluster 2 — Transformers: Engines of Value Creation</h2>
      </div>
      <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 mb-4">
        The Transformers cluster converts raw materials into higher-value halal products. This is where cultural authenticity becomes economic advantage.
      </p>

      {/* 1. Cluster Banner Image */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img src={BIRD_IMAGES.cluster2Transformers.url} alt={BIRD_IMAGES.cluster2Transformers.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]" loading="lazy" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">{BIRD_IMAGES.cluster2Transformers.description}</p>
        </div>
      </div>

      {/* 2. Halal Industry Advantage Image */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm dark:bg-[#022c22]/80 dark:border-[#C9A84C]/30">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img src={BIRD_IMAGES.halalIndustryAdvantage.url} alt={BIRD_IMAGES.halalIndustryAdvantage.alt} className="w-full h-auto object-contain" loading="lazy" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">{BIRD_IMAGES.halalIndustryAdvantage.title}</p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            <strong>Three key sectors:</strong> Halal Food & Beverage (coconut-based by-products), Halal Cosmetics (beauty for Muslim consumers), Halal Pharmaceuticals (compliant medicine). The BIMP-EAGA trade corridor connects Bangsamoro to a large regional Muslim population.
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            Rank which halal sector offers the greatest growth potential for Bangsamoro's ASEAN market integration.
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {["Halal Food & Beverage", "Halal Cosmetics", "Halal Pharmaceuticals"].map((opt, idx) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q5_1_cold_chain === opt ? activeBtnClass : inactiveBtnClass)}
                onClick={() => update("q5_1_cold_chain", opt)}>
                <span className={cn("flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 mr-3",
                  data.q5_1_cold_chain === opt ? "bg-white/20 text-white" : "bg-[#C9A84C]/10 text-[#C9A84C]")}>
                  {data.q5_1_cold_chain === opt ? idx + 1 : ""}
                </span>
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. Farm-to-Market Pipeline Image */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm dark:bg-[#022c22]/80 dark:border-[#C9A84C]/30">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img src={BIRD_IMAGES.farmToMarketPipeline.url} alt={BIRD_IMAGES.farmToMarketPipeline.alt} className="w-full h-auto object-contain" loading="lazy" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">{BIRD_IMAGES.farmToMarketPipeline.title}</p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            <strong>Four stages:</strong> Input Supply (hatcheries, feed mills), Cold Chain & Logistics (roads, ice plants, cold storage), Processing (halal livestock, poultry, seaweed), Market Linkage (halal pasalubong centers, BIMP-EAGA export).
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            Do you think improving cold-chain and logistics will significantly strengthen Bangsamoro's halal farm-to-market pipeline?
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly disagree"].map((opt) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("h-auto py-3 text-sm text-center", data.q5_2_economic_zones === opt ? activeBtnClass : inactiveBtnClass)}
                onClick={() => update("q5_2_economic_zones", opt)}>
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 4. SWOT Scales: Weaknesses & Threats */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm dark:bg-[#022c22]/80 dark:border-[#C9A84C]/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">WEAKNESS / THREAT</span>
            Barriers to Industrial Transformation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/50 italic -mt-4">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          
          {/* W1: Weak Halal Certification */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20 dark:border-[#C9A84C]/10">
            <p className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
              <strong>W1: Weak Halal Certification System.</strong> Resource-constrained BHB with limited international recognition.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/50">Impact (1–5)</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s5_halal_cert_impact === v ? activeScaleClass : inactiveScaleClass)}
                      onClick={() => update("q_s5_halal_cert_impact", v)}>{v}</Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/50">Likelihood (1–5)</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s5_halal_cert_likelihood === v ? activeScaleClass : inactiveScaleClass)}
                      onClick={() => update("q_s5_halal_cert_likelihood", v)}>{v}</Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* W2: Limited Agro-Processing */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20 dark:border-[#C9A84C]/10">
            <p className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
              <strong>W2: Limited Agro-Processing/Cold Chain.</strong> High post-harvest losses (20–40%) constraining value addition.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/50">Impact (1–5)</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s5_skills_mismatch_impact === v ? activeScaleClass : inactiveScaleClass)}
                      onClick={() => update("q_s5_skills_mismatch_impact", v)}>{v}</Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/50">Likelihood (1–5)</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s5_skills_mismatch_likelihood === v ? activeScaleClass : inactiveScaleClass)}
                      onClick={() => update("q_s5_skills_mismatch_likelihood", v)}>{v}</Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* T1: Standards Recognition Risk */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
              <strong>T1: Standards Recognition Risk.</strong> BARMM certifications not yet aligned with OIC/SMIIC international standards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/50">Impact (1–5)</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s5_competition_impact === v ? activeScaleClass : inactiveScaleClass)}
                      onClick={() => update("q_s5_competition_impact", v)}>{v}</Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/50">Likelihood (1–5)</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s5_competition_likelihood === v ? activeScaleClass : inactiveScaleClass)}
                      onClick={() => update("q_s5_competition_likelihood", v)}>{v}</Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5. Industrial and Economic Zones Image */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm dark:bg-[#022c22]/80 dark:border-[#C9A84C]/30">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img src={BIRD_IMAGES.industrialEconomicZones.url} alt={BIRD_IMAGES.industrialEconomicZones.alt} className="w-full h-auto object-contain" loading="lazy" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">{BIRD_IMAGES.industrialEconomicZones.title}</p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            <strong>Polloc Freeport & EcoZone</strong> (119-hectare agro-industrial hub in Parang, ADB-funded) and <strong>WOW Matanog Special Economic Zone</strong> (upcoming Bangsamoro Halal Park).
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            Will developing economic zones like Polloc Freeport and WOW Matanog significantly boost industrial and halal trade capacity?
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly disagree"].map((opt) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("h-auto py-3 text-sm text-center", data.q5_4_halal_park === opt ? activeBtnClass : inactiveBtnClass)}
                onClick={() => update("q5_4_halal_park", opt)}>{opt}</Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 6. Archetype: Fixes that Fail */}
      <Card className="border-2 border-amber-500/40 bg-amber-50/30 backdrop-blur-sm dark:bg-amber-900/10 dark:border-amber-500/30">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">Archetype: Fixes that Fail</h3>
          </div>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
            <img src={BIRD_IMAGES.fixesThatFail.url} alt={BIRD_IMAGES.fixesThatFail.alt} className="w-full h-auto object-contain" loading="lazy" />
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/80 mb-4">
            Short-term tax incentives and fragmented subsidies create the illusion of progress but erode institutional capacity over time. Investors exit once incentives expire.
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
            How accurately does "Fixes that Fail" capture the unintended consequences of short-term industrial policy in BARMM?
          </Label>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q_s5_fixes_fail === opt ? activeBtnClass : inactiveBtnClass)}
                onClick={() => update("q_s5_fixes_fail", opt)}>{opt}</Button>
            ))}
          </div>
          {fixesFailAgree && (
            <div className="mt-4 pt-4 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/10 space-y-3">
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
                Which sectors best fit this archetype? Which have avoided this trap?
              </Label>
              <Textarea value={data.q_s5_fixes_followup || ""} onChange={(e) => update("q_s5_fixes_followup", e.target.value)}
                placeholder="Type your response here..." rows={3}
                className="bg-white border-[#C9A84C]/30 focus-visible:ring-[#C9A84C] text-[#022c22] dark:bg-[#022c22] dark:text-[#ecfdf5] dark:border-[#C9A84C]/30" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* 7. Archetype: Success to the Successful */}
      <Card className="border-2 border-amber-500/40 bg-amber-50/30 backdrop-blur-sm dark:bg-amber-900/10 dark:border-amber-500/30">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">Archetype: Success to the Successful</h3>
          </div>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 mb-4">
            <img src={BIRD_IMAGES.successSuccessful.url} alt={BIRD_IMAGES.successSuccessful.alt} className="w-full h-auto object-contain" loading="lazy" />
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/80 mb-4">
            Mainland provinces attract bulk of resources while island provinces with high potential are left behind. Tawi-Tawi produces ~40% of national seaweed but gets minimal investment.
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
            How accurately does "Success to the Successful" reflect the imbalance between mainland and island provinces?
          </Label>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q_s5_successful === opt ? activeBtnClass : inactiveBtnClass)}
                onClick={() => update("q_s5_successful", opt)}>{opt}</Button>
            ))}
          </div>
          {successfulAgree && (
            <div className="mt-4 pt-4 border-t border-[#C9A84C]/20 dark:border-[#C9A84C]/10 space-y-3">
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
                Which island province has the greatest untapped potential, and what investment would unlock it?
              </Label>
              <Textarea value={data.q_s5_successful_followup || ""} onChange={(e) => update("q_s5_successful_followup", e.target.value)}
                placeholder="Type your response here..." rows={3}
                className="bg-white border-[#C9A84C]/30 focus-visible:ring-[#C9A84C] text-[#022c22] dark:bg-[#022c22] dark:text-[#ecfdf5] dark:border-[#C9A84C]/30" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Section5_Transformers;
