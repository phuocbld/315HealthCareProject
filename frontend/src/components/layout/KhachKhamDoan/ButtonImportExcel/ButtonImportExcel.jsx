import React, { useState } from "react";
import * as typeAction from "../../../../store/constants/constants";
import {VerticalAlignBottomOutlined} from '@ant-design/icons'
import { saveAs } from 'file-saver';
import { Button } from "antd";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import fileMau from "../../../../data/Form/form bn kham doan.xlsx"
const ButtonImportExcel = ({ openNotificationWithIcon }) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const handleDownloadFile = () => {
    // Tạo một đường dẫn đến tập tin bạn muốn tải xuống

    // Tạo một thẻ a ẩn
    const link = document.createElement('a');
    link.href = fileMau;
    link.target = '_blank';
    link.download = 'Mẫu import khám đoàn.xlsx';
    // Thêm thẻ a vào DOM và kích hoạt sự kiện nhấp vào nó
    document.body.appendChild(link);
    link.click();

    // Xóa thẻ a sau khi tải xuống hoàn tất
    document.body.removeChild(link);
  }
  const handleFileChange = (e) => {
    // openNotificationWithIcon('error','tesst')
    const file = e.target.files[0];
    const fileName = file.name;
    const extension = fileName.split(".").pop().toLowerCase();
    if (extension !== "xlsx" && extension !== "xls") {
      // kiểm tra xem có phải là file excel hay không
      openNotificationWithIcon("error", "Chỉ chấp nhận tệp Excel (xlsx, xls)");
      return;
    }
    const render = new FileReader();
    render.readAsArrayBuffer(file);
    render.onload = (e) => {
      const excelData = e.target.result;
      const workbook = XLSX.read(excelData, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      for (let items of data) {
        if (!items.TENBN) {
          openNotificationWithIcon(
            "error",
            `chưa có tên bệnh nhân , ô SST: ${items.STT}`
          );
          return;
        }
        if (!items.GIOITINH) {
          openNotificationWithIcon(
            "error",
            `chưa có giới tính , ô SST: ${items.STT}`
          );
          return;
        }
        if (!items.NGAYSINH) {
          openNotificationWithIcon(
            "error",
            `chưa có ngày sinh , ô SST: ${items.STT}`
          );
          return;
        }
        // if (!items.SODIENTHOAI) {
        //   openNotificationWithIcon(
        //     "error",
        //     `chưa có số điện thoại , ô SST: ${items.STT}`
        //   );
        //   return;
        // }
        if (!items.MACT) {
          openNotificationWithIcon(
            "error",
            `chưa có mã công ty , ô SST: ${items.STT}`
          );
          return;
        }
      }
      dispatch({
        type: typeAction.IMPORT_DATA_KHAM_DOAN,
        payload: data,
      });
    };
  };
  return (
    <>
    <div className="flex gap-5 items-center">
    <Button className="my-2 p-0 bg-blue-500 text-white">
        <label className="cursor-pointer px-4 py-1" for="file-upload">
          Chọn file danh sách
        </label>
        <input
          id="file-upload"
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          value={""}
          onChange={handleFileChange}
        />
      </Button>
      <button onClick={handleDownloadFile} className="text-green-700 text-base cursor-pointer"  size="small">
      <VerticalAlignBottomOutlined />File mẫu
      </button>
    </div>
      
    </>
  );
};

export default ButtonImportExcel;
