/**
 * BIRD Validation Survey — Service Worker
 * Location: public/service-worker.js (copied as-is to build root)
 * 
 * Strategy:
 *  - App Shell: Cache-first for HTML/JS/CSS bundles (offline-capable SPA)
 *  - API Calls: Network-first with timeout fallback for Supabase/Edge Functions
 *  - Images/Assets: Stale-while-revalidate for static resources
 *  - Survey Submissions: BackgroundSync + IndexedDB queue for offline resilience
 */

const CACHE_VERSION = 'bird-survey-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const API_CACHE = `${CACHE_VERSION}-api`;

// Assets to pre-cache on install (app shell)
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  // Vite build chunks are hashed — we cache them dynamically via runtime
];

// Routes that should never be cached (auth, admin, etc.)
const NETWORK_ONLY = [
  /\/auth\/v1\//,
  /\/rest\/v1\/auth/,
  /supabase\.co\/auth/,
];

// API patterns — network-first with cache fallback
const API_PATTERNS = [
  /supabase\.co\/functions\/v1/,
  /supabase\.co\/rest\/v1/,
  /\.supabase\.co/,
];

// Image/asset patterns — stale-while-revalidate
const ASSET_PATTERNS = [
  /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
  /storage\/v1\/object\/public/,
];

// ─────────────────────────────────────────────────────────────────────────────
// INSTALL — Pre-cache app shell
// ─────────────────────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
      .catch((err) => console.error('[SW] Pre-cache failed:', err))
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVATE — Clean up old caches
// ─────────────────────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name.startsWith('bird-survey-') && name !== CACHE_VERSION)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// FETCH — Route-specific strategies
// ─────────────────────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests (except for background sync submissions)
  if (request.method !== 'GET' && !url.pathname.includes('survey-submit')) {
    return;
  }

  // 1. NETWORK ONLY — Auth endpoints
  if (NETWORK_ONLY.some((pattern) => pattern.test(url.href))) {
    event.respondWith(fetch(request));
    return;
  }

  // 2. API — Network-first with 5s timeout fallback
  if (API_PATTERNS.some((pattern) => pattern.test(url.href))) {
    event.respondWith(networkFirst(request, API_CACHE, 5000));
    return;
  }

  // 3. IMAGES / ASSETS — Stale-while-revalidate
  if (ASSET_PATTERNS.some((pattern) => pattern.test(url.href))) {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE));
    return;
  }

  // 4. NAVIGATION / HTML — Cache-first with network fallback
  if (request.mode === 'navigate') {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // 5. STATIC BUNDLES (JS/CSS from Vite) — Cache-first
  if (/\.(?:js|css)$/.test(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Default: network with cache fallback
  event.respondWith(networkFirst(request, STATIC_CACHE, 3000));
});

// ─────────────────────────────────────────────────────────────────────────────
// STRATEGY HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Cache-First: Serve from cache; fetch & update cache on miss */
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (err) {
    console.error('[SW] Cache-first fetch failed:', err);
    // Return a generic offline fallback if available
    const fallback = await cache.match('/index.html');
    if (fallback) return fallback;
    throw err;
  }
}

/** Network-First: Try network; fallback to cache after timeout */
async function networkFirst(request, cacheName, timeoutMs = 5000) {
  const cache = await caches.open(cacheName);

  return Promise.race([
    fetch(request)
      .then((response) => {
        if (response.ok) {
          cache.put(request, response.clone());
        }
        return response;
      })
      .catch(() => cache.match(request)),
    new Promise((resolve) =>
      setTimeout(() => resolve(cache.match(request)), timeoutMs)
    ),
  ]).then((result) => {
    if (result instanceof Response) return result;
    throw new Error('[SW] Network-first: no cache fallback available');
  });
}

/** Stale-While-Revalidate: Serve cache immediately; update in background */
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkFetch = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch((err) => {
      console.warn('[SW] SWR network fetch failed:', err);
      return cached;
    });

  return cached || networkFetch;
}

// ─────────────────────────────────────────────────────────────────────────────
// BACKGROUND SYNC — Queue offline survey submissions
// ─────────────────────────────────────────────────────────────────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'survey-submit-sync') {
    console.log('[SW] Background sync triggered: survey-submit-sync');
    event.waitUntil(flushSubmissionQueue());
  }
});

/** Flush queued survey submissions from IndexedDB */
async function flushSubmissionQueue() {
  // This relies on the app storing failed submissions in IndexedDB
  // The app should call: navigator.serviceWorker.ready.then(sw => sw.sync.register('survey-submit-sync'))
  // Implementation note: The app layer (useStrategicPlan.ts or api.ts) should handle
  // the actual queue logic. This SW just triggers the sync event.
  console.log('[SW] Flush queue — delegate to app layer via postMessage');
  const clients = await self.clients.matchAll({ type: 'window' });
  clients.forEach((client) =>
    client.postMessage({ type: 'FLUSH_SUBMISSION_QUEUE' })
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PUSH NOTIFICATIONS (Optional — ready for future use)
// ─────────────────────────────────────────────────────────────────────────────
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || 'BIRD Survey', {
      body: data.body || 'You have a new notification.',
      icon: '/icon-192.png',
      badge: '/badge-72.png',
      data: data.url || '/',
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow(event.notification.data || '/')
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// MESSAGE HANDLER — Allow app to communicate with SW
// ─────────────────────────────────────────────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data?.type === 'GET_VERSION') {
    event.ports[0]?.postMessage({ version: CACHE_VERSION });
  }
});
