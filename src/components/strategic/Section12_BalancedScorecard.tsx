// src/components/strategic/Section12_BalancedScorecard.tsx
// BIRD 2026–2035 · Section 12: Balanced Scorecard — Investment Strategy Roadmap
// Updated: 2026-07-27 · Production-ready, dark-mode, schema-aligned, onChange contract

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
      "P4: Accelerate Infrastructure Delivery ({'>'}90% budget execution)",
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
      "S4: Reduce Poverty ({'<'}20% incidence)",
      "S5: Improve Community Access to Finance (70%+ inclusion)",
      "S6: Create Quality Employment (20,000+ jobs)",
      "S7: Ensure Provincial Equity ({'<'}1.5 pp disparity)",
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

const SCALE_LABELS = ["Low", "Moderate", "High", "Very High", "Exceptional"];

// ── Component ────────────────────────────────────────────────────────────────
export const Section12_BalancedScorecard: React.FC<Section12Props> = ({
  data,
  onChange,
}) => {
  const update = <K extends keyof Section12Data>(
    field: K,
    value: Section12Data[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const activeScaleClass =
    "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
  const inactiveScaleClass =
    "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]";
  const activeBtnClass =
    "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90";
  const inactiveBtnClass =
    "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#ecfdf5]/30 dark:hover:bg-[#C9A84C]/10";

  const renderScale = (field: keyof Section12Data, label: string) => (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
        {label}
        <span className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 block mt-1 font-normal">
          (1 = Low, 5 = High)
        </span>
      </Label>
      <div className="flex gap-2 flex-wrap">
        {[1, 2, 3, 4, 5].map((v) => (
          <Button
            key={v}
            type="button"
            variant="outline"
            size="icon"
            className={cn(
              "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
              data[field] === v ? activeScaleClass : inactiveScaleClass
            )}
            onClick={() => update(field, v)}
          >
            {v}
          </Button>
        ))}
      </div>
      <div className="flex justify-between mt-1 max-w-[272px]">
        <span className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">
          {SCALE_LABELS[0]}
        </span>
        <span className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">
          {SCALE_LABELS[4]}
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-[#022c22] text-[#C9A84C] shadow-md shrink-0">
          <Scale className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
            Section 12: Balanced Scorecard — Investment Strategy Roadmap
          </h2>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 mt-1 max-w-3xl leading-relaxed">
            The Balanced Scorecard translates vision and strategy into actionable
            objectives across four interconnected perspectives. It creates a
            strategy map that visualizes how intangible assets are transformed
            into tangible outcomes — the ₱550B GRDP target, 20,000+ jobs, and
            poverty reduction below 20%.
          </p>
        </div>
      </div>

      {/* ── Block 1: Strategy Map Image ────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <Target className="w-5 h-5 text-[#C9A84C]" />
            Strategy Map: From Intangible Assets to Tangible Economic Outcomes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.bscIntangibles.url}
              alt={BIRD_IMAGES.bscIntangibles.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                {BIRD_IMAGES.bscIntangibles.description}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            The following strategy map illustrates how investments in Learning &amp;
            Growth capabilities cascade through Internal Processes to create
            Stakeholder value, ultimately achieving Financial objectives. Each
            arrow represents a causal linkage validated through the BSC framework.
          </p>
        </CardContent>
      </Card>

      {/* ── Block 2: Four BSC Perspectives ─────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#C9A84C]" />
            Four BSC Perspectives — Rate Alignment
          </CardTitle>
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic pt-1">
            Each perspective contains strategic objectives that cascade upward
            through cause-and-effect relationships. Please rate how well each
            perspective&apos;s objectives align with BARMM&apos;s current strategic needs.
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {PERSPECTIVES.map((perspective, idx) => {
            const Icon = perspective.icon;
            return (
              <div
                key={perspective.key}
                className={cn(
                  "p-5 rounded-xl border border-[#C9A84C]/15 bg-emerald-50/40 dark:bg-[#1B4D3E]/10",
                  idx < PERSPECTIVES.length - 1 && "pb-8 border-b border-[#C9A84C]/20 rounded-b-none"
                )}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-5 h-5 text-[#C9A84C]" />
                  <h4 className="text-sm font-bold text-[#022c22] dark:text-[#ecfdf5]">
                    {perspective.title}
                  </h4>
                  <Badge
                    variant="secondary"
                    className="ml-auto bg-[#C9A84C]/10 text-[#022c22] dark:text-[#ecfdf5] border border-[#C9A84C]/20 text-[10px]"
                  >
                    Perspective {idx + 1}
                  </Badge>
                </div>
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic mb-3">
                  &ldquo;{perspective.question}&rdquo;
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                  {perspective.objectives.map((obj) => (
                    <div
                      key={obj}
                      className="flex items-start gap-2 text-sm text-[#022c22] dark:text-[#ecfdf5]/90"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-[#C9A84C] mt-0.5 shrink-0" />
                      <span className="leading-snug">{obj}</span>
                    </div>
                  ))}
                </div>

                {renderScale(
                  perspective.key,
                  `Rate alignment with BARMM's needs`
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* ── Block 3: Strategy Map Logic Validation ─────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-[#C9A84C]" />
            Strategy Map Logic Validation
          </CardTitle>
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic pt-1">
            The Balanced Scorecard operates through five critical causal pathways
            that trace how investments in human capital and organizational
            capacity flow through processes to stakeholder outcomes and financial
            results.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PATHWAYS.map((pathway) => {
              const Icon = pathway.icon;
              return (
                <div
                  key={pathway.num}
                  className="rounded-lg border border-[#C9A84C]/20 bg-emerald-50/30 dark:bg-[#1B4D3E]/10 p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-[#C9A84C]/20 flex items-center justify-center text-[10px] font-bold text-[#C9A84C]">
                      {pathway.num}
                    </div>
                    <Icon className="w-4 h-4 text-[#C9A84C]" />
                    <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5]">
                      {pathway.title}
                    </p>
                  </div>
                  <p className="text-xs font-mono text-[#1B4D3E] dark:text-[#C9A84C] mb-2 bg-[#C9A84C]/10 dark:bg-[#C9A84C]/20 px-2 py-1 rounded inline-block">
                    {pathway.chain}
                  </p>
                  <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
                    {pathway.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Strongest Pathway Question */}
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              Which causal pathway is strongest in BARMM&apos;s current context?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PATHWAY_OPTIONS.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left transition-all",
                    data.q12_5_strongest_pathway === opt
                      ? activeBtnClass
                      : inactiveBtnClass
                  )}
                  onClick={() => update("q12_5_strongest_pathway", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Block 4: Vision 2035 ───────────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <Target className="w-5 h-5 text-[#C9A84C]" />
            Vision 2035
          </CardTitle>
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic pt-1">
            The Vision 2035 statement defines the long-term destination for
            BARMM&apos;s economic transformation.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.vision2035.url}
              alt={BIRD_IMAGES.vision2035.alt}
              className="w-full h-auto max-h-[400px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                {BIRD_IMAGES.vision2035.description}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/10 to-emerald-50/40 dark:from-[#C9A84C]/10 dark:to-[#1B4D3E]/20 p-5">
            <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5] mb-2">
              Vision Statement
            </p>
            <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90 italic leading-relaxed">
              &ldquo;By 2035, BARMM shall be Southeast Asia&apos;s premier ethical and
              sustainable investment destination — a 550B economy powered by
              halal innovation, green finance, and moral governance, where every
              Bangsamoro participates in dignified prosperity.&rdquo;
            </p>
          </div>

          {renderScale("q12_6_vision_clarity", "How clear is the Vision 2035 statement?")}

          <div className="pt-4 border-t border-[#C9A84C]/20">
            {renderScale(
              "q12_7_vision_achievable",
              "How achievable is this vision with IEDS implementation?"
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Block 5: Mission Statement ─────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <Landmark className="w-5 h-5 text-[#C9A84C]" />
            Mission Statement
          </CardTitle>
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic pt-1">
            The mission statement defines the fundamental purpose of the Bangsamoro
            Investment and Development Corporation (BIDC) and the broader
            investment ecosystem.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/10 to-emerald-50/40 dark:from-[#C9A84C]/10 dark:to-[#1B4D3E]/20 p-5">
            <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5] mb-2">
              Mission Statement
            </p>
            <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90 italic leading-relaxed">
              &ldquo;To synchronize halal industry, green economy, infrastructure, and
              Islamic finance through moral governance — creating an inclusive
              investment ecosystem that honors Bangsamoro identity, uplifts all
              communities, and attracts global capital.&rdquo;
            </p>
          </div>

          {renderScale(
            "q12_8_mission_alignment",
            "How well does this mission align with BARMM's identity and aspirations?"
          )}
        </CardContent>
      </Card>

      {/* ── Block 6: BSC as Strategic Operating System ─────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#C9A84C]" />
            BSC as Strategic Operating System
          </CardTitle>
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic pt-1">
            The Balanced Scorecard serves as more than a planning tool — it is a
            strategic operating system that translates vision into measurable
            actions, monitors performance across four dimensions, and enables
            adaptive management.
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {renderScale(
            "q12_9_bsc_useful",
            "How useful is the Balanced Scorecard as a strategic operating system for BARMM?"
          )}

          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              How often should the BSC be reviewed?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ADAPTIVE_OPTIONS.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left transition-all",
                    data.q12_10_adaptive_frequency === opt
                      ? activeBtnClass
                      : inactiveBtnClass
                  )}
                  onClick={() => update("q12_10_adaptive_frequency", opt)}
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

export default Section12_BalancedScorecard;
