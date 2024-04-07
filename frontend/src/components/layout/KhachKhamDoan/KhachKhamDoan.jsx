import React, { useEffect, useState } from "react";
import LayoutApp from "../../../HOCs/LayoutApp";
import { Input, Button, Table, ConfigProvider, Tooltip, Tag,Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import ModalAdd from "./ModalAddBenhNhan/ModalAdd";
import * as typeAction from "../../../store/constants/constants";
import ButtonImportExcel from "./ButtonImportExcel/ButtonImportExcel";
import {
  deleteBNKhamDoanById,
  getAllBNKhamDoan,
  getListCtyKhamDoan,
  infoBNKhamDoanAction,
} from "../../../store/actions/khamDoanAction";
import moment from "moment";
import ModalImport from "./ModalInponrt/ModalImport";
import ModalEditBenhNham from "./ModalEditBenhNhan/ModalEditBenhNham";

const columns = [
  {
    title: "Mã BN",
    dataIndex: "MABN",
    key: "MABN",
    width: 100,
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
    width: 80,
    align: "center",
  },
  {
    title: "Ngày sinh",
    dataIndex: "NGAYSINH",
    key: "NGAYSINH",
    width: 100,
    align: "center",
  },
  {
    title: "SĐT",
    dataIndex: "SODIENTHOAI",
    key: "SODIENTHOAI",
    width: 100,
    align: "center",
  },
  {
    title: "Trạng thái khám",
    dataIndex: "TTKHAM",
    key: "TTKHAM",
    width: 180,
  },
  {
    title: "Tên công ty",
    dataIndex: "TENCTY",
    key: "TENCTY",
    width: 250,
  },
  {
    title: "KQ xét Nghiệm",
    dataIndex: "KQXN",
    key: "KQXN",
    width: 120,
    align: "center",
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.KQXN.indexOf(value) === 0,
  },
  {
    title: "KQ khám",
    dataIndex: "KQK",
    key: "LQK",
    width: 100,
    align: "center",
  },
  {
    title: "SMS",
    dataIndex: "SMS",
    key: "SMS",
    width: 100,
    align: "center",
  },
  {
    title: "Người gửi SMS",
    dataIndex: "NGUOIGUISNS",
    key: "NGUOIGUISNS",
    width: 150,
  },
  {
    title: "Ngày gửi SMS",
    dataIndex: "NGAYGUISMS",
    key: "NGAYGUISMS",
    width: 120,
    align: "center",
  },
  {
    title: "Người tạo",
    dataIndex: "NGUOITAO",
    key: "NGUOITAO",
    width: 150,
  },
  {
    title: "Ngày tạo",
    dataIndex: "NGAYTAO",
    key: "NGAYTAO",
    width: 150,
    align: "center",
  },
  {
    title: "Ghi chú",
    dataIndex: "GHICHU",
    key: "GHICHU",
    width: 200,
  },
  {
    title: "Hành động",
    dataIndex: "action",
    key: "action",
    align: "center",
    width: 90,
    fixed: "right",
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
  const handlDeleteBenhNhan = (idbn) => {
    dispatch(deleteBNKhamDoanById(idbn))
  }
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
    dispatch(getListCtyKhamDoan());
  }, []);
  return (
    <LayoutApp>
      <div className="p-2">
        <div className="flex justify-between">
          <div className="flex gap-5">
            <Input.Search
              className="w-72"
              placeholder="Tìm kiếm tên bệnh nhân"
            />
            <Button
              onClick={() => {
                dispatch(getAllBNKhamDoan());
              }}
              type="primary"
              icon={<ReloadOutlined />}
            >
              {" "}
              Tải lại
            </Button>
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
            <Button
              onClick={() => {
                dispatch({
                  type: typeAction.OPEN_MODAL_IMPORT_KHAM_DOAN,
                });
              }}
              className="bg-blue-500 hover:bg-blue-400 text-white"
            >
              import
            </Button>
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
              className="mb-5"
              scroll={{
                y: 600,
                x: 1500,
              }}
              dataSource={ListBNKhamDoan?.map(
                ({
                  trangthaisms,
                  idbn,
                  mabn,
                  tenbn,
                  gioitinh,
                  ngaysinh,
                  sodienthoai,
                  ghichu,
                  trangthai,
                  tenct,
                  trangthaikham,
                  kqxn,
                  kqkham,
                  daguisms,
                  ngaytao,
                  nguoitao,
                  ngayguisms,
                  nguoiguisms,
                }) => ({
                  key: idbn,
                  MABN: mabn,
                  TENBN: tenbn,
                  GIOITINH: gioitinh,
                  NGAYSINH: moment(ngaysinh).format("DD/MM/YYYY"),
                  SODIENTHOAI: sodienthoai,
                  TTKHAM: trangthai,
                  KQXN: !kqxn ? (
                    <Tag color="volcano">Chưa có </Tag>
                  ) : (
                    <Tag color="green">Hoàn thành</Tag>
                  ),
                  KQK: !kqkham ? (
                    <Tag color="volcano">Chưa có </Tag>
                  ) : (
                    <Tag color="green">Hoàn thành</Tag>
                  ),
                  TENCTY: tenct,
                  NGUOIGUISNS:nguoiguisms,
                  NGAYGUISMS:ngayguisms,
                  NGUOITAO:nguoitao,
                  NGAYTAO:moment(ngaytao).format('DD/MM/YY hh:mm:ss'),
                  GHICHU:ghichu,
                  SMS:
                    trangthaisms === 1 ? (
                      <Tag>Chưa gửi</Tag>
                    ) : trangthaisms === 2 ? (
                      <Tag color="success">Gửi thành công</Tag>
                    ) : (
                      <Tag color="error">Gửi thất bại</Tag>
                    ),
                  action: (
                    <ul className="flex gap-2 justify-around gap-2 ">
                      <li className="text-lg text-red-500">
                        <Tooltip
                          title="Xóa"
                          placement="top"
                          className="cursor-pointer"
                          color="red"
                        >
                          <Popconfirm
                            placement="left"
                            title="Xoá bệnh nhân"
                            description="Bạn có chắc xoá bệnh nhân này không ?"
                            onConfirm={() => {
                              handlDeleteBenhNhan(idbn);
                            }}
                            okText="Xoá"
                            okType="danger"
                            cancelText="Huỷ"
                            icon={
                              <QuestionCircleOutlined
                                style={{
                                  color: "red",
                                }}
                              />
                            }
                          >
                          <DeleteOutlined />
                          </Popconfirm>
                        </Tooltip>
                      </li>
                      <li onClick={()=>{
                        dispatch(infoBNKhamDoanAction(idbn))
                        dispatch({
                          type:typeAction.OPEN_MODAL_EDIT_BN_KHAM_DOAN
                        })
                      }} className="text-lg text-green-500">
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
      <ModalImport />
      <ModalEditBenhNham/>
    </LayoutApp>
  );
};

export default KhachKhamDoan;
