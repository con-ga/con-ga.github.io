class GoTu {
    goKiTu (kiTu) {
        let phim = kieuGo.laPhimThanh(kiTu);
        if (phim != -1) {
            
            return;
        }    
    }
    timKiTu(phimDau) {
        let i = this.tu.length - 1;
        let mth;
        let kiTu;
        let dk;
        //là phím thanh
        if (!(phimDau instanceof Array)) {
            dk = v => {
                v.mu <
            }
        }
        while (i >= 0) {
            kiTu = this.tu[i];
            mth = timMuThanh(kiTu);
            if (mth == -1) {
                i--;
                continue;
            }
            if (!(phim instanceof Array)) {
                
            }
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
let s = "acbd";
s[1]= "b";
console.log(s);
for (let i of s) {
    console.log(i);
}
console.log(1 instanceof Array);