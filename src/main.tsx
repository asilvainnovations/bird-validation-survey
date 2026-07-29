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
// Unregister any old service workers first, then register the new one.
// This prevents stale caches from breaking the app after deployments.
if ("serviceWorker" in navigator) {
  // Force-unregister old SWs on first load (one-time cleanup)
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      if (registration.scope.includes(window.location.origin)) {
        console.log("[Main] Unregistering old SW:", registration.scope);
        registration.unregister();
      }
    });
  }).then(() => {
    // Register new SW after cleanup
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("[Main] SW registered:", registration.scope);
      })
      .catch((err) => {
        console.error("[Main] SW registration failed:", err);
      });
  });
}

// ─── SENTRY INIT (optional) ───────────────────────────────────────────────
// Only initialize if DSN is provided
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
if (SENTRY_DSN && typeof SENTRY_DSN === "string") {
  import("@sentry/react").then((Sentry) => {
    Sentry.init({
      dsn: SENTRY_DSN,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0.05,
      replaysOnErrorSampleRate: 0.5,
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