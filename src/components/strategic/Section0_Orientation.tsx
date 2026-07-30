import React from "react";
import {
  Sparkles,
  Play,
  ArrowRight,
  BookOpen,
  BarChart3,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { BIRD_IMAGES, BIRD_VIDEOS } from "@/lib/bird-urls";

// ── Types ────────────────────────────────────────────────────────────────────
// RESTRUCTURED (2026-07-30) per the sequencing spec: q0_2_ecosystem_understanding
// removed (not part of the specified 5-question flow); q0_4/q0_5/q0_6 changed
// from 1–5 self-rating scales to actual 4-option comprehension-check multiple
// choice — these were already fully written out as a disconnected "practice
// quiz" below (quizQuestions) whose answers were never saved to survey data.
// This wires that exact content into the real fields instead of duplicating it.
export interface Section0Data {
  q0_1_ready: string;
  q0_3_systems_thinking_value?: number;
  q0_4_cld_understanding?: string;
  q0_5_feedback_loops_understanding?: string;
  q0_6_leverage_points_understanding?: string;
}

interface Section0Props {
  data: Section0Data;
  onChange: (data: Section0Data) => void;
}

// ── Component ────────────────────────────────────────────────────────────────
export const Section0_Orientation: React.FC<Section0Props> = ({
  data,
  onChange,
}) => {
  const update = <K extends keyof Section0Data>(
    field: K,
    value: Section0Data[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  // Content for the three comprehension-check questions (Q2–Q4 in the spec).
  // Previously duplicated as a disconnected "practice quiz" further down this
  // file whose answers were never saved — now the single source for the real,
  // saved multiple-choice fields (q0_4/q0_5/q0_6).
  const cldPolarityOptions = [
    "Same-direction relationship (both variables move together)",
    "Opposite-direction relationship (variables move in opposite directions)",
    "Static relationship (no change over time)",
    "Secondary relationship (minor impact)",
  ];
  const reinforcingLoopOptions = [
    "A loop that stabilizes the system",
    "A loop that amplifies change in the same direction",
    "A loop that has no impact on the system",
    "A loop that only affects external factors",
  ];
  const leveragePointOptions = [
    "Changing parameters (numbers, subsidies)",
    "Adjusting feedback loops",
    "Transforming the paradigm or mindset",
    "Adding buffers or stocks",
  ];

  const activeBtnClass =
    "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90";
  const inactiveBtnClass =
    "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#ecfdf5]/30 dark:hover:bg-[#C9A84C]/10";


  return (
    <div className="space-y-8">
      {/* ── Section Header ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
          Section 0: Welcome & Orientation
        </h2>
      </div>
      <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 mb-4 -mt-5">
        Your voice shapes the future of the Bangsamoro Autonomous Region
      </p>

      {/* ── 1. Hero Banner Image ───────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.validationSurveyBanner.url}
          alt={BIRD_IMAGES.validationSurveyBanner.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="eager"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            BIRD 2026-2035 Stakeholder Validation Survey
          </p>
        </div>
      </div>

      {/* ── 2. Welcome Card ────────────────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-[#022c22] dark:text-[#ecfdf5]">
            Welcome to the BIRD 2026–2035 Validation Survey
          </CardTitle>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            Your voice shapes the future of the Bangsamoro Autonomous Region
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90 leading-relaxed">
            The{" "}
            <strong className="text-[#1B4D3E] dark:text-[#C9A84C]">
              Bangsamoro Investment Roadmap Development (BIRD) 2026–2035
            </strong>{" "}
            is a living strategic framework built on systems thinking — the
            discipline of seeing wholes rather than parts, patterns of change
            rather than static snapshots.
          </p>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90 leading-relaxed">
            This survey invites you to examine the{" "}
            <strong>interconnected ecosystem</strong> of governance,
            infrastructure, enterprise, connectivity, and finance that determines
            whether Bangsamoro thrives.
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="rounded-lg border border-[#C9A84C]/20 bg-emerald-50/60 dark:bg-[#1B4D3E]/20 p-4 text-center">
              <BarChart3 className="w-6 h-6 text-[#1B4D3E] dark:text-[#C9A84C] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5] mb-1">
                Data-Driven
              </p>
              <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
                Every response feeds into real-time analytics shaping policy and
                investment priorities
              </p>
            </div>
            <div className="rounded-lg border border-[#C9A84C]/20 bg-emerald-50/60 dark:bg-[#1B4D3E]/20 p-4 text-center">
              <Users className="w-6 h-6 text-[#1B4D3E] dark:text-[#C9A84C] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5] mb-1">
                Inclusive
              </p>
              <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
                Designed for government, business, academe, civil society, and
                development partners
              </p>
            </div>
            <div className="rounded-lg border border-[#C9A84C]/20 bg-emerald-50/60 dark:bg-[#1B4D3E]/20 p-4 text-center">
              <BookOpen className="w-6 h-6 text-[#1B4D3E] dark:text-[#C9A84C] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5] mb-1">
                Systems-Based
              </p>
              <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
                Moving beyond checklists to understand feedback loops,
                archetypes, and leverage points
              </p>
            </div>
          </div>

          {/* Closing statement */}
          <div className="pt-2">
            <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90 leading-relaxed mb-3">
              Your participation answers:{" "}
              <em className="text-[#1B4D3E] dark:text-[#C9A84C]">
                How do we turn fragmented efforts into a unified engine of
                inclusive growth?
              </em>
            </p>
            <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic">
              The survey has 16 sections (0–15). Most use 1–5 scales. All fields
              optional except final consent. Takes ~20–30 minutes.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ── 3. Video + Q1 (merged: question lives with its media) ───────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <Play className="w-5 h-5 text-[#C9A84C]" />
            Systems Thinking: Moving from Checklists to Interconnected
            Investment Ecosystem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg aspect-video">
            <iframe
              src={BIRD_VIDEOS.systemsThinking.url.replace(
                "youtu.be/",
                "youtube.com/embed/"
              )}
              title={BIRD_VIDEOS.systemsThinking.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300"
            >
              <Play className="w-3 h-3 mr-1" />
              {BIRD_VIDEOS.systemsThinking.duration}
            </Badge>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            {BIRD_VIDEOS.systemsThinking.description}
          </p>

          {/* Q1 — same card as the video it's about, not a separate box below it */}
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              After watching the video, how valuable is systems thinking for
              BARMM investment planning?
              <span className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 block mt-1 font-normal">
                (1 = not valuable, 5 = extremely valuable)
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
                    data.q0_3_systems_thinking_value === v
                      ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                      : "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                  onClick={() => update("q0_3_systems_thinking_value", v)}
                >
                  {v}
                </Button>
              ))}
            </div>
            <div className="flex justify-between mt-2 max-w-[272px]">
              <span className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">Not valuable</span>
              <span className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">Extremely valuable</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 4. Anatomy of a Causal Loop Diagram + Q2 (merged) ────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#C9A84C]" />
            Anatomy of a Causal Loop Diagram (CLD)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg">
            <img
              src={BIRD_IMAGES.anatomyCLD.url}
              alt={BIRD_IMAGES.anatomyCLD.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            A Causal Loop Diagram has interconnected elements: <strong>Variables</strong> —
            factors that change over time, such as Governance Capacity and Investor
            Confidence; <strong>Links</strong> — arrows showing how one variable directly
            influences another; and <strong>Polarity</strong> — marked as{" "}
            <strong>&apos;s&apos;</strong> for same-direction effects (e.g., higher governance
            increases confidence) and <strong>&apos;o&apos;</strong> for opposite-direction
            effects (e.g., more bottlenecks reduce private investment). The circular
            layout illustrates how these relationships form feedback loops that either
            reinforce or balance system behavior.
          </p>

          {/* Q2 — same card as the image it's testing comprehension of */}
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              In a Causal Loop Diagram, what does the &apos;s&apos; polarity marker indicate?
            </Label>
            <div className="grid grid-cols-1 gap-3">
              {cldPolarityOptions.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q0_4_cld_understanding === opt ? activeBtnClass : inactiveBtnClass
                  )}
                  onClick={() => update("q0_4_cld_understanding", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 5. Feedback Loops and Leverage Points + Q3 + Q4 (merged) ─────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#C9A84C]" />
            Feedback Loops and Leverage Points
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg">
            <img
              src={BIRD_IMAGES.feedbackLoops.url}
              alt={BIRD_IMAGES.feedbackLoops.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            On the left, feedback loops: a <strong>Reinforcing Loop (R)</strong> connecting
            Private Investment and Government Revenue shows how growth can accelerate —
            investment increases revenue, which enables more investment. A{" "}
            <strong>Balancing Loop (B)</strong> linking Infrastructure Bottlenecks and Private
            Investment represents stabilizing forces — as growth causes bottlenecks, these
            constraints slow further growth. On the right, Meadows&apos; Leverage Hierarchy,
            shaped like a pyramid: <strong>Transformative (L1–L2)</strong> — changing
            mindsets and paradigms; <strong>Systemic (L5–L6)</strong> — altering rules and
            information flows; <strong>Incremental (L10)</strong> — modifying stock-flow
            structures like physical infrastructure.
          </p>

          {/* Q3 — both questions below test comprehension of this one image */}
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              What is a Reinforcing Loop (R) in systems thinking?
            </Label>
            <div className="grid grid-cols-1 gap-3">
              {reinforcingLoopOptions.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q0_5_feedback_loops_understanding === opt ? activeBtnClass : inactiveBtnClass
                  )}
                  onClick={() => update("q0_5_feedback_loops_understanding", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {/* Q4 — same image, second question */}
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              Which leverage point is considered MOST transformative according to
              Meadows&apos; hierarchy?
            </Label>
            <div className="grid grid-cols-1 gap-3">
              {leveragePointOptions.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q0_6_leverage_points_understanding === opt ? activeBtnClass : inactiveBtnClass
                  )}
                  onClick={() => update("q0_6_leverage_points_understanding", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 6. Q5: Readiness (closing question, no associated image) ─────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-[#C9A84C]" />
            One Last Thing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
            How ready do you feel to contribute to shaping BARMM&apos;s
            investment future?
          </Label>
          <RadioGroup
            value={data.q0_1_ready}
            onValueChange={(val) => update("q0_1_ready", val)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {[
              "Very ready",
              "Somewhat ready",
              "Curious but unsure",
              "Just exploring",
            ].map((opt) => (
              <div key={opt} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={opt}
                  id={`ready-${opt}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`ready-${opt}`}
                  className={cn(
                    "flex items-center justify-center p-3 rounded-lg border text-sm text-left transition-all cursor-pointer w-full",
                    data.q0_1_ready === opt ? activeBtnClass : inactiveBtnClass
                  )}
                >
                  {opt}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default Section0_Orientation;
