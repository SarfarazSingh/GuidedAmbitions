// sw.js – Service Worker for Guided Ambitions PWA (hosted under /GuidedAmbitions/)

const CACHE_NAME = "guided-ambitions-cache-v1";
const urlsToCache = [
  "/GuidedAmbitions/index.html",
  "/GuidedAmbitions/login.html",
  "/GuidedAmbitions/job-identifier.html",
  "/GuidedAmbitions/css/modern-ui.css",
  "/GuidedAmbitions/css/custom.css",
  "/GuidedAmbitions/css/jobstyle.css",
  "/GuidedAmbitions/manifest.json",
  "/GuidedAmbitions/images/icon-192.png",
  "/GuidedAmbitions/images/icon-512.png",
  "/GuidedAmbitions/components/skill_translator/index.html",
  "/GuidedAmbitions/components/resume_generator/index.html",
  "/GuidedAmbitions/components/ats_scanner/index.html",
  "/GuidedAmbitions/components/interview_coach/index.html"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
