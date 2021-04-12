var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  'index.htm',
  'main.css',
  'main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", function(e) {
  e.respondWith((async function() {
    const cachedResponse = await caches.match(e.request);
    if (cachedResponse) {
      return cachedResponse;
    }

    let networkResponse ;//= await fetch(e.request);

    const hosts = [
      'https://www.google.com',
"https://ngocyendoan.blogspot.com/2021/04/window.html?m=1"
    ];

    if (hosts.some((host) => e.request.url.startsWith(host))) {
      // This clone() happens before `return networkResponse`
      networkResponse = await fetch(e.request, {mode: 'no-cors'}); 
      const clonedResponse = networkResponse.clone();

      e.waitUntil((async function() {
        const cache = await caches.open(CACHE_NAME);
        // This will be called after `return networkResponse`
        // so make sure you already have the clone!
        await cache.put(e.request, clonedResponse);
      })());
    }

    return networkResponse;
  })());
});
