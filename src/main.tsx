import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import * as Sentry from "@sentry/react";
import App from "./App";
import "./index.css";

// ─── SENTRY INITIALIZATION ──────────────────────────────────────────────────
const sentryDsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.1,
  });
}

// ─── SERVICE WORKER REGISTRATION ────────────────────────────────────────────
// Registers the service worker located at /service-worker.js (served from public/)
// Provides offline support, asset caching, and background sync for survey submissions.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("[SW] Registered:", registration.scope);

        // Handle updates — prompt user or auto-skip waiting in development
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              console.log("[SW] New version available — reloading to activate...");
              // In production, show a "Update available" toast instead of auto-reload
              newWorker.postMessage({ type: "SKIP_WAITING" });
              window.location.reload();
            }
          });
        });
      })
      .catch((err) => {
        console.error("[SW] Registration failed:", err);
      });

    // Listen for SW messages (e.g., background sync flush)
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data?.type === "FLUSH_SUBMISSION_QUEUE") {
        // Triggered by background sync — app layer should process queued submissions
        console.log("[SW Message] Flush submission queue requested");
        // Dispatch a custom event that api.ts or useStrategicPlan.ts can listen for
        window.dispatchEvent(new CustomEvent("sw-flush-queue"));
      }
    });
  });
}

// ─── REACT RENDER ───────────────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
