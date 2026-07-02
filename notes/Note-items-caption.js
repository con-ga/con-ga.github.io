class Note {
  constructor(nodeDomOrNoteCaptionTitle) {
    // TRƯỜNG HỢP 1: Truyền vào một chuỗi văn bản (Title cho caption)
    if (typeof nodeDomOrNoteCaptionTitle === 'string') {
      const noteDom = document.createElement('note-');
      this.dom = noteDom;
      
      // Khởi tạo Caption mới từ chuỗi văn bản bằng Class Caption đã sửa đổi ở bước trước
      const captionInstance = new Caption(nodeDomOrNoteCaptionTitle);
      const itemsDom = document.createElement('items-');
      
      // Cấu trúc chuẩn hóa: note- chứa caption- và items-
      this.dom.appendChild(captionInstance.dom);
      this.dom.appendChild(itemsDom);
    } 
    // TRƯỜNG HỢP 2: Truyền vào một DOM Element <note-> có sẵn
    else if (nodeDomOrNoteCaptionTitle instanceof HTMLElement && nodeDomOrNoteCaptionTitle.tagName.toLowerCase() === 'note-') {
      this.dom = nodeDomOrNoteCaptionTitle;
      this._ensureStructure(); // Đảm bảo cấu trúc bên trong hợp lệ
    } 
    // TRƯỜNG HỢP KHÔNG HỢP LỆ
    else {
      throw new Error("Tham số phải là một DOM <note-> hoặc một chuỗi văn bản (string) làm Title");
    }
  }

  // Luôn đảm bảo note- chỉ có 2 Elem child: first là caption- và last là items-
  _ensureStructure() {
    let captionDom = this.dom.querySelector(':scope > caption-');
    let itemsDom = this.dom.querySelector(':scope > items-');

    // Nếu thiếu caption-, tự tạo mới một caption trống thông qua class Caption
    if (!captionDom) {
      const defaultCaption = new Caption(""); 
      captionDom = defaultCaption.dom;
    } else {
      // Nếu đã có sẵn DOM caption-, bọc nó lại bằng class Caption để chuẩn hóa cấu trúc bên trong thẻ caption
      new Caption(captionDom);
    }

    // Nếu thiếu items-, tự tạo mới thẻ <items->
    if (!itemsDom) {
      itemsDom = document.createElement('items-');
    }

    // Làm sạch và sắp xếp lại đúng vị trí (First: caption-, Last: items-)
    this.dom.innerHTML = '';
    this.dom.appendChild(captionDom);
    this.dom.appendChild(itemsDom);
  }
  toJSON() {
    const caption = Caption.of(this);
    const titleDom = caption ? caption.dom.querySelector('title-') : null;
    const titleText = titleDom ? titleDom.textContent.trim() : "";

    const result = {
      title: titleText
    };

    // Tìm tất cả các note- con trực tiếp bên trong <items->
    const itemsDom = this.dom.querySelector(':scope > items-');
    const childNoteDoms = itemsDom ? itemsDom.querySelectorAll(':scope > note-') : [];

    if (childNoteDoms.length > 0) {
      result.children = [];
      childNoteDoms.forEach(childDom => {
        const childNoteInstance = new Note(childDom);
        // Đệ quy để lấy cấu trúc của các con sâu hơn
        result.children.push(childNoteInstance.toJSON());
      });
    } 

    return result;
  }
  get isRoot() {
    return this.dom.id === 'rootNote';
  }

  // Thêm note hiện tại làm con của parentNote
  childOf(parentNote) {
    if (!(parentNote instanceof Note)) throw new Error("Parent phải là một thực thể Note");
    
    // Lưu lại DOM của cha cũ trước khi dịch chuyển
    const oldParentNoteDom = this.dom.parentElement ? this.dom.parentElement.closest('note-') : null;

    const targetItemsDom = parentNote.dom.querySelector(':scope > items-');
    targetItemsDom.appendChild(this.dom);

    // Kích hoạt cập nhật giao diện các bên liên quan
    this._updateMyAndParentPlusMinus(oldParentNoteDom);
    return this;
  }

  toAfter(targetNote) {
    if (this.isRoot) return this;
    if (!(targetNote instanceof Note)) throw new Error("Target phải là một thực thể Note");
    if (targetNote.isRoot) return this;

    const oldParentNoteDom = this.dom.parentElement ? this.dom.parentElement.closest('note-') : null;

    targetNote.dom.after(this.dom);

    this._updateMyAndParentPlusMinus(oldParentNoteDom);
    return this;
  }

  toBefore(targetNote) {
    if (this.isRoot) return this;
    if (!(targetNote instanceof Note)) throw new Error("Target phải là một thực thể Note");
    if (targetNote.isRoot) return this;

    const oldParentNoteDom = this.dom.parentElement ? this.dom.parentElement.closest('note-') : null;

    targetNote.dom.before(this.dom);

    this._updateMyAndParentPlusMinus(oldParentNoteDom);
    return this;
  }

  remove() {
    if (this.isRoot) return;

    // Lưu lại DOM cha trước khi bốc dỡ Note này ra khỏi cây DOM
    const oldParentNoteDom = this.dom.parentElement ? this.dom.parentElement.closest('note-') : null;

    this.dom.remove();

    // Cập nhật lại cha cũ (vì mất đi 1 đứa con, có thể nó sẽ trở thành rỗng và cần ẩn plus-minus)
    if (oldParentNoteDom) {
      const oldParentNote = new Note(oldParentNoteDom);
      oldParentNote.refreshPlusMinus();
    }
  }


  // Tìm Note cha chứa phần tử DOM được truyền vào
  static above(captionOrItems) {
    if (!(captionOrItems instanceof HTMLElement)) return null;
    const noteDom = captionOrItems.closest('note-');
    return noteDom ? new Note(noteDom) : null;
  }
  /**
   * Hàm kiểm tra số lượng con hiện tại trong <items-> để cập nhật plus-minus
   */
  refreshPlusMinus() {
    const caption = Caption.of(this);
    if (!caption) return;

    const itemsDom = this.dom.querySelector(':scope > items-');
    // Đếm số lượng thẻ <note-> con trực tiếp
    const hasChildren = itemsDom && itemsDom.querySelectorAll(':scope > note-').length > 0;

    if (!hasChildren) {
      // Không có con -> Ẩn hẳn cụm plus-minus
      caption.markExpand(null);
    } else {
      // Có con -> Kiểm tra xem danh sách đang hiển thị hay đang ẩn để set dấu + hoặc -
      const isExpanded = itemsDom.style.display !== 'none';
      caption.markExpand(isExpanded);
    }
  }

  /**
   * Hàm bổ trợ: Cập nhật trạng thái cho chính mình và cha cũ/mới sau các thao tác DOM
   */
  _updateMyAndParentPlusMinus(oldParentNoteDom = null) {
    // 1. Cập nhật chính mình
    this.refreshPlusMinus();

    // 2. Cập nhật cha mới hiện tại (nếu có)
    const currentParentNote = Note.above(this.dom.parentElement);
    if (currentParentNote) {
      currentParentNote.refreshPlusMinus();
    }

    // 3. Cập nhật cha cũ (nếu có truyền vào trước khi dịch chuyển/xóa)
    if (oldParentNoteDom) {
      const oldParentNote = new Note(oldParentNoteDom);
      oldParentNote.refreshPlusMinus();
    }
  }
}
class Caption {
  constructor(captionDomOrCaptionLabel) {
    // TRƯỜNG HỢP 1: Truyền vào một chuỗi văn bản (Caption Label)
    if (typeof captionDomOrCaptionLabel === 'string') {
      const captionDom = document.createElement('caption-');
      captionDom.innerHTML = `
        <plus-minus>
          <p->+</p->
          <m->-</m->
        </plus-minus>
        <title-></title->
      `;
      this.dom = captionDom;
      this.title = captionDomOrCaptionLabel; // Set chữ cho <title->
    //this.dom.removeEventListener('click', (e) => this.plusMinusHandler(e));
    this.dom.addEventListener('click', (e) => this.plusMinusHandler(e));
    this.dom.addEventListener('click', (e) => this.selectHandler(e));
    this.dom.addEventListener('stateChange', (e) => this.stateChangeHandler(e));
} 
    // TRƯỜNG HỢP 2: Truyền vào một DOM Element có sẵn
    else if (captionDomOrCaptionLabel instanceof HTMLElement && captionDomOrCaptionLabel.tagName.toLowerCase() === 'caption-') {
      this.dom = captionDomOrCaptionLabel;
    } 
    // TRƯỜNG HỢP KHÔNG HỢP LỆ
    else {
      throw new Error("Tham số phải là một DOM <caption-> hoặc một chuỗi văn bản (string) làm Label");
    }

    // Đảm bảo cấu trúc bên trong luôn chuẩn hóa (phòng trường hợp DOM truyền vào thiếu thẻ con)
    this._ensureStructure();

    // Gắn các Event Listeners xử lý tương tác
      }

  // Hàm bổ trợ kiểm tra và tái cấu trúc nội bộ thẻ <caption-> nếu bị thiếu
  _ensureStructure() {
    let plusMinus = this.dom.querySelector(':scope > plus-minus');
    let title = this.dom.querySelector(':scope > title-');

    if (!plusMinus) {
      plusMinus = document.createElement('plus-minus');
      plusMinus.innerHTML = '<p->+</p-><m->-</m->';
      this.dom.prepend(plusMinus);
    } else {
      // Đảm bảo có đủ p- và m- bên trong plus-minus
      if (!plusMinus.querySelector('p-')) plusMinus.insertAdjacentHTML('beforeend', '<p->+</p->');
      if (!plusMinus.querySelector('m-')) plusMinus.insertAdjacentHTML('beforeend', '<m->-</m->');
    }

    if (!title) {
      title = document.createElement('title-');
      this.dom.appendChild(title);
    }
  }

  static of(note) {
    if (!(note instanceof Note)) throw new Error("Tham số phải là một thực thể Note");
    const captionDom = note.dom.querySelector(':scope > caption-');
    return captionDom ? new Caption(captionDom) : null;
  }

  plusDom() {
    return this.dom.querySelector('plus-minus > p-');
  }

  minusDom() {
    return this.dom.querySelector('plus-minus > m-');
  }

  markExpand(nullOnOff) {
    const plusMinus = this.dom.querySelector('plus-minus');
    const p = this.plusDom();
    const m = this.minusDom();

    if (!plusMinus) return;

    if (nullOnOff === null) {
      plusMinus.style.display = 'none';
    } else {
      plusMinus.style.display = 'inline-flex';
      if (p) p.style.display = nullOnOff ? 'none' : 'block';
      if (m) m.style.display = nullOnOff ? 'block' : 'none';
    }
  }

  plusMinusHandler(event) {
    const plusMinusZone = event.target.closest('plus-minus');
    if (!plusMinusZone) return;

    const currentNote = Note.above(this.dom);
    const items = Items.of(currentNote);
    if (!items) return;
console.log("plusminus", Caption.of(currentNote).title);
    const isExpanded = items.dom.style.display !== 'none';
    
    if (isExpanded) {
      this.markExpand(false);
      items.showHide(false);
    } else {
      this.markExpand(true);
      items.showHide(true);
    }
  }

  stateChangeHandler(event) {}

  static pendingAction = null;
     // Trả về cấu trúc Object thuần { title, children } của Note hiện tại và tất cả con của nó

    selectHandler(event) {
    // Chỉ xử lý khi click vào title- hoặc chính diện caption- (tránh vùng click của plus-minus)
    if (event.target.closest('plus-minus')) return;

    const currentNote = Note.above(this.dom);
    if (!currentNote) return;

    // NẾU CHƯA CÓ HÀNH ĐỘNG CHỜ (Bước 1)
    if (!Caption.pendingAction) {
      const action = prompt(
        "Chọn hành động:\n" +
        "- Thay đổi: 'title', 'titleHtml'\n" +
        "- Tạo mới: 'appendchild', 'newbefore', 'newafter'\n" +
        "- Di chuyển (Cần chọn tiếp Note đích): 'tobefore', 'toafter', 'childof'\n" +
        "- Xóa: 'remove'"
      );
      
      // Nếu bấm Hủy (null) hoặc không nhập gì ("") thì dừng lại
      if (!action) return; 

      const normalizedAction = action.toLowerCase().trim();

      // --- NHÓM 1: THAY ĐỔI NỘI DUNG ---
      if (normalizedAction === 'title') {
        const txt = prompt("Nhập text title mới:");
        if (txt !== null) this.title = txt;
      } 
      else if (normalizedAction === 'titleHtml') {
        const html = prompt("Nhập mã HTML title mới:");
        if (html !== null) this.titleHtml = html;
      } 
      
      // --- NHÓM 2: TẠO MỚI VÀ CHÈN NGAY (Yêu cầu mới) ---
      else if (normalizedAction === 'appendchild') {
        const title = prompt("Nhập tiêu đề cho Note con mới:");
        if (title) { // Bấm hủy hoặc để trống sẽ không tạo
          const newNote = new Note(title);
          newNote.childOf(currentNote);
        }
      } 
      else if (normalizedAction === 'newafter') {
        if (currentNote.isRoot) {
          alert("Không thể chèn Note mới ngang hàng bên ngoài Root Note!");
          return;
        }
        const title = prompt("Nhập tiêu đề cho Note mới phía sau:");
        if (title) {
          const newNote = new Note(title);
          newNote.toAfter(currentNote);
        }
      } 
      else if (normalizedAction === 'newbefore') {
        if (currentNote.isRoot) {
          alert("Không thể chèn Note mới đứng trước Root Note!");
          return;
        }
        const title = prompt("Nhập tiêu đề cho Note mới phía trước:");
        if (title) {
          const newNote = new Note(title);
          newNote.toBefore(currentNote);
        }
      }
      
      // --- NHÓM 3: XÓA ---
      else if (normalizedAction === 'remove') {
        if (currentNote.isRoot) {
          alert("Không thể xóa root note!");
        } else {
          currentNote.remove();
        }
      } 
      
      // --- NHÓM 4: DI CHUYỂN (Chuyển sang trạng thái chờ click Note đích) ---
      else if (['tobefore', 'toafter', 'childof'].includes(normalizedAction)) {
        if (currentNote.isRoot) {
          alert("Root note cố định, không thể dịch chuyển!");
          return;
        }
        Caption.pendingAction = { action: normalizedAction, sourceNote: currentNote };
        alert(`Đã chọn Note mục tiêu. Hãy click vào một Note khác để thực hiện: ${normalizedAction}`);
      }
      else if (normalizedAction === 'save') {
        // 1. Chuyển cây Note hiện tại thành Object dữ liệu và định dạng chuỗi JSON
        const jsonObject = currentNote.toJSON();
        const jsonString = JSON.stringify(jsonObject, null, 2);
        
        // 2. Prompt hỏi tên tệp từ người dùng
        const fileNameInput = prompt("Nhập tên tệp để tải về (Ví dụ: data):\n(Nếu để trống hoặc hủy, dữ liệu sẽ chỉ xuất ra Console)");
        
        // 3. Kiểm tra điều kiện nhập tên tệp
        if (fileNameInput && fileNameInput.trim() !== "") {
          const fileName = fileNameInput.trim() + ".json";
          
          // Tạo một Blob chứa dữ liệu JSON với định dạng mã hóa UTF-8
          const blob = new Blob([jsonString], { type: "application/json;charset=utf-8;" });
          
          // Tạo một URL tạm thời trỏ đến Blob vừa tạo
          const url = URL.createObjectURL(blob);
          
          // Tạo một thẻ <a> ẩn để kích hoạt tính năng download của trình duyệt
          const downloadLink = document.createElement("a");
          downloadLink.href = url;
          downloadLink.download = fileName;
          
          // Gắn vào DOM tạm thời, kích hoạt click và gỡ bỏ ngay lập tức
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          
          // Giải phóng vùng nhớ URL tạm thời để tránh rò rỉ bộ nhớ (Memory Leak)
          URL.revokeObjectURL(url);
          
          alert(`Đã kích hoạt tải xuống tệp: ${fileName}`);
        } else {
          // Trường hợp người dùng nhấn Cancel hoặc để trống tên tệp
          console.log("=== DỮ LIỆU JSON (XUẤT RA CONSOLE VÌ KHÔNG ĐẶT TÊN TỆP) ===");
          console.log(jsonString);
          alert("Tên tệp trống. Dữ liệu cấu trúc Note đã được xuất ra tab Console (F12).");
        }
      }
    } 
    
    // NẾU ĐANG CÓ HÀNH ĐỘNG CHỜ (Bước 2 - Dành riêng cho tobefore, toafter, childof)
    else {
      const { action, sourceNote } = Caption.pendingAction;
      
      if (sourceNote.dom === currentNote.dom) {
        alert("Không thể thực hiện hành động lên chính nó!");
        Caption.pendingAction = null;
        return;
      }

      try {
        if (action === 'tobefore') {
          if (currentNote.isRoot) alert("Không thể đứng trước Root Note!");
          else sourceNote.toBefore(currentNote);
        } else if (action === 'toafter') {
          if (currentNote.isRoot) alert("Không thể đứng sau Root Note!");
          else sourceNote.toAfter(currentNote);
        } else if (action === 'childof') {
          if (sourceNote.dom.contains(currentNote.dom)) alert("Không thể đưa cha vào làm con của chính nó!");
          else sourceNote.childOf(currentNote);
        }
      } catch (error) {
        console.error(error);
      }

      Caption.pendingAction = null;
    }
  }
  
  set title(text) {
    const titleDom = this.dom.querySelector('title-');
    if (titleDom) titleDom.textContent = text;
  }
  get title() {
    const titleDom = this.dom.querySelector('title-');
    if (titleDom) return titleDom.textContent;
  }
  set titleHtml(html) {
    const titleDom = this.dom.querySelector('title-');
    if (titleDom) titleDom.innerHTML = html;
  }
}
class Items {
  constructor(itemsDom) {
    if (!(itemsDom instanceof HTMLElement) || itemsDom.tagName.toLowerCase() !== 'items-') {
      throw new Error("Tham số phải là một DOM phần tử <items->");
    }
    this.dom = itemsDom;
  }

  static of(note) {
    if (!(note instanceof Note)) throw new Error("Tham số phải là một thực thể Note");
    const itemsDom = note.dom.querySelector(':scope > items-');
    return itemsDom ? new Items(itemsDom) : null;
  }

  // Bật/Tắt hiển thị (onOff: true là hiện, false là ẩn)
  showHide(onOff) {
    this.dom.style.display = onOff ? 'block' : 'none';
  }
}

const architectRoadmapData = {
  "title": "Lộ trình trở thành Software Architect 🚀",
  "children": [
    {
      "title": "1. Làm chủ Kỹ năng Code (Coder)",
      "children": [
        { "title": "Clean Code & Refactoring" },
        { "title": "Design Patterns thông dụng" },
        { "title": "Unit Testing & Automation" }
      ]
    },
    {
      "title": "2. Thiết kế Hệ thống (Senior Developer)",
      "children": [
        { "title": "Kiến trúc Monolith vs Microservices" },
        { 
          "title": "Quản lý Data & Caching",
          "children": [
            { "title": "SQL Replication & Sharding" },
            { "title": "Redis / Memcached Strategies" }
          ]
        },
        { "title": "Message Queues (Kafka, RabbitMQ)" }
      ]
    },
    {
      "title": "3. Kỹ năng mềm & Tầm nhìn (Architect)",
      "children": [
        { "title": "Giao tiếp và Thuyết phục Stakeholders" },
        { "title": "Đánh giá Trade-offs (Được và Mất)" },
        { "title": "Quản lý rủi ro và Tối ưu chi phí Cloud" }
      ]
    }
  ]
};
function reviveToNoteTree(nodeData) {
  // 1. Tạo Note cha từ title
  const currentNote = new Note(nodeData.title);
  
  // 2. Nếu có children, duyệt đệ quy để thêm vào
  if (nodeData.children && Array.isArray(nodeData.children)) {
    nodeData.children.forEach(childData => {
      // Đệ quy để biến dữ liệu con thành một instance Note con hoàn chỉnh
      const childNote = reviveToNoteTree(childData);
      // Biến childNote thành con của currentNote (đưa vào thẻ <items-> của currentNote)
      childNote.childOf(currentNote);
    });
  }
  /*const caption = Caption.of(currentNote);
  const items = Items.of(currentNote);
  if (items.dom.children.length == 0) caption.markExpand(null)
  else {
     caption.markExpand(true);
     items.showHide(true);
  }*/
  // Trả về thực thể Note đã được dựng trọn vẹn cây con bên trong
  return currentNote;
}
function test() {
	// Thực hiện hiện thực hóa dữ liệu JSON thành cây Object Note
const rootNoteInstance = reviveToNoteTree(architectRoadmapData);

// Đặt ID cho note gốc để nó đóng vai trò là rootNote như thiết kế
rootNoteInstance.dom.id = "rootNote";

// Gắn toàn bộ cấu trúc DOM vừa tạo tự động vào body để hiển thị lên màn hình
document.body.appendChild(rootNoteInstance.dom);

console.log("Đã 'revive' thành công cây Note! Cấu trúc DOM hiện tại:");
console.log(rootNoteInstance.dom);
}