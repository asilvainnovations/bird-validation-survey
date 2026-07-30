import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Target,
  TrendingUp,
  ShieldCheck,
  Users,
  Zap,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import { BIRD_IMAGES } from "@/lib/bird-urls";

// ── Types (exact runtime contract with SurveyWizard.tsx s11 state + optional Drifting Goals) ──
export interface Section11Data {
  q11_1_calibration_appropriate: string;
  q11_2_governance_kpi_importance?: number;
  q11_3_resilience_kpi_importance?: number;
  q11_4_inclusivity_kpi_importance?: number;
  q11_5_peace_kpi_importance?: number;
  q11_6_cluster_kpi_sufficient: string;
  q11_7_benchmark_priority: string;
  // Archetype validation — see swot-content.ts ARCHETYPES_BY_SECTION[11].
  q11_arch_drifting_goals_accuracy?: string;
  q11_arch_drifting_goals_followup?: string;
}

interface Section11Props {
  data: Section11Data;
  onChange: (data: Section11Data) => void;
}

// ── Design tokens ────────────────────────────────────────────────────────────
const activeScaleClass =
  "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
const inactiveScaleClass =
  "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]";
const activeBtnClass =
  "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 dark:bg-[#1B4D3E] dark:text-white dark:border-[#1B4D3E]";
const inactiveBtnClass =
  "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#ecfdf5]/30 dark:hover:bg-[#C9A84C]/10";

const archetypeOptions = [
  "Very accurately",
  "Somewhat accurately",
  "Needs revision",
  "Not accurate",
];

// ═══════════════════════════════════════════════════════════════════════════════
export const Section11_Metrics: React.FC<Section11Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section11Data>(
    field: K,
    value: Section11Data[K]
  ) => onChange({ ...data, [field]: value });

  const renderScale = (field: keyof Section11Data) => (
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

  return (
    <div className="space-y-8">
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-[#022c22] dark:bg-[#011a12] text-[#C9A84C] shadow-md shrink-0">
          <BarChart3 className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
            Section 11: Metrics Architecture & Key Performance Indicators
          </h2>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 mt-1 max-w-3xl">
            The IEDS requires a synchronized, cross-cluster monitoring framework that measures not just
            sectoral outputs but ecosystem health. This section presents the calibration architecture
            and key performance indicators across all BEIE clusters.
          </p>
        </div>
      </div>

      {/* ── BLOCK 1: KPI Calibration & Phasing Architecture ───────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <TrendingUp className="w-5 h-5 text-[#C9A84C]" />
            KPI Calibration & Phasing Architecture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
            <img
              src={BIRD_IMAGES.metricsArchitecture.url}
              alt={BIRD_IMAGES.metricsArchitecture.alt}
              className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
              <p className="text-xs italic text-white/70">
                {BIRD_IMAGES.metricsArchitecture.title}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            A four-tier measurement framework showing how the IEDS aligns performance from global
            to local levels: <strong>Tier 1 — Global Standards</strong> (OIC/SMIIC Halal
            Benchmarks and international ESG standards), <strong>Tier 2 — National Alignment</strong>{" "}
            (Philippine Development Plan 2023–2028), <strong>Tier 3 — Regional Execution</strong>{" "}
            (BARMM strategic priorities), and <strong>Tier 4 — Local Impact</strong>{" "}
            (socio-economic transformation at provincial and municipal levels). Success is measured
            by alignment with global standards, so international benchmarks cascade all the way
            down to local outcomes.
          </p>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            The calibration framework synchronizes evaluation with the IEDS synchronization cycle,
            progressing from diagnostic anchoring through governance activation, value-chain acceleration,
            and ultimately global integration.
          </p>
          <div className="overflow-x-auto rounded-lg border border-[#C9A84C]/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#022c22] text-white">
                  <th className="px-4 py-3 text-left font-semibold">Tier</th>
                  <th className="px-4 py-3 text-left font-semibold">Time Horizon</th>
                  <th className="px-4 py-3 text-left font-semibold">Strategic Focus</th>
                  <th className="px-4 py-3 text-left font-semibold">Data Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9A84C]/10">
                <tr className="bg-white dark:bg-[#022c22]/40 hover:bg-[#C9A84C]/5 dark:hover:bg-[#C9A84C]/10">
                  <td className="px-4 py-3 font-semibold text-[#022c22] dark:text-[#ecfdf5]">Baseline</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">2024–2025</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">Diagnostic anchoring</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">PSA-BARMM, MFBM</td>
                </tr>
                <tr className="bg-white dark:bg-[#022c22]/40 hover:bg-[#C9A84C]/5 dark:hover:bg-[#C9A84C]/10">
                  <td className="px-4 py-3 font-semibold text-[#022c22] dark:text-[#ecfdf5]">Interim 1</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">2028</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">Governance OS activation</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">BEGMP dashboards, BHB audits</td>
                </tr>
                <tr className="bg-white dark:bg-[#022c22]/40 hover:bg-[#C9A84C]/5 dark:hover:bg-[#C9A84C]/10">
                  <td className="px-4 py-3 font-semibold text-[#022c22] dark:text-[#ecfdf5]">Interim 2</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">2030</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">Value-chain acceleration</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">BOI tracking, MTIT registry</td>
                </tr>
                <tr className="bg-white dark:bg-[#022c22]/40 hover:bg-[#C9A84C]/5 dark:hover:bg-[#C9A84C]/10">
                  <td className="px-4 py-3 font-semibold text-[#022c22] dark:text-[#ecfdf5]">Terminal</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">2035</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">Global integration</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">PSA-BARMM GRDP, OIC reports</td>
                </tr>
                <tr className="bg-white dark:bg-[#022c22]/40 hover:bg-[#C9A84C]/5 dark:hover:bg-[#C9A84C]/10">
                  <td className="px-4 py-3 font-semibold text-[#022c22] dark:text-[#ecfdf5]">Long-Horizon</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">2040</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">Energy & human capital</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">BSEMP audits, TESDA cohorts</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              Is this 5-tier calibration architecture appropriate for BARMM?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Yes, fully appropriate", "Mostly appropriate", "Needs adjustment", "Overly complex"].map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn("justify-start h-auto py-3 text-sm text-left", data.q11_1_calibration_appropriate === opt ? activeBtnClass : inactiveBtnClass)}
                  onClick={() => update("q11_1_calibration_appropriate", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── BLOCK 2: Cross-Cutting Operating Systems KPIs ─────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <Target className="w-5 h-5 text-[#C9A84C]" />
            Cross-Cutting Operating Systems KPIs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            These KPIs serve as the primary synchronization signals for the four cross-cutting operating systems.
            Each target reflects the trajectory from current baseline to the 2035 ambition horizon.
          </p>

          {/* Moral Governance */}
          <div className="space-y-3 pb-8 border-b border-[#C9A84C]/20 last:pb-0 last:border-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
              <h4 className="font-semibold text-[#022c22] dark:text-[#ecfdf5] text-sm uppercase tracking-wide">Moral Governance</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10 rounded-lg p-3 border border-[#C9A84C]/10 dark:border-[#C9A84C]/20">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-1">Public financial disclosure</p>
                <p className="text-lg font-bold text-[#022c22] dark:text-[#ecfdf5]">~65% <span className="text-[#C9A84C] text-sm font-normal">→ 100% by 2035</span></p>
              </div>
              <div className="bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10 rounded-lg p-3 border border-[#C9A84C]/10 dark:border-[#C9A84C]/20">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-1">Investor ombudsman</p>
                <p className="text-lg font-bold text-[#022c22] dark:text-[#ecfdf5]">Not est. <span className="text-[#C9A84C] text-sm font-normal">→ 8.0+/10</span></p>
              </div>
              <div className="bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10 rounded-lg p-3 border border-[#C9A84C]/10 dark:border-[#C9A84C]/20">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-1">Digital procurement</p>
                <p className="text-lg font-bold text-[#022c22] dark:text-[#ecfdf5]">{'<'}30% <span className="text-[#C9A84C] text-sm font-normal">→ 100%</span></p>
              </div>
            </div>
            <div>
              <Label className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-2 block">Rate importance of governance KPIs (1-5)</Label>
              {renderScale("q11_2_governance_kpi_importance")}
            </div>
          </div>

          {/* Resilience */}
          <div className="space-y-3 pb-8 border-b border-[#C9A84C]/20 last:pb-0 last:border-0">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#C9A84C]" />
              <h4 className="font-semibold text-[#022c22] dark:text-[#ecfdf5] text-sm uppercase tracking-wide">Resilience</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10 rounded-lg p-3 border border-[#C9A84C]/10 dark:border-[#C9A84C]/20">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-1">Climate-risk screening</p>
                <p className="text-lg font-bold text-[#022c22] dark:text-[#ecfdf5]">0% <span className="text-[#C9A84C] text-sm font-normal">→ 100%</span></p>
              </div>
              <div className="bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10 rounded-lg p-3 border border-[#C9A84C]/10 dark:border-[#C9A84C]/20">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-1">Regional resilience index</p>
                <p className="text-lg font-bold text-[#022c22] dark:text-[#ecfdf5]">Not dev. <span className="text-[#C9A84C] text-sm font-normal">→ Standardized</span></p>
              </div>
            </div>
            <div>
              <Label className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-2 block">Rate importance of resilience KPIs (1-5)</Label>
              {renderScale("q11_3_resilience_kpi_importance")}
            </div>
          </div>

          {/* Inclusivity */}
          <div className="space-y-3 pb-8 border-b border-[#C9A84C]/20 last:pb-0 last:border-0">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C9A84C]" />
              <h4 className="font-semibold text-[#022c22] dark:text-[#ecfdf5] text-sm uppercase tracking-wide">Inclusivity</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10 rounded-lg p-3 border border-[#C9A84C]/10 dark:border-[#C9A84C]/20">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-1">MSME participation</p>
                <p className="text-lg font-bold text-[#022c22] dark:text-[#ecfdf5]">{'<'}35% <span className="text-[#C9A84C] text-sm font-normal">→ {'>'}75%</span></p>
              </div>
              <div className="bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10 rounded-lg p-3 border border-[#C9A84C]/10 dark:border-[#C9A84C]/20">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-1">Gender-balanced employment</p>
                <p className="text-lg font-bold text-[#022c22] dark:text-[#ecfdf5]">~42% <span className="text-[#C9A84C] text-sm font-normal">→ 50%+</span></p>
              </div>
              <div className="bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10 rounded-lg p-3 border border-[#C9A84C]/10 dark:border-[#C9A84C]/20">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-1">Functional literacy</p>
                <p className="text-lg font-bold text-[#022c22] dark:text-[#ecfdf5]">59.3% <span className="text-[#C9A84C] text-sm font-normal">→ 75%+</span></p>
              </div>
            </div>
            <div>
              <Label className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-2 block">Rate importance of inclusivity KPIs (1-5)</Label>
              {renderScale("q11_4_inclusivity_kpi_importance")}
            </div>
          </div>

          {/* Peace & Security */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
              <h4 className="font-semibold text-[#022c22] dark:text-[#ecfdf5] text-sm uppercase tracking-wide">Peace & Security</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10 rounded-lg p-3 border border-[#C9A84C]/10 dark:border-[#C9A84C]/20">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-1">Combatant reintegration</p>
                <p className="text-lg font-bold text-[#022c22] dark:text-[#ecfdf5]">~62% <span className="text-[#C9A84C] text-sm font-normal">→ {'>'}95%</span></p>
              </div>
              <div className="bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10 rounded-lg p-3 border border-[#C9A84C]/10 dark:border-[#C9A84C]/20">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-1">Rido / conflict reduction</p>
                <p className="text-lg font-bold text-[#022c22] dark:text-[#ecfdf5]">Baseline <span className="text-[#C9A84C] text-sm font-normal">→ {'>'}20% cum.</span></p>
              </div>
              <div className="bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10 rounded-lg p-3 border border-[#C9A84C]/10 dark:border-[#C9A84C]/20">
                <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-1">Investor perception</p>
                <p className="text-lg font-bold text-[#022c22] dark:text-[#ecfdf5]">Baseline <span className="text-[#C9A84C] text-sm font-normal">→ +25% imp.</span></p>
              </div>
            </div>
            <div>
              <Label className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mb-2 block">Rate importance of peace & security KPIs (1-5)</Label>
              {renderScale("q11_5_peace_kpi_importance")}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── BLOCK 3: Cluster-Specific Performance Indicators ──────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <BarChart3 className="w-5 h-5 text-[#C9A84C]" />
            Cluster-Specific Performance Indicators
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            Each BEIE cluster is assigned headline KPIs derived from its strategic action plan.
            These metrics serve as leading indicators of cluster-level performance and synchronization readiness.
          </p>
          <div className="overflow-x-auto rounded-lg border border-[#C9A84C]/20">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#022c22] text-white">
                  <th className="px-4 py-3 text-left font-semibold">Cluster</th>
                  <th className="px-4 py-3 text-left font-semibold">Headline KPIs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9A84C]/10">
                <tr className="bg-white dark:bg-[#022c22]/40 hover:bg-[#C9A84C]/5 dark:hover:bg-[#C9A84C]/10">
                  <td className="px-4 py-3 font-semibold text-[#022c22] dark:text-[#ecfdf5] whitespace-nowrap">Foundations</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">Priority crop yield +15%, Post-harvest loss -30%, RE mix 85%, Household electrification 90%, REDD+ revenue generating</td>
                </tr>
                <tr className="bg-white dark:bg-[#022c22]/40 hover:bg-[#C9A84C]/5 dark:hover:bg-[#C9A84C]/10">
                  <td className="px-4 py-3 font-semibold text-[#022c22] dark:text-[#ecfdf5] whitespace-nowrap">Transformers</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">5,000+ halal MSMEs, ₱5B halal exports, 3M tourists, 20,000+ sustained MSME ops</td>
                </tr>
                <tr className="bg-white dark:bg-[#022c22]/40 hover:bg-[#C9A84C]/5 dark:hover:bg-[#C9A84C]/10">
                  <td className="px-4 py-3 font-semibold text-[#022c22] dark:text-[#ecfdf5] whitespace-nowrap">Enablers</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">100% gov broadband, 500+ trained civil servants, {'>'}90% budget execution, 8/10 coordination</td>
                </tr>
                <tr className="bg-white dark:bg-[#022c22]/40 hover:bg-[#C9A84C]/5 dark:hover:bg-[#C9A84C]/10">
                  <td className="px-4 py-3 font-semibold text-[#022c22] dark:text-[#ecfdf5] whitespace-nowrap">Connectors</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">+50% BIMP-EAGA trade, ₱2B+ halal corridor, 85% digital customs, 7 provincial offices</td>
                </tr>
                <tr className="bg-white dark:bg-[#022c22]/40 hover:bg-[#C9A84C]/5 dark:hover:bg-[#C9A84C]/10">
                  <td className="px-4 py-3 font-semibold text-[#022c22] dark:text-[#ecfdf5] whitespace-nowrap">Financiers</td>
                  <td className="px-4 py-3 text-[#065f46] dark:text-[#ecfdf5]/70">₱20B+ Islamic banking assets, 35%+ adult inclusion, 100+ branches, ₱15B+ approvals</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              Are these cluster KPIs sufficient for tracking IEDS progress?
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {["Yes", "Needs more leading indicators", "Needs more cross-cluster sync metrics", "Insufficient"].map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn("justify-start h-auto py-3 text-sm text-left", data.q11_6_cluster_kpi_sufficient === opt ? activeBtnClass : inactiveBtnClass)}
                  onClick={() => update("q11_6_cluster_kpi_sufficient", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── BLOCK 4: Benchmark Alignment ──────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <Target className="w-5 h-5 text-[#C9A84C]" />
            Benchmark Alignment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            BARMM&apos;s KPI framework must align with multi-layer benchmarks spanning Islamic standards,
            global ESG frameworks, national development plans, and the United Nations Sustainable Development Goals.
          </p>
          <div className="space-y-4">
            <div className="rounded-lg border border-[#C9A84C]/20 p-4 bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#022c22] text-[#C9A84C]">OIC / SMIIC</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
                <p><span className="font-medium text-[#022c22] dark:text-[#ecfdf5]">Halal certification</span> — ≤21 days processing time</p>
                <p><span className="font-medium text-[#022c22] dark:text-[#ecfdf5]">Accreditation</span> — Full OIC accreditation + MRA signed</p>
              </div>
            </div>
            <div className="rounded-lg border border-[#C9A84C]/20 p-4 bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#022c22] text-[#C9A84C]">ESG</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
                <p><span className="font-medium text-[#022c22] dark:text-[#ecfdf5]">Renewable energy</span> — 85%+</p>
                <p><span className="font-medium text-[#022c22] dark:text-[#ecfdf5]">Poverty rate</span> — {'<'}20%</p>
                <p><span className="font-medium text-[#022c22] dark:text-[#ecfdf5]">Business registration</span> — 1 day (digital)</p>
              </div>
            </div>
            <div className="rounded-lg border border-[#C9A84C]/20 p-4 bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#022c22] text-[#C9A84C]">PDP 2023-2028</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
                <p><span className="font-medium text-[#022c22] dark:text-[#ecfdf5]">GRDP growth</span> — 5-6%</p>
                <p><span className="font-medium text-[#022c22] dark:text-[#ecfdf5]">MSME share</span> — 40% GDP</p>
                <p><span className="font-medium text-[#022c22] dark:text-[#ecfdf5]">Investment-to-GDP</span> — 30%</p>
              </div>
            </div>
            <div className="rounded-lg border border-[#C9A84C]/20 p-4 bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#022c22] text-[#C9A84C]">SDGs</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
                <p><span className="font-medium text-[#022c22] dark:text-[#ecfdf5]">Literacy</span> — 75%+ (SDG 4)</p>
                <p><span className="font-medium text-[#022c22] dark:text-[#ecfdf5]">Climate resilience</span> — 100% (SDG 13)</p>
                <p><span className="font-medium text-[#022c22] dark:text-[#ecfdf5]">Gender parity</span> — 50%+ (SDG 5 & 8)</p>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              Which benchmark framework should BARMM prioritize?
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {["OIC/SMIIC standards", "ESG criteria", "Philippine Development Plan", "SDGs", "All equally"].map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn("justify-start h-auto py-3 text-sm text-left", data.q11_7_benchmark_priority === opt ? activeBtnClass : inactiveBtnClass)}
                  onClick={() => update("q11_7_benchmark_priority", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── BLOCK 5: Archetype — Drifting Goals ───────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            Archetype: Drifting Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/images-swot-systems-maps/Drifting%20Goals.png"
              alt="Drifting Goals Archetype"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90 leading-relaxed">
            The &quot;Drifting Goals&quot; archetype illustrates how BARMM&apos;s development ambitions weaken over time
            when persistent performance gaps lead institutions to lower standards instead of addressing root causes.
            Ambitious targets — such as electrification, literacy, and Halal certification — gradually erode when
            agencies normalize &quot;realistic&quot; baselines rather than fixing systemic constraints. Each cycle of unmet
            goals triggers corrective actions, but when results still fall short, pressure builds to redefine targets
            downward. The outcome is a feedback loop of complacency, where lowered expectations replace genuine progress.
          </p>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            <strong>Balancing Loop 1 (B1):</strong> Goal erosion through lowered standards. Persistent performance gaps create pressure to reduce targets, temporarily easing institutional stress but undermining long-term accountability.
            <br /><br />
            <strong>Balancing Loop 2 (B2):</strong> Corrective action attempts to restore performance. Agencies respond with short-term fixes — training programs, subsidies, or ad-hoc reforms — but these rarely close the structural gaps, causing the cycle to repeat.
          </p>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              How accurately does the &quot;Drifting Goals&quot; archetype illustrate BARMM&apos;s development ambitions weakening over time when persistent performance gaps lead institutions to lower standards instead of addressing root causes?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {archetypeOptions.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q11_arch_drifting_goals_accuracy === opt ? activeBtnClass : inactiveBtnClass
                  )}
                  onClick={() => update("q11_arch_drifting_goals_accuracy", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {(data.q11_arch_drifting_goals_accuracy === "Very accurately" ||
            data.q11_arch_drifting_goals_accuracy === "Somewhat accurately") && (
            <div className="space-y-3 pt-4 border-t border-[#C9A84C]/20 animate-in fade-in slide-in-from-top-2 duration-200">
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
                Which of the balancing loops is most observable in BARMM today?
              </Label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "B1: Persistent performance gaps create pressure to reduce targets, temporarily easing institutional stress",
                  "B2: Agencies respond with short-term fixes — training programs, subsidies, or ad-hoc reforms — but these rarely close the structural gaps",
                  "Both loops are equally observable",
                  "Other (please specify)",
                ].map((opt) => (
                  <Button
                    key={opt}
                    type="button"
                    variant="outline"
                    className={cn(
                      "justify-start h-auto py-3 text-sm text-left",
                      data.q11_arch_drifting_goals_followup === opt ? activeBtnClass : inactiveBtnClass
                    )}
                    onClick={() => update("q11_arch_drifting_goals_followup", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
              <Textarea
                placeholder="Describe your observation of drifting goals in BARMM..."
                rows={3}
                value={data.q11_arch_drifting_goals_followup || ""}
                onChange={(e) => update("q11_arch_drifting_goals_followup", e.target.value)}
                className="w-full rounded-lg border border-[#C9A84C]/30 bg-white dark:bg-[#022c22]/50 px-3 py-2 text-sm text-[#022c22] dark:text-[#ecfdf5] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 resize-y"
              />
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
};

export default Section11_Metrics;
