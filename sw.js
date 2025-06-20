// sw.js – Service Worker for Guided Ambitions PWA

const CACHE_NAME = "guided-ambitions-cache-v2";
const urlsToCache = [
  "/index.html",
  "/job-identifier.html",
  "/login.html",
  "/css/jobstyle.css",
  "/manifest.json",
  "/images/icon-192.png",
  "/images/icon-512.png",
  "/components/skill_translator/index.html",
  "/components/resume_generator/index.html",
  "/components/ats_scanner/index.html",
  "/components/interview_coach/index.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).then(() => self.skipWaiting());
    }).catch((error) => {
      console.error("Cache installation failed:", error);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((networkResponse) => {
        if (event.request.url.startsWith(self.location.origin)) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      }).catch(() => {
        return caches.match("/index.html"); // Fallback to index.html offline
      });
    })
  );
});