---
name: survey-lifecycle-orchestrator
description: "Automate the end-to-end lifecycle of validation surveys for the Bangsamoro Investment Roadmap (BIRD). Orchestrates survey architecture, interactive question generation (scales, word clouds, pin-on-image, 2x2 grids, ranking, 100-point allocation), deployment across web/mobile/email, real-time response analysis, and continuous iteration. Triggers when users mention: validation survey, survey design, survey deployment, survey iteration, stakeholder feedback collection, interactive survey questions, survey analytics, survey lifecycle, or BIRD survey operations."
---

# Survey Lifecycle Orchestrator

Automate the complete lifecycle of BIRD validation surveys — from translating orientation briefs into interactive instruments, through multi-channel deployment, to real-time analysis and continuous iteration aligned with the Bangsamoro Investment Roadmap.

## Core Workflow

```text
Orientation Brief + Actor Datasets
     |
     v
 [Design]  --(references/survey-design.md)-->  Question Architecture + Interactive Types
     |
     v
 [Build]   -->  Schema + Web Integration (React/Vite + Supabase + react-hook-form)
     |
     v
 [Deploy]  --(references/deployment.md)-->   Multi-Channel + DPA 2012 Compliance
     |
     v
 [Analyze] --(references/analysis.md)-->     Real-Time Dashboard + Influence Scoring
     |
     v
 [Iterate] -->  Auto-Refine + Version Control (GitHub)
     |
     v
 Validated Insights --> MEL Dashboard / Investment Planning