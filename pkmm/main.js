function tachDanhSach(str)
{
    let danhSach = str. split(/\s+/).
        filter(s => {
            let bl = !s.match(/^[#\/\.]/);
            bl = bl && !s.match(/\/\./);
            return bl;
        });
    return danhSach;
}
function layNoiDung(noiDung, hamLay)
{
    hamLay("danh-sach.htm").then(response =>
        response.text()
    ).then(txt => {
        alert(txt);
        return txt;
    }).catch(err => {

    }).then(txt => {
        return tachDanhSach(txt);
    }).then(danhSach => {
        alert(danhSach);
        let promise = Promise.resolve(true);
        danhSach.forEach(tapTin => {
            promise = promise.then(() => {
                return hamLay(tapTin).
                    then(response => response.text()).
                    then(alert);
            });
        });
    });
}
function main()
{
    alert("layNoiDung");
    layNoiDung({}, fetch);
    alert("het layNoiDung");
}
alert("main.js 6");
