/**
 * ============================================================================
 * BIRD 2026-2035 — Route Registry
 * Bangsamoro Investment Roadmap Development Platform
 * ============================================================================
 *
 * Central route metadata registry for the React SPA.
 * Replaces the legacy CommonJS route.js (was misplaced in src/pages/api/).
 *
 * Usage:
 *   import {
 *     ROUTE_REGISTRY,
 *     getRouteByPath,
 *     getNavigationRoutes,
 *     SEO_DEFAULTS,
 *   } from "@/lib/route-registry";
 *
 *   const route = getRouteByPath("/dashboard");
 *   const navItems = getNavigationRoutes();
 * ============================================================================
 */

export interface RouteDef {
  /** URL path (e.g., "/dashboard") */
  path: string;
  /** HTML filename for static fallback (e.g., "dashboard.html") */
  file: string;
  /** <title> tag and social-share title */
  title: string;
  /** <meta name="description"> content */
  description: string;
  /** Category key from ROUTE_CATEGORIES */
  category: keyof typeof ROUTE_CATEGORIES;
  /** Ascending nav position; null = hidden from nav */
  navOrder: number | null;
  /** Emoji icon for nav display */
  icon: string;
  /** true if login/session required */
  requiresAuth: boolean;
  /** Include in page-view analytics */
  analyticsPageView: boolean;
}

/** Default SEO metadata applied to every page unless overridden per-route. */
export const SEO_DEFAULTS = {
  siteName: "BIRD 2026-2035 | The Emerging Bangsamoro",
  titleTemplate: "%s | BIRD 2026-2035",
  twitterHandle: "@MTIT_BARMM",
  ogImage:
    "https://lydsisparsmvextskevw.supabase.co/storage/v1/object/public/bird-images/og-default.png",
} as const;

/** Human-readable category labels for grouping and UI display. */
export const ROUTE_CATEGORIES = {
  core: "Core Platform",
  survey: "Survey & Validation",
  legal: "Legal & Compliance",
  strategic: "Strategic Reference",
  provincial: "Provincial Outlook",
  supporting: "Supporting Resources",
} as const;

/** Complete registry of every public page on the BIRD platform. */
export const ROUTE_REGISTRY: readonly RouteDef[] = [
  /* ── Core Platform ──────────────────────────────────────────────────── */
  {
    path: "/",
    file: "index.html",
    title: "Interactive Strategy Map 2026-2035",
    description:
      "BARMM Investment Roadmap strategy map with BSC perspectives. Explore the Bangsamoro Investment Roadmap Development 2026-2035 interactive strategic planning platform.",
    category: "core",
    navOrder: 1,
    icon: "🗺️",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/dashboard",
    file: "dashboard.html",
    title: "Strategic MEL Dashboard",
    description:
      "Real-time Monitoring, Evaluation & Learning dashboard for tracking BARMM investment roadmap progress and performance indicators.",
    category: "core",
    navOrder: 2,
    icon: "📊",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/roadmap",
    file: "roadmap.html",
    title: "Strategic Investment Roadmap",
    description:
      "Comprehensive IEDS strategy guide and BSC perspectives. Navigate the Bangsamoro Investment Roadmap Development strategic investment roadmap.",
    category: "core",
    navOrder: 3,
    icon: "🛣️",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/action-plan",
    file: "action-plan.html",
    title: "One Year Action Plan 2026",
    description:
      "Phase 1 Foundation Building priority actions. Discover the BARMM strategic one-year action plan for 2026, focused on foundation-building initiatives.",
    category: "core",
    navOrder: 4,
    icon: "📋",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/contact",
    file: "contact.html",
    title: "Contact MTIT-BARMM",
    description:
      "Investment facilitation contact and inquiry form. Reach out to the Ministry of Trade, Investments and Tourism (MTIT-BARMM) for investment facilitation.",
    category: "core",
    navOrder: 5,
    icon: "📧",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/resources",
    file: "resources.html",
    title: "Resource Library",
    description:
      "Provincial outlooks, frameworks, and stakeholder resources. Access the BARMM resource library with investment outlooks, policy frameworks, and stakeholder guides.",
    category: "core",
    navOrder: 6,
    icon: "📚",
    requiresAuth: false,
    analyticsPageView: true,
  },

  /* ── Survey Routes ──────────────────────────────────────────────────── */
  {
    path: "/validation-survey",
    file: "validation-survey.html",
    title: "BIRD Validation Survey",
    description:
      "16-section stakeholder validation survey with offline support. Participate in the BIRD 2026-2035 stakeholder validation survey to help shape BARMM investment priorities.",
    category: "survey",
    navOrder: 7,
    icon: "📝",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/survey-orientation",
    file: "survey-orientation.html",
    title: "Survey Orientation",
    description:
      "Respondent briefing on C.A.R.E. framework and methodology. Learn about the BIRD survey methodology, the C.A.R.E. framework, and how stakeholder input shapes BARMM strategy.",
    category: "survey",
    navOrder: 8,
    icon: "🎓",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/survey-dashboard",
    file: "survey-dashboard.html",
    title: "Live Validation Results",
    description:
      "Real-time aggregate survey data dashboard with Chart.js. View live results from the BIRD stakeholder validation survey with real-time data visualization.",
    category: "survey",
    navOrder: 9,
    icon: "📈",
    requiresAuth: false,
    analyticsPageView: true,
  },

  /* ── Legal / Compliance ─────────────────────────────────────────────── */
  {
    path: "/privacy-policy",
    file: "privacy-policy.html",
    title: "Privacy Policy",
    description:
      "DPA 2012 compliant privacy policy for survey respondents. Read the BIRD platform privacy policy, compliant with the Philippine Data Privacy Act of 2012 (RA 10173).",
    category: "legal",
    navOrder: null,
    icon: "🔒",
    requiresAuth: false,
    analyticsPageView: false,
  },
  {
    path: "/cookie-policy",
    file: "cookie-policy.html",
    title: "Cookie Policy",
    description:
      "Cookie and local storage usage policy. Learn how the BIRD platform uses cookies and local storage to enhance your experience and support offline survey functionality.",
    category: "legal",
    navOrder: null,
    icon: "🍪",
    requiresAuth: false,
    analyticsPageView: false,
  },

  /* ── Strategic Reference ────────────────────────────────────────────── */
  {
    path: "/strategy-map",
    file: "strategy-map.html",
    title: "Strategy Map",
    description:
      "Visual strategy map with BSC perspectives and leverage points. Explore the BIRD strategy map showing Balanced Scorecard perspectives and strategic leverage points.",
    category: "strategic",
    navOrder: 10,
    icon: "🧭",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/kpi",
    file: "kpi.html",
    title: "Key Performance Indicators",
    description:
      "BSC-aligned KPI targets and metrics dashboard. View the BIRD Key Performance Indicators aligned with the Balanced Scorecard framework for BARMM investment monitoring.",
    category: "strategic",
    navOrder: 11,
    icon: "🎯",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/ieb",
    file: "ieb.html",
    title: "Investment Ecosystem Brief",
    description:
      "BARMM investment ecosystem overview and analysis. Read the Investment Ecosystem Brief analyzing the BARMM investment landscape, opportunities, and challenges.",
    category: "strategic",
    navOrder: 12,
    icon: "🏛️",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/options",
    file: "options.html",
    title: "Strategic Options",
    description:
      "IEDS, HEDS, GEMS, IFES strategy comparison. Compare BARMM strategic options including IEDS, HEDS, GEMS, and IFES frameworks for investment ecosystem development.",
    category: "strategic",
    navOrder: 13,
    icon: "⚖️",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/beie-basics",
    file: "beie-basics.html",
    title: "BEIE Framework Primer",
    description:
      "Bangsamoro Economic and Investment Ecosystem basics. Learn the fundamentals of the Bangsamoro Economic and Investment Ecosystem (BEIE) framework and its role in BARMM development.",
    category: "strategic",
    navOrder: 14,
    icon: "📖",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/slides",
    file: "slides.html",
    title: "Presentation Slides",
    description:
      "BIRD 2026-2035 slide deck and presentation materials. Access the official BIRD 2026-2035 presentation slides for stakeholder briefings and public presentations.",
    category: "strategic",
    navOrder: 15,
    icon: "🖼️",
    requiresAuth: false,
    analyticsPageView: true,
  },

  /* ── Provincial Outlook ─────────────────────────────────────────────── */
  {
    path: "/basilan-outlook",
    file: "basilan-outlook.html",
    title: "Basilan Provincial Outlook",
    description:
      "Economic outlook and investment profile for Basilan. Explore the economic outlook and investment opportunities in the Province of Basilan, BARMM.",
    category: "provincial",
    navOrder: 16,
    icon: "🏝️",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/lanao-delsur-outlook",
    file: "lanao-delsur-outlook.html",
    title: "Lanao del Sur Outlook",
    description:
      "Economic outlook and investment profile for Lanao del Sur. Explore the economic outlook and investment opportunities in the Province of Lanao del Sur, BARMM.",
    category: "provincial",
    navOrder: 17,
    icon: "🕌",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/maguindanao-delnorte-outlook",
    file: "maguindanao-delnorte-outlook.html",
    title: "Maguindanao del Norte Outlook",
    description:
      "Economic outlook for Maguindanao del Norte. Explore the economic outlook and investment opportunities in the Province of Maguindanao del Norte, BARMM.",
    category: "provincial",
    navOrder: 18,
    icon: "🌾",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/maguindanao-delsur-outlook",
    file: "maguindanao-delsur-outlook.html",
    title: "Maguindanao del Sur Outlook",
    description:
      "Economic outlook for Maguindanao del Sur. Explore the economic outlook and investment opportunities in the Province of Maguindanao del Sur, BARMM.",
    category: "provincial",
    navOrder: 19,
    icon: "🐟",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/sga-outlook",
    file: "sga-outlook.html",
    title: "Special Geographic Area Outlook",
    description:
      "Economic outlook for SGA areas. Explore the economic outlook and investment opportunities in the Special Geographic Area (SGA) of BARMM.",
    category: "provincial",
    navOrder: 20,
    icon: "🗾",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/tawi-tawi-outlook",
    file: "tawi-tawi-outlook.html",
    title: "Tawi-Tawi Provincial Outlook",
    description:
      "Economic outlook and investment profile for Tawi-Tawi. Explore the economic outlook and investment opportunities in the Province of Tawi-Tawi, BARMM.",
    category: "provincial",
    navOrder: 21,
    icon: "🐚",
    requiresAuth: false,
    analyticsPageView: true,
  },

  /* ── Supporting ─────────────────────────────────────────────────────── */
  {
    path: "/user-manual",
    file: "user-manual.html",
    title: "User Manual",
    description:
      "Platform navigation and module user guide. Learn how to navigate and use the BIRD 2026-2035 platform with this comprehensive user manual.",
    category: "supporting",
    navOrder: 22,
    icon: "❓",
    requiresAuth: false,
    analyticsPageView: true,
  },
  {
    path: "/actors-value-mapping",
    file: "actors-value-mapping.html",
    title: "Actors & Value Mapping",
    description:
      "Stakeholder actor mapping and value chain analysis. Explore stakeholder actor mapping and value chain analysis for the BARMM investment ecosystem.",
    category: "supporting",
    navOrder: 23,
    icon: "🤝",
    requiresAuth: false,
    analyticsPageView: true,
  },
] as const;

/* ─── Introspection Constants ───────────────────────────────────────────── */

export const TOTAL_ROUTES = ROUTE_REGISTRY.length;
export const NAV_VISIBLE_COUNT = ROUTE_REGISTRY.filter((r) => r.navOrder !== null).length;
export const AUTH_REQUIRED_COUNT = ROUTE_REGISTRY.filter((r) => r.requiresAuth).length;
export const ANALYTICS_TRACKED_COUNT = ROUTE_REGISTRY.filter((r) => r.analyticsPageView).length;

/* ─── Helper Functions ──────────────────────────────────────────────────── */

/** Look up a route definition by its URL path (case-sensitive, exact match). */
export function getRouteByPath(path: string): RouteDef | undefined {
  if (!path || typeof path !== "string") return undefined;
  const normalized = path.startsWith("/") ? path : "/" + path;
  return ROUTE_REGISTRY.find((route) => route.path === normalized);
}

/** Retrieve all routes that belong to a specific category. */
export function getRoutesByCategory(
  category: keyof typeof ROUTE_CATEGORIES
): RouteDef[] {
  if (!category || !ROUTE_CATEGORIES[category]) return [];
  return ROUTE_REGISTRY.filter((route) => route.category === category);
}

/** Get all routes visible in the main navigation, sorted by navOrder. */
export function getNavigationRoutes(): RouteDef[] {
  return ROUTE_REGISTRY
    .filter((route) => route.navOrder !== null)
    .sort((a, b) => (a.navOrder ?? 0) - (b.navOrder ?? 0));
}

/** Get all public routes (requiresAuth === false). */
export function getPublicRoutes(): RouteDef[] {
  return ROUTE_REGISTRY.filter((route) => !route.requiresAuth);
}

/** Get all routes tracked for analytics. */
export function getAnalyticsRoutes(): RouteDef[] {
  return ROUTE_REGISTRY.filter((route) => route.analyticsPageView);
}

/** Build the full HTML <title> for a given route. */
export function getPageTitle(route: RouteDef | undefined): string {
  if (!route?.title) return SEO_DEFAULTS.siteName;
  return SEO_DEFAULTS.titleTemplate.replace("%s", route.title);
}

/** Get the human-readable category label for a route. */
export function getCategoryLabel(route: RouteDef | undefined): string {
  if (!route?.category) return "Uncategorized";
  return ROUTE_CATEGORIES[route.category] ?? "Uncategorized";
}
