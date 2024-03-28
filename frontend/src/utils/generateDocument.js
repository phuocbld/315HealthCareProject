import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import Phieu from '../data/Form/phieu.docx' 
export const generateDocx = () => {
    // Đường dẫn đến template .docx
    const templatePath = Phieu;

    // Đọc template
    fetch(templatePath)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        // Tạo một PizZip object từ buffer
        const zip = new PizZip(buffer);
        const doc = new Docxtemplater().loadZip(zip);

        // Thay thế các placeholder trong template bằng dữ liệu
        doc.setData({
            address:'207B Hoàng Văn Thụ',
            ghi_chu:"Hàng dễ vỡ",
            name_hang:'Laptop vivo S14'
        });

        try {
          // Render document
          doc.render();
          const outputBuffer = doc.getZip().generate({ type: 'blob' });
          // Tải xuống tệp .docx
        //   const data = saveAs(outputBuffer, 'generated.docx');
        
          console.log(outputBuffer);
        //   useReactToPrint({
        //     content: () => doc.getFullText()
        //   })
        //   saveAs(outputBuffer, 'generated.docx');
          // In phiếu
        } catch (error) {
          console.error('Error rendering document:', error);
        }
      })
      .catch(error => console.error('Error fetching template:', error));
  };