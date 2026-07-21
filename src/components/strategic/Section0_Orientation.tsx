import React from "react";
import { Sparkles, Play, ArrowRight, BookOpen, BarChart3, Users, GitBranch, Target, Circle, TrendingUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

// ── GlassCard helper (survey context variant) ──────────────────────────────
const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      "rounded-xl border border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm p-6",
      className
    )}
  >
    {children}
  </div>
);

// ── Types ──────────────────────────────────────────────────────────────────
export interface Section0Data {
  ready_to_begin: string;
  ecosystem_understanding: string;
  systems_thinking_value: number;
}

interface Section0Props {
  data: Section0Data;
  onChange: (data: Section0Data) => void;
}

// ── Component ──────────────────────────────────────────────────────────────
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

      {/* ── 1. Hero Banner Image ──────────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Validation%20Survey%20Banner.png"
          alt="BIRD 2026-2035 Validation Survey Banner"
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
          The survey has 16 sections. Most use 1–5 scales. All fields optional. Takes ~20–30 minutes.
        </p>
      </GlassCard>

      {/* ── 3. Video Card ─────────────────────────────────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Systems Thinking: Moving from Checklists to Interconnected
            Investment Ecosystem
          </h3>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg aspect-video mb-4">
          <iframe
            src="https://www.youtube.com/embed/VBAHk0WYz_c"
            title="Systems Thinking: Moving from Checklists to Interconnected Investment Ecosystem"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
            <Play className="w-3 h-3 mr-1" />
            ~4 mins
          </span>
        </div>
        <p className="text-sm text-[#065f46] leading-relaxed">
          Discover how BIRD turns fragmented efforts into a unified engine of
          growth. Unpacks: Systems Thinking, Feedback Loops, Causal Loop
          Diagrams, and Leverage Strategies.
        </p>
      </GlassCard>

      {/* ── 4. Anatomy of Causal Loop Diagrams ───────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Understanding Causal Loop Diagrams (CLDs)
          </h3>
        </div>
        <p className="text-sm text-[#065f46] mb-4">
          A Causal Loop Diagram maps the interconnected elements that drive system behavior.
          Instead of linear cause-and-effect, CLDs reveal the <strong>circular relationships</strong> that
          create complex dynamics in BARMM's investment ecosystem.
        </p>
        
        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Anatomy%20of%20CLD.png"
            alt="Anatomy of Causal Loop Diagram"
            className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              Anatomy of a Causal Loop Diagram: Variables, Links, Polarity, and Feedback
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-lg border border-[#C9A84C]/20 bg-emerald-50/60 p-4">
            <h4 className="text-sm font-semibold text-[#022c22] mb-2">Key Components:</h4>
            <ul className="text-xs text-[#065f46] space-y-1">
              <li>• <strong>Variables:</strong> Factors that change over time (e.g., Governance Capacity, Investor Confidence)</li>
              <li>• <strong>Links:</strong> Arrows showing how one variable influences another</li>
              <li>• <strong>Polarity:</strong> Marked as <strong>(s)</strong> for same-direction or <strong>(o)</strong> for opposite-direction effects</li>
              <li>• <strong>Feedback Loops:</strong> Circular relationships that reinforce or balance system behavior</li>
            </ul>
          </div>
          <div className="rounded-lg border border-[#C9A84C]/20 bg-emerald-50/60 p-4">
            <h4 className="text-sm font-semibold text-[#022c22] mb-2">Why CLDs Matter:</h4>
            <p className="text-xs text-[#065f46] leading-relaxed">
              CLDs visually map the cause-and-effect relationships that drive dynamic change.
              They help us see why interventions sometimes fail, why problems persist despite
              good intentions, and where to find high-leverage intervention points.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* ─ 5. Feedback Loops & Leverage Points ──────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Feedback Loops & Leverage Points
          </h3>
        </div>
        <p className="text-sm text-[#065f46] mb-4">
          Systems don't just react — they <strong>feedback</strong>. Understanding these loops and where to
          intervene is the key to transforming BARMM's investment ecosystem.
        </p>

        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/6-Anatomy%20of%20Systems%20Traps.png"
            alt="Feedback Loops and Leverage Points"
            className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              Left: Feedback Loops (Reinforcing & Balancing) | Right: Meadows' Leverage Hierarchy
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-[#C9A84C]/20 bg-white p-4">
            <h4 className="text-sm font-semibold text-[#022c22] mb-2">Two Types of Feedback Loops:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-medium text-emerald-700 mb-1">Reinforcing Loop (R)</p>
                <p className="text-xs text-[#065f46]">
                  Growth accelerators — investment increases revenue, which enables more investment.
                  Can create virtuous cycles of growth or vicious cycles of decline.
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-amber-700 mb-1">Balancing Loop (B)</p>
                <p className="text-xs text-[#065f46]">
                  Stabilizing forces — as growth causes bottlenecks, constraints slow further growth.
                  Maintains equilibrium but can trap systems in low-performance states.
                </p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-[#065f46]">
                <strong>Polarity:</strong> Marked as <strong>'s' or '+'</strong> for same-direction effects (e.g., higher governance increases confidence) 
                and <strong>'o' or '-'</strong> for opposite-direction effects (e.g., more bottlenecks reduce private investment). 
                An even number of 'o' or '-' indicates a Balancing Loop.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-[#C9A84C]/20 bg-white p-4">
            <h4 className="text-sm font-semibold text-[#022c22] mb-2">Meadows' Leverage Hierarchy:</h4>
            <p className="text-xs text-[#065f46] mb-3">
              A <strong>leverage point</strong> is where a small shift can produce big changes. Donella Meadows
              ranked intervention points from least to most powerful:
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold flex-shrink-0">1-2</span>
                <div>
                  <p className="text-xs font-medium text-[#022c22]">Transformative (Highest Leverage)</p>
                  <p className="text-xs text-[#065f46]">Changing mindsets and paradigms — shifting from "power over" to "power with"</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex-shrink-0">5-6</span>
                <div>
                  <p className="text-xs font-medium text-[#022c22]">Systemic (Moderate Leverage)</p>
                  <p className="text-xs text-[#065f46]">Altering rules and information flows — transparency, milestones, feedback mechanisms</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex-shrink-0">10</span>
                <div>
                  <p className="text-xs font-medium text-[#022c22]">Incremental (Lowest Leverage)</p>
                  <p className="text-xs text-[#065f46]">Modifying physical structures — infrastructure, parameters, numbers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ── 6. Systems Archetypes ───────────────────────────── */}
      <GlassCard className="!p-6">
        <div className="flex items-center gap-2 mb-4">
          <Circle className="w-5 h-5 text-[#C9A84C]" />
          <h3 className="text-base font-semibold text-[#022c22]">
            Systems Archetypes: Common Storylines
          </h3>
        </div>
        <p className="text-sm text-[#065f46] mb-4">
          In systems thinking, archetypes are like common <strong>"storylines"</strong> that show how things go wrong 
          or get stuck in repeating patterns. They help us see why problems keep coming back even when we try to fix them.
        </p>

        <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group mb-4">
          <img
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/19.%20The%20Archetypes.png"
            alt="Systems Archetypes Overview"
            className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
            <p className="text-xs italic text-white/70">
              Common Systems Archetypes: Thinking Templates for Diagnosing Complex Problems
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-[#C9A84C]/20 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-[#C9A84C]/10">
                <tr>
                  <th className="text-left p-3 font-semibold text-[#022c22]">Archetype</th>
                  <th className="text-left p-3 font-semibold text-[#022c22]">What It Means</th>
                  <th className="text-left p-3 font-semibold text-[#022c22]">Everyday Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9A84C]/10">
                <tr className="hover:bg-emerald-50/30">
                  <td className="p-3 font-medium text-[#022c22]">Growth & Underinvestment</td>
                  <td className="p-3 text-[#065f46]">When something grows fast but we don't invest enough to support it, progress slows down.</td>
                  <td className="p-3 text-[#065f46]">A city expands quickly but doesn't build enough roads or schools, so everything becomes congested.</td>
                </tr>
                <tr className="hover:bg-emerald-50/30">
                  <td className="p-3 font-medium text-[#022c22]">Fixes that Fail</td>
                  <td className="p-3 text-[#065f46]">Quick fixes solve problems for now but make them worse later.</td>
                  <td className="p-3 text-[#065f46]">Using painkillers instead of treating the cause of back pain — relief now, bigger problem later.</td>
                </tr>
                <tr className="hover:bg-emerald-50/30">
                  <td className="p-3 font-medium text-[#022c22]">Success to the Successful</td>
                  <td className="p-3 text-[#065f46]">People or groups who are already doing well get more support, leaving others behind.</td>
                  <td className="p-3 text-[#065f46]">A popular school gets more funding, while smaller schools struggle even more.</td>
                </tr>
                <tr className="hover:bg-emerald-50/30">
                  <td className="p-3 font-medium text-[#022c22]">The Big Man</td>
                  <td className="p-3 text-[#065f46]">Power gets concentrated in one person or group, creating dependency and limiting innovation.</td>
                  <td className="p-3 text-[#065f46]">A company where only the CEO makes decisions — employees stop thinking creatively.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-amber-800 mb-1">Why This Matters for BARMM:</p>
              <p className="text-xs text-amber-900">
                These archetypes act as thinking templates that help us diagnose and improve systems — whether it's 
                an organization, a community, or even a disaster response network. By recognizing these patterns in 
                BARMM's investment ecosystem, we can design smarter interventions that create lasting change.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ── 7. Quick-Start Questions ─────────────────────────────── */}
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

        {/* Q0.1 */}
        <div className="mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22] mb-3">
            How ready do you feel to contribute to shaping BARMM&apos;s investment future?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Very ready",
              "Somewhat ready",
              "Curious but unsure",
              "Just exploring",
            ].map((opt) => (
              <button
                key={opt}
                onClick={() => update("ready_to_begin", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.ready_to_begin === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Q0.2 */}
        <div className="mb-6 pb-6 border-b border-[#C9A84C]/20">
          <p className="text-sm font-medium text-[#022c22] mb-3">
            How would you describe your understanding of an &quot;investment ecosystem&quot; versus traditional sector-based planning?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "I clearly see the difference",
              "I somewhat understand",
              "I mainly know sector-based",
              "I'm not familiar with either",
            ].map((opt) => (
              <button
                key={opt}
                onClick={() => update("ecosystem_understanding", opt)}
                className={cn(
                  "p-3 rounded-lg border text-sm text-left transition-all",
                  data.ecosystem_understanding === opt
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Q0.3 */}
        <div>
          <p className="text-sm font-medium text-[#022c22] mb-3">
            After watching the video and reviewing systems thinking concepts, how valuable is this approach for BARMM investment planning?
            <span className="text-xs text-[#065f46] block mt-1">(1 = not valuable, 5 = extremely valuable)</span>
          </p>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                onClick={() => update("systems_thinking_value", v)}
                className={cn(
                  "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
                  data.systems_thinking_value === v
                    ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                    : "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                )}
              >
                {v}
              </button>
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
