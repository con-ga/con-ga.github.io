self.addEventListener("install", function(ev) {
});
self.addEventListener("fetch", function(ev) {
    ev.respondWith(
        return Promise.resolve(new Response("(" + ev.request.url + ")<hr />");
    );
});