// src/components/strategic/Section9_OperatingSystems.tsx
// BIRD 2026–2035 · Section 9: Operating Systems — Moral Governance, Resilience, Inclusivity & Peace
//
// SYSTEMS ARCHITECTURE ALIGNMENT:
// • Primitives: ImageWithFallback, LikertScale, SectionProgress, SWOTScalePair, ArchetypeCard
// • Animations: Framer Motion staggered entrance
// • Accessibility: All scales are true radio groups with keyboard nav
// • Theme: Dark-first consistent with Sections 0–8
// • Content: Single-source-of-truth from swot-content.ts (SWOT_BY_SECTION[9], ARCHETYPES_BY_SECTION[9])
//
// FIELD COMPATIBILITY: Matches current SurveyWizard.tsx s9 state.
//   — SWOT fields use q_s9_* prefix (aligned with wizard state)
//   — Archetype fields: Fixes That Fail → q_s9_investment_loop/_followup
//                       Escalation → q_s9_governance_loop/_followup
//                       Big Man → q9_arch_big_man_accuracy/_followup (NEW — add to wizard)

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Primitives ───────────────────────────────────────────────────────────────
import { ImageWithFallback } from "@/lib/primitives/ImageWithFallback";
import { SectionProgress } from "@/lib/primitives/SectionProgress";
import { LikertScale } from "@/lib/primitives/LikertScale";
import { SWOTScalePair } from "@/lib/primitives/SWOTScalePair";
import { ArchetypeCard } from "@/lib/primitives/ArchetypeCard";

// ── BIRD Content ─────────────────────────────────────────────────────────────
import { BIRD_IMAGES } from "@/lib/bird-urls";
import {
  ARCHETYPES_BY_SECTION,
  SWOT_BY_SECTION,
  ACCURACY_OPTIONS,
} from "@/lib/swot-content";

// ── shadcn/ui ────────────────────────────────────────────────────────────────
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ── Formulas ─────────────────────────────────────────────────────────────────
import {
  calculateStrengthRI,
  calculateWeaknessRisk,
  calculateOpportunityRI,
  calculateThreatVI,
} from "@/lib/formulas";

// ── Icons ────────────────────────────────────────────────────────────────────
import {
  ShieldCheck,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  ShieldAlert,
  BookOpen,
  TreePine,
  Users,
  AlertTriangle,
  Landmark,
  Scale,
  FileText,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES — CONTRACT WITH SURVEYWIZARD.TSX
// ═══════════════════════════════════════════════════════════════════════════════
export interface Section9Data {
  // Banner understanding
  q9_1_banner_understanding?: number;

  // Archetype — Fixes That Fail
  q_s9_investment_loop: string;
  q_s9_investment_loop_followup: string;
  // Archetype — Escalation
  q_s9_governance_loop: string;
  q_s9_governance_loop_followup: string;
  // Archetype — Big Man (NEW fields — add to SurveyWizard.tsx)
  q9_arch_big_man_accuracy?: string;
  q9_arch_big_man_followup?: string;

  // SWOT — Strengths
  q_s9_policy_recognition_impact?: number;
  q_s9_policy_recognition_likelihood?: number;
  q_s9_islamic_finance_impact?: number;
  q_s9_islamic_finance_likelihood?: number;
  q_s9_cultural_heritage_impact?: number;
  q_s9_cultural_heritage_likelihood?: number;
  q_s9_peace_dividend_impact?: number;
  q_s9_peace_dividend_likelihood?: number;

  // SWOT — Weaknesses
  q_s9_fragmented_policy_impact?: number;
  q_s9_fragmented_policy_likelihood?: number;
  q_s9_literacy_impact?: number;
  q_s9_literacy_likelihood?: number;
  q_s9_underspending_impact?: number;
  q_s9_underspending_likelihood?: number;

  // SWOT — Opportunities
  q_s9_carbon_markets_impact?: number;
  q_s9_carbon_markets_likelihood?: number;
  q_s9_pes_impact?: number;
  q_s9_pes_likelihood?: number;
  q_s9_postconflict_impact?: number;
  q_s9_postconflict_likelihood?: number;
  q_s9_forestry_code_impact?: number;
  q_s9_forestry_code_likelihood?: number;

  // SWOT — Threats
  q_s9_security_incidents_impact?: number;
  q_s9_security_incidents_likelihood?: number;
  q_s9_political_transition_impact?: number;
  q_s9_political_transition_likelihood?: number;
  q_s9_fragmented_agency_impact?: number;
  q_s9_fragmented_agency_likelihood?: number;

  // Deep-dive questions
  q9_1_moral_governance_derisk?: number;
  q9_2_critical_loop: string;
  q9_3_regulatory_priority: string;
  q9_4_revenue_channel: string;
  q9_5_stakeholder_alignment: string;
  q9_6_reform_priority: string;
}

interface Section9Props {
  data: Section9Data;
  onChange: (data: Section9Data) => void;
}

// ── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ── Local SWOT registry fallback (uses q_s9_* fields to match SurveyWizard) ──
const SECTION9_SWOT = SWOT_BY_SECTION[9] ?? [];

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const Section9_OperatingSystems: React.FC<Section9Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section9Data>(field: K, value: Section9Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  const archetypes = ARCHETYPES_BY_SECTION[9] ?? [];

  // ── Compute sub-progress ──
  const swotItems = SECTION9_SWOT;
  const filledCount = [
    data.q9_1_banner_understanding != null,
    data.q_s9_investment_loop,
    data.q_s9_investment_loop_followup,
    data.q_s9_governance_loop,
    data.q_s9_governance_loop_followup,
    data.q9_arch_big_man_accuracy,
    data.q9_arch_big_man_followup,
    ...swotItems.map((item) => {
      const impact = data[`${item.field}_impact` as keyof Section9Data] as number | undefined;
      const likelihood = data[`${item.field}_likelihood` as keyof Section9Data] as number | undefined;
      return impact != null && likelihood != null;
    }),
    data.q9_1_moral_governance_derisk != null,
    data.q9_2_critical_loop,
    data.q9_3_regulatory_priority,
    data.q9_4_revenue_channel,
    data.q9_5_stakeholder_alignment,
    data.q9_6_reform_priority,
  ].filter(Boolean).length;
  const totalFields = 6 + swotItems.length * 2 + 6;

  // ── Live scores (dynamic from registry) ──
  const scores: Array<{ label: string; score: number | null; suffix: string; color: string }> = [];
  swotItems.forEach((item) => {
    const impact = data[`${item.field}_impact` as keyof Section9Data] as number | undefined;
    const likelihood = data[`${item.field}_likelihood` as keyof Section9Data] as number | undefined;
    if (impact == null || likelihood == null) return;

    let score: number | null = null;
    let suffix = "";
    let color = "";
    switch (item.category) {
      case "S":
        score = calculateStrengthRI(impact, likelihood);
        suffix = "RI";
        color = "text-emerald-400";
        break;
      case "W":
        score = calculateWeaknessRisk(impact, likelihood);
        suffix = "Risk";
        color = "text-rose-400";
        break;
      case "O":
        score = calculateOpportunityRI(impact, likelihood);
        suffix = "RI";
        color = "text-sky-400";
        break;
      case "T":
        score = calculateThreatVI(impact, likelihood);
        suffix = "VI";
        color = "text-amber-400";
        break;
    }
    if (score !== null) {
      scores.push({ label: item.id, score, suffix, color });
    }
  });

  // ── Archetype helpers ──
  const fixesAgree =
    data.q_s9_investment_loop === "Very accurately" ||
    data.q_s9_investment_loop === "Somewhat accurately";
  const escalationAgree =
    data.q_s9_governance_loop === "Very accurately" ||
    data.q_s9_governance_loop === "Somewhat accurately";
  const bigManAgree =
    data.q9_arch_big_man_accuracy === "Very accurately" ||
    data.q9_arch_big_man_accuracy === "Somewhat accurately";

  // ── Big Man loops (for followup) ──
  const bigManLoops = [
    "R1: Patronage eroding governance",
    "R2: Exclusion fueling conflict",
    "R3: Patronage draining development resources",
    "Other (please specify)",
  ];

  return (
    <motion.div
      className="space-y-8 max-w-4xl mx-auto px-4 py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Progress Header ── */}
      <SectionProgress
        currentSection={9}
        totalSections={16}
        sectionLabel="Operating Systems"
      />

      {/* ── Sub-progress ── */}
      <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#022c22]/40 border border-[#C9A84C]/10">
        <span className="text-[11px] text-[#ecfdf5]/40 uppercase tracking-wider">
          Section completion
        </span>
        <span className="text-[11px] text-[#C9A84C]/70">
          {filledCount}/{totalFields} fields
        </span>
      </div>

      {/* ── Header ── */}
      <motion.div variants={cardVariants} className="space-y-2">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-[#C9A84C]" />
          <h2 className="text-xl font-bold text-[#ecfdf5]">
            Section 9: Operating Systems
          </h2>
        </div>
        <p className="text-sm text-[#ecfdf5]/70">
          Moral Governance, Resilience, Inclusivity & Peace — the central operating system of the Bangsamoro ecosystem
        </p>
      </motion.div>

      {/* ── Banner Image ── */}
      <motion.div variants={cardVariants}>
        <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-2xl">
          <ImageWithFallback
            src={BIRD_IMAGES.operatingSystemsOS.url}
            alt={BIRD_IMAGES.operatingSystemsOS.alt}
            className="w-full h-56 sm:h-72"
            imgClassName="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-xs text-[#ecfdf5]/70 italic">
              {BIRD_IMAGES.operatingSystemsOS.title}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Cluster Description ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560]">
              The Operating Systems
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-[#ecfdf5]/80 leading-relaxed">
              Moral Governance serves as the central operating system of the Bangsamoro ecosystem — ensuring
              justice, transparency, accountability, and Islamic ethics (khalifa stewardship). Peace provides
              stability, Resilience enables climate-smart planning, and Inclusivity broadens participation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: <ShieldCheck className="w-4 h-4" />, title: "Peace", desc: "Long-term stability for investment and community trust." },
                { icon: <TreePine className="w-4 h-4" />, title: "Resilience", desc: "Adaptive, climate-smart planning to withstand external shocks." },
                { icon: <Users className="w-4 h-4" />, title: "Inclusivity", desc: "Broadened participation so marginalized communities share in value creation." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-3 rounded-xl bg-[#022c22]/60 border border-[#C9A84C]/10"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#C9A84C]">{item.icon}</span>
                    <span className="text-xs font-bold text-[#ecfdf5]">{item.title}</span>
                  </div>
                  <p className="text-[11px] text-[#ecfdf5]/50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Banner understanding check */}
            <div className="pt-4 border-t border-[#C9A84C]/10">
              <LikertScale
                name="q9_1_banner_understanding"
                label="How clearly does the Operating Systems description convey the role of moral governance, peace, resilience, and inclusivity as the ecosystem's central OS?"
                value={data.q9_1_banner_understanding}
                onChange={(v) => update("q9_1_banner_understanding", v)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════════
          ARCHETYPE 1: Fixes That Fail
          ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-amber-500/20">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Systems Archetype: Fixes That Fail
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {archetypes[0] && <ArchetypeCard archetype={archetypes[0]} />}

            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src={BIRD_IMAGES.fixesThatFail.url}
                alt={BIRD_IMAGES.fixesThatFail.alt}
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
            </div>

            <p className="text-xs text-[#ecfdf5]/60 italic border-l-2 border-amber-500/30 pl-3">
              The &quot;Fixes That Fail&quot; archetype illustrates how BARMM&apos;s reliance on short-term remedies
              undermines long-term institutional reform. Ad-hoc tax incentives, fragmented subsidies, and
              short-term security operations create the illusion of progress while institutional weaknesses persist.
            </p>

            <div className="pt-4 border-t border-[#C9A84C]/10 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                  How accurately does &quot;Fixes That Fail&quot; capture the unintended consequences of
                  short-term industrial policy in BARMM?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ACCURACY_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update("q_s9_investment_loop", opt)}
                      className={cn(
                        "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                        data.q_s9_investment_loop === opt
                          ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                          : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                      )}
                    >
                      <div
                        className={cn(
                          "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                          data.q_s9_investment_loop === opt
                            ? "bg-[#C9A84C] border-[#C9A84C]"
                            : "border-[#C9A84C]/40"
                        )}
                      />
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {fixesAgree && (
                <div>
                  <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                    Which sectors best fit this archetype? Which have avoided this trap?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      "Halal manufacturing",
                      "Agro-processing",
                      "Renewable energy",
                      "Tourism",
                      "Other (please specify)",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update("q_s9_investment_loop_followup", opt)}
                        className={cn(
                          "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                          data.q_s9_investment_loop_followup === opt
                            ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                            : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                        )}
                      >
                        <div
                          className={cn(
                            "w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0",
                            data.q_s9_investment_loop_followup === opt
                              ? "bg-[#C9A84C] border-[#C9A84C]"
                              : "border-[#C9A84C]/40"
                          )}
                        >
                          {data.q_s9_investment_loop_followup === opt && (
                            <svg className="w-2.5 h-2.5 text-[#011a12]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        {opt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Other (please specify)..."
                    value={
                      data.q_s9_investment_loop_followup &&
                      !["Halal manufacturing", "Agro-processing", "Renewable energy", "Tourism"].includes(data.q_s9_investment_loop_followup)
                        ? data.q_s9_investment_loop_followup
                        : ""
                    }
                    onChange={(e) => update("q_s9_investment_loop_followup", e.target.value)}
                    className={cn(
                      "mt-3 w-full px-3 py-2 rounded-lg border text-sm placeholder:text-[#ecfdf5]/30",
                      "bg-[#022c22]/60 border-[#C9A84C]/20 text-[#ecfdf5]",
                      "focus:outline-none focus:border-[#C9A84C]"
                    )}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════════
          ARCHETYPE 2: Escalation
          ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-orange-500/20">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              Systems Archetype: Escalation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {archetypes[1] && <ArchetypeCard archetype={archetypes[1]} />}

            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src={BIRD_IMAGES.escalationArchetype.url}
                alt={BIRD_IMAGES.escalationArchetype.alt}
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
            </div>

            <p className="text-xs text-[#ecfdf5]/60 italic border-l-2 border-orange-500/30 pl-3">
              The &quot;Escalation&quot; archetype manifests when one group perceives a threat and mobilizes,
              triggering counter-mobilization by others. The result is a reinforcing cycle of competitive
              spirals that diverts resources from productive development to contestation.
            </p>

            <div className="pt-4 border-t border-[#C9A84C]/10 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                  How accurately does the &quot;Escalation&quot; archetype reflect competitive dynamics among
                  clans, provinces, or agencies competing for trade corridors and connectivity investments?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ACCURACY_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update("q_s9_governance_loop", opt)}
                      className={cn(
                        "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                        data.q_s9_governance_loop === opt
                          ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                          : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                      )}
                    >
                      <div
                        className={cn(
                          "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                          data.q_s9_governance_loop === opt
                            ? "bg-[#C9A84C] border-[#C9A84C]"
                            : "border-[#C9A84C]/40"
                        )}
                      />
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {escalationAgree && (
                <div>
                  <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                    In which domain do you see this escalation dynamic most clearly?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      "Clan rivalries (rido)",
                      "Inter-provincial competition",
                      "Inter-agency rivalry",
                      "External market competition",
                      "Other (please specify)",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update("q_s9_governance_loop_followup", opt)}
                        className={cn(
                          "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                          data.q_s9_governance_loop_followup === opt
                            ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                            : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                        )}
                      >
                        <div
                          className={cn(
                            "w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0",
                            data.q_s9_governance_loop_followup === opt
                              ? "bg-[#C9A84C] border-[#C9A84C]"
                              : "border-[#C9A84C]/40"
                          )}
                        >
                          {data.q_s9_governance_loop_followup === opt && (
                            <svg className="w-2.5 h-2.5 text-[#011a12]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        {opt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Other (please specify)..."
                    value={
                      data.q_s9_governance_loop_followup &&
                      !["Clan rivalries (rido)", "Inter-provincial competition", "Inter-agency rivalry", "External market competition"].includes(data.q_s9_governance_loop_followup)
                        ? data.q_s9_governance_loop_followup
                        : ""
                    }
                    onChange={(e) => update("q_s9_governance_loop_followup", e.target.value)}
                    className={cn(
                      "mt-3 w-full px-3 py-2 rounded-lg border text-sm placeholder:text-[#ecfdf5]/30",
                      "bg-[#022c22]/60 border-[#C9A84C]/20 text-[#ecfdf5]",
                      "focus:outline-none focus:border-[#C9A84C]"
                    )}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════════
          ARCHETYPE 3: The Big Man
          ═══════════════════════════════════════════════════════════════════════ */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-rose-500/20">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              Systems Archetype: The Big Man
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {archetypes[2] && <ArchetypeCard archetype={archetypes[2]} />}

            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src={BIRD_IMAGES.bigManArchetype.url}
                alt={BIRD_IMAGES.bigManArchetype.alt}
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
            </div>

            <p className="text-xs text-[#ecfdf5]/60 italic border-l-2 border-rose-500/30 pl-3">
              The &quot;Big Man Archetype&quot; visualizes how concentrated political power around dominant clan leaders
              creates a self-reinforcing system of instability and underdevelopment. Three reinforcing loops
              form a vicious cycle: political dominance fuels conflict, conflict justifies dominance, and both
              deplete resources needed for progress.
            </p>

            <div className="pt-4 border-t border-[#C9A84C]/10 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                  How accurately does the &quot;Big Man&quot; archetype reflect the political and clan dynamics
                  affecting access to capital and financial services in BARMM?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ACCURACY_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update("q9_arch_big_man_accuracy", opt)}
                      className={cn(
                        "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                        data.q9_arch_big_man_accuracy === opt
                          ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                          : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                      )}
                    >
                      <div
                        className={cn(
                          "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                          data.q9_arch_big_man_accuracy === opt
                            ? "bg-[#C9A84C] border-[#C9A84C]"
                            : "border-[#C9A84C]/40"
                        )}
                      />
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {bigManAgree && (
                <div>
                  <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                    Which of the three reinforcing loops is most active in BARMM today?
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {bigManLoops.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update("q9_arch_big_man_followup", opt)}
                        className={cn(
                          "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                          data.q9_arch_big_man_followup === opt
                            ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                            : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                        )}
                      >
                        <div
                          className={cn(
                            "w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0",
                            data.q9_arch_big_man_followup === opt
                              ? "bg-[#C9A84C] border-[#C9A84C]"
                              : "border-[#C9A84C]/40"
                          )}
                        >
                          {data.q9_arch_big_man_followup === opt && (
                            <svg className="w-2.5 h-2.5 text-[#011a12]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        {opt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Other (please specify)..."
                    value={
                      data.q9_arch_big_man_followup &&
                      !bigManLoops.includes(data.q9_arch_big_man_followup)
                        ? data.q9_arch_big_man_followup
                        : ""
                    }
                    onChange={(e) => update("q9_arch_big_man_followup", e.target.value)}
                    className={cn(
                      "mt-3 w-full px-3 py-2 rounded-lg border text-sm placeholder:text-[#ecfdf5]/30",
                      "bg-[#022c22]/60 border-[#C9A84C]/20 text-[#ecfdf5]",
                      "focus:outline-none focus:border-[#C9A84C]"
                    )}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── SWOT Assessment ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#C9A84C]" />
              Risk & Resilience Assessment — Operating Systems
            </CardTitle>
            <p className="text-xs text-[#ecfdf5]/50 pt-1">
              Rate each factor&apos;s <strong className="text-[#ecfdf5]">Impact</strong> (severity if realized)
              and <strong className="text-[#ecfdf5]">Likelihood</strong> (probability of occurrence) on a 1–5 scale.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Strengths */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Strengths — Internal Resilience Drivers
                </h3>
              </div>
              <div className="space-y-4">
                {swotItems
                  .filter((i) => i.category === "S")
                  .map((item) => (
                    <SWOTScalePair
                      key={item.field}
                      category={item.category}
                      factorLabel={`${item.id} — ${item.label}`}
                      factorDescription={item.factor}
                      impact={data[`${item.field}_impact` as keyof Section9Data] as number | undefined}
                      likelihood={data[`${item.field}_likelihood` as keyof Section9Data] as number | undefined}
                      onImpactChange={(v) => update(`${item.field}_impact` as keyof Section9Data, v)}
                      onLikelihoodChange={(v) => update(`${item.field}_likelihood` as keyof Section9Data, v)}
                    />
                  ))}
              </div>
            </div>

            {/* Weaknesses */}
            <div className="pt-6 border-t border-[#C9A84C]/10">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-4 h-4 text-rose-400" />
                <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  Weaknesses — Internal Risk Exposure
                </h3>
              </div>
              <div className="space-y-4">
                {swotItems
                  .filter((i) => i.category === "W")
                  .map((item) => (
                    <SWOTScalePair
                      key={item.field}
                      category={item.category}
                      factorLabel={`${item.id} — ${item.label}`}
                      factorDescription={item.factor}
                      impact={data[`${item.field}_impact` as keyof Section9Data] as number | undefined}
                      likelihood={data[`${item.field}_likelihood` as keyof Section9Data] as number | undefined}
                      onImpactChange={(v) => update(`${item.field}_impact` as keyof Section9Data, v)}
                      onLikelihoodChange={(v) => update(`${item.field}_likelihood` as keyof Section9Data, v)}
                    />
                  ))}
              </div>
            </div>

            {/* Opportunities */}
            <div className="pt-6 border-t border-[#C9A84C]/10">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-sky-400" />
                <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Opportunities — External Resilience Drivers
                </h3>
              </div>
              <div className="space-y-4">
                {swotItems
                  .filter((i) => i.category === "O")
                  .map((item) => (
                    <SWOTScalePair
                      key={item.field}
                      category={item.category}
                      factorLabel={`${item.id} — ${item.label}`}
                      factorDescription={item.factor}
                      impact={data[`${item.field}_impact` as keyof Section9Data] as number | undefined}
                      likelihood={data[`${item.field}_likelihood` as keyof Section9Data] as number | undefined}
                      onImpactChange={(v) => update(`${item.field}_impact` as keyof Section9Data, v)}
                      onLikelihoodChange={(v) => update(`${item.field}_likelihood` as keyof Section9Data, v)}
                    />
                  ))}
              </div>
            </div>

            {/* Threats */}
            <div className="pt-6 border-t border-[#C9A84C]/10">
              <div className="flex items-center gap-2 mb-4">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Threats — External Vulnerability Factors
                </h3>
              </div>
              <div className="space-y-4">
                {swotItems
                  .filter((i) => i.category === "T")
                  .map((item) => (
                    <SWOTScalePair
                      key={item.field}
                      category={item.category}
                      factorLabel={`${item.id} — ${item.label}`}
                      factorDescription={item.factor}
                      impact={data[`${item.field}_impact` as keyof Section9Data] as number | undefined}
                      likelihood={data[`${item.field}_likelihood` as keyof Section9Data] as number | undefined}
                      onImpactChange={(v) => update(`${item.field}_impact` as keyof Section9Data, v)}
                      onLikelihoodChange={(v) => update(`${item.field}_likelihood` as keyof Section9Data, v)}
                    />
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Additional Deep-Dive: Moral Governance De-Risks Capital ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardContent className="pt-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src={BIRD_IMAGES.moralGovernanceDeRisks.url}
                alt={BIRD_IMAGES.moralGovernanceDeRisks.alt}
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-[#ecfdf5]/70 italic">
                  {BIRD_IMAGES.moralGovernanceDeRisks.title}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#ecfdf5]/70 leading-relaxed">
              This reinforcing feedback loop demonstrates how moral governance reduces investment risk.
              When government implements transparent systems (like BIFOSS), it lowers bureaucratic friction
              and raises investor confidence, leading to increased FDI and stronger governance capacity.
            </p>
            <div className="pt-2">
              <LikertScale
                name="q9_1_moral_governance_derisk"
                label="How effective is moral governance at de-risking capital investment in BARMM compared to traditional governance approaches?"
                value={data.q9_1_moral_governance_derisk}
                onChange={(v) => update("q9_1_moral_governance_derisk", v)}
              />
            </div>

            {/* Critical loop / aspect question */}
            <div className="pt-4 border-t border-[#C9A84C]/10">
              <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                Which aspect of moral governance most reduces investment risk?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Transparency",
                  "Accountability",
                  "Efficiency",
                  "Islamic ethics",
                  "Other (please specify)",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update("q9_2_critical_loop", opt)}
                    className={cn(
                      "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                      data.q9_2_critical_loop === opt
                        ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                        : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                    )}
                  >
                    <div
                      className={cn(
                        "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                        data.q9_2_critical_loop === opt
                          ? "bg-[#C9A84C] border-[#C9A84C]"
                          : "border-[#C9A84C]/40"
                      )}
                    />
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Additional Deep-Dive: Regulatory Architecture ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardContent className="pt-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src={BIRD_IMAGES.regulatoryArchitecture.url}
                alt={BIRD_IMAGES.regulatoryArchitecture.alt}
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-[#ecfdf5]/70 italic">
                  {BIRD_IMAGES.regulatoryArchitecture.title}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#ecfdf5]/70 leading-relaxed">
              At its core is the Bangsamoro Organic Law (RA 11054) — the constitutional mandate for
              economic self-determination — supported by five pillars: 2nd BDP &amp; SIPP, BHIDP, BSEMP,
              RA 11439 &amp; CREATE MORE Act, and the Pending Forestry Code.
            </p>
            <div className="pt-2">
              <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                Which regulatory pillar should be the highest priority for strengthening investment security?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Bangsamoro Organic Law (RA 11054) enforcement",
                  "2nd BDP & SIPP alignment",
                  "BHIDP implementation",
                  "BSEMP (Bangsamoro Spatial & Environmental Master Plan)",
                  "RA 11439 Islamic Finance & CREATE MORE Act",
                  "Pending Bangsamoro Forestry Code",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update("q9_3_regulatory_priority", opt)}
                    className={cn(
                      "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                      data.q9_3_regulatory_priority === opt
                        ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                        : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                    )}
                  >
                    <div
                      className={cn(
                        "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                        data.q9_3_regulatory_priority === opt
                          ? "bg-[#C9A84C] border-[#C9A84C]"
                          : "border-[#C9A84C]/40"
                      )}
                    />
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Additional Deep-Dive: Draft JMC 2026-01 ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardContent className="pt-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src={BIRD_IMAGES.draftJMC.url}
                alt={BIRD_IMAGES.draftJMC.alt}
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-[#ecfdf5]/70 italic">
                  {BIRD_IMAGES.draftJMC.title}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#ecfdf5]/70 leading-relaxed">
              Draft Joint Memorandum Circular 2026-01 transforms conservation into municipal revenue streams
              through three flowing channels: Carbon Credits, Payment for Ecosystem Services (PES), and
              Eco-Tourism User Fees — merging into a Revenue River that feeds Local Government Units.
            </p>
            <div className="pt-2">
              <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                Which revenue channel from JMC 2026-01 should be prioritized for pilot implementation?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Carbon Credits (REDD+ monetization)",
                  "Payment for Ecosystem Services (PES)",
                  "Eco-Tourism User Fees",
                  "All three simultaneously",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update("q9_4_revenue_channel", opt)}
                    className={cn(
                      "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                      data.q9_4_revenue_channel === opt
                        ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                        : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                    )}
                  >
                    <div
                      className={cn(
                        "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                        data.q9_4_revenue_channel === opt
                          ? "bg-[#C9A84C] border-[#C9A84C]"
                          : "border-[#C9A84C]/40"
                      )}
                    />
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Additional Deep-Dive: Policy Recommendations — Synchronized Mandate ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardContent className="pt-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src={BIRD_IMAGES.policyRecommendationsMakers.url}
                alt={BIRD_IMAGES.policyRecommendationsMakers.alt}
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-[#ecfdf5]/70 italic">
                  {BIRD_IMAGES.policyRecommendationsMakers.title}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#ecfdf5]/70 leading-relaxed">
              Aligning government, planning, and private-sector actions creates synergy between policy,
              planning, and investment to drive inclusive growth through collaborative governance.
            </p>
            <div className="pt-2">
              <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                Which stakeholder group must take the lead in synchronizing the Bangsamoro investment mandate?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Bangsamoro Government (BOI-MTIT, BBOI)",
                  "Local Government Units (LGUs)",
                  "Private Sector / Investors",
                  "Development Partners / Donor Agencies",
                  "Civil Society Organizations (CSOs)",
                  "All stakeholders equally through BIF-Net",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update("q9_5_stakeholder_alignment", opt)}
                    className={cn(
                      "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                      data.q9_5_stakeholder_alignment === opt
                        ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                        : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                    )}
                  >
                    <div
                      className={cn(
                        "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                        data.q9_5_stakeholder_alignment === opt
                          ? "bg-[#C9A84C] border-[#C9A84C]"
                          : "border-[#C9A84C]/40"
                      )}
                    />
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Additional Deep-Dive: Policy Recommendations — Activating ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardContent className="pt-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src={BIRD_IMAGES.policyRecommendationsActivating.url}
                alt={BIRD_IMAGES.policyRecommendationsActivating.alt}
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-[#ecfdf5]/70 italic">
                  {BIRD_IMAGES.policyRecommendationsActivating.title}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#ecfdf5]/70 leading-relaxed">
              Three integrated reforms: <strong>Institutional</strong> (BIF-Net coordination),{" "}
              <strong>Fiscal</strong> (SIPP &amp; CREATE MORE harmonization), and{" "}
              <strong>Regulatory</strong> (BEIE institutionalization) to strengthen investment coordination.
            </p>
            <div className="pt-2">
              <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                Which of the three reforms should be prioritized first?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Institutional (BIF-Net coordination, governance capacity)",
                  "Fiscal (SIPP & CREATE MORE harmonization, revenue mobilization)",
                  "Regulatory (BEIE institutionalization, ease of doing business)",
                  "All three must proceed in parallel",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update("q9_6_reform_priority", opt)}
                    className={cn(
                      "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                      data.q9_6_reform_priority === opt
                        ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                        : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                    )}
                  >
                    <div
                      className={cn(
                        "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                        data.q9_6_reform_priority === opt
                          ? "bg-[#C9A84C] border-[#C9A84C]"
                          : "border-[#C9A84C]/40"
                      )}
                    />
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Live Score Summary ── */}
      {scores.length > 0 && (
        <motion.div variants={cardVariants}>
          <Card className="bg-gradient-to-r from-[#022c22]/60 to-[#C9A84C]/5 border-[#C9A84C]/20">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-[#C9A84C]" />
                <span className="text-xs font-bold text-[#C9A84C] uppercase tracking-wider">
                  Live SWOT Scores — Operating Systems
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {scores.map(({ label, score, suffix, color }) => (
                  <div
                    key={label}
                    className="rounded-lg border border-[#C9A84C]/10 bg-[#011a12]/60 p-3 text-center"
                  >
                    <p className="text-[10px] text-[#ecfdf5]/40 font-medium mb-1">{label}</p>
                    <p className={cn("text-lg font-bold", color)}>{score?.toFixed(1) ?? "—"}</p>
                    <p className="text-[9px] text-[#ecfdf5]/30">{suffix}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Section9_OperatingSystems;
