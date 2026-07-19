
self.addEventListener("install", e => {
  e.waitUntil(caches.open("mehrad-v1").then(cache => cache.addAll([
    "./", "./index.html", "./styles.css", "./app.js", "./manifest.webmanifest", "./assets/logo.svg"
  ])));
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
