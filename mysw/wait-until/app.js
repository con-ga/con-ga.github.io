self.addEventListener("install", function (evt) {

});

self.addEventListener("fetch", function (evt) {
    selt.registration.pushNotification("Xin chao (" + evt.request.url + ")");
});
