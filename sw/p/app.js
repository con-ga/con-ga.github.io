addEventListener("install", function () {});
addEventListener("fetch", function (ev) {
    let url = ev.request.url;
    caches.open(OFFLINE)
    .then(cache => cache.match(url))
    .then(response => {
        if (response == undefined) {
            ev.respondWith(new Response("response undefined"));
        }
        else {
            
            ev.respondWith(response);
        }
    })
});
