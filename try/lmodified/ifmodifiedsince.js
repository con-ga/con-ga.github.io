self.addEventListener("install", (ev) => {
    ev.waitUntil(
        caches.open("cache")
        .then(cache => cache.addAll([
            "ifmodifiedsince2.htm",
            "reg.htm",
            "ifmodifiedsince.js"
        ]))
    );
});

self.addEventListener("fetch", function (ev) {
    const response = caches.match(ev.request)
    .then(resp => {
        if (resp == undefined) {
            return new Response("{error : \"Không có nội dung\"}");
        }
        return resp;
    });
    ev.respondWith(response);
});

self.addEventListener("message", function (ev) {
    const headers = new Headers();
    if (ev.data.lmodified != undefined) {
        headers.append("If-Modified-Since", ev.data.lmodified);
    }
    let status;
    let modf;
    fetch(ev.data.url, {headers : headers})
    .then(resp => {
        status = resp.status;
        modf = resp.headers.get("Date");
        return resp.text();
    }).then(txt => ev.source.postMessage({status : status, text : txt, lmodified : modf})
    );
});