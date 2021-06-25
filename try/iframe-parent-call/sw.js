addEventListener("install", function () {});
addEventListener("fetch", function (ev) {
    ev.respondWith(new Response("(" + ev.request.url + ")"));
});
