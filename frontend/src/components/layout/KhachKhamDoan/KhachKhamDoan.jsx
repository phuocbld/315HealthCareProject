import React, { useState } from "react";
import LayoutApp from "../../../HOCs/LayoutApp";
import { Input, Button, Table, ConfigProvider, } from "antd";
import {useDispatch,useSelector}  from 'react-redux'
import ModalAdd from "./ModalAddBenhNhan/ModalAdd";
import * as typeAction from '../../../store/constants/constants'
import ButtonImportExcel from "./ButtonImportExcel/ButtonImportExcel";



const columns = [
  {
    title: "Mã BN",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Tên BN",
    dataIndex: "TENBN",
    key: "age",
    width:200
  },
  {
    title: "Giới tính",
    dataIndex: "GIOITINH",
    key: "address",
  },
  {
    title: "Ngày sinh",
    dataIndex: "NGAYSINH",
    key: "address",
  },
  {
    title: "SĐT",
    dataIndex: "SODIENTHOAI",
    key: "address",
  },
  {
    title: "Trạng thái khám",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "KQ xét Nghiệm",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "KQ khám",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "SMS",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Hành động",
    dataIndex: "action",
    key: "action",
    width:90
  },
];
const KhachKhamDoan = () => {
 const dispatch = useDispatch()   

 const {listBNImport} = useSelector(state => state.khamDoanReducer)
 const handleAddKhamDoan = () => {
    dispatch({
        type: typeAction.OPEN_ADD_KHAM_DOAN
    })
 }
  return (
    <LayoutApp>
      <div className="p-2">
        <div className="flex justify-between">
          <div>
            <Input.Search
              className="w-72"
              placeholder="Tìm kiếm tên và mã bệnh nhân"
            />
          </div>
          <div className="flex gap-5">
            <Button onClick={handleAddKhamDoan} className="bg-green-700 hover:bg-green-500 text-white">Thêm bệnh nhân</Button>
            <ButtonImportExcel />
          </div>
        </div>
        <div className="mt-5">
          <ConfigProvider
          theme={{
            token:{
                padding:5
            }
          }}
          >
            <Table
              pagination={false}
              bordered
              className="h-screen"
              scroll={{
                y: "100vh",
              }}
              dataSource={listBNImport}
              columns={columns}
            />
          </ConfigProvider>
        </div>
      </div>
      <ModalAdd/>
    </LayoutApp>
  );
};

export default KhachKhamDoan;
