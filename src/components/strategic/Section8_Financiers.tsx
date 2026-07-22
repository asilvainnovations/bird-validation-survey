// src/components/strategic/Section8_Financiers.tsx
// BIRD 2026–2035 · Section 8: Cluster 5 — Financiers
// Updated: 2026-07-23 · Strict schema alignment, shadcn/ui components

import React from "react";
import { Landmark, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SurveySchemaType } from "@/lib/survey-schema";
import { BIRD_IMAGES } from "@/lib/bird-urls";

// ✅ shadcn/ui imports only — no custom wrappers
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// ✅ Strict type from single source of truth
export type Section8Data = Pick<
  SurveySchemaType,
  | "q08_finance_tier"
  | "q08_instruments"
  | "q08_s_big_man"
  | "q08_s_shifting_burden"
  | "q08_s_islamic_finance_impact"
  | "q08_s_islamic_finance_likelihood"
>;

interface Section8Props {
  data: Section8Data;
  onChange: (data: Section8Data) => void;
}

// ── Design tokens ────────────────────────────────────────────────────────
const activeBtn = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 hover:text-white";
const inactiveBtn = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-emerald-50/50";
const activeScale = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
const inactiveScale = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";

const archetypeOptions = ["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"];

// ═══════════════════════════════════════════════════════════════════════════
export const Section8_Financiers: React.FC<Section8Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section8Data>(field: K, value: Section8Data[K]) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <Landmark className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 8: Cluster 5 — Financiers
        </h2>
      </div>
      <p className="text-sm text-[#065f46] -mt-2">
        Powering the Bloodstream of the Economy — Islamic finance mechanisms from Shariah banking to microfinance.
      </p>

      {/* ── 1. Cluster Banner Image ────────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.cluster5Financiers.url}
          alt={BIRD_IMAGES.cluster5Financiers.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">{BIRD_IMAGES.cluster5Financiers.description}</p>
        </div>
      </div>

      {/* ── 2. Context Card ────────────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6">
          <p className="text-sm text-[#022c22] leading-relaxed">
            <strong>Two interconnected loops:</strong> Ethical Capital Supply and Cultural Trust, joined by Financial Inclusion at the center. 
            Key highlights: Systemic Advantage (Islamic banking promotes risk-sharing and asset-backed financing), 
            Landmark Integration (RA 11439 legal framework for post-conflict enterprises), 
            Capital Mechanisms (Shariah-compliant banking, Waqf endowments, Takaful insurance, Microfinance for MSMEs).
          </p>
        </CardContent>
      </Card>

      {/* ── 3. Contextual Questions ────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">Islamic Finance Priority Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Finance Tier Priority */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22]">
              Which tier of Shariah-compliant finance should be the highest priority for BARMM?
            </Label>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Macro-Capital (Sukuk, infrastructure banking)",
                "Risk Mitigation (Takaful, insurance)",
                "Micro-Access (Microfinance, Waqf for MSMEs)",
              ].map((opt) => (
                <Button key={opt} type="button" variant="outline"
                  className={cn("justify-start h-auto py-3 text-sm text-left", data.q08_finance_tier === opt ? activeBtn : inactiveBtn)}
                  onClick={() => update("q08_finance_tier", opt)}>
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {/* Priority Instruments */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22]">
              Which Islamic finance instruments should BARMM prioritize?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Murabaha", "Musharaka", "Mudaraba", "Sukuk", "Takaful", "Waqf"].map((opt) => (
                <Button key={opt} type="button" variant="outline"
                  className={cn("justify-start h-auto py-3 text-sm text-left", data.q08_instruments?.includes(opt) ? activeBtn : inactiveBtn)}
                  onClick={() => {
                    const arr = data.q08_instruments || [];
                    update("q08_instruments", arr.includes(opt) ? arr.filter((i) => i !== opt) : [...arr, opt]);
                  }}>
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {/* Islamic Finance Impact Scale */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22]">
              Rate the impact of Islamic Finance Legal Framework (RA 11439) on capital mobilization
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Impact (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q08_s_islamic_finance_impact === v ? activeScale : inactiveScale)}
                      onClick={() => update("q08_s_islamic_finance_impact", v)}>
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
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q08_s_islamic_finance_likelihood === v ? activeScale : inactiveScale)}
                      onClick={() => update("q08_s_islamic_finance_likelihood", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 4. Archetype: The Big Man ──────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-semibold text-[#022c22]">Archetype: The Big Man</h3>
          </div>
          {BIRD_IMAGES.bigManArchetype && (
            <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
              <img src={BIRD_IMAGES.bigManArchetype.url} alt={BIRD_IMAGES.bigManArchetype.alt}
                className="w-full h-auto object-contain" loading="lazy" />
            </div>
          )}
          <p className="text-sm text-[#022c22]">
            Concentration of financial decision-making power in few individuals or institutions limits inclusive access to capital. 
            Public budgets are consumed by administrative bloat rather than productive investment.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            How accurately does the &quot;Big Man&quot; archetype reflect the political and clan dynamics affecting access to capital in BARMM?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {archetypeOptions.map((opt) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q08_s_big_man === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q08_s_big_man", opt)}>
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 5. Archetype: Shifting the Burden ──────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-semibold text-[#022c22]">Archetype: Shifting the Burden</h3>
          </div>
          {BIRD_IMAGES.shiftingBurden && (
            <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
              <img src={BIRD_IMAGES.shiftingBurden.url} alt={BIRD_IMAGES.shiftingBurden.alt}
                className="w-full h-auto object-contain" loading="lazy" />
            </div>
          )}
          <p className="text-sm text-[#022c22]">
            Reliance on external development assistance undermines domestic financial system development. 
            Short-term capital injections replace deeper financial system reforms.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            How accurately does &quot;Shifting the Burden&quot; reflect how BARMM addresses capital access and financial inclusion challenges?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {archetypeOptions.map((opt) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q08_s_shifting_burden === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q08_s_shifting_burden", opt)}>
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 6. Islamic Finance Framework Image ─────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          {BIRD_IMAGES.islamicFinance && (
            <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
              <img src={BIRD_IMAGES.islamicFinance.url} alt={BIRD_IMAGES.islamicFinance.alt}
                className="w-full h-auto object-contain" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <p className="text-xs italic text-white/70">{BIRD_IMAGES.islamicFinance.title}</p>
              </div>
            </div>
          )}
          <p className="text-sm text-[#022c22]">
            <strong>Islamic Finance Framework for BARMM</strong> including Shariah-compliant instruments, 
            regulatory architecture, and market development pathways aligned with RA 11439.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Section8_Financiers;
