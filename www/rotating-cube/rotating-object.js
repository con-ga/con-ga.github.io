class CosSin
{
    constructor(cos, sin, cosx, sinx)
    { 
        this.cos = cos;
        this.sin = sin;
        this.cosx = cosx;
        this.sinx = sinx;
    }
    next()
    {
        const sin = this.sin * this.cosx + this.cos * this.sinx;
        const cos = this.cos * this.cosx - this.sin * this.sinx;
        this.sin = sin;
        this.cos = cos; 
    }
}
class Matrix3d extends Array
{
    constructor()
    {
        super();
        this[0] = [1, 0, 0, 0];
        this[1] = [0, 1, 0, 0];
        this[2] = [0, 0, 1, 0];
        this[3] = [0, 0, 0, 1];
    }
    nhan(mtx, mtx2)
    {
        //mtx2 = new Matrix3d;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                mtx2[i][j] = 0;
                for (let k = 0; k < 4; k++) {
                    mtx2[i][j] += this[i][k] * mtx[k][j];
                }
            }
        }
        //return mtx2;
    }
    bienHinh(cDiem)
    {
        //const that = this;
        return cDiem.map((diem) => {
            const x = diem.x * this[0][0] + diem.y * this[1][0] + diem.z * this[2][0];
            const y = diem.x * this[0][1] + diem.y * this[1][1] + diem.z * this[2][1];
            const z = diem.x * this[0][2] + diem.y * this[1][2] + diem.z * this[2][2];
            return {x, y, z};
        });
    }
}
class Matrix3dYZ extends Matrix3d
{
    constructor(cossin)
    {
        super();
        this.cossin = cossin;
        this.next();
    }
    next()
    {
       this[1][1] = this.cossin.cos;
       this[1][2] = -this.cossin.sin; 
       this[2][1] = this.cossin.sin;
       this[2][2] = this.cossin.cos;
       this.cossin.next();
    }
}
class Matrix3dZX extends Matrix3d
{
    constructor(cossin)
    {
        super();
        this.cossin = cossin;
        this.next();
    }
    next()
    {
       this[2][2] = this.cossin.cos;
       this[2][0] = -this.cossin.sin; 
       this[0][2] = this.cossin.sin;
       this[0][0] = this.cossin.cos;
       this.cossin.next();
    }
}
class BienHinh extends Matrix3d
{
    constructor(mtx1, mtx2)
    {
        super();
        this.mtx1 = mtx1;
        this.mtx2 = mtx2;
        this.next();
    }
    next()
    {
        this.mtx1.nhan(this.mtx2, this);
        this.mtx1.next();
        this.mtx2.next();
    }
}
class Perspective
{
    constructor(eye, screen)
    {
        this.eye = eye;
        this.screen = screen;
    }
    apply(diem, sz)
    {
        const tile = (this.eye - this.screen) / (this.eye - diem.z);
        const x = tile * diem.x;
        const y = tile * diem.y;
        sz *= tile;
        return {x, y, sz};
    }
}
class Shape3d
{
    static model()
    {
        const n = 60;
        return [
            {x : n, y : n, z : n},
            {x : -n, y : n, z : n},
            {x : n, y : -n, z : n},
            {x : n, y : n, z : -n},
            {x : -n, y : -n, z : n},
            {x : -n, y : n, z : -n},
            {x : n, y : -n, z : -n},
            {x : -n, y : -n, z : -n}
        ]; 
    }
    static edges()
    {
       return [
            [0, 1], [0, 2], [0, 3],
            [1, 4], [1, 5],
            [2, 4], [2, 6],
            [3, 5], [3, 6],
            [4, 7], [5, 7], [6, 7]
        ]; 
    }
}
class Render
{
    constructor()
    {
        const mtx1 = new Matrix3dYZ(new CosSin(1, 0, Math.cos(Math.PI / 60), Math.sin(Math.PI / 60)));
        const mtx2 = new Matrix3dZX(new CosSin(1, 0, Math.cos(Math.PI / 80), Math.sin(Math.PI / 80)));
        this.bienHinh = new BienHinh(mtx1, mtx2);
        this.gocNhin = new Perspective(200, 100);
        this.next();
    } 
    render(ctx)
    {
        const cDiem = this.bienHinh.bienHinh(Shape3d.model())
            .map((diem) => this.gocNhin.apply(diem, 10));
        const edges = Shape3d.edges();
        ctx.strokeStyle = "green";
        ctx.beginPath();
        edges.forEach(d => {
            ctx.moveTo(cDiem[d[0]].x, cDiem[d[0]].y);
            ctx.lineTo(cDiem[d[1]].x, cDiem[d[1]].y);
        });
        ctx.stroke();
        cDiem.forEach(diem => {
            ctx.fillRect(diem.x - diem.sz/2, diem.y -diem.sz/2, diem.sz, diem.sz);
        });  
    }
    next()
    {
        this.bienHinh.next();
    }  
}
class Test
{
    static Test()
    {
        const mtx1 = new Matrix3dYZ(new CosSin(1, 0, Math.cos(Math.PI / 10), Math.sin(Math.PI / 10)));
        const mtx2 = new Matrix3dZX(new CosSin(1, 0, Math.cos(Math.PI / 10), Math.sin(Math.PI / 10)));
        const bienHinh = new BienHinh(mtx1, mtx2);
          }
}
function test()
{
    const cossin = new CosSin(1, 0, Math.cos(Math.PI / 10), Math.sin(Math.PI / 10));
    for(let i = 0; i < 25; i++) {
        console.log(cossin.cos, cossin.sin);
        cossin.next();
    }
}
//test();