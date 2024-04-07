import React, { useEffect } from "react";
import LayoutApp from "../../../HOCs/LayoutApp";
import { Space, Table, Tag, Tooltip, Popconfirm, ConfigProvider } from "antd";
import { Button } from "@mui/material";
import * as typeAction from "../../../store/constants/constants";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getCtyKhamDoanById,
  getListCtyKhamDoan,
} from "../../../store/actions/khamDoanAction";
import ModalAddCty from "./ModalAddCty/ModalAddCty";
import ModalEditCty from "./ModalEditCty/ModalEditCty";
const columns = [
  {
    title: "Mã Cty",
    dataIndex: "mact",
    key: "mact",
     width:70,
  },
  {
    title: "Tên Cty",
    dataIndex: "tenct",
    key: "tenct",
    width:220,
  },
  {
    title: "Địa chỉ",
    dataIndex: "diachi",
    key: "diachi",
    width:220,
  },
  {
    title: "Điện Thoại",
    dataIndex: "dienthoai",
    key: "dienthoai",
    width:120,
  },
  {
    title: "Fax",
    dataIndex: "fax",
    key: "fax",
    width:120,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width:120,
  },
  {
    title: "Website",
    dataIndex: "website",
    key: "website",
    width:120,
  },
  {
    title: "Ghi chú",
    dataIndex: "ghichu",
    key: "ghichu",
    width:120,
  },
  {
    title: "Người Tạo",
    dataIndex: "ghichu",
    key: "ghichu",
    width:200,
  },
  {
    title: "Ngày tạo",
    dataIndex: "ghichu",
    key: "ghichu",
    width:80,
  },
  {
    title: "Người sửa",
    dataIndex: "ghichu",
    key: "ghichu",
    width:200,
  },
  {
    title: "Ngày sửa",
    dataIndex: "ghichu",
    key: "ghichu",
    width:80,
  },
  {
    title: "Hành động",
    key: "action",
    dataIndex: "action",
    width: 100,
    align: "center",
    fixed: 'right',
  },
];

const CTyKhamDoan = () => {
  const dispatch = useDispatch();
  const { listCTy, infoCtyKhamDoan } = useSelector(
    (state) => state.khamDoanReducer
  );
  //deleteCongty
  const deleteCtyKhamDoan = (idcty) => {
    console.log(idcty);
  };
  useEffect(() => {
    dispatch(getListCtyKhamDoan());
  }, []);
  return (
    <LayoutApp>
      <div className="p-5">
        <div className="mb-5">
          <ModalAddCty />
        </div>
        <div>
          <ConfigProvider theme={{
            token:{
              padding:5
            }
          }}>
            <Table
            scroll={{
              x:1500,
              y:800
            }}
              columns={columns}
              dataSource={listCTy?.map(
                ({
                  idct,
                  mact,
                  tenct,
                  diachi,
                  dienthoai,
                  fax,
                  email,
                  webside,
                  ghichu,
                }) => ({
                  key: idct,
                  mact,
                  tenct,
                  diachi,
                  dienthoai,
                  fax,
                  email,
                  webside,
                  ghichu,
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
                            title="Xoá công ty"
                            description="Bạn có chắc xoá Công ty này không ?"
                            onConfirm={() => {
                              deleteCtyKhamDoan(idct);
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
                      <li className="text-lg text-green-500">
                        <Tooltip
                          title="sửa"
                          className="cursor-pointer"
                          placement="top"
                          color="green"
                        >
                          <EditOutlined
                            onClick={() => {
                              dispatch({
                                type: typeAction.OPEN_MODAL_EDIT_CTY_KHAM_DOAN,
                              });
                              dispatch(getCtyKhamDoanById(idct));
                            }}
                          />
                        </Tooltip>
                      </li>
                    </ul>
                  ),
                })
              )}
            />
          </ConfigProvider>
        </div>
      </div>
      <ModalEditCty />
    </LayoutApp>
  );
};

export default CTyKhamDoan;
