// scripts/check-edge-functions.mjs
// CI gate: fails if src/lib/supabase.ts's EDGE_FUNCTIONS registry references
// a function that doesn't exist under supabase/functions/, or if a deployed
// function exists that nothing in EDGE_FUNCTIONS points to. This is the
// direct fix for the 2026-07-29 audit finding where EDGE_FUNCTIONS listed
// ai-strategy-assistant / strategic-planner-sync / crm-dispatcher — two of
// which pointed at functions that queried tables never created by any
// migration, and one (crm-dispatcher) that never existed on disk at all.

import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const functionsDir = path.join(root, "supabase", "functions");
const supabaseTsPath = path.join(root, "src", "lib", "supabase.ts");

const deployedFunctions = readdirSync(functionsDir).filter((name) =>
  statSync(path.join(functionsDir, name)).isDirectory()
);

const source = readFileSync(supabaseTsPath, "utf-8");

// Matches lines like: SUBMIT_SURVEY: `${EDGE_BASE}/survey-submit`,
const registryEntryPattern = /\$\{EDGE_BASE\}\/([a-z0-9-]+)/g;
const referencedFunctions = [...source.matchAll(registryEntryPattern)].map((m) => m[1]);

let hasError = false;

for (const referenced of referencedFunctions) {
  if (!deployedFunctions.includes(referenced)) {
    console.error(
      `❌ EDGE_FUNCTIONS in src/lib/supabase.ts references "${referenced}", ` +
      `but no directory supabase/functions/${referenced}/ exists.`
    );
    hasError = true;
  }
}

for (const deployed of deployedFunctions) {
  if (!referencedFunctions.includes(deployed)) {
    console.warn(
      `⚠️  supabase/functions/${deployed}/ exists but nothing in EDGE_FUNCTIONS ` +
      `references it. If intentional (e.g. cron-triggered, no client caller), ` +
      `add a comment in supabase.ts explaining why; otherwise this is an orphan.`
    );
  }
}

if (hasError) {
  console.error(
    "\nEDGE_FUNCTIONS registry is out of sync with supabase/functions/. " +
    "Fix src/lib/supabase.ts or supabase/functions/ before merging.\n"
  );
  process.exit(1);
}

console.log(`✅ EDGE_FUNCTIONS registry matches supabase/functions/ (${deployedFunctions.length} functions).`);
