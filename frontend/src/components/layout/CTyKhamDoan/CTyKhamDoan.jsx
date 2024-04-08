import React, { useEffect, useState, useRef } from "react";
import LayoutApp from "../../../HOCs/LayoutApp";
import {
  Space,
  Table,
  Tooltip,
  Input,
  Popconfirm,
  ConfigProvider,
  Tour,
  FloatButton,
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
  ReadOutlined,
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
  const [open, setOpen] = useState(false);
  const { listCTy, infoCtyKhamDoan } = useSelector(
    (state) => state.khamDoanReducer
  );
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const steps = [
    {
      title: "Thêm công ty",
      description: "Hiện form nhập thông tin công ty muốn tạo và lưu",
      target: () => ref1.current,
    },
    {
      title: "Xoá công ty",
      description: "Chọn công ty muốn xoá và ok, lưu ý không thể xoá công ty đã có danh sách bệnh nhân",
      target: () => ref2.current,
    },
    {
      title: "Chỉnh sửa công ty",
      description:
        "Chọn công ty muốn chỉnh sửa điền form và cập nhập lại",
      target: () => ref3.current,
    },
    {
      title: "Mã công ty",
      description:
        "Sử dụng mã công ty này để thêm và file Excel import danh sách bệnh",
      target: () => ref4.current,
    },
  ];
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
    dispatch(deleteCtykhamDoan(idcty));
  };
  useEffect(() => {
    dispatch(getListCtyKhamDoan());
  }, []);
  const columns = [
    {
      title: "Mã Cty",
      dataIndex: "mact",
      key: "mact",
      width: 90,
      align: "center",
    },
    {
      title: "Tên công ty",
      dataIndex: "tenct",
      key: "tenct",
      width: 250,
      ...getColumnSearchProps("tenct"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "diachi",
      key: "diachi",
      width: 250,
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
      width: 250,
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      width: 200,
    },
    {
      title: "Ghi chú",
      dataIndex: "ghichu",
      key: "ghichu",
      width: 200,
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
          <div className="inline-block" ref={ref1}>
            <ModalAddCty />
          </div>
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
                  mact: <div ref={ref4}>{mact}</div>,
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
                      <li ref={ref2} className="text-lg text-red-500">
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
                      <li ref={ref3} className="text-lg text-green-500">
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
      <FloatButton
        onClick={() => {
          setOpen(true);
        }}
        icon={<ReadOutlined />}
        type="primary"
        style={{
          bottom: 20,
          right: 100,
        }}
      />
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      <ModalEditCty />
    </LayoutApp>
  );
};

export default CTyKhamDoan;
