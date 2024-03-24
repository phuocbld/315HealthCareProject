import Docxtemplater from 'docxtemplater';


const data = [{
  name: 'John Doe',
    age: 30,
    address: '123 Main St, City, Country'
}]
export const handleGenerateDocx = () => {
  const templateContent = ''; // Đọc nội dung của mẫu từ file hoặc từ một nguồn khác
  const docx = new Docxtemplater();

  docx.render({
    rawXml: `
    <w:p>
        <w:pPr>
            <w:rPr>
                <w:color w:val="FF0000"/>
            </w:rPr>
        </w:pPr>
        <w:r>
            <w:rPr>
                <w:color w:val="FF0000"/>
            </w:rPr>
            <w:t>
                My custom
            </w:t>
        </w:r>
        <w:r>
            <w:rPr>
                <w:color w:val="00FF00"/>
            </w:rPr>
            <w:t>
                XML
            </w:t>
        </w:r>
    </w:p>
    `,
});
    
    const output = docx.getZip().generate({ type: 'blob' });
   console.log(output);


}