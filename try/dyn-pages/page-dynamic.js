self.addEventListener("install", function(ev) {
});
self.addEventListener("fetch", function(ev) {
    console.log("gg " + ev.request.url);
    const ind = ev.request.url.indexOf("google");
    if (ind >= 0) {
        console.log("google.com");
        /*fetch(ev.request.url, {mode : 'no-cors'}).then(function(response) {
            ev.respondWith(response);*/
        ev.respondWith(fetch(new Request("https://thu-3.blogspot.com", {mode : 'no-cors'})));
            
        //});
    } else {
        if (ev.request.url.indexOf("index") >= 0) {
            ev.respondWith(
                fetch(ev.request.url, {mode : "no-cors"})
            );
        } else {
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'text/html');

            ev.respondWith(
                Promise.resolve(new Response("<html><body>(" + ev.request.url + ")<hr />" 
                + "<iframe src=\"https://thu-3.blogspot.com\" width=300 height=200 style=background:yellow ></iframe>" 
                + "<iframe src=\"https://con-ga.github.io/try/dyn-pages/google.htm\" width=400 height=300 style=background:cyan ></iframe>"
                + "</body></html>", {headers:myHeaders}))
            );
        }
    }
});
