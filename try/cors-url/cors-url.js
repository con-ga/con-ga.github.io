self.addEventListener("fetch", function(ev) {
    const u = ev.request.url.indexOf("?url=");
    let url;
    if (u < 0) {
        const i = ev.request.url.indexOf("?iframe=");
        let headers = new Headers({"Content-Type" : "text/html"});
        ifr = ev.request.url.substring(i + 8);
        let html = "<body>" + ev.request.url + "<hr /><iframe src='" + ifr + "' width=500 height=400></iframe><hr />" + "<iframe width=500 height=400 src='page.x?url=" + ifr + "'></iframe></body>";
        ev.respondWith(new Response(html, {headers : headers}));
    }
    else {
        url = ev.request.url.substring(u + 5);
        ev.respondWith(
            (async function() {
               const page = await fetch(url, {mode : "no-cors"}); 
               return page;
            })()
        );
    }
  
});
