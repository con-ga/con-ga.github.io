class KieuGo {
    
    laPhimDau(phim) {
        let ph = this.laPhimThanh(phim);
        if (ph != -1) return ph;
        return this.laPhimMu(phim);
    }
    laPhimThanh(phim) {
        const thanh = this.thanh
            .findIndex(keys => keys !== null && keys.includes(phim))
        ;
        return thanh;
    }
    laPhimMu(phim) {
        const mu = this.mu
            .map((v,i) => {
                if (v === null) return -1;
                if (v.includes(phim)) return i;
                return -1;
            })
            .filter(v => v != -1)      
        ;
        if (mu.length <= 0) return -1;
        return mu;
    }
    //constructor
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
    console.log(o.laPhimThanh("s"));
    console.log(o.laPhimMu("w"));
    console.log(o.laPhimDau("t"));
}
test();
export {Telex};