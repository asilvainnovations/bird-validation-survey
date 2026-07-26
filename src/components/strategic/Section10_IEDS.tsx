import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Rocket, CheckCircle2, TrendingUp } from "lucide-react";

// ── Data Interface (exact runtime contract with SurveyWizard.tsx s10 state) ──
export interface Section10Data {
  q10_1_ieds_preference: string;
  q10_2_sequence_a_priority?: number;
  q10_3_sequence_b_priority?: number;
  q10_4_sequence_c_priority?: number;
  q10_5_sequencing_logic: string;
  q10_6_risk_mitigation: string;
  q10_7_outcomes_achievable?: number;
  q10_matrix: {
    heds: Record<string, number>;
    gems: Record<string, number>;
    ifes: Record<string, number>;
    ieds: Record<string, number>;
  };
  // Optional educational scale questions (wizard may omit — safe for forward compatibility)
  q10_leverage_points_clarity?: number;
  q10_activating_leverage?: number;
  q10_capacity_traps?: number;
  q10_iceberg_model?: number;
  q10_collaborative_governance?: number;
  q10_strategic_ranking?: string;
}

interface Section10Props {
  data: Section10Data;
  onChange: (data: Section10Data) => void;
}

// ── Component ────────────────────────────────────────────────────────────────
const Section10_IEDS: React.FC<Section10Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section10Data>(
    field: K,
    value: Section10Data[K]
  ) => onChange({ ...data, [field]: value });

  const activeBtnClass =
    "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 dark:bg-[#1B4D3E] dark:text-white dark:border-[#1B4D3E]";
  const inactiveBtnClass =
    "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#ecfdf5]/30 dark:hover:bg-[#C9A84C]/10";
  const activeScaleClass =
    "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
  const inactiveScaleClass =
    "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]";

  const renderScale = (field: keyof Section10Data) => (
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
          onClick={() => update(field, v as any)}
        >
          {v}
        </Button>
      ))}
    </div>
  );

  const strategicOptions = [
    { code: "HEDS", name: "Halal Economy Dominance Strategy", score: "7.61/10", grdp: "₱150–200B" },
    { code: "GEMS", name: "Green Economy Monetization Strategy", score: "7.16/10", grdp: "₱80–120B" },
    { code: "IFES", name: "Infrastructure-First Enabling Strategy", score: "7.48/10", grdp: "₱200–280B" },
    { code: "IEDS", name: "Integrated Ecosystem Development Strategy", score: "8.93/10", grdp: "₱550B+", highlight: true },
  ];

  return (
    <div className="space-y-8">
      {/* ═══════════════════════════════════════════ HEADER */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#022c22] dark:bg-[#011a12] flex items-center justify-center shadow-md">
          <Rocket className="w-5 h-5 text-[#C9A84C]" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
            Section 10: Integrated Ecosystem Development Strategy (IEDS)
          </h2>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 mt-1 max-w-3xl">
            The IEDS sequences three strategic options into a coherent, time-bound execution plan
            to achieve the full ₱550B GRDP target by 2035.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ VIDEO: STRATEGIC OPTIONS */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Strategic Options & Path to Growth
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg aspect-video">
            <iframe
              src="https://www.youtube.com/embed/kb_snh8mo1k"
              title="Strategic Options & Path to Growth"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            Discover the strategic choices shaping Bangsamoro's Investment Roadmap 2026–2035.
            This video shows how well-crafted strategies and priorities can fuel inclusive growth,
            sustainability, and regional competitiveness in BARMM.
          </p>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════ LEVERAGE POINTS: HOW TO IDENTIFY */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            How to Identify Leverage Points
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/How%20to%20Identify%20Leverage%20Points.png"
              alt="How to Identify Leverage Points"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            Three-step process using Donella Meadows' Hierarchy of System Change (L1–L12):
            <br />
            <strong>1. Diagnostic Synthesis</strong> – identifying recurring patterns and limiting factors.
            <br />
            <strong>2. Mapping the Loops</strong> – visualizing reinforcing (R) and balancing (B) feedback loops.
            <br />
            <strong>3. Tiered Selection</strong> – categorizing interventions as Transformative (L1–L3),
            Systemic (L4–L6), or Incremental (L10–L12).
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              How clear is this methodology for identifying leverage points? (1-5)
            </Label>
            {renderScale("q10_leverage_points_clarity")}
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════ ACTIVATING LEVERAGE POINTS */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Activating Strategic Leverage Points
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/Activating%20Leverage%20Points.png"
              alt="Activating Leverage Points"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            Three tiers of interventions to dismantle structural constraints:
            <br />
            <strong>L3 (Goals & Operating System):</strong> Link political legitimacy to investment climate.
            <br />
            <strong>L5 (Rules & Incentives):</strong> Align investment incentives with institutional capacity.
            <br />
            <strong>L6 (Information Flows):</strong> Deploy digital traceability for halal supply chains.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              How effective will these leverage points be in accelerating BARMM's growth? (1-5)
            </Label>
            {renderScale("q10_activating_leverage")}
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════ LEVERAGE POINTS IN CAPACITY TRAPS */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Leverage Points for Capacity Traps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Leverage%20Points%20for%20Capacity%20Traps.png"
              alt="Leverage Points for Capacity Traps"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            <strong>Prescription: Front-Loading the Ecosystem Enablers</strong> — Leverage Point L10
            (Stock-Flow Structure) expands system capacity ahead of market demand to break the
            Limits to Growth and Growth and Underinvestment archetypes.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              How critical is front-loading enablers before scaling production? (1-5)
            </Label>
            {renderScale("q10_capacity_traps")}
          </div>
        </CardContent>
      </Card>

      {/* ══════════════════════════════════════════ ICEBERG MODEL */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            The Iceberg Model: Systems Thinking Paradigm
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Iceberg%20Model%20Paradigm.png"
              alt="Iceberg Model Paradigm"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            Three layers of the system:
            <br />
            <strong>Events (Top 10%):</strong> Visible outcomes like investment approvals.
            <br />
            <strong>Structures (Body 40%):</strong> Systemic traps like fragmented plans.
            <br />
            <strong>Mental Models (Base 50%):</strong> Deep-rooted beliefs shaping policy behavior.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              How important is addressing mental models and structures vs. just events? (1-5)
            </Label>
            {renderScale("q10_iceberg_model")}
          </div>
        </CardContent>
      </Card>

      {/* ══════════════════════════════════════════ COLLABORATIVE GOVERNANCE */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Architecting Collaborative Governance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Leverage%20Points%20in%20Governance.png"
              alt="Leverage Points in Governance"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            Transition from disconnected, clashing nodes to a unified, synchronized network through:
            <br />
            <strong>L1 (Paradigm):</strong> Shift from Power Over to Power With.
            <br />
            <strong>L2 (Mindset):</strong> Institutionalize inter-provincial development compacts.
            <br />
            <strong>L5 (Rules):</strong> Establish transparent, formula-based resource allocation.
          </p>
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              How transformative will collaborative governance be for BARMM? (1-5)
            </Label>
            {renderScale("q10_collaborative_governance")}
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════ ARCHETYPES & LEVERAGE POINTS */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            6 Archetypes and Leverage Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Archetypes%20&%20Leverage%20Points.png"
              alt="Archetypes and Leverage Points"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════ FOUR STRATEGIC OPTIONS */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Four Strategic Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/Strategic%20Options.png"
              alt="Strategic Options"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            Four distinct pathways to scale regional value creation:
            <br />
            <strong>1. HEDS:</strong> Halal Economy Dominance — leverage cultural authenticity.
            <br />
            <strong>2. GEMS:</strong> Green Economy Monetization — convert environmental assets.
            <br />
            <strong>3. IFES:</strong> Infrastructure-First Enabling — remove energy and logistics constraints.
            <br />
            <strong>4. IEDS:</strong> Integrated Ecosystem Development — synchronize all three strategies.
          </p>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════ STRATEGIC OPTIONS RANKING */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Strategic Options Ranking and Scoring Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/3.%20Strategic%20Options%20Ranking.png"
              alt="Strategic Options Ranking"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            Comparative evaluation across seven weighted criteria: Economic Impact (25%),
            Systems Leverage (15%), Identity Alignment (15%), Inclusivity (10%),
            Sustainability (5%), Feasibility (20%), and Risk-Return (10%).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {strategicOptions.map((opt) => (
              <Button
                key={opt.code}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-left",
                  opt.highlight
                    ? "bg-[#1B4D3E] text-white border-[#1B4D3E] dark:bg-[#1B4D3E] dark:text-white"
                    : data.q10_strategic_ranking === opt.code
                    ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                    : inactiveBtnClass
                )}
                onClick={() => update("q10_strategic_ranking", opt.code)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={opt.highlight ? "default" : "outline"}
                      className="text-xs"
                    >
                      {opt.code}
                    </Badge>
                    {opt.highlight && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <p className="text-sm font-semibold mt-1">{opt.name}</p>
                  <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mt-1">
                    Score: {opt.score} | GRDP: {opt.grdp}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════ IEDS EXECUTION ENGINE */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            The Execution Engine: Integrated Ecosystem Development Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/The%20Execution%20Engine%20-IEDS.png"
              alt="The Execution Engine - IEDS"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            Three golden phases flowing forward:
            <br />
            <strong>Phase 1 (2026–2028): Activate Enablers & Governance</strong> — build enabling infrastructure.
            <br />
            <strong>Phase 2 (2029–2032): Scale Transformers</strong> — activate Bangsamoro Halal Park.
            <br />
            <strong>Phase 3 (2033–2035): Consolidate Connectors</strong> — distribute wealth through BIMP-EAGA corridors.
          </p>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════ IEDS PREFERENCE */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            IEDS Strategy Preference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
            Given the evaluation scores, do you agree that IEDS is the optimal strategy for BARMM?
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {["Yes", "Partially agree", "Need more evidence", "Prefer a different option"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left",
                  data.q10_1_ieds_preference === opt ? activeBtnClass : inactiveBtnClass
                )}
                onClick={() => update("q10_1_ieds_preference", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════ SEQUENCE PRIORITIES */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Three-Phase Implementation Priorities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
              Rate the priority of Sequence A investments (2026-2028: Enablers & Governance)
            </Label>
            {renderScale("q10_2_sequence_a_priority")}
            <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">1 = Low priority, 5 = Critical priority</p>
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
              Rate the priority of Sequence B investments (2029-2032: Transformers)
            </Label>
            {renderScale("q10_3_sequence_b_priority")}
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
              Rate the priority of Sequence C investments (2033-2035: Connectors)
            </Label>
            {renderScale("q10_4_sequence_c_priority")}
          </div>
        </CardContent>
      </Card>

      {/* ══════════════════════════════════════════ SEQUENCING LOGIC */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Sequencing Logic Validation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
            Do you agree with this sequencing logic (Enablers → Transformers → Connectors)?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {["Strongly agree", "Agree", "Neutral", "Disagree"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left",
                  data.q10_5_sequencing_logic === opt ? activeBtnClass : inactiveBtnClass
                )}
                onClick={() => update("q10_5_sequencing_logic", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════ RISK MITIGATION */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Risk Mitigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
            Which risk mitigation measure is most critical for IEDS success?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {[
              "Bangsamoro Investment Command Center",
              "Trigger-based budgeting",
              "ODA climate finance for green sequencing",
              "20% contingency reserve",
            ].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left",
                  data.q10_6_risk_mitigation === opt ? activeBtnClass : inactiveBtnClass
                )}
                onClick={() => update("q10_6_risk_mitigation", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ═══════════════════════════════════════════ OUTCOMES ACHIEVABLE */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Expected 2035 Outcomes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
            How achievable are the IEDS 2035 targets (₱550B+ GRDP, {'<'}20% poverty, 100% electrification)?
          </Label>
          {renderScale("q10_7_outcomes_achievable")}
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mt-2">1 = Unrealistic, 5 = Very achievable</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Section10_IEDS;
