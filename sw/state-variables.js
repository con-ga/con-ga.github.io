var list = [];
self.addEventListener("install", function() {});
self.addEventListener("fetch", function(event) {
    event.respondWith((function() {
        const ind = list.indexOf(event.request.url);
        if (ind < 0) {
            list.push(event.request.url);
        }
    })());
});