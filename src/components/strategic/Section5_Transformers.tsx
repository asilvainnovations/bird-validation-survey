// src/components/strategic/Section5_Transformers.tsx
// BIRD 2026–2035 · Section 5: Cluster 2 — Transformers
// Updated: 2026-07-23 · Strict schema alignment, shadcn/ui components

import React from "react";
import { Factory, AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SurveySchemaType } from "@/lib/survey-schema";
import { BIRD_IMAGES } from "@/lib/bird-urls";

// ✅ shadcn/ui imports only — no custom wrappers
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// ✅ Strict type from single source of truth
export type Section5Data = Pick<
  SurveySchemaType,
  | "q_s1_halal_legitimacy_impact"
  | "q_s1_halal_legitimacy_likelihood"
  | "q_s1_domestic_halal_impact"
  | "q_s1_domestic_halal_likelihood"
  | "q_s6_polloc_impact"
  | "q_s6_polloc_likelihood"
  | "q_s5_halal_cert_impact"
  | "q_s5_halal_cert_likelihood"
  | "q_s5_standards_recognition_impact"
  | "q_s5_standards_recognition_likelihood"
  | "q_s5_postharvest_impact"
  | "q_s5_postharvest_likelihood"
  | "q_s5_fixes_fail"
  | "q_s5_fixes_followup"
  | "q_s5_growth_underinvest"
  | "q_s5_growth_followup"
  | "q5_1_halal_sector_rank"
  | "q5_2_cold_chain"
  | "q5_3_economic_zones"
>;

interface Section5Props {
  data: Section5Data;
  onChange: (data: Section5Data) => void;
}

// ── Design tokens ───────────────────────────────────────────────────────
const activeBtn = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 hover:text-white";
const inactiveBtn = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-emerald-50/50";
const activeScale = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
const inactiveScale = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";

const archetypeOptions = ["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"];

// ═══════════════════════════════════════════════════════════════════════════
export const Section5_Transformers: React.FC<Section5Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section5Data>(field: K, value: Section5Data[K]) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <Factory className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 5: Cluster 2 — Transformers: Engines of Value Creation
        </h2>
      </div>
      <p className="text-sm text-[#065f46] -mt-2">
        The Transformers cluster converts raw materials into higher-value halal products. This is where cultural authenticity becomes economic advantage.
      </p>

      {/* ── 1. Cluster Banner Image ────────────────────────────────── */}
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

      {/* ── 2. Context Card ────────────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6">
          <p className="text-sm text-[#022c22] leading-relaxed">
            <strong>Three-stage progression:</strong> Raw Material (basic agro-processing) →
            High-Value Processing (5,000+ halal-certified MSMEs by 2035, WOW Matanog SEZ) →
            Premium Export (halal pharmaceuticals, cosmetics, premium foods targeting the USD 2.3 trillion ASEAN halal market).
          </p>
        </CardContent>
      </Card>

      {/* ── 3. SWOT Scales: Strengths ──────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">STRENGTH</span>
            Foundational Strengths for Transformers Cluster
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-xs text-[#065f46] italic -mt-4">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>

          {/* S1: Halal Legitimacy */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <p className="text-sm font-medium text-[#022c22]">
              <strong>S1: Halal Legitimacy & Cultural Credibility.</strong> BARMM is an authentic Muslim-majority region, giving it a unique and trusted position in the global halal market.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Impact (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s1_halal_legitimacy_impact === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s1_halal_legitimacy_impact", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Likelihood (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s1_halal_legitimacy_likelihood === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s1_halal_legitimacy_likelihood", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* S4: Large Domestic Halal Market */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#022c22]">
              <strong>S4: Large Domestic Halal Market.</strong> With 5.69 million Muslim consumers in BARMM, there is strong built-in local demand for halal products and services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Impact (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s1_domestic_halal_impact === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s1_domestic_halal_impact", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Likelihood (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s1_domestic_halal_likelihood === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s1_domestic_halal_likelihood", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 4. The Halal Industry Advantage Image ──────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Capitalizing%20Cultural%20Advantage%20-%20Halal%20Industry%20Adv.png"
              alt="The Halal Industry Advantage"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">The Halal Industry Advantage: Capitalizing on Cultural Heritage</p>
            </div>
          </div>
          <p className="text-sm text-[#022c22]">
            <strong>Three key sectors:</strong> Halal Food & Beverage (coconut-based by-products), Halal Cosmetics (beauty for Muslim consumers), Halal Pharmaceuticals (compliant medicine). The BIMP-EAGA trade corridor connects Bangsamoro to a large regional Muslim population.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            Rank which halal sector offers the greatest growth potential for Bangsamoro&apos;s ASEAN market integration.
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {["Halal Food & Beverage", "Halal Cosmetics", "Halal Pharmaceuticals"].map((opt, idx) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q5_1_halal_sector_rank === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q5_1_halal_sector_rank", opt)}>
                <span className={cn("flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 mr-3",
                  data.q5_1_halal_sector_rank === opt ? "bg-white/20 text-white" : "bg-[#C9A84C]/10 text-[#C9A84C]")}>
                  {data.q5_1_halal_sector_rank === opt ? idx + 1 : ""}
                </span>
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 5. Farm-to-Market Pipeline Image ──────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Transformers-Farm-to-Market%20Pipeline%20.png"
              alt="MAFAR Halal Farm-to-Market Pipeline"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">Transformers: MAFAR Halal Farm-to-Market Pipeline</p>
            </div>
          </div>
          <p className="text-sm text-[#022c22]">
            <strong>Four stages:</strong> Input Supply (hatcheries, feed mills), Cold Chain & Logistics (roads, ice plants, cold storage), Processing (halal livestock, poultry, seaweed), Market Linkage (halal pasalubong centers, BIMP-EAGA export).
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            Do you think improving cold-chain and logistics will significantly strengthen Bangsamoro&apos;s halal farm-to-market pipeline?
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly disagree"].map((opt) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("h-auto py-3 text-sm text-center", data.q5_2_cold_chain === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q5_2_cold_chain", opt)}>
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 6. SWOT Scales: Weaknesses & Threats ─────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-700">WEAKNESS / THREAT</span>
            Barriers to Industrial Transformation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-xs text-[#065f46] italic -mt-4">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>

          {/* W7: Limited Agro-Processing */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <p className="text-sm font-medium text-[#022c22]">
              <strong>W7: Limited Agro-Processing and Cold Chain.</strong> Without proper storage and processing facilities, 20–40% of farm produce is lost after harvest, cutting farmer income.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Impact (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s5_postharvest_impact === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s5_postharvest_impact", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Likelihood (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s5_postharvest_likelihood === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s5_postharvest_likelihood", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* S6: Polloc Freeport */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <p className="text-sm font-medium text-[#022c22]">
              <strong>S6: Polloc Freeport & Economic Zone.</strong> This logistics and trade hub in Maguindanao del Norte serves as a strategic gateway for goods entering and leaving BARMM.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Impact (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s6_polloc_impact === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s6_polloc_impact", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Likelihood (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s6_polloc_likelihood === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s6_polloc_likelihood", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* W3: Weak Halal Certification */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <p className="text-sm font-medium text-[#022c22]">
              <strong>W3: Weak Halal Certification System.</strong> The Bangsamoro Halal Board (BHB) lacks resources and international recognition, making it hard for local producers to export halal goods.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Impact (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s5_halal_cert_impact === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s5_halal_cert_impact", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Likelihood (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s5_halal_cert_likelihood === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s5_halal_cert_likelihood", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* T3: Standards Recognition Risk */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#022c22]">
              <strong>T3: Halal Standards Recognition Risk.</strong> BARMM&apos;s halal certifications are not yet aligned with OIC/SMIIC international standards, which may block export access.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Impact (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s5_standards_recognition_impact === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s5_standards_recognition_impact", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Likelihood (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s5_standards_recognition_likelihood === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s5_standards_recognition_likelihood", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 7. Industrial and Economic Zones Image ───────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Industrial%20and%20Economic%20Zones.png"
              alt="Industrial and Economic Zones"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">The Transformers: Capturing Value Through Industrial and Economic Zones</p>
            </div>
          </div>
          <p className="text-sm text-[#022c22]">
            <strong>Polloc Freeport & EcoZone</strong> (119-hectare agro-industrial hub in Parang, ADB-funded) and <strong>WOW Matanog Special Economic Zone</strong> (upcoming Bangsamoro Halal Park for halal-compliant manufacturing).
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            Will developing economic zones like Polloc Freeport and WOW Matanog significantly boost industrial and halal trade capacity?
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly disagree"].map((opt) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("h-auto py-3 text-sm text-center", data.q5_3_economic_zones === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q5_3_economic_zones", opt)}>
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 8. Archetype: Growth and Underinvestment ─────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-semibold text-[#022c22]">Archetype: Growth and Underinvestment</h3>
          </div>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Growth%20and%20Underinvestment%20(1).png"
              alt="Growth and Underinvestment Archetype"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            Rapid investment expansion can stall when institutional capacity fails to keep pace. As investment increases, facilitation capacity expands, improving processing and approvals. But when capacity hits its ceiling, backlogs and delays erode investor confidence, reducing attractiveness and slowing new investment.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            How accurately does &quot;Growth and Underinvestment&quot; describe the gap between BARMM&apos;s investment growth and its institutional capacity?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {archetypeOptions.map((opt) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q_s5_growth_underinvest === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q_s5_growth_underinvest", opt)}>
                {opt}
              </Button>
            ))}
          </div>
          {(data.q_s5_growth_underinvest === "Very accurately" || data.q_s5_growth_underinvest === "Somewhat accurately") && (
            <div className="space-y-2 pt-2">
              <Label className="text-sm font-medium text-[#022c22]">
                Which capacity constraint is most limiting — halal certification, infrastructure, or skills development?
              </Label>
              <Textarea placeholder="Type your response..." rows={3}
                className="bg-white border-[#C9A84C]/30 focus-visible:ring-[#C9A84C] text-[#022c22]" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Section5_Transformers;
