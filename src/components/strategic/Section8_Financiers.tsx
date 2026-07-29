// src/components/strategic/Section8_Financiers.tsx
// BIRD 2026–2035 · Section 8: Cluster 5 — Financiers
//
// SYSTEMS ARCHITECTURE ALIGNMENT:
// • Primitives: ImageWithFallback, LikertScale, SectionProgress, SWOTScalePair, ArchetypeCard
// • Animations: Framer Motion staggered entrance
// • Accessibility: All scales are true radio groups with keyboard nav
// • Theme: Dark-first consistent with Sections 0–7
// • Content: Single-source-of-truth from swot-content.ts (SWOT_BY_SECTION[8], ARCHETYPES_BY_SECTION[8])

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
} from "@/lib/formulas";

// ── Icons ────────────────────────────────────────────────────────────────────
import {
  Landmark,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  ShieldAlert,
  BookOpen,
  HandCoins,
  Scale,
  Globe,
  TrendingUpIcon,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES — CONTRACT WITH SURVEYWIZARD.TSX
// ═══════════════════════════════════════════════════════════════════════════════
export interface Section8Data {
  // Banner understanding
  q8_1_banner_understanding?: number;
  // Archetype
  q8_arch_shifting_burden_accuracy?: string;
  q8_arch_shifting_burden_followup?: string;
  // SWOT — Strengths
  q8_s1_islamic_finance_framework_impact?: number;
  q8_s1_islamic_finance_framework_likelihood?: number;
  // SWOT — Weaknesses
  q8_w1_financial_penetration_impact?: number;
  q8_w1_financial_penetration_likelihood?: number;
  // SWOT — Opportunities
  q8_o1_islamic_ecosystem_impact?: number;
  q8_o1_islamic_ecosystem_likelihood?: number;
  // Additional understanding questions
  q8_2_capital_bloodstream_understanding?: number;
  q8_3_islamic_finance_roadmap_understanding?: number;
  q8_4_finance_tier_priority?: string;
  q8_5_roadmap_achievable?: number;
  q8_6_priority_action?: string;
  q8_7_islamic_authority?: string;
}

interface Section8Props {
  data: Section8Data;
  onChange: (data: Section8Data) => void;
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

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const Section8_Financiers: React.FC<Section8Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section8Data>(field: K, value: Section8Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  const swotItems = SWOT_BY_SECTION[8];
  const archetype = ARCHETYPES_BY_SECTION[8]?.[0];

  // ── Compute sub-progress ──
  const filledCount = [
    data.q8_1_banner_understanding != null,
    data.q8_arch_shifting_burden_accuracy,
    data.q8_arch_shifting_burden_followup,
    ...swotItems.map((item) => {
      const impact = data[`${item.field}_impact` as keyof Section8Data] as number | undefined;
      const likelihood = data[`${item.field}_likelihood` as keyof Section8Data] as number | undefined;
      return impact != null && likelihood != null;
    }),
    data.q8_2_capital_bloodstream_understanding != null,
    data.q8_3_islamic_finance_roadmap_understanding != null,
    data.q8_4_finance_tier_priority,
    data.q8_5_roadmap_achievable != null,
    data.q8_6_priority_action,
    data.q8_7_islamic_authority,
  ].filter(Boolean).length;
  const totalFields = 3 + swotItems.length * 2 + 6;

  // ── Live scores (dynamic from registry) ──
  const scores: Array<{ label: string; score: number | null; suffix: string; color: string }> = [];
  swotItems.forEach((item) => {
    const impact = data[`${item.field}_impact` as keyof Section8Data] as number | undefined;
    const likelihood = data[`${item.field}_likelihood` as keyof Section8Data] as number | undefined;
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
    }
    if (score !== null) {
      scores.push({ label: item.id, score, suffix, color });
    }
  });

  const shiftingAgree =
    data.q8_arch_shifting_burden_accuracy === "Very accurately" ||
    data.q8_arch_shifting_burden_accuracy === "Somewhat accurately";

  return (
    <motion.div
      className="space-y-8 max-w-4xl mx-auto px-4 py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Progress Header ── */}
      <SectionProgress
        currentSection={8}
        totalSections={16}
        sectionLabel="Cluster 5: Financiers"
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
          <Landmark className="w-6 h-6 text-[#C9A84C]" />
          <h2 className="text-xl font-bold text-[#ecfdf5]">
            Section 8: Cluster 5 — Financiers
          </h2>
        </div>
        <p className="text-sm text-[#ecfdf5]/70">
          Powering the Bloodstream of the Economy — Islamic finance through ethical and faith-aligned capital mechanisms
        </p>
      </motion.div>

      {/* ── Banner Image ── */}
      <motion.div variants={cardVariants}>
        <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-2xl">
          <ImageWithFallback
            src={BIRD_IMAGES.cluster5Financiers.url}
            alt={BIRD_IMAGES.cluster5Financiers.alt}
            className="w-full h-56 sm:h-72"
            imgClassName="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-xs text-[#ecfdf5]/70 italic">
              {BIRD_IMAGES.cluster5Financiers.title}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Cluster Description ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560]">
              The Capital Bloodstream
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-[#ecfdf5]/80 leading-relaxed">
              Cluster 5 | Financiers powers the bloodstream of the Bangsamoro economy through Shariah-compliant
              capital mechanisms. From macro-capital (Islamic banking & Sukuk) to risk mitigation (Takaful)
              and micro-access (Islamic microfinance & Waqf), this cluster ensures that financial flows align
              with ethical values and religious principles.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: <Scale className="w-4 h-4" />, title: "Islamic Banking & Sukuk", desc: "Macro-capital mobilization through Shariah-compliant bonds and banking institutions enabled by RA 11439." },
                { icon: <ShieldAlert className="w-4 h-4" />, title: "Takaful (Islamic Insurance)", desc: "Risk mitigation and protection for investments, communities, and enterprises against unforeseen shocks." },
                { icon: <HandCoins className="w-4 h-4" />, title: "Islamic Microfinance", desc: "Micro-access for MSMEs and rural communities excluded from conventional banking systems." },
                { icon: <Globe className="w-4 h-4" />, title: "Waqf & Social Finance", desc: "Endowment-based perpetual capital for education, health, and community infrastructure." },
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
                name="q8_1_banner_understanding"
                label="How clearly does the Financiers cluster description convey its role as the ethical capital bloodstream of BARMM?"
                value={data.q8_1_banner_understanding}
                onChange={(v) => update("q8_1_banner_understanding", v)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Archetype: Shifting the Burden ── */}
      {archetype && (
        <motion.div variants={cardVariants}>
          <Card className="bg-[#011a12]/80 border-rose-500/20">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                Systems Archetype: {archetype.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ArchetypeCard archetype={archetype} />

              <p className="text-xs text-[#ecfdf5]/60 italic border-l-2 border-rose-500/30 pl-3">
                Without building indigenous Shariah-compliant institutions, BARMM remains dependent on
                conventional banking that does not serve Muslim-majority communities equitably,
                perpetuating a{" "}
                <strong className="text-rose-300">structural dependency</strong>.
              </p>

              {/* Archetype accuracy */}
              <div className="pt-4 border-t border-[#C9A84C]/10 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                    How accurately does &quot;{archetype.name}&quot; reflect BARMM&apos;s reliance on
                    conventional banking instead of fully investing in Islamic finance institutions?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ACCURACY_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update("q8_arch_shifting_burden_accuracy", opt)}
                        className={cn(
                          "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                          data.q8_arch_shifting_burden_accuracy === opt
                            ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                            : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                        )}
                      >
                        <div
                          className={cn(
                            "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                            data.q8_arch_shifting_burden_accuracy === opt
                              ? "bg-[#C9A84C] border-[#C9A84C]"
                              : "border-[#C9A84C]/40"
                          )}
                        />
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {shiftingAgree && (
                  <div>
                    <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                      {archetype.followupLabel}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {archetype.followupOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => update("q8_arch_shifting_burden_followup", opt)}
                          className={cn(
                            "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                            data.q8_arch_shifting_burden_followup === opt
                              ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                              : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                          )}
                        >
                          <div
                            className={cn(
                              "w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0",
                              data.q8_arch_shifting_burden_followup === opt
                                ? "bg-[#C9A84C] border-[#C9A84C]"
                                : "border-[#C9A84C]/40"
                            )}
                          >
                            {data.q8_arch_shifting_burden_followup === opt && (
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
                        data.q8_arch_shifting_burden_followup &&
                        !archetype.followupOptions.includes(data.q8_arch_shifting_burden_followup)
                          ? data.q8_arch_shifting_burden_followup
                          : ""
                      }
                      onChange={(e) => update("q8_arch_shifting_burden_followup", e.target.value)}
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
      )}

      {/* ── SWOT Assessment ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#C9A84C]" />
              Risk & Resilience Assessment — Financiers Cluster
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
                      impact={data[`${item.field}_impact` as keyof Section8Data] as number | undefined}
                      likelihood={data[`${item.field}_likelihood` as keyof Section8Data] as number | undefined}
                      onImpactChange={(v) => update(`${item.field}_impact` as keyof Section8Data, v)}
                      onLikelihoodChange={(v) => update(`${item.field}_likelihood` as keyof Section8Data, v)}
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
                      impact={data[`${item.field}_impact` as keyof Section8Data] as number | undefined}
                      likelihood={data[`${item.field}_likelihood` as keyof Section8Data] as number | undefined}
                      onImpactChange={(v) => update(`${item.field}_impact` as keyof Section8Data, v)}
                      onLikelihoodChange={(v) => update(`${item.field}_likelihood` as keyof Section8Data, v)}
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
                      impact={data[`${item.field}_impact` as keyof Section8Data] as number | undefined}
                      likelihood={data[`${item.field}_likelihood` as keyof Section8Data] as number | undefined}
                      onImpactChange={(v) => update(`${item.field}_impact` as keyof Section8Data, v)}
                      onLikelihoodChange={(v) => update(`${item.field}_likelihood` as keyof Section8Data, v)}
                    />
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Additional Deep-Dive: The Capital Bloodstream ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardContent className="pt-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src={BIRD_IMAGES.financiersCapitalBloodstream.url}
                alt={BIRD_IMAGES.financiersCapitalBloodstream.alt}
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-[#ecfdf5]/70 italic">
                  {BIRD_IMAGES.financiersCapitalBloodstream.title}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#ecfdf5]/70 leading-relaxed">
              <strong>Three tiers of Islamic finance:</strong> Macro-Capital (Islamic Banking & Sukuk),{" "}
              Risk Mitigation (Takaful), and Micro-Access (Islamic Microfinance & Waqf).{" "}
              Together they form a comprehensive ethical capital ecosystem aligned with BARMM&apos;s values.
            </p>
            <div className="pt-2">
              <LikertScale
                name="q8_2_capital_bloodstream_understanding"
                label="How clearly does the Capital Bloodstream diagram explain the three tiers of Islamic finance in BARMM?"
                value={data.q8_2_capital_bloodstream_understanding}
                onChange={(v) => update("q8_2_capital_bloodstream_understanding", v)}
              />
            </div>

            {/* Finance tier priority */}
            <div className="pt-4 border-t border-[#C9A84C]/10">
              <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                Which finance tier should be the highest priority for BARMM in the next 3 years?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Islamic Banking & Sukuk (Macro-Capital)",
                  "Takaful (Risk Mitigation)",
                  "Islamic Microfinance (Micro-Access)",
                  "Waqf & Social Finance",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update("q8_4_finance_tier_priority", opt)}
                    className={cn(
                      "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                      data.q8_4_finance_tier_priority === opt
                        ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                        : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                    )}
                  >
                    <div
                      className={cn(
                        "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                        data.q8_4_finance_tier_priority === opt
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

      {/* ── Additional Deep-Dive: Islamic Finance Roadmap ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardContent className="pt-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src={BIRD_IMAGES.islamicFinanceRoadmap.url}
                alt={BIRD_IMAGES.islamicFinanceRoadmap.alt}
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-[#ecfdf5]/70 italic">
                  {BIRD_IMAGES.islamicFinanceRoadmap.title}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#ecfdf5]/70 leading-relaxed">
              The <strong>Islamic Finance Roadmap (2024–2028)</strong> outlines six progressive layers:
              from strengthening Islamic banking foundations to developing human capital. This phased
              approach ensures institutional capacity keeps pace with capital mobilization.
            </p>
            <div className="pt-2">
              <LikertScale
                name="q8_3_islamic_finance_roadmap_understanding"
                label="How achievable do you consider the 2024–2028 Islamic Finance Roadmap timeline?"
                value={data.q8_3_islamic_finance_roadmap_understanding}
                onChange={(v) => update("q8_3_islamic_finance_roadmap_understanding", v)}
              />
            </div>

            {/* Roadmap achievable */}
            <div className="pt-4 border-t border-[#C9A84C]/10">
              <LikertScale
                name="q8_5_roadmap_achievable"
                label="Rate your confidence that the Islamic Finance Roadmap targets are achievable (1 = not confident, 5 = fully confident)"
                value={data.q8_5_roadmap_achievable}
                onChange={(v) => update("q8_5_roadmap_achievable", v)}
              />
            </div>

            {/* Priority action */}
            <div className="pt-4 border-t border-[#C9A84C]/10">
              <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                What is the single most important action to accelerate Islamic finance in BARMM?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Strengthen the Bangsamoro Islamic Finance Board (BIFB)",
                  "Fast-track RA 11439 implementing rules",
                  "Launch a BARMM Sukuk pilot program",
                  "Expand Islamic microfinance to rural areas",
                  "Build Shariah advisory capacity",
                  "Other (please specify)",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update("q8_6_priority_action", opt)}
                    className={cn(
                      "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                      data.q8_6_priority_action === opt
                        ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                        : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                    )}
                  >
                    <div
                      className={cn(
                        "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                        data.q8_6_priority_action === opt
                          ? "bg-[#C9A84C] border-[#C9A84C]"
                          : "border-[#C9A84C]/40"
                      )}
                    />
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Islamic authority */}
            <div className="pt-4 border-t border-[#C9A84C]/10">
              <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                Which body should serve as the primary Shariah authority for Islamic finance in BARMM?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Bangsamoro Islamic Finance Board (BIFB)",
                  "National Shariah Advisory Council (BSP)",
                  "Independent BARMM Shariah Council",
                  "MABDA (Moro Affairs and Development Authority)",
                  "Other (please specify)",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update("q8_7_islamic_authority", opt)}
                    className={cn(
                      "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                      data.q8_7_islamic_authority === opt
                        ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                        : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                    )}
                  >
                    <div
                      className={cn(
                        "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                        data.q8_7_islamic_authority === opt
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
                  Live SWOT Scores — Financiers
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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

export default Section8_Financiers;
