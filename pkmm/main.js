function tachDanhSach(str)
{
    let danhSach = str. split(/\s+/).
        filter(s => {
            /*let bl = s.substr(0, 1) != "#";
            bl = bl && s.substr(0, 1) != ".";
            bl = bl && s.substr(0, 1) != "/";
            */
            
            bl = bl && s.match(/\/\./
        });
}
