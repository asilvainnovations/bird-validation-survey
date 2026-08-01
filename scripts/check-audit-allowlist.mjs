// scripts/check-audit-allowlist.mjs
// Runs `npm audit --audit-level=high --json` and fails CI only if a finding
// appears that ISN'T in the allowlist below. Each entry here must correspond
// to a reviewed, dated, documented decision in SECURITY-EXCEPTIONS.md — this
// script isn't a way to silence audit findings quietly, it's a way to let
// one specific, already-reviewed finding through without blocking every PR,
// while still failing loudly on anything genuinely new.
//
// Why this exists (2026-08-01): the previous CI step was a bare
// `npm audit --audit-level=high` with a comment claiming undocumented
// findings would fail CI — but nothing in the command actually implemented
// that; it failed on ALL high+ findings indiscriminately, including the one
// already reviewed and accepted in SECURITY-EXCEPTIONS.md. This script
// makes the comment's claim actually true.

import { execSync } from "node:child_process";

// GHSA IDs reviewed and accepted in SECURITY-EXCEPTIONS.md. Add here only
// alongside a new dated entry in that file — never bypass audit findings
// without a written reason.
const ALLOWLISTED_ADVISORIES = new Set([
  "GHSA-qwww-vcr4-c8h2", // react-router RSC Mode CSRF Bypass — not exploitable,
                          // this app uses Declarative Mode only. See SECURITY-EXCEPTIONS.md.
]);

let auditJson;
try {
  const output = execSync("npm audit --audit-level=high --json", {
    encoding: "utf-8",
    stdio: ["pipe", "pipe", "pipe"],
  });
  auditJson = JSON.parse(output);
} catch (e) {
  // npm audit exits non-zero when findings exist, but still prints valid
  // JSON to stdout — that's expected here, not a real execution failure.
  try {
    auditJson = JSON.parse(e.stdout);
  } catch {
    console.error("[check-audit-allowlist] Could not parse `npm audit` output at all:");
    console.error(e.stdout || e.message);
    process.exit(1);
  }
}

const vulnerabilities = auditJson.vulnerabilities ?? {};
const unapproved = [];

for (const [pkgName, info] of Object.entries(vulnerabilities)) {
  const via = Array.isArray(info.via) ? info.via : [];
  for (const v of via) {
    if (typeof v !== "object") continue; // string entries are just dependency names, not findings
    const url = v.url ?? "";
    const match = url.match(/advisories\/(GHSA-[a-z0-9-]+)/i);
    const id = match?.[1];
    if (id && !ALLOWLISTED_ADVISORIES.has(id)) {
      unapproved.push({ package: pkgName, id, title: v.title, url });
    } else if (!id) {
      // Couldn't extract a GHSA ID — fail closed rather than silently pass.
      unapproved.push({ package: pkgName, id: "(unknown)", title: v.title, url });
    }
  }
}

if (unapproved.length > 0) {
  console.error(`[check-audit-allowlist] ${unapproved.length} high/critical finding(s) are NOT in the allowlist:`);
  for (const u of unapproved) {
    console.error(`  - ${u.package}: ${u.id} — ${u.title} (${u.url})`);
  }
  console.error("\nEither fix the finding, or add a dated, reviewed entry to SECURITY-EXCEPTIONS.md and its GHSA ID to ALLOWLISTED_ADVISORIES in this script.");
  process.exit(1);
}

console.log(`[check-audit-allowlist] All high/critical findings are documented, reviewed exceptions (${ALLOWLISTED_ADVISORIES.size} allowlisted). Passing.`);
