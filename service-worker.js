const CACHE_NAME = "sub-new2";
var urlsToCache = [
  "/",
  "nav.html",
  "index.html",
  "icon-512px.png",
  "icon-192px.png",
  "manifest.json",
  "pages/home.html",
  "pages/about.html",
  "pages/kegiatan.html",
  "pages/contact.html",
  "images/desain.jpg",
  "images/networking.jpg",
  "images/esport.jpg",
  "images/seminar.jpg",
  "images/sport.jpg",
  "images/panitia.jpg",
  "css/materialize.css",
  "css/materialize.min.css",
  "css/custom.css",
  "js/materialize.min.js",
  "js/nav.js"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
