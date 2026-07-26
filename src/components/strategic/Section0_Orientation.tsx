// src/components/strategic/Section0_Orientation.tsx
// BIRD 2026–2035 · Section 0: Welcome & Orientation
// Updated: 2026-07-27 — Aligned with survey-schema.ts, bird-urls.ts, and SurveyWizard.tsx

import React from "react";
import { Sparkles, Play, ArrowRight, BookOpen, BarChart3, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { BIRD_IMAGES, BIRD_VIDEOS } from "@/lib/bird-urls";

// ✅ Explicit Type Definition strictly aligned with survey-schema.ts
export interface Section0Data {
  q0_1_ready: string;
  q0_2_ecosystem_understanding: string;
  q0_3_systems_thinking_value?: number;
  q0_4_cld_understanding?: number;
  q0_5_feedback_loops_understanding?: number;
  q0_6_leverage_points_understanding?: number;
}

interface Section0Props {
  data: Section0Data;
  onChange: (data: Section0Data) => void;
}

const Section0_Orientation: React.FC<Section0Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section0Data>(field: K, value: Section0Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  // Defensive trimming to handle any trailing spaces in the URL constants
  const videoEmbedUrl = BIRD_VIDEOS.systemsThinking.url.trim().replace("youtu.be/", "youtube.com/embed/");
  const bannerUrl = BIRD_IMAGES.validationSurveyBanner.url.trim();
  const cldUrl = BIRD_IMAGES.anatomyCLD.url.trim();
  const feedbackLoopsUrl = BIRD_IMAGES.feedbackLoops.url.trim();

  return (
    <div className="space-y-8">
      {/* ── Section Header ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 0: Welcome & Orientation
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4 -mt-5">
        Your voice shapes the future of the Bangsamoro Autonomous Region
      </p>

      {/* ── 1. Hero Banner Image ───────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={bannerUrl}
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
      <Card className="border-[#C9A84C]/20 bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-[#022c22]">
            Welcome to the BIRD  is a living strategic framework built on systems thinking — the discipline of seeing wholes rather than parts, patterns of change rather than static snapshots.
          </p>
          <p className="text-sm text-[#022c22] leading-relaxed">
            This survey invites you to examine the <strong>interconnected ecosystem</strong> of governance, infrastructure, enterprise, connectivity, and finance that determines whether Bangsamoro thrives.
          </p>
          
          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="rounded-lg border border-[#C9A84C]/20 bg-emerald-50/60 p-4 text-center">
              <BarChart3 className="w-6 h-6 text-[#1B4D3E] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#022c22] mb-1">Data-Driven</p>
              <p className="text-xs text-[#065f46] leading-relaxed">
                Every response feeds into real-time analytics shaping policy and investment priorities
              </p>
            </div>
            <div className="rounded-lg border border-[#C9A84C]/20 bg-emerald-50/60 p-4 text-center">
              <Users className="w-6 h-6 text-[#1B4D3E] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#022c22] mb-1">Inclusive</p>
              <p className="text-xs text-[#065f46] leading-relaxed">
                Designed for government, business, academe, civil society, and development partners
              </p>
            </div>
            <div className="rounded-lg border border-[#C9A84C]/20 bg-emerald-50/60 p-4 text-center">
              <BookOpen className="w-6 h-6 text-[#1B4D3E] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#022c22] mb-1">Systems-Based</p>
              <p className="text-xs text-[#065f46] leading-relaxed">
                Moving beyond checklists to understand feedback loops, archetypes, and leverage points
              </p>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-sm text-[#022c22] leading-relaxed mb-3">
              Your participation answers: <em>How do we turn fragmented efforts into a unified engine of inclusive growth?</em>
            </p>
            <p className="text-xs text-[#065f46] italic">
              The survey has 16 sections (0–15). Most use 1–5 scales. All fields optional except final consent. Takes ~20–30 minutes.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ── 3. Video Card & Validation Question ────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] flex items-center gap-2">
            <Play className="w-5 h-5 text-[#C9A84C]" />
            {BIRD_VIDEOS.systemsThinking.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg aspect-video">
            <iframe
              src={videoEmbedUrl}
              title={BIRD_VIDEOS.systemsThinking.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
              <Play className="w-3 h-3 mr-1" />
              {BIRD_VIDEOS.systemsThinking.duration}
            </Badge>
          </div>
          <p className="text-sm text-[#065f46] leading-relaxed">
            {BIRD_VIDEOS.systemsThinking.description} From governance hurdles to resource equity, see how Bangsamoro can move beyond quick fixes toward lasting systemic solutions.
          </p>
          
          {/* Validation Question: Systems Thinking Value */}
          <div className="pt-4 border-t border-[#C9A84C]/20 mt-4">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              After watching the video, how valuable do you believe systems thinking is for BARMM investment planning?
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
          </div>
        </CardContent>
      </Card>

      {/* ── 4. Anatomy of Causal Loop Diagram & Validation Question ────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#C9A84C]" />
            {BIRD_IMAGES.anatomyCLD.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg">
            <img
              src={cldUrl}
              alt={BIRD_IMAGES.anatomyCLD.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46] leading-relaxed">
            A Causal Loop Diagram (CLD) has interconnected elements. <strong>Variables</strong> — factors that change over time, such as Governance Capacity and Investor Confidence. <strong>Links</strong> — arrows showing how one variable directly influences another. <strong>Polarity</strong> — marked as ‘s’ for same-direction effects (e.g., higher governance increases confidence) and ‘o’ for opposite-direction effects (e.g., more bottlenecks reduce private investment). The circular layout illustrates how these relationships form feedback loops that either reinforce or balance system behavior. In short, a CLD visually maps cause-and-effect relationships that drive dynamic change within a system.
          </p>

          {/* Validation Question: CLD Understanding */}
          <div className="pt-4 border-t border-[#C9A84C]/20 mt-4">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              Based on the diagram and description, how well do you understand the elements of a Causal Loop Diagram?
              <span className="text-xs text-[#065f46] block mt-1 font-normal">(1 = not at all, 5 = completely)</span>
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
                    data.q0_4_cld_understanding === v
                      ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                      : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                  onClick={() => update("q0_4_cld_understanding", v)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 5. Feedback Loops & Leverage Points & Validation Questions ─── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#C9A84C]" />
            {BIRD_IMAGES.feedbackLoops.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg">
            <img
              src={feedbackLoopsUrl}
              alt={BIRD_IMAGES.feedbackLoops.alt}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46] leading-relaxed">
            This visual explains how feedback loops and leverage points operate within systems thinking.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-[#022c22] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C9A84C]"></span>
                Feedback Loops
              </h4>
              <ul className="text-sm text-[#065f46] space-y-2 list-disc list-inside marker:text-[#C9A84C]">
                <li><strong>Reinforcing Loop (R):</strong> A circular diagram connecting Private Investment and Government Revenue. It illustrates how growth can accelerate — investment increases revenue, which enables more investment.</li>
                <li><strong>Balancing Loop (B):</strong> A second circular diagram linking Infrastructure Bottlenecks and Private Investments. It represents stabilizing forces — as growth causes bottlenecks, these constraints slow further growth.</li>
                <li><strong>Polarity:</strong> Marked as ‘s’ or ‘+’ for same-direction effects and ‘o’ or ‘-‘ for opposite-direction effects. An even number of 'o' or '-' indicates a Balancing Loop.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-[#022c22] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1B4D3E]"></span>
                Meadows’ Leverage Hierarchy
              </h4>
              <ul className="text-sm text-[#065f46] space-y-2 list-disc list-inside marker:text-[#1B4D3E]">
                <li><strong>Transformative (L1–L2):</strong> Highest leverage — changing mindsets and paradigms (e.g., shifting from “power over” to “power with”).</li>
                <li><strong>Systemic (L5–L6):</strong> Mid-level leverage — altering rules and information flows (e.g., transparency, milestones).</li>
                <li><strong>Incremental (L10):</strong> Lowest leverage — modifying stock-flow structures like physical infrastructure.</li>
              </ul>
            </div>
          </div>

          {/* Validation Questions: Feedback Loops & Leverage Points */}
          <div className="pt-4 border-t border-[#C9A84C]/20 mt-4 space-y-6">
            <div>
              <Label className="text-sm font-medium text-[#022c22] mb-3 block">
                How clearly do you understand the concept of Reinforcing and Balancing feedback loops?
                <span className="text-xs text-[#065f46] block mt-1 font-normal">(1 = not clear, 5 = very clear)</span>
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
                      data.q0_5_feedback_loops_understanding === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                    onClick={() => update("q0_5_feedback_loops_understanding", v)}
                  >
                    {v}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-[#022c22] mb-3 block">
                How valuable do you think applying Meadows' Leverage Hierarchy will be for BIRD planning?
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
                      data.q0_6_leverage_points_understanding === v
                        ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                        : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                    )}
                    onClick={() => update("q0_6_leverage_points_understanding", v)}
                  >
                    {v}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 6. Quick-Start Questions ───────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-[#C9A84C]" />
            Quick-Start Questions
          </CardTitle>
          <p className="text-xs text-[#065f46] italic pt-1">
            Let's get started — a few quick questions to orient your thinking.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Q0.1: Readiness */}
          <div className="pb-6 border-b border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How ready do you feel to contribute to shaping BARMM's investment future?
            </Label>
            <RadioGroup
              value={data.q0_1_ready}
              onValueChange={(val) => update("q0_1_ready", val)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {["Very ready", "Somewhat ready", "Curious but unsure", "Just exploring"].map((opt) => (
                <div key={opt} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt} id={`ready-${opt}`} className="peer sr-only" />
                  <Label
                    htmlFor={`ready-${opt}`}
                    className={cn(
                      "flex items-center justify-center p-3 rounded-lg border text-sm text-left transition-all cursor-pointer w-full",
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
          <div>
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How would you describe your understanding of an "investment ecosystem" versus traditional sector-based planning?
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
                <div key={opt} className="flex items-center space-x-2">
                  <RadioGroupItem value={opt} id={`understand-${opt}`} className="peer sr-only" />
                  <Label
                    htmlFor={`understand-${opt}`}
                    className={cn(
                      "flex items-center justify-center p-3 rounded-lg border text-sm text-left transition-all cursor-pointer w-full",
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Section0_Orientation;
