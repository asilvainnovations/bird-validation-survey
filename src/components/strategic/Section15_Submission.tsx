import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, ArrowDown, Mail, ShieldCheck, FileCheck, AlertTriangle } from "lucide-react";
import type { MissingField } from "@/lib/requiredFields";

// ── Types ────────────────────────────────────────────────────────────────────
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
  /** Populated by SurveyWizard after a failed submission attempt (see
   * requiredFields.ts) — empty in normal use, and always empty in today's
   * pilot configuration unless someone hasn't consented. */
  missingRequiredFields?: MissingField[];
  /** Lets the "Go to Section X" buttons below actually navigate there. */
  onJumpToStep?: (step: number) => void;
}

const SECTIONS_LIST = [
  { num: 1, name: "Welcome & Orientation" },
  { num: 2, name: "Privacy & Consent" },
  { num: 3, name: "Your Profile" },
  { num: 4, name: "Systems Thinking & BEIE" },
  { num: 5, name: "Cluster 1: Foundations" },
  { num: 6, name: "Cluster 2: Transformers" },
  { num: 7, name: "Cluster 3: Enablers" },
  { num: 8, name: "Cluster 4: Connectors" },
  { num: 9, name: "Cluster 5: Financiers" },
  { num: 10, name: "Operating Systems" },
  { num: 11, name: "IEDS & Three-Phase Implementation" },
  { num: 12, name: "Metrics Architecture" },
  { num: 13, name: "Balanced Scorecard" },
  { num: 14, name: "Priority Actions & Budget" },
  { num: 15, name: "Resources & Engagements" },
];

// ── Component ────────────────────────────────────────────────────────────────
const Section15_Submission: React.FC<Section15Props> = ({
  data,
  onChange,
  missingRequiredFields = [],
  onJumpToStep,
}) => {
  const update = <K extends keyof Section15Data>(field: K, value: Section15Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      {/* ── MISSING REQUIRED ANSWERS (only shown after a blocked submit) ── */}
      {missingRequiredFields.length > 0 && (
        <Card className="border-2 border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-900/20">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-red-700 dark:text-red-300 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {missingRequiredFields.length === 1
                ? "1 Required Question Needs an Answer"
                : `${missingRequiredFields.length} Required Questions Need Answers`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-700 dark:text-red-300/90 mb-4">
              Please answer the following before submitting:
            </p>
            <div className="space-y-2">
              {missingRequiredFields.map((field) => (
                <div
                  key={field.key}
                  className="flex items-center justify-between gap-3 rounded-lg border border-red-300 dark:border-red-700 bg-white dark:bg-[#022c22]/60 px-4 py-3"
                >
                  <span className="text-sm text-[#022c22] dark:text-[#ecfdf5]">
                    {field.label}
                  </span>
                  {onJumpToStep && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="shrink-0 border-red-400 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40"
                      onClick={() => onJumpToStep(field.step)}
                    >
                      Go to Section {field.step}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── HEADER ─────────────────────────────────────────── */}
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-[#C9A84C]/10 dark:bg-[#C9A84C]/20 p-3">
          <Send className="h-6 w-6 text-[#C9A84C]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
            Section 15: Review & Submit
          </h2>
          <p className="mt-1 text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed max-w-3xl">
            Please review your responses across all sections before submitting.
            Your feedback is invaluable to the Bangsamoro Investment Roadmap
            2026-2035.
          </p>
        </div>
      </div>

      {/* ── BLOCK 1: Completion Summary ────────────────────── */}
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
                  {section.num}. {section.name}
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

      {/* ── BLOCK 2: Final Consent ─────────────────────────── */}
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
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer",
                data.q15_1_confirm_accurate
                  ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700"
                  : "bg-white dark:bg-[#022c22]/60 border-[#C9A84C]/20 hover:border-[#C9A84C]/40"
              )}
            >
              <input
                type="checkbox"
                checked={data.q15_1_confirm_accurate}
                onChange={(e) => update("q15_1_confirm_accurate", e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-[#C9A84C] text-[#1B4D3E] accent-[#1B4D3E] shrink-0"
              />
              <span className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
                I confirm that the information I have provided is accurate and
                reflects my professional assessment.
              </span>
            </label>

            {/* Checkbox 2 */}
            <label
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer",
                data.q15_2_consent_anonymous_use
                  ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700"
                  : "bg-white dark:bg-[#022c22]/60 border-[#C9A84C]/20 hover:border-[#C9A84C]/40"
              )}
            >
              <input
                type="checkbox"
                checked={data.q15_2_consent_anonymous_use}
                onChange={(e) => update("q15_2_consent_anonymous_use", e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-[#C9A84C] text-[#1B4D3E] accent-[#1B4D3E] shrink-0"
              />
              <span className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
                I consent to my anonymized responses being used in the BIRD
                2026-2035 synthesis report and stakeholder analysis.
              </span>
            </label>

            {/* Checkbox 3 */}
            <label
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border transition-all cursor-pointer",
                data.q15_3_consent_voluntary
                  ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700"
                  : "bg-white dark:bg-[#022c22]/60 border-[#C9A84C]/20 hover:border-[#C9A84C]/40"
              )}
            >
              <input
                type="checkbox"
                checked={data.q15_3_consent_voluntary}
                onChange={(e) => update("q15_3_consent_voluntary", e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-[#C9A84C] text-[#1B4D3E] accent-[#1B4D3E] shrink-0"
              />
              <span className="text-sm text-[#022c22] dark:text-[#ecfdf5]/90">
                I understand that my participation is voluntary and I may withdraw
                at any time by contacting the BIRD team.
              </span>
            </label>

            {/* Checkbox 4 — Required for submission */}
            <label
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer",
                data.q15_4_ready_to_submit
                  ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 dark:border-emerald-600"
                  : "bg-white dark:bg-[#022c22]/60 border-[#C9A84C]/30 hover:border-[#C9A84C]/60"
              )}
            >
              <input
                type="checkbox"
                checked={data.q15_4_ready_to_submit}
                onChange={(e) => update("q15_4_ready_to_submit", e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-[#C9A84C] text-[#1B4D3E] accent-[#1B4D3E] shrink-0"
              />
              <div>
                <span className="text-sm font-semibold text-[#022c22] dark:text-[#ecfdf5]">
                  I am ready to submit my survey response.
                </span>
                {!data.q15_4_ready_to_submit && (
                  <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 mt-1 italic">
                    This checkbox must be ticked to enable the Submit Survey
                    button.
                  </p>
                )}
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* ── BLOCK 3: Submission Preview ────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-[#C9A84C]" />
            Submission Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-[#C9A84C]/20 bg-white dark:bg-[#022c22]/60 p-4">
              <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 uppercase tracking-wide mb-1">
                Survey Sections Completed
              </p>
              <p className="text-2xl font-bold text-[#022c22] dark:text-[#ecfdf5]">15</p>
            </div>
            <div className="rounded-lg border border-[#C9A84C]/20 bg-white dark:bg-[#022c22]/60 p-4">
              <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 uppercase tracking-wide mb-1">
                Completion Time Tracked
              </p>
              <p className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
                Tracked during your session
              </p>
            </div>
            <div className="rounded-lg border border-[#C9A84C]/20 bg-white dark:bg-[#022c22]/60 p-4">
              <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 uppercase tracking-wide mb-1">
                Data Handling
              </p>
              <p className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
                Anonymized for analysis
              </p>
            </div>
            <div className="rounded-lg border border-[#C9A84C]/20 bg-white dark:bg-[#022c22]/60 p-4">
              <p className="text-xs text-[#065f46] dark:text-[#ecfdf5]/60 uppercase tracking-wide mb-1">
                Email Copy
              </p>
              <p className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5]">
                Sent if requested in Section 1
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            <Mail className="h-4 w-4 text-[#C9A84C]" />
            <span>
              Contact for questions:{" "}
              <a
                href="mailto:bird-team@asilvainnovations.com"
                className="font-medium text-[#1B4D3E] dark:text-[#C9A84C] underline hover:text-[#022c22] dark:hover:text-[#E8C560]"
              >
                bird-team@asilvainnovations.com
              </a>
            </span>
          </div>
        </CardContent>
      </Card>

      {/* ── BLOCK 4: Submit Button Area ────────────────────── */}
      <Card className="border-2 border-dashed border-[#C9A84C]/40 bg-[#C9A84C]/5 dark:bg-[#C9A84C]/10">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-[#C9A84C]/20 p-4">
              <ArrowDown className="h-8 w-8 text-[#C9A84C] animate-bounce" />
            </div>
          </div>
          <p className="text-lg font-semibold text-[#022c22] dark:text-[#ecfdf5] mb-2">
            Ready to finalize your submission?
          </p>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            Click the <strong className="text-[#022c22] dark:text-[#ecfdf5]">&ldquo;Submit Survey&rdquo;</strong> button in the
            navigation bar below to finalize your submission.
          </p>
        </CardContent>
      </Card>

      {/* ── BLOCK 5: Post-Submission Note ──────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5] flex items-center gap-2">
            <Mail className="h-5 w-5 text-[#C9A84C]" />
            What Happens After Submission?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            After submission, you will receive:
          </p>
          <ul className="space-y-3">
            {[
              "A confirmation email with your response summary (if opted in)",
              "Access to the preliminary stakeholder analysis dashboard",
              "Invitation to validation workshops in your province",
              "Quarterly updates on BIRD implementation progress",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-[#022c22] dark:text-[#ecfdf5]/90"
              >
                <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-[#C9A84C]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 rounded-lg bg-[#C9A84C]/10 dark:bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-4 py-3 text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            <Mail className="h-4 w-4 text-[#C9A84C] flex-shrink-0" />
            <span>
              For questions, contact:{" "}
              <a
                href="mailto:bird-team@asilvainnovations.com"
                className="font-medium text-[#1B4D3E] dark:text-[#C9A84C] underline hover:text-[#022c22] dark:hover:text-[#E8C560]"
              >
                bird-team@asilvainnovations.com
              </a>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Section15_Submission;
