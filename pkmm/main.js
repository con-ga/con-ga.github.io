function tachDanhSach(str)
{
    let danhSach = str. split(/\s+/).
        filter(s => {
            let bl = !s.match(/^[#\/\.]/);
            bl = bl && !s.match(/\/\./);
            return bl;
        });
}
