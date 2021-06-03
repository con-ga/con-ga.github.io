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
    }).then(danhSach) => {
        
    });
}
