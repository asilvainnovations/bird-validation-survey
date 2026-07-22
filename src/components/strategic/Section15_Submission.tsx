// src/components/strategic/Section15_Submission.tsx
// BIRD 2026–2035 · Section 15: Review & Submit

import React from "react";
import { CheckCircle2, AlertCircle, FileText, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SurveySchemaType } from "@/lib/survey-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export type Section15Data = Pick<
  SurveySchemaType,
  | "q15_1_confirm_accurate"
  | "q15_2_consent_anonymous_use"
  | "q15_3_consent_voluntary"
  | "q15_4_ready_to_submit"
>;

interface Section15Props {
  data: Section15Data;
  onChange: (data: Section15Data) => void;
}

export const Section15_Submission: React.FC<Section15Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section15Data>(field: K, value: Section15Data[K]) => {
    onChange({ ...data, [field]: value });
    // Auto-check ready_to_submit if all consents are given
    if (data.q15_1_confirm_accurate && data.q15_2_consent_anonymous_use && data.q15_3_consent_voluntary) {
      onChange({ ...data, [field]: value, q15_4_ready_to_submit: true });
    }
  };

  const allConsentsGiven = 
    !!data.q15_1_confirm_accurate && 
    !!data.q15_2_consent_anonymous_use && 
    !!data.q15_3_consent_voluntary;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <ShieldCheck className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 15: Review & Submit
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4">
        Please review your final consent and confirm your readiness to submit the BIRD 2026–2035 Validation Survey.
      </p>

      <Card className="border-[#C9A84C]/20 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-[#022c22]">
            <FileText className="w-5 h-5 text-[#C9A84C]" />
            Final Declarations & Consent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg border border-[#C9A84C]/20 bg-emerald-50/30">
              <input
                type="checkbox"
                id="q15_1_confirm_accurate"
                checked={!!data.q15_1_confirm_accurate}
                onChange={(e) => update("q15_1_confirm_accurate", e.target.checked)}
                className="mt-1 w-4 h-4 text-[#1B4D3E] border-[#C9A84C]/30 rounded focus:ring-[#C9A84C]"
              />
              <Label htmlFor="q15_1_confirm_accurate" className="text-sm text-[#022c22] cursor-pointer">
                I confirm that the information provided in this survey is accurate to the best of my knowledge and reflects my genuine professional assessment of the BIRD 2026–2035 roadmap.
              </Label>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border border-[#C9A84C]/20 bg-emerald-50/30">
              <input
                type="checkbox"
                id="q15_2_consent_anonymous_use"
                checked={!!data.q15_2_consent_anonymous_use}
                onChange={(e) => update("q15_2_consent_anonymous_use", e.target.checked)}
                className="mt-1 w-4 h-4 text-[#1B4D3E] border-[#C9A84C]/30 rounded focus:ring-[#C9A84C]"
              />
              <Label htmlFor="q15_2_consent_anonymous_use" className="text-sm text-[#022c22] cursor-pointer">
                I consent to the anonymous aggregation and use of my responses for the purpose of refining the Bangsamoro Investment Roadmap, in accordance with the Data Privacy Act of 2012 (RA 10173).
              </Label>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border border-[#C9A84C]/20 bg-emerald-50/30">
              <input
                type="checkbox"
                id="q15_3_consent_voluntary"
                checked={!!data.q15_3_consent_voluntary}
                onChange={(e) => update("q15_3_consent_voluntary", e.target.checked)}
                className="mt-1 w-4 h-4 text-[#1B4D3E] border-[#C9A84C]/30 rounded focus:ring-[#C9A84C]"
              />
              <Label htmlFor="q15_3_consent_voluntary" className="text-sm text-[#022c22] cursor-pointer">
                I understand that my participation is entirely voluntary and that I may withdraw my consent at any time by contacting the BIRD technical team.
              </Label>
            </div>
          </div>

          <div className="pt-4 border-t border-[#C9A84C]/20">
            <div className="flex items-start gap-3 p-4 rounded-lg border bg-[#1B4D3E]/5">
              <input
                type="checkbox"
                id="q15_4_ready_to_submit"
                checked={!!data.q15_4_ready_to_submit}
                onChange={(e) => update("q15_4_ready_to_submit", e.target.checked)}
                className="mt-1 w-4 h-4 text-[#1B4D3E] border-[#C9A84C]/30 rounded focus:ring-[#C9A84C]"
              />
              <Label htmlFor="q15_4_ready_to_submit" className="text-sm font-semibold text-[#022c22] cursor-pointer">
                I have reviewed my responses and I am ready to submit this survey.
              </Label>
            </div>
          </div>

          {!allConsentsGiven && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">
                Please check all consent boxes above to enable the final submission.
              </p>
            </div>
          )}

          {allConsentsGiven && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">
                All consents confirmed. You may now proceed to submit your survey.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Section15_Submission;
