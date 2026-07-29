// src/components/strategic/Section12_BalancedScorecard.tsx
// BIRD 2026–2035 · Section 12: Balanced Scorecard — Investment Strategy Roadmap
// Updated: 2026-07-30 · Fixed imports, primitive APIs, dark-first theme, Framer Motion

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Scale,
  Target,
  TrendingUp,
  Users,
  BookOpen,
  Landmark,
  Zap,
  Leaf,
  Building2,
  ArrowRight,
} from "lucide-react";
import { BIRD_IMAGES } from "@/lib/bird-urls";

// ─── REUSABLE PRIMITIVES ─────────────────────────────────────────────────────
import { ImageWithFallback } from "@/lib/primitives/ImageWithFallback";
import { LikertScale } from "@/lib/primitives/LikertScale";
import { SectionProgress } from "@/lib/primitives/SectionProgress";

// ── Types ────────────────────────────────────────────────────────────────────
export interface Section12Data {
  q12_1_learning_growth_alignment?: number;
  q12_2_internal_process_alignment?: number;
  q12_3_stakeholder_alignment?: number;
  q12_4_financial_alignment?: number;
  q12_5_strongest_pathway?: string;
  q12_6_vision_clarity?: number;
  q12_7_vision_achievable?: number;
  q12_8_mission_alignment?: number;
  q12_9_bsc_useful?: number;
  q12_10_adaptive_frequency?: string;
}

interface Section12Props {
  data: Section12Data;
  onChange: (data: Section12Data) => void;
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

// ── Constants ──────────────────────────────────────────────────────────────
const PERSPECTIVES = [
  {
    key: "q12_1_learning_growth_alignment" as const,
    icon: BookOpen,
    title: "Learning & Growth",
    question: "How will we sustain our ability to change and improve?",
    objectives: [
      "L1: Build Halal Expertise (100+ certification officers)",
      "L2: Develop Islamic Finance Professionals (50+)",
      "L3: Strengthen IPA Capacity (80% staff certified)",
      "L4: Foster Digital Innovation (20+ services)",
      "L5: Improve Functional Literacy (75%+)",
      "L6: Develop Green Economy Expertise (200+ LGU staff)",
      "L7: Align TESDA with Industry (15 TRs)",
    ],
  },
  {
    key: "q12_2_internal_process_alignment" as const,
    icon: Zap,
    title: "Internal Process",
    question: "What processes must we excel at?",
    objectives: [
      "P1: Streamline Investment Facilitation (1-day digital registration)",
      "P2: Accelerate Permit Processing (7 days)",
      "P3: Strengthen Halal Certification (Full OIC/SMIIC + MRA)",
      "P4: Accelerate Infrastructure Delivery (&gt;90% budget execution)",
      "P5: Synchronize BMOA Programs (8/10 coordination)",
      "P6: Activate Green Economy Programs (100% JMC 2026-01)",
      "P7: Ensure Climate Resilience (100% screening)",
    ],
  },
  {
    key: "q12_3_stakeholder_alignment" as const,
    icon: Users,
    title: "Stakeholder",
    question: "How should we appear to investors and communities?",
    objectives: [
      "S1: Enhance Investor Satisfaction (8.0+/10)",
      "S2: Retain Investment Projects (85% retention)",
      "S3: Empower MSMEs through Certification (5,000+)",
      "S4: Reduce Poverty (&lt;20% incidence)",
      "S5: Improve Community Access to Finance (70%+ inclusion)",
      "S6: Create Quality Employment (20,000+ jobs)",
      "S7: Ensure Provincial Equity (&lt;1.5 pp disparity)",
    ],
  },
  {
    key: "q12_4_financial_alignment" as const,
    icon: TrendingUp,
    title: "Financial",
    question: "How should we appear to funders and investors?",
    objectives: [
      "F1: Increase Investment Approvals (₱15B p.a.)",
      "F2: Grow Regional Economy (₱550B+ GRDP)",
      "F3: Expand Export Revenue (₱40B+)",
      "F4: Activate Green Economy Revenue (₱500M+ p.a.)",
      "F5: Mobilize Islamic Finance (₱20B+ assets)",
      "F6: Attract Foreign Direct Investment (₱3B+ p.a.)",
    ],
  },
];

const PATHWAYS = [
  {
    num: "1",
    title: "Halal Economy Pathway",
    chain: "L1 → P3 → S3 → F3",
    description:
      "Halal expertise building drives certification process excellence, enabling MSME empowerment and ultimately expanding halal export revenue to ₱40B+.",
    icon: Leaf,
  },
  {
    num: "2",
    title: "Infrastructure-Enabled Growth",
    chain: "L3 + L4 → P1 + P4 → S1 → F1 → F2",
    description:
      "Capacity in digital innovation and green expertise streamlines investment facilitation and infrastructure delivery, improving investor satisfaction, increasing approvals, and growing GRDP.",
    icon: Building2,
  },
  {
    num: "3",
    title: "Green Economy Pathway",
    chain: "L6 → P6 + P7 → F4 → F2",
    description:
      "Green economy expertise activates green programs and climate resilience screening, generating ₱500M+ in green revenue and contributing to overall GRDP growth.",
    icon: Leaf,
  },
  {
    num: "4",
    title: "Inclusive Development Pathway",
    chain: "L5 + L7 → S6 + S5 → S4 → F2",
    description:
      "Functional literacy and TESDA-industry alignment create quality employment and financial inclusion, reducing poverty below 20% and expanding the productive economic base.",
    icon: Users,
  },
  {
    num: "5",
    title: "Islamic Finance Pathway",
    chain: "L2 → P3 + S5 → F5 → F1",
    description:
      "Islamic finance professionals strengthen halal certification processes and community financial access, mobilizing ₱20B+ in Islamic finance assets that attract further investment approvals and catalyze capital formation.",
    icon: Landmark,
  },
];

const PATHWAY_OPTIONS = [
  "Halal Economy",
  "Infrastructure-Enabled Growth",
  "Green Economy",
  "Inclusive Development",
  "Islamic Finance",
];

const ADAPTIVE_OPTIONS = [
  "Quarterly",
  "Semi-annually",
  "Annually",
  "Only at phase transitions",
];

const activeBtn = "bg-[#C9A84C]/15 border-[#C9A84C] text-[#E5C560]";
const inactiveBtn = "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30";

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const Section12_BalancedScorecard: React.FC<Section12Props> = ({
  data,
  onChange,
}) => {
  const update = <K extends keyof Section12Data>(
    field: K,
    value: Section12Data[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  // Sub-progress
  const filledCount = [
    data.q12_1_learning_growth_alignment != null,
    data.q12_2_internal_process_alignment != null,
    data.q12_3_stakeholder_alignment != null,
    data.q12_4_financial_alignment != null,
    data.q12_5_strongest_pathway,
    data.q12_6_vision_clarity != null,
    data.q12_7_vision_achievable != null,
    data.q12_8_mission_alignment != null,
    data.q12_9_bsc_useful != null,
    data.q12_10_adaptive_frequency,
  ].filter(Boolean).length;
  const totalFields = 10;

  return (
    <motion.div
      className="space-y-8 max-w-4xl mx-auto px-4 py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Progress Header ── */}
      <SectionProgress
        currentSection={12}
        totalSections={16}
        sectionLabel="Balanced Scorecard"
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
          <Scale className="w-6 h-6 text-[#C9A84C]" />
          <h2 className="text-xl font-bold text-[#ecfdf5]">
            Section 12: Balanced Scorecard — Investment Strategy Roadmap
          </h2>
        </div>
        <p className="text-sm text-[#ecfdf5]/70">
          The Balanced Scorecard translates vision and strategy into actionable objectives across four interconnected perspectives.
        </p>
      </motion.div>

      {/* ── Block 1: Strategy Map Image ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#C9A84C]" />
              Strategy Map: From Intangible Assets to Tangible Economic Outcomes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src={BIRD_IMAGES.bscIntangibles.url}
                alt={BIRD_IMAGES.bscIntangibles.alt}
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-[#ecfdf5]/70 italic">
                  {BIRD_IMAGES.bscIntangibles.title}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#ecfdf5]/70 leading-relaxed">
              The strategy map illustrates how investments in Learning &amp; Growth capabilities cascade through Internal Processes to create Stakeholder value, ultimately achieving Financial objectives.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Block 2: Four BSC Perspectives ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#C9A84C]" />
              Four BSC Perspectives — Rate Alignment
            </CardTitle>
            <p className="text-xs text-[#ecfdf5]/50 pt-1 italic">
              Each perspective contains strategic objectives that cascade upward through cause-and-effect relationships.
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            {PERSPECTIVES.map((perspective, idx) => {
              const Icon = perspective.icon;
              return (
                <div
                  key={perspective.key}
                  className={cn(
                    "p-5 rounded-xl border border-[#C9A84C]/15 bg-[#022c22]/40",
                    idx < PERSPECTIVES.length - 1 && "pb-8 border-b border-[#C9A84C]/20 rounded-b-none"
                  )}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-[#C9A84C]" />
                    <h4 className="text-sm font-bold text-[#ecfdf5]">
                      {perspective.title}
                    </h4>
                    <Badge className="ml-auto bg-[#C9A84C]/10 text-[#ecfdf5] border border-[#C9A84C]/20 text-[10px]">
                      Perspective {idx + 1}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#ecfdf5]/50 italic mb-3">
                    &ldquo;{perspective.question}&rdquo;
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                    {perspective.objectives.map((obj) => (
                      <div
                        key={obj}
                        className="flex items-start gap-2 text-sm text-[#ecfdf5]/90"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-[#C9A84C] mt-0.5 shrink-0" />
                        <span className="leading-snug">{obj}</span>
                      </div>
                    ))}
                  </div>

                  <LikertScale
                    name={perspective.key}
                    label={`Rate alignment with BARMM's needs`}
                    value={data[perspective.key]}
                    onChange={(v) => update(perspective.key, v)}
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Block 3: Strategy Map Logic Validation ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-[#C9A84C]" />
              Strategy Map Logic Validation
            </CardTitle>
            <p className="text-xs text-[#ecfdf5]/50 pt-1 italic">
              The Balanced Scorecard operates through five critical causal pathways that trace how investments flow to outcomes.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PATHWAYS.map((pathway) => {
                const Icon = pathway.icon;
                return (
                  <div
                    key={pathway.num}
                    className="rounded-lg border border-[#C9A84C]/20 bg-[#022c22]/40 p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-[#C9A84C]/20 flex items-center justify-center text-[10px] font-bold text-[#C9A84C]">
                        {pathway.num}
                      </div>
                      <Icon className="w-4 h-4 text-[#C9A84C]" />
                      <p className="text-sm font-semibold text-[#ecfdf5]">
                        {pathway.title}
                      </p>
                    </div>
                    <p className="text-xs font-mono text-[#C9A84C] mb-2 bg-[#C9A84C]/10 px-2 py-1 rounded inline-block">
                      {pathway.chain}
                    </p>
                    <p className="text-xs text-[#ecfdf5]/60 leading-relaxed">
                      {pathway.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Strongest Pathway Question */}
            <div className="pt-4 border-t border-[#C9A84C]/10">
              <Label className="text-sm font-medium text-[#ecfdf5] mb-3 block">
                Which causal pathway is strongest in BARMM&apos;s current context?
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PATHWAY_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update("q12_5_strongest_pathway", opt)}
                    className={cn(
                      "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                      data.q12_5_strongest_pathway === opt ? activeBtn : inactiveBtn
                    )}
                  >
                    <div className={cn(
                      "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                      data.q12_5_strongest_pathway === opt ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/40"
                    )} />
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Block 4: Vision 2035 ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#C9A84C]" />
              Vision 2035
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-xl">
              <ImageWithFallback
                src={BIRD_IMAGES.vision2035.url}
                alt={BIRD_IMAGES.vision2035.alt}
                className="w-full h-48 sm:h-64"
                imgClassName="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-xs text-[#ecfdf5]/70 italic">
                  {BIRD_IMAGES.vision2035.title}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/10 to-[#022c22]/40 p-5">
              <p className="text-sm font-semibold text-[#ecfdf5] mb-2">
                Vision Statement
              </p>
              <p className="text-sm text-[#ecfdf5]/90 italic leading-relaxed">
                &ldquo;By 2035, BARMM shall be Southeast Asia&apos;s premier ethical and sustainable investment destination — a 550B economy powered by halal innovation, green finance, and moral governance, where every Bangsamoro participates in dignified prosperity.&rdquo;
              </p>
            </div>

            <LikertScale
              name="q12_6_vision_clarity"
              label="How clear is the Vision 2035 statement?"
              value={data.q12_6_vision_clarity}
              onChange={(v) => update("q12_6_vision_clarity", v)}
            />

            <div className="pt-4 border-t border-[#C9A84C]/10">
              <LikertScale
                name="q12_7_vision_achievable"
                label="How achievable is this vision with IEDS implementation?"
                value={data.q12_7_vision_achievable}
                onChange={(v) => update("q12_7_vision_achievable", v)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Block 5: Mission Statement ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#C9A84C]" />
              Mission Statement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/10 to-[#022c22]/40 p-5">
              <p className="text-sm font-semibold text-[#ecfdf5] mb-2">
                Mission Statement
              </p>
              <p className="text-sm text-[#ecfdf5]/90 italic leading-relaxed">
                &ldquo;To synchronize halal industry, green economy, infrastructure, and Islamic finance through moral governance — creating an inclusive investment ecosystem that honors Bangsamoro identity, uplifts all communities, and attracts global capital.&rdquo;
              </p>
            </div>

            <LikertScale
              name="q12_8_mission_alignment"
              label="How well does this mission align with BARMM's identity and aspirations?"
              value={data.q12_8_mission_alignment}
              onChange={(v) => update("q12_8_mission_alignment", v)}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Block 6: BSC as Strategic Operating System ── */}
      <motion.div variants={cardVariants}>
        <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[#E5C560] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#C9A84C]" />
              BSC as Strategic Operating System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <LikertScale
              name="q12_9_bsc_useful"
              label="How useful is the Balanced Scorecard as a strategic operating system for BARMM?"
              value={data.q12_9_bsc_useful}
              onChange={(v) => update("q12_9_bsc_useful", v)}
            />

            <div className="pt-4 border-t border-[#C9A84C]/10">
              <Label className="text-sm font-medium text-[#ecfdf5] mb-3 block">
                How often should the BSC be reviewed?
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADAPTIVE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => update("q12_10_adaptive_frequency", opt)}
                    className={cn(
                      "p-3 rounded-lg border text-xs text-left transition-all flex items-center gap-2",
                      data.q12_10_adaptive_frequency === opt ? activeBtn : inactiveBtn
                    )}
                  >
                    <div className={cn(
                      "w-3.5 h-3.5 rounded-full border flex-shrink-0",
                      data.q12_10_adaptive_frequency === opt ? "bg-[#C9A84C] border-[#C9A84C]" : "border-[#C9A84C]/40"
                    )} />
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Section12_BalancedScorecard;
