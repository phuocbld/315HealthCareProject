import React, { useEffect, useRef, useState, useCallback } from "react";
import LayoutApp from "../../../HOCs/LayoutApp";
import { formatNumberVND } from "../../../utils/formatNumberVND";
import * as typeAction from "../../../store/constants/constants";
import _ from "lodash";
import { Input, Tabs, Select, Table, ConfigProvider, notification } from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";
import { Button } from "@mui/material";
import Receive from "./Satus/Receive/Receive";
import Pedding from "./Satus/Pedding/Pedding";
import Create from "./Satus/Create/Create";
import Transfer from "./Satus/Transfer/Transfer";
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import {
  // fetchAllThuocVT,
  getBranchNhapKho,
  searchThuocVT,
} from "../../../store/actions/NhapKhoAction";
import { useFormik } from "formik";
import { listBranchAction } from "../../../store/actions/BranchAction";
import {
  getKhoVTAction,
  getListKhoNhanAction,
  postPhieuCKAction,
} from "../../../store/actions/chuyenKhoAction";
import moment from "moment";
import { chuyenKhoSchema } from "../../../schemas/chuyenKhoSchema";
const columns = [
  {
    key: 1,
    title: "Thông tin hàng hoá",
    children: [
      {
        title: "STT",
        dataIndex: "STT",
        key: 1.4,
        width: 50,
        align: "center",
        // sorter: (a, b) => a.age - b.age,
      },
      {
        title: "Tên hàng",
        dataIndex: "tenHangHoa",
        key: 1.1,
        // sorter: (a, b) => a.age - b.age,
      },
      {
        title: "Mã hàng",
        dataIndex: "MaHangHoa",
        key: 1.2,
        width: 120,
        // sorter: (a, b) => a.age - b.age,
      },
      // {
      //   title: "Số lô",
      //   dataIndex: "SOLO",
      //   key: 1.3,
      //   width: 120,
      //   // sorter: (a, b) => a.age - b.age,
      // },
    ],
  },
  {
    key: 2,
    title: "Đơn vị chẳn",
    children: [
      {
        title: "Số lượng",
        dataIndex: "SLCHAN",
        key: 2.1,
        width: 120,
        // sorter: (a, b) => a.age - b.age,
      },
      {
        title: "Đơn vi",
        dataIndex: "DVCHAN",
        key: 2.2,
        width: 120,
        // sorter: (a, b) => a.age - b.age,
      },
    ],
  },
  {
    key: 3,
    title: "Đơn vị lẻ",
    children: [
      {
        title: "Quy cách",
        dataIndex: "QUYCACH",
        key: 3.1,
        width: 120,
        // sorter: (a, b) => a.age - b.age,
      },
      {
        title: "Số lượng",
        dataIndex: "SLLE",
        key: 3.2,
        width: 120,
        // sorter: (a, b) => a.age - b.age,
      },
      {
        title: "Đơn vi",
        dataIndex: "DVLE",
        key: 3.3,
        width: 120,
        // sorter: (a, b) => a.age - b.age,
      },
    ],
  },
  {
    key: 4,
    title: "",
    dataIndex: "action",
    width: 50,
    align: "center",
  },
];

const ChuyenKho = () => {
  const docRef = useRef(null);
  const componentRef = useRef();
  const now = moment();
  const [docx, setdocx] = useState(null);
  const [date, setDate] = useState(now.format());
  const { thuocVT, listKhoNhap, branch } = useSelector(
    (state) => state.NhapKhoReducer
  );
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };
  const { KhoNhan, KhoVT } = useSelector((state) => state.chuyenKhoReducer);
  const { listBranch } = useSelector((state) => state.branchReducer);
  const dispatch = useDispatch();
  const handlePrinter = useReactToPrint({
    content: () => componentRef.current,
  });
  // search lấy thông tin thuốc vật tư
  const debounceDropDown = useCallback(
    _.debounce((nextValue) => {
      dispatch(searchThuocVT(nextValue));
    }, 300),
    []
  ); // sử dụng debounce để tối tiểu thánh server perfoman
  // lấy thông tin người dùng >> tạm thời
  const infoUser = JSON.parse(localStorage.getItem("USER_INFO"));
  const saveDocx = async () => {
    handlePrinter();
    // generateDocx();
  };
  const handleSave = (values, action) => {
    console.log(values);
    if (KhoVT.length === 0) {
      console.log("error");
      openNotificationWithIcon(
        "error",
        "Lưu phiếu chuyển",
        "Vui lòng chọn sản phẩm để tạo phiếu chuyển"
      );
      return;
    }
    setDate(now.format());
    formik.setFieldValue("ngayXuat", date);
    formik.handleReset();
    dispatch(postPhieuCKAction(values, KhoVT));
    dispatch({
      type: typeAction.RESET_KHOVT_CK,
    });
  };
  // xử lý thông tin chọn
  const handleChangeSelect = (name) => (value) => {
    formik.setFieldValue(name, value);
  };
  // XỬ LÝ CHỌN CHI NHÁNH NHẬN KHO TRONG CHUYỂN KHO
  const handleBranchNhanKho = (id) => {
    // console.log(id);
    dispatch(getListKhoNhanAction(id));
  };
  //XỬ LÍ LẤY THUỐC KHO VT
  const handleKhoVT = (idThuoc) => {
    dispatch(getKhoVTAction(idThuoc));
  };

  // XỬ LÝ TĂNG SỐ LƯỢNG THUỐC
  const handleChangeSL = (idThuoc) => (e) => {
    const value = Number(e.target.value);
    dispatch({
      type: typeAction.CHANGE_SL_THUOC_CK,
      payload: {
        idThuoc,
        value: value < 0 || value == "" ? 0 : value,
      },
    });
  };
  // XỬ LÝ XOÁ 1 THUỐC TRONG KHO
  const handleDeleteKhoVTById = (idThuoc) => {
    dispatch({
      type: typeAction.CLOSE_THUOC_CK_BY_ID,
      payload: idThuoc,
    });
  };
  const formik = useFormik({
    initialValues: {
      tenPhieu: "",
      idKhoXuat: "",
      idKhoNhap: "",
      nhanVienXuat: infoUser?.idnv,
      ngayXuat: date,
      noiDung: "",
      // daNhan: 0,
      trangThai: 1,
    },
    onSubmit: (value, action) => {
      handleSave(value, action);
      // handleSave(value, action);
    },
    validationSchema: chuyenKhoSchema,
  });
  useEffect(() => {
    // dispatch(fetchAllThuocVT());
    dispatch(getBranchNhapKho());
    dispatch(listBranchAction());
  }, []);
  return (
    <LayoutApp>
      {contextHolder}
      <div>
        <div
        // className="h-full w-full bg-white rounded-md border"
        // style={{
        //   boxShadow:
        //     "0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15)",
        // }}
        >
          <div className="p-2">
            <Tabs
              items={[
                {
                  label: "Chuyển kho",
                  key: 1,
                  children: (
                    <>
                      <div className="flex h-[750px] ">
                        <div className=" border p-2 rounded-md w-3/4  h-full">
                          <div className="flex gap-5">
                            <div className="flex flex-col gap-4 w-2/5">
                              <div className="flex">
                                <label className="font-semibold w-1/4">
                                  Người chuyển:
                                </label>
                                <Input value={infoUser?.tenNV} size="small" />
                              </div>
                              <div className="flex">
                                <labe className="font-semibold w-1/4">
                                  Tìm kiếm:{" "}
                                </labe>
                                <Select
                                  className="w-full"
                                  size="small"
                                  showSearch
                                  allowClear
                                  onChange={handleKhoVT}
                                  placeholder="Nhập tên vật tư hàng hoá"
                                  value=""
                                  defaultActiveFirstOption={false}
                                  suffixIcon={null}
                                  filterOption={false}
                                  onSearch={debounceDropDown}
                                  notFoundContent={null}
                                  options={(thuocVT || []).map((d) => ({
                                    value: d.idThuoc,
                                    label: (
                                      <u className="flex no-underline">
                                        <li className="flex w-[95%]">
                                          <p className=" border-r-2 pr-2">
                                            {d.maThuoc}
                                          </p>
                                          <p className=" px-2 w-full ">
                                            {d.tenBietDuoc}
                                          </p>
                                        </li>
                                        {/* <li className=" w-[15%] text-end">
                                      {formatNumberVND(d.giaMua)} VNĐ
                                    </li> */}
                                      </u>
                                    ),
                                  }))}
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-4 w-3/5">
                              <div className="w-full flex gap-2">
                                <div className="flex w-1/2">
                                  <label className="font-semibold w-1/3">
                                    Nơi chuyển:
                                  </label>
                                  <Input value={branch} size="small" />
                                </div>
                                <div className="flex w-1/2">
                                  <label className="font-semibold w-1/3">
                                    Kho xuất:
                                    <span className="text-red-500">(*)</span>
                                  </label>
                                  <Select
                                    name="idKhoXuat"
                                    status={
                                      formik.errors.idKhoXuat ? "error" : ""
                                    }
                                    onChange={handleChangeSelect("idKhoXuat")}
                                    className="w-full"
                                    size="small"
                                    value={formik.values.idKhoXuat}
                                    options={listKhoNhap?.map(
                                      ({ idKhoCN, tenKho }) => ({
                                        label: tenKho,
                                        value: idKhoCN,
                                      })
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="w-full flex gap-2">
                                <div className="flex w-1/2">
                                  <label className="font-semibold w-1/3">
                                    Nơi nhận:
                                    <span className="text-red-500">(*)</span>
                                  </label>
                                  <Select
                                    onChange={handleBranchNhanKho}
                                    allowClear
                                    showSearch
                                    filterOption={(input, option) =>
                                      (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input)
                                    }
                                    className="w-full"
                                    options={listBranch?.map((items) => ({
                                      label: items.tenChiNhanh,
                                      value: items.idChiNhanh,
                                    }))}
                                    size="small"
                                  />
                                </div>
                                <div className="flex w-1/2">
                                  <label className="font-semibold w-1/3">
                                    Kho nhận:
                                    <span className="text-red-500">(*)</span>
                                  </label>
                                  <Select
                                    name="idKhoNhap"
                                    status={
                                      formik.errors.idKhoNhap ? "error" : ""
                                    }
                                    onChange={handleChangeSelect("idKhoNhap")}
                                    className="w-full"
                                    size="small"
                                    value={formik.values.idKhoNhap}
                                    options={KhoNhan?.map(
                                      ({ idKhoCN, tenKho }) => ({
                                        label: tenKho,
                                        value: idKhoCN,
                                      })
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="rounded-lg  mt-5 border-2 h-[650px]"
                            style={{
                              boxShadow:
                                "0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15)",
                            }}
                          >
                            <ConfigProvider
                              theme={{
                                token: {
                                  padding: 3,
                                },
                              }}
                            >
                              <Table
                                pagination={false}
                                bordered
                                columns={columns}
                                dataSource={KhoVT?.map((items, index) => ({
                                  STT: index++,
                                  tenHangHoa: items.TENBIETDUOC,
                                  MaHangHoa: items.MATHUOC,
                                  SLCHAN: (
                                    <Input
                                      onChange={handleChangeSL(items.IDTHUOC)}
                                      value={items.khoChiTiet.soLuong}
                                      type="number"
                                    />
                                  ),
                                  DVCHAN: items.DONVICHAN,
                                  QUYCACH: items.QUYCACH,
                                  SLLE:
                                    items.khoChiTiet.soLuong *
                                    items.QUYCACHDONGGOI,
                                  DVLE: items.DVT,
                                  action: (
                                    <div
                                      onClick={() => {
                                        handleDeleteKhoVTById(items.IDTHUOC);
                                      }}
                                    >
                                      <CloseSquareOutlined className="text-red-500 cursor-pointer" />
                                    </div>
                                  ),
                                }))}
                                scroll={{
                                  y: 560,
                                }}
                              />
                            </ConfigProvider>
                          </div>
                        </div>
                        <div className=" border p-2 rounded-md w-1/4 h-full">
                          <div>
                            <div className="flex flex-col gap-4">
                              <div className="flex">
                                <label className="w-1/3 font-medium">
                                  {" "}
                                  Tên Phiếu:
                                  <span className="text-red-500">(*)</span>
                                </label>
                                <Input
                                  status={formik.errors.tenPhieu ? "error" : ""}
                                  name="tenPhieu"
                                  value={formik.values.tenPhieu}
                                  onChange={formik.handleChange}
                                  size="small"
                                />
                              </div>
                              <div className="flex">
                                <label className="w-1/3 font-medium">
                                  {" "}
                                  Ngày Chuyển:
                                </label>
                                <Input
                                  value={moment(formik.values.ngayXuat).format(
                                    "DD/MM/YYYY h:mm:ss a"
                                  )}
                                  size="small"
                                />
                              </div>
                              <div className="flex">
                                <label className="w-1/3 font-medium">
                                  {" "}
                                  Trạng thái:
                                </label>
                                <Input value="Mới chuyển" size="small" />
                              </div>
                              <div className="flex">
                                <label className="w-1/3 font-medium">
                                  {" "}
                                  Nội dung:
                                  <span className="text-red-500">(*)</span>
                                </label>
                                <Input.TextArea
                                  value={formik.values.noiDung}
                                  name="noiDung"
                                  status={formik.errors.noiDung ? "error" : ""}
                                  onChange={formik.handleChange}
                                  showCount
                                  maxLength={500}
                                  style={{
                                    height: 120,
                                    resize: "none",
                                  }}
                                  size="small"
                                />
                              </div>
                            </div>
                            <div
                              className="mt-6  border rounded-lg "
                              style={{
                                boxShadow:
                                  "0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15)",
                              }}
                            >
                              <ul className="flex p-2 bg-slate-100">
                                <li className="w-3/4 font-semibold border-r border-gray-300">
                                  Tên hàng
                                </li>
                                <li className="w-1/4 font-semibold text-center">
                                  Số lượng
                                </li>
                              </ul>
                              <div className=" overflow-auto border h-[430px]">
                                <ul>
                                  {KhoVT?.map((items) => (
                                    <li className="flex p-1 border-b">
                                      <span className="w-3/4">
                                        {items.TENBIETDUOC}
                                      </span>
                                      <span className="w-1/4 text-center">
                                        {items.khoChiTiet.soLuong}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="flex items-center mt-1">
                              <div className="p-2 flex gap-5 w-2/3">
                                <Button
                                  disabled
                                  size="small"
                                  color="primary"
                                  variant="contained"
                                >
                                  In phiếu
                                </Button>
                                <Button
                                  // onClick={saveDocx}
                                  onClick={formik.handleSubmit}
                                  size="small"
                                  color="success"
                                  variant="contained"
                                >
                                  Lưu phiếu
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ),
                },
                {
                  label: "Danh sách phiếu chuyển kho",
                  key: 2,
                  children: (
                    <Tabs
                      tabPosition="left"
                      defaultActiveKey="1"
                      type="card"
                      items={[
                        {
                          label: "Phiếu đã nhận",
                          key: 2.1,
                          children: <Receive />,
                        },
                        {
                          label: "Phiếu chờ xác nhận",
                          key: 2.2,
                          children: <Pedding />,
                        },
                        {
                          label: "Phiếu tạo",
                          key: 2.3,
                          children: <Create />,
                        },
                        {
                          label: "Phiếu đã rời",
                          key: 2.4,
                          children: <Transfer />,
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </LayoutApp>
  );
};

export default ChuyenKho;
