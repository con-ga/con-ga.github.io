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
        ).then(txt => {
            alert(JSON.stringify(txt));
            return txt;
        }).then(data => data[ten]
        );
}
function setItem(ten, giaTri)
{
    //let resp;
    alert("set item 1");
    let myCache;
    mcache.then(cache => {
            myCache = cache;
            return cache.match(key);
        }).
        then(response => {
            if(!response) {
                return {};
            }
            //resp = response;
            alert(/*resp.url*/key + " url");
            return response.json();
        }).then(data => {
            /*if (!data) {
                data = {};
            }*/
            data[ten] = giaTri;
            alert("data json:\n" + JSON.stringify(data));
            myCache.
                put(key, new Response(JSON.stringify(data)));;
            return data;       
        }).catch(alert);
}
function echo(msg)
{
    alert(msg);
}
function keys()
{
    alert("keys 1");
    mcache.then(cache => cache.keys()).
        then(keys => keys.map(req=> req.url)).
        then(alert);
    alert("keys 2");
}
export {makeStorage, setItem, getItem, echo, keys};
