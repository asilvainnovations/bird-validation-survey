// src/components/strategic/Section1_Privacy.tsx
// BIRD 2026–2035 · Section 1: Privacy, Consent & Confidentiality
// Updated: 2026-07-27 · Production-ready, dark-mode, schema-aligned, onChange contract

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Check, ExternalLink } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
export interface Section1Data {
  consent_participate: boolean;
  consent_anonymize: boolean;
  consent_email_copy: boolean;
  consent_voluntary: boolean;
}

interface Section1Props {
  data: Section1Data;
  onChange: (data: Section1Data) => void;
}

// ── Component ────────────────────────────────────────────────────────────────
const Section1_Privacy: React.FC<Section1Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section1Data>(field: K, value: Section1Data[K]) =>
    onChange({ ...data, [field]: value });

  const consentItems: {
    field: keyof Section1Data;
    label: string;
    question: string;
  }[] = [
    {
      field: "consent_participate",
      label: "Q1.1",
      question: "I consent to participate in this validation survey.",
    },
    {
      field: "consent_anonymize",
      label: "Q1.2",
      question:
        "I understand my responses will be anonymized in public reports.",
    },
    {
      field: "consent_email_copy",
      label: "Q1.3",
      question: "I agree to receive a copy of my submission via email.",
    },
    {
      field: "consent_voluntary",
      label: "Q1.4",
      question:
        "I confirm I am responding voluntarily and may withdraw at any time.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22] dark:text-[#ecfdf5]">
          Section 1: Privacy, Consent & Confidentiality
        </h2>
      </div>
      <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 mb-4">
        Your responses are protected under the Data Privacy Act of 2012 (RA
        10173). This section explains how your data is collected, used, and
        safeguarded.
      </p>

      {/* 1. Privacy Notice Card */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Data Privacy Notice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            The Bangsamoro Investment Roadmap Development (BIRD) 2026-2035
            validation survey is conducted by Bureau of
            Investments - Ministry of Trade, Investment and Tourism (BOI-MTIT).
          </p>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 leading-relaxed">
            Your personal data is collected solely for the purpose of validating
            the BIRD strategic framework and ensuring diverse stakeholder
            representation.
          </p>
          <div>
            <p className="text-sm font-medium text-[#022c22] dark:text-[#ecfdf5] mb-2">
              Safeguards in place:
            </p>
            <ul className="space-y-2">
              {[
                "All responses are anonymized in aggregate reporting",
                "Individual responses are never shared publicly or with third parties",
                "Your email is used only to send a copy of your submission",
                "Data is stored securely on encrypted servers with access controls",
                "You may request data deletion at any time by contacting boi@bangsamoro.gov.ph",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
                  <Check className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* 2. Consent Checkboxes */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Consent Declaration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70 mb-4 leading-relaxed">
            Please check each box below to confirm your understanding and consent
            before proceeding with the survey.
          </p>
          <div className="space-y-3">
            {consentItems.map(({ field, label, question }) => {
              const checked = data[field];
              return (
                <button
                  key={field}
                  type="button"
                  onClick={() => update(field, !checked)}
                  className={cn(
                    "w-full flex items-start gap-3 p-4 rounded-lg border text-left transition-all",
                    checked
                      ? "bg-[#C9A84C]/10 dark:bg-[#C9A84C]/20 border-[#C9A84C]"
                      : "bg-white dark:bg-[#022c22]/60 border-[#C9A84C]/30 hover:border-[#C9A84C]/60"
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all",
                      checked
                        ? "bg-[#C9A84C] border-[#C9A84C]"
                        : "border-[#C9A84C]/40"
                    )}
                  >
                    {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-[#C9A84C] uppercase tracking-wide">
                      {label}
                    </span>
                    <p
                      className={cn(
                        "text-sm mt-0.5",
                        checked
                          ? "text-[#022c22] dark:text-[#ecfdf5]"
                          : "text-[#065f46] dark:text-[#ecfdf5]/70"
                      )}
                    >
                      {question}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 3. Policy Links Card */}
      <Card className="border-[#C9A84C]/20 bg-white/95 dark:bg-[#022c22]/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] dark:text-[#ecfdf5]">
            Policies & Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            For full details, please review our policies:
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href="https://asilvainnovations.github.io/BIRD-2026-2035/public/privacy-policy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#022c22]/5 dark:bg-[#C9A84C]/10 hover:bg-[#C9A84C]/10 dark:hover:bg-[#C9A84C]/20 border border-[#C9A84C]/20 text-[#022c22] dark:text-[#ecfdf5] text-sm px-4 py-3 rounded-lg inline-flex items-center gap-2 transition-all"
            >
              <ExternalLink className="w-4 h-4 text-[#C9A84C]" />
              Privacy Policy
            </a>
            <a
              href="https://asilvainnovations.github.io/BIRD-2026-2035/public/cookie-policy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#022c22]/5 dark:bg-[#C9A84C]/10 hover:bg-[#C9A84C]/10 dark:hover:bg-[#C9A84C]/20 border border-[#C9A84C]/20 text-[#022c22] dark:text-[#ecfdf5] text-sm px-4 py-3 rounded-lg inline-flex items-center gap-2 transition-all"
            >
              <ExternalLink className="w-4 h-4 text-[#C9A84C]" />
              Cookies Policy
            </a>
          </div>
          <p className="text-sm text-[#065f46] dark:text-[#ecfdf5]/70">
            Questions about data privacy? Contact us at{" "}
            <a
              href="mailto:boi@bangsamoro.gov.ph"
              className="text-[#C9A84C] hover:underline font-medium"
            >
              boi@bangsamoro.gov.ph
            </a>{" "}
            (BOI-MTIT BARMM).
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Section1_Privacy;
