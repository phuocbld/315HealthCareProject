import { Input } from "antd";
import React, { useState, useRef } from "react";
import { Avatar, List, Image, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import style from "./style.module.css";
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
const Attach = ({ formik }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const handleFileChange = (event) => {
    const formData = new FormData();
    let file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue("fileHoaDon", file);
    // console.log(formData);

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      // console.log(e.target.result); // base 64 dùng để load hình
      // console.log(e.target.result);
      setImgSrc(e.target.result);
    };
  };

  const closeImg = () => {
    setImgSrc("");
    setSelectedFile("");
    formik.setFieldValue("fileHoaDon", "");
  };
  return (
    <div className="p-5">
      <div className="flex">
        <label className="w-24 font-semibold">Link hoá đơn:</label>
        <Input
          name="linkHoaDon"
          value={formik.values.linkHoaDon}
          onChange={formik.handleChange}
          size="small"
        />
      </div>
      <div className=" mt-2">
        <label for="file-upload" className={style.custom_file_upload}>
          Chọn Hình ảnh
        </label>
        <input id="file-upload" type="file" onChange={handleFileChange} />
      </div>
      <div>
        <List itemLayout="horizontal">
          {formik.values.fileHoaDon !== "" && (
            <List.Item>
              <List.Item.Meta
              className="items-center"
                avatar={<Image width={120} src={imgSrc} />}
                title={
                  <span className="font-semibold">{selectedFile.name}</span>
                }
              />
              <div
                className="text-white bg-red-500 w-5 h-5 text-center rounded-md hover:bg-red-400 cursor-pointer"
                onClick={closeImg}
              >
                <CloseOutlined />
              </div>
            </List.Item>
          )}
        </List>
      </div>
    </div>
  );
};

export default Attach;
