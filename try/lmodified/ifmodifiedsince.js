self.addEventListener("message", function (ev) {
    const headers = new Headers();
    if (ev.data.lmodified != undefined) {
        headers.append("If-Modified-Since", ev.data.lmodified);
    }
    fetch(ev.data.url, {headers : headers})
    .then(resp => ev.source.postMessage(resp));
});
