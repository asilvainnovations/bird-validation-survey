import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import "@/index.css";

// ─── SENTRY ERROR TRACKING ──────────────────────────────────────────────────
// Requirements:
//   1. Set VITE_SENTRY_DSN in your deployment environment (Vercel/Netlify/Cloudflare)
//   2. Format: https://<key>@o<org>.ingest.sentry.io/<project>
//   3. If unset, Sentry is silently skipped — no runtime errors
//   4. Never commit the DSN to source control; always use env vars
//
// Deployment check:
//   Vercel:  Project Settings → Environment Variables → VITE_SENTRY_DSN
//   Netlify: Site Configuration → Environment → VITE_SENTRY_DSN
//   Manual:  export VITE_SENTRY_DSN="https://..." before running "npm run build"
//
const sentryDsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;

if (sentryDsn && sentryDsn.startsWith("https://")) {
  // Dynamic import keeps Sentry out of the main bundle when unused
  import("@sentry/react").then((Sentry) => {
    Sentry.init({
      dsn: sentryDsn,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }).catch(() => {
    // Silently fail if Sentry fails to load — survey must remain functional
  });
}

// ─── STRICT MODE ──────────────────────────────────────────────────────────────
// StrictMode is enabled in development to catch side-effects and unsafe lifecycles.
// It is automatically stripped in production builds.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
