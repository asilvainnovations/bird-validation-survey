// scripts/generate-service-worker-version.mjs
// Rewrites the CACHE_VERSION constant in public/service-worker.js to a fresh,
// unique value on every build — run as a `prebuild` step (see package.json),
// same timing as generate-manifest.mjs.
//
// WHY THIS EXISTS (2026-07-31 investigation):
// CACHE_VERSION used to be a hardcoded string ('bird-survey-v2') that a
// developer had to remember to hand-bump on every deploy. Combined with
// service-worker.js's cache-first strategy for the HTML shell, forgetting to
// bump it meant returning visitors never saw a new deploy at all — the
// service worker would keep serving the old index.html forever, since
// cache-first never even checks the network once something is cached. This
// was traced as one of two root causes (the other being service-worker.js
// registering in dev/preview mode at all — see main.tsx) behind reports that
// agreed-upon UI/UX changes "were nowhere" after a deploy.
//
// The fix: CACHE_VERSION is now generated fresh on every build (build
// timestamp + a short random suffix, so even two builds in the same second
// don't collide), so cache invalidation happens automatically and can never
// again depend on a human remembering a manual step.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const swPath = path.resolve(__dirname, "../public/service-worker.js");

const buildId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const newVersion = `bird-survey-${buildId}`;

const source = readFileSync(swPath, "utf-8");

const versionLinePattern = /const CACHE_VERSION = '[^']*';.*/;
if (!versionLinePattern.test(source)) {
  throw new Error(
    "[generate-service-worker-version] Could not find the CACHE_VERSION line in " +
      "public/service-worker.js — its format may have changed. Update this " +
      "script's regex to match, rather than silently failing to bump the version."
  );
}

const rendered = source.replace(
  versionLinePattern,
  `const CACHE_VERSION = '${newVersion}';  // auto-generated at build time — do not hand-edit, see scripts/generate-service-worker-version.mjs`
);

writeFileSync(swPath, rendered);
console.log(`[generate-service-worker-version] Set CACHE_VERSION=${newVersion}`);
