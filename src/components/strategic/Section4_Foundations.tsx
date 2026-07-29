// src/components/strategic/Section4_Foundations.tsx
// BIRD 2026–2035 · Section 4: Cluster 1 — Foundations
//
// SYSTEMS ARCHITECTURE ALIGNMENT:
// • Primitives: ImageWithFallback, LikertScale, SectionProgress, SWOTScalePair, ArchetypeCard
// • Animations: Framer Motion staggered entrance
// • Accessibility: All scales are true radio groups with keyboard nav
// • Theme: Dark-first consistent with Sections 0–3

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
import { ARCHETYPES_BY_SECTION, SWOT_BY_SECTION } from "@/lib/swot-content";

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
  TreePine,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Sprout,
  ShieldAlert,
  BookOpen,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES — CONTRACT WITH SURVEYWIZARD.TSX
// ═══════════════════════════════════════════════════════════════════════════════
export interface Section4Data {
  q4_1_foundations_banner_understanding?: number;
  q4_2_tragedy_commons_accuracy?: string;
  q4_3_tragedy_followup?: string;
  q4_s1_aff_base_impact?: number;
  q4_s1_aff_base_likelihood?: number;
  q4_s2_renewable_energy_impact?: number;
  q4_s2_renewable_energy_likelihood?: number;
  q4_s3_lake_lanao_impact?: number;
  q4_s3_lake_lanao_likelihood?: number;
  q4_s4_seaweed_dominance_impact?: number;
  q4_s4_seaweed_dominance_likelihood?: number;
  q4_w1_land_tenure_impact?: number;
  q4_w1_land_tenure_likelihood?: number;
  q4_o1_renewable_invest_impact?: number;
  q4_o1_renewable_invest_likelihood?: number;
  q4_o2_carbon_markets_impact?: number;
  q4_o2_carbon_markets_likelihood?: number;
  q4_o3_pes_impact?: number;
  q4_o3_pes_likelihood?: number;
  q4_o4_forestry_code_impact?: number;
  q4_o4_forestry_code_likelihood?: number;
  q4_t1_pestalotiopsis_impact?: number;
  q4_t1_pestalotiopsis_likelihood?: number;
}

interface Section4Props {
  data: Section4Data;
  onChange: (data: Section4Data) => void;
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
const Section4_Foundations: React.FC<Section4Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section4Data>(field: K, value: Section4Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  // ── Compute sub-progress ──
  const swotItems = SWOT_BY_SECTION[4];
  const filledCount = [
    data.q4_1_foundations_banner_understanding != null,
    data.q4_2_tragedy_commons_accuracy,
    data.q4_3_tragedy_followup,
    ...swotItems.map((item) => {
      const impact = data[`${item.field}_impact` as keyof Section4Data] as number | undefined;
      const likelihood = data[`${item.field}_likelihood` as keyof Section4Data] as number | undefined;
      return impact != null && likelihood != null;
    }),
  ].filter(Boolean).length;
  const totalFields = 3 + swotItems.length;

  // ── Live scores ──
  const scores: Array<{ label: string; score: number | null; suffix: string; color: string }> = [];
  const pushScore = (label: string, impact?: number, likelihood?: number, cat?: string) => {
    if (!impact || !likelihood || !cat) return;
    let score: number | null = null;
    let suffix = "";
    let color = "";
    switch (cat) {
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
    if (score !== null) scores.push({ label, score, suffix, color });
  };

  pushScore("S1 AFF", data.q4_s1_aff_base_impact, data.q4_s1_aff_base_likelihood, "S");
  pushScore("S2 Renewable", data.q4_s2_renewable_energy_impact, data.q4_s2_renewable_energy_likelihood, "S");
  pushScore("S3 Lanao", data.q4_s3_lake_lanao_impact, data.q4_s3_lake_lanao_likelihood, "S");
  pushScore("S4 Seaweed", data.q4_s4_seaweed_dominance_impact, data.q4_s4_seaweed_dominance_likelihood, "S");
  pushScore("W1 Land", data.q4_w1_land_tenure_impact, data.q4_w1_land_tenure_likelihood, "W");
  pushScore("O1 Renew", data.q4_o1_renewable_invest_impact, data.q4_o1_renewable_invest_likelihood, "O");
  pushScore("O2 Carbon", data.q4_o2_carbon_markets_impact, data.q4_o2_carbon_markets_likelihood, "O");
  pushScore("O3 PES", data.q4_o3_pes_impact, data.q4_o3_pes_likelihood, "O");
  pushScore("O4 Forestry", data.q4_o4_forestry_code_impact, data.q4_o4_forestry_code_likelihood, "O");
  pushScore("T1 Pest", data.q4_t1_pestalotiopsis_impact, data.q4_t1_pestalotiopsis_likelihood, "T");

  // ── Archetype data ──
  const archetype = ARCHETYPES_BY_SECTION[4]?.[0];

  return (
    <motion.div
      className="space-y-8 max-w-4xl mx-auto px-4 py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Progress Header ── */}
      <SectionProgress
        currentSection={4}
        totalSections={16}
        sectionLabel="Cluster 1: Foundations"
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
          <TreePine className="w-6 h-6 text-[#C9A84C]" />
          <h2 className="text-xl font-bold text-[#ecfdf5]">
            Section 4: Cluster 1 — Foundations
          </h2>
        </div>
        <p className="text-sm text-[#ecfdf5]/70">
          The Infrastructure-First Resource Base: agriculture, fisheries, forestry, energy & environment
        </p>
      </motion.div>

      {/* ── Banner Image ── */}
      <motion.div variants={cardVariants}>
        <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-2xl">
          <ImageWithFallback
            src={BIRD_IMAGES.cluster1Foundations.url}
            alt={BIRD_IMAGES.cluster1Foundations.alt}
            className="w-full h-56 sm:h-72"
            imgClassName="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-xs text-[#ecfdf5]/70 italic">
              {BIRD_IMAGES.cluster1Foundations.title}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Cluster Description ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560]">
              The Resource & Infrastructure Backbone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-[#ecfdf5]/80 leading-relaxed">
              Cluster 1 | Foundations forms the resource and infrastructure backbone of the Bangsamoro
              Investment Roadmap — the essential groundwork upon which other clusters and strategies
              will build.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: <Sprout className="w-4 h-4" />, title: "Agri‑Fisheries", desc: "Over 30% of GRDP, with notable outputs like Tawi‑Tawi's seaweed and Maguindanao's rice and corn." },
                { icon: <Zap className="w-4 h-4" />, title: "Energy", desc: "Over 75% renewable energy mix, anchored by hydroelectric and emerging solar/biomass sources." },
                { icon: <TreePine className="w-4 h-4" />, title: "Forestry", desc: "Vast untapped carbon reserves and ecosystem services for sustainable resource management." },
                { icon: <BarChart3 className="w-4 h-4" />, title: "Environment", desc: "Green Economy as a driver of revenue and innovation, not merely a compliance obligation." },
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
                name="q4_1_foundations_banner_understanding"
                label="How clearly does the Foundations cluster description convey the role of natural resources and infrastructure as the backbone of BARMM's economy?"
                value={data.q4_1_foundations_banner_understanding}
                onChange={(v) => update("q4_1_foundations_banner_understanding", v)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Archetype: Tragedy of the Commons ── */}
      {archetype && (
        <motion.div variants={cardVariants}>
          <Card className="bg-[#011a12]/80 border-rose-500/20">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                Systems Archetype: Tragedy of the Commons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ArchetypeCard archetype={archetype} />

              <p className="text-xs text-[#ecfdf5]/60 italic border-l-2 border-rose-500/30 pl-3">
                Without governance intervention — such as the Bangsamoro Forestry Code, carbon markets,
                and community co-management — the Foundations cluster risks{" "}
                <strong className="text-rose-300">systemic collapse</strong>.
              </p>

              {/* Archetype accuracy */}
              <div className="pt-4 border-t border-[#C9A84C]/10 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                    How accurately does the "Tragedy of the Commons" reflect potential resource
                    management challenges in BARMM?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update("q4_2_tragedy_commons_accuracy", opt)}
                        className={cn(
                          "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                          data.q4_2_tragedy_commons_accuracy === opt
                            ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                            : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                        )}
                      >
                        <div
                          className={cn(
                            "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                            data.q4_2_tragedy_commons_accuracy === opt
                              ? "bg-[#C9A84C] border-[#C9A84C]"
                              : "border-[#C9A84C]/40"
                          )}
                        />
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#ecfdf5] mb-2">
                    If this archetype applies, which shared resource is most at risk?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {["Watersheds", "Fishing grounds", "Forest reserves", "Agricultural land"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => update("q4_3_tragedy_followup", opt)}
                        className={cn(
                          "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                          data.q4_3_tragedy_followup === opt
                            ? "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]"
                            : "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                        )}
                      >
                        <div
                          className={cn(
                            "w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0",
                            data.q4_3_tragedy_followup === opt
                              ? "bg-[#C9A84C] border-[#C9A84C]"
                              : "border-[#C9A84C]/40"
                          )}
                        >
                          {data.q4_3_tragedy_followup === opt && (
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
                      data.q4_3_tragedy_followup &&
                      !["Watersheds", "Fishing grounds", "Forest reserves", "Agricultural land"].includes(data.q4_3_tragedy_followup)
                        ? data.q4_3_tragedy_followup
                        : ""
                    }
                    onChange={(e) => update("q4_3_tragedy_followup", e.target.value)}
                    className={cn(
                      "mt-3 w-full px-3 py-2 rounded-lg border text-sm placeholder:text-[#ecfdf5]/30",
                      "bg-[#022c22]/60 border-[#C9A84C]/20 text-[#ecfdf5]",
                      "focus:outline-none focus:border-[#C9A84C]"
                    )}
                  />
                </div>
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
              Risk & Resilience Assessment — Foundations Cluster
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
                {SWOT_BY_SECTION[4]
                  .filter((i) => i.category === "S")
                  .map((item) => (
                    <SWOTScalePair
                      key={item.field}
                      category={item.category}
                      factorLabel={`${item.code} — ${item.label}`}
                      factorDescription={item.factor}
                      impact={data[`${item.field}_impact` as keyof Section4Data] as number | undefined}
                      likelihood={data[`${item.field}_likelihood` as keyof Section4Data] as number | undefined}
                      onImpactChange={(v) => update(`${item.field}_impact` as keyof Section4Data, v)}
                      onLikelihoodChange={(v) => update(`${item.field}_likelihood` as keyof Section4Data, v)}
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
              {SWOT_BY_SECTION[4]
                .filter((i) => i.category === "W")
                .map((item) => (
                  <SWOTScalePair
                    key={item.field}
                    category={item.category}
                    factorLabel={`${item.code} — ${item.label}`}
                    factorDescription={item.factor}
                    impact={data[`${item.field}_impact` as keyof Section4Data] as number | undefined}
                    likelihood={data[`${item.field}_likelihood` as keyof Section4Data] as number | undefined}
                    onImpactChange={(v) => update(`${item.field}_impact` as keyof Section4Data, v)}
                    onLikelihoodChange={(v) => update(`${item.field}_likelihood` as keyof Section4Data, v)}
                  />
                ))}
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
                {SWOT_BY_SECTION[4]
                  .filter((i) => i.category === "O")
                  .map((item) => (
                    <SWOTScalePair
                      key={item.field}
                      category={item.category}
                      factorLabel={`${item.code} — ${item.label}`}
                      factorDescription={item.factor}
                      impact={data[`${item.field}_impact` as keyof Section4Data] as number | undefined}
                      likelihood={data[`${item.field}_likelihood` as keyof Section4Data] as number | undefined}
                      onImpactChange={(v) => update(`${item.field}_impact` as keyof Section4Data, v)}
                      onLikelihoodChange={(v) => update(`${item.field}_likelihood` as keyof Section4Data, v)}
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
              {SWOT_BY_SECTION[4]
                .filter((i) => i.category === "T")
                .map((item) => (
                  <SWOTScalePair
                    key={item.field}
                    category={item.category}
                    factorLabel={`${item.code} — ${item.label}`}
                    factorDescription={item.factor}
                    impact={data[`${item.field}_impact` as keyof Section4Data] as number | undefined}
                    likelihood={data[`${item.field}_likelihood` as keyof Section4Data] as number | undefined}
                    onImpactChange={(v) => update(`${item.field}_impact` as keyof Section4Data, v)}
                    onLikelihoodChange={(v) => update(`${item.field}_likelihood` as keyof Section4Data, v)}
                  />
                ))}
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
                  Live SWOT Scores — Foundations
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
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

export default Section4_Foundations;
