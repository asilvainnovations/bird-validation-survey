import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  AlertTriangle,
  HandCoins,
  TreePine,
  Users,
  Zap,
  TrendingUp,
  Target,
  BookOpen,
} from "lucide-react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import { UNIVERSAL_QUESTIONS, universalFieldName } from "@/lib/universalQuestions";
import { LikertScale } from "@/lib/primitives/LikertScale";
import { AGREEMENT_SCALE, MAGNITUDE_SCALE, LIKELIHOOD_SCALE } from "@/lib/scaleLabels";
import {
  calculateStrengthRI,
  calculateWeaknessRisk,
  calculateOpportunityRI,
  calculateThreatVI,
} from "@/lib/formulas";

// ── Types (exact runtime contract with SurveyWizard.tsx s9 state) ────────────
export interface Section9Data {
  // SWOT — Strengths
  q9_s1_policy_recognition_impact?: number;
  q9_s1_policy_recognition_likelihood?: number;
  q9_s2_peace_dividend_impact?: number;
  q9_s2_peace_dividend_likelihood?: number;

  // SWOT — Weaknesses
  q9_w1_fragmented_policy_impact?: number;
  q9_w1_fragmented_policy_likelihood?: number;
  q9_w2_underspending_impact?: number;
  q9_w2_underspending_likelihood?: number;

  // SWOT — Opportunities
  q9_o1_postconflict_impact?: number;
  q9_o1_postconflict_likelihood?: number;
  q9_o2_climate_adaptation_finance_impact?: number;
  q9_o2_climate_adaptation_finance_likelihood?: number;

  // SWOT — Threats
  q9_t1_climate_change_impact?: number;
  q9_t1_climate_change_likelihood?: number;
  q9_t3_security_incidents_impact?: number;
  q9_t3_security_incidents_likelihood?: number;
  q9_t4_political_transition_impact?: number;
  q9_t4_political_transition_likelihood?: number;
  q9_t5_natl_coordination_impact?: number;
  q9_t5_natl_coordination_likelihood?: number;
  q9_t6_fragmented_mandates_impact?: number;
  q9_t6_fragmented_mandates_likelihood?: number;

  // Archetype / CLD fields (mapped per .md spec)
  q9_1_moral_governance_derisk?: number;
  q9_2_critical_loop: string;
  q9_3_regulatory_priority: string;
  q9_4_revenue_channel: string;
  q9_5_stakeholder_alignment: string;
  q9_6_reform_priority: string;

  // Archetype validations (see swot-content.ts ARCHETYPES_BY_SECTION[9]) —
  // each is its own field now; these three used to all collide on the same
  // two fields (q_s9_governance_loop / _followup), so answering one silently
  // overwrote another.
  q9_arch_fixes_fail_accuracy: string;
  q9_arch_fixes_fail_followup: string;
  q9_arch_escalation_accuracy: string;
  q9_arch_escalation_followup: string;
  q9_arch_big_man_accuracy: string;
  q9_arch_big_man_followup: string;

  // T2 — "Drifting Goals" as a scored SWOT threat (distinct from the Section 11
  // archetype validation question of the same name — see swot-content.ts header).
  q9_t2_drifting_goals_impact?: number;
  q9_t2_drifting_goals_likelihood?: number;
  // Universal cross-cluster questions (see src/lib/universalQuestions.ts)
  q9_universal_confidence?: number;
  q9_universal_readiness?: number;
  q9_universal_urgency?: number;
}

interface Section9Props {
  data: Section9Data;
  onChange: (data: Section9Data) => void;
}

// ── Design tokens ────────────────────────────────────────────────────────────
const activeBtn =
  "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 dark:bg-[#1B4D3E] dark:text-white dark:border-[#1B4D3E]";
const inactiveBtn =
  "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#ecfdf5]/30 dark:hover:bg-[#C9A84C]/10";
const activeScale =
  "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
const inactiveScale =
  "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]";

const archetypeOptions = [
  "Very accurately",
  "Somewhat accurately",
  "Needs revision",
  "Not accurate",
];

const moralGovernanceAspects = [
  "Transparency",
  "Accountability",
  "Efficiency",
  "Islamic ethics",
  "Other (please specify)",
];

const bigManLoops = [
  "R1: Patronage eroding governance",
  "R2: Exclusion fueling conflict",
  "R3: Patronage draining development resources",
  "Other (please specify)",
];

// ═══════════════════════════════════════════════════════════════════════════════
export const Section9_OperatingSystems: React.FC<Section9Props> = ({
  data,
  onChange,
}) => {
  const update = <K extends keyof Section9Data>(
    field: K,
    value: Section9Data[K]
  ) => onChange({ ...data, [field]: value });

  const renderScale = (field: keyof Section9Data) => (
    <div className="grid grid-cols-5 gap-1.5 max-w-md">
      {[1, 2, 3, 4, 5].map((v) => (
        <Button
          key={v}
          type="button"
          variant="outline"
          className={cn(
            "h-auto flex-col gap-1 py-2 px-1 rounded-lg border text-xs font-semibold transition-all",
            data[field] === v ? activeScale : inactiveScale
          )}
          onClick={() => update(field, v as never)}
        >
          <span>{v}</span>
          <span className="text-[9px] font-normal leading-tight text-center">
            {AGREEMENT_SCALE[v - 1].label}
          </span>
        </Button>
      ))}
    </div>
  );

  const renderSwotPair = (
    label: string,
    desc: string,
    impactField: keyof Section9Data,
    likelihoodField: keyof Section9Data,
    category: "strength" | "weakness" | "opportunity" | "threat"
  ) => {
    const impact = data[impactField] as number | undefined;
    const likelihood = data[likelihoodField] as number | undefined;
    let score: number | null = null;
    let scoreLabel = "";
    let badgeClass = "";

    if (impact && likelihood) {
      switch (category) {
        case "strength":
          score = calculateStrengthRI(impact, likelihood);
          scoreLabel = "RI";
          badgeClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
          break;
        case "weakness":
          score = calculateWeaknessRisk(impact, likelihood);
          scoreLabel = "Risk";
          badgeClass = "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300";
          break;
        case "opportunity":
          score = calculateOpportunityRI(impact, likelihood);
          scoreLabel = "RI";
          badgeClass = "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300";
          break;
        case "threat":
          score = calculateThreatVI(impact, likelihood);
          scoreLabel = "VI";
          badgeClass = "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
          break;
      }
    }

    return (
      <div className="space-y-4 p-4 rounded-lg border border-[#C9A84C]/20 bg-emerald-50/40 dark:bg-[#1B4D3E]/10">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#C9A84C]" />
          <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            {label}
          </p>
          {score !== null && (
            <Badge variant="secondary" className={cn("ml-auto border", badgeClass)}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {scoreLabel}: {score.toFixed(2)}
            </Badge>
          )}
        </div>
        <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70">{desc}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs font-medium text-[#065f46] dark:text-[#ecfdf5]/70 mb-2 block">
              Impact (1–5)
            </Label>
            <div className="grid grid-cols-5 gap-1">
              {[1, 2, 3, 4, 5].map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-auto flex-col gap-0.5 py-1.5 px-1 rounded-lg border text-xs font-semibold transition-all",
                    impact === v
                      ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                      : "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                  onClick={() => update(impactField, v as never)}
                >
                  <span>{v}</span>
                  <span className="text-[8px] font-normal leading-tight text-center">{MAGNITUDE_SCALE[v - 1].label}</span>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium text-[#065f46] dark:text-[#ecfdf5]/70 mb-2 block">
              Likelihood (1–5)
            </Label>
            <div className="grid grid-cols-5 gap-1">
              {[1, 2, 3, 4, 5].map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-auto flex-col gap-0.5 py-1.5 px-1 rounded-lg border text-xs font-semibold transition-all",
                    likelihood === v
                      ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                      : "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                  onClick={() => update(likelihoodField, v as never)}
                >
                  <span>{v}</span>
                  <span className="text-[8px] font-normal leading-tight text-center">{LIKELIHOOD_SCALE[v - 1].label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <ShieldCheck className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
          Section 9: Operating Systems — Moral Governance, Resilience, Inclusivity & Peace
        </h2>
      </div>
      <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 -mt-2 max-w-3xl">
        Moral Governance serves as the central operating system of the Bangsamoro ecosystem —
        ensuring justice, transparency, accountability, and Islamic ethics (khalifa stewardship).
        Peace provides stability, Resilience enables climate-smart planning, and Inclusivity
        broadens participation.
      </p>

      {/* ── 1. Operating Systems Banner ──────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.operatingSystemsOS.url}
          alt={BIRD_IMAGES.operatingSystemsOS.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            {BIRD_IMAGES.operatingSystemsOS.description}
          </p>
        </div>
      </div>

      {/* ── 2. Three Foundational Pillars ──────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            The Operating Systems
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50/60 dark:bg-[#1B4D3E]/20 border border-emerald-200 dark:border-emerald-800/30">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <h4 className="text-sm font-bold text-[#022c22] dark:text-[#ecfdf5]">Peace</h4>
              </div>
              <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70">
                Provides long-term stability for investment and community trust.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-amber-50/60 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30">
              <div className="flex items-center gap-2 mb-2">
                <TreePine className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                <h4 className="text-sm font-bold text-[#022c22] dark:text-[#ecfdf5]">Resilience</h4>
              </div>
              <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70">
                Promotes adaptive, climate-smart planning to withstand external shocks.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-sky-50/60 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800/30">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-sky-700 dark:text-sky-400" />
                <h4 className="text-sm font-bold text-[#022c22] dark:text-[#ecfdf5]">Inclusivity</h4>
              </div>
              <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70">
                Broadens participation so marginalized communities share in value creation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 3. Moral Governance De-Risks Capital (CLD) ───────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <BookOpen className="w-5 h-5 text-[#C9A84C]" />
            Causal Loop: Moral Governance De-Risks Capital
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src={BIRD_IMAGES.moralGovernanceDeRisks.url}
              alt={BIRD_IMAGES.moralGovernanceDeRisks.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90 leading-relaxed">
            This reinforcing feedback loop demonstrates how moral governance reduces investment risk.
            When government implements transparent systems (like BIFOSS), it lowers bureaucratic friction
            and makes it easier for investors to do business. This efficiency raises investor confidence,
            leading to increased foreign direct investment. More FDI boosts regional revenue, which enables
            stronger governance capacity, creating a self-reinforcing system of growth and stability.
          </p>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              On a scale of 1-5, how effective is moral governance at de-risking capital investment in BARMM compared to traditional governance approaches?
            </Label>
            {renderScale("q9_1_moral_governance_derisk")}
            <div className="flex justify-between max-w-[272px]">
              <span className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">1 (Not effective)</span>
              <span className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">5 (Very effective)</span>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              Which aspect of moral governance most reduces investment risk?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {moralGovernanceAspects.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q9_2_critical_loop === opt ? activeBtn : inactiveBtn
                  )}
                  onClick={() => update("q9_2_critical_loop", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 4. Regulatory Architecture ─────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Regulatory Architecture Securing Capital
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src={BIRD_IMAGES.regulatoryArchitecture.url}
              alt={BIRD_IMAGES.regulatoryArchitecture.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            At its core is the Bangsamoro Organic Law (RA 11054) — the constitutional mandate
            for economic self-determination — supported by five pillars: 2nd BDP & SIPP,
            BHIDP, BSEMP, RA 11439 & CREATE MORE Act, and Pending Forestry Code.
          </p>
          <div className="space-y-3 pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              Which regulatory pillar should be the highest priority for strengthening investment security?
            </Label>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Bangsamoro Organic Law (RA 11054) enforcement",
                "2nd BDP & SIPP alignment",
                "BHIDP implementation",
                "BSEMP (Bangsamoro Spatial & Environmental Master Plan)",
                "RA 11439 Islamic Finance & CREATE MORE Act",
                "Pending Bangsamoro Forestry Code",
              ].map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q9_3_regulatory_priority === opt ? activeBtn : inactiveBtn
                  )}
                  onClick={() => update("q9_3_regulatory_priority", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 5. Draft JMC 2026-01 ─────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Draft Joint Memorandum Circular 2026-01
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src={BIRD_IMAGES.draftJMC.url}
              alt={BIRD_IMAGES.draftJMC.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            Transforms conservation into municipal revenue streams through three flowing channels:
            Carbon Credits, Payment for Ecosystem Services (PES), and Eco-Tourism User Fees —
            merging into a Revenue River that feeds Local Government Units.
          </p>
          <div className="space-y-3 pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              Which revenue channel from JMC 2026-01 should be prioritized for pilot implementation?
            </Label>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Carbon Credits (REDD+ monetization)",
                "Payment for Ecosystem Services (PES)",
                "Eco-Tourism User Fees",
                "All three simultaneously",
              ].map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q9_4_revenue_channel === opt ? activeBtn : inactiveBtn
                  )}
                  onClick={() => update("q9_4_revenue_channel", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 6. Archetype: Fixes that Fail ────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            Archetype: Fixes That Fail
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src={BIRD_IMAGES.fixesThatFail.url}
              alt={BIRD_IMAGES.fixesThatFail.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90 leading-relaxed">
            The "Fixes That Fail" archetype illustrates how BARMM's reliance on short-term remedies
            undermines long-term institutional reform. Ad-hoc tax incentives, fragmented subsidies,
            and short-term security operations may create the illusion of progress: investment approvals
            rise briefly, but institutional weaknesses persist. Procurement delays (12–18 months),
            slow Halal certification (45–60 days vs. Malaysia's 15-day benchmark), and poor inter-agency
            coordination continue to erode investor confidence. Each "quick fix" postpones systemic reform,
            trapping the region in a recurring cycle of crisis management.
          </p>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            <strong>Balancing Loop 1 (B1):</strong> Short-term relief from incentives temporarily boosts investor attraction.
            <br />
            <strong>Reinforcing Loop 2 (R2):</strong> Institutional weakness persists and compounds over time.
          </p>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              How accurately does "Fixes that Fail" capture the unintended consequences of short-term industrial policy in BARMM?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {archetypeOptions.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q9_arch_fixes_fail_accuracy === opt ? activeBtn : inactiveBtn
                  )}
                  onClick={() => update("q9_arch_fixes_fail_accuracy", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {(data.q9_arch_fixes_fail_accuracy === "Very accurately" ||
            data.q9_arch_fixes_fail_accuracy === "Somewhat accurately") && (
            <div className="space-y-3 pt-4 border-t border-[#C9A84C]/20 animate-in fade-in slide-in-from-top-2 duration-200">
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
                Which sectors best fit this archetype? Which have avoided this trap?
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Halal manufacturing",
                  "Agro-processing",
                  "Renewable energy",
                  "Tourism",
                  "Other (please specify)",
                ].map((opt) => (
                  <Button
                    key={opt}
                    type="button"
                    variant="outline"
                    className={cn(
                      "justify-start h-auto py-3 text-sm text-left",
                      data.q9_arch_fixes_fail_followup === opt ? activeBtn : inactiveBtn
                    )}
                    onClick={() => update("q9_arch_fixes_fail_followup", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
              <Textarea
                placeholder="Describe which sectors fit and which have avoided the trap..."
                rows={3}
                value={data.q9_arch_fixes_fail_followup || ""}
                onChange={(e) => update("q9_arch_fixes_fail_followup", e.target.value)}
                className="w-full rounded-lg border border-[#C9A84C]/30 bg-white dark:bg-[#022c22]/50 px-3 py-2 text-sm text-[#022c22] dark:text-[#ecfdf5] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 resize-y"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── 7. Archetype: Escalation ─────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            Archetype: Escalation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src={BIRD_IMAGES.escalationArchetype.url}
              alt={BIRD_IMAGES.escalationArchetype.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90 leading-relaxed">
            The "Escalation" archetype manifests in both socio-political and economic domains in BARMM.
            When one group (clan, province, or agency) perceives a threat or marginalization, it mobilizes
            to protect its interests. Other groups perceive this mobilization as a threat to their own
            interests, triggering counter-mobilization. The result is a reinforcing cycle of competitive spirals
            that diverts resources from productive development to contestation, degrades the overall investment
            climate, and creates a perception of instability that repels investors.
          </p>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              How accurately does the "Escalation" archetype reflect competitive dynamics among clans, provinces, or agencies competing for trade corridors and connectivity investments in BARMM?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {archetypeOptions.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q9_arch_escalation_accuracy === opt ? activeBtn : inactiveBtn
                  )}
                  onClick={() => update("q9_arch_escalation_accuracy", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {(data.q9_arch_escalation_accuracy === "Very accurately" ||
            data.q9_arch_escalation_accuracy === "Somewhat accurately") && (
            <div className="space-y-3 pt-4 border-t border-[#C9A84C]/20 animate-in fade-in slide-in-from-top-2 duration-200">
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
                In which domain do you see this escalation dynamic most clearly?
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Clan rivalries (rido)",
                  "Inter-provincial competition",
                  "Inter-agency rivalry",
                  "External market competition",
                  "Other (please specify)",
                ].map((opt) => (
                  <Button
                    key={opt}
                    type="button"
                    variant="outline"
                    className={cn(
                      "justify-start h-auto py-3 text-sm text-left",
                      data.q9_arch_escalation_followup === opt ? activeBtn : inactiveBtn
                    )}
                    onClick={() => update("q9_arch_escalation_followup", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
              <Textarea
                placeholder="Describe where you see escalation dynamics most clearly..."
                rows={3}
                value={data.q9_arch_escalation_followup || ""}
                onChange={(e) => update("q9_arch_escalation_followup", e.target.value)}
                className="w-full rounded-lg border border-[#C9A84C]/30 bg-white dark:bg-[#022c22]/50 px-3 py-2 text-sm text-[#022c22] dark:text-[#ecfdf5] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 resize-y"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── 8. Archetype: The Big Man ────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            Archetype: The Big Man
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src={BIRD_IMAGES.bigManArchetype.url}
              alt={BIRD_IMAGES.bigManArchetype.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90 leading-relaxed">
            The "Big Man Archetype" visualizes how concentrated political power around dominant clan leaders
            creates a self-reinforcing system of instability and underdevelopment. It presents 3 reinforcing
            loops forming a vicious cycle: political dominance fuels conflict, conflict justifies dominance,
            and both deplete resources needed for progress.
          </p>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            <strong>R1: The Patronage–Governance Trade-off.</strong> Power concentration fosters a patron–client mindset where loyalty outweighs merit.
            <br />
            <strong>R2: Cycle of Exclusion, Resentment, and Conflict.</strong> Patronage politics marginalize rival clans, breeding resentment and rido.
            <br />
            <strong>R3: Resource Depletion and Development Failure.</strong> Patronage-based hiring fills posts with unqualified staff, draining budgets.
          </p>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              How accurately does the "Big Man" archetype reflect the political and clan dynamics affecting access to capital and financial services in BARMM?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {archetypeOptions.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q9_arch_big_man_accuracy === opt ? activeBtn : inactiveBtn
                  )}
                  onClick={() => update("q9_arch_big_man_accuracy", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {(data.q9_arch_big_man_accuracy === "Very accurately" ||
            data.q9_arch_big_man_accuracy === "Somewhat accurately") && (
            <div className="space-y-3 pt-4 border-t border-[#C9A84C]/20 animate-in fade-in slide-in-from-top-2 duration-200">
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
                Which of the three reinforcing loops is most active in BARMM today?
              </Label>
              <div className="grid grid-cols-1 gap-3">
                {bigManLoops.map((opt) => (
                  <Button
                    key={opt}
                    type="button"
                    variant="outline"
                    className={cn(
                      "justify-start h-auto py-3 text-sm text-left",
                      data.q9_arch_big_man_followup === opt ? activeBtn : inactiveBtn
                    )}
                    onClick={() => update("q9_arch_big_man_followup", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
              <Textarea
                placeholder="Describe which loop is most active and provide examples..."
                rows={3}
                value={data.q9_arch_big_man_followup || ""}
                onChange={(e) => update("q9_arch_big_man_followup", e.target.value)}
                className="w-full rounded-lg border border-[#C9A84C]/30 bg-white dark:bg-[#022c22]/50 px-3 py-2 text-sm text-[#022c22] dark:text-[#ecfdf5] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 resize-y"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── 9. Policy Recommendations: Synchronized Mandate ──────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Policy Recommendations: A Synchronized Mandate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src={BIRD_IMAGES.policyRecommendationsMakers.url}
              alt={BIRD_IMAGES.policyRecommendationsMakers.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            Aligning government, planning, and private-sector actions creates synergy between
            policy, planning, and investment to drive inclusive growth through collaborative governance.
          </p>
          <div className="space-y-3 pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              Which stakeholder group must take the lead in synchronizing the Bangsamoro investment mandate?
            </Label>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Bangsamoro Government (BOI-MTIT)",
                "Local Government Units (LGUs)",
                "Private Sector / Investors",
                "Development Partners / Donor Agencies",
                "Civil Society Organizations (CSOs)",
                "All stakeholders equally through BIF-Net",
              ].map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q9_5_stakeholder_alignment === opt ? activeBtn : inactiveBtn
                  )}
                  onClick={() => update("q9_5_stakeholder_alignment", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 10. Policy Recommendations: Three Reforms ────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Policy Recommendations: Activating the Framework
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src={BIRD_IMAGES.policyRecommendationsActivating.url}
              alt={BIRD_IMAGES.policyRecommendationsActivating.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            Three integrated reforms: <strong>Institutional</strong> (BIF-Net coordination),
            <strong> Fiscal</strong> (SIPP & CREATE MORE harmonization), and
            <strong> Regulatory</strong> (BEIE institutionalization) to strengthen investment coordination.
          </p>
          <div className="space-y-3 pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              Which of the three reforms (Institutional, Fiscal, Regulatory) should be prioritized first?
            </Label>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Institutional (BIF-Net coordination, governance capacity)",
                "Fiscal (SIPP & CREATE MORE harmonization, revenue mobilization)",
                "Regulatory (BEIE institutionalization, ease of doing business)",
                "All three must proceed in parallel",
              ].map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q9_6_reform_priority === opt ? activeBtn : inactiveBtn
                  )}
                  onClick={() => update("q9_6_reform_priority", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 11. SWOT: Strengths ──────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              STRENGTH
            </span>
            Operating Systems Strengths
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          {renderSwotPair(
            "S1 — Growing Policy Recognition",
            "Institutional mandates via BOL, BIC, SIPP, and BHIDP creating stronger investment climate and governance framework.",
            "q9_s1_policy_recognition_impact",
            "q9_s1_policy_recognition_likelihood",
            "strength"
          )}
          {renderSwotPair(
            "S2 — Peace Dividend Momentum",
            "Basilan ASG-free declaration (2024) and stabilized security in select zones creating space for investment.",
            "q9_s2_peace_dividend_impact",
            "q9_s2_peace_dividend_likelihood",
            "strength"
          )}
        </CardContent>
      </Card>

      {/* ── 12. SWOT: Weaknesses ─────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
              WEAKNESS
            </span>
            Operating Systems Weaknesses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          {renderSwotPair(
            "W1 — Fragmented Policy Frameworks",
            "Governance coordination gaps and underspending in budget execution across agencies.",
            "q9_w1_fragmented_policy_impact",
            "q9_w1_fragmented_policy_likelihood",
            "weakness"
          )}
          {renderSwotPair(
            "W2 — Underspending in Budget Execution",
            "Delays in development program rollout; absorptive capacity challenge limits impact.",
            "q9_w2_underspending_impact",
            "q9_w2_underspending_likelihood",
            "weakness"
          )}
        </CardContent>
      </Card>

      {/* ── 13. SWOT: Opportunities ────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
              OPPORTUNITY
            </span>
            Operating Systems Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          {renderSwotPair(
            "O1 — Post-Conflict Reconstruction",
            "Marawi MAA commercial redevelopment and normalization creating construction and service-sector demand.",
            "q9_o1_postconflict_impact",
            "q9_o1_postconflict_likelihood",
            "opportunity"
          )}
          {renderSwotPair(
            "O2 — Climate Adaptation Finance",
            "Tawi-Tawi can leverage a $10 million Adaptation Fund synergy to boost the climate resiliency of coastal communities.",
            "q9_o2_climate_adaptation_finance_impact",
            "q9_o2_climate_adaptation_finance_likelihood",
            "opportunity"
          )}
        </CardContent>
      </Card>

      {/* ── 14. SWOT: Threats ──────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
              THREAT
            </span>
            Operating Systems Threats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          {renderSwotPair(
            "T1 — Climate Change Vulnerabilities",
            "El Niño, flooding, and shifting rainfall patterns (4.2% AFF contraction in 2024) threatening food security.",
            "q9_t1_climate_change_impact",
            "q9_t1_climate_change_likelihood",
            "threat"
          )}
          {renderSwotPair(
            "T2 — \"Drifting Goals\" Syndrome",
            "Political and institutional pressure may lead to lowering standards (e.g., accepting 60% electrification as \"success\") rather than fixing root infrastructure problems.",
            "q9_t2_drifting_goals_impact",
            "q9_t2_drifting_goals_likelihood",
            "threat"
          )}
          {renderSwotPair(
            "T3 — Residual Security Incidents",
            "Rido, remnant armed groups, and investor perception risks varying by province.",
            "q9_t3_security_incidents_impact",
            "q9_t3_security_incidents_likelihood",
            "threat"
          )}
          {renderSwotPair(
            "T4 — Political Transition Uncertainties",
            "First parliamentary elections and governance continuity risks may disrupt reform momentum.",
            "q9_t4_political_transition_impact",
            "q9_t4_political_transition_likelihood",
            "threat"
          )}
          {renderSwotPair(
            "T5 — Limited National Coordination",
            "Gaps in BARMM-specific infrastructure funding from the national government.",
            "q9_t5_natl_coordination_impact",
            "q9_t5_natl_coordination_likelihood",
            "threat"
          )}
          {renderSwotPair(
            "T6 — Risk of Fragmented Mandates",
            "Islamic banking, halal certification, and trade agencies operating in silos without coordination.",
            "q9_t6_fragmented_mandates_impact",
            "q9_t6_fragmented_mandates_likelihood",
            "threat"
          )}
        </CardContent>
      </Card>

      {/* ── Cross-Cluster Assessment (universal, same 3 questions every cluster) ── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Cross-Cluster Assessment
          </CardTitle>
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 pt-1">
            These three questions are asked identically in every cluster section, so your
            answers can be compared across all of BARMM&apos;s investment priorities.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {UNIVERSAL_QUESTIONS.map((q) => {
            const fieldName = universalFieldName(9, q.id);
            return (
              <LikertScale
                key={q.id}
                name={fieldName}
                label={q.label}
                scale={q.scale}
                value={(data as never as Record<string, number | undefined>)[fieldName]}
                onChange={(v) => update(fieldName as never, v as never)}
              />
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default Section9_OperatingSystems;