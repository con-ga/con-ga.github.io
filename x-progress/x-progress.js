alert(123);
class Progress extends HTMLElement {
  static get observedAttributes() {
    return ['percent', 'color'];
  }

  constructor() {
    super();

    // 1. Tạo Shadow DOM (chế độ open để có thể quản lý)
    this.attachShadow({ mode: 'open' });

    // 2. Tạo phần tử canvas bên trong Shadow DOM
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    // Mặc định kích thước canvas bên trong nếu không định nghĩa ngoài
    this.canvas.width = 200;
    this.canvas.height = 200;

    // 3. Thêm style cơ bản để phần tử hiển thị dạng inline-block giống canvas gốc
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: inline-block;
        width: 200px;
        height: 200px;
      }
      canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
    `;

    // Đưa style và canvas vào Shadow DOM
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(this.canvas);

    // Khởi tạo các thuộc tính mặc định
    if (!this.hasAttribute('percent')) this.setAttribute('percent', '0');
    if (!this.hasAttribute('color')) this.setAttribute('color', '');
  }

  connectedCallback() {
    // Cập nhật lại kích thước canvas thực tế khớp với kích thước của Element (getBoundingClientRect)
    this.resizeCanvas();
    this.draw();

    // Theo dõi thay đổi kích thước từ CSS để vẽ lại nếu cần
    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
      this.draw();
    });
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.draw();
    }
  }

  // Đồng bộ kích thước pixel của canvas trong shadow DOM với CSS bên ngoài
  resizeCanvas() {
    const rect = this.getBoundingClientRect();
    // Tránh set width/height = 0 nếu element chưa render ẩn
    this.canvas.width = rect.width || 200;
    this.canvas.height = rect.height || 200;
  }

  // Getter / Setter cho percent
  get percent() {
    const val = parseFloat(this.getAttribute('percent'));
    return isNaN(val) ? 0 : Math.max(0, Math.min(100, val));
  }

  set percent(val) {
    this.setAttribute('percent', Math.max(0, Math.min(100, val)));
  }

  // Getter / Setter cho color
  get color() {
    return this.getAttribute('color');
  }

  set color(val) {
    this.setAttribute('color', val);
  }

  // Hàm vẽ chính
  draw() {
    if (!this.ctx) return;

    const w = this.canvas.width;
    const h = this.canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    
    const baseSize = Math.min(w, h);
    const radius = baseSize / 4;
    const lineWidth = baseSize / 4;

    this.ctx.clearRect(0, 0, w, h);

    if (this.percent === 0) return;

    // Xác định màu sắc: 
    // 1. Ưu tiên thuộc tính color cá nhân
    // 2. Thừa kế CSS `color` truyền từ element ngoài vào thông qua `:host`
    let strokeColor = this.color;
    if (!strokeColor) {
      strokeColor = window.getComputedStyle(this).color || '#000000';
    }

    this.ctx.beginPath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = strokeColor;

    const startAngle = 0; // Hướng 3h
    const endAngle = (this.percent / 50) * Math.PI;

    this.ctx.arc(cx, cy, radius, startAngle, endAngle, false);
    this.ctx.stroke();
  }
}
try {
// Đăng ký thẻ độc lập hoàn toàn không cần { extends }
customElements.define('x-progress', Progress);
  alert("defined class custElm");
      }  catch(e) {
alert (e.message);
      };
