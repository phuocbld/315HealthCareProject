import React, { useState } from "react";
import * as typeAction from '../../../../store/constants/constants'
import { Button } from "antd";
import * as XLSX from "xlsx";
import {useDispatch} from 'react-redux'
import moment from "moment";
const ButtonImportExcel = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch()
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const render = new FileReader();
    render.readAsArrayBuffer(file);
    render.onload=(e)=>{
        const excelData = e.target.result
        const workbook = XLSX.read(excelData,{type:'buffer'})
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet)
        dispatch({
            type:typeAction.IMPORT_DATA_KHAM_DOAN,
            payload:data
        })
    }
  };
  return (
    <>
      <Button className="my-2 p-0 bg-blue-500 text-white">
        <label className="cursor-pointer px-4 py-1" for="file-upload">
          Chọn file danh sách
        </label>
        <input id="file-upload" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" value={''} onChange={handleFileChange} />
      </Button>
    </>
  );
};

export default ButtonImportExcel;
