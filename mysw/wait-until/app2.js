self.addEventListener("install", function (evt) {

});

self.addEventListener("fetch", function (evt) {
    /*self.registration.pushNotification("Xin chao (" + evt.request.url + ")",
    {body : "xyz"});*/
    if (!evt.request.url.contains("app2.js")) {
        evt.respondWith(new Response("cdefgab<hr />" + evt.request.url));
        return;
    }
    evt.respondWith(fetch("app2.js"));
});
//
