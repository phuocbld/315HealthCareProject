import { Input } from "antd";
import React,{useState} from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
const fileList = [

  {
    uid: "-1",
    name: "yyy.png",
    status: "done",
    url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    thumbUrl:
      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  },
];
const Attach = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        const formData = new FormData();
        setSelectedFile(event.target.files[0]);
        formData.append('file', event.target.files[0])
        console.log(formData)
      }
  return (
    <div className="p-5">
      <div className="flex">
        <label className="w-24 font-semibold">Link hoá đơn:</label>
        <Input size="small" />
      </div>
      <div className=" mt-2">
        <input type="file" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default Attach;
