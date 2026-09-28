const CACHE_NAME = "hello-world-v2";

const FILES_TO_CACHE = [
  "/Helloworld/",
  "/Helloworld/helloworld.html",
  "/Helloworld/style.css",
  "/Helloworld/icon512.png",
  "/Helloworld/mypwa.json"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Caching app files");

        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request);
    }).catch(() => {
      // If the user navigates while offline,
      // serve the cached HTML page.
      if (event.request.mode === "navigate") {
        return caches.match("/Helloworld/helloworld.html");
      }
    })
  );
});
