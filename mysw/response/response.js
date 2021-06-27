addEventListener("fetch", ev => {
    let url = ev.request.url;
    let resp;
    //if (!url.endsWith("x")) {
        resp = caches.open("offline")
        .then(cache => cache.match(url))
        .then(res => {
            if (res == undefine) {
                return new Response("No such file : " + url);
            }
            else {
                return res; 
            }
        });
    //}
    ev.respondWith(resp);
});