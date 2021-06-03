let mcache;
let key;
function makeStorage(myCache, myKey)
{
    mcache = myCache;
    key = myKey;
}
function getItem(ten)
{
    return mcache.then(cache => cache.match(key)).
        then(response => response.json()
        ).then(data => data[ten]
        );
}
function setItem(ten, giaTri)
{
    let resp;
    mcache.then(cache => cache.match(key)).
        then(response => {
            resp = response;
            return response.json();
        }).then(data => {
            if (!data) {
                data = {};
            }
            data[ten] = giaTri;
            mcache.then(cache => {cache.
                put(resp.url, new Response(JSON.stringify(data)));
            });       
    })
}
function echo(msg)
{
    alert(msg);
}
export {makeStorage, setItem, getItem, echo};
