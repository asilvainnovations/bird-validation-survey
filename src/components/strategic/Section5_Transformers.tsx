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
  | "q05_barrier"
  | "q05_halal_park"
  | "q05_s_fixes_fail"
  | "q05_s_successful"
  | "q05_s_halal_cert_impact"
  | "q05_s_halal_cert_likelihood"
>;

interface Section5Props {
  data: Section5Data;
  onChange: (data: Section5Data) => void;
}

// ── Design tokens ────────────────────────────────────────────────────────
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
          Section 5: Cluster 2 — Transformers
        </h2>
      </div>
      <p className="text-sm text-[#065f46] -mt-2">
        Engines of Value Creation — converting raw materials into high-value halal products and premium exports.
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

      {/* ── 3. SWOT Scales ─────────────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-700">SWOT SCALES</span>
            Rate Key Transformer Factors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-xs text-[#065f46] italic -mt-4">
            Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>

          {/* W3: Weak Halal Certification */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <p className="text-sm font-medium text-[#022c22]">
              <strong>W3: Weak Halal Certification System.</strong> BHB lacks resources and international recognition. 45–60 days vs Malaysia&apos;s 15-day benchmark.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Impact (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q05_s_halal_cert_impact === v ? activeScale : inactiveScale)}
                      onClick={() => update("q05_s_halal_cert_impact", v)}>
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
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q05_s_halal_cert_likelihood === v ? activeScale : inactiveScale)}
                      onClick={() => update("q05_s_halal_cert_likelihood", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Halal Pipeline Image + Question */}
          <div className="space-y-4 pb-6 border-b border-[#C9A84C]/20">
            <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
              <img src={BIRD_IMAGES.farmToMarketPipeline.url} alt={BIRD_IMAGES.farmToMarketPipeline.alt}
                className="w-full h-auto object-contain" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <p className="text-xs italic text-white/70">{BIRD_IMAGES.farmToMarketPipeline.title}</p>
              </div>
            </div>
            <p className="text-sm text-[#065f46]">{BIRD_IMAGES.farmToMarketPipeline.description}</p>
          </div>

          {/* Industrial Zones Image */}
          <div className="space-y-4">
            <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
              <img src={BIRD_IMAGES.industrialEconomicZones.url} alt={BIRD_IMAGES.industrialEconomicZones.alt}
                className="w-full h-auto object-contain" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <p className="text-xs italic text-white/70">{BIRD_IMAGES.industrialEconomicZones.title}</p>
              </div>
            </div>
            <p className="text-sm text-[#065f46]">{BIRD_IMAGES.industrialEconomicZones.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* ── 4. Contextual Questions ────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">Key Transformer Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Barrier */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22]">
              What is the single biggest barrier to growing the Transformers cluster?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Halal certification delays", "Lack of processing facilities", "Weak market linkages",
                "Skills mismatch", "Competition from Malaysia/Indonesia", "Limited cold chain"].map((opt) => (
                <Button key={opt} type="button" variant="outline"
                  className={cn("justify-start h-auto py-3 text-sm text-left", data.q05_barrier === opt ? activeBtn : inactiveBtn)}
                  onClick={() => update("q05_barrier", opt)}>
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {/* Halal Park */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22]">
              Should BARMM prioritize a dedicated Halal Industrial Park?
            </Label>
            <div className="grid grid-cols-1 gap-3">
              {["Yes — essential for competitiveness", "Yes — but after certification reform",
                "No — focus on distributed MSMEs", "No — too resource-intensive"].map((opt) => (
                <Button key={opt} type="button" variant="outline"
                  className={cn("justify-start h-auto py-3 text-sm text-left", data.q05_halal_park === opt ? activeBtn : inactiveBtn)}
                  onClick={() => update("q05_halal_park", opt)}>
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 5. Archetype: Fixes that Fail ──────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-semibold text-[#022c22]">Archetype: Fixes that Fail</h3>
          </div>
          {BIRD_IMAGES.fixesThatFail && (
            <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
              <img src={BIRD_IMAGES.fixesThatFail.url} alt={BIRD_IMAGES.fixesThatFail.alt}
                className="w-full h-auto object-contain" loading="lazy" />
            </div>
          )}
          <p className="text-sm text-[#022c22]">
            Short-term tax incentives and fragmented subsidies create the illusion of progress but erode institutional capacity over time. Each &quot;quick fix&quot; postpones systemic reform.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            How accurately does &quot;Fixes that Fail&quot; capture unintended consequences of short-term industrial policy in BARMM?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {archetypeOptions.map((opt) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q05_s_fixes_fail === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q05_s_fixes_fail", opt)}>
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 6. Archetype: Success to the Successful ────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-semibold text-[#022c22]">Archetype: Success to the Successful</h3>
          </div>
          {BIRD_IMAGES.successSuccessful && (
            <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
              <img src={BIRD_IMAGES.successSuccessful.url} alt={BIRD_IMAGES.successSuccessful.alt}
                className="w-full h-auto object-contain" loading="lazy" />
            </div>
          )}
          <p className="text-sm text-[#022c22]">
            Mainland provinces attract the bulk of resources while island provinces with high potential (e.g., Tawi-Tawi&apos;s 40% national seaweed output) are left behind.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            How accurately does this reflect the imbalance between mainland and island provinces?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {archetypeOptions.map((opt) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q05_s_successful === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q05_s_successful", opt)}>
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Section5_Transformers;
