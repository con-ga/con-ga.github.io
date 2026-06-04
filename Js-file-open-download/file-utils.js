/**
 * 1. Hàm tạo hyperlink kích hoạt input file ẩn.
 */
export function createFileLink(label, accept, onChangeHandler, container) {
    if (!container || !(container instanceof HTMLElement)) return null;

    const wrapper = document.createElement('span');
    wrapper.className = 'custom-file-link-wrapper';

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'file';
    hiddenInput.accept = accept || '';
    hiddenInput.style.display = 'none';

    const hyperlink = document.createElement('a');
    hyperlink.href = '#';
    hyperlink.textContent = label;
    hyperlink.className = 'custom-file-link';
    hyperlink.style.cursor = 'pointer';
    hyperlink.style.textDecoration = 'underline';
    hyperlink.style.color = '#0066cc';
    hyperlink.style.marginRight = '15px';

    hyperlink.addEventListener('click', function(event) {
        event.preventDefault();
        hiddenInput.click();
    });

    if (typeof onChangeHandler === 'function') {
        hiddenInput.addEventListener('change', onChangeHandler);
    }

    wrapper.appendChild(hyperlink);
    wrapper.appendChild(hiddenInput);
    container.appendChild(wrapper);

    return container;
}

/**
 * 2. Hàm tạo hyperlink để tải xuống tệp văn bản từ chuỗi nội dung.
 */
export function createDownloadLink(label, filename, content, container) {
    if (!container || !(container instanceof HTMLElement)) return null;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = downloadUrl;
    downloadLink.download = filename; 
    downloadLink.textContent = label;
    downloadLink.className = 'custom-download-link';
    downloadLink.style.cursor = 'pointer';
    downloadLink.style.textDecoration = 'underline';
    downloadLink.style.color = '#28a745';

    downloadLink.addEventListener('click', function() {
        setTimeout(() => {
            URL.revokeObjectURL(downloadUrl);
        }, 100);
    });

    container.appendChild(downloadLink);
    return container;
}

/**
 * 3. Hàm dựng sẵn cấu trúc HTML demo vào body
 */
export function addHtml(docBody) {
    if (!docBody || docBody.tagName !== 'BODY') {
        console.error("Tham số truyền vào phải là thẻ document.body");
        return;
    }

    // Chèn một đoạn CSS nhỏ cho đẹp khung hiển thị
    const style = document.createElement('style');
    style.textContent = `
        .demo-box { font-family: Arial, sans-serif; margin: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
        .control-panel { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ccc; }
        #output-area { white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border: 1px solid #ccc; min-height: 50px; margin-top: 10px; }
    `;
    document.head.appendChild(style);

    // Tạo cấu trúc các phân vùng chức năng
    docBody.innerHTML = `
        <div class="demo-box">
            <h2>Demo Hệ Thống Xử Lý File (Module JS)</h2>
            
            <div class="control-panel" id="action-zone">
                </div>

            <h3>Kết quả/Nội dung File:</h3>
            <div id="output-area">Chưa có dữ liệu...</div>
        </div>
    `;
}

/**
 * 4. Hàm Test tích hợp toàn bộ quy trình
 */
export function test(docBody) {
    // Bước A: Tạo giao diện HTML
    addHtml(docBody);

    // Lấy ra các element vừa được tạo từ hàm addHtml
    const actionZone = document.getElementById('action-zone');
    const outputArea = document.getElementById('output-area');

    // Bước B: Định nghĩa bộ xử lý sự kiện đọc File khi người dùng chọn file
    function handleFileRead(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            // Hiển thị nội dung văn bản đọc được lên màn hình
            outputArea.textContent = e.target.result;
        };
        reader.readAsText(file, "UTF-8");
    }

    // Bước C: Gọi hàm tạo link CHỌN FILE (Đọc file)
    createFileLink(
        "📂 Nhấp vào đây để ĐỌC file text", 
        "", 
        handleFileRead, 
        actionZone
    );

    // Bước D: Tạo sẵn một nội dung giả lập để test hàm DOWNLOAD FILE
    const sampleContent = "Xin chào từ hệ thống Test Module!\nThời gian tạo: " + new Date().toLocaleString() + "\nMọi thứ hoạt động hoàn hảo.";
    
    // Gọi hàm tạo link TẢI FILE
    createDownloadLink(
        "📥 Nhấp vào đây để TẢI file mẫu về máy", 
        "test-file-output.txt", 
        sampleContent, 
        actionZone
    );

    console.log("Hệ thống test đã khởi chạy thành công!");
}