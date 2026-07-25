// src/components/strategic/Section0_Orientation.tsx
// BIRD 2026-2035 · Section 0: Welcome & Orientation
// Updated: 2026-07-23 — Aligned with survey-schema.ts types
// Note: survey-submit is called from SurveyWizard on final submission (Step 15), NOT here

import React from "react";
import { Sparkles, Play, ArrowRight, BookOpen, BarChart3, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { SurveySchemaType } from "@/lib/survey-schema";
import { BIRD_IMAGES, BIRD_VIDEOS } from "@/lib/bird-urls";

// ✅ TYPE SAFETY: Extract only Section 0 fields from master schema
export type Section0Data = Pick<
  SurveySchemaType,
  "q0_1_ready" | "q0_2_ecosystem_understanding" | "q0_3_systems_thinking_value"
>;

interface Section0Props {
  data: Section0Data;
  onChange: (data: Section0Data) => void;
}

const Section0_Orientation: React.FC<Section0Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section0Data>(
    field: K,
    value: Section0Data[K]
  ) => onChange({ ...data, [field]: value });

  return (
    <div className="space-y-8">
      {/* ── Section Header ─────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 0: Welcome & Orientation
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4 -mt-5">
        Your voice shapes the future of the Bangsamoro Autonomous Region
      </p>

      {/* ─ 1. Hero Banner Image ──────────────────────────────────── */}
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

      {/* ── 2. Welcome Card ───────────────────────────────────────── */}
      <GlassCard className="!p-8">
        <h3 className="text-lg font-bold text-[#022c22] mb-1">
          Welcome to the BIRD 2026–2035 Validation Survey
        </h3>
        <p className="text-sm text-[#065f46] mb-5">
          Your voice shapes the future of the Bangsamoro Autonomous Region
        </p>
        <div className="space-y-4 mb-6">
          <p className="text-sm text-[#022c22] leading-relaxed">
            The{" "}
            <strong>
              Bangsamoro Investment Roadmap Development (BIRD) 2026–2035
            </strong>{" "}
            is a living strategic framework built on systems thinking — the
            discipline of seeing wholes rather than parts, patterns of change
            rather than static snapshots.
          </p>
          <p className="text-sm text-[#022c22] leading-relaxed">
            This survey invites you to examine the{" "}
            <strong>interconnected ecosystem</strong> of governance,
            infrastructure, enterprise, connectivity, and finance that determines
            whether Bangsamoro thrives.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-lg border border-[#C9A84C]/20 bg-emerald-50/60 p-4 text-center">
            <BarChart3 className="w-6 h-6 text-[#1B4D3E] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#022c22] mb-1">
              Data-Driven
            </p>
            <p className="text-xs text-[#065f46] leading-relaxed">
              Every response feeds into real-time analytics shaping policy and
              investment priorities
            </p>
          </div>
          <div className="rounded-lg border border-[#C9A84C]/20 bg-emerald-50/60 p-4 text-center">
            <Users className="w-6 h-6 text-[#1B4D3E] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#022c22] mb-1">
              Inclusive
            </p>
            <p className="text-xs text-[#065f46] leading-relaxed">
              Designed for government, business, academe, civil society, and
              development partners
            </p>
          </div>
          <div className="rounded-lg border border-[#C9A84C]/20 bg-emerald-50/60 p-4 text-center">
            <BookOpen className="w-6 h-6 text-[#1B4D3E] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#022c22] mb-1">
              Systems-Based
            </p>
            <p className="text-xs text-[#065f46] leading-relaxed">
              Moving beyond checklists to understand feedback loops, archetypes,
              and leverage points
            </p>
          </div>
        </div>

        {/* Closing statement */}
        <p className="text-sm text-[#022c22] leading-relaxed mb-3">
          Your participation answers:{" "}
          <em>
            How do we turn fragmented efforts into a unified engine of inclusive
            growth?
          </em>
        </p>
        <p className="text-xs text-[#065f46] italic">
          The survey has 16 sections (0–15). Most use 1–5 scales. All fields optional except final consent. Takes ~20–30 minutes.
        </p>
      </GlassCard>

      {/* ── 3. Video Card ─────────────────────────────────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Systems Thinking: Moving from Checklists to Interconnected Investment Ecosystem
          </h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg aspect-video mb-4">
          <iframe
            src={BIRD_VIDEOS.systemsThinking.url.replace("youtu.be/", "youtube.com/embed/")}
            title={BIRD_VIDEOS.systemsThinking.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
            <Play className="w-3 h-3 mr-1" />
            {BIRD_VIDEOS.systemsThinking.duration}
          </span>
        </div>
        <p className="text-sm text-[#065f46] leading-relaxed">
          {BIRD_VIDEOS.systemsThinking.description}
        </p>
      </GlassCard>

      {/* ── 4. Quick-Start Questions ──────────────────────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-1">
          <ArrowRight className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Quick-Start Questions
          </h3>
        </div>
        <p className="text-xs text-[#065f46] mb-6 italic">
          Let&apos;s get started — a few quick questions to orient your thinking.
        </p>

        {/* Q0.1: Readiness */}
        <div className="mb-6 pb-6 border-b border-[#C9A84C]/20">
          <Label className="text-sm font-medium text-[#022c22] mb-3 block">
            How ready do you feel to contribute to shaping BARMM&apos;s investment future?
          </Label>
          <RadioGroup
            value={data.q0_1_ready}
            onValueChange={(val) => update("q0_1_ready", val)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {["Very ready", "Somewhat ready", "Curious but unsure", "Just exploring"].map((opt) => (
              <div key={opt}>
                <RadioGroupItem value={opt} id={`ready-${opt}`} className="peer sr-only" />
                <Label
                  htmlFor={`ready-${opt}`}
                  className={cn(
                    "flex items-center justify-center p-3 rounded-lg border text-sm text-left transition-all cursor-pointer h-full",
                    data.q0_1_ready === opt
                      ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                      : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                >
                  {opt}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Q0.2: Ecosystem Understanding */}
        <div className="mb-6 pb-6 border-b border-[#C9A84C]/20">
          <Label className="text-sm font-medium text-[#022c22] mb-3 block">
            How would you describe your understanding of an &quot;investment ecosystem&quot; versus traditional sector-based planning?
          </Label>
          <RadioGroup
            value={data.q0_2_ecosystem_understanding}
            onValueChange={(val) => update("q0_2_ecosystem_understanding", val)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {[
              "I clearly see the difference",
              "I somewhat understand",
              "I mainly know sector-based",
              "I'm not familiar with either",
            ].map((opt) => (
              <div key={opt}>
                <RadioGroupItem value={opt} id={`understand-${opt}`} className="peer sr-only" />
                <Label
                  htmlFor={`understand-${opt}`}
                  className={cn(
                    "flex items-center justify-center p-3 rounded-lg border text-sm text-left transition-all cursor-pointer h-full",
                    data.q0_2_ecosystem_understanding === opt
                      ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                      : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                >
                  {opt}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Q0.3: Systems Thinking Value */}
        <div>
          <Label className="text-sm font-medium text-[#022c22] mb-3 block">
            After watching the video, how valuable is systems thinking for BARMM investment planning?
            <span className="text-xs text-[#065f46] block mt-1 font-normal">(1 = not valuable, 5 = extremely valuable)</span>
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
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
                onClick={() => update("q0_3_systems_thinking_value", v)}
              >
                {v}
              </Button>
            ))}
          </div>
          <div className="flex justify-between mt-2 max-w-[272px]">
            <span className="text-xs text-[#065f46]">Not valuable</span>
            <span className="text-xs text-[#065f46]">Extremely valuable</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Section0_Orientation;
