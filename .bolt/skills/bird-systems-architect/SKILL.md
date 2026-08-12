---
name: bird-systems-architect
description: Architect, build, or refine components for the Bangsamoro Investment Roadmap Development (BIRD) 2026-2035 Platform. Use when the user says "build the SurveyWizard," "implement the SWOT formulas," "create the Systems Thinking CLD," "wire up Supabase edge functions," "design the MEL dashboard," "integrate the AI strategist," or "apply the BEIE framework." Use whenever someone is working on the Strat Planner Pro engine, strategic planning methodologies, or the BIRD platform's technical implementation.
license: MIT
metadata:
  version: 1.2.0
---

# BIRD 2026-2035 Systems Architect

Architect, build, and refine components for the Bangsamoro Investment Roadmap Development (BIRD) 2026-2035 strategic planning platform using the Strat Planner Pro engine.

---

## Core Directives

1. **Architectural Integrity**: Every component must map to the BEIE framework, 4 Strategic Pillars, and 5 Critical Leverage Points (LP1-LP5). See `references/beie-framework.md` for full mapping tables.

2. **Formula Fidelity**: Use exact BIRD formulas — never approximate. See `references/formulas.md` for all scoring equations (SWOT indices, 7-Criteria Matrix, BSC weighting, CLD archetype detection).

3. **Production-Ready Code**: Write TypeScript/React with shadcn/ui primitives. Follow the Liquid Glass aesthetic spec in `references/tech-stack.md`.

4. **Data Security**: Enforce Supabase RLS. Edge Functions must use environment secrets — never hardcode API keys. See `references/tech-stack.md` for security checklist.

---

## Reference File Index

Load these on demand based on the task:

| File | Read When | Content |
|------|----------|---------|
| `references/beie-framework.md` | Any architectural decision | Vision 2035, 4 Strategic Pillars, 5 CLPs, KPI-to-CLP mapping |
| `references/formulas.md` | Implementing scoring or calculations | SWOT indices (RI, Risk, VI), 7-Criteria Matrix, BSC causal linkage, IEDS sequencing |
| `references/methodologies.md` | Building methodology components | SWOT diagnostic flow, 9 Systems Archetypes, TOWS derivation logic, BSC 4-perspective spec |
| `references/mel-dashboard.md` | MEL/BICC work | 6 Pareto KPIs, Phase 1 action plan (10 actions), BICC integration specs |
| `references/surveywizard.md` | SurveyWizard work | 16-step survey structure, converter logic, scoring hooks, sync function spec |
| `references/tech-stack.md` | Implementation details | Full stack spec, Liquid Glass CSS, shadcn/ui components, responsive breakpoints, DB schema |

---

## Quick Reference

### BEIE Framework Summary

The platform is organized around the **Bangsamoro Economic and Investment Ecosystem (BEIE) Framework**, anchored by Moral Governance, executed through 4 Strategic Pillars:

| # | Pillar | Key Focus |
|---|--------|-----------|
| 1 | Halal Industry & Ecosystem | OIC/SMIIC certification, MSME capacity, halal tourism |
| 2 | Governance & Institutional Reform | BEGMP digital governance, BICC, moral governance |
| 3 | Infrastructure & Connectivity | ZBIP energy, solar mini-grids, broadband, Halal Park |
| 4 | Islamic Finance & Inclusive Growth | Al-Amanah Shariah financing, BIMP-EAGA, green economy |

### 5 Critical Leverage Points (CLPs)

Every feature must declare which CLP(s) it serves:

| CLP | Focus | Archetype |
|-----|-------|-----------|
| LP1 | Halal Certification System Integrity | Fixes that Fail |
| LP2 | Infrastructure–Energy–Connectivity Nexus | Limits to Growth |
| LP3 | Governance–Investor Confidence Feedback | Growth and Underinvestment |
| LP4 | Islamic Finance Ecosystem Development | Shifting the Burden |
| LP5 | Green Economy Revenue Framework | Tragedy of the Commons |

### Key Formulas (Compact)

Read `references/formulas.md` for complete spec. Critical formulas at a glance:

| Index | Formula | Scale |
|-------|---------|-------|
| RI (Strengths) | `(Impact x Likelihood) / 5` | 1-5 |
| RI (Opportunities) | `sqrt(Impact x Likelihood)` | 1-5 |
| Risk (Weaknesses) | `Impact x Likelihood` | 1-25 |
| VI (Threats) | `(Impact^2 x Likelihood) / 25` | 1-5 |

---

## Component Architecture Workflow

When asked to build or refine any component:

### Step 1: Determine Scope
Identify which BEIE pillar and CLP(s) the component serves. Reference `references/beie-framework.md`.

### Step 2: Select Formulas
Identify which mathematical formulas apply. Reference `references/formulas.md`. Copy the exact formula into your implementation.

### Step 3: Choose Methodology
Identify the strategic methodology involved. Reference `references/methodologies.md` for the correct workflow.

### Step 4: Implement
Write production-ready TypeScript/React code following `references/tech-stack.md`:

- Liquid Glass aesthetic: `#0A1628` bg, `#3B82F6` accents, glassmorphism effects
- shadcn/ui primitives as base components
- Zustand for state, React Query for server state
- Supabase for persistence with RLS
- Recharts/ECharts for visualizations

### Step 5: Validate
Confirm:
- [ ] All formulas match `references/formulas.md` exactly
- [ ] CLP mapping is explicit in component annotations
- [ ] shadcn/ui components are used where applicable
- [ ] RLS/security considerations are documented
- [ ] Responsive design follows breakpoints in `references/tech-stack.md`

---

## Output Format

When architecting or coding, provide:

1. **Architectural Overview** (2-3 sentences): Component's role in the BEIE framework, which CLP(s) it serves, and data flow.

2. **Implementation Code**: Production-ready TypeScript/React with:
   - shadcn/ui base components
   - Exact BIRD formulas (copy from `references/formulas.md`)
   - CLP linkage annotations in comments
   - Proper TypeScript types

3. **Annotations**: Explain key architectural decisions and CLP mappings.

4. **UX/UI Notes**: Reference Liquid Glass aesthetic tokens (`references/tech-stack.md`).

---

## Common Task Patterns

| User Request | Primary References | Key Considerations |
|-------------|-------------------|-------------------|
| "Build SurveyWizard" | `surveywizard.md`, `formulas.md` | 16-step flow, real-time scoring, localStorage fallback |
| "Implement SWOT" | `formulas.md`, `methodologies.md` | 4-quadrant scoring with exact RI/Risk/VI formulas |
| "Create CLD editor" | `methodologies.md`, `tech-stack.md` | Node/edge graph, R/B loop auto-detection, 9 archetypes |
| "Build MEL dashboard" | `mel-dashboard.md`, `beie-framework.md` | 6 Pareto KPIs, CLP badges, 3 view modes (Command/Executive/Public) |
| "Wire Edge Functions" | `tech-stack.md`, `surveywizard.md` | Deno runtime, env secrets, Zod validation, RLS |
| "Design BSC view" | `methodologies.md`, `formulas.md` | 4 perspectives, causal chain visualization, initiative mapping |
| "Integrate AI" | `tech-stack.md` | `ai-strategy-assistant` function, GPT-4o + Kimi, confidence scoring |
| "Apply BEIE framework" | `beie-framework.md` | Pillar alignment, CLP mapping, KPI linkage |
