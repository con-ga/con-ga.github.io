let myCaches;
const CACHENAME = "datacache";
const KEY = "dulieu";
let promiseSet;
function makeStorage(caches)
{
    myCaches = caches;
}
function setItem(ten, giaTri)
{/*
    promiseSet = myCaches.open(CACHENAME).
        then(cache => {
            return cache.match(KEY);
        }).
        then(response => {
            if (!response) {
                return {};
            }
            return response.json();
        }).
        then(data => {
            data[ten] = giaTri;
            myCache.open(CACHENAME).
                then(cache => {
                   cache.put(KEY, new Response(JSON.stringify(data))); 
                })
        }).catch(err);
*/}
function getItem(ten)
{/*
    return promiseSet.then(() => {
        return myCaches.open(CACHENAME).
            then(cache => cache.match(KEY)).
            then(response => response.json()).
            then(data => data[ten]).catch(alert);
    });
*/}
function echo(msg)
{
    alert(msg);
}
export {makeStorage, setItem, getItem, echo}