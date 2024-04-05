import React, { useEffect, useState, useRef } from "react";
import * as typeAction from "../../../store/constants/constants";
import LayoutApp from "../../../HOCs/LayoutApp";
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
  fetchAllThuocVT,
  fetchInfoThuocVT,
  getBranchNhapKho,
  getInfoDoitac,
  getlistDoitac,
} from "../../../store/actions/NhapKhoAction";
import { KhoNhapSchema } from "../../../schemas/KhoNhapSchema";
const Nhapkho = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const now = moment();
  const [date, setDate] = useState(now.format()); // set time lại thời gian thực
  const dispatch = useDispatch();

  const { branch, listKhoNhap, listDoiTac, infoDoiTac, thuocVT, infoThuocVT } =
    useSelector((state) => state.NhapKhoReducer);
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
  const hanldeSaveAndPrint = (values, actions) => {
    console.log(values);
  };
  const onchangeDateHoaDon = (date, dateString) => {
    console.log(moment(dateString).format());
    const dateHoaDon = moment(dateString).format();
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
  const formik = useFormik({
    initialValues: {
      tenPhieu: "",
      idKhoNhap: "",
      NoiDung: "",
      nhanVienNhan: infoUser?.dangNhap.idNguoiDung,
      ngayNhan: date,
      trangThai: 3, // để trạng thái mặc định là 3 vì là nhập kho ở trạng thái đã nhận hàng =>> xem table TRANGTHIAKHO ở database
      idDoiTac: "",
      soHoaDon: "",
      ngayHoaDon: "",
      linkHoaDon: "",
      fileHoaDon: "file",
      idHinhThuc: 1,
      idPhuongThuc: 1,
    },
    validationSchema: KhoNhapSchema,
    onSubmit: (value, action) => {
      handleSave(value, action);
    },
  });
  useEffect(() => {
    dispatch(getBranchNhapKho());
    dispatch(getlistDoitac());
    dispatch(fetchAllThuocVT());
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
      <div
        style={{
          boxShadow:
            "0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15)",
        }}
        className="bg-white h-[99%] w-[99%] rounded-md m-2 text-[12px]"
      >
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
                              <label className="w-1/4 font-semibold ">
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
                                Nơi Nhập:{" "}
                              </label>
                              <Input
                                value={branch}
                                className="w-full"
                                size="small"
                              />
                            </div>
                          </div>
                          <div className="flex ">
                            <label className="w-[12%] font-semibold">
                              Tên đối tác:<span className="text-red-500">(*)</span>
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
                            <label className="w-[11%] font-semibold">
                              Địa chỉ:
                            </label>
                            <Input value={infoDoiTac?.diaChi} size="small" />
                          </div>
                          <div className="flex gap-2">
                            <div className="flex w-1/2">
                              <label className="w-[30%] font-semibold ">
                                Số hóa đơn:{" "}<span className="text-red-500 ">(*)</span>
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
                                Ngày HĐ :{" "}<span className="text-red-500 ">(*)</span>
                              </label>
                              <DatePicker
                                name="ngayHoaDon"
                                status={formik.errors.ngayHoaDon ? "error" : ""}
                                // value={
                                //   formik.values.ngayHoaDon !== ""
                                //     ? moment(formik.values.ngayHoaDon).format('DD/MM/YYYY')
                                //     : ""
                                // }
                                format='DD/MM/YYYY'
                                onChange={onchangeDateHoaDon}
                                className="w-full"
                                size="small"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col w-1/4 gap-2">
                          <div className="flex ">
                            <label className="w-1/3 font-semibold">
                              Kho nhập:<span className="text-red-500">(*)</span>
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
                          <div className="flex ">
                            <label className="w-1/3 font-semibold">
                              Mã đối tác:
                            </label>
                            <Input
                              value={infoDoiTac?.maDoiTac}
                              className="w-full"
                              size="small"
                            />
                          </div>
                          <div className="flex ">
                            <label className="w-1/3 font-semibold">SĐT:</label>
                            <Input value={infoDoiTac?.dienThoai} size="small" />
                          </div>
                          <div className="flex ">
                            <label className="w-1/3 font-semibold">
                              Phương thức:<span className="text-red-500">(*)</span>
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
                          <div className="flex ">
                            <label className="w-1/3 font-semibold">
                              Ngày nhập:
                            </label>
                            <Input
                              value={moment(formik.values.ngayNhan).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                              size="small"
                            />
                          </div>
                          <div className="flex ">
                            <label className="w-1/3 font-semibold">
                              Mã số thuế:
                            </label>
                            <Input value={infoDoiTac?.maSoThue} size="small" />
                          </div>
                          <div className="flex ">
                            <label className="w-1/3 font-semibold">
                              Email:
                            </label>
                            <Input value={infoDoiTac?.email} size="small" />
                          </div>
                          <div className="flex ">
                            <label className="w-1/3 font-semibold">
                              Hình thức:<span className="text-red-500">(*)</span>
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
                            <label className="w-[11%] font-semibold">
                              Tên phiếu:<span className="text-red-500">(*)</span>
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
                            <label className="w-[11%] font-semibold">
                              Tìm kiếm:
                            </label>
                            <Select
                              allowClear
                              onChange={handleChoose}
                              autoClearSearchValue="tags"
                              value=""
                              showSearch
                              filterOption={(input, option) =>
                                (option?.label ?? "")
                                  .toLowerCase()
                                  .includes(input)
                              }
                              options={thuocVT?.map(
                                ({ idThuoc, maThuoc, tenBietDuoc }) => ({
                                  label: 
                                  // tenBietDuoc,
                                  <li>
                                    <span className=" border-r-2 pr-2 mr-2">
                                      {maThuoc}
                                    </span>
                                    {tenBietDuoc}
                                  </li>,
                                  value: idThuoc,
                                })
                              )}
                              size="small"
                              placeholder="Nhập tên hàng hoá"
                              className="w-full"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 flex-col w-1/2">
                          <div className="flex items-center w-full">
                            <label className="w-[13.5%] font-semibold">
                              Nội dung:<span className="text-red-500">(*)</span>
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
                      <Button onClick={()=>{formik.handleReset()}} variant="outlined"  color="info" size="small">
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
                      <Button disabled variant="contained" color="success" size="small">
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
