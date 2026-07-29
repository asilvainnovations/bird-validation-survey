// src/components/strategic/Section10_IEDS.tsx
// BIRD 2026–2035 · Section 10: Integrated Ecosystem Development Strategy (IEDS)
// Updated: 2026-07-30 · Strict alignment with reusable primitives and survey architecture

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Rocket, CheckCircle2 } from "lucide-react";

// ─── REUSABLE PRIMITIVES ─────────────────────────────────────────────────────
import { ImageWithFallback } from "@/components/primitives/ImageWithFallback";
import { LikertScale } from "@/components/primitives/LikertScale";
import { SectionProgress } from "@/components/primitives/SectionProgress";

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
  const update = <K extends keyof Section10Data>(field: K, value: Section10Data[K]) => 
    onChange({ ...data, [field]: value });

  const activeBtnClass =
    "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 dark:bg-[#1B4D3E] dark:text-white dark:border-[#1B4D3E]";
  const inactiveBtnClass =
    "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#ecfdf5]/30 dark:hover:bg-[#C9A84C]/10";

  const strategicOptions = [
    { code: "HEDS", name: "Halal Economy Dominance Strategy", score: "7.61/10", grdp: "₱150–200B" },
    { code: "GEMS", name: "Green Economy Monetization Strategy", score: "7.16/10", grdp: "₱80–120B" },
    { code: "IFES", name: "Infrastructure-First Enabling Strategy", score: "7.48/10", grdp: "₱200–280B" },
    { code: "IEDS", name: "Integrated Ecosystem Development Strategy", score: "8.93/10", grdp: "₱550B+", highlight: true },
  ];

  return (
    <div className="space-y-8">
      {/* ── Section Progress ────────────────────────────────────── */}
      <SectionProgress 
        current={10} 
        total={16} 
        labels={[
          "Welcome", "Privacy", "Profile", "Systems", "Foundations", 
          "Transformers", "Enablers", "Connectors", "Financiers", 
          "Operating Systems", "IEDS", "Metrics", "BSC", "Budget", 
          "Resources", "Submit"
        ]} 
      />

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
          <ImageWithFallback
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/How%20to%20Identify%20Leverage%20Points.png"
            alt="How to Identify Leverage Points"
            description="Three-step process using Donella Meadows' Hierarchy of System Change (L1–L12): Diagnostic Synthesis, Mapping the Loops, Tiered Selection."
            className="w-full h-auto object-contain rounded-xl border border-[#C9A84C]/30"
          />
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              How clear is this methodology for identifying leverage points?
            </Label>
            <LikertScale
              value={data.q10_leverage_points_clarity}
              onChange={(v) => update("q10_leverage_points_clarity", v)}
              labels={["Not clear at all", "Slightly clear", "Moderately clear", "Clear", "Very clear"]}
              name="leverage_points_clarity"
            />
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
          <ImageWithFallback
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/Activating%20Leverage%20Points.png"
            alt="Activating Leverage Points"
            description="Three tiers of interventions to dismantle structural constraints: L3 (Goals & Operating System), L5 (Rules & Incentives), L6 (Information Flows)."
            className="w-full h-auto object-contain rounded-xl border border-[#C9A84C]/30"
          />
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              How effective will these leverage points be in accelerating BARMM's growth?
            </Label>
            <LikertScale
              value={data.q10_activating_leverage}
              onChange={(v) => update("q10_activating_leverage", v)}
              labels={["Not effective", "Slightly effective", "Moderately effective", "Effective", "Very effective"]}
              name="activating_leverage"
            />
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
          <ImageWithFallback
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Leverage%20Points%20for%20Capacity%20Traps.png"
            alt="Leverage Points for Capacity Traps"
            description="Prescription: Front-Loading the Ecosystem Enablers — Leverage Point L10 (Stock-Flow Structure) expands system capacity ahead of market demand to break Limits to Growth."
            className="w-full h-auto object-contain rounded-xl border border-[#C9A84C]/30"
          />
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              How critical is front-loading enablers before scaling production?
            </Label>
            <LikertScale
              value={data.q10_capacity_traps}
              onChange={(v) => update("q10_capacity_traps", v)}
              labels={["Not critical", "Slightly critical", "Moderately critical", "Critical", "Very critical"]}
              name="capacity_traps"
            />
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
          <ImageWithFallback
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Iceberg%20Model%20Paradigm.png"
            alt="Iceberg Model Paradigm"
            description="Three layers of the system: Events (Top 10%), Structures (Body 40%), Mental Models (Base 50%)."
            className="w-full h-auto object-contain rounded-xl border border-[#C9A84C]/30"
          />
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              How important is addressing mental models and structures vs. just events?
            </Label>
            <LikertScale
              value={data.q10_iceberg_model}
              onChange={(v) => update("q10_iceberg_model", v)}
              labels={["Not important", "Slightly important", "Moderately important", "Important", "Very important"]}
              name="iceberg_model"
            />
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
          <ImageWithFallback
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Leverage%20Points%20in%20Governance.png"
            alt="Leverage Points in Governance"
            description="Transition from disconnected, clashing nodes to a unified, synchronized network through L1 (Paradigm), L2 (Mindset), L5 (Rules)."
            className="w-full h-auto object-contain rounded-xl border border-[#C9A84C]/30"
          />
          <div className="pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              How transformative will collaborative governance be for BARMM?
            </Label>
            <LikertScale
              value={data.q10_collaborative_governance}
              onChange={(v) => update("q10_collaborative_governance", v)}
              labels={["Not transformative", "Slightly transformative", "Moderately transformative", "Transformative", "Very transformative"]}
              name="collaborative_governance"
            />
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
          <ImageWithFallback
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Archetypes%20&%20Leverage%20Points.png"
            alt="Archetypes and Leverage Points"
            description="Visual mapping of the 6 systems archetypes and their corresponding leverage points for intervention."
            className="w-full h-auto object-contain rounded-xl border border-[#C9A84C]/30"
          />
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
          <ImageWithFallback
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/Strategic%20Options.png"
            alt="Strategic Options"
            description="Four distinct pathways to scale regional value creation: HEDS, GEMS, IFES, IEDS."
            className="w-full h-auto object-contain rounded-xl border border-[#C9A84C]/30"
          />
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
          <ImageWithFallback
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-strategic-options-roadmap/3.%20Strategic%20Options%20Ranking.png"
            alt="Strategic Options Ranking"
            description="Comparative evaluation across seven weighted criteria: Economic Impact, Systems Leverage, Identity Alignment, Inclusivity, Sustainability, Feasibility, and Risk-Return."
            className="w-full h-auto object-contain rounded-xl border border-[#C9A84C]/30"
          />
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
                    <Badge variant={opt.highlight ? "default" : "outline"} className="text-xs">
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
          <ImageWithFallback
            src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/The%20Execution%20Engine%20-IEDS.png"
            alt="The Execution Engine - IEDS"
            description="Three golden phases flowing forward: Phase 1 (Activate Enablers), Phase 2 (Scale Transformers), Phase 3 (Consolidate Connectors)."
            className="w-full h-auto object-contain rounded-xl border border-[#C9A84C]/30"
          />
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
            <LikertScale
              value={data.q10_2_sequence_a_priority}
              onChange={(v) => update("q10_2_sequence_a_priority", v)}
              labels={["Low priority", "Slightly low priority", "Moderate priority", "High priority", "Critical priority"]}
              name="sequence_a_priority"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
              Rate the priority of Sequence B investments (2029-2032: Transformers)
            </Label>
            <LikertScale
              value={data.q10_3_sequence_b_priority}
              onChange={(v) => update("q10_3_sequence_b_priority", v)}
              labels={["Low priority", "Slightly low priority", "Moderate priority", "High priority", "Critical priority"]}
              name="sequence_b_priority"
            />
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
              Rate the priority of Sequence C investments (2033-2035: Connectors)
            </Label>
            <LikertScale
              value={data.q10_4_sequence_c_priority}
              onChange={(v) => update("q10_4_sequence_c_priority", v)}
              labels={["Low priority", "Slightly low priority", "Moderate priority", "High priority", "Critical priority"]}
              name="sequence_c_priority"
            />
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
          <LikertScale
            value={data.q10_7_outcomes_achievable}
            onChange={(v) => update("q10_7_outcomes_achievable", v)}
            labels={["Unrealistic", "Slightly unrealistic", "Moderately achievable", "Achievable", "Very achievable"]}
            name="outcomes_achievable"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Section10_IEDS;
