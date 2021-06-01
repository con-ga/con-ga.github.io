var list = ["abc.htm"];
self.addEventListener("install", function() {});
self.addEventListener("fetch", function(event) {
    event.respondWith((function() {
        const ind = list.indexOf(event.request.url);
        if (ind < 0) {
            list.push(event.request.url);
        }
        let lst = "";
        list.forEach((item) => {
            lst += "(" + item + ")\n";
        });
        return new Response(lst);
    })());
});