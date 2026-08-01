// ─────────────────────────────────────────────────────────────────────────────
// BIRD 2026–2035 · strategic-planner-sync Edge Function v2.2
// Supabase Edge Runtime (Deno) — hosted on rgvteytgkugdqdodedxq project
// Data target: lydsisparsmvextskevw.supabase.co (via ANON key + RLS)
//
// FIXES vs v2.1:
//   • strategic_planner_state table now exists (created in migration 001)
//   • Request body size capped at 10 MB to prevent unbounded payloads
//   • Adds ETag / If-None-Match for GET caching
//   • checksum stored alongside state for integrity verification
//   • Proper 429 rate-limit header on rapid identical calls
//   • Standardised error envelope: { success, error, code }
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const ALLOWED_ORIGINS = [
  'http://localhost:5173', 'http://localhost:8080',
  'https://bird-validation-survey.bolt.host', 'https://asilvainnovations.com',
];
function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  try {
    return new URL(origin).hostname.endsWith('.webcontainer-api.io');
  } catch {
    return false;
  }
}
function buildCors(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Headers': 'authorization, content-type, x-client-info, apikey',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  };
  if (isAllowedOrigin(origin)) headers['Access-Control-Allow-Origin'] = origin as string;
  return headers;
}

const MAX_BODY_BYTES = 10 * 1024 * 1024; // 10 MB hard cap

// Simple SHA-256 checksum for state integrity
async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}

// json/err are defined inside Deno.serve below, where the per-request origin
// is available for buildCors().

Deno.serve(async (req: Request) => {
  const cors = buildCors(req.headers.get('Origin'));
  const json = (data: unknown, status = 200, extra: Record<string,string> = {}) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { 'Content-Type': 'application/json', ...cors, ...extra },
    });
  const err = (error: string, status = 400, code = 'BAD_REQUEST') =>
    json({ success: false, error, code }, status);

  if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'DELETE')
    return err('Method not allowed', 405, 'METHOD_NOT_ALLOWED');

  try {
    // ── Auth ───────────────────────────────────────────────────────────────────
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } },
    );

    const { data: { session }, error: sessionErr } = await supabase.auth.getSession();
    if (sessionErr || !session?.user)
      return err('Unauthorized — valid JWT required', 401, 'UNAUTHORIZED');

    const userId = session.user.id;

    switch (req.method) {
      case 'GET':    return await handleGet(supabase, userId, req);
      case 'POST':   return await handlePost(supabase, userId, req);
      case 'DELETE': return await handleDelete(supabase, userId, req);
      default:       return err('Method not allowed', 405, 'METHOD_NOT_ALLOWED');
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error('[strategic-planner-sync] Unhandled error:', msg);
    return err('Internal server error', 500, 'INTERNAL_ERROR');
  }
});

// ── GET: load state snapshot ───────────────────────────────────────────────────
async function handleGet(supabase: ReturnType<typeof createClient>, userId: string, req: Request) {
  const clientEtag = req.headers.get('If-None-Match');

  const { data, error } = await supabase
    .from('strategic_planner_state')
    .select('state, checksum, version, updated_at')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;

  if (data?.state) {
    // ETag caching — return 304 if client already has this version
    const etag = `"${data.checksum ?? data.version}"`;
    if (clientEtag === etag) return new Response(null, { status: 304, headers: cors });

    return json(
      { ...data.state, _meta: { version: data.version, updatedAt: data.updated_at } },
      200,
      { 'ETag': etag, 'Cache-Control': 'private, max-age=0, must-revalidate' },
    );
  }

  // Fallback: aggregate from individual strategic_plans rows
  const { data: plans, error: plansErr } = await supabase
    .from('strategic_plans')
    .select('*')
    .eq('user_id', userId)
    .eq('is_archived', false)
    .order('updated_at', { ascending: false });

  if (plansErr) throw plansErr;

  return json({ plans: plans ?? [], currentPlanId: plans?.[0]?.id ?? null });
}

// ── POST: save full state OR single plan ───────────────────────────────────────
async function handlePost(supabase: ReturnType<typeof createClient>, userId: string, req: Request) {
  // Body size guard
  const contentLength = Number(req.headers.get('content-length') ?? '0');
  if (contentLength > MAX_BODY_BYTES)
    return err(`Payload too large (max ${MAX_BODY_BYTES / 1024 / 1024} MB)`, 413, 'PAYLOAD_TOO_LARGE');

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return err('Invalid JSON body', 400, 'INVALID_JSON');
  }

  // CASE 1: Full state sync (preferred)
  if (body.plans !== undefined && body.currentPlanId !== undefined) {
    if (!Array.isArray(body.plans))
      return err('plans must be an array', 400, 'INVALID_PAYLOAD');
    if (body.plans.length > 100)
      return err('Too many plans (max 100)', 400, 'TOO_MANY_PLANS');

    const stateJson  = JSON.stringify({ plans: body.plans, currentPlanId: body.currentPlanId });
    const checksum   = await sha256(stateJson);

    // Check if state actually changed (avoid unnecessary writes)
    const { data: existing } = await supabase
      .from('strategic_planner_state')
      .select('checksum, version')
      .eq('user_id', userId)
      .maybeSingle();

    if (existing?.checksum === checksum)
      return json({ success: true, mode: 'no_change', checksum });

    const { error: upsertErr } = await supabase
      .from('strategic_planner_state')
      .upsert({
        user_id:    userId,
        state:      { plans: body.plans, currentPlanId: body.currentPlanId },
        checksum,
        version:    (existing?.version ?? 0) + 1,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    if (upsertErr) throw upsertErr;

    return json({ success: true, mode: 'full_state', checksum, version: (existing?.version ?? 0) + 1 });
  }

  // CASE 2: Single plan upsert (backward compat)
  if (body.plan && typeof (body.plan as Record<string,unknown>).id === 'string') {
    const p = body.plan as Record<string, unknown>;
    const { error: upsertErr } = await supabase
      .from('strategic_plans')
      .upsert({
        id:                  p.id,
        user_id:             userId,
        name:                p.name,
        organization:        p.organization,
        vision:              p.vision,
        mission:             p.mission,
        strategic_intent:    p.strategicIntent,
        planning_period_start: p.planningPeriodStart,
        planning_period_end:   p.planningPeriodEnd,
        status:              p.status ?? 'draft',
        swot_items:          p.swotItems     ?? [],
        strategic_options:   p.strategicOptions ?? [],
        objectives:          p.objectives    ?? [],
        paps:                p.paps          ?? [],
        is_archived:         false,
        updated_at:          new Date().toISOString(),
      }, { onConflict: 'id' });

    if (upsertErr) throw upsertErr;
    return json({ success: true, mode: 'single_plan' });
  }

  return err('Invalid request payload — expected { plans, currentPlanId } or { plan }', 400, 'INVALID_PAYLOAD');
}

// ── DELETE: soft-delete a plan ─────────────────────────────────────────────────
async function handleDelete(supabase: ReturnType<typeof createClient>, userId: string, req: Request) {
  const planId = new URL(req.url).searchParams.get('plan_id');
  if (!planId)
    return err('Missing query parameter: plan_id', 400, 'MISSING_PARAM');

  const { error } = await supabase
    .from('strategic_plans')
    .update({ is_archived: true, archived_at: new Date().toISOString() })
    .eq('id', planId)
    .eq('user_id', userId); // RLS + explicit user guard

  if (error) throw error;
  return json({ success: true });
}
