var CACHE_NAME = 'caches';
var urlsToCache = [
  '/try/caches/list-caches.htm',
  '/try/caches/mot.htm',
  '/try/caches/hai.htm',
  '/try/caches/ba.htm'
  '/try/caches/lst6.htm
];
console.log("service worker global");
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

self.addEventListener('message', function(ev) {
    self.clients.matchAll().then( (clients) => {
    if (clients && clients.length) {
        // you need to decide which clients you want to send the message to..
        const client0 = clients[0];
        let urls;
        
    console.log(event.data);
        clients.forEach(function(client, ind, arr) {
client.postMessage( {msg: "abc", urls: ["google.com"]}););
    });
});
});
/*caches.open(CACHE_NAME).then(function(cache) {
cache.keys().then(function (keys) {
    urls = keys.map(request => request.url);
});
});*/
