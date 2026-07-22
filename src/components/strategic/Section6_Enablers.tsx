// src/components/strategic/Section6_Enablers.tsx
// BIRD 2026–2035 · Section 6: Cluster 3 — Enablers
// Updated: 2026-07-23 · Strict schema alignment, shadcn/ui components

import React from "react";
import { Zap, Wifi, Route, GraduationCap, HeartPulse, AlertTriangle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SurveySchemaType } from "@/lib/survey-schema";
import { BIRD_IMAGES } from "@/lib/bird-urls";

// ✅ shadcn/ui imports only — no custom wrappers
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// ✅ Strict type from single source of truth
export type Section6Data = Pick<
  SurveySchemaType,
  | "q06_infra"
  | "q06_sectors"
  | "q06_s_shifting_burden"
  | "q06_s_growth_underinvest"
  | "q06_s_skills_mismatch_impact"
  | "q06_s_skills_mismatch_likelihood"
>;

interface Section6Props {
  data: Section6Data;
  onChange: (data: Section6Data) => void;
}

// ── Design tokens ────────────────────────────────────────────────────────
const activeBtn = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 hover:text-white";
const inactiveBtn = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-emerald-50/50";
const activeScale = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
const inactiveScale = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";

const archetypeOptions = ["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"];

const enablers = [
  { icon: Wifi, title: "Digital Connectivity", desc: "Broadband, e-governance, and cybersecurity to accelerate investment facilitation." },
  { icon: Route, title: "Physical Infrastructure", desc: "Ports, airports, and cold-chain logistics to reduce post-harvest losses." },
  { icon: GraduationCap, title: "Education & Skills", desc: "Aligning TESDA programs with industry needs to close the 59.3% literacy gap." },
  { icon: HeartPulse, title: "Health & Social Protection", desc: "Workforce resilience through accessible healthcare and social safety nets." },
];

// ═══════════════════════════════════════════════════════════════════════════
export const Section6_Enablers: React.FC<Section6Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section6Data>(field: K, value: Section6Data[K]) =>
    onChange({ ...data, [field]: value });

  const showShiftingFollowup = data.q06_s_shifting_burden === "Very accurately" || data.q06_s_shifting_burden === "Somewhat accurately";
  const showGrowthFollowup = data.q06_s_growth_underinvest === "Very accurately" || data.q06_s_growth_underinvest === "Somewhat accurately";

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 6: Cluster 3 — Enablers
        </h2>
      </div>
      <p className="text-sm text-[#065f46] -mt-2">
        Constructing the Support Architecture — the backbone that sustains industrialization and inclusive growth.
      </p>

      {/* ── 1. Cluster Banner Image ────────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.cluster3Enablers.url}
          alt={BIRD_IMAGES.cluster3Enablers.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">{BIRD_IMAGES.cluster3Enablers.description}</p>
        </div>
      </div>

      {/* ── 2. Four Enablers Grid ──────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">Four Enablers for Bangsamoro Development</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enablers.map((e) => (
              <div key={e.title} className="flex items-start gap-3 p-4 rounded-lg border border-[#C9A84C]/20 bg-emerald-50/30">
                <e.icon className="w-5 h-5 text-[#C9A84C] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#022c22]">{e.title}</p>
                  <p className="text-xs text-[#065f46]">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 3. SWOT Scale: Skills Mismatch ─────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-700">WEAKNESS</span>
            Skills Mismatch Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Skills Gap Image */}
          {BIRD_IMAGES.skillsEducationGap && (
            <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
              <img src={BIRD_IMAGES.skillsEducationGap.url} alt={BIRD_IMAGES.skillsEducationGap.alt}
                className="w-full h-auto object-contain" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <p className="text-xs italic text-white/70">{BIRD_IMAGES.skillsEducationGap.title}</p>
              </div>
            </div>
          )}
          <p className="text-sm text-[#065f46]">
            Gap Analysis Matrix showing how Bangsamoro&apos;s workforce training lags behind industry needs in Agriculture, Infrastructure, and Halal Industry.
          </p>

          {/* SWOT Scale */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#022c22]">
              <strong>W8: Skills Mismatch.</strong> TVIs are not fully aligned with what industries need — especially in halal manufacturing and modern agriculture.
            </p>
            <p className="text-xs text-[#065f46] italic">Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Impact (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q06_s_skills_mismatch_impact === v ? activeScale : inactiveScale)}
                      onClick={() => update("q06_s_skills_mismatch_impact", v)}>
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
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q06_s_skills_mismatch_likelihood === v ? activeScale : inactiveScale)}
                      onClick={() => update("q06_s_skills_mismatch_likelihood", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sector Ranking Question */}
          <div className="space-y-3 pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22]">
              Which sector should be prioritized first for new training programs to close the education gap?
            </Label>
            <div className="grid grid-cols-1 gap-3">
              {["Agriculture (seed suppliers, mechanized farming)", "Infrastructure (heavy equipment, document controllers)", "Halal Industry (auditors, food safety officers)"].map((opt) => (
                <Button key={opt} type="button" variant="outline"
                  className={cn("justify-start h-auto py-3 text-sm text-left", data.q06_sectors?.includes(opt) ? activeBtn : inactiveBtn)}
                  onClick={() => {
                    const arr = data.q06_sectors || [];
                    update("q06_sectors", arr.includes(opt) ? arr.filter((s) => s !== opt) : [...arr, opt]);
                  }}>
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 4. Enabling Grid Image + Sequencing Question ───────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          {BIRD_IMAGES.enablingGrid && (
            <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
              <img src={BIRD_IMAGES.enablingGrid.url} alt={BIRD_IMAGES.enablingGrid.alt}
                className="w-full h-auto object-contain" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <p className="text-xs italic text-white/70">{BIRD_IMAGES.enablingGrid.title}</p>
              </div>
            </div>
          )}
          <p className="text-sm text-[#065f46]">
            Four sequential stages: Energy Priming → Physical Mobility → Logistics Integrity → Industrial Scaling. Infrastructure readiness must precede industrial scaling.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            How effectively does Bangsamoro&apos;s current infrastructure sequencing support future industrial expansion? (1–5)
          </Label>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5].map((v) => (
              <Button key={v} type="button" variant="outline" size="icon"
                className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q06_infra === v ? activeScale : inactiveScale)}
                onClick={() => update("q06_infra", v)}>
                {v}
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
            Short-term interventions (emergency relief, ad hoc incentives) replace deeper structural reforms. The system becomes dependent on external fixes while local institutional capacity weakens.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            How accurately does &quot;Shifting the Burden&quot; reflect how BARMM addresses infrastructure, education, and digital connectivity challenges?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {archetypeOptions.map((opt) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q06_s_shifting_burden === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q06_s_shifting_burden", opt)}>
                {opt}
              </Button>
            ))}
          </div>
          {showShiftingFollowup && (
            <div className="space-y-2 pt-2">
              <Label className="text-sm font-medium text-[#022c22]">
                Describe a case where a short-term fix either led to reform or failed and the problem returned.
              </Label>
              <Textarea placeholder="Type your response..." rows={3}
                className="bg-white border-[#C9A84C]/30 focus-visible:ring-[#C9A84C] text-[#022c22]" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── 6. Archetype: Growth and Underinvestment ───────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-semibold text-[#022c22]">Archetype: Growth and Underinvestment</h3>
          </div>
          {BIRD_IMAGES.growthUnderinvestment && (
            <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
              <img src={BIRD_IMAGES.growthUnderinvestment.url} alt={BIRD_IMAGES.growthUnderinvestment.alt}
                className="w-full h-auto object-contain" loading="lazy" />
            </div>
          )}
          <p className="text-sm text-[#022c22]">
            Growth in investment and population increases demand for education, infrastructure, and services. But chronic underinvestment creates bottlenecks that slow further growth — a classic capacity trap.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            How accurately does this describe the gap between BARMM&apos;s growing economy and its lagging support systems?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {archetypeOptions.map((opt) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q06_s_growth_underinvest === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q06_s_growth_underinvest", opt)}>
                {opt}
              </Button>
            ))}
          </div>
          {showGrowthFollowup && (
            <div className="space-y-2 pt-2">
              <Label className="text-sm font-medium text-[#022c22]">
                Which sector — education, energy, or digital — suffers most from chronic underinvestment?
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

export default Section6_Enablers;
