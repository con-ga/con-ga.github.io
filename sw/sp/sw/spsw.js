self.addEventListener("install", function() {
    caches.open(myCache).then(cache => {
        cache.put(capNhat, new Response("abcdefg1234"));
    });
});
//4
const myCache = "cache";
const capNhat = "capNhat";
function themCapNhat(link, date)
{
    
}
self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.open(myCache).then((cache) =>
            cache.match(capNhat)/*.then(response =>
                {return response;}
            )*/
        )
    )
});
