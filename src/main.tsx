// src/main.tsx
// BIRD 2026–2035 · Application Entry Point
//
// Side-effect setup (Sentry init, service-worker registration) lives here,
// outside the React render tree, so they run once on page load.

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// ─── SERVICE WORKER REGISTRATION ────────────────────────────────────────────
// Only register in real production builds. A cache-first SW actively fights
// Vite's dev server / HMR (and WebContainer preview environments, whose
// origin can rotate between sessions), which surfaces as "Failed to fetch
// dynamically imported module" errors that have nothing to do with app code.
// (Re-applied 2026-07-31 — this guard was reverted by an external upload
// partway through this project's history; see MANIFEST.md.)
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      if (registration.scope.includes(window.location.origin)) {
        console.log("[Main] Unregistering old SW:", registration.scope);
        registration.unregister();
      }
    });
  }).then(() => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("[Main] SW registered:", registration.scope);
      })
      .catch((err) => {
        console.error("[Main] SW registration failed:", err);
      });
  });
} else if ("serviceWorker" in navigator && !import.meta.env.PROD) {
  // Dev/preview: proactively remove any SW left over from a previous
  // session so it can't intercept module fetches for this one.
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
}

// ─── DYNAMIC IMPORT / CHUNK LOAD RECOVERY ───────────────────────────────────
// Vite fires this event when a lazy-loaded module fails to fetch — typically
// because the dev server rebuilt, the preview container's origin changed, or
// a stale SW/cache intercepted the request. A single automatic reload
// resolves it without showing the user the ErrorBoundary's "Something went
// wrong" card. (Re-applied 2026-07-31 — also reverted; see MANIFEST.md.)
window.addEventListener("vite:preloadError", () => {
  const key = "bird-survey-chunk-reload";
  if (!sessionStorage.getItem(key)) {
    sessionStorage.setItem(key, "1");
    window.location.reload();
  }
});

// ─── SENTRY INIT (optional) ───────────────────────────────────────────────
// Only initialize if DSN is provided
//
// PRIVACY FIX (re-applied 2026-07-31 — reverted by an external upload):
// session replay must stay masked. This survey collects names, emails, and
// free-text answers throughout 16 sections — unmasked replay would ship
// that PII verbatim to Sentry. See MANIFEST.md for the full history.
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
if (SENTRY_DSN && typeof SENTRY_DSN === "string") {
  import("@sentry/react").then((Sentry) => {
    Sentry.init({
      dsn: SENTRY_DSN,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0.05,
      replaysOnErrorSampleRate: 0.5,
      sendDefaultPii: false,
      beforeSend(event) {
        const scrub = (s: string) => s.replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, "[redacted-email]");
        if (event.message) event.message = scrub(event.message);
        if (event.exception?.values) {
          for (const v of event.exception.values) {
            if (v.value) v.value = scrub(v.value);
          }
        }
        return event;
      },
    });
  });
}

// ─── REACT ROOT ─────────────────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Clear the one-shot chunk-reload guard once we've painted successfully, so a
// *future* genuine chunk-load failure still gets its one automatic retry.
window.setTimeout(() => sessionStorage.removeItem("bird-survey-chunk-reload"), 3000);