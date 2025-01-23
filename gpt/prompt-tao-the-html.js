/*Hãy tạo 1 lớp tên The có các trường Ten, The cha, Cac thuoc tinh, Cac con.
Lớp có các phương thức sau:
-hàm khởi tạo, khởi tạo trường ten từ tham số ten, trường the cha kiểu The từ tham số tùy chọn the cha
-Thuoc tinh: thêm phần tử vào trường Cac thuoc tinh kiểu Map với khoá từ th s ten và giá trị từ th s gia tri, trả về this
-The con: th so Ten, thực hiện các bước sau:
   +tạo đối tượng kiểu The với trường Tên từ th s ten, trường the cha từ this
   +thêm đối tượng trên vào trường Cac con kiểu mảng
   +trả về đối tượng trên 
-Lên: trả về the cha
-Text: thêm th s kiểu xâu Text vào Cac con nếu phần tử cuối không phải kiểu xâu, ngược lại concat vào phần tử cuối, trả về this
-htmlThuoctinh(khoa): trả về xâu có cú pháp khoa="gtri" với gtri là g trị của khoá khoa trong Cac thuoc tinh mà đã escape html
-toHtml: trả về cú pháp <tenthe htmlthuoctinh1 htmlthuoctinh2 ...>text,thecon1.tostring(),text,thecon2.tostring(),text,...</tenthe>. Trong cú pháp, dấu phẩy chỉ để phân cách và không có trong kết quả, và text là các xâu trong Cac con mà đã escape html

*/

class The {
  constructor(ten, theCha = null) {
    this.ten = ten; // Tên của thẻ
    this.theCha = theCha; // Thẻ cha, mặc định là null
    this.cacThuocTinh = new Map(); // Map lưu trữ các thuộc tính
    this.cacCon = []; // Mảng chứa các con (cả text và thẻ con)
  }

  // Thêm thuộc tính
  thuocTinh(ten, giaTri) {
    this.cacThuocTinh.set(ten, giaTri);
    return this; // Hỗ trợ gọi chuỗi
  }

  // Thêm thẻ con
  theCon(ten) {
    const theConMoi = new The(ten, this); // Tạo thẻ con mới
    this.cacCon.push(theConMoi); // Thêm vào danh sách con
    return theConMoi; // Trả về đối tượng thẻ con
  }

  // Trả về thẻ cha
  len() {
    return this.theCha;
  }

  // Thêm hoặc nối text
  text(text) {
    if (this.cacCon.length === 0 || typeof this.cacCon[this.cacCon.length - 1] !== "string") {
      this.cacCon.push(text); // Thêm xâu mới
    } else {
      this.cacCon[this.cacCon.length - 1] += text; // Nối vào xâu cuối
    }
    return this; // Trả về đối tượng để hỗ trợ gọi chuỗi
  }

  // Escape HTML ký tự đặc biệt
  escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Trả về thuộc tính dạng HTML
  htmlThuocTinh(khoa) {
    if (this.cacThuocTinh.has(khoa)) {
      const giaTri = this.escapeHTML(this.cacThuocTinh.get(khoa));
      return `${khoa}="${giaTri}"`;
    }
    return "";
  }

  // Chuyển đối tượng thành cú pháp HTML
  toHtml() {
    const thuocTinhHTML = Array.from(this.cacThuocTinh.keys())
      .map((khoa) => this.htmlThuocTinh(khoa))
      .filter((str) => str.length > 0) // Loại bỏ thuộc tính rỗng
      .join(" ");

    const noiDungCon = this.cacCon
      .map((con) => (typeof con === "string" ? this.escapeHTML(con) : con.toHtml()))
      .join("");

    return `<${this.ten}${thuocTinhHTML ? " " + thuocTinhHTML : ""}>${noiDungCon}</${this.ten}>`;
  }
}

// Ví dụ sử dụng
const theGoc = new The("html").thuocTinh("lang", "en");

const theHead = theGoc.theCon("head");
theHead.theCon("title").text("Document");

const theBody = theGoc.theCon("body").thuocTinh("class", "main-body");
theBody
  .theCon("h1")
  .thuocTinh("style", "color: blue;")
  .text("Welcome to the Page");

const theP = theBody.theCon("p").thuocTinh("class", "content");
theP.text("This is a paragraph with ").theCon("span").thuocTinh("style", "font-weight: bold;").text("bold text").len().text(" and more text.");

console.log(theGoc.toHtml());