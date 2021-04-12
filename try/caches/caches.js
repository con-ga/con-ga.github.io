var CACHE_NAME = 'caches';
var urlsToCache = [
  '/try/caches/list-caches.htm'
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

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('message', function(event) {
  // find the client(s) you want to send messages to:
self.clients.matchAll(/* search options */).then( (clients) => {
    if (clients && clients.length) {
        // you need to decide which clients you want to send the message to..
        const client = clients[0];
        client.postMessage(event.data);
    }
});