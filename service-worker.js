const CACHE_NAME = 'huelvalate-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install Event: Cache core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Try to cache core assets, but don't fail if one is missing (dev environments vary)
      return cache.addAll(STATIC_ASSETS).catch(err => console.log('SW: Core assets cache warning', err));
    })
  );
  self.skipWaiting();
});

// Activate Event: Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: The caching logic
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. STRATEGY FOR IMAGES (Unsplash, etc.) -> Cache First, then Network
  // This saves bandwidth and loads instantly on revisit
  if (event.request.destination === 'image' || url.hostname.includes('unsplash.com')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          // Cache the new image
          if (!response || response.status !== 200 || response.type !== 'basic' && response.type !== 'cors' && response.type !== 'opaque') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
    );
    return;
  }

  // 2. STRATEGY FOR API/AI CALLS -> Network Only (Don't cache AI responses here, we use localStorage for that)
  if (url.pathname.includes('generative')) {
    return; // Let browser handle it naturally
  }

  // 3. STRATEGY FOR EVERYTHING ELSE (HTML, JS) -> Stale-While-Revalidate
  // Serve from cache immediately, but update in background
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      }).catch(() => {
        // Offline fallback logic could go here
      });
      return cachedResponse || fetchPromise;
    })
  );
});