const kmath = {};
kmath.text = function (m,sz) {
  this.ctx.font = sz + "px Arial";
  const x = 0, y = 0;
  //const u = sz  / 2;
  //const l = u;
  const w = this.ctx.measureText(m.text).width;
  const cp = this.ctx.measureText("Cp");
  const h = cp.actualBoundingBoxAscent
      + cp.actualBoundingBoxDescent;
  const u = h / 2;
  const l = h / 2;
  return {
      type : "text",
      text : m.text,
      x, y, u, l, w, h, sz
  };
};
kmath.frac = function (m, sz) {
  const x = y = 0;
  const nsz = sz*4/5;
  const tu = this[m.tu.type](m.tu, nsz);
  const mau = this[m.mau.type](m.mau, nsz);
  const u = tu.h + nsz/2;
  const l = mau.h + nsz/2;    
  const h = u + l;
  const w = Math.max(tu.w, mau.w) + nsz;
  tu.x = (w - tu.w) / 2;
  mau.x = (w - mau.w) / 2;
  tu.y = nsz / 4;
  mau.y = u + nsz /4;
  const ly = mau.y - nsz /4;
  //this.ctx.strokeStyle = "blue";
  //this.ctx.strokeRect(Math.min(tu.x, mau.x), tu.y, w, h);
  return {type : "items",x:0,y:0,u,l,w,h, items : [tu, mau, {type : "line", line : {x1 : x, y1 : ly, x2 : x + w, y2 : ly }}]};
  return {type:"frac", tu, mau, u,l,w,h};
  /*const res = [tu, mau, {type : "line", x : 0, y : u, l : w}];
  res.u = u; res.l=l;
  res.w=w;res.h=h;
  return res;*/
};
kmath.sup = function (m, sz) {
    const coso = this[m.coso.type](m.coso, sz);
    const chiso = this[m.chiso.type](m.chiso, sz / 2);
    let u = coso.u;
    u += chiso.h - coso.h / 3;
    let l = coso.l;
    const w = coso.w + chiso.w + sz / 6;
    const h = u + l;
    coso.x = 0;
    chiso.x = w - chiso.w;
    chiso.y = 0;
    coso.y = chiso.h - coso.h / 3;
    return {type : "items", x:0,y:0,u,l,w,h,
       items:[coso, chiso]};
}
kmath.row = function (m, sz) {
    let res = {x:0,y:0,type:"items",items:[]};
    let u = 0, l = 0, w = 0;
    m.items.forEach(it => {
       let i = this[it.type](it, sz);
       u = Math.max(u, i.u);
       l = Math.max(l, i.l);
       i.x = w;
       w += i.w;
       i.y = 0;
       res.items.push(i);
    });
    const h = u + l;
    res = Object.assign(res, {u,l,w,h});
    return res;
};
kmath.draw = function (m, sz) {
  return this[m.type](m,sz);  
};
kmath.display = function (md, x, y) {
  if (md.type == "items") {
     this.ctx.strokeRect(x + md.x, y + md.y, md.w, md.h);
     md.items.forEach(it => {
        this.display(it, x + md.x, y + md.y);
     }); 
  }
  if (md.type == "line") {
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = kmath.txtclr;
    this.ctx.moveTo(x + md.line.x1, y + md.line.y1);
    this.ctx.lineTo(x + md.line.x2, y + md.line.y2);
    //console.log(md.x1, md.x2, md.y);
    this.ctx.stroke();
    this.ctx.strokeStyle = this.strkclr;
  }
  if (md.type == "text") {
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "rgba(0,0,0,0.3)";
    this.ctx.strokeRect(x + md.x, y + md.y, md.w, md.h);
    this.ctx.font = Math.floor(md.sz) + "px Arial";
    this.ctx.fillText(md.text, x + md.x, y + md.y);
  }  
};
/*
g = {};
class Item {
   get he() {
      return this.up + this.lo;
   }
}
class Text extends Item {
   constructor (txt, sz) {
      super();
      this.text = txt;
      this.sz = sz;
      this.up = sz / 2;
      this.lo = sz / 2;
      g.ctx.font = sz + "px " + g.fml;
      this.wi = g.ctx.measureText(this.text).width;
      //this.he = this.up + this.lo;     
   }
}
class Frac extends Item {
   constructor (tu, mau, sz) {
      super();
      this.tu = tu;
      this.mau = mau;   
   }
}*/



