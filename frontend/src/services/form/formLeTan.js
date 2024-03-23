import Docxtemplater from 'docxtemplater';


const generateDocument = () => {
    // Tạo một instance của Docxtemplater với mẫu tài liệu Word
    const doc = new Docxtemplater();
    doc.loadFile('path/to/template.docx');

    // Chỉ định dữ liệu để thêm vào mẫu tài liệu
  

    // Thêm dữ liệu vào mẫu tài liệu
    // doc.setData(data);

    // Kết xuất tài liệu đã được điền dữ liệu
    doc.render();

    // Chuyển đổi tài liệu thành ArrayBuffer
    const buffer = doc.getZip().generate({ type: 'nodebuffer' });

    // Tạo một URL tạm thời để tải xuống tài liệu
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };