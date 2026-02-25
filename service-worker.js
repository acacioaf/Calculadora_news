const urlsToCache = [
  "NEWS_ICM.html",
  "manifest.json",
  "logo_topo.png"
];

// instala e salva arquivos no cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// responde usando cache quando offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});