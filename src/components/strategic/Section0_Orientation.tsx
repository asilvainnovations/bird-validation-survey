import React from "react";
import { Sparkles, Play, ArrowRight, BookOpen, BarChart3, Users, GitBranch, Target, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

// ✅ IMPORT: Single source of truth for types and assets
import type { SurveySchemaType } from "@/lib/survey-schema";
import { BIRD_IMAGES, BIRD_VIDEOS } from "@/lib/bird-urls";

// ✅ IMPORT: Standard shadcn/ui components (NO GlassCard)
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// ✅ TYPE SAFETY: Extract only the fields this section manages
export type Section0Data = Pick<
  SurveySchemaType,
  "q0_1_ready" | "q0_2_ecosystem_understanding" | "q0_3_systems_thinking_value"
>;

interface Section0Props {
  data: Section0Data;
  onChange: (data: Section0Data) => void;
}

const Section0_Orientation: React.FC<Section0Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section0Data>(field: K, value: Section0Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  // BIRD Design System Color Classes
  const activeBtnClass = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 hover:text-white";
  const inactiveBtnClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-emerald-50/50";
  const activeScaleClass = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
  const inactiveScaleClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";

  return (
    <div className="space-y-8">
      {/* ── Section Header ─────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">Section 0: Welcome & Orientation</h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4 -mt-5">
        Your voice shapes the future of the Bangsamoro Autonomous Region
      </p>

      {/* ── 1. Hero Banner Image ──────────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.validationSurveyBanner.url}
          alt={BIRD_IMAGES.validationSurveyBanner.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="eager"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">{BIRD_IMAGES.validationSurveyBanner.title}</p>
        </div>
      </div>

      {/* ── 2. Welcome Card ───────────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-[#022c22]">Welcome to the BIRD 2026–2035 Validation Survey</CardTitle>
          <CardDescription className="text-sm text-[#065f46]">
            Your voice shapes the future of the Bangsamoro Autonomous Region
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-[#022c22] leading-relaxed">
            The <strong>Bangsamoro Investment Roadmap Development (BIRD) 2026–2035</strong> is a living strategic framework built on systems thinking — the discipline of seeing wholes rather than parts, and patterns of change rather than static snapshots.
          </p>
          <p className="text-sm text-[#022c22] leading-relaxed">
            This survey invites you to examine the <strong>interconnected ecosystem</strong> of governance, infrastructure, enterprise, connectivity, and finance that determines whether Bangsamoro thrives.
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-[#C9A84C]/20 bg-emerald-50/60 text-center p-4 shadow-none">
              <BarChart3 className="w-6 h-6 text-[#1B4D3E] mx-auto mb-2" />
              <h4 className="text-sm font-semibold text-[#022c22] mb-1">Data-Driven</h4>
              <p className="text-xs text-[#065f46] leading-relaxed">Every response feeds into real-time analytics shaping policy and investment priorities.</p>
            </Card>
            <Card className="border-[#C9A84C]/20 bg-emerald-50/60 text-center p-4 shadow-none">
              <Users className="w-6 h-6 text-[#1B4D3E] mx-auto mb-2" />
              <h4 className="text-sm font-semibold text-[#022c22] mb-1">Inclusive</h4>
              <p className="text-xs text-[#065f46] leading-relaxed">Designed for government, business, academe, civil society, and development partners.</p>
            </Card>
            <Card className="border-[#C9A84C]/20 bg-emerald-50/60 text-center p-4 shadow-none">
              <BookOpen className="w-6 h-6 text-[#1B4D3E] mx-auto mb-2" />
              <h4 className="text-sm font-semibold text-[#022c22] mb-1">Systems-Based</h4>
              <p className="text-xs text-[#065f46] leading-relaxed">Moving beyond checklists to understand feedback loops, archetypes, and leverage points.</p>
            </Card>
          </div>

          <p className="text-sm text-[#022c22] leading-relaxed">
            Your participation answers: <em>How do we turn fragmented efforts into a unified engine of inclusive growth?</em>
          </p>
          <p className="text-xs text-[#065f46] italic">
            The survey has 16 sections. Most use 1–5 scales. All fields optional except final consent. Takes ~20–30 minutes.
          </p>
        </CardContent>
      </Card>

      {/* ── 3. Video Card ─────────────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6">
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
        </CardContent>
      </Card>

      {/* ── 4. Anatomy of Causal Loop Diagrams ────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[#C9A84C]" />
            <h3 className="text-base font-semibold text-[#022c22]">Understanding Causal Loop Diagrams (CLDs)</h3>
          </div>
          <p className="text-sm text-[#065f46]">
            A Causal Loop Diagram maps the interconnected elements that drive system behavior. Instead of linear cause-and-effect, CLDs reveal the <strong>circular relationships</strong> that create complex dynamics in BARMM's investment ecosystem.
          </p>
          
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Anatomy%20of%20CLD.png"
              alt="Anatomy of Causal Loop Diagram"
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">Anatomy of a Causal Loop Diagram: Variables, Links, Polarity, and Feedback</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-[#C9A84C]/20 bg-emerald-50/60 p-4 shadow-none">
              <h4 className="text-sm font-semibold text-[#022c22] mb-2">Key Components:</h4>
              <ul className="text-xs text-[#065f46] space-y-1.5">
                <li>• <strong>Variables:</strong> Factors that change over time (e.g., Governance Capacity, Investor Confidence)</li>
                <li>• <strong>Links:</strong> Arrows showing how one variable influences another</li>
                <li>• <strong>Polarity:</strong> Marked as <strong>(s)</strong> for same-direction or <strong>(o)</strong> for opposite-direction effects</li>
                <li>• <strong>Feedback Loops:</strong> Circular relationships that reinforce or balance system behavior</li>
              </ul>
            </Card>
            <Card className="border-[#C9A84C]/20 bg-emerald-50/60 p-4 shadow-none">
              <h4 className="text-sm font-semibold text-[#022c22] mb-2">Why CLDs Matter:</h4>
              <p className="text-xs text-[#065f46] leading-relaxed">
                CLDs visually map the cause-and-effect relationships that drive dynamic change. They help us see why interventions sometimes fail, why problems persist despite good intentions, and where to find high-leverage intervention points.
              </p>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* ── 5. Feedback Loops & Leverage Points ───────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[#C9A84C]" />
            <h3 className="text-base font-semibold text-[#022c22]">Feedback Loops & Leverage Points</h3>
          </div>
          <p className="text-sm text-[#065f46]">
            Systems don't just react — they <strong>feedback</strong>. Understanding these loops and where to intervene is the key to transforming BARMM's investment ecosystem.
          </p>

          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.anatomySystemTraps.url}
              alt={BIRD_IMAGES.anatomySystemTraps.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">Left: Feedback Loops (Reinforcing & Balancing) | Right: Meadows' Leverage Hierarchy</p>
            </div>
          </div>

          <Card className="border-[#C9A84C]/20 bg-white p-4 shadow-none">
            <h4 className="text-sm font-semibold text-[#022c22] mb-2">Two Types of Feedback Loops:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs font-medium text-emerald-700 mb-1">Reinforcing Loop (R)</p>
                <p className="text-xs text-[#065f46]">Growth accelerators — investment increases revenue, which enables more investment. Can create virtuous cycles of growth or vicious cycles of decline.</p>
              </div>
              <div>
                <p className="text-xs font-medium text-amber-700 mb-1">Balancing Loop (B)</p>
                <p className="text-xs text-[#065f46]">Stabilizing forces — as growth causes bottlenecks, constraints slow further growth. Maintains equilibrium but can trap systems in low-performance states.</p>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs text-[#065f46]">
                <strong>Polarity:</strong> Marked as <strong>'s' or '+'</strong> for same-direction effects (e.g., higher governance increases confidence) and <strong>'o' or '-'</strong> for opposite-direction effects (e.g., more bottlenecks reduce private investment). An even number of 'o' or '-' indicates a Balancing Loop.
              </p>
            </div>
          </Card>

          <Card className="border-[#C9A84C]/20 bg-white p-4 shadow-none">
            <h4 className="text-sm font-semibold text-[#022c22] mb-2">Meadows' Leverage Hierarchy:</h4>
            <p className="text-xs text-[#065f46] mb-3">
              A <strong>leverage point</strong> is where a small shift can produce big changes. Donella Meadows ranked intervention points from least to most powerful:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold flex-shrink-0">1-2</span>
                <div>
                  <p className="text-xs font-medium text-[#022c22]">Transformative (Highest Leverage)</p>
                  <p className="text-xs text-[#065f46]">Changing mindsets and paradigms — shifting from "power over" to "power with".</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex-shrink-0">5-6</span>
                <div>
                  <p className="text-xs font-medium text-[#022c22]">Systemic (Moderate Leverage)</p>
                  <p className="text-xs text-[#065f46]">Altering rules and information flows — transparency, milestones, feedback mechanisms.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex-shrink-0">10</span>
                <div>
                  <p className="text-xs font-medium text-[#022c22]">Incremental (Lowest Leverage)</p>
                  <p className="text-xs text-[#065f46]">Modifying physical structures — infrastructure, parameters, numbers.</p>
                </div>
              </div>
            </div>
          </Card>
        </CardContent>
      </Card>

      {/* ── 6. Systems Archetypes ─────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-[#C9A84C]" />
            <h3 className="text-base font-semibold text-[#022c22]">Systems Archetypes: Common Storylines</h3>
          </div>
          <p className="text-sm text-[#065f46]">
            In systems thinking, archetypes are like common <strong>"storylines"</strong> that show how things go wrong or get stuck in repeating patterns. They help us see why problems keep coming back even when we try to fix them.
          </p>

          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/19.%20The%20Archetypes.png"
              alt="Systems Archetypes Overview"
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">Common Systems Archetypes: Thinking Templates for Diagnosing Complex Problems</p>
            </div>
          </div>

          <Card className="border-[#C9A84C]/20 bg-white overflow-hidden shadow-none">
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
                  <tr className="hover:bg-emerald-50/30 transition-colors">
                    <td className="p-3 font-medium text-[#022c22]">Growth & Underinvestment</td>
                    <td className="p-3 text-[#065f46]">When something grows fast but we don't invest enough to support it, progress slows down.</td>
                    <td className="p-3 text-[#065f46]">A city expands quickly but doesn't build enough roads or schools, so everything becomes congested.</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/30 transition-colors">
                    <td className="p-3 font-medium text-[#022c22]">Fixes that Fail</td>
                    <td className="p-3 text-[#065f46]">Quick fixes solve problems for now but make them worse later.</td>
                    <td className="p-3 text-[#065f46]">Using painkillers instead of treating the cause of back pain — relief now, bigger problem later.</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/30 transition-colors">
                    <td className="p-3 font-medium text-[#022c22]">Success to the Successful</td>
                    <td className="p-3 text-[#065f46]">People or groups who are already doing well get more support, leaving others behind.</td>
                    <td className="p-3 text-[#065f46]">A popular school gets more funding, while smaller schools struggle even more.</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/30 transition-colors">
                    <td className="p-3 font-medium text-[#022c22]">The Big Man</td>
                    <td className="p-3 text-[#065f46]">Power gets concentrated in one person or group, creating dependency and limiting innovation.</td>
                    <td className="p-3 text-[#065f46]">A company where only the CEO makes decisions — employees stop thinking creatively.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-800 mb-1">Why This Matters for BARMM:</p>
                <p className="text-xs text-amber-900 leading-relaxed">
                  These archetypes act as thinking templates that help us diagnose and improve systems — whether it's an organization, a community, or a disaster response network. By recognizing these patterns in BARMM's investment ecosystem, we can design smarter interventions that create lasting change.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 7. Quick-Start Questions ──────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <ArrowRight className="w-5 h-5 text-[#C9A84C]" /> Quick-Start Questions
          </CardTitle>
          <CardDescription className="text-xs italic text-[#065f46]">
            Let's get started — a few quick questions to orient your thinking.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Q0.1 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22]">
              How ready do you feel to contribute to shaping BARMM's investment future?
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
                      data.q0_1_ready === opt ? activeBtnClass : inactiveBtnClass
                    )}
                  >
                    {opt}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Q0.2 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22]">
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
                <div key={opt}>
                  <RadioGroupItem value={opt} id={`understand-${opt}`} className="peer sr-only" />
                  <Label
                    htmlFor={`understand-${opt}`}
                    className={cn(
                      "flex items-center justify-center p-3 rounded-lg border text-sm text-left transition-all cursor-pointer h-full",
                      data.q0_2_ecosystem_understanding === opt ? activeBtnClass : inactiveBtnClass
                    )}
                  >
                    {opt}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Q0.3 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22]">
              After watching the video and reviewing systems thinking concepts, how valuable is this approach for BARMM investment planning?
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
                    data.q0_3_systems_thinking_value === v ? activeScaleClass : inactiveScaleClass
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Section0_Orientation;