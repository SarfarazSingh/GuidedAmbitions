// sw.js – Service Worker for Guided Ambitions PWA (hosted under /GuidedAmbitions/)

const CACHE_NAME = "guided-ambitions-cache-v1";
const urlsToCache = [
  "index.html",
  "login.html",
  "job-identifier.html",
  "css/modern-ui.css",
  "css/custom.css",
  "css/jobstyle.css",
  "manifest.json",
  "images/icon-192.png",
  "images/icon-512.png",
  "components/skill_translator/index.html",
  "components/resume_generator/index.html",
  "components/ats_scanner/index.html",
  "components/interview_coach/index.html"
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
