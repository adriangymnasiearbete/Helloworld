const CACHE_NAME = "my-pwa-v1";

const FILES_TO_CACHE = [
  "./",
  "./helloworld.html",
  "./mypwa.json",
  "./icon512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});
