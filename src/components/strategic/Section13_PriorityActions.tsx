// src/components/strategic/Section13_PriorityActions.tsx
// BIRD 2026–2035 · Section 13: Priority Actions & Budget Deployment
// Updated: 2026-07-30 · Strict alignment with reusable primitives and survey architecture

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Wallet,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  PieChart,
  Target,
  TrendingUp,
  Users,
  Leaf,
  Building2,
  Landmark,
  Zap,
} from "lucide-react";
import { BIRD_IMAGES } from "@/lib/bird-urls";

// ─── REUSABLE PRIMITIVES ─────────────────────────────────────────────────────
import { ImageWithFallback } from "@/components/primitives/ImageWithFallback";
import { LikertScale } from "@/components/primitives/LikertScale";
import { SectionProgress } from "@/components/primitives/SectionProgress";

// ── Types (exact runtime contract with SurveyWizard.tsx s13 state) ──────────
export interface Section13Data {
  q13_1_funding_mix_fair?: number;
  q13_2_targets_realistic?: number;
  q13_3_high_risk_concern?: number;
  q13_4_medium_risk_concern?: number;
  q13_5_low_risk_concern?: number;
  q13_6_budget_priority_phase: string;
  q13_7_budget_priority_cluster: string;
  q13_8_blended_finance_opinion: string;
}

interface Section13Props {
  data: Section13Data;
  onChange: (data: Section13Data) => void;
}

// ── Component ────────────────────────────────────────────────────────────────
const Section13_PriorityActions: React.FC<Section13Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section13Data>(field: K, value: Section13Data[K]) => 
    onChange({ ...data, [field]: value });

  const activeBtnClass =
    "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 dark:bg-[#1B4D3E] dark:text-white dark:border-[#1B4D3E]";
  const inactiveBtnClass =
    "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#ecfdf5]/30 dark:hover:bg-[#C9A84C]/10";

  return (
    <div className="space-y-8">
      {/* ── Section Progress ────────────────────────────────────── */}
      <SectionProgress 
        current={13} 
        total={16} 
        labels={[
          "Welcome", "Privacy", "Profile", "Systems", "Foundations", 
          "Transformers", "Enablers", "Connectors", "Financiers", 
          "Operating Systems", "IEDS", "Metrics", "BSC", "Budget", 
          "Resources", "Submit"
        ]} 
      />

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-[#022c22] text-[#C9A84C] shadow-md shrink-0">
          <Wallet className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
            Section 13: Priority Actions & Budget Deployment
          </h2>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 mt-1 max-w-3xl leading-relaxed">
            The IEDS requires ₱120-160 billion in coordinated capital deployment
            (2026-2035), structured around coherent sequencing logic to manage
            fiscal flow, mitigate implementation risk, and ensure cluster
            synchronization.
          </p>
        </div>
      </div>

      {/* ── BLOCK 1: Total Capital Deployment Image ─────────────── */}
      <ImageWithFallback
        src={BIRD_IMAGES.totalCapitalDeployment?.url || ""}
        alt={BIRD_IMAGES.totalCapitalDeployment?.alt || "Total Capital Deployment"}
        description="Total Capital Deployment across Activate (₱35-45B), Scale (₱50-65B), and Consolidate (₱35-50B) phases."
        className="w-full h-auto max-h-[500px] object-contain rounded-xl border border-[#C9A84C]/30 shadow-lg"
      />

      {/* ── BLOCK 2: Capital Phasing Table ──────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#C9A84C]" />
            Capital Phasing Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            The three-phase capital deployment structure allocates ₱120-160 billion
            across Activate, Scale, and Consolidate periods, with each phase targeting
            specific investment clusters and flagship deployments.
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#022c22] text-white">
                  <th className="p-3 text-left font-semibold rounded-tl-lg">Phase</th>
                  <th className="p-3 text-left font-semibold">Period</th>
                  <th className="p-3 text-left font-semibold">Allocation</th>
                  <th className="p-3 text-left font-semibold">Focus Clusters</th>
                  <th className="p-3 text-left font-semibold rounded-tr-lg">Key Deployments</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#C9A84C]/20 bg-white dark:bg-[#022c22]/40 hover:bg-[#C9A84C]/5 dark:hover:bg-[#C9A84C]/10 transition-colors">
                  <td className="p-3 font-bold text-[#022c22] dark:text-[#ecfdf5]">ACTIVATE</td>
                  <td className="p-3 text-[#022c22] dark:text-[#ecfdf5]/90">2026-2028</td>
                  <td className="p-3 font-semibold text-[#1B4D3E] dark:text-[#C9A84C]">₱35-45B</td>
                  <td className="p-3 text-[#065f46] dark:text-[#ecfdf5]/70">Enablers, OS</td>
                  <td className="p-3 text-[#065f46] dark:text-[#ecfdf5]/70">
                    ZBIP (₱6.67B), 800km roads, digital backbone, BHB, Forestry Code, Islamic finance sandbox
                  </td>
                </tr>
                <tr className="border-b border-[#C9A84C]/20 bg-white dark:bg-[#022c22]/40 hover:bg-[#C9A84C]/5 dark:hover:bg-[#C9A84C]/10 transition-colors">
                  <td className="p-3 font-bold text-[#022c22] dark:text-[#ecfdf5]">SCALE</td>
                  <td className="p-3 text-[#022c22] dark:text-[#ecfdf5]/90">2029-2031</td>
                  <td className="p-3 font-semibold text-[#1B4D3E] dark:text-[#C9A84C]">₱50-65B</td>
                  <td className="p-3 text-[#065f46] dark:text-[#ecfdf5]/70">Transformers, Foundations, Financiers</td>
                  <td className="p-3 text-[#065f46] dark:text-[#ecfdf5]/70">
                    Halal Park, 10 agro-corridors, REDD+ registry, branch expansion, TESDA academies
                  </td>
                </tr>
                <tr className="bg-white dark:bg-[#022c22]/40 hover:bg-[#C9A84C]/5 dark:hover:bg-[#C9A84C]/10 transition-colors">
                  <td className="p-3 font-bold text-[#022c22] dark:text-[#ecfdf5] rounded-bl-lg">CONSOLIDATE</td>
                  <td className="p-3 text-[#022c22] dark:text-[#ecfdf5]/90">2032-2035</td>
                  <td className="p-3 font-semibold text-[#1B4D3E] dark:text-[#C9A84C]">₱35-50B</td>
                  <td className="p-3 text-[#065f46] dark:text-[#ecfdf5]/70">Connectors, OS</td>
                  <td className="p-3 text-[#065f46] dark:text-[#ecfdf5]/70 rounded-br-lg">
                    UAE/GCC hubs, eco-tourism, carbon monetization, innovation hubs, MRA, aftercare
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-[#1B4D3E] text-white">
                  <td colSpan={2} className="p-3 font-bold rounded-bl-lg">TOTAL</td>
                  <td colSpan={3} className="p-3 font-bold rounded-br-lg">₱120-160 billion</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/30 p-4 mb-4">
            <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5] mb-2">
              Funding Mix
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1B4D3E]" />
                <span className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
                  35% BARMM block grants
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#C9A84C]" />
                <span className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
                  30% ODA / climate finance
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#065f46]" />
                <span className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
                  35% Private capital / PPP / Islamic finance
                </span>
              </div>
            </div>
          </div>

          {/* q13_1_funding_mix_fair */}
          <div className="space-y-3 pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              Is this funding mix realistic?
            </Label>
            <LikertScale
              value={data.q13_1_funding_mix_fair}
              onChange={(v) => update("q13_1_funding_mix_fair", v)}
              labels={["Unrealistic", "Slightly unrealistic", "Moderately realistic", "Realistic", "Very realistic"]}
              name="funding_mix_fair"
            />
          </div>
        </CardContent>
      </Card>

      {/* ── BLOCK 3: 2035 Targets Dashboard ─────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <Target className="w-5 h-5 text-[#C9A84C]" />
            2035 Targets Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 mb-4 leading-relaxed">
            These targets represent the intended outcomes of the full 10-year IEDS
            implementation, spanning macroeconomic growth, employment, halal &amp;
            green economy, financial inclusion, governance, and infrastructure.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Macroeconomic */}
            <div className="rounded-lg border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/10 to-white dark:from-[#C9A84C]/10 dark:to-[#022c22]/60 p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-[18px] h-[18px] text-[#C9A84C]" />
                <p className="text-sm font-bold text-[#022c22] dark:text-[#ecfdf5]">Macroeconomic</p>
              </div>
              <ul className="space-y-2 text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
                <li className="flex justify-between">
                  <span className="text-[#065f46] dark:text-[#ecfdf5]/70">GRDP</span>
                  <span className="font-semibold">₱550B+</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#065f46] dark:text-[#ecfdf5]/70">Annual investment approvals</span>
                  <span className="font-semibold">₱15B+</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#065f46] dark:text-[#ecfdf5]/70">Export value</span>
                  <span className="font-semibold">₱40B+</span>
                </li>
              </ul>
            </div>

            {/* Employment & Poverty */}
            <div className="rounded-lg border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/10 to-white dark:from-[#C9A84C]/10 dark:to-[#022c22]/60 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-[18px] h-[18px] text-[#C9A84C]" />
                <p className="text-sm font-bold text-[#022c22] dark:text-[#ecfdf5]">Employment &amp; Poverty</p>
              </div>
              <ul className="space-y-2 text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
                <li className="flex justify-between">
                  <span className="text-[#065f46] dark:text-[#ecfdf5]/70">BOI-registered jobs</span>
                  <span className="font-semibold">20,000+</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#065f46] dark:text-[#ecfdf5]/70">Poverty incidence</span>
                  <span className="font-semibold">{'<'}20%</span>
                </li>
              </ul>
            </div>

            {/* Halal & Green Economy */}
            <div className="rounded-lg border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/10 to-white dark:from-[#C9A84C]/10 dark:to-[#022c22]/60 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="w-[18px] h-[18px] text-[#C9A84C]" />
                <p className="text-sm font-bold text-[#022c22] dark:text-[#ecfdf5]">Halal &amp; Green Economy</p>
              </div>
              <ul className="space-y-2 text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
                <li className="flex justify-between">
                  <span className="text-[#065f46] dark:text-[#ecfdf5]/70">Halal-certified MSMEs</span>
                  <span className="font-semibold">5,000+</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#065f46] dark:text-[#ecfdf5]/70">Carbon/PES revenue</span>
                  <span className="font-semibold">₱500M+/yr</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#065f46] dark:text-[#ecfdf5]/70">Carbon credits</span>
                  <span className="font-semibold">1M+ tCO2e/yr</span>
                </li>
              </ul>
            </div>

            {/* Financial Inclusion */}
            <div className="rounded-lg border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/10 to-white dark:from-[#C9A84C]/10 dark:to-[#022c22]/60 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-[18px] h-[18px] text-[#C9A84C]" />
                <p className="text-sm font-bold text-[#022c22] dark:text-[#ecfdf5]">Financial Inclusion</p>
              </div>
              <ul className="space-y-2 text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
                <li className="flex justify-between">
                  <span className="text-[#065f46] dark:text-[#ecfdf5]/70">Islamic banking assets</span>
                  <span className="font-semibold">₱20B+</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#065f46] dark:text-[#ecfdf5]/70">Adult financial penetration</span>
                  <span className="font-semibold">25%</span>
                </li>
              </ul>
            </div>

            {/* Governance & OS */}
            <div className="rounded-lg border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/10 to-white dark:from-[#C9A84C]/10 dark:to-[#022c22]/60 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Landmark className="w-[18px] h-[18px] text-[#C9A84C]" />
                <p className="text-sm font-bold text-[#022c22] dark:text-[#ecfdf5]">Governance &amp; OS</p>
              </div>
              <ul className="space-y-2 text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
                <li className="flex justify-between">
                  <span className="text-[#065f46] dark:text-[#ecfdf5]/70">Budget execution</span>
                  <span className="font-semibold">90%+</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#065f46] dark:text-[#ecfdf5]/70">Inter-agency coordination</span>
                  <span className="font-semibold">8/10</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#065f46] dark:text-[#ecfdf5]/70">Digital registration</span>
                  <span className="font-semibold">1 day</span>
                </li>
              </ul>
            </div>

            {/* Infrastructure */}
            <div className="rounded-lg border border-[#C9A84C]/20 bg-gradient-to-br from-[#C9A84C]/10 to-white dark:from-[#C9A84C]/10 dark:to-[#022c22]/60 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-[18px] h-[18px] text-[#C9A84C]" />
                <p className="text-sm font-bold text-[#022c22] dark:text-[#ecfdf5]">Infrastructure</p>
              </div>
              <ul className="space-y-2 text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
                <li className="flex justify-between">
                  <span className="text-[#065f46] dark:text-[#ecfdf5]/70">Electrification</span>
                  <span className="font-semibold">100%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#065f46] dark:text-[#ecfdf5]/70">Broadband households</span>
                  <span className="font-semibold">85%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-[#065f46] dark:text-[#ecfdf5]/70">Logistics cost reduction</span>
                  <span className="font-semibold">30%</span>
                </li>
              </ul>
            </div>
          </div>

          {/* q13_2_targets_realistic */}
          <div className="space-y-3 pt-4 border-t border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              How realistic are these 2035 targets overall?
            </Label>
            <LikertScale
              value={data.q13_2_targets_realistic}
              onChange={(v) => update("q13_2_targets_realistic", v)}
              labels={["Unrealistic", "Slightly unrealistic", "Moderately realistic", "Realistic", "Fully realistic"]}
              name="targets_realistic"
            />
          </div>
        </CardContent>
      </Card>

      {/* ── BLOCK 4: Risk Assessment Matrix ─────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#C9A84C]" />
            Risk Assessment Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            The IEDS implementation carries risks across three tiers. Each risk is
            paired with a proposed mitigation mechanism. Please rate your level of
            concern for each risk category.
          </p>

          {/* HIGH RISKS */}
          <div className="rounded-lg border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-[18px] h-[18px] text-red-600 dark:text-red-400" />
              <p className="text-sm font-bold text-red-700 dark:text-red-300 uppercase tracking-wide">
                High Risks
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 min-w-[6px] h-[6px] rounded-full bg-red-500" />
                <div>
                  <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5]">
                    Inter-agency coordination complexity
                  </p>
                  <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">
                    Mitigation: Bangsamoro Investment Command Center
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 min-w-[6px] h-[6px] rounded-full bg-red-500" />
                <div>
                  <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5]">
                    Fiscal mobilization &amp; sequencing slippage
                  </p>
                  <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">
                    Mitigation: Trigger-based budgeting, 20% contingency
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* q13_3_high_risk_concern */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              How concerned are you about HIGH risks?
            </Label>
            <LikertScale
              value={data.q13_3_high_risk_concern}
              onChange={(v) => update("q13_3_high_risk_concern", v)}
              labels={["Not concerned", "Slightly concerned", "Moderately concerned", "Concerned", "Very concerned"]}
              name="high_risk_concern"
            />
          </div>

          {/* MEDIUM RISKS */}
          <div className="rounded-lg border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-[18px] h-[18px] text-amber-600 dark:text-amber-400" />
              <p className="text-sm font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide">
                Medium Risks
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 min-w-[6px] h-[6px] rounded-full bg-amber-500" />
                <div>
                  <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5]">
                    Standards recognition &amp; market access
                  </p>
                  <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">
                    Mitigation: Early SMIIC engagement, digital traceability
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 min-w-[6px] h-[6px] rounded-full bg-amber-500" />
                <div>
                  <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5]">
                    Climate &amp; security shocks
                  </p>
                  <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">
                    Mitigation: Climate-resilient design, takaful products
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* q13_4_medium_risk_concern */}
          <div className="space-y-3 pb-6 border-b border-[#C9A84C]/20">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              How concerned are you about MEDIUM risks?
            </Label>
            <LikertScale
              value={data.q13_4_medium_risk_concern}
              onChange={(v) => update("q13_4_medium_risk_concern", v)}
              labels={["Not concerned", "Slightly concerned", "Moderately concerned", "Concerned", "Very concerned"]}
              name="medium_risk_concern"
            />
          </div>

          {/* LOW RISKS */}
          <div className="rounded-lg border border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-[18px] h-[18px] text-green-600 dark:text-green-400" />
              <p className="text-sm font-bold text-green-700 dark:text-green-300 uppercase tracking-wide">
                Low Risks
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 min-w-[6px] h-[6px] rounded-full bg-green-500" />
                <div>
                  <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5]">
                    Cultural identity misalignment
                  </p>
                  <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">
                    Mitigation: Khalifa stewardship, community benefit-sharing
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* q13_5_low_risk_concern */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              How concerned are you about LOW risks?
            </Label>
            <LikertScale
              value={data.q13_5_low_risk_concern}
              onChange={(v) => update("q13_5_low_risk_concern", v)}
              labels={["Not concerned", "Slightly concerned", "Moderately concerned", "Concerned", "Very concerned"]}
              name="low_risk_concern"
            />
          </div>
        </CardContent>
      </Card>

      {/* ── BLOCK 5: Respondent Budget Priority ─────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#C9A84C]" />
            Your Budget Priorities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            Given the ₱120-160 billion total capital envelope, share your views on
            where the largest share should be directed and how the funding should
            be structured.
          </p>

          {/* q13_6_budget_priority_phase */}
          <div>
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              Which phase deserves the HIGHEST budget priority?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {[
                { label: "Sequence A (Activate)", value: "activate" },
                { label: "Sequence B (Scale)", value: "scale" },
                { label: "Sequence C (Consolidate)", value: "consolidate" },
                { label: "Equal across all", value: "equal" },
              ].map((opt) => (
                <Button
                  key={opt.value}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left transition-all",
                    data.q13_6_budget_priority_phase === opt.value
                      ? activeBtnClass
                      : inactiveBtnClass
                  )}
                  onClick={() => update("q13_6_budget_priority_phase", opt.value)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>

          {/* q13_7_budget_priority_cluster */}
          <div>
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              Which cluster deserves the LARGEST share?
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {["Foundations", "Transformers", "Enablers", "Connectors", "Financiers", "Operating Systems"].map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-center h-auto py-3 text-sm text-center transition-all",
                    data.q13_7_budget_priority_cluster === opt
                      ? activeBtnClass
                      : inactiveBtnClass
                  )}
                  onClick={() => update("q13_7_budget_priority_cluster", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {/* q13_8_blended_finance_opinion */}
          <div>
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-3 block">
              Should BARMM increase reliance on blended finance (ODA + private capital)?
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {["Strongly agree", "Agree", "Neutral", "Disagree"].map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left transition-all",
                    data.q13_8_blended_finance_opinion === opt
                      ? activeBtnClass
                      : inactiveBtnClass
                  )}
                  onClick={() => update("q13_8_blended_finance_opinion", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Section13_PriorityActions;
