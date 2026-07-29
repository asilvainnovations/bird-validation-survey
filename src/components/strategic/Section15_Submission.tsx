// src/components/strategic/Section15_Submission.tsx
// BIRD 2026–2035 · Section 15: Review & Submit
// Updated: 2026-07-30 · Fixed import paths and primitive APIs

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, CheckCircle, FileCheck, ShieldCheck } from "lucide-react";

// ─── REUSABLE PRIMITIVES ─────────────────────────────────────────────────────
import { SectionProgress } from "@/lib/primitives/SectionProgress";

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

  const allChecked = data.q15_1_confirm_accurate && data.q15_2_consent_anonymous_use && data.q15_3_consent_voluntary && data.q15_4_ready_to_submit;

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6">
      {/* ── Section Progress ────────────────────────────────────── */}
      <SectionProgress
        currentSection={15}
        totalSections={16}
        sectionLabel="Review & Submit"
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
                className="w-5 h-5 mt-0.5 rounded border-[#C9A84C] text-[#1B4D3E] accent-[#1B4D3E] shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
                  I confirm that my responses are accurate and reflect my true assessment.
                </p>
              </div>
            </label>

            {/* Checkbox 2 */}
            <label
              htmlFor="consent-anonymous"
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer",
                data.q15_2_consent_anonymous_use
                  ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700"
                  : "bg-white dark:bg-[#022c22]/60 border-[#C9A84C]/20 hover:border-[#C9A84C]/40"
              )}
            >
              <input
                id="consent-anonymous"
                type="checkbox"
                checked={data.q15_2_consent_anonymous_use}
                onChange={(e) => update("q15_2_consent_anonymous_use", e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-[#C9A84C] text-[#1B4D3E] accent-[#1B4D3E] shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
                  I consent to the anonymous use of my responses for research and planning purposes.
                </p>
              </div>
            </label>

            {/* Checkbox 3 */}
            <label
              htmlFor="consent-voluntary"
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer",
                data.q15_3_consent_voluntary
                  ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700"
                  : "bg-white dark:bg-[#022c22]/60 border-[#C9A84C]/20 hover:border-[#C9A84C]/40"
              )}
            >
              <input
                id="consent-voluntary"
                type="checkbox"
                checked={data.q15_3_consent_voluntary}
                onChange={(e) => update("q15_3_consent_voluntary", e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-[#C9A84C] text-[#1B4D3E] accent-[#1B4D3E] shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
                  I understand that my participation is voluntary and I may withdraw at any time.
                </p>
              </div>
            </label>

            {/* Checkbox 4 */}
            <label
              htmlFor="ready-submit"
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer",
                data.q15_4_ready_to_submit
                  ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700"
                  : "bg-white dark:bg-[#022c22]/60 border-[#C9A84C]/20 hover:border-[#C9A84C]/40"
              )}
            >
              <input
                id="ready-submit"
                type="checkbox"
                checked={data.q15_4_ready_to_submit}
                onChange={(e) => update("q15_4_ready_to_submit", e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-[#C9A84C] text-[#1B4D3E] accent-[#1B4D3E] shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
                  I am ready to submit my survey response.
                </p>
              </div>
            </label>
          </div>

          {/* Status indicator */}
          <div className={cn(
            "rounded-lg px-4 py-3 text-center text-sm font-medium transition-all",
            allChecked
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
              : "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700"
          )}>
            {allChecked
              ? "✓ All declarations confirmed. You may now submit your survey."
              : "⚠ Please tick all four declarations above to enable submission."}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Section15_Submission;
