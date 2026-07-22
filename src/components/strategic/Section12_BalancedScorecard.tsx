import React from "react";
import { cn } from "@/lib/utils";
import {
  Scale,
  GraduationCap,
  Cog,
  Users,
  TrendingUp,
  Eye,
  Target,
  LayoutDashboard,
} from "lucide-react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

/* ──────────────────────── DATA INTERFACE ──────────────────────── */
export interface Section12Data {
  q12_1_learning_growth_alignment?: number;
  q12_2_internal_process_alignment?: number;
  q12_3_stakeholder_alignment?: number;
  q12_4_financial_alignment?: number;
  q12_5_strongest_pathway: string;
  q12_6_vision_clarity?: number;
  q12_7_vision_achievable?: number;
  q12_8_mission_alignment?: number;
  q12_9_bsc_useful?: number;
  q12_10_adaptive_frequency: string;
}

/* ──────────────────────── PROPS ──────────────────────── */
interface Section12Props {
  data: Section12Data;
  onChange: (data: Section12Data) => void;
}

/* ──────────────────────── MAIN COMPONENT ──────────────────────── */
const Section12_BalancedScorecard: React.FC<Section12Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section12Data>(field: K, value: Section12Data[K]) =>
    onChange({ ...data, [field]: value });

  const activeBtnClass = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90";
  const inactiveBtnClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";
  const activeScaleClass = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
  const inactiveScaleClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";

  return (
    <div className="space-y-8">
      {/* ═══════════ HEADER ═══════════ */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#022c22] flex items-center justify-center shrink-0">
          <Scale className="w-6 h-6 text-[#C9A84C]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#022c22]">
            Section 12: Balanced Scorecard — Investment Strategy Roadmap
          </h2>
          <p className="text-sm text-[#065f46] mt-1 max-w-3xl leading-relaxed">
            The Balanced Scorecard translates vision and strategy into actionable
            objectives across four interconnected perspectives. It creates a
            strategy map that visualizes how intangible assets are transformed
            into tangible outcomes — the ₱550B GRDP target, 20,000+ jobs, and
            poverty reduction below 20%.
          </p>
        </div>
      </div>

      {/* ═══════════ BLOCK 1: STRATEGY MAP IMAGE ═══════════ */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <Target className="w-5 h-5 text-[#C9A84C]" />
            Strategy Map: From Intangible Assets to Tangible Economic Outcomes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#065f46] leading-relaxed">
            The following strategy map illustrates how investments in Learning &amp;
            Growth capabilities cascade through Internal Processes to create
            Stakeholder value, ultimately achieving Financial objectives. Each
            arrow represents a causal linkage validated through the BSC framework.
          </p>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.bscStrategyMap.url}
              alt={BIRD_IMAGES.bscStrategyMap.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                Source: {BIRD_IMAGES.bscStrategyMap.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ═══════════ BLOCK 2: FOUR BSC PERSPECTIVES ═══════════ */}
      <div>
        <h3 className="text-base font-semibold text-[#022c22] mb-4 flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-[#C9A84C]" />
          Four BSC Perspectives — Rate Alignment
        </h3>
        <p className="text-sm text-[#065f46] mb-6 leading-relaxed">
          Each perspective contains strategic objectives that cascade upward
          through cause-and-effect relationships. Please rate how well each
          perspective&apos;s objectives align with BARMM&apos;s current strategic needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* L1: Learning & Growth */}
          <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-emerald-700" />
                </div>
                <CardTitle className="text-base text-emerald-700">
                  1. Learning & Growth
                </CardTitle>
              </div>
              <p className="text-sm text-[#065f46] italic">
                &ldquo;How will we sustain our ability to change and improve?&rdquo;
              </p>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#022c22] uppercase tracking-wide mb-2">
                  Key Objectives
                </p>
                <ul className="space-y-1.5">
                  {[
                    "L1: Build Halal Expertise (100+ certification officers)",
                    "L2: Develop Islamic Finance Professionals (50+)",
                    "L3: Strengthen IPA Capacity (80% staff certified)",
                    "L4: Foster Digital Innovation (20+ services)",
                    "L5: Improve Functional Literacy (75%+)",
                    "L6: Develop Green Economy Expertise (200+ LGU staff)",
                    "L7: Align TESDA with Industry (15 TRs)",
                  ].map((obj, idx) => (
                    <li key={idx} className="text-xs text-[#022c22] leading-relaxed">
                      <span className="text-[#C9A84C] font-semibold mr-1">&bull;</span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-[#C9A84C]/20 pt-4">
                <p className="text-xs text-[#065f46] mb-2">
                  Rate alignment with BARMM&apos;s needs (1 = Low, 5 = High)
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button
                      key={v}
                      type="button"
                      variant="outline"
                      size="icon"
                      className={cn(
                        "w-10 h-10 rounded-lg text-sm font-semibold",
                        data.q12_1_learning_growth_alignment === v
                          ? activeScaleClass
                          : inactiveScaleClass
                      )}
                      onClick={() => update("q12_1_learning_growth_alignment", v)}
                    >
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* L2: Internal Process */}
          <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Cog className="w-5 h-5 text-amber-700" />
                </div>
                <CardTitle className="text-base text-amber-700">
                  2. Internal Process
                </CardTitle>
              </div>
              <p className="text-sm text-[#065f46] italic">
                &ldquo;What processes must we excel at?&rdquo;
              </p>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#022c22] uppercase tracking-wide mb-2">
                  Key Objectives
                </p>
                <ul className="space-y-1.5">
                  {[
                    "P1: Streamline Investment Facilitation (1-day digital registration)",
                    "P2: Accelerate Permit Processing (7 days)",
                    "P3: Strengthen Halal Certification (Full OIC/SMIIC + MRA)",
                    "P4: Accelerate Infrastructure Delivery (&gt;90% budget execution)",
                    "P5: Synchronize BMOA Programs (8/10 coordination)",
                    "P6: Activate Green Economy Programs (100% JMC 2026-01)",
                    "P7: Ensure Climate Resilience (100% screening)",
                  ].map((obj, idx) => (
                    <li key={idx} className="text-xs text-[#022c22] leading-relaxed">
                      <span className="text-[#C9A84C] font-semibold mr-1">&bull;</span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-[#C9A84C]/20 pt-4">
                <p className="text-xs text-[#065f46] mb-2">
                  Rate alignment with BARMM&apos;s needs (1 = Low, 5 = High)
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button
                      key={v}
                      type="button"
                      variant="outline"
                      size="icon"
                      className={cn(
                        "w-10 h-10 rounded-lg text-sm font-semibold",
                        data.q12_2_internal_process_alignment === v
                          ? activeScaleClass
                          : inactiveScaleClass
                      )}
                      onClick={() => update("q12_2_internal_process_alignment", v)}
                    >
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* L3: Stakeholder */}
          <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-sky-700" />
                </div>
                <CardTitle className="text-base text-sky-700">
                  3. Stakeholder
                </CardTitle>
              </div>
              <p className="text-sm text-[#065f46] italic">
                &ldquo;How should we appear to investors and communities?&rdquo;
              </p>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#022c22] uppercase tracking-wide mb-2">
                  Key Objectives
                </p>
                <ul className="space-y-1.5">
                  {[
                    "S1: Enhance Investor Satisfaction (8.0+/10)",
                    "S2: Retain Investment Projects (85% retention)",
                    "S3: Empower MSMEs through Certification (5,000+)",
                    "S4: Reduce Poverty (&lt;20% incidence)",
                    "S5: Improve Community Access to Finance (70%+ inclusion)",
                    "S6: Create Quality Employment (20,000+ jobs)",
                    "S7: Ensure Provincial Equity (&lt;1.5 pp disparity)",
                  ].map((obj, idx) => (
                    <li key={idx} className="text-xs text-[#022c22] leading-relaxed">
                      <span className="text-[#C9A84C] font-semibold mr-1">&bull;</span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-[#C9A84C]/20 pt-4">
                <p className="text-xs text-[#065f46] mb-2">
                  Rate alignment with BARMM&apos;s needs (1 = Low, 5 = High)
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button
                      key={v}
                      type="button"
                      variant="outline"
                      size="icon"
                      className={cn(
                        "w-10 h-10 rounded-lg text-sm font-semibold",
                        data.q12_3_stakeholder_alignment === v
                          ? activeScaleClass
                          : inactiveScaleClass
                      )}
                      onClick={() => update("q12_3_stakeholder_alignment", v)}
                    >
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* L4: Financial */}
          <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <CardTitle className="text-base text-[#C9A84C]">
                  4. Financial
                </CardTitle>
              </div>
              <p className="text-sm text-[#065f46] italic">
                &ldquo;How should we appear to funders and investors?&rdquo;
              </p>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#022c22] uppercase tracking-wide mb-2">
                  Key Objectives
                </p>
                <ul className="space-y-1.5">
                  {[
                    "F1: Increase Investment Approvals (₱15B p.a.)",
                    "F2: Grow Regional Economy (₱550B+ GRDP)",
                    "F3: Expand Export Revenue (₱40B+)",
                    "F4: Activate Green Economy Revenue (₱500M+ p.a.)",
                    "F5: Mobilize Islamic Finance (₱20B+ assets)",
                    "F6: Attract Foreign Direct Investment (₱3B+ p.a.)",
                  ].map((obj, idx) => (
                    <li key={idx} className="text-xs text-[#022c22] leading-relaxed">
                      <span className="text-[#C9A84C] font-semibold mr-1">&bull;</span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-[#C9A84C]/20 pt-4">
                <p className="text-xs text-[#065f46] mb-2">
                  Rate alignment with BARMM&apos;s needs (1 = Low, 5 = High)
                </p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button
                      key={v}
                      type="button"
                      variant="outline"
                      size="icon"
                      className={cn(
                        "w-10 h-10 rounded-lg text-sm font-semibold",
                        data.q12_4_financial_alignment === v
                          ? activeScaleClass
                          : inactiveScaleClass
                      )}
                      onClick={() => update("q12_4_financial_alignment", v)}
                    >
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ══════════ BLOCK 3: STRATEGY MAP LOGIC VALIDATION ═══════════ */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <Target className="w-5 h-5 text-[#C9A84C]" />
            Strategy Map Logic Validation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-[#065f46] leading-relaxed">
            The Balanced Scorecard operates through five critical causal pathways
            that trace how investments in human capital and organizational
            capacity flow through processes to stakeholder outcomes and financial
            results. Each pathway represents a distinct economic development
            theory of change for BARMM.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pathway 1: Halal Economy */}
            <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <p className="text-sm font-semibold text-emerald-800">
                  Halal Economy Pathway
                </p>
              </div>
              <p className="text-xs text-[#022c22] font-mono bg-white/70 rounded px-2 py-1 mb-2">
                L1 → P3 → S3 → F3
              </p>
              <p className="text-xs text-[#065f46] leading-relaxed">
                Halal expertise building drives certification process excellence,
                enabling MSME empowerment and ultimately expanding halal export
                revenue to ₱40B+.
              </p>
            </div>
            {/* Pathway 2: Infrastructure-Enabled Growth */}
            <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <p className="text-sm font-semibold text-amber-800">
                  Infrastructure-Enabled Growth
                </p>
              </div>
              <p className="text-xs text-[#022c22] font-mono bg-white/70 rounded px-2 py-1 mb-2">
                L3 + L4 → P1 + P4 → S1 → F1 → F2
              </p>
              <p className="text-xs text-[#065f46] leading-relaxed">
                Capacity in digital innovation and green expertise streamlines
                investment facilitation and infrastructure delivery, improving
                investor satisfaction, increasing approvals, and growing GRDP.
              </p>
            </div>
            {/* Pathway 3: Green Economy */}
            <div className="p-4 rounded-lg border border-green-200 bg-green-50/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <p className="text-sm font-semibold text-green-800">
                  Green Economy Pathway
                </p>
              </div>
              <p className="text-xs text-[#022c22] font-mono bg-white/70 rounded px-2 py-1 mb-2">
                L6 → P6 + P7 → F4 → F2
              </p>
              <p className="text-xs text-[#065f46] leading-relaxed">
                Green economy expertise activates green programs and climate
                resilience screening, generating ₱500M+ in green revenue and
                contributing to overall GRDP growth.
              </p>
            </div>
            {/* Pathway 4: Inclusive Development */}
            <div className="p-4 rounded-lg border border-sky-200 bg-sky-50/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <p className="text-sm font-semibold text-sky-800">
                  Inclusive Development Pathway
                </p>
              </div>
              <p className="text-xs text-[#022c22] font-mono bg-white/70 rounded px-2 py-1 mb-2">
                L5 + L7 → S6 + S5 → S4 → F2
              </p>
              <p className="text-xs text-[#065f46] leading-relaxed">
                Functional literacy and TESDA-industry alignment create quality
                employment and financial inclusion, reducing poverty below 20%
                and expanding the productive economic base.
              </p>
            </div>
            {/* Pathway 5: Islamic Finance */}
            <div className="p-4 rounded-lg border border-[#C9A84C]/30 bg-[#C9A84C]/5 md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#C9A84C] text-white text-xs font-bold flex items-center justify-center">
                  5
                </span>
                <p className="text-sm font-semibold text-[#8B6914]">
                  Islamic Finance Pathway
                </p>
              </div>
              <p className="text-xs text-[#022c22] font-mono bg-white/70 rounded px-2 py-1 mb-2">
                L2 → P3 + S5 → F5 → F1
              </p>
              <p className="text-xs text-[#065f46] leading-relaxed">
                Islamic finance professionals strengthen halal certification
                processes and community financial access, mobilizing ₱20B+ in
                Islamic finance assets that attract further investment approvals
                and catalyze capital formation.
              </p>
            </div>
          </div>
          {/* Strongest Pathway Question */}
          <div className="border-t border-[#C9A84C]/20 pt-6">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              Which causal pathway is strongest in BARMM&apos;s current context?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Halal Economy",
                "Infrastructure-Enabled Growth",
                "Green Economy",
                "Inclusive Development",
                "Islamic Finance",
              ].map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
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

      {/* ═══════════ BLOCK 4: VISION 2035 ═══════════ */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <Eye className="w-5 h-5 text-[#C9A84C]" />
            Vision 2035
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-[#065f46] leading-relaxed">
            The Vision 2035 statement defines the long-term destination for
            BARMM&apos;s economic transformation. It integrates the core themes of the
            BIRD — halal innovation, green finance, moral governance, and
            inclusive prosperity — into a unifying aspirational narrative.
          </p>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.vision.url}
              alt={BIRD_IMAGES.vision.alt}
              className="w-full h-auto max-h-[400px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                {BIRD_IMAGES.vision.description}
              </p>
            </div>
          </div>
          {/* Vision Statement */}
          <div className="p-5 rounded-lg border-l-4 border-[#C9A84C] bg-[#C9A84C]/5">
            <p className="text-sm italic text-[#022c22] leading-relaxed">
              &ldquo;By 2035, BARMM shall be Southeast Asia&apos;s premier ethical and
              sustainable investment destination — a 550B economy powered by
              halal innovation, green finance, and moral governance, where every
              Bangsamoro participates in dignified prosperity.&rdquo;
            </p>
          </div>
          {/* Vision Questions */}
          <div className="space-y-6">
            {/* Vision Clarity */}
            <div>
              <Label className="text-sm font-medium text-[#022c22] mb-3 block">
                How clear is the Vision 2035 statement?
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#065f46]">Unclear</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button
                      key={v}
                      type="button"
                      variant="outline"
                      size="icon"
                      className={cn(
                        "w-12 h-12 rounded-lg text-sm font-semibold",
                        data.q12_6_vision_clarity === v
                          ? activeScaleClass
                          : inactiveScaleClass
                      )}
                      onClick={() => update("q12_6_vision_clarity", v)}
                    >
                      {v}
                    </Button>
                  ))}
                </div>
                <span className="text-xs text-[#065f46]">Very clear</span>
              </div>
            </div>
            {/* Vision Achievability */}
            <div>
              <Label className="text-sm font-medium text-[#022c22] mb-3 block">
                How achievable is this vision with IEDS implementation?
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#065f46]">Unrealistic</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <Button
                      key={v}
                      type="button"
                      variant="outline"
                      size="icon"
                      className={cn(
                        "w-12 h-12 rounded-lg text-sm font-semibold",
                        data.q12_7_vision_achievable === v
                          ? activeScaleClass
                          : inactiveScaleClass
                      )}
                      onClick={() => update("q12_7_vision_achievable", v)}
                    >
                      {v}
                    </Button>
                  ))}
                </div>
                <span className="text-xs text-[#065f46]">Fully achievable</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ═══════════ BLOCK 5: MISSION STATEMENT ═══════════ */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <Target className="w-5 h-5 text-[#C9A84C]" />
            Mission Statement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#065f46] leading-relaxed">
            The mission statement defines the fundamental purpose of the Bangsamoro
            Investment and Development Corporation (BIDC) and the broader
            investment ecosystem. It connects the operational mandate to the
            identity, aspirations, and values of the Bangsamoro people.
          </p>
          {/* Mission Statement */}
          <div className="p-5 rounded-lg border-l-4 border-[#1B4D3E] bg-[#1B4D3E]/5">
            <p className="text-sm italic text-[#022c22] leading-relaxed">
              &ldquo;To synchronize halal industry, green economy, infrastructure, and
              Islamic finance through moral governance — creating an inclusive
              investment ecosystem that honors Bangsamoro identity, uplifts all
              communities, and attracts global capital.&rdquo;
            </p>
          </div>
          {/* Mission Alignment Question */}
          <div>
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How well does this mission align with BARMM&apos;s identity and
              aspirations?
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#065f46]">Misaligned</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <Button
                    key={v}
                    type="button"
                    variant="outline"
                    size="icon"
                    className={cn(
                      "w-12 h-12 rounded-lg text-sm font-semibold",
                      data.q12_8_mission_alignment === v
                        ? activeScaleClass
                        : inactiveScaleClass
                    )}
                    onClick={() => update("q12_8_mission_alignment", v)}
                  >
                    {v}
                  </Button>
                ))}
              </div>
              <span className="text-xs text-[#065f46]">Fully aligned</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ═══════════ BLOCK 6: BSC AS STRATEGIC OPERATING SYSTEM ═══════════ */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <Scale className="w-5 h-5 text-[#C9A84C]" />
            BSC as Strategic Operating System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-[#065f46] leading-relaxed">
            The Balanced Scorecard serves as more than a planning tool — it is a
            strategic operating system that translates vision into measurable
            actions, monitors performance across four dimensions, and enables
            adaptive management. These final questions assess its practical
            utility for BARMM governance.
          </p>
          {/* BSC Usefulness */}
          <div className="border-b border-[#C9A84C]/20 pb-6">
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How useful is the Balanced Scorecard as a strategic operating system
              for BARMM?
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#065f46]">Not useful</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <Button
                    key={v}
                    type="button"
                    variant="outline"
                    size="icon"
                    className={cn(
                      "w-12 h-12 rounded-lg text-sm font-semibold",
                      data.q12_9_bsc_useful === v
                        ? activeScaleClass
                        : inactiveScaleClass
                    )}
                    onClick={() => update("q12_9_bsc_useful", v)}
                  >
                    {v}
                  </Button>
                ))}
              </div>
              <span className="text-xs text-[#065f46]">Essential</span>
            </div>
          </div>
          {/* Adaptive Frequency */}
          <div>
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              How often should the BSC be reviewed?
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Quarterly", "Semi-annually", "Annually", "Only at phase transitions"].map(
                (opt) => (
                  <Button
                    key={opt}
                    type="button"
                    variant="outline"
                    className={cn(
                      "justify-start h-auto py-3 text-sm text-left",
                      data.q12_10_adaptive_frequency === opt
                        ? activeBtnClass
                        : inactiveBtnClass
                    )}
                    onClick={() => update("q12_10_adaptive_frequency", opt)}
                  >
                    {opt}
                  </Button>
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Section12_BalancedScorecard;
