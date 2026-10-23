const CACHE_NAME = "path-of-strength-3.2.13:" + self.registration.scope;
const APP_SHELL = ["./practice-opening.png",
  "./",
  "./brand-logo.png",
  "./ex-b-stance-deadlift.webp",
  "./ex-b-stance-hip-thrust.webp",
  "./ex-bicep-curl.webp",
  "./ex-box-pistol.webp",
  "./ex-bridge-floor-press.webp",
  "./ex-bulgarian-split-squat.webp",
  "./ex-calf-raise.webp",
  "./ex-chin-up.webp",
  "./ex-cook-drill-march.webp",
  "./ex-crunch.webp",
  "./ex-double-clean.webp",
  "./ex-double-front-squat.webp",
  "./ex-double-push-press.webp",
  "./ex-double-sumo-deadlift.webp",
  "./ex-false-grip-pull-up.webp",
  "./ex-front-rack-carry.webp",
  "./ex-front-rack-march.webp",
  "./ex-get-up-sit-up.webp",
  "./ex-get-up.webp",
  "./ex-goblet-squat.webp",
  "./ex-gorilla-row.webp",
  "./ex-hack-squat.webp",
  "./ex-half-kneeling-press.webp",
  "./ex-half-kneeling-windmill.webp",
  "./ex-hand-to-hand-swing.webp",
  "./ex-high-pull.webp",
  "./ex-hip-thrust.webp",
  "./ex-lateral-raise.webp",
  "./ex-military-press.webp",
  "./ex-one-arm-swing.webp",
  "./ex-overhead-carry.webp",
  "./ex-pull-up.webp",
  "./ex-push-jerk.webp",
  "./ex-push-up.webp",
  "./ex-rear-delt-fly.webp",
  "./ex-reverse-crunch.webp",
  "./ex-reverse-lunge.webp",
  "./ex-side-bend.webp",
  "./ex-side-lunge-cossack.webp",
  "./ex-single-leg-deadlift.webp",
  "./ex-single-leg-hip-thrust.webp",
  "./ex-skater-squat.webp",
  "./ex-small-row.webp",
  "./ex-snatch.webp",
  "./ex-step-up.webp",
  "./ex-suitcase-carry.webp",
  "./ex-top-down-press.webp",
  "./ex-tricep-extension.webp",
  "./ex-two-arm-swing.webp",
  "./ex-viking-push-press.webp",
  "./ex-wide-row.webp",
  "./ex-wood-chopper.webp",
  "./favicon-64.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./index.html",
  "./manifest.json",
  "./path-background.png",
  "./path-header.png",
  "./scene-carry.jpg",
  "./scene-temple.jpg",
  "./sound-gong.wav",
  "./sound-ting.wav",
  "./widget-lessons.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME && (key.startsWith("path-of-strength-") || key.startsWith("way-of-the-bell-"))).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if(event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if(cached) return cached;

      return fetch(event.request).then(response => {
        if(!response || response.status !== 200 || response.type === "opaque"){
          return response;
        }

        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match("./index.html"));
    })
  );
});









