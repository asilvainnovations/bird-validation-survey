import React from "react";
import { Shield, FileText, ExternalLink, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { BIRD_SITES } from "@/lib/bird-urls";

// ── Types ────────────────────────────────────────────────────────────────────
export interface Section1Data {
  q1_1_consent_participate: boolean;
  q1_2_consent_anonymize: boolean;
  q1_3_consent_email_copy: boolean;
  q1_4_consent_voluntary: boolean;
}

interface Section1Props {
  data: Section1Data;
  onChange: (data: Section1Data) => void;
}

// ── Component ────────────────────────────────────────────────────────────────
export const Section1_Privacy: React.FC<Section1Props> = ({ data, onChange }) => {
  const update = <K extends keyof Section1Data>(field: K, value: Section1Data[K]) => {
    onChange({ ...data, [field]: value });
  };

  // Fallback URLs if not explicitly defined in BIRD_SITES
  const privacyUrl = BIRD_SITES.privacyPolicy?.url || "https://asilvainnovations.github.io/BIRD-2026-2035/public/privacy-policy.html";
  const cookieUrl = BIRD_SITES.cookiePolicy?.url || "https://asilvainnovations.github.io/BIRD-2026-2035/public/cookie-policy.html";

  const consentItems = [
    {
      field: "q1_1_consent_participate" as keyof Section1Data,
      label: "I consent to participate in the BIRD 2026-2035 Validation Survey.",
      description: "Your responses will be used to shape the Bangsamoro Investment Roadmap.",
    },
    {
      field: "q1_2_consent_anonymize" as keyof Section1Data,
      label: "I understand my responses will be anonymized in public reports.",
      description: "No individual responses will be publicly attributed to you.",
    },
    {
      field: "q1_3_consent_email_copy" as keyof Section1Data,
      label: "I agree to receive a copy of my submission via email (if provided).",
      description: "Your email will only be used to send your response summary.",
    },
    {
      field: "q1_4_consent_voluntary" as keyof Section1Data,
      label: "I confirm my participation is entirely voluntary.",
      description: "I may withdraw my consent at any time by contacting the BIRD team.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* ── Section Header ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-6 h-6 text-[#C9A84C]" />
        <h2 className="text-xl font-bold text-[#022c22]">
          Section 1: Privacy, Consent & Confidentiality
        </h2>
      </div>
      <p className="text-sm text-[#065f46] mb-4 -mt-5">
        Your data is protected under the Data Privacy Act of 2012 (RA 10173)
      </p>

      {/* ── 1. Privacy Notice Card ─────────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#C9A84C]" />
            Data Privacy Notice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-[#022c22] leading-relaxed">
            The Bangsamoro Investment Roadmap Development (BIRD) 2026-2035 validation survey is conducted by the 
            <strong> Board of Investments - Ministry of Trade, Investments and Tourism (BOI-MTIT BARMM)</strong>. 
            Your personal data is collected solely for the purpose of validating the BIRD strategic framework and 
            ensuring diverse stakeholder representation.
          </p>

          <div className="bg-emerald-50/60 border border-[#C9A84C]/20 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-[#022c22] mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#1B4D3E]" />
              Safeguards in place:
            </h4>
            <ul className="space-y-2">
              {[
                "All responses are anonymized in aggregate reporting and public dashboards.",
                "Individual responses are never shared with third parties or used for commercial purposes.",
                "Your email (if provided) is used only to send a copy of your submission.",
                "Data is stored securely on encrypted servers with strict access controls.",
                "You may request data deletion at any time by contacting bird-team@asilvainnovations.com.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#065f46]">
                  <CheckCircle2 className="w-4 h-4 text-[#1B4D3E] mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="outline" size="sm" asChild className="border-[#C9A84C]/30 text-[#022c22] hover:border-[#C9A84C]">
              <a href={privacyUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2 text-[#C9A84C]" />
                Read Full Privacy Policy
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild className="border-[#C9A84C]/30 text-[#022c22] hover:border-[#C9A84C]">
              <a href={cookieUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2 text-[#C9A84C]" />
                Read Cookie Policy
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── 2. Consent Checkboxes ──────────────────────────────────────── */}
      <Card className="border-[#C9A84C]/20 bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-[#022c22] flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#C9A84C]" />
            Consent Declaration
          </CardTitle>
          <p className="text-xs text-[#065f46] italic pt-1">
            Please check each box below to confirm your understanding and consent before proceeding.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {consentItems.map(({ field, label, description }) => (
            <div
              key={field}
              className={cn(
                "flex items-start space-x-3 p-4 rounded-lg border transition-all",
                data[field]
                  ? "bg-emerald-50/60 border-[#C9A84C]/40"
                  : "bg-white border-[#C9A84C]/20 hover:border-[#C9A84C]/40"
              )}
            >
              <Checkbox
                id={field}
                checked={data[field]}
                onCheckedChange={(checked) => update(field, !!checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label
                  htmlFor={field}
                  className="text-sm font-medium text-[#022c22] cursor-pointer leading-relaxed"
                >
                  {label}
                </Label>
                <p className="text-xs text-[#065f46] mt-1">{description}</p>
              </div>
              {data[field] && (
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 shrink-0">
                  Confirmed
                </Badge>
              )}
            </div>
          ))}

          {/* Info Note */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50/60 border border-amber-200 mt-4">
            <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-800">
              <strong>Note:</strong> All four consent declarations must be confirmed to proceed with the survey. 
              Your participation is entirely voluntary, and you may withdraw at any time.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Section1_Privacy;
