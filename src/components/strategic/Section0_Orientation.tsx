// src/components/strategic/Section0_Orientation.tsx
// BIRD 2026–2035 · Section 0: Welcome & Orientation
//
// SYSTEMS ARCHITECTURE NOTES:
// ┌─────────────────────────────────────────────────────────────────────────────┐
// │  BLOCK  │  CONTENT                              │  STATE      │  PERSISTED  │
// ├─────────────────────────────────────────────────────────────────────────────┤
// │  A      │  Welcome (banner, text, features)     │  —          │  ❌ No      │
// │  B      │  Video + Q1 (practice Likert)         │  local      │  ❌ No      │
// │  C      │  CLD Image + Q2 (practice quiz)       │  local      │  ❌ No      │
// │  D      │  Feedback Loops + Q3+Q4 (practice)    │  local      │  ❌ No      │
// │  E      │  Quick-Start readiness gate           │  s0 prop    │  ✅ Yes     │
// └─────────────────────────────────────────────────────────────────────────────┘
//
// SCHEMA IMPACT:
//   • survey-schema.ts: q0_2–q0_6 REMOVED (only q0_1_ready remains)
//   • SurveyWizard.tsx: s0 state simplified to { q0_1_ready: "" }
//   • handleSubmit payload: only q0_1_ready forwarded
//
// PRIMITIVES USED:
//   • ImageWithFallback  → BIRD banner, CLD diagram, Feedback Loops diagram
//   • SectionProgress    → Section 0 of 16 indicator
//   • LikertScale        → Block B practice Q1
//   • QuizCard           → Blocks C & D practice quizzes

import React, { useState } from "react";
import { cn } from "@/lib/utils";

// ── Primitives ───────────────────────────────────────────────────────────────
import { ImageWithFallback } from "@/lib/primitives/ImageWithFallback";
import { SectionProgress } from "@/lib/primitives/SectionProgress";
import { LikertScale } from "@/lib/primitives/LikertScale";
import { QuizCard } from "@/lib/primitives/QuizCard";

// ── BIRD Assets ──────────────────────────────────────────────────────────────
import { BIRD_IMAGES, BIRD_VIDEOS } from "@/lib/bird-urls";

// ── shadcn/ui ────────────────────────────────────────────────────────────────
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Icons ────────────────────────────────────────────────────────────────────
import {
  Play,
  BookOpen,
  Users,
  Network,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Lightbulb,
  GitBranch,
  RefreshCw,
  Target,
  CheckCircle,
  XCircle,
  HelpCircle,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES — CONTRACT WITH SURVEYWIZARD.TSX
// ═══════════════════════════════════════════════════════════════════════════════
export interface Section0Data {
  /** The ONLY field persisted to the survey database. */
  q0_1_ready: string;
}

interface Section0OrientationProps {
  data: Section0Data;
  onChange: (next: Section0Data) => void;
}

// ═══════════════════════════════════════════════════════════════════════════════
// BLOCK A — WELCOME (Informational, no state)
// ═══════════════════════════════════════════════════════════════════════════════
const FEATURES = [
  {
    icon: <Network className="w-5 h-5" />,
    title: "Data-Driven",
    desc: "Every response feeds into real-time analytics shaping policy and investment priorities.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Inclusive",
    desc: "Designed for government, business, academe, civil society, and development partners.",
  },
  {
    icon: <GitBranch className="w-5 h-5" />,
    title: "Systems-Based",
    desc: "Moving beyond checklists to understand feedback loops, archetypes, and leverage points.",
  },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// BLOCK B — VIDEO + PRACTICE Q1 (Local state only)
// ═══════════════════════════════════════════════════════════════════════════════
// Q1: "After watching the video, how valuable do you find systems thinking?"
// Stored in local component state — NOT forwarded to onChange / NOT persisted.

// ═══════════════════════════════════════════════════════════════════════════════
// BLOCK C — CLD IMAGE + PRACTICE Q2 (Local state only)
// ═══════════════════════════════════════════════════════════════════════════════
// Q2: "'s' polarity = ?" — 4-option MCQ with immediate feedback.

const Q2_OPTIONS = [
  { key: "A", label: "Same direction change", correct: true },
  { key: "B", label: "Opposite direction change", correct: false },
  { key: "C", label: "Static variable", correct: false },
  { key: "D", label: "Strength of connection", correct: false },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// BLOCK D — FEEDBACK LOOPS + PRACTICE Q3+Q4 (Local state only)
// ═══════════════════════════════════════════════════════════════════════════════

const Q3_OPTIONS = [
  { key: "A", label: "It balances and stabilizes the system", correct: false },
  { key: "B", label: "It amplifies change and drives growth or decline", correct: true },
  { key: "C", label: "It remains constant regardless of input", correct: false },
  { key: "D", label: "It introduces time delays into the system", correct: false },
] as const;

const Q4_OPTIONS = [
  { key: "A", label: "Changing parameters (numbers, constants)", correct: false },
  { key: "B", label: "Changing information flows", correct: false },
  { key: "C", label: "Changing the mindset or paradigm out of which the system arises", correct: true },
  { key: "D", label: "Changing the rules of the system", correct: false },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// BLOCK E — QUICK-START (The ONLY persisted field)
// ═══════════════════════════════════════════════════════════════════════════════
const READINESS_OPTIONS = [
  { value: "yes_ready", label: "Yes, I feel ready to proceed", icon: <CheckCircle2 className="w-4 h-4" /> },
  { value: "need_info", label: "I need a bit more orientation", icon: <HelpCircle className="w-4 h-4" /> },
  { value: "review_later", label: "I will review and return later", icon: <ArrowRight className="w-4 h-4" /> },
  { value: "not_ready", label: "Not ready at this time", icon: <AlertCircle className="w-4 h-4" /> },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const Section0_Orientation: React.FC<Section0OrientationProps> = ({
  data,
  onChange,
}) => {
  // ── Local practice state (never leaves this component) ──
  const [practiceQ1, setPracticeQ1] = useState<number | undefined>(undefined);
  const [practiceQ2, setPracticeQ2] = useState<string | null>(null);
  const [practiceQ3, setPracticeQ3] = useState<string | null>(null);
  const [practiceQ4, setPracticeQ4] = useState<string | null>(null);

  const isReady = data.q0_1_ready === "yes_ready";

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6">
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* BLOCK A — WELCOME                                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <SectionProgress
        currentSection={0}
        totalSections={16}
        sectionLabel="Welcome & Orientation"
      />

      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-[#C9A84C]/20 shadow-2xl">
        <ImageWithFallback
          src={BIRD_IMAGES.validationSurveyBanner.url}
          alt={BIRD_IMAGES.validationSurveyBanner.alt}
          className="w-full h-48 sm:h-64 md:h-80"
          imgClassName="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#011a12] via-[#011a12]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#E5C560] leading-tight">
            BIRD 2026–2035 Stakeholder Validation Survey
          </h1>
          <p className="text-sm text-[#ecfdf5]/70 mt-1 max-w-2xl">
            Your voice shapes the future of the Bangsamoro Autonomous Region
          </p>
        </div>
      </div>

      {/* Welcome Card */}
      <Card className="bg-[#011a12]/80 border-[#C9A84C]/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-[#E5C560]">
            Welcome to the Validation Process
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#ecfdf5]/80 leading-relaxed">
            The <strong className="text-[#C9A84C]">Bangsamoro Investment Roadmap Development (BIRD) 2026–2035</strong>{" "}
            is a living strategic framework built on <em>systems thinking</em> — the discipline of seeing
            wholes rather than parts, patterns of change rather than static snapshots.
          </p>
          <p className="text-sm text-[#ecfdf5]/80 leading-relaxed">
            This survey invites you to examine the <strong className="text-[#C9A84C]">interconnected ecosystem</strong>{" "}
            of governance, infrastructure, enterprise, connectivity, and finance that determines whether Bangsamoro thrives.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="p-3 rounded-xl bg-[#022c22]/60 border border-[#C9A84C]/10 hover:border-[#C9A84C]/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[#C9A84C]">{f.icon}</span>
                  <span className="text-xs font-bold text-[#ecfdf5]">{f.title}</span>
                </div>
                <p className="text-[11px] text-[#ecfdf5]/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-[#C9A84C]/5 border border-[#C9A84C]/10">
            <BookOpen className="w-4 h-4 text-[#C9A84C] shrink-0" />
            <p className="text-xs text-[#ecfdf5]/60">
              This survey has <strong className="text-[#ecfdf5]">16 sections</strong> (0–15). Most use 1–5 scales.
              All fields are optional except final consent. Estimated time: <strong className="text-[#ecfdf5]">20–30 minutes</strong>.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* BLOCK B — VIDEO + PRACTICE Q1                                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Card className="bg-[#011a12]/80 border-[#C9A84C]/10 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-[#C9A84C]" />
            <CardTitle className="text-sm font-bold text-[#E5C560]">
              Orientation: Systems Thinking in Action
            </CardTitle>
          </div>
          <p className="text-xs text-[#ecfdf5]/50 mt-1">
            {BIRD_VIDEOS.systemsThinking.description}
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative aspect-video bg-[#022c22]">
            <iframe
              src="https://www.youtube.com/embed/VBAHk0WYz_c?rel=0&modestbranding=1"
              title={BIRD_VIDEOS.systemsThinking.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Practice Q1 — NOT saved */}
          <div className="p-4 sm:p-6 space-y-3 border-t border-[#C9A84C]/10">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#C9A84C]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A84C]">
                Practice Question
              </span>
              <span className="text-[10px] text-[#ecfdf5]/30 ml-auto">(not saved)</span>
            </div>
            <LikertScale
              name="practice_q1_systems_thinking_value"
              label="After watching the video, how valuable do you find systems thinking as an approach to strategic planning?"
              value={practiceQ1}
              onChange={setPracticeQ1}
            />
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* BLOCK C — CLD IMAGE + PRACTICE Q2                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Card className="bg-[#011a12]/80 border-[#C9A84C]/10 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#C9A84C]" />
            <CardTitle className="text-sm font-bold text-[#E5C560]">
              Reference: Anatomy of a Causal Loop Diagram
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ImageWithFallback
            src={BIRD_IMAGES.anatomyCLD.url}
            alt={BIRD_IMAGES.anatomyCLD.alt}
            className="w-full h-56 sm:h-72"
            imgClassName="object-contain bg-[#022c22]"
          />
          <p className="px-4 pt-3 text-[11px] text-[#ecfdf5]/50 leading-relaxed">
            {BIRD_IMAGES.anatomyCLD.description}
          </p>

          {/* Practice Q2 — NOT saved */}
          <div className="p-4 sm:p-6 space-y-3 border-t border-[#C9A84C]/10">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#C9A84C]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A84C]">
                Practice Quiz
              </span>
              <span className="text-[10px] text-[#ecfdf5]/30 ml-auto">(not saved)</span>
            </div>
            <QuizCard
              question="In a Causal Loop Diagram, what does the 's' polarity indicate?"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Q2_OPTIONS.map((opt) => {
                  const selected = practiceQ2 === opt.key;
                  const showResult = practiceQ2 !== null;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setPracticeQ2(opt.key)}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-lg border text-left text-xs transition-all",
                        !showResult && selected
                          ? "bg-[#C9A84C]/10 border-[#C9A84C] text-[#C9A84C]"
                          : !showResult
                          ? "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                          : opt.correct
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : selected
                          ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                          : "bg-[#022c22]/20 border-white/5 text-[#ecfdf5]/30"
                      )}
                    >
                      <span className="font-bold text-sm w-5">{opt.key}</span>
                      <span>{opt.label}</span>
                      {showResult && opt.correct && (
                        <CheckCircle className="w-4 h-4 ml-auto text-emerald-400 shrink-0" />
                      )}
                      {showResult && selected && !opt.correct && (
                        <XCircle className="w-4 h-4 ml-auto text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
              {practiceQ2 !== null && (
                <p className="text-xs text-[#ecfdf5]/60 pt-1">
                  {Q2_OPTIONS.find((o) => o.key === practiceQ2)?.correct
                    ? "✅ Correct! 's' means Same direction — when A increases, B increases (or both decrease)."
                    : "❌ Not quite. 's' stands for Same direction. When variable A changes, variable B changes in the same direction."}
                </p>
              )}
            </QuizCard>
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* BLOCK D — FEEDBACK LOOPS + PRACTICE Q3 + Q4                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Card className="bg-[#011a12]/80 border-[#C9A84C]/10 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#C9A84C]" />
            <CardTitle className="text-sm font-bold text-[#E5C560]">
              Reference: Feedback Loops & Leverage Points
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ImageWithFallback
            src={BIRD_IMAGES.feedbackLoops.url}
            alt={BIRD_IMAGES.feedbackLoops.alt}
            className="w-full h-56 sm:h-72"
            imgClassName="object-contain bg-[#022c22]"
          />
          <p className="px-4 pt-3 text-[11px] text-[#ecfdf5]/50 leading-relaxed">
            {BIRD_IMAGES.feedbackLoops.description}
          </p>

          {/* Practice Q3 — NOT saved */}
          <div className="p-4 sm:p-6 space-y-4 border-t border-[#C9A84C]/10">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#C9A84C]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A84C]">
                Practice Quiz 1
              </span>
              <span className="text-[10px] text-[#ecfdf5]/30 ml-auto">(not saved)</span>
            </div>
            <QuizCard question="What characterizes a Reinforcing (R) feedback loop?">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Q3_OPTIONS.map((opt) => {
                  const selected = practiceQ3 === opt.key;
                  const showResult = practiceQ3 !== null;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setPracticeQ3(opt.key)}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-lg border text-left text-xs transition-all",
                        !showResult && selected
                          ? "bg-[#C9A84C]/10 border-[#C9A84C] text-[#C9A84C]"
                          : !showResult
                          ? "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                          : opt.correct
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : selected
                          ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                          : "bg-[#022c22]/20 border-white/5 text-[#ecfdf5]/30"
                      )}
                    >
                      <span className="font-bold text-sm w-5">{opt.key}</span>
                      <span>{opt.label}</span>
                      {showResult && opt.correct && (
                        <CheckCircle className="w-4 h-4 ml-auto text-emerald-400 shrink-0" />
                      )}
                      {showResult && selected && !opt.correct && (
                        <XCircle className="w-4 h-4 ml-auto text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
              {practiceQ3 !== null && (
                <p className="text-xs text-[#ecfdf5]/60 pt-1">
                  {Q3_OPTIONS.find((o) => o.key === practiceQ3)?.correct
                    ? "✅ Correct! Reinforcing loops amplify change — they are the engines of growth or decline in any system."
                    : "❌ Not quite. Reinforcing loops amplify change. Think of them as 'virtuous' or 'vicious' cycles that build on themselves."}
                </p>
              )}
            </QuizCard>

            {/* Practice Q4 — NOT saved */}
            <div className="flex items-center gap-2 pt-2">
              <Target className="w-4 h-4 text-[#C9A84C]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A84C]">
                Practice Quiz 2
              </span>
              <span className="text-[10px] text-[#ecfdf5]/30 ml-auto">(not saved)</span>
            </div>
            <QuizCard question="According to Donella Meadows' hierarchy, which is considered the most transformative leverage point?">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Q4_OPTIONS.map((opt) => {
                  const selected = practiceQ4 === opt.key;
                  const showResult = practiceQ4 !== null;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setPracticeQ4(opt.key)}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-lg border text-left text-xs transition-all",
                        !showResult && selected
                          ? "bg-[#C9A84C]/10 border-[#C9A84C] text-[#C9A84C]"
                          : !showResult
                          ? "bg-[#022c22]/40 border-white/10 text-[#ecfdf5]/70 hover:border-[#C9A84C]/30"
                          : opt.correct
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : selected
                          ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                          : "bg-[#022c22]/20 border-white/5 text-[#ecfdf5]/30"
                      )}
                    >
                      <span className="font-bold text-sm w-5">{opt.key}</span>
                      <span>{opt.label}</span>
                      {showResult && opt.correct && (
                        <CheckCircle className="w-4 h-4 ml-auto text-emerald-400 shrink-0" />
                      )}
                      {showResult && selected && !opt.correct && (
                        <XCircle className="w-4 h-4 ml-auto text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
              {practiceQ4 !== null && (
                <p className="text-xs text-[#ecfdf5]/60 pt-1">
                  {Q4_OPTIONS.find((o) => o.key === practiceQ4)?.correct
                    ? "✅ Correct! Changing the paradigm (the mindset out of which the system arises) is the most powerful leverage point — but also the hardest to achieve."
                    : "❌ Not quite. While changing parameters, rules, and information flows all matter, the most transformative leverage point is shifting the paradigm — the way we see and think about the system."}
                </p>
              )}
            </QuizCard>
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* BLOCK E — QUICK-START (The ONLY saved field)                       */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Card className={cn(
        "border-2 transition-colors",
        isReady
          ? "bg-emerald-950/20 border-emerald-500/30"
          : "bg-[#011a12]/80 border-[#C9A84C]/20"
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className={cn("w-5 h-5", isReady ? "text-emerald-400" : "text-[#C9A84C]")} />
            <CardTitle className="text-sm font-bold text-[#E5C560]">
              Quick-Start: Are You Ready?
            </CardTitle>
          </div>
          <p className="text-xs text-[#ecfdf5]/50">
            This is the only required response in Section 0. Your answer helps us understand stakeholder readiness.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            value={data.q0_1_ready || undefined}
            onValueChange={(v) => onChange({ q0_1_ready: v })}
          >
            <SelectTrigger className="w-full bg-[#022c22] border-[#C9A84C]/20 text-[#ecfdf5] focus:ring-[#C9A84C]/30">
              <SelectValue placeholder="Select your readiness level…" />
            </SelectTrigger>
            <SelectContent className="bg-[#022c22] border-[#C9A84C]/20">
              {READINESS_OPTIONS.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="text-[#ecfdf5] focus:bg-[#C9A84C]/10 focus:text-[#C9A84C]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#C9A84C]">{opt.icon}</span>
                    <span>{opt.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {isReady && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 animate-in fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="text-xs text-emerald-300/80">
                Great! You are ready to proceed. Click <strong>Next</strong> to move to Section 1: Privacy & Consent.
              </p>
            </div>
          )}

          {data.q0_1_ready === "need_info" && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-sky-500/10 border border-sky-500/20">
              <HelpCircle className="w-4 h-4 text-sky-400 shrink-0" />
              <p className="text-xs text-sky-300/80">
                Take your time reviewing the materials above. When ready, select "Yes, I feel ready to proceed."
              </p>
            </div>
          )}

          {data.q0_1_ready === "not_ready" && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <p className="text-xs text-rose-300/80">
                No problem. Your progress is saved locally. You can return anytime using the same device and browser.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Section Completion Indicator ── */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-[#022c22]/40 border border-[#C9A84C]/10">
        <span className="text-xs text-[#ecfdf5]/50">Section 0 completion</span>
        <span className={cn(
          "text-xs font-bold",
          data.q0_1_ready ? "text-emerald-400" : "text-[#C9A84C]"
        )}>
          {data.q0_1_ready ? "100%" : "0%"} (1/1 field)
        </span>
      </div>
    </div>
  );
};

export default Section0_Orientation;
