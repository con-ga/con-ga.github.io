const OFFLINE = "offline";
addEventListener("install", function () {});
addEventListener("fetch", function (ev) {
    let url = ev.request.url;
    let resp;
    caches.open(OFFLINE)
    .then(cache => cache.match(url))
    .then(response => {
        if (response == undefined) {
            resp = new Response("response undefined");
        }
        else {
            resp = response;
        }
        ev.respondWith(resp);
    }).catch(() => {
        ev.respondWith(new Response("error, " + url));
    });
});//
