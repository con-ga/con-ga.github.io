self.addEventListener("install", function(ev) {
});
self.addEventListener("fetch", function(ev) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'text/html');

    ev.respondWith(
        Promise.resolve(new Response("<html><body>(" + ev.request.url + ")<hr />" 
        + "<iframe src=\"http://www.google.com\" width=300 height=200 style=background:yellow ></iframe>" + "</body></html>", {headers:myHeaders}))
    );
});
