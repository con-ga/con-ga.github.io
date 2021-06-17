self.addEventListener("install", function (evt) {

});

self.addEventListener("fetch", function (evt) {
    self.registration.pushNotification("Xin chao (" + evt.request.url + ")",
    {body : "xyz"});
});
