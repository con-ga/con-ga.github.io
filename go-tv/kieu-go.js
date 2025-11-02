class KieuGo {
    
    laPhimDau(kiTu) {
        let ph = this.laPhimThanh(kiTu);
        if (ph != -1) return ph;
        return this.laPhimMu(kiTu);
    }
    laPhimThanh(kiTu) {
        const thanh = this.thanh.indexOf(kiTu);
        return thanh;
    }
    laPhimMu(kiTu) {
        const mu = this.mu
            .map((v,i) => {
                if (v == kiTu) return i;
                return -1;
            })
            .filter(v => v != -1)      
        ;
        if (mu.length <= 0) return -1;
        return mu;
    }
}
class Telex extends KieuGo {
    constructor() {
        super();
        this.thanh = [null, "f", "s", "r", "x", "j"];
        this.mu = [null, "w", "a", null, "e", null, null, "o", "w", null, "w", null, null, "d"];
    }
}
function test() {
    let o = new Telex;
    console.log(o.laPhimThanh("a"));
    console.log(o.laPhimMu("i"));
    console.log(o.laPhimDau("t"));
}
test();
