// supabase/functions/email-notifications/index.ts
// BIRD 2026–2035 · Edge Function for transactional emails
// Sends welcome, submission-confirmation, and notification emails
// using Resend. All URLs derive from CANONICAL_DOMAIN so the function
// works across dev / staging / production without code changes.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// ── Environment ─────────────────────────────────────────────────────────────
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
// CANONICAL_DOMAIN is set as a Supabase secret (not VITE_-prefixed) so
// this Edge Function can use it. Falls back to the Bolt host for safety.
const CANONICAL_DOMAIN =
  Deno.env.get("CANONICAL_DOMAIN") || "https://bird-validation-survey.bolt.host";
const SITE_URL = Deno.env.get("SITE_URL") || CANONICAL_DOMAIN;
const USER_MANUAL = Deno.env.get("USER_MANUAL") || `${CANONICAL_DOMAIN}/user-manual.html`;

// ── Types ───────────────────────────────────────────────────────────────────
interface EmailPayload {
  to: string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

interface WelcomePayload {
  type: "welcome";
  email: string;
  name?: string;
}

interface SubmissionPayload {
  type: "submission_confirmation";
  email: string;
  name?: string;
  submissionId?: string;
}

interface NotificationPayload {
  type: "notification";
  email: string;
  subject: string;
  message: string;
}

type RequestPayload = WelcomePayload | SubmissionPayload | NotificationPayload;

// ── Resend client ───────────────────────────────────────────────────────────
async function sendEmail(payload: EmailPayload): Promise<{ id?: string; error?: string }> {
  if (!RESEND_API_KEY) {
    console.error("[email-notifications] RESEND_API_KEY not set");
    return { error: "Email service not configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: payload.from || "BIRD Survey <no-reply@asilvainnovations.com>",
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[email-notifications] Resend error:", err);
      return { error: `Resend API error: ${res.status}` };
    }

    const data = await res.json();
    return { id: data.id };
  } catch (err) {
    console.error("[email-notifications] Network error:", err);
    return { error: "Failed to send email" };
  }
}

// ── Template builders ───────────────────────────────────────────────────────
function buildWelcomeEmail(name?: string): { subject: string; html: string } {
  const displayName = name || "Valued Stakeholder";
  return {
    subject: "Welcome to the BIRD 2026–2035 Validation Survey",
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; color: #0A1628;">
        <h1 style="color: #1B4D3E;">Welcome, ${displayName}</h1>
        <p>Thank you for joining the <strong>Bangsamoro Investment Roadmap Development (BIRD) 2026–2035</strong> validation process.</p>
        <p>Your insights will help shape BARMM's economic future across the five BEIE clusters:</p>
        <ul>
          <li><strong>Foundations</strong> — Agriculture, fisheries, forestry, energy</li>
          <li><strong>Transformers</strong> — Halal industry, manufacturing, economic zones</li>
          <li><strong>Enablers</strong> — Infrastructure, human capital, digital governance</li>
          <li><strong>Connectors</strong> — Trade corridors, BIMP-EAGA, logistics</li>
          <li><strong>Financiers</strong> — Islamic finance, investment facilitation</li>
        </ul>
        <p>
          <a href="${SITE_URL}/validation-survey.html" style="background: #1B4D3E; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Start the Survey
          </a>
        </p>
        <p style="font-size: 12px; color: #64748b;">
          Need help? View the <a href="${USER_MANUAL}">User Manual</a>.
        </p>
      </div>
    `,
  };
}

function buildSubmissionConfirmation(
  name?: string,
  submissionId?: string
): { subject: string; html: string } {
  const displayName = name || "Valued Stakeholder";
  return {
    subject: "BIRD 2026–2035 Validation Survey — Submission Confirmed",
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; color: #0A1628;">
        <h1 style="color: #1B4D3E;">Submission Received</h1>
        <p>Dear ${displayName},</p>
        <p>Your response to the <strong>BIRD 2026–2035 Validation Survey</strong> has been successfully recorded.</p>
        ${submissionId ? `<p><strong>Reference ID:</strong> ${submissionId}</p>` : ""}
        <p>Thank you for contributing to the Bangsamoro Investment Roadmap Development.</p>
        <p style="font-size: 12px; color: #64748b;">
          View results: <a href="${SITE_URL}/survey-dashboard.html">Live Dashboard</a>
        </p>
      </div>
    `,
  };
}

function buildNotification(subject: string, message: string): { subject: string; html: string } {
  return {
    subject,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; color: #0A1628;">
        <h1 style="color: #1B4D3E;">${subject}</h1>
        <p>${message}</p>
        <p style="font-size: 12px; color: #64748b;">
          <a href="${SITE_URL}">Return to BIRD Survey</a>
        </p>
      </div>
    `,
  };
}

// ── Request handler ─────────────────────────────────────────────────────────
serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const payload = (await req.json()) as RequestPayload;

    if (!payload.email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let result: { id?: string; error?: string };

    switch (payload.type) {
      case "welcome": {
        const { subject, html } = buildWelcomeEmail(payload.name);
        result = await sendEmail({ to: [payload.email], subject, html });
        break;
      }
      case "submission_confirmation": {
        const { subject, html } = buildSubmissionConfirmation(payload.name, payload.submissionId);
        result = await sendEmail({ to: [payload.email], subject, html });
        break;
      }
      case "notification": {
        const { subject, html } = buildNotification(payload.subject, payload.message);
        result = await sendEmail({ to: [payload.email], subject, html });
        break;
      }
      default:
        return new Response(JSON.stringify({ error: "Unknown email type" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
    }

    if (result.error) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("[email-notifications] Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
