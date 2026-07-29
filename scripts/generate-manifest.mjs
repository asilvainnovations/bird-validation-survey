// scripts/generate-manifest.mjs
// Renders public/manifest.template.json -> public/manifest.json, substituting
// the single CANONICAL_DOMAIN env var everywhere the domain is needed.
// Run automatically as a `prebuild` step (see package.json) so manifest.json
// is always regenerated from a valid, parseable template and never hand-edited
// (hand-editing public/manifest.json directly is what caused the missing-comma
// syntax error found in the 2026-07-29 audit).

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templatePath = path.resolve(__dirname, "../public/manifest.template.json");
const outputPath = path.resolve(__dirname, "../public/manifest.json");

const CANONICAL_DOMAIN =
  process.env.CANONICAL_DOMAIN ||
  process.env.VITE_CANONICAL_DOMAIN ||
  "https://bird-validation-survey.bolt.host";

const template = readFileSync(templatePath, "utf-8");
const rendered = template.replaceAll("__CANONICAL_DOMAIN__", CANONICAL_DOMAIN);

// Fail the build loudly if the template itself isn't valid JSON after
// substitution, rather than silently shipping a broken manifest again.
JSON.parse(rendered);

writeFileSync(outputPath, rendered);
console.log(`[generate-manifest] Wrote public/manifest.json using CANONICAL_DOMAIN=${CANONICAL_DOMAIN}`);
