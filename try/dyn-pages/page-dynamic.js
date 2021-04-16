self.addEventListener("install", function(ev) {
});
self.addEventListener("fetch", function(ev) {
    ev.respondWith(
        Promise.resolve(new Response("<html><body>(" + ev.request.url + ")<hr /></body></html>"))
    );
});
