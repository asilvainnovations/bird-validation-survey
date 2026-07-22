// src/components/strategic/Section13_PriorityActions.tsx
// BIRD 2026–2035 · Section 13: Priority Actions & Budget
// Updated: 2026-07-23 · Strict schema alignment, shadcn/ui components

import React from "react";
import { Wallet, AlertTriangle, TrendingUp, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SurveySchemaType } from "@/lib/survey-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// ── Type derived from master schema ──────────────────────────────────────────
export type Section13Data = Pick<
  SurveySchemaType,
  | "q13_1_funding_mix_fair"
  | "q13_2_targets_realistic"
  | "q13_3_high_risk_concern"
  | "q13_4_medium_risk_concern"
  | "q13_5_low_risk_concern"
  | "q13_6_budget_priority_phase"
  | "q13_7_budget_priority_cluster"
  | "q13_8_blended_finance_opinion"
>;

interface Section13Props {
  data: Section13Data;
  onChange: (data: Section13Data) => void;
}

// ── Design tokens ────────────────────────────────────────────────────────────
const activeBtnClass = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90";
const inactiveBtnClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";
const activeScaleClass = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
const inactiveScaleClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";

// ── Phase data for display ───────────────────────────────────────────────────
const phases = [
  {
    phase: "Phase 1",
    title: "Foundation Building",
    period: "2026–2028",
    budget: "₱15 B",
    description: "Establish core infrastructure and governance systems",
    color: "emerald",
  },
  {
    phase: "Phase 2",
    title: "Acceleration",
    period: "2029–2032",
    budget: "₱20 B",
    description: "Expand production and scale transformative projects",
    color: "amber",
  },
  {
    phase: "Phase 3",
    title: "Consolidation",
    period: "2033–2035",
    budget: "₱20 B",
    description: "Integrate gains and sustain growth",
    color: "sky",
  },
];

// ── Component ────────────────────────────────────────────────────────────────
export const Section13_PriorityActions: React.FC<Section13Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section13Data>(field: K, value: Section13Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <Wallet className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 13: Priority Actions & Budget
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        Validate the phased investment rollout and budget allocation for the BIRD 2026–2035 roadmap.
        The ecosystem must be built sequentially, deploying ₱55 B over a decade to remove constraints
        before scaling investment—illustrating a disciplined, time-bound approach to sustainable economic expansion.
      </p>

      {/* ── Total Capital Deployment Image ─────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <TrendingUp className="w-5 h-5 text-[#C9A84C]" />
            Total Capital Deployment Per Phase
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Total%20Capital%20Deployment%20per%20Phase.png"
              alt="Total Capital Deployment per Phase - Budget/Time Staircase"
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                Source: BIRD 2026–2035 Implementation Framework — Budget/Time Staircase
              </p>
            </div>
          </div>

          <p className="text-sm text-[#022c22] leading-relaxed">
            The Budget/Time Staircase shows the phased investment rollout for Bangsamoro's development roadmap —
            <strong> ₱55 B Total Capital Deployment</strong> across three sequential phases:
          </p>

          {/* Phase breakdown cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {phases.map((p) => (
              <div
                key={p.phase}
                className={cn(
                  "rounded-lg border p-4",
                  p.color === "emerald" && "border-emerald-300 bg-emerald-50",
                  p.color === "amber" && "border-amber-300 bg-amber-50",
                  p.color === "sky" && "border-sky-300 bg-sky-50"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#022c22] uppercase">{p.phase}</span>
                  <span className="text-lg font-bold text-[#022c22]">{p.budget}</span>
                </div>
                <h4 className="text-sm font-semibold text-[#022c22] mb-1">{p.title}</h4>
                <p className="text-xs text-[#065f46] mb-2">{p.period}</p>
                <p className="text-xs text-[#065f46]">{p.description}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#065f46] italic">
            The ecosystem must be built sequentially, deploying ₱55 B over a decade to remove constraints
            before scaling investment—illustrating a disciplined, time-bound approach to sustainable economic expansion.
          </p>

          <div className="pt-4 border-t border-[#C9A84C]/20">
            <a
              href="https://bird-action-plan.asilvainnovations.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#C9A84C] hover:underline font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              View Detailed Action Plan & Priority Actions
            </a>
          </div>
        </CardContent>
      </Card>

      {/* ── Funding Mix Fairness ───────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
            Funding Mix & Budget Validation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Q13.1: Funding Mix Fairness */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22]">
              Q13.1 How fair and balanced is the proposed funding mix (block grant, national programs, ODA, private capital)?
            </Label>
            <p className="text-xs text-[#065f46]">(1 = very unfair, 5 = very fair)</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "w-12 h-12 rounded-lg text-sm font-semibold",
                    data.q13_1_funding_mix_fair === v ? activeScaleClass : inactiveScaleClass
                  )}
                  onClick={() => update("q13_1_funding_mix_fair", v)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>

          {/* Q13.2: Targets Realistic */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22]">
              Q13.2 How realistic are the 2035 targets (₱550B GRDP, &lt;20% poverty, 20,000+ jobs) given the ₱55B budget?
            </Label>
            <p className="text-xs text-[#065f46]">(1 = not realistic, 5 = very realistic)</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "w-12 h-12 rounded-lg text-sm font-semibold",
                    data.q13_2_targets_realistic === v ? activeScaleClass : inactiveScaleClass
                  )}
                  onClick={() => update("q13_2_targets_realistic", v)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>

          {/* Q13.3-5: Risk Concerns */}
          <div className="space-y-6 pb-6 border-b border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22]">
              Q13.3–13.5 Rate your level of concern about budget risks across different severity levels
            </Label>
            <p className="text-xs text-[#065f46]">(1 = no concern, 5 = very high concern)</p>

            {/* High Risk */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-xs font-semibold text-red-700">HIGH RISK</span>
              </div>
              <p className="text-xs text-[#065f46]">
                Existential threats: political instability, security incidents, major cost overruns
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <Button
                    key={v}
                    type="button"
                    variant="outline"
                    size="icon"
                    className={cn(
                      "w-12 h-12 rounded-lg text-sm font-semibold",
                      data.q13_3_high_risk_concern === v ? activeScaleClass : inactiveScaleClass
                    )}
                    onClick={() => update("q13_3_high_risk_concern", v)}
                  >
                    {v}
                  </Button>
                ))}
              </div>
            </div>

            {/* Medium Risk */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700">MEDIUM RISK</span>
              </div>
              <p className="text-xs text-[#065f46]">
                Significant challenges: delayed ODA disbursements, skills gaps, infrastructure bottlenecks
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <Button
                    key={v}
                    type="button"
                    variant="outline"
                    size="icon"
                    className={cn(
                      "w-12 h-12 rounded-lg text-sm font-semibold",
                      data.q13_4_medium_risk_concern === v ? activeScaleClass : inactiveScaleClass
                    )}
                    onClick={() => update("q13_4_medium_risk_concern", v)}
                  >
                    {v}
                  </Button>
                ))}
              </div>
            </div>

            {/* Low Risk */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-semibold text-sky-700">LOW RISK</span>
              </div>
              <p className="text-xs text-[#065f46]">
                Manageable issues: administrative delays, minor procurement bottlenecks
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <Button
                    key={v}
                    type="button"
                    variant="outline"
                    size="icon"
                    className={cn(
                      "w-12 h-12 rounded-lg text-sm font-semibold",
                      data.q13_5_low_risk_concern === v ? activeScaleClass : inactiveScaleClass
                    )}
                    onClick={() => update("q13_5_low_risk_concern", v)}
                  >
                    {v}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Q13.6: Budget Priority Phase */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22]">
              Q13.6 Which phase should receive the highest budget priority to ensure roadmap success?
            </Label>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Phase 1 — Foundation Building (2026–2028)",
                "Phase 2 — Acceleration (2029–2032)",
                "Phase 3 — Consolidation (2033–2035)",
                "Equal distribution across all phases",
              ].map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q13_6_budget_priority_phase === opt ? activeBtnClass : inactiveBtnClass
                  )}
                  onClick={() => update("q13_6_budget_priority_phase", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {/* Q13.7: Budget Priority Cluster */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22]">
              Q13.7 Which BEIE cluster should receive the largest share of the ₱55B budget?
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Foundations (Agri-Fisheries, Energy, Forestry)",
                "Transformers (Halal Industry, Manufacturing)",
                "Enablers (Infrastructure, Digital, Education)",
                "Connectors (Trade, Tourism, BIMP-EAGA)",
                "Financiers (Islamic Finance, Capital Markets)",
                "Operating Systems (Governance, Peace, Resilience)",
              ].map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q13_7_budget_priority_cluster === opt ? activeBtnClass : inactiveBtnClass
                  )}
                  onClick={() => update("q13_7_budget_priority_cluster", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {/* Q13.8: Blended Finance Opinion */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22]">
              Q13.8 What is your opinion on using blended finance mechanisms (combining public, private, and development funds) for BIRD implementation?
            </Label>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Strongly support — essential for mobilizing sufficient capital",
                "Support with conditions — need strong safeguards and transparency",
                "Neutral — depends on specific projects and governance arrangements",
                "Concerns — potential accountability issues and complex governance",
                "Oppose — prefer traditional government budgeting and ODA",
              ].map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q13_8_blended_finance_opinion === opt ? activeBtnClass : inactiveBtnClass
                  )}
                  onClick={() => update("q13_8_blended_finance_opinion", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Section13_PriorityActions;
