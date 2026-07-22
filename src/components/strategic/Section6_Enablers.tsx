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
  | "q_s6_youth_pop_impact"
  | "q_s6_youth_pop_likelihood"
  | "q_s6_poverty_impact"
  | "q_s6_poverty_likelihood"
  | "q_s6_literacy_impact"
  | "q_s6_literacy_likelihood"
  | "q_s6_skills_mismatch_impact"
  | "q_s6_skills_mismatch_likelihood"
  | "q_s6_renewable_energy_impact"
  | "q_s6_renewable_energy_likelihood"
  | "q_s6_polloc_impact"
  | "q_s6_polloc_likelihood"
  | "q_s6_infra_deficits_impact"
  | "q_s6_infra_deficits_likelihood"
  | "q_s6_tech_adoption_impact"
  | "q_s6_tech_adoption_likelihood"
  | "q_s6_renewable_invest_impact"
  | "q_s6_renewable_invest_likelihood"
  | "q_s6_tourism_potential_impact"
  | "q_s6_tourism_potential_likelihood"
  | "q_s6_political_transition_impact"
  | "q_s6_political_transition_likelihood"
  | "q_s6_cost_overruns_impact"
  | "q_s6_cost_overruns_likelihood"
  | "q_s6_natl_coord_impact"
  | "q_s6_natl_coord_likelihood"
  | "q_s6_shifting_burden"
  | "q_s6_shifting_followup"
  | "q_s6_limits_growth"
  | "q_s6_limits_followup"
  | "q6_1_sector_priority"
  | "q6_2_sequencing_effectiveness"
  | "q6_3_begmp_confidence"
  | "q6_4_tourism_confidence"
  | "q6_5_digital_components_rank"
  | "q6_6_moral_governance_realistic"
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

// ── Enablers context data ─────────────────────────────────────────
const enablers = [
  { icon: <Wifi className="w-5 h-5 text-[#C9A84C]" />, title: "Digital Connectivity", desc: "Expanding broadband, e-governance, and cybersecurity to accelerate investment facilitation" },
  { icon: <Route className="w-5 h-5 text-[#C9A84C]" />, title: "Physical Infrastructure", desc: "Improving ports, airports, and cold-chain logistics to reduce post-harvest losses" },
  { icon: <GraduationCap className="w-5 h-5 text-[#C9A84C]" />, title: "Education & Skills", desc: "Aligning TESDA programs with industry needs to close the 59.3% literacy gap" },
  { icon: <HeartPulse className="w-5 h-5 text-[#C9A84C]" />, title: "Health & Social Protection", desc: "Ensuring workforce resilience through accessible healthcare and social safety nets" },
];

// ═══════════════════════════════════════════════════════════════════════════
export const Section6_Enablers: React.FC<Section6Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section6Data>(field: K, value: Section6Data[K]) =>
    onChange({ ...data, [field]: value });

  return (
    <div className="space-y-6">
      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Cluster 3 — Enablers: Constructing the Support Architecture
        </h2>
      </div>
      <p className="text-sm text-[#065f46] -mt-2">
        The Enablers cluster forms the backbone that supports industrialization and inclusive growth across Bangsamoro — from broadband to cold-chain logistics.
      </p>

      {/* ── 1. Cluster Banner Image ──────────────────────────────── */}
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

      {/* ── 2. Context Card ──────────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">Four Enablers for Bangsamoro Development</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enablers.map((e) => (
              <div key={e.title} className="flex items-start gap-3 p-4 rounded-lg border border-[#C9A84C]/20 bg-white/60">
                <div className="mt-0.5 shrink-0">{e.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-[#022c22]">{e.title}</p>
                  <p className="text-xs text-[#065f46]">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 3. SWOT Scales: Strengths ────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">STRENGTH</span>
            Enablers Cluster Strengths
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-xs text-[#065f46] italic -mt-4">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>

          {/* S5: Young and Growing Population */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <p className="text-sm font-medium text-[#022c22]">
              <strong>S5: Young and Growing Population.</strong> BARMM&apos;s population grows at 3.43% per year (the highest in the Philippines), creating a large future workforce and consumer base.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Impact (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s6_youth_pop_impact === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s6_youth_pop_impact", v)}>
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
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s6_youth_pop_likelihood === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s6_youth_pop_likelihood", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* S8: Renewable Energy Potential */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <p className="text-sm font-medium text-[#022c22]">
              <strong>S8: Renewable Energy Potential.</strong> Untapped hydro (Lake Lanao), solar, and biomass resources can attract clean energy investments.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Impact (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s6_renewable_energy_impact === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s6_renewable_energy_impact", v)}>
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
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s6_renewable_energy_likelihood === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s6_renewable_energy_likelihood", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* S6: Polloc Freeport */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#022c22]">
              <strong>S6: Polloc Freeport & Economic Zone.</strong> Strategic logistics and trade hub in Maguindanao del Norte serving as a gateway for goods entering and leaving BARMM.
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
        </CardContent>
      </Card>

      {/* ── 4. SWOT Scales: Weaknesses ───────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-700">WEAKNESS</span>
            Critical Enablers Gaps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-xs text-[#065f46] italic -mt-4">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>

          {/* W2: Highest Poverty Incidence */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <p className="text-sm font-medium text-[#022c22]">
              <strong>W2: Highest Poverty Incidence in the Philippines.</strong> At 34.8%, poverty limits people&apos;s ability to buy goods and services, shrinking the domestic market.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Impact (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s6_poverty_impact === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s6_poverty_impact", v)}>
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
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s6_poverty_likelihood === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s6_poverty_likelihood", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* W4: Low Functional Literacy Rate */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <p className="text-sm font-medium text-[#022c22]">
              <strong>W4: Low Functional Literacy Rate.</strong> At 59.3%, BARMM has the lowest literacy rate in the country, creating a serious shortage of skilled workers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Impact (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s6_literacy_impact === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s6_literacy_impact", v)}>
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
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s6_literacy_likelihood === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s6_literacy_likelihood", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* W8: Skills Mismatch */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <p className="text-sm font-medium text-[#022c22]">
              <strong>W8: Skills Mismatch.</strong> Technical schools (TVIs) are not fully aligned with what industries need — especially in halal manufacturing and modern agriculture.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Impact (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s6_skills_mismatch_impact === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s6_skills_mismatch_impact", v)}>
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
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s6_skills_mismatch_likelihood === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s6_skills_mismatch_likelihood", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* W1: Critical Infrastructure Deficits */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <p className="text-sm font-medium text-[#022c22]">
              <strong>W1: Critical Infrastructure Deficits.</strong> Gaps in energy, roads, digital connectivity, and water supply make it hard for businesses to operate, especially in island provinces.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Impact (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s6_infra_deficits_impact === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s6_infra_deficits_impact", v)}>
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
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s6_infra_deficits_likelihood === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s6_infra_deficits_likelihood", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* W10: Low Technology Adoption */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#022c22]">
              <strong>W10: Low Technology Adoption.</strong> Many farms and businesses still use old methods, with slow uptake of modern tools.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs text-[#065f46]">Impact (1–5)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button key={v} type="button" variant="outline" size="icon"
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s6_tech_adoption_impact === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s6_tech_adoption_impact", v)}>
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
                      className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q_s6_tech_adoption_likelihood === v ? activeScale : inactiveScale)}
                      onClick={() => update("q_s6_tech_adoption_likelihood", v)}>
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 5. Skills and Education Gap Image ────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Skills%20and%20Education%20Gap.png"
              alt="Skills and Education Gap Analysis"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">Gap Analysis Matrix: Workforce Training vs Industry Needs</p>
            </div>
          </div>
          <p className="text-sm text-[#022c22]">
            The matrix compares three sectors: <strong>Agriculture</strong> (demand for seed suppliers and mechanized farming but no available training), <strong>Infrastructure</strong> (need for heavy equipment operators but shortage of advanced training), <strong>Halal Industry</strong> (demand for auditors and food safety officers but no available training).
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            Rank which sector—Agriculture, Infrastructure, or Halal Industry—should be prioritized first for new training programs to close the education gap.
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {["Agriculture", "Infrastructure", "Halal Industry"].map((opt, idx) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q6_1_sector_priority === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q6_1_sector_priority", opt)}>
                <span className={cn("flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 mr-3",
                  data.q6_1_sector_priority === opt ? "bg-white/20 text-white" : "bg-[#C9A84C]/10 text-[#C9A84C]")}>
                  {data.q6_1_sector_priority === opt ? idx + 1 : ""}
                </span>
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 6. The Enabling Grid Image ───────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/BEIE-images/Layer%202%20-%20The%20Enabling%20Grid%20and%20Lawof%20Sequencing.png"
              alt="The Enabling Grid & The Law of Sequencing"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">The Enabling Grid: 2nd Layer of BARMM Interconnectivity</p>
            </div>
          </div>
          <p className="text-sm text-[#022c22]">
            <strong>Four sequential stages:</strong> Energy Priming (connecting islands to Mindanao grid), Physical Mobility (bridges and transport), Logistics Integrity (cold-storage and warehousing), Industrial Scaling (agro-industrial expansion). Infrastructure readiness must precede industrial scaling.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            On a scale of 1 to 5, how effectively do you think Bangsamoro&apos;s current infrastructure sequencing (energy, mobility, logistics, industrial) supports future industrial expansion?
          </Label>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5].map((v) => (
              <Button key={v} type="button" variant="outline" size="icon"
                className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q6_2_sequencing_effectiveness === v ? activeScale : inactiveScale)}
                onClick={() => update("q6_2_sequencing_effectiveness", v)}>
                {v}
              </Button>
            ))}
          </div>
          <p className="text-xs text-[#065f46]">1 = Not effective, 5 = Very effective</p>
        </CardContent>
      </Card>

      {/* ─ 7. Digital Transformation Plan Image ─────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Digital%20Transformation%20Master%20Plan.png"
              alt="Digital Transformation Master Plan"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">Digital Transformation (BEGMP)</p>
            </div>
          </div>
          <p className="text-sm text-[#022c22]">
            <strong>Roadmap bridging the digital divide:</strong> Broadband & Connectivity (data centers, last-mile hubs), Smart Cities (public safety, command centers), E-Government (digital identities, shared services), Cybersecurity (data protection, secure transactions).
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            On a scale of 1 to 5, how confident are you that the BEGMP roadmap will effectively bridge Bangsamoro&apos;s digital divide and improve governance efficiency?
          </Label>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5].map((v) => (
              <Button key={v} type="button" variant="outline" size="icon"
                className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q6_3_begmp_confidence === v ? activeScale : inactiveScale)}
                onClick={() => update("q6_3_begmp_confidence", v)}>
                {v}
              </Button>
            ))}
          </div>
          <p className="text-xs text-[#065f46]">1 = Not confident, 5 = Very confident</p>
        </CardContent>
      </Card>

      {/* ── 8. Tourism Master Plan Image ─────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tourism%20Master%20Plan.png"
              alt="Tourism Master Plan (BTDP 2024–2033)"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">Tourism Master Plan (BTDP 2024–2033)</p>
            </div>
          </div>
          <p className="text-sm text-[#022c22]">
            <strong>Three phases:</strong> Organizing (2025–2026), Stabilizing (2027–2028), Institutionalizing (2029–2033). ₱161.97B funded with 93% allocated to physical access and connectivity.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            On a scale of 1 to 5, how confident are you that prioritizing infrastructure and connectivity will make Bangsamoro globally competitive in tourism by 2033?
          </Label>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5].map((v) => (
              <Button key={v} type="button" variant="outline" size="icon"
                className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q6_4_tourism_confidence === v ? activeScale : inactiveScale)}
                onClick={() => update("q6_4_tourism_confidence", v)}>
                {v}
              </Button>
            ))}
          </div>
          <p className="text-xs text-[#065f46]">1 = Not confident, 5 = Very confident</p>
        </CardContent>
      </Card>

      {/* ── 9. Tourism and Digital Connectivity Image ────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Tourism%20and%20Digital%20Connectivity.png"
              alt="Reinforcing Loop II: Digital Infrastructure & Smart Tourism"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">Reinforcing Loop II: Digital Infrastructure & Smart Tourism</p>
            </div>
          </div>
          <p className="text-sm text-[#022c22]">
            Digital infrastructure enables tourism (₱161.97B BTDP investment), which fuels broader economic development. The BEGMP digital backbone (broadband, smart cities, e-government, cybersecurity) supports tourism and regional growth.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            Rank these components—Broadband, Smart Cities, E-Government, Cybersecurity—by their importance to tourism.
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {["Broadband", "Smart Cities", "E-Government", "Cybersecurity"].map((opt, idx) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q6_5_digital_components_rank === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q6_5_digital_components_rank", opt)}>
                <span className={cn("flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0 mr-3",
                  data.q6_5_digital_components_rank === opt ? "bg-white/20 text-white" : "bg-[#C9A84C]/10 text-[#C9A84C]")}>
                  {data.q6_5_digital_components_rank === opt ? idx + 1 : ""}
                </span>
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 10. Activating the Enablers Image ────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Activating%20the%20Enablers%20-%20Infra%20Primed%20by%20Moral%20Governance.png"
              alt="Activating the Enablers: Infrastructure Primed by Moral Governance"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">Activating the Enablers: Primed by Moral Governance</p>
            </div>
          </div>
          <p className="text-sm text-[#022c22]">
            <strong>Moral Governance as the operating system</strong> powering physical development: Transparency, Accountability, Stability form the governance core. Physical backbones: 100% Electrification through renewables, 85% Broadband by 2035, 30% Logistics Cost Reduction via improved inter-island routes.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            How realistic is it that Moral Governance can effectively deliver these physical enablers — electrification, broadband connectivity, and logistics efficiency — in BARMM?
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Very realistic",
              "Somewhat realistic",
              "Needs stronger institutional support",
              "Not realistic",
            ].map((opt) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q6_6_moral_governance_realistic === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q6_6_moral_governance_realistic", opt)}>
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 11. Archetype: Limits to Growth ──────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-semibold text-[#022c22]">Archetype: Limits to Growth</h3>
          </div>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Limits%20to%20Growth%20Archetype.png"
              alt="Limits to Growth Archetype"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            Rapid investment expansion eventually slows when structural ceilings—like weak infrastructure, limited skills, and environmental constraints—are reached. Initial investments drive growth, but bottlenecks emerge (unreliable energy, poor roads, low literacy), creating hard ceilings that prevent further improvement unless capacity-building measures are introduced.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            How accurately does &quot;Limits to Growth&quot; describe the barriers facing BARMM&apos;s infrastructure and human capital development?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {archetypeOptions.map((opt) => (
              <Button key={opt} type="button" variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q_s6_limits_growth === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q_s6_limits_growth", opt)}>
                {opt}
              </Button>
            ))}
          </div>
          {(data.q_s6_limits_growth === "Very accurately" || data.q_s6_limits_growth === "Somewhat accurately") && (
            <div className="space-y-2 pt-2">
              <Label className="text-sm font-medium text-[#022c22]">
                Which constraint is most limiting — energy, roads, digital connectivity, or skills?
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
