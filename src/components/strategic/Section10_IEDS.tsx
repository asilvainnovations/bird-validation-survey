// src/components/strategic/Section10_IEDS.tsx
// BIRD 2026–2035 · Section 10: IEDS & Three-Phase Implementation
//
// SYSTEMS ARCHITECTURE ALIGNMENT:
// • Primitives: ImageWithFallback, LikertScale, SectionProgress
// • Animations: Framer Motion staggered entrance
// • Accessibility: All scales are true radio groups with keyboard nav
// • Theme: Dark-first consistent with Sections 0–9

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Primitives ───────────────────────────────────────────────────────────────
import { ImageWithFallback } from "@/lib/primitives/ImageWithFallback";
import { SectionProgress } from "@/lib/primitives/SectionProgress";
import { LikertScale } from "@/lib/primitives/LikertScale";

// ── shadcn/ui ────────────────────────────────────────────────────────────────
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// ── BIRD Content ─────────────────────────────────────────────────────────────
import { BIRD_IMAGES } from "@/lib/bird-urls";

// ── Icons ────────────────────────────────────────────────────────────────────
import {
  Map,
  Layers,
  Target,
  TrendingUp,
  ShieldAlert,
  BookOpen,
  Zap,
  GitBranch,
  BarChart3,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES — CONTRACT WITH SURVEYWIZARD.TSX
// ═══════════════════════════════════════════════════════════════════════════════
export interface Section10Data {
  q10_1_ieds_preference: string;
  q10_2_sequence_a_priority?: number;
  q10_3_sequence_b_priority?: number;
  q10_4_sequence_c_priority?: number;
  q10_5_sequencing_logic: string;
  q10_6_risk_mitigation: string;
  q10_7_outcomes_achievable?: number;
  q10_matrix: {
    heds: MatrixRow;
    gems: MatrixRow;
    ifes: MatrixRow;
    ieds: MatrixRow;
  };
  q10_leverage_points_clarity?: number;
  q10_activating_leverage?: number;
  q10_capacity_traps?: number;
  q10_iceberg_model?: number;
  q10_collaborative_governance?: number;
  q10_strategic_ranking: string;
}

interface MatrixRow {
  economic_impact: number;
  feasibility: number;
  identity_alignment: number;
  systems_leverage: number;
  risk_return: number;
  inclusivity: number;
  sustainability: number;
}

interface Section10Props {
  data: Section10Data;
  onChange: (data: Section10Data) => void;
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

// ── Constants ────────────────────────────────────────────────────────────────
const IEDS_OPTIONS = [
  { key: "heds", label: "HEDS — Halal-Centered Economic Development Strategy", desc: "Prioritizes halal industry as the primary growth engine, leveraging BARMM's Muslim-majority identity and BIMP-EAGA access." },
  { key: "gems", label: "GEMS — Green Economy & Moral Stewardship Strategy", desc: "Centers on carbon markets, PES, and sustainable resource management through the Bangsamoro Forestry Code." },
  { key: "ifes", label: "IFES — Islamic Finance & Ethical Capital Strategy", desc: "Builds Shariah-compliant financial infrastructure as the backbone for all other investments." },
  { key: "ieds", label: "IEDS — Integrated Economic Development Strategy", desc: "Synchronizes all three pathways (Halal + Green + Islamic Finance) through moral governance and systems thinking." },
];

const MATRIX_CRITERIA = [
  { key: "economic_impact", label: "Economic Impact" },
  { key: "feasibility", label: "Feasibility" },
  { key: "identity_alignment", label: "Identity Alignment" },
  { key: "systems_leverage", label: "Systems Leverage" },
  { key: "risk_return", label: "Risk-Return" },
  { key: "inclusivity", label: "Inclusivity" },
  { key: "sustainability", label: "Sustainability" },
] as const;

const STRATEGIC_RANKINGS = [
  "HEDS → GEMS → IFES (Halal first, then Green, then Finance)",
  "GEMS → HEDS → IFES (Green first, then Halal, then Finance)",
  "IFES → HEDS → GEMS (Finance first, then Halal, then Green)",
  "IEDS — All three in parallel from the start",
  "Other (please specify)",
];

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const Section10_IEDS: React.FC<Section10Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section10Data>(field: K, value: Section10Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  const updateMatrix = (
    strategy: keyof Section10Data["q10_matrix"],
    criterion: keyof MatrixRow,
    value: number
  ) => {
    onChange({
      ...data,
      q10_matrix: {
        ...data.q10_matrix,
        [strategy]: {
          ...data.q10_matrix[strategy],
          [criterion]: value,
        },
      },
    });
  };

  const activeBtn = "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]";
  const inactiveBtn = "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30";

  // Sub-progress
  const filledCount = [
    data.q10_1_ieds_preference,
    data.q10_2_sequence_a_priority != null,
    data.q10_3_sequence_b_priority != null,
    data.q10_4_sequence_c_priority != null,
    data.q10_5_sequencing_logic,
    data.q10_6_risk_mitigation,
    data.q10_7_outcomes_achievable != null,
    data.q10_leverage_points_clarity != null,
    data.q10_activating_leverage != null,
    data.q10_capacity_traps != null,
    data.q10_iceberg_model != null,
    data.q10_collaborative_governance != null,
    data.q10_strategic_ranking,
  ].filter(Boolean).length;
  const totalFields = 13;

  return (
    <motion.div
      className="space-y-8 max-w-4xl mx-auto px-4 py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Progress Header ── */}
      <SectionProgress
        currentSection={10}
        totalSections={16}
        sectionLabel="IEDS & 3-Phase Plan"
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
          <Map className="w-6 h-6 text-[#C9A84C]" />
          <h2 className="text-xl font-bold text-[#ecfdf5]">
            Section 10: IEDS & Three-Phase Implementation
          </h2>
        </div>
        <p className="text-sm text-[#ecfdf5]/70">
          Strategic Options Evaluation — selecting and sequencing the optimal investment development strategy for BARMM 2026–2035
        </p>
      </motion.div>

      {/* ── Banner Image ── */}
      <motion.div variants={cardVariants}>
        <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-2xl">
          <ImageWithFallback
            src={BIRD_IMAGES.iedsStrategicOptions?.url || BIRD_IMAGES.validationSurveyBanner?.url || ""}
            alt={BIRD_IMAGES.iedsStrategicOptions?.alt || "IEDS Strategic Options"}
            className="w-full h-56 sm:h-72"
            imgClassName="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-xs text-[#ecfdf5]/70 italic">
              {BIRD_IMAGES.iedsStrategicOptions?.title || "IEDS Strategic Options Evaluation"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Block 1: IEDS Preference ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#C9A84C]" />
              Select Your Preferred Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-[#ecfdf5]/70 leading-relaxed">
              The BIRD evaluates four strategic options through a 7-criteria matrix.
              Which integrated strategy do you believe offers BARMM the highest
              probability of achieving the ₱550B GRDP target by 2035?
            </p>
            <div className="grid grid-cols-1 gap-3">
              {IEDS_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => update("q10_1_ieds_preference", opt.key)}
                  className={cn(
                    "p-4 rounded-xl border text-left transition-all",
                    data.q10_1_ieds_preference === opt.key ? activeBtn : inactiveBtn
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-4 h-4 rounded-full border mt-0.5 flex-shrink-0",
                      data.q10_1_ieds_preference === opt.key ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/40"
                    )} />
                    <div>
                      <p className="text-sm font-semibold text-[#ecfdf5]">{opt.label}</p>
                      <p className="text-xs text-[#ecfdf5]/50 mt-1 leading-relaxed">{opt.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Block 2: Evaluation Matrix ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#C9A84C]" />
              7-Criteria Evaluation Matrix
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-[#ecfdf5]/70 leading-relaxed">
              Rate each strategic option across seven criteria on a 1–5 scale.
              This matrix feeds the TOWS-based selection logic for the IEDS.
            </p>
            <div className="overflow-x-auto rounded-lg border border-[#C9A84C]/20">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#022c22] text-white">
                    <th className="px-3 py-2 text-left font-semibold">Strategy</th>
                    {MATRIX_CRITERIA.map((c) => (
                      <th key={c.key} className="px-2 py-2 text-center font-semibold text-[10px] uppercase">
                        {c.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C9A84C]/10">
                  {(Object.keys(data.q10_matrix) as Array<keyof Section10Data["q10_matrix"]>).map((strategy) => {
                    const labels: Record<string, string> = { heds: "HEDS", gems: "GEMS", ifes: "IFES", ieds: "IEDS" };
                    return (
                      <tr key={strategy} className="bg-white/5 hover:bg-[#C9A84C]/5">
                        <td className="px-3 py-2 font-semibold text-[#ecfdf5] text-xs">{labels[strategy]}</td>
                        {MATRIX_CRITERIA.map((criterion) => (
                          <td key={criterion.key} className="px-1 py-2">
                            <div className="flex gap-1 justify-center">
                              {[1, 2, 3, 4, 5].map((v) => (
                                <button
                                  key={v}
                                  type="button"
                                  onClick={() => updateMatrix(strategy, criterion.key as keyof MatrixRow, v)}
                                  className={cn(
                                    "w-7 h-7 rounded text-[10px] font-bold border transition-all",
                                    data.q10_matrix[strategy][criterion.key as keyof MatrixRow] === v
                                      ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                                      : "bg-[#022c22]/60 text-[#ecfdf5]/50 border-[#C9A84C]/20 hover:border-[#C9A84C]/50"
                                  )}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Block 3: Sequencing Priorities ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-[#C9A84C]" />
              Phase Sequencing Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <LikertScale
                name="q10_2_sequence_a_priority"
                label="Rate the priority of Sequence A (Activate: 2026–2028)"
                value={data.q10_2_sequence_a_priority}
                onChange={(v) => update("q10_2_sequence_a_priority", v)}
              />
              <LikertScale
                name="q10_3_sequence_b_priority"
                label="Rate the priority of Sequence B (Scale: 2029–2031)"
                value={data.q10_3_sequence_b_priority}
                onChange={(v) => update("q10_3_sequence_b_priority", v)}
              />
              <LikertScale
                name="q10_4_sequence_c_priority"
                label="Rate the priority of Sequence C (Consolidate: 2032–2035)"
                value={data.q10_4_sequence_c_priority}
                onChange={(v) => update("q10_4_sequence_c_priority", v)}
              />
            </div>

            <div className="pt-4 border-t border-[#C9A84C]/10 space-y-4">
              <div>
                <Label className="text-sm font-medium text-[#ecfdf5] mb-2 block">
                  What is the core logic that should govern sequencing?
                </Label>
                <Textarea
                  rows={3}
                  value={data.q10_5_sequencing_logic}
                  onChange={(e) => update("q10_5_sequencing_logic", e.target.value)}
                  placeholder="Describe your preferred sequencing logic (e.g., enablers-first, quick-wins-first, risk-adjusted)..."
                  className={cn(
                    "w-full rounded-lg border text-sm placeholder:text-[#ecfdf5]/30",
                    "bg-[#022c22]/60 border-[#C9A84C]/20 text-[#ecfdf5]",
                    "focus:outline-none focus:border-[#C9A84C] resize-y"
                  )}
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-[#ecfdf5] mb-2 block">
                  What is the primary risk mitigation mechanism for your preferred sequence?
                </Label>
                <Textarea
                  rows={3}
                  value={data.q10_6_risk_mitigation}
                  onChange={(e) => update("q10_6_risk_mitigation", e.target.value)}
                  placeholder="Describe the key risk and how to mitigate it..."
                  className={cn(
                    "w-full rounded-lg border text-sm placeholder:text-[#ecfdf5]/30",
                    "bg-[#022c22]/60 border-[#C9A84C]/20 text-[#ecfdf5]",
                    "focus:outline-none focus:border-[#C9A84C] resize-y"
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Block 4: Outcomes Achievable ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#C9A84C]" />
              Outcomes Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LikertScale
              name="q10_7_outcomes_achievable"
              label="How achievable are the IEDS 2035 outcomes (₱550B GRDP, 20,000+ jobs, &lt;20% poverty) with the proposed 3-phase plan?"
              value={data.q10_7_outcomes_achievable}
              onChange={(v) => update("q10_7_outcomes_achievable", v)}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Block 5: Systems Thinking Deep-Dive ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#C9A84C]" />
              Systems Thinking Validation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LikertScale
                name="q10_leverage_points_clarity"
                label="How clearly do the identified leverage points (BIFOSS, BHB, BIF-Net) stand out as high-impact, low-effort interventions?"
                value={data.q10_leverage_points_clarity}
                onChange={(v) => update("q10_leverage_points_clarity", v)}
              />
              <LikertScale
                name="q10_activating_leverage"
                label="How confident are you that activating these leverage points will produce disproportionate results across the ecosystem?"
                value={data.q10_activating_leverage}
                onChange={(v) => update("q10_activating_leverage", v)}
              />
              <LikertScale
                name="q10_capacity_traps"
                label="How well does the plan identify and address capacity traps (institutional bottlenecks that stall progress)?"
                value={data.q10_capacity_traps}
                onChange={(v) => update("q10_capacity_traps", v)}
              />
              <LikertScale
                name="q10_iceberg_model"
                label="How useful is the Iceberg Model for distinguishing symptoms from root causes in BARMM's investment challenges?"
                value={data.q10_iceberg_model}
                onChange={(v) => update("q10_iceberg_model", v)}
              />
            </div>
            <div className="pt-4 border-t border-[#C9A84C]/10">
              <LikertScale
                name="q10_collaborative_governance"
                label="How essential is collaborative governance (BIF-Net, multi-stakeholder coordination) for IEDS success?"
                value={data.q10_collaborative_governance}
                onChange={(v) => update("q10_collaborative_governance", v)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Block 6: Strategic Ranking ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#C9A84C]" />
              Strategic Ranking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-[#ecfdf5]/70 leading-relaxed">
              Based on your evaluation above, what is the optimal sequencing of
              strategic pathways for BARMM?
            </p>
            <div className="grid grid-cols-1 gap-2">
              {STRATEGIC_RANKINGS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => update("q10_strategic_ranking", opt)}
                  className={cn(
                    "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                    data.q10_strategic_ranking === opt ? activeBtn : inactiveBtn
                  )}
                >
                  <div className={cn(
                    "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                    data.q10_strategic_ranking === opt ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/40"
                  )} />
                  {opt}
                </button>
              ))}
            </div>
            {data.q10_strategic_ranking === "Other (please specify)" && (
              <input
                type="text"
                placeholder="Please specify your preferred sequencing..."
                className={cn(
                  "w-full px-3 py-2 rounded-lg border text-sm placeholder:text-[#ecfdf5]/30",
                  "bg-[#022c22]/60 border-[#C9A84C]/20 text-[#ecfdf5]",
                  "focus:outline-none focus:border-[#C9A84C]"
                )}
              />
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Section10_IEDS;
