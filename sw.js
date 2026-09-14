// Judweb — service worker
// Cachea la plataforma completa la primera vez que se visita con internet
// para que después funcione sin conexión (excepto los videos de YouTube,
// que siempre necesitan datos móviles o wifi para reproducirse).

const CACHE_NAME = "judweb-cache-v1";

const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/apple-touch-icon.png",
  "./apps/cuadernillo/index.html",
  "./apps/corrector/index.html",
  "./apps/corrector/style.css",
  "./apps/corrector/script.js",
  "./apps/mecanografia/index.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Estrategia: primero red (para tener contenido actualizado si hay internet),
// y si falla (sin conexión), responde con lo que haya en el caché.
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // Nunca interceptamos pedidos a otros dominios (ej: YouTube, Google Fonts).
  if (new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        return res;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match("./index.html")))
  );
});
