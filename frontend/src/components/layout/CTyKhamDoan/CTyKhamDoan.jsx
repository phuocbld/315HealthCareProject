import React, { useEffect, useState, useRef } from "react";
import LayoutApp from "../../../HOCs/LayoutApp";
import {
  Space,
  Table,
  Tooltip,
  Input,
  Popconfirm,
  ConfigProvider,
} from "antd";
import { Button } from "@mui/material";
import Highlighter from "react-highlight-words";
import * as typeAction from "../../../store/constants/constants";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCtykhamDoan,
  getCtyKhamDoanById,
  getListCtyKhamDoan,
} from "../../../store/actions/khamDoanAction";
import ModalAddCty from "./ModalAddCty/ModalAddCty";
import ModalEditCty from "./ModalEditCty/ModalEditCty";
import moment from "moment";

const CTyKhamDoan = () => {
  const dispatch = useDispatch();
  const { listCTy, infoCtyKhamDoan } = useSelector(
    (state) => state.khamDoanReducer
  );
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={"Nhập tìm kiếm"}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Xoá
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  //deleteCongty
  const deleteKhamDoan = (idcty) => {
    dispatch(deleteCtykhamDoan(idcty))
  };
  useEffect(() => {
    dispatch(getListCtyKhamDoan());
  }, []);
  const columns = [
    {
      title: "ID Công ty",
      dataIndex: "idct",
      key: "idct",
      width: 80,
      align: "center",
    },
    {
      title: "Mã Cty",
      dataIndex: "mact",
      key: "mact",
      width: 90,
      align: "center",
    },
    {
      title: "Tên Cty",
      dataIndex: "tenct",
      key: "tenct",
      width: 250,
      ...getColumnSearchProps("tenct"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "diachi",
      key: "diachi",
      width: 220,
      ...getColumnSearchProps("diachi"),
    },
    {
      title: "Điện Thoại",
      dataIndex: "dienthoai",
      key: "dienthoai",
      width: 120,
    },
    {
      title: "Fax",
      dataIndex: "fax",
      key: "fax",
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 120,
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      width: 120,
    },
    {
      title: "Ghi chú",
      dataIndex: "ghichu",
      key: "ghichu",
      width: 120,
    },
    {
      title: "Người Tạo",
      dataIndex: "nguoitao",
      key: "nguoitao",
      width: 200,
    },
    {
      title: "Ngày tạo",
      dataIndex: "ngaytao",
      key: "ngaytao",
      width: 150,
    },
    {
      title: "Người sửa",
      dataIndex: "nguoisua",
      key: "nguoisua",
      width: 200,
    },
    {
      title: "Ngày sửa",
      dataIndex: "ngaysua",
      key: "ngaysua",
      width: 150,
    },
    {
      title: "Hành động",
      key: "action",
      dataIndex: "action",
      width: 100,
      align: "center",
      fixed: "right",
    },
  ];
  return (
    <LayoutApp>
      <div className="p-5">
        <div className="mb-5">
          <ModalAddCty />
        </div>
        <div>
          <ConfigProvider
            theme={{
              token: {
                padding: 5,
              },
            }}
          >
            <Table
              scroll={{
                x: 1500,
                y: 800,
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
                  ngaysua,
                  nguoisua,
                  ngaytao,
                  nguoitao,
                }) => ({
                  key: idct,
                  idct,
                  mact,
                  tenct,
                  diachi,
                  dienthoai,
                  fax,
                  email,
                  webside,
                  ghichu,
                  ngaysua:
                    ngaysua && moment(ngaysua).format("DD/MM/YYYY hh:mm:ss"),
                  nguoisua,
                  ngaytao:
                    ngaytao && moment(ngaytao).format("DD/MM/YYYY hh:mm:ss"),
                  nguoitao,
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
                              deleteKhamDoan(idct);
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
