self.addEventListener("install", function() {
    caches.open(myCache).then(cache => {
        cache.put(capNhat, new Response("abcdefg");
    });
});
//1
const myCache = "cache";
const capNhat = "capNhat";
function themCapNhat(link, date)
{
    
}
self.addEventListener("fetch", function(event) {
    event.respondWith(caches.open(myCache).then((cache) =>
        cache.match(capNhat))
});
