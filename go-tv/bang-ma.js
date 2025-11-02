class BangMa {
    muThanh(ch) {
        const na = this.ma.indexOf(ch);
        if (na < 0) return null;
        if (na < 72) {
            return {
                mu : Math.floor(na / 6),
                thanh: na % 6
            };
        }
        return {
            mu : 12 + na % 2,
            thanh : 0
        };
    }
    khoangDauMu (dauMu) {
        const kdm = this.khongDauMu
            .filter(k => dauMu >= k[0] && dauMu <= k[1])
            [0]
        ;
        return kdm;
    }
    constructor () {
        const m = [
            [0, 2],
            [3, 4],
            [6, 8],
            [9, 10],
            [12, 13]
        ];
        this.khongDauMu = m;
    }    
}
class Unicode extends BangMa {
    constructor () {
        super();
const nguyenAm =
("a à á ả ã ạ "
+"ă ằ ắ ẳ ẵ ặ "
+"â ầ ấ ẩ ẫ ậ "
+"e è é ẻ ẽ ẹ "
+"ê ề ế ể ễ ệ "
+"i ì í ỉ ĩ ị "
+"o ò ó ỏ õ ọ "
+"ô ồ ố ổ ỗ ộ "
+"ơ ờ ớ ở ỡ ợ "
+"u ù ú ủ ũ ụ "
+"ư ừ ứ ử ữ ự "
+"y ỳ ý ỷ ỹ ỵ d đ").split(" ");
        this.ma = nguyenAm;
    }
}
let u = new Unicode;
console.log(u.muThanh("đ"));
console.log(u.khoangDauMu(12));
class BoGo {
    goThanh (thanh, kiTu) {
        if (thanh == kiTu.thanh) {
            kyTu.thanh = 0;
            return kyTu;
        }
        kyTu.thanh = thanh;
        return kyTu;
    }
    goMu (mu, kyTu) {
        
    }
}