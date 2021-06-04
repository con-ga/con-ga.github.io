let myCaches;
const CACHENAME = "datacache";
const KEY = "dulieu";
let promiseSet;
let dat;
function makeStorage(caches)
{
    myCaches = caches;
}
function setItem(ten, giaTri)
{
    promiseSet = myCaches.open(CACHENAME).
        then(cache => {
            return cache.match(KEY);
        }).
        then(response => {
            if (!response) {
                alert("{}");
                return {};
            }
            return response.json();
        }).
        /*then(data => {
            data[ten] = giaTri;
            alert(JSON.stringify(data));
            myCaches.open(CACHENAME).
                then(cache => {
                   cache.put(KEY, new Response(JSON.stringify(data))); 
                }).catch(msg => alert("open cache: " + msg));
        }).catch(alert);*/
        then(data => {
            data[ten] = giaTri;
            dat = data;
            alert("data:\n" + JSON.stringify(data));
            return myCaches.open(CACHENAME);
        }).then(cache => {
            cache.put(KEY, new Response(JSON.stringify(dat)));
        }).catch(alert);
}
function getItem(ten)
{
    return promiseSet.then(() => {
        return myCaches.open(CACHENAME).
            then(cache => cache.match(KEY)).
            then(response => response.json()).
            then(data => data[ten]).catch(alert);
    });
}
function echo(msg)
{
    alert(msg);
}
export {makeStorage, setItem, getItem, echo};
