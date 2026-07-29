// src/components/strategic/Section3_BEIE_SystemsThinking.tsx
// BIRD 2026–2035 · Section 3: BEIE Framework & Systems Thinking
//
// SYSTEMS ARCHITECTURE ALIGNMENT:
// • Primitives: ImageWithFallback, LikertScale, SectionProgress, SWOTScalePair
// • Animations: Framer Motion staggered entrance
// • Accessibility: All scales are true radio groups with keyboard nav
// • Theme: Dark-first consistent with Sections 0–2

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Primitives ───────────────────────────────────────────────────────────────
import { ImageWithFallback } from "@/lib/primitives/ImageWithFallback";
import { SectionProgress } from "@/lib/primitives/SectionProgress";
import { LikertScale } from "@/lib/primitives/LikertScale";
import { SWOTScalePair } from "@/lib/primitives/SWOTScalePair";

// ── BIRD Assets ──────────────────────────────────────────────────────────────
import { BIRD_IMAGES, BIRD_VIDEOS } from "@/lib/bird-urls";

// ── shadcn/ui ────────────────────────────────────────────────────────────────
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// ── Icons ────────────────────────────────────────────────────────────────────
import {
  Network,
  BookOpen,
  Play,
  Target,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES — CONTRACT WITH SURVEYWIZARD.TSX
// ═══════════════════════════════════════════════════════════════════════════════
export interface Section3Data {
  q3_1_beie_video_understanding?: number;
  q3_2_systems_reframing_accuracy?: number;
  q3_3_sector_to_ecosystem_shift?: number;
  q3_4_beie_framework_clarity?: number;
  q3_5_operating_systems_understanding?: number;
  q3_6_five_clusters_understanding?: number;
  q3_7_investment_development_loop?: string;
  q3_8_governance_investor_loop?: string;
  q_s1_halal_legitimacy_impact?: number;
  q_s1_halal_legitimacy_likelihood?: number;
  q_s1_bimpeaga_impact?: number;
  q_s1_bimpeaga_likelihood?: number;
  q_s1_aff_base_impact?: number;
  q_s1_aff_base_likelihood?: number;
}

interface Section3Props {
  data: Section3Data;
  onChange: (data: Section3Data) => void;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════
const LIKERT_QUESTIONS: Array<{
  field: keyof Section3Data;
  label: string;
  description?: string;
}> = [
  {
    field: "q3_1_beie_video_understanding",
    label: "How well did the BEIE Framework video explain the ecosystem approach?",
  },
  {
    field: "q3_2_systems_reframing_accuracy",
    label: "How accurately does 'systems-based reframing' describe the shift BARMM needs?",
  },
  {
    field: "q3_3_sector_to_ecosystem_shift",
    label: "How clear is the mental model shift from sector-based planning to the BEIE approach?",
  },
  {
    field: "q3_4_beie_framework_clarity",
    label: "How clear is the overall BEIE Framework diagram (5 clusters + Moral Governance OS)?",
  },
  {
    field: "q3_5_operating_systems_understanding",
    label: "How well do you understand Moral Governance as the 'operating system' of the ecosystem?",
  },
  {
    field: "q3_6_five_clusters_understanding",
    label: "How well do you understand the role of each of the five interconnected clusters?",
  },
];

const SCALE_LABELS: Record<number, string> = {
  1: "Not at all",
  2: "Slightly",
  3: "Moderately",
  4: "Very well",
  5: "Completely",
};

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
const Section3_BEIE_SystemsThinking: React.FC<Section3Props> = ({
  data,
  onChange,
}) => {
  const update = <K extends keyof Section3Data>(field: K, value: Section3Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  // ── Compute sub-progress ──
  const filledCount = [
    data.q3_1_beie_video_understanding != null,
    data.q3_2_systems_reframing_accuracy != null,
    data.q3_3_sector_to_ecosystem_shift != null,
    data.q3_4_beie_framework_clarity != null,
    data.q3_5_operating_systems_understanding != null,
    data.q3_6_five_clusters_understanding != null,
    data.q3_7_investment_development_loop?.trim(),
    data.q3_8_governance_investor_loop?.trim(),
    data.q_s1_halal_legitimacy_impact != null && data.q_s1_halal_legitimacy_likelihood != null,
    data.q_s1_bimpeaga_impact != null && data.q_s1_bimpeaga_likelihood != null,
    data.q_s1_aff_base_impact != null && data.q_s1_aff_base_likelihood != null,
  ].filter(Boolean).length;
  const totalFields = 11;

  const textareaClass = cn(
    "w-full rounded-lg border text-sm placeholder:text-[#ecfdf5]/30 resize-y",
    "bg-[#022c22]/60 border-[#C9A84C]/20 text-[#ecfdf5]",
    "focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/30",
    "transition-all min-h-[100px] px-3 py-2"
  );

  return (
    <motion.div
      className="space-y-8 max-w-4xl mx-auto px-4 py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Progress Header ── */}
      <SectionProgress
        currentSection={3}
        totalSections={16}
        sectionLabel="BEIE & Systems Thinking"
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
      <motion.div variants={cardVariants} className="space-y-3">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#022c22] text-[#C9A84C] shadow-md shrink-0">
            <Network className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#ecfdf5]">
              Section 3: BEIE & Systems Thinking
            </h2>
            <p className="text-sm text-[#ecfdf5]/70 mt-1 max-w-3xl">
              The IEDS requires a synchronized, cross-cluster monitoring framework
              that measures not just sectoral outputs but ecosystem health. This
              section validates the conceptual foundations and archetype
              understanding.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── BEIE Framework Video ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <Play className="w-5 h-5 text-[#C9A84C]" />
              Bangsamoro Economic & Investment Ecosystem (BEIE) Framework
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative aspect-video bg-[#022c22]">
              <iframe
                src={BIRD_VIDEOS.beieFramework.url.replace("youtu.be/", "youtube.com/embed/")}
                title={BIRD_VIDEOS.beieFramework.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-4 space-y-2">
              <p className="text-sm text-[#ecfdf5]/70 leading-relaxed">
                {BIRD_VIDEOS.beieFramework.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Reference Images ── */}
      {[
        {
          key: "systemsBasedReframing" as const,
          icon: <BookOpen className="w-5 h-5 text-[#C9A84C]" />,
          title: "Why the Need for Systems-Based Reframing",
        },
        {
          key: "sectorToEcosystem" as const,
          icon: <BookOpen className="w-5 h-5 text-[#C9A84C]" />,
          title: "From Sector-Based Planning to BEIE Approach",
        },
        {
          key: "beieFramework" as const,
          icon: <Network className="w-5 h-5 text-[#C9A84C]" />,
          title: "Bangsamoro Economic and Investment Ecosystem (BEIE)",
        },
        {
          key: "operatingSystems" as const,
          icon: <BookOpen className="w-5 h-5 text-[#C9A84C]" />,
          title: "Operating Systems: Moral Governance",
        },
        {
          key: "fiveClusters" as const,
          icon: <Network className="w-5 h-5 text-[#C9A84C]" />,
          title: "Five Interconnected Clusters",
        },
        {
          key: "investmentVirtuousCycle" as const,
          icon: <TrendingUp className="w-5 h-5 text-[#C9A84C]" />,
          title: "Investment-Development Virtuous Cycle",
        },
        {
          key: "investmentGovernanceCycles" as const,
          icon: <TrendingUp className="w-5 h-5 text-[#C9A84C]" />,
          title: "Investment and Governance Cycles",
        },
      ].map((item) => {
        const img = BIRD_IMAGES[item.key];
        return (
          <motion.div key={item.key} variants={cardVariants}>
            <Card className="bg-[#011a12]/80 border-[#C9A84C]/10 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-[#E5C560] flex items-center gap-2">
                  {item.icon}
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ImageWithFallback
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-64 sm:h-80"
                  imgClassName="object-contain bg-[#022c22]"
                />
                <p className="p-4 text-xs text-[#ecfdf5]/50 leading-relaxed">
                  {img.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}

      {/* ── Framework Understanding Checks ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#C9A84C]" />
              Framework Understanding & Validation
            </CardTitle>
            <p className="text-xs text-[#ecfdf5]/50 pt-1">
              Rate your understanding of each concept after reviewing the materials.
              (1 = not at all, 5 = completely)
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {LIKERT_QUESTIONS.map((q) => (
              <LikertScale
                key={q.field}
                name={q.field}
                label={q.label}
                description={q.description}
                value={data[q.field] as number | undefined}
                onChange={(v) => update(q.field, v as Section3Data[typeof q.field])}
                labels={SCALE_LABELS}
              />
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Causal Loop Reflection ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#C9A84C]" />
              Causal Loop Reflection
            </CardTitle>
            <p className="text-xs text-[#ecfdf5]/50 pt-1">
              In your own words, describe the reinforcing loops that drive
              Bangsamoro&apos;s investment ecosystem.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#ecfdf5]">
                Describe the <strong className="text-[#C9A84C]">Investment-Development Virtuous Cycle</strong>{" "}
                (R1): How does strategic investment trigger self-sustaining growth?
              </Label>
              <textarea
                value={data.q3_7_investment_development_loop || ""}
                onChange={(e) => update("q3_7_investment_development_loop", e.target.value)}
                placeholder="e.g., Infrastructure investment → productivity gains → revenue growth → reinvestment..."
                className={textareaClass}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#ecfdf5]">
                Describe the <strong className="text-[#C9A84C]">Governance-Investor Confidence Cycle</strong>{" "}
                (R2): How does moral governance de-risk capital?
              </Label>
              <textarea
                value={data.q3_8_governance_investor_loop || ""}
                onChange={(e) => update("q3_8_governance_investor_loop", e.target.value)}
                placeholder="e.g., Transparent governance → investor trust → FDI inflows → revenue → governance capacity..."
                className={textareaClass}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── SWOT Strengths Scoring ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#C9A84C]" />
              Cross-Cutting SWOT Strengths — Transformers Cluster
            </CardTitle>
            <p className="text-xs text-[#ecfdf5]/50 pt-1">
              Rate each strength by <strong className="text-[#ecfdf5]">Impact</strong> and{" "}
              <strong className="text-[#ecfdf5]">Likelihood</strong>. Resilience Index (RI) computes
              automatically.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <SWOTScalePair
              category="S"
              factorLabel="S1 — Halal Industry Legitimacy"
              factorDescription="BARMM's cultural & geographic advantage in ASEAN halal markets"
              impact={data.q_s1_halal_legitimacy_impact}
              likelihood={data.q_s1_halal_legitimacy_likelihood}
              onImpactChange={(v) => update("q_s1_halal_legitimacy_impact", v)}
              onLikelihoodChange={(v) => update("q_s1_halal_legitimacy_likelihood", v)}
            />
            <SWOTScalePair
              category="S"
              factorLabel="S1 — BIMP-EAGA Integration"
              factorDescription="Cross-border trade corridors and regional economic cooperation"
              impact={data.q_s1_bimpeaga_impact}
              likelihood={data.q_s1_bimpeaga_likelihood}
              onImpactChange={(v) => update("q_s1_bimpeaga_impact", v)}
              onLikelihoodChange={(v) => update("q_s1_bimpeaga_likelihood", v)}
            />
            <SWOTScalePair
              category="S"
              factorLabel="S1 — Agri-Fisheries Base"
              factorDescription="Productive land & marine resources as foundational economic assets"
              impact={data.q_s1_aff_base_impact}
              likelihood={data.q_s1_aff_base_likelihood}
              onImpactChange={(v) => update("q_s1_aff_base_impact", v)}
              onLikelihoodChange={(v) => update("q_s1_aff_base_likelihood", v)}
            />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Section3_BEIE_SystemsThinking;
