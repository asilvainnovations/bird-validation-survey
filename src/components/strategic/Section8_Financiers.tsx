import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Landmark,
  TrendingUp,
  Target,
  AlertTriangle,
} from "lucide-react";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import {
  calculateStrengthRI,
  calculateWeaknessRisk,
  calculateOpportunityRI,
  calculateThreatVI,
} from "@/lib/formulas";

// ── Types (exact runtime contract with SurveyWizard.tsx s8 state) ────────────
export interface Section8Data {
  q8_1_finance_tier_priority: string;
  q8_2_roadmap_achievable?: number;
  q8_3_priority_action: string;
  q8_4_islamic_authority: string;
  q8_arch_shifting_burden_accuracy: string;
  q8_arch_shifting_burden_followup: string;
  // Strengths
  q8_s1_islamic_finance_framework_impact?: number;
  q8_s1_islamic_finance_framework_likelihood?: number;
  // Weaknesses
  q8_w1_financial_penetration_impact?: number;
  q8_w1_financial_penetration_likelihood?: number;
  // Opportunities
  q8_o1_islamic_ecosystem_impact?: number;
  q8_o1_islamic_ecosystem_likelihood?: number;
}

interface Section8Props {
  data: Section8Data;
  onChange: (data: Section8Data) => void;
}

// ── Design tokens ────────────────────────────────────────────────────────────
const activeBtn =
  "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90 dark:bg-[#1B4D3E] dark:text-white dark:border-[#1B4D3E]";
const inactiveBtn =
  "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C] hover:bg-[#ecfdf5]/30 dark:hover:bg-[#C9A84C]/10";
const activeScale =
  "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
const inactiveScale =
  "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]";

const archetypeOptions = [
  "Very accurately",
  "Somewhat accurately",
  "Needs revision",
  "Not accurate",
];

// ═══════════════════════════════════════════════════════════════════════════════
export const Section8_Financiers: React.FC<Section8Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section8Data>(
    field: K,
    value: Section8Data[K]
  ) => onChange({ ...data, [field]: value });

  const renderScale = (field: keyof Section8Data) => (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((v) => (
        <Button
          key={v}
          type="button"
          variant="outline"
          size="icon"
          className={cn(
            "w-12 h-12 rounded-lg border text-sm font-semibold transition-all",
            data[field] === v ? activeScale : inactiveScale
          )}
          onClick={() => update(field, v as any)}
        >
          {v}
        </Button>
      ))}
    </div>
  );

  const renderSwotPair = (
    label: string,
    desc: string,
    impactField: keyof Section8Data,
    likelihoodField: keyof Section8Data,
    category: "strength" | "weakness" | "opportunity" | "threat"
  ) => {
    const impact = data[impactField] as number | undefined;
    const likelihood = data[likelihoodField] as number | undefined;
    let score: number | null = null;
    let scoreLabel = "";
    let badgeClass = "";

    if (impact && likelihood) {
      switch (category) {
        case "strength":
          score = calculateStrengthRI(impact, likelihood);
          scoreLabel = "RI";
          badgeClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
          break;
        case "weakness":
          score = calculateWeaknessRisk(impact, likelihood);
          scoreLabel = "Risk";
          badgeClass = "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300";
          break;
        case "opportunity":
          score = calculateOpportunityRI(impact, likelihood);
          scoreLabel = "RI";
          badgeClass = "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300";
          break;
        case "threat":
          score = calculateThreatVI(impact, likelihood);
          scoreLabel = "VI";
          badgeClass = "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
          break;
      }
    }

    return (
      <div className="space-y-4 p-4 rounded-lg border border-[#C9A84C]/20 bg-emerald-50/40 dark:bg-[#1B4D3E]/10">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#C9A84C]" />
          <p className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            {label}
          </p>
          {score !== null && (
            <Badge variant="secondary" className={cn("ml-auto border", badgeClass)}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {scoreLabel}: {score.toFixed(2)}
            </Badge>
          )}
        </div>
        <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/70">{desc}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs font-medium text-[#065f46] dark:text-[#ecfdf5]/70 mb-2 block">
              Impact (1–5)
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "w-10 h-10 rounded-lg border text-sm font-semibold transition-all",
                    impact === v
                      ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                      : "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                  onClick={() => update(impactField, v as any)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium text-[#065f46] dark:text-[#ecfdf5]/70 mb-2 block">
              Likelihood (1–5)
            </Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => (
                <Button
                  key={v}
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "w-10 h-10 rounded-lg border text-sm font-semibold transition-all",
                    likelihood === v
                      ? "bg-[#1B4D3E] text-white border-[#1B4D3E]"
                      : "bg-white dark:bg-[#022c22]/50 text-[#022c22] dark:text-[#ecfdf5] border-[#C9A84C]/30 hover:border-[#C9A84C]"
                  )}
                  onClick={() => update(likelihoodField, v as any)}
                >
                  {v}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <Landmark className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
          Section 8: Cluster 5 — Financiers: Powering the Bloodstream of the Economy
        </h2>
      </div>
      <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 -mt-2 max-w-3xl">
        The Financiers cluster shows how Islamic finance underpins Bangsamoro's economic system through ethical and faith-aligned capital mechanisms — from Shariah banking to microfinance.
      </p>

      {/* ── 1. Cluster Banner ────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.cluster5Financiers.url}
          alt={BIRD_IMAGES.cluster5Financiers.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            {BIRD_IMAGES.cluster5Financiers.description}
          </p>
        </div>
      </div>

      {/* ── 2. The Capital Bloodstream ───────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            The Capital Bloodstream: Scaling Shariah-Compliant Finance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Financiers.png"
              alt="The Capital Bloodstream"
              className="w-full h-auto max-h-[500px] object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            Three-tier pyramid: <strong>Macro-Capital</strong> (Islamic Banking & Sukuk for infrastructure), <strong>Risk Mitigation</strong> (Takaful for agriculture/climate shocks), <strong>Micro-Access</strong> (Islamic Microfinance & Waqf for farmers/MSMEs).
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            Which tier of Shariah-compliant finance should be the highest priority for BARMM?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {[
              "Macro-Capital (Sukuk, infrastructure banking)",
              "Risk Mitigation (Takaful, insurance)",
              "Micro-Access (Microfinance, Waqf for MSMEs)",
            ].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left",
                  data.q8_1_finance_tier_priority === opt ? activeBtn : inactiveBtn
                )}
                onClick={() => update("q8_1_finance_tier_priority", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 3. Islamic Finance Roadmap ───────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Islamic Finance Roadmap (2024–2028)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Islamic%20Finance%20Roadmap.png"
              alt="Islamic Finance Roadmap"
              className="w-full h-auto max-h-[500px] object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
            Six progressive layers: Strengthen Islamic Banking, Enhance Microfinance & Waqf, Establish Takaful, Facilitate Sukuk Capital Market, Harness Fintech, Develop Human Capital. Timeline: 2024–2025 (Foundation), Mid-Term (Takaful), 2028 Goal (Functional System & Tax Neutrality).
          </p>
          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
            How achievable is the 2028 goal of a functional Islamic finance system with tax neutrality in BARMM?
          </Label>
          {renderScale("q8_2_roadmap_achievable")}
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60">1 = Not achievable, 5 = Very achievable</p>

          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block mt-4">
            What is the single most important action to accelerate Islamic finance adoption?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {[
              "Strengthen regulatory framework (tax neutrality, Shariah governance)",
              "Build human capital (Islamic finance education, training)",
              "Expand digital infrastructure (fintech, mobile banking)",
              "Promote awareness (financial literacy, community outreach)",
              "Attract foreign Islamic banks (incentives, partnerships)",
            ].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left",
                  data.q8_3_priority_action === opt ? activeBtn : inactiveBtn
                )}
                onClick={() => update("q8_3_priority_action", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>

          <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block mt-4">
            Should BARMM establish a dedicated Islamic Finance Authority?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {[
              "Yes — essential for coordination and governance",
              "Yes — but only after basic banking is strengthened",
              "No — existing agencies can handle it",
              "No — too resource-intensive at this stage",
            ].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn(
                  "justify-start h-auto py-3 text-sm text-left",
                  data.q8_4_islamic_authority === opt ? activeBtn : inactiveBtn
                )}
                onClick={() => update("q8_4_islamic_authority", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── 4. SWOT Scale Questions ──────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              SWOT
            </span>
            Financiers Cluster: Strengths, Weaknesses, Opportunities, Threats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 italic">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>

          {/* Strengths */}
          {renderSwotPair(
            "S1 — Islamic Finance Legal Framework",
            "RA 11439 enabling Shariah-compliant capital mobilization through institutions like Al-Amanah and CARD Islamic.",
            "q8_s1_islamic_finance_framework_impact",
            "q8_s1_islamic_finance_framework_likelihood",
            "strength"
          )}

          {/* Weaknesses */}
          {renderSwotPair(
            "W1 — Minimal Formal Financial Penetration",
            "Capital access barriers for MSMEs, especially in rural/island areas.",
            "q8_w1_financial_penetration_impact",
            "q8_w1_financial_penetration_likelihood",
            "weakness"
          )}

          {/* Opportunities */}
          {renderSwotPair(
            "O1 — Islamic Finance Ecosystem",
            "Growing global Shariah-compliant capital pool seeking ethical investments.",
            "q8_o1_islamic_ecosystem_impact",
            "q8_o1_islamic_ecosystem_likelihood",
            "opportunity"
          )}
        </CardContent>
      </Card>

      {/* ── 5. Archetype: Shifting the Burden ────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22] dark:text-[#ecfdf5]">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            Archetype: Shifting the Burden
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Shifting%20the%20Burden.png"
              alt="Shifting the Burden Archetype"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90 leading-relaxed">
            BARMM's economic ecosystem faces a problem symptom: limited access to culturally aligned, Shariah-compliant financing despite RA 11439 providing a legal framework. Instead of fully investing in Islamic finance institutions, the region often relies on conventional banking systems as a symptomatic solution. This temporarily meets capital needs but does not resolve the structural gap — creating a self-reinforcing cycle of stagnation where delays reduce investor confidence and demand for Islamic finance products.
          </p>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
              How accurately does "Shifting the Burden" reflect how BARMM addresses capital access and financial inclusion challenges?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {archetypeOptions.map((opt) => (
                <Button
                  key={opt}
                  type="button"
                  variant="outline"
                  className={cn(
                    "justify-start h-auto py-3 text-sm text-left",
                    data.q8_arch_shifting_burden_accuracy === opt ? activeBtn : inactiveBtn
                  )}
                  onClick={() => update("q8_arch_shifting_burden_accuracy", opt)}
                >
                  {opt}
                </Button>
              ))}
            </div>
          </div>

          {(data.q8_arch_shifting_burden_accuracy === "Very accurately" ||
            data.q8_arch_shifting_burden_accuracy === "Somewhat accurately") && (
            <div className="space-y-3 pt-4 border-t border-[#C9A84C]/20 animate-in fade-in slide-in-from-top-2 duration-200">
              <Label className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] block">
                Describe a case where a short-term capital fix either led to long-term reform or failed and the problem returned.
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Led to long-term reform",
                  "Failed and problem returned",
                  "Mixed results",
                ].map((opt) => (
                  <Button
                    key={opt}
                    type="button"
                    variant="outline"
                    className={cn(
                      "justify-start h-auto py-3 text-sm text-left",
                      data.q8_arch_shifting_burden_followup === opt ? activeBtn : inactiveBtn
                    )}
                    onClick={() => update("q8_arch_shifting_burden_followup", opt)}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
              <Textarea
                placeholder="Describe the case in more detail..."
                rows={3}
                value={data.q8_arch_shifting_burden_followup || ""}
                onChange={(e) => update("q8_arch_shifting_burden_followup", e.target.value)}
                className="w-full rounded-lg border border-[#C9A84C]/30 bg-white dark:bg-[#022c22]/50 px-3 py-2 text-sm text-[#022c22] dark:text-[#ecfdf5] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 resize-y"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Section8_Financiers;
