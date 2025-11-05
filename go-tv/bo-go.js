import {Unicode} from "./bang-ma.js";
import {Telex} from "./kieu-go.js";

class GoTu {
    goKiTu (kiTu) {
        let phim = kieuGo.laPhimThanh(kiTu);
        if (phim != -1) {
            
            return;
        }    
    }
    kiTuThemThanh(phimThanh) {
        const  dk = v => {
            if (v === null || v.mu < 12)
                return v;
            return null;
        };
        const kt = this.duyetKiTu();
        let na = 2;
        let j;
        for (const i of kt) {
            console.log(i,dk(i[0]));
            if (na <= 0) break;
            if (dk(this.bangMa.muThanh(i[0])) !== null) {
                na--;
                j = i[1];
                continue;
            }
            if (na < 2 && !dk (i[0])) break;            
        }
        na = 2 - na;
        return [j, na, phimThanh];
    }
    timKiTu(phimDau) {
        let mth;
        let kiTu;
        let dk;
        //là phím thanh
        if (!(phimDau instanceof Array)) {
           
        }
        else {
            dk = v => {
                if (v === null) return false;
                for (const i of phimDau) {
                    const j = this.bangMa.khoangDauMu(i);
                    if (v.mu >= j[0] && v.mu <= j[1])
                        return true;
                }
                return false;
            };
        }
        console.log(dk);
        const kt = this.duyetKiTu();
        for (const i of kt) {
            console.log(i,dk(this.bangMa.muThanh(i[0])));
        }    
    }
    *duyetKiTu () {
        let n = this.tu.length;
        while (n--) {
            yield [this.tu[n], n];
        }
    }
    constructor (kieuGo, bangMa, tu) {
        if (!tu) tu = "";
        this.tu = tu;
        this.kieuGo = kieuGo;
        this.bangMa = bangMa;
    }
    ganTu (tu) {
        this.tu = tu;
    }
}
function test() {
let s = "acbd";
//s[1]= "b";
console.log(s);
for (let i of s) {
    console.log(i);
}
console.log(1 instanceof Array);
let o= new GoTu(new Telex,new Unicode,"1dfghjđ");
console.log(o.kiTuThemThanh("r"));
}
test();