# Edge Function Security Audit — BIRD Validation Survey
## File: supabase/functions/ai-strategy-assistant/index.ts (35KB)

### ✅ Pre-Deployment Checklist

| # | Check | How to Verify | Severity |
|---|-------|---------------|----------|
| 1 | **No hardcoded API keys** | Run: `grep -nE "(sk-[a-zA-Z0-9]{20,}|api[_-]?key.*=.*[^$])" supabase/functions/ai-strategy-assistant/index.ts` | 🔴 Critical |
| 2 | **Secrets use Supabase Vault** | Verify: `Deno.env.get("OPENAI_API_KEY")` or `Deno.env.get("KIMI_API_KEY")` — NOT literal strings | 🔴 Critical |
| 3 | **Authorization header validated** | Check for: `req.headers.get("authorization")` and JWT validation via `supabase.auth.getUser()` | 🔴 Critical |
| 4 | **CORS properly configured** | Verify headers: `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers` | 🟡 High |
| 5 | **Rate limiting implemented** | Check for IP-based or user-based rate limiting (e.g., max 10 req/min per user) | 🟡 High |
| 6 | **Input sanitization** | Verify user messages are escaped/validated before sending to LLM API | 🟡 High |
| 7 | **No sensitive data in logs** | Ensure `console.log` does not output API keys, tokens, or PII | 🟢 Medium |
| 8 | **Function size < 1MB** | 35KB source is fine; verify compiled output is also reasonable | 🟢 Medium |

### 🔧 Required Fixes

#### 1. Secret Management (CRITICAL)
```typescript
// ❌ NEVER DO THIS:
const API_KEY = "sk-abc123...";

// ✅ CORRECT — use Supabase Vault / env vars:
const API_KEY = Deno.env.get("KIMI_API_KEY") || Deno.env.get("OPENAI_API_KEY");
if (!API_KEY) {
  return new Response(JSON.stringify({ error: "API key not configured" }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });
}
```

#### 2. Authorization Header Validation (CRITICAL)
```typescript
// Add at the TOP of the handler:
const authHeader = req.headers.get("authorization");
if (!authHeader?.startsWith("Bearer ")) {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

// Validate JWT with Supabase:
const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
  { global: { headers: { Authorization: authHeader } } }
);
const { data: { user }, error } = await supabaseClient.auth.getUser();
if (error || !user) {
  return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
}
```

#### 3. CORS Configuration
```typescript
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Or restrict to your domain
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Handle preflight:
if (req.method === "OPTIONS") {
  return new Response("ok", { headers: corsHeaders });
}
```

#### 4. Rate Limiting (Recommended)
```typescript
// Simple in-memory rate limiter (use Redis/DB for production):
const rateLimit = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 10; // requests
const WINDOW_MS = 60_000; // 1 minute

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(identifier);
  if (!entry || now > entry.reset) {
    rateLimit.set(identifier, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}
```

### 📁 Deployment Instructions

1. **Set secrets via Supabase CLI:**
   ```bash
   supabase secrets set KIMI_API_KEY="your-key-here"
   supabase secrets set OPENAI_API_KEY="your-key-here"
   ```

2. **Deploy function:**
   ```bash
   supabase functions deploy ai-strategy-assistant
   ```

3. **Verify CORS in Supabase Dashboard:**
   - Go to Project Settings → API → Edge Functions
   - Ensure CORS origins include your Vercel/Netlify domain

4. **Never commit `.env` files:**
   ```bash
   echo ".env*" >> .gitignore
   echo "supabase/.temp" >> .gitignore
   ```
