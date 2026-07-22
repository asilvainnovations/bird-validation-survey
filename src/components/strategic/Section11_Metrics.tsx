// src/components/strategic/Section11_Metrics.tsx
// BIRD 2026–2035 · Section 11: Metrics Architecture & KPIs

import React from "react";
import { BarChart3, Target, TrendingUp, ShieldCheck, Users, Zap, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SurveySchemaType } from "@/lib/survey-schema";
import { BIRD_IMAGES } from "@/lib/bird-urls";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// ── Type Definitions ─────────────────────────────────────────────────────────
export type Section11Data = Pick<
  SurveySchemaType,
  | "q11_1_calibration_appropriate"
  | "q11_2_governance_kpi_importance"
  | "q11_3_resilience_kpi_importance"
  | "q11_4_inclusivity_kpi_importance"
  | "q11_5_peace_kpi_importance"
  | "q11_6_cluster_kpi_sufficient"
  | "q11_7_benchmark_priority"
>;

interface Section11Props {
  data: Section11Data;
  onChange: (data: Section11Data) => void;
}

// ── Component ────────────────────────────────────────────────────────────────
export const Section11_Metrics: React.FC<Section11Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section11Data>(field: K, value: Section11Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  const activeScaleClass = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
  const inactiveScaleClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";
  const activeBtnClass = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90";
  const inactiveBtnClass = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";

  return (
    <div className="space-y-8">
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-[#022c22] text-[#C9A84C] shadow-md shrink-0">
          <BarChart3 className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#022c22]">
            Section 11: Metrics Architecture & Key Performance Indicators
          </h2>
          <p className="text-sm text-[#065f46] mt-1 max-w-3xl">
            The IEDS requires a synchronized, cross-cluster monitoring framework that measures not just 
            sectoral outputs but ecosystem health. This section presents the calibration architecture 
            and key performance indicators across all BEIE clusters.
          </p>
        </div>
      </div>

      {/* ── BLOCK 1: KPI Calibration & Phasing Architecture ───────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <TrendingUp className="w-5 h-5 text-[#C9A84C]" />
            KPI Calibration & Phasing Architecture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-[#065f46]">
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
                <tr className="bg-white hover:bg-[#C9A84C]/5">
                  <td className="px-4 py-3 font-semibold text-[#022c22]">Baseline</td>
                  <td className="px-4 py-3 text-[#065f46]">2024–2025</td>
                  <td className="px-4 py-3 text-[#065f46]">Diagnostic anchoring</td>
                  <td className="px-4 py-3 text-[#065f46]">PSA-BARMM, MFBM</td>
                </tr>
                <tr className="bg-white hover:bg-[#C9A84C]/5">
                  <td className="px-4 py-3 font-semibold text-[#022c22]">Interim 1</td>
                  <td className="px-4 py-3 text-[#065f46]">2028</td>
                  <td className="px-4 py-3 text-[#065f46]">Governance OS activation</td>
                  <td className="px-4 py-3 text-[#065f46]">BEGMP dashboards, BHB audits</td>
                </tr>
                <tr className="bg-white hover:bg-[#C9A84C]/5">
                  <td className="px-4 py-3 font-semibold text-[#022c22]">Interim 2</td>
                  <td className="px-4 py-3 text-[#065f46]">2030</td>
                  <td className="px-4 py-3 text-[#065f46]">Value-chain acceleration</td>
                  <td className="px-4 py-3 text-[#065f46]">BBOI tracking, MTIT registry</td>
                </tr>
                <tr className="bg-white hover:bg-[#C9A84C]/5">
                  <td className="px-4 py-3 font-semibold text-[#022c22]">Terminal</td>
                  <td className="px-4 py-3 text-[#065f46]">2035</td>
                  <td className="px-4 py-3 text-[#065f46]">Global integration</td>
                  <td className="px-4 py-3 text-[#065f46]">PSA-BARMM GRDP, OIC reports</td>
                </tr>
                <tr className="bg-white hover:bg-[#C9A84C]/5">
                  <td className="px-4 py-3 font-semibold text-[#022c22]">Long-Horizon</td>
                  <td className="px-4 py-3 text-[#065f46]">2040</td>
                  <td className="px-4 py-3 text-[#065f46]">Energy & human capital</td>
                  <td className="px-4 py-3 text-[#065f46]">BSEMP audits, TESDA cohorts</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
              Is this 5-tier calibration architecture appropriate for BARMM?
            </Label>
            <div className="grid grid-cols-2 gap-3">
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
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <Target className="w-5 h-5 text-[#C9A84C]" />
            Cross-Cutting Operating Systems KPIs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-sm text-[#065f46]">
            These KPIs serve as the primary synchronization signals for the four cross-cutting operating systems. 
            Each target reflects the trajectory from current baseline to the 2035 ambition horizon.
          </p>

          {/* Moral Governance */}
          <div className="space-y-3 pb-8 border-b border-[#C9A84C]/20 last:pb-0 last:border-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
              <h4 className="font-semibold text-[#022c22] text-sm uppercase tracking-wide">Moral Governance</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
                <p className="text-xs text-[#065f46] mb-1">Public financial disclosure</p>
                <p className="text-lg font-bold text-[#022c22]">~65% <span className="text-[#C9A84C] text-sm font-normal">→ 100% by 2035</span></p>
              </div>
              <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
                <p className="text-xs text-[#065f46] mb-1">Investor ombudsman</p>
                <p className="text-lg font-bold text-[#022c22]">Not est. <span className="text-[#C9A84C] text-sm font-normal">→ 8.0+/10</span></p>
              </div>
              <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
                <p className="text-xs text-[#065f46] mb-1">Digital procurement</p>
                <p className="text-lg font-bold text-[#022c22]">&lt;30% <span className="text-[#C9A84C] text-sm font-normal">→ 100%</span></p>
              </div>
            </div>
            <div>
              <Label className="text-xs text-[#065f46] mb-2 block">Rate importance of governance KPIs (1-5)</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <Button key={v} type="button" variant="outline" size="icon"
                    className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q11_2_governance_kpi_importance === v ? activeScaleClass : inactiveScaleClass)}
                    onClick={() => update("q11_2_governance_kpi_importance", v)}>
                    {v}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Resilience */}
          <div className="space-y-3 pb-8 border-b border-[#C9A84C]/20 last:pb-0 last:border-0">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#C9A84C]" />
              <h4 className="font-semibold text-[#022c22] text-sm uppercase tracking-wide">Resilience</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
                <p className="text-xs text-[#065f46] mb-1">Climate-risk screening</p>
                <p className="text-lg font-bold text-[#022c22]">0% <span className="text-[#C9A84C] text-sm font-normal">→ 100%</span></p>
              </div>
              <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
                <p className="text-xs text-[#065f46] mb-1">Regional resilience index</p>
                <p className="text-lg font-bold text-[#022c22]">Not dev. <span className="text-[#C9A84C] text-sm font-normal">→ Standardized</span></p>
              </div>
            </div>
            <div>
              <Label className="text-xs text-[#065f46] mb-2 block">Rate importance of resilience KPIs (1-5)</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <Button key={v} type="button" variant="outline" size="icon"
                    className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q11_3_resilience_kpi_importance === v ? activeScaleClass : inactiveScaleClass)}
                    onClick={() => update("q11_3_resilience_kpi_importance", v)}>
                    {v}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Inclusivity */}
          <div className="space-y-3 pb-8 border-b border-[#C9A84C]/20 last:pb-0 last:border-0">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C9A84C]" />
              <h4 className="font-semibold text-[#022c22] text-sm uppercase tracking-wide">Inclusivity</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
                <p className="text-xs text-[#065f46] mb-1">MSME participation</p>
                <p className="text-lg font-bold text-[#022c22]">&lt;35% <span className="text-[#C9A84C] text-sm font-normal">→ &gt;75%</span></p>
              </div>
              <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
                <p className="text-xs text-[#065f46] mb-1">Gender-balanced employment</p>
                <p className="text-lg font-bold text-[#022c22]">~42% <span className="text-[#C9A84C] text-sm font-normal">→ 50%+</span></p>
              </div>
              <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
                <p className="text-xs text-[#065f46] mb-1">Functional literacy</p>
                <p className="text-lg font-bold text-[#022c22]">59.3% <span className="text-[#C9A84C] text-sm font-normal">→ 75%+</span></p>
              </div>
            </div>
            <div>
              <Label className="text-xs text-[#065f46] mb-2 block">Rate importance of inclusivity KPIs (1-5)</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <Button key={v} type="button" variant="outline" size="icon"
                    className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q11_4_inclusivity_kpi_importance === v ? activeScaleClass : inactiveScaleClass)}
                    onClick={() => update("q11_4_inclusivity_kpi_importance", v)}>
                    {v}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Peace & Security */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
              <h4 className="font-semibold text-[#022c22] text-sm uppercase tracking-wide">Peace & Security</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
                <p className="text-xs text-[#065f46] mb-1">Combatant reintegration</p>
                <p className="text-lg font-bold text-[#022c22]">~62% <span className="text-[#C9A84C] text-sm font-normal">→ &gt;95%</span></p>
              </div>
              <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
                <p className="text-xs text-[#065f46] mb-1">Rido / conflict reduction</p>
                <p className="text-lg font-bold text-[#022c22]">Baseline <span className="text-[#C9A84C] text-sm font-normal">→ &gt;20% cum.</span></p>
              </div>
              <div className="bg-[#C9A84C]/5 rounded-lg p-3 border border-[#C9A84C]/10">
                <p className="text-xs text-[#065f46] mb-1">Investor perception</p>
                <p className="text-lg font-bold text-[#022c22]">Baseline <span className="text-[#C9A84C] text-sm font-normal">→ +25% imp.</span></p>
              </div>
            </div>
            <div>
              <Label className="text-xs text-[#065f46] mb-2 block">Rate importance of peace & security KPIs (1-5)</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <Button key={v} type="button" variant="outline" size="icon"
                    className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q11_5_peace_kpi_importance === v ? activeScaleClass : inactiveScaleClass)}
                    onClick={() => update("q11_5_peace_kpi_importance", v)}>
                    {v}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── BLOCK 3: Cluster-Specific Performance Indicators ──────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <BarChart3 className="w-5 h-5 text-[#C9A84C]" />
            Cluster-Specific Performance Indicators
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-[#065f46]">
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
                <tr className="bg-white hover:bg-[#C9A84C]/5">
                  <td className="px-4 py-3 font-semibold text-[#022c22] whitespace-nowrap">Foundations</td>
                  <td className="px-4 py-3 text-[#065f46]">Priority crop yield +15%, Post-harvest loss -30%, RE mix 85%, Household electrification 90%, REDD+ revenue generating</td>
                </tr>
                <tr className="bg-white hover:bg-[#C9A84C]/5">
                  <td className="px-4 py-3 font-semibold text-[#022c22] whitespace-nowrap">Transformers</td>
                  <td className="px-4 py-3 text-[#065f46]">5,000+ halal MSMEs, ₱5B halal exports, 3M tourists, 20,000+ sustained MSME ops</td>
                </tr>
                <tr className="bg-white hover:bg-[#C9A84C]/5">
                  <td className="px-4 py-3 font-semibold text-[#022c22] whitespace-nowrap">Enablers</td>
                  <td className="px-4 py-3 text-[#065f46]">100% gov broadband, 500+ trained civil servants, &gt;90% budget execution, 8/10 coordination</td>
                </tr>
                <tr className="bg-white hover:bg-[#C9A84C]/5">
                  <td className="px-4 py-3 font-semibold text-[#022c22] whitespace-nowrap">Connectors</td>
                  <td className="px-4 py-3 text-[#065f46]">+50% BIMP-EAGA trade, ₱2B+ halal corridor, 85% digital customs, 7 provincial offices</td>
                </tr>
                <tr className="bg-white hover:bg-[#C9A84C]/5">
                  <td className="px-4 py-3 font-semibold text-[#022c22] whitespace-nowrap">Financiers</td>
                  <td className="px-4 py-3 text-[#065f46]">₱20B+ Islamic banking assets, 35%+ adult inclusion, 100+ branches, ₱15B+ approvals</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
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
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <Target className="w-5 h-5 text-[#C9A84C]" />
            Benchmark Alignment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-[#065f46]">
            BARMM&apos;s KPI framework must align with multi-layer benchmarks spanning Islamic standards, 
            global ESG frameworks, national development plans, and the United Nations Sustainable Development Goals.
          </p>
          <div className="space-y-4">
            <div className="rounded-lg border border-[#C9A84C]/20 p-4 bg-[#C9A84C]/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#022c22] text-[#C9A84C]">OIC / SMIIC</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-[#065f46]">
                <p><span className="font-medium text-[#022c22]">Halal certification</span> — ≤21 days processing time</p>
                <p><span className="font-medium text-[#022c22]">Accreditation</span> — Full OIC accreditation + MRA signed</p>
              </div>
            </div>
            <div className="rounded-lg border border-[#C9A84C]/20 p-4 bg-[#C9A84C]/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#022c22] text-[#C9A84C]">ESG</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-[#065f46]">
                <p><span className="font-medium text-[#022c22]">Renewable energy</span> — 85%+</p>
                <p><span className="font-medium text-[#022c22]">Poverty rate</span> — &lt;20%</p>
                <p><span className="font-medium text-[#022c22]">Business registration</span> — 1 day (digital)</p>
              </div>
            </div>
            <div className="rounded-lg border border-[#C9A84C]/20 p-4 bg-[#C9A84C]/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#022c22] text-[#C9A84C]">PDP 2023-2028</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-[#065f46]">
                <p><span className="font-medium text-[#022c22]">GRDP growth</span> — 5-6%</p>
                <p><span className="font-medium text-[#022c22]">MSME share</span> — 40% GDP</p>
                <p><span className="font-medium text-[#022c22]">Investment-to-GDP</span> — 30%</p>
              </div>
            </div>
            <div className="rounded-lg border border-[#C9A84C]/20 p-4 bg-[#C9A84C]/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-bold bg-[#022c22] text-[#C9A84C]">SDGs</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-[#065f46]">
                <p><span className="font-medium text-[#022c22]">Literacy</span> — 75%+ (SDG 4)</p>
                <p><span className="font-medium text-[#022c22]">Climate resilience</span> — 100% (SDG 13)</p>
                <p><span className="font-medium text-[#022c22]">Gender parity</span> — 50%+ (SDG 5 & 8)</p>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium text-[#022c22] mb-3 block">
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

      {/* ── BLOCK 5: Metrics Framework Image ──────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.metricsKPIs.url}
          alt={BIRD_IMAGES.metricsKPIs.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            {BIRD_IMAGES.metricsKPIs.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Section11_Metrics;
