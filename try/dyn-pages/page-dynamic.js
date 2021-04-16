self.addEventListener("install", function(ev) {
});
self.addEventListener("fetch", function(ev) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'text/html');

    ev.respondWith(
        Promise.resolve(new Response("<html><body>(" + ev.request.url + ")<hr /></body></html>", {headers:myHeaders}))
    );
});
