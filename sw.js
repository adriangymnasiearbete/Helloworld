const CACHE_NAME = "hello-world-v1";

const FILES_TO_CACHE = [
  "./",
  "./helloworld.html",
  "./icon512.png",
  "./mypwa.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Opening cache:", CACHE_NAME);

        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => {
        console.log("All files cached!");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("CACHE FAILED:", error);
        throw error;
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    clients.claim()
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
