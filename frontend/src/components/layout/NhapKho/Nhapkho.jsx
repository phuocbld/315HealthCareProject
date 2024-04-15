import React, { useEffect, useState, useRef, useCallback } from "react";
import * as typeAction from "../../../store/constants/constants";
import LayoutApp from "../../../HOCs/LayoutApp";
import _ from "lodash";
import { Input, Select, Tabs, DatePicker, notification } from "antd";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import TableChiTiet from "./TableChiTiet/TableChiTiet";
import Attach from "./Attach/Attach";
import ListKho from "./ListKho/ListKho";
import { useDispatch, useSelector } from "react-redux";
import {
  addPhieuNhapKho,
  fetchInfoThuocVT,
  getBranchNhapKho,
  getInfoDoitac,
  getlistDoitac,
  searchThuocVT,
} from "../../../store/actions/NhapKhoAction";
import { formatNumberVND } from "../../../utils/formatNumberVND";
import { listBranchAction } from "../../../store/actions/BranchAction";
import { KhoNhapSchema } from "../../../schemas/KhoNhapSchema";
import dayjs from "dayjs";
const Nhapkho = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const now = moment();
  const [date, setDate] = useState(now.format()); // set time lại thời gian thực
  const dispatch = useDispatch();

  const { branch, listKhoNhap, listDoiTac, infoDoiTac, thuocVT, infoThuocVT } =
    useSelector((state) => state.NhapKhoReducer);
  const { listBranch } = useSelector((state) => state.branchReducer);
  const [api, contextHolder] = notification.useNotification();

  // xử lí button submit
  const handleSave = (values, action) => {
    if (infoThuocVT.length === 0) {
      // check hàng có trong thuốc vó trong kho hay chưa
      openNotificationWithIcon(
        "warning",
        "Lưu phiếu nhập kho",
        "Vui lòng chọn sản phẩm để lưu phiếu !"
      );
      return;
    }
    // CHECK SỐ LÔ VÀ VÀ HẠN DÙNG CÁC HÀNG HOÁ
    for (let items of infoThuocVT) {
      if (items.khoChiTiet.soLo == "" || !items.khoChiTiet.hanDung) {
        openNotificationWithIcon(
          "warning",
          "Lưu phiếu nhập kho",
          "Vui lòng nhập số lô hoặc hạn dùng cho sản phẩm !"
        );
        return;
      }
    }
    action.resetForm();
    dispatch({
      type: typeAction.DISPATCH_RESET_INFO_DOITAC,
    });
    dispatch({
      type: typeAction.RESET_INFO_THUOVT,
    });
    dispatch(addPhieuNhapKho(values, infoThuocVT));
    formik.setFieldValue("ngayNhan", now.format()); // set lại thời gian nhận
  };
  // modal hiện thong báo
  const openNotificationWithIcon = (type, message, desc) => {
    api[type]({
      message,
      description: desc,
    });
  };
  // lấy thông tin người dùng >> tạm thời
  const infoUser = JSON.parse(localStorage.getItem("USER_INFO"));
  // search lấy thông tin thuốc vật tư
  const debounceDropDown = useCallback(
    _.debounce((nextValue) => {
      dispatch(searchThuocVT(nextValue));
    }, 300),
    []
  ); // sử dụng debounce để tối tiểu thánh server perfoman

  const hanldeSaveAndPrint = (values, actions) => {
    console.log(values);
  };
  const onchangeDateHoaDon = (date, dateString) => {
    const dateHoaDon = moment(dateString,'DD/MM/YYYY').format();
    formik.setFieldValue("ngayHoaDon", dateHoaDon);
  };
  // xử lý thông tin chọn
  const handleChangeSelect = (name) => (value) => {
    formik.setFieldValue(name, value);
  };
  const checkStoreThuocVT = (value) => {
    for (const obj of infoThuocVT) {
      if (obj.IDTHUOC === value) {
        return false; // trả về false nếu trùng
      }
    }
    return true;
  };
  // xử lý phong các HÌnh thức và phương thức
  const handleSelect = (name) => (value) => {
    formik.setFieldValue(name, value);
  };
  // xử lí chọn kho chi tiết
  const handleChoose = async (value) => {
    const validate = await checkStoreThuocVT(value);
    validate
      ? dispatch(fetchInfoThuocVT(value))
      : openNotificationWithIcon(
          "error",
          "Chọn thuốc vật tư",
          "Sản phẩm đã có "
        );
  };
  const handleChangeDoiTac = (name) => (value) => {
    formik.setFieldValue(name, value);
    dispatch(getInfoDoitac(value));
  };
  // lấy kho nhập
  const hanldeKhoNhapByBranch = (idChiNhanh) => {
    dispatch(getBranchNhapKho(idChiNhanh));
  };
  const formik = useFormik({
    initialValues: {
      tenPhieu: "",
      idKhoNhap: "",
      NoiDung: "",
      nhanVienNhan: infoUser?.idnv,
      ngayNhan: date,
      trangThai: 3, // để trạng thái mặc định là 3 vì là nhập kho ở trạng thái đã nhận hàng =>> xem table TRANGTHIAKHO ở database
      idDoiTac: "",
      soHoaDon: "",
      ngayHoaDon: "",
      linkHoaDon: "",
      fileHoaDon: "file",
      idct: 1, // set trạng thái mặc đình là 1 >> CTy y tế chấn văn 
      idHinhThuc: 1,
      idPhuongThuc: 1,
    },
    validationSchema: KhoNhapSchema,
    onSubmit: (value, action) => {
      handleSave(value, action);
    },
  });
  useEffect(() => {
    dispatch(getlistDoitac());
    dispatch(listBranchAction());
  }, []);
  const setPricre = (sum) => {
    setTotalPrice(sum);
  };
  // tính tổng tiền
  useEffect(() => {
    if (infoThuocVT.length !== 0) {
      let sum = 0;
      for (let item of infoThuocVT) {
        sum += item.khoChiTiet.thanhTien;
      }
      setPricre(sum);
    } else {
      setTotalPrice(0);
    }
  }, [infoThuocVT]);
  return (
    <LayoutApp>
      {contextHolder}
      <div>
        <Tabs
          className="p-3"
          items={[
            {
              key: 1,
              label: "Nhập kho",
              children: (
                <>
                  <form onSubmitCapture={formik.handleSubmit}>
                    <div>
                      <div className="flex gap-2">
                        <div className="flex flex-col w-2/4 gap-2">
                          <div className="flex gap-2">
                            <div className="flex w-1/2">
                              <label className="w-[30%] font-semibold ">
                                Người nhập:{" "}
                              </label>
                              <Input
                                value={infoUser?.tenNV}
                                name="nhanVienNhan"
                                size="small"
                              />
                            </div>
                            <div className="flex w-1/2">
                              <label className="w-1/4 font-semibold">
                                <span className="text-red-500 text-xs">
                                  (*)
                                </span>
                                Nơi Nhập:{" "}
                              </label>
                              <Select
                                showSearch
                                filterOption={(input, option) =>
                                  (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input)
                                }
                                onChange={hanldeKhoNhapByBranch}
                                options={listBranch?.map((items) => ({
                                  label: items.tenChiNhanh,
                                  value: items.idChiNhanh,
                                }))}
                                className="w-full"
                                size="small"
                              />
                            </div>
                          </div>
                          <div className="flex ">
                            <label className="w-[13%] font-semibold">
                              <span className="text-red-500 text-xs">(*)</span>
                              Tên đối tác:
                            </label>
                            <Select
                              name="idDoiTac"
                              status={formik.errors.idDoiTac ? "error" : ""}
                              showSearch
                              filterOption={(input, option) =>
                                (option?.label ?? "")
                                  .toLowerCase()
                                  .includes(input)
                              }
                              filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                  .toLowerCase()
                                  .localeCompare(
                                    (optionB?.label ?? "").toLowerCase()
                                  )
                              }
                              value={formik.values.idDoiTac}
                              onChange={handleChangeDoiTac("idDoiTac")}
                              options={listDoiTac?.map(
                                ({ idDoiTac, tenDoiTac }) => ({
                                  label: tenDoiTac,
                                  value: idDoiTac,
                                })
                              )}
                              className="w-full"
                              size="small"
                            />
                          </div>
                          <div className="flex ">
                            <label className="w-[13%] font-semibold">
                              Địa chỉ:
                            </label>
                            <Input value={infoDoiTac?.diaChi} size="small" />
                          </div>
                          <div className="flex gap-2">
                            <div className="flex w-1/2">
                              <label className="w-[30%] font-semibold ">
                                <span className="text-red-500 text-sx">
                                  (*)
                                </span>
                                Số hóa đơn:{" "}
                              </label>
                              <Input
                                status={formik.errors.soHoaDon ? "error" : ""}
                                name="soHoaDon"
                                onChange={formik.handleChange}
                                value={formik.values.soHoaDon}
                                size="small"
                              />
                            </div>
                            <div className="flex w-1/2">
                              <label className="font-semibold w-[33%]">
                                {/* <span className="text-red-500 text-xs">
                                  (*)
                                </span> */}
                                Ngày HĐ :{" "}
                              </label>
                              <DatePicker
                                name="ngayHoaDon"
                                // status={formik.errors.ngayHoaDon ? "error" : ""}
                                // value={dayjs(formik.values.ngayHoaDon)}
                                format="DD/MM/YYYY"
                                onChange={onchangeDateHoaDon}
                                className="w-full"
                                size="small"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col w-1/4 gap-2">
                          <div className="flex gap-1">
                            <label className="w-1/3 text-end font-semibold">
                              <span className="text-red-500 text-xs">(*)</span>
                              Kho nhập:
                            </label>
                            <Select
                              name="idKhoNhap"
                              status={formik.errors.idKhoNhap ? "error" : ""}
                              onChange={handleChangeSelect("idKhoNhap")}
                              className="w-full"
                              size="small"
                              value={formik.values.idKhoNhap}
                              options={listKhoNhap?.map(
                                ({ idKhoCN, tenKho }) => ({
                                  label: tenKho,
                                  value: idKhoCN,
                                })
                              )}
                            />
                          </div>
                          <div className="flex gap-1">
                            <label className="w-1/3 text-end font-semibold">
                              Mã đối tác:
                            </label>
                            <Input
                              value={infoDoiTac?.maDoiTac}
                              className="w-full"
                              size="small"
                            />
                          </div>
                          <div className="flex gap-1">
                            <label className="w-1/3 font-semibold text-end">
                              SĐT:{" "}
                            </label>
                            <Input value={infoDoiTac?.dienThoai} size="small" />
                          </div>
                          <div className="flex gap-1">
                            <label className="w-1/3 font-semibold text-center">
                              <span className="text-red-500 text-xs">(*)</span>
                              Phương thức:
                            </label>
                            <Select
                              status={formik.errors.idPhuongThuc ? "error" : ""}
                              name="idPhuongThuc"
                              onChange={handleSelect("idPhuongThuc")}
                              value={formik.values.idPhuongThuc}
                              options={[
                                {
                                  label: "Thanh toán",
                                  value: 1,
                                },
                                {
                                  label: "Công nợ",
                                  value: 2,
                                },
                              ]}
                              className="w-full"
                              size="small"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col w-1/4 gap-2">
                          <div className="flex gap-2">
                            <label className="w-1/3 text-end font-semibold">
                              Ngày nhập:
                            </label>
                            <Input
                              value={moment(formik.values.ngayNhan).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                              size="small"
                            />
                          </div>
                          <div className="flex gap-2">
                            <label className="w-1/3 text-end font-semibold">
                              Mã số thuế:
                            </label>
                            <Input value={infoDoiTac?.maSoThue} size="small" />
                          </div>
                          <div className="flex gap-2">
                            <label className="w-1/3 text-end font-semibold">
                              Email:
                            </label>
                            <Input value={infoDoiTac?.email} size="small" />
                          </div>
                          <div className="flex gap-2">
                            <label className="w-1/3 text-end font-semibold">
                              <span className="text-red-500">(*)</span>
                              Hình thức:
                            </label>
                            <Select
                              name="idHinhThuc"
                              status={formik.errors.idHinhThuc ? "error" : ""}
                              onChange={handleSelect("idHinhThuc")}
                              value={formik.values.idHinhThuc}
                              options={[
                                {
                                  label: "Tiền mặt",
                                  value: 1,
                                },
                                {
                                  label: "Chuyển khoản",
                                  value: 2,
                                },
                              ]}
                              className="w-full"
                              size="small"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-2">
                        <div className="flex gap-3 flex-col w-1/2 ">
                          <div className="flex">
                            <label className="w-[13%]  font-semibold">
                              <span className="text-red-500 text-xs">(*)</span>
                              Tên phiếu:
                            </label>
                            <Input
                              status={formik.errors.tenPhieu ? "error" : ""}
                              value={formik.values.tenPhieu}
                              onChangeCapture={formik.handleChange}
                              name="tenPhieu"
                              size="small"
                              className="w-full"
                            />
                          </div>
                          <div className="flex">
                            <label className="w-[13%] font-semibold">
                              Tìm kiếm:
                            </label>
                            <Select
                              className="w-full"
                              size="small"
                              showSearch
                              allowClear
                              onChange={handleChoose}
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
                                      <p className="pr-2">{d.maThuoc}</p>
                                      <p className="border-x-2 px-2 w-full ">
                                        {d.tenBietDuoc}
                                      </p>
                                    </li>
                                    <li className=" w-[15%] text-end">
                                      {formatNumberVND(d.giaMua)} VNĐ
                                    </li>
                                  </u>
                                ),
                              }))}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 flex-col w-1/2">
                          <div className="flex items-center w-full">
                            <label className="w-[13.5%] text-end font-semibold">
                              <span className="text-red-500 text-xs">(*)</span>
                              Nội dung:
                            </label>
                            <Input.TextArea
                              status={formik.errors.NoiDung ? "error" : ""}
                              name="NoiDung"
                              value={formik.values.NoiDung}
                              onChange={formik.handleChange}
                              className="max-h-[36.4px] w-full"
                              autoSize={{
                                minRows: 1,
                              }}
                            />
                          </div>
                          <div className="w-full">
                            <ul className="flex font-semibold">
                              <li className="flex w-1/2 text-orange-500">
                                <h2>TỔNG TIỀN: </h2>
                                <span>
                                  {" "}
                                  {totalPrice.toLocaleString("en-US")} VNĐ
                                </span>
                              </li>
                              <li className="flex w-1/2 text-blue-500">
                                <h2>TỔNG THỰC TRẢ: </h2>{" "}
                                <span>
                                  {" "}
                                  {totalPrice.toLocaleString("en-US")} VNĐ
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-5">
                      <Tabs
                        style={{
                          boxShadow:
                            "0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15)",
                        }}
                        className="border rounded-md h-[450px]"
                        type="card"
                        items={[
                          {
                            key: 1,
                            label: "Chi tiết hàng",
                            children: <TableChiTiet />,
                          },
                          {
                            key: 2,
                            label: "Đính kèm",
                            children: <Attach formik={formik} />,
                          },
                        ]}
                      />
                    </div>
                    <div className="mt-5 flex gap-5 justify-end">
                      <Button
                        onClick={() => {
                          formik.handleReset();
                        }}
                        variant="outlined"
                        color="info"
                        size="small"
                      >
                        Làm mới
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        Lưu
                      </Button>
                      <Button
                        disabled
                        variant="contained"
                        color="success"
                        size="small"
                      >
                        Lưu & in
                      </Button>
                    </div>
                  </form>
                </>
              ),
            },
            {
              key: 2,
              label: "Danh sách nhập kho",
              children: <ListKho />,
            },
          ]}
        />
      </div>
    </LayoutApp>
  );
};

export default Nhapkho;
