// src/components/strategic/Section8_Financiers.tsx
// BIRD 2026–2035 · Section 8: Cluster 5 — Financiers
// Updated: 2026-07-23 · Strict shadcn/ui components, comprehensive images & SWOT

import React from "react";
import { Landmark, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SurveySchemaType } from "@/lib/survey-schema";
import { BIRD_IMAGES } from "@/lib/bird-urls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type Section8Data = Pick<
  SurveySchemaType,
  | "q_s8_domestic_halal_impact"
  | "q_s8_domestic_halal_likelihood"
  | "q_s8_youth_pop_impact"
  | "q_s8_youth_pop_likelihood"
  | "q_s8_policy_recognition_impact"
  | "q_s8_policy_recognition_likelihood"
  | "q_s8_islamic_finance_fw_impact"
  | "q_s8_islamic_finance_fw_likelihood"
  | "q_s8_peace_dividend_impact"
  | "q_s8_peace_dividend_likelihood"
  | "q_s8_infra_deficits_impact"
  | "q_s8_infra_deficits_likelihood"
  | "q_s8_literacy_impact"
  | "q_s8_literacy_likelihood"
  | "q_s8_financial_penetration_impact"
  | "q_s8_financial_penetration_likelihood"
  | "q_s8_fragmented_policy_impact"
  | "q_s8_fragmented_policy_likelihood"
  | "q_s8_skills_mismatch_impact"
  | "q_s8_skills_mismatch_likelihood"
  | "q_s8_global_halal_impact"
  | "q_s8_global_halal_likelihood"
  | "q_s8_renewable_invest_impact"
  | "q_s8_renewable_invest_likelihood"
  | "q_s8_asean_halal_impact"
  | "q_s8_asean_halal_likelihood"
  | "q_s8_islamic_ecosystem_impact"
  | "q_s8_islamic_ecosystem_likelihood"
  | "q_s8_uae_corridor_impact"
  | "q_s8_uae_corridor_likelihood"
  | "q_s8_halal_competition_impact"
  | "q_s8_halal_competition_likelihood"
  | "q_s8_halal_standards_impact"
  | "q_s8_halal_standards_likelihood"
  | "q_s8_security_incidents_impact"
  | "q_s8_security_incidents_likelihood"
  | "q_s8_political_transition_impact"
  | "q_s8_political_transition_likelihood"
  | "q_s8_big_man"
  | "q_s8_big_man_followup"
  | "q_s8_shifting_burden"
  | "q_s8_shifting_followup"
  | "q8_1_finance_tier_priority"
  | "q8_2_roadmap_achievable"
  | "q8_3_priority_action"
  | "q8_4_islamic_authority"
>;

interface Section8Props {
  data: Section8Data;
  onChange: (data: Section8Data) => void;
}

export const Section8_Financiers: React.FC<Section8Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section8Data>(field: K, value: Section8Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  const activeBtn = "bg-[#1B4D3E] text-white border-[#1B4D3E] hover:bg-[#1B4D3E]/90";
  const inactiveBtn = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";
  const activeScale = "bg-[#C9A84C] text-white border-[#C9A84C] hover:bg-[#C9A84C]/90";
  const inactiveScale = "bg-white text-[#022c22] border-[#C9A84C]/30 hover:border-[#C9A84C]";

  const swotFactors = [
    // Strengths
    {
      id: "domestic_halal",
      label: "S4: Large Domestic Halal Market",
      desc: "5.69 million Muslim consumers create strong built-in demand for Shariah-compliant financial products.",
      impactField: "q_s8_domestic_halal_impact" as keyof Section8Data,
      likelihoodField: "q_s8_domestic_halal_likelihood" as keyof Section8Data,
    },
    {
      id: "youth_pop",
      label: "S5: Young and Growing Population",
      desc: "3.43% annual growth creates a large future workforce and consumer base needing financial services.",
      impactField: "q_s8_youth_pop_impact" as keyof Section8Data,
      likelihoodField: "q_s8_youth_pop_likelihood" as keyof Section8Data,
    },
    {
      id: "policy_recognition",
      label: "S7: Growing Policy Recognition",
      desc: "BOL, BIC, and SIPP creating stronger investment climate for Islamic finance.",
      impactField: "q_s8_policy_recognition_impact" as keyof Section8Data,
      likelihoodField: "q_s8_policy_recognition_likelihood" as keyof Section8Data,
    },
    {
      id: "islamic_finance_fw",
      label: "S9: Islamic Finance Legal Framework",
      desc: "RA 11439 allows Shariah-compliant banking and finance through Al-Amanah and CARD Islamic.",
      impactField: "q_s8_islamic_finance_fw_impact" as keyof Section8Data,
      likelihoodField: "q_s8_islamic_finance_fw_likelihood" as keyof Section8Data,
    },
    {
      id: "peace_dividend",
      label: "S12: Peace Dividend Momentum",
      desc: "Improved security in select zones creates space for financial institutions to expand.",
      impactField: "q_s8_peace_dividend_impact" as keyof Section8Data,
      likelihoodField: "q_s8_peace_dividend_likelihood" as keyof Section8Data,
    },
    // Weaknesses
    {
      id: "infra_deficits",
      label: "W1: Critical Infrastructure Deficits",
      desc: "Limited digital connectivity restricts mobile banking and fintech reach in island provinces.",
      impactField: "q_s8_infra_deficits_impact" as keyof Section8Data,
      likelihoodField: "q_s8_infra_deficits_likelihood" as keyof Section8Data,
    },
    {
      id: "literacy",
      label: "W4: Low Functional Literacy Rate",
      desc: "59.3% literacy rate limits financial literacy and capacity to use formal banking services.",
      impactField: "q_s8_literacy_impact" as keyof Section8Data,
      likelihoodField: "q_s8_literacy_likelihood" as keyof Section8Data,
    },
    {
      id: "financial_penetration",
      label: "W5: Low Financial System Penetration",
      desc: "Many people and MSMEs cannot access formal banking or credit services.",
      impactField: "q_s8_financial_penetration_impact" as keyof Section8Data,
      likelihoodField: "q_s8_financial_penetration_likelihood" as keyof Section8Data,
    },
    {
      id: "fragmented_policy",
      label: "W6: Fragmented Policy Frameworks",
      desc: "Islamic banking, halal certification, and trade agencies operate in silos.",
      impactField: "q_s8_fragmented_policy_impact" as keyof Section8Data,
      likelihoodField: "q_s8_fragmented_policy_likelihood" as keyof Section8Data,
    },
    {
      id: "skills_mismatch",
      label: "W8: Skills Mismatch",
      desc: "TVIs not aligned with Islamic finance and fintech industry needs.",
      impactField: "q_s8_skills_mismatch_impact" as keyof Section8Data,
      likelihoodField: "q_s8_skills_mismatch_likelihood" as keyof Section8Data,
    },
    // Opportunities
    {
      id: "global_halal",
      label: "O1: Global Halal Market Growth",
      desc: "USD 2.3 trillion market creating demand for Shariah-compliant trade finance and investment products.",
      impactField: "q_s8_global_halal_impact" as keyof Section8Data,
      likelihoodField: "q_s8_global_halal_likelihood" as keyof Section8Data,
    },
    {
      id: "renewable_invest",
      label: "O2: Renewable Energy Investment Opportunities",
      desc: "Growing interest in solar, hydro, and biomass projects needing Islamic project finance.",
      impactField: "q_s8_renewable_invest_impact" as keyof Section8Data,
      likelihoodField: "q_s8_renewable_invest_likelihood" as keyof Section8Data,
    },
    {
      id: "asean_halal",
      label: "O3: ASEAN Halal Economy",
      desc: "USD 1.38 trillion market. BARMM can position as an Islamic finance hub for BIMP-EAGA.",
      impactField: "q_s8_asean_halal_impact" as keyof Section8Data,
      likelihoodField: "q_s8_asean_halal_likelihood" as keyof Section8Data,
    },
    {
      id: "islamic_ecosystem",
      label: "O4: Islamic Finance Ecosystem Growth",
      desc: "Global Shariah-compliant funds seeking ethical destinations — BARMM can be a hub.",
      impactField: "q_s8_islamic_ecosystem_impact" as keyof Section8Data,
      likelihoodField: "q_s8_islamic_ecosystem_likelihood" as keyof Section8Data,
    },
    {
      id: "uae_corridor",
      label: "O6: UAE/GCC Halal Export Corridor",
      desc: "Partnerships connecting BARMM to Middle Eastern Islamic finance centers.",
      impactField: "q_s8_uae_corridor_impact" as keyof Section8Data,
      likelihoodField: "q_s8_uae_corridor_likelihood" as keyof Section8Data,
    },
    // Threats
    {
      id: "halal_competition",
      label: "T2: Competition from Established Halal Hubs",
      desc: "Malaysia's Islamic finance ecosystem is decades ahead — BARMM must differentiate.",
      impactField: "q_s8_halal_competition_impact" as keyof Section8Data,
      likelihoodField: "q_s8_halal_competition_likelihood" as keyof Section8Data,
    },
    {
      id: "halal_standards",
      label: "T3: Halal Standards Recognition Risk",
      desc: "BARMM's Islamic finance products not yet aligned with OIC/SMIIC international standards.",
      impactField: "q_s8_halal_standards_impact" as keyof Section8Data,
      likelihoodField: "q_s8_halal_standards_likelihood" as keyof Section8Data,
    },
    {
      id: "security_incidents",
      label: "T4: Residual Security Incidents",
      desc: "Security concerns limit willingness of financial institutions to establish presence in remote areas.",
      impactField: "q_s8_security_incidents_impact" as keyof Section8Data,
      likelihoodField: "q_s8_security_incidents_likelihood" as keyof Section8Data,
    },
    {
      id: "political_transition",
      label: "T5: Political Transition Uncertainties",
      desc: "Elections and leadership changes may disrupt Islamic finance policy continuity.",
      impactField: "q_s8_political_transition_impact" as keyof Section8Data,
      likelihoodField: "q_s8_political_transition_likelihood" as keyof Section8Data,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Landmark className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 8: Cluster 5 — Financiers: Powering the Bloodstream of the Economy
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        The Financiers cluster shows how Islamic finance underpins Bangsamoro's economic system through ethical and faith-aligned capital mechanisms — from Shariah banking to microfinance.
      </p>

      {/* 1. Cluster Banner */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30 shadow-lg group">
        <img
          src={BIRD_IMAGES.cluster5Financiers.url}
          alt={BIRD_IMAGES.cluster5Financiers.alt}
          className="w-full h-auto max-h-[500px] object-contain transition-transform group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <p className="text-xs italic text-white/70">
            Cluster 5 | Financiers: Powering the Bloodstream of the Economy
          </p>
        </div>
      </div>

      {/* 2. The Capital Bloodstream */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
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
          <p className="text-sm text-[#022c22]">
            Three-tier pyramid: <strong>Macro-Capital</strong> (Islamic Banking & Sukuk for infrastructure), <strong>Risk Mitigation</strong> (Takaful for agriculture/climate shocks), <strong>Micro-Access</strong> (Islamic Microfinance & Waqf for farmers/MSMEs).
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            Which tier of Shariah-compliant finance should be the highest priority for BARMM?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {["Macro-Capital (Sukuk, infrastructure banking)", "Risk Mitigation (Takaful, insurance)", "Micro-Access (Microfinance, Waqf for MSMEs)"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q8_1_finance_tier_priority === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q8_1_finance_tier_priority", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 3. Islamic Finance Roadmap */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base text-[#022c22]">
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
          <p className="text-sm text-[#022c22]">
            Six progressive layers: Strengthen Islamic Banking, Enhance Microfinance & Waqf, Establish Takaful, Facilitate Sukuk Capital Market, Harness Fintech, Develop Human Capital. Timeline: 2024–2025 (Foundation), Mid-Term (Takaful), 2028 Goal (Functional System & Tax Neutrality).
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            On a scale of 1–5, how achievable is the 2028 goal of a functional Islamic finance system with tax neutrality in BARMM?
          </Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((v) => (
              <Button
                key={v}
                type="button"
                variant="outline"
                size="icon"
                className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data.q8_2_roadmap_achievable === v ? activeScale : inactiveScale)}
                onClick={() => update("q8_2_roadmap_achievable", v)}
              >
                {v}
              </Button>
            ))}
          </div>
          <p className="text-xs text-[#065f46]">1 = Not achievable, 5 = Very achievable</p>
          
          <Label className="text-sm font-medium text-[#022c22] block mt-4">
            What is the single most important action to accelerate Islamic finance adoption in BARMM?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {["Strengthen regulatory framework (tax neutrality, Shariah governance)", "Build human capital (Islamic finance education, training)", "Expand digital infrastructure (fintech, mobile banking)", "Promote awareness (financial literacy, community outreach)", "Attract foreign Islamic banks (incentives, partnerships)"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q8_3_priority_action === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q8_3_priority_action", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>

          <Label className="text-sm font-medium text-[#022c22] block mt-4">
            Should BARMM establish a dedicated Islamic Finance Authority (similar to Malaysia's Bank Negara Islamic branch)?
          </Label>
          <div className="grid grid-cols-1 gap-3">
            {["Yes — essential for coordination and governance", "Yes — but only after basic banking is strengthened", "No — existing agencies can handle it", "No — too resource-intensive at this stage"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q8_4_islamic_authority === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q8_4_islamic_authority", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 4. SWOT Scale Questions */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-700">
              SWOT
            </span>
            Financiers Cluster: Strengths, Weaknesses, Opportunities, Threats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-xs text-[#065f46] italic">
            Rate each factor: Impact (1 = very small, 5 = very large) × Likelihood (1 = very unlikely, 5 = very likely)
          </p>
          {swotFactors.map((factor, idx) => (
            <div key={factor.id} className={cn("space-y-3", idx < swotFactors.length - 1 && "pb-6 border-b border-[#C9A84C]/20")}>
              <p className="text-sm font-medium text-[#022c22]">
                <strong>{factor.label}.</strong> {factor.desc}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46]">Impact (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button
                        key={v}
                        type="button"
                        variant="outline"
                        size="icon"
                        className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data[factor.impactField] === v ? activeScale : inactiveScale)}
                        onClick={() => update(factor.impactField, v)}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-[#065f46]">Likelihood (1–5)</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <Button
                        key={v}
                        type="button"
                        variant="outline"
                        size="icon"
                        className={cn("w-12 h-12 rounded-lg text-sm font-semibold", data[factor.likelihoodField] === v ? activeScale : inactiveScale)}
                        onClick={() => update(factor.likelihoodField, v)}
                      >
                        {v}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 5. Systems Archetype: The Big Man */}
      <Card className="border-2 border-amber-500/40 bg-amber-50/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Archetype: The Big Man
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/11-BM.png"
              alt="The Big Man Archetype"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            Concentration of power around dominant leaders creates a patronage system where financial resources flow through political networks rather than merit-based allocation. Public budgets are consumed by administrative bloat rather than productive investment.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            How accurately does the &quot;Big Man&quot; archetype reflect the political and clan dynamics affecting access to capital and financial services in BARMM?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q_s8_big_man === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q_s8_big_man", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
          {(data.q_s8_big_man === "Very accurately" || data.q_s8_big_man === "Somewhat accurately") && (
            <div className="mt-4 pt-4 border-t border-[#C9A84C]/20 space-y-3">
              <Label className="text-sm font-medium text-[#022c22] block">
                Which of the three reinforcing loops is most active?
              </Label>
              <Textarea
                rows={2}
                value={data.q_s8_big_man_followup || ""}
                onChange={(e) => update("q_s8_big_man_followup", e.target.value)}
                placeholder="Describe the most active reinforcing loop..."
                className="w-full border-[#C9A84C]/30"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* 6. Systems Archetype: Shifting the Burden */}
      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Archetype: Shifting the Burden
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-xl border border-[#C9A84C]/30">
            <img
              src="https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/validation-survey-images/Shifting%20the%20Burden.png"
              alt="Shifting the Burden Archetype"
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-[#022c22]">
            Short-term capital injections and emergency funding replace deeper financial system reforms. The system becomes dependent on external capital while local institutional capacity for financial intermediation weakens.
          </p>
          <Label className="text-sm font-medium text-[#022c22] block">
            How accurately does &quot;Shifting the Burden&quot; reflect how BARMM addresses capital access and financial inclusion challenges?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {["Very accurately", "Somewhat accurately", "Needs revision", "Not accurate"].map((opt) => (
              <Button
                key={opt}
                type="button"
                variant="outline"
                className={cn("justify-start h-auto py-3 text-sm text-left", data.q_s8_shifting_burden === opt ? activeBtn : inactiveBtn)}
                onClick={() => update("q_s8_shifting_burden", opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
          {(data.q_s8_shifting_burden === "Very accurately" || data.q_s8_shifting_burden === "Somewhat accurately") && (
            <div className="mt-4 pt-4 border-t border-[#C9A84C]/20 space-y-3">
              <Label className="text-sm font-medium text-[#022c22] block">
                Describe a case where a short-term capital fix either led to long-term reform or failed and the problem returned.
              </Label>
              <Textarea
                rows={2}
                value={data.q_s8_shifting_followup || ""}
                onChange={(e) => update("q_s8_shifting_followup", e.target.value)}
                placeholder="Describe a case of short-term capital fix..."
                className="w-full border-[#C9A84C]/30"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Section8_Financiers;
