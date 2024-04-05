import React, { useEffect, useState } from "react";
import LayoutApp from "../../../HOCs/LayoutApp";
import { Input, Button, Table, ConfigProvider, Tooltip,Tag } from "antd";
import { DeleteOutlined, EditOutlined,ReloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import ModalAdd from "./ModalAddBenhNhan/ModalAdd";
import * as typeAction from "../../../store/constants/constants";
import ButtonImportExcel from "./ButtonImportExcel/ButtonImportExcel";
import { getAllBNKhamDoan } from "../../../store/actions/khamDoanAction";
import moment from "moment";

const columns = [
  {
    title: "Mã BN",
    dataIndex: "MABN",
    key: "MABN",
  },
  {
    title: "Tên BN",
    dataIndex: "TENBN",
    key: "TEBN",
    width: 200,
  },
  {
    title: "Giới tính",
    dataIndex: "GIOITINH",
    key: "GIOITINH",
  },
  {
    title: "Ngày sinh",
    dataIndex: "NGAYSINH",
    key: "NGAYSINH",
  },
  {
    title: "SĐT",
    dataIndex: "SODIENTHOAI",
    key: "SODIENTHOAI",
  },
  {
    title: "Trạng thái khám",
    dataIndex: "TTKHAM",
    key: "TTKHAM",
  },
  {
    title: "Tên công ty",
    dataIndex: "TENCTY",
    key: "TENCTY",
  },
  {
    title: "KQ xét Nghiệm",
    dataIndex: "KQXN",
    key: "KQXN",
  },
  {
    title: "KQ khám",
    dataIndex: "KQK",
    key: "LQK",
  },
  {
    title: "SMS",
    dataIndex: "SMS",
    key: "SMS",
  },
  {
    title: "Hành động",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 90,
  },
];
const KhachKhamDoan = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { listBNImport, ListBNKhamDoan } = useSelector(
    (state) => state.khamDoanReducer
  );
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const handleAddKhamDoan = () => {
    dispatch({
      type: typeAction.OPEN_ADD_KHAM_DOAN,
    });
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  useEffect(() => {
    dispatch(getAllBNKhamDoan());
  }, []);
  return (
    <LayoutApp>
      <div className="p-2">
        <div className="flex justify-between">
          <div className="flex gap-5">
            <Input.Search
              className="w-72"
              placeholder="Tìm kiếm tên và mã bệnh nhân"
            />
            <Button onClick={()=>{dispatch(getAllBNKhamDoan())}} type="primary" icon={<ReloadOutlined />}> Tải lại</Button>
          </div>
          <div className="flex gap-5">
          <Button
              onClick={handleAddKhamDoan}
              className="bg-orange-600 hover:bg-orange-500 text-white"
            >
              Gửi SMS
            </Button>
            <Button
              onClick={handleAddKhamDoan}
              className="bg-green-700 hover:bg-green-500 text-white"
            >
              Thêm bệnh nhân
            </Button>
            <ButtonImportExcel />
          </div>
        </div>
        <div className="mt-5">
          <ConfigProvider
            theme={{
              token: {
                padding: 5,
              },
            }}
          >
            <Table
              pagination={false}
              bordered
              rowSelection={rowSelection}
              className="h-screen"
              scroll={{
                y: "100vh",
              }}
              dataSource={ListBNKhamDoan?.map(
                ({
                  idbn,
                  mabn,
                  tenbn,
                  gioitinh,
                  ngaysinh,
                  sodienthoai,
                  ghichu,
                  idct,
                  trangthaikham,
                  kqxn,
                  kqkham,
                  daguisms,
                }) => ({
                  key: idbn,
                  MABN: mabn,
                  TENBN: tenbn,
                  GIOITINH: gioitinh,
                  NGAYSINH: moment(ngaysinh).format("DD/MM/YYYY"),
                  SODIENTHOAI: sodienthoai,
                  TTKHAM: trangthaikham,
                  KQXN: !kqxn ? <Tag color='volcano'>Chưa có </Tag> : <Tag color='green'>Hoàn thành</Tag> ,
                  KQK: !kqkham ? <Tag color='volcano'>Chưa có </Tag> : <Tag color='green'>Hoàn thành</Tag>,
                  TENCTY: idct,
                  SMS: daguisms,
                  action: (
                    <ul className="flex gap-2 justify-around gap-2 ">
                      <li className="text-lg text-red-500">
                        <Tooltip
                          title="Xóa"
                          placement="top"
                          className="cursor-pointer"
                          color="red"
                        >
                          <DeleteOutlined />
                        </Tooltip>
                      </li>
                      <li className="text-lg text-green-500">
                        <Tooltip
                          title="sửa"
                          className="cursor-pointer"
                          placement="top"
                          color="green"
                        >
                          <EditOutlined />
                        </Tooltip>
                      </li>
                    </ul>
                  ),
                })
              )}
              columns={columns}
            />
          </ConfigProvider>
        </div>
      </div>
      <ModalAdd />
    </LayoutApp>
  );
};

export default KhachKhamDoan;
