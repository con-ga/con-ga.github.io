let cache;
let key;
function makeStorage(myCache, myKey)
{
    cache = myCache;
    key = myKey;
}
function getItem(ten)
{
    return cache.match(key).
        then(response => response.json()
        ).then(data => data[ten]
        );
}
function setItem(ten, giaTri)
{
    let resp;
    cache.match(key).
        then(response => {
            resp = response;
            return response.json();
        }).then(data => {
            if (!data) {
                data = {};
            }
            data[ten] = giaTri;
            cache.match(key).put(resp.url, new Response(JSON.stringify(data)));
        })
}
export {makeStorage, setItem, getItem};
