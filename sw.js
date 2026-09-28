const CACHE_NAME = "hello-world-v3";

const FILES_TO_CACHE = [
  "/Helloworld/",
  "/Helloworld/index.html",
  "/Helloworld/mypwa.json",
  "/Helloworld/icon512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {

      for (const file of FILES_TO_CACHE) {
        try {
          await cache.add(file);
          console.log("CACHED:", file);
        } catch (error) {
          console.error("FAILED TO CACHE:", file, error);
        }
      }

    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
