function tachDanhSach(str)
{
    let danhSach = str. split(/\s+/).
        filter(s => {
            let bl = !s.match(/^[#\/\.]/);
            bl = bl && !s.match(/\/\./);
            return bl;
        });
}
function layNoiDung(noiDung, hamLay)
{
    hamLay("danh-sach.htm").then(response =>
        response.text()
    ).catch(err => {

    }).then(txt => {
        return tachDanhSach(txt);
    }).then(danhSach => {
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
    layNoiDung({}, fetch);
}
