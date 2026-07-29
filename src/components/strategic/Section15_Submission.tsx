// src/components/strategic/Section15_Submission.tsx
// BIRD 2026–2035 · Section 15: Review & Submit
// Updated: 2026-07-30 · Strict alignment with reusable primitives and survey architecture

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, ArrowDown, Mail, ShieldCheck, FileCheck } from "lucide-react";

// ─── REUSABLE PRIMITIVES ─────────────────────────────────────────────────────
import { SectionProgress } from "@/components/primitives/SectionProgress";

// ── Types (exact runtime contract with SurveyWizard.tsx s15 state) ──────────
export interface Section15Data {
  q15_1_confirm_accurate: boolean;
  q15_2_consent_anonymous_use: boolean;
  q15_3_consent_voluntary: boolean;
  q15_4_ready_to_submit: boolean;
}

export const initialSection15Data: Section15Data = {
  q15_1_confirm_accurate: false,
  q15_2_consent_anonymous_use: false,
  q15_3_consent_voluntary: false,
  q15_4_ready_to_submit: false,
};

interface Section15Props {
  data: Section15Data;
  onChange: (data: Section15Data) => void;
}

// Aligned with STEP_LABELS in SurveyWizard.tsx
const SECTIONS_LIST = [
  { num: 0, name: "Welcome & Orientation" },
  { num: 1, name: "Privacy & Consent" },
  { num: 2, name: "Your Profile" },
  { num: 3, name: "Systems Thinking" },
  { num: 4, name: "Cluster 1: Foundations" },
  { num: 5, name: "Cluster 2: Transformers" },
  { num: 6, name: "Cluster 3: Enablers" },
  { num: 7, name: "Cluster 4: Connectors" },
  { num: 8, name: "Cluster 5: Financiers" },
  { num: 9, name: "Operating Systems" },
  { num: 10, name: "IEDS & 3-Phase Plan" },
  { num: 11, name: "Metrics & KPIs" },
  { num: 12, name: "Balanced Scorecard" },
  { num: 13, name: "Priority Actions & Budget" },
  { num: 14, name: "Resources & Engagements" },
  { num: 15, name: "Review & Submit" },
];

// ── Component ────────────────────────────────────────────────────────────────
const Section15_Submission: React.FC<Section15Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section15Data>(field: K, value: Section15Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      {/* ── Section Progress ────────────────────────────────────── */}
      <SectionProgress 
        current={15} 
        total={16} 
        labels={SECTIONS_LIST.map((s) => s.name)} 
      />

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-[#C9A84C]/10 dark:bg-[#C9A84C]/20 p-3 shrink-0">
          <Send className="h-6 w-6 text-[#C9A84C]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
            Section 15: Review & Submit
          </h2>
          <p className="mt-1 text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed max-w-3xl">
            Please review your responses across all sections before submitting.
            Your feedback is invaluable to the Bangsamoro Investment Roadmap
            2026–2035.
          </p>
        </div>
      </div>

      {/* ── BLOCK 1: Completion Summary ───────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-[#C9A84C]" />
            Completion Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            Below is a summary of all survey sections. All sections have been
            visited. Please ensure you have answered the questions most relevant
            to your expertise.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SECTIONS_LIST.map((section) => (
              <div
                key={section.num}
                className="flex items-center gap-3 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3"
              >
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
                  Step {section.num}: {section.name}
                </span>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-[#C9A84C]/10 dark:bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-4 py-3">
            <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 italic">
              All sections have been visited. Please ensure you have answered the
              questions most relevant to your expertise.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ── BLOCK 2: Final Consent ────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#C9A84C]" />
            Final Consent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            Please confirm the following declarations before submitting your
            response. All checkboxes must be ticked to proceed with submission.
          </p>

          <div className="space-y-4">
            {/* Checkbox 1 */}
            <label
              htmlFor="confirm-accurate"
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer",
                data.q15_1_confirm_accurate
                  ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700"
                  : "bg-white dark:bg-[#022c22]/60 border-[#C9A84C]/20 hover:border-[#C9A84C]/40"
              )}
            >
              <input
                id="confirm-accurate"
                type="checkbox"
                checked={data.q15_1_confirm_accurate}
                onChange={(e) => update("q15_1_confirm_accurate", e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-[#C9A84C] text-[#1B4D3E] accent-[#1B
