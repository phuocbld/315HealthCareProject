import React, { useEffect, useState, useRef } from "react";
import * as typeAction from "../../../store/constants/constants";
import Layout from "../../../HOCs/Layout";
import { Input, Select, Tabs, DatePicker } from "antd";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import TableChiTiet from "./TableChiTiet/TableChiTiet";
import Attach from "./Attach/Attach";
import ListKho from "./ListKho/ListKho";
import { useDispatch, useSelector } from "react-redux";
import {
  getBranchNhapKho,
  getInfoDoitac,
  getlistDoitac,
} from "../../../store/actions/NhapKhoAction";
const Nhapkho = () => {
  const dispatch = useDispatch();
  const now = moment();
  const [date, setDate] = useState(now.format()); // set time lại thời gian thực
  const { branch, listKhoNhap, listDoiTac, infoDoiTac } = useSelector(
    (state) => state.NhapKhoReducer
  );
  // xử lí button submit
  const handleSave = (values, action) => {
    action.resetForm();
    dispatch({
      type: typeAction.DISPATCH_RESET_INFO_DOITAC,
    });
    console.log(values);
    formik.setFieldValue("ngayNhan", now.format()); // set lại thời gian nhận
  };
 
  // lấy thông tin người dùng >> tạm thời
  const infoUser = JSON.parse(localStorage.getItem("USER_INFO"));
  const hanldeSaveAndPrint = (values, actions) => {
    console.log(values);
  };
  const onchangeDateHoaDon = (date, dateString) => {
    const dateHoaDon = moment(date).format();
    formik.setFieldValue("ngayHoaDon", dateHoaDon);
  };
  // xử lý thông tin chọn
  const handleChangeSelect = (name) => (value) => {
    formik.setFieldValue(name, value);
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
      nhanVienNhan: infoUser?.tenNV,
      ngayNhan: date,
      trangThai: 3, // để trạng thái mặc định là 3 vì là nhập kho ở trạng thái đã nhận hàng =>> xem table TRANGTHIAKHO ở database
      idDoiTac: "",
      soHoaDon: '',
      ngayHoaDon: '',
      linkHoaDon: "",
      fileHoaDon: "",
    },
    onSubmit: (value, action) => {
      handleSave(value, action);
    },
  });
  useEffect(() => {
    dispatch(getBranchNhapKho());
    dispatch(getlistDoitac());
  }, []);

  return (
    <Layout>
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
                                value={formik.values.nhanVienNhan}
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
                            <label className="w-[11%] font-semibold">
                              Tên đối tác:
                            </label>
                            <Select
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
                              <label className="w-1/4 font-semibold ">
                                Số hóa đơn:{" "}
                              </label>
                              <Input
                                name="soHoaDon"
                                onChange={formik.handleChange}
                                value={formik.values.soHoaDon}
                                size="small"
                              />
                            </div>
                            <div className="flex w-1/2">
                              <label className="w-1/4 font-semibold">
                                Ngày HĐ :{" "}
                              </label>
                              <DatePicker
                                value={formik.values.ngayHoaDon !== '' ? moment(formik.values.ngayHoaDon) :''}
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
                              Kho nhập:
                            </label>
                            <Select
                              onChange={handleChangeSelect("idKhoNhap")}
                              className="w-full"
                              size="small"
                              value={formik.values.idKhoNhap}
                              options={listKhoNhap?.map(
                                ({ idKho, tenKho }) => ({
                                  label: tenKho,
                                  value: idKho,
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
                              Phương thức:
                            </label>
                            <Select className="w-full" size="small" />
                          </div>
                        </div>
                        <div className="flex flex-col w-1/4 gap-2">
                          <div className="flex ">
                            <label className="w-1/3 font-semibold">
                              Ngày nhập:
                            </label>
                            <Input
                              value={moment(formik.values.ngayNhan).format("DD-MM-YYYY HH:mm:ss")}
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
                              Hình thức:
                            </label>
                            <Select className="w-full" size="small" />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <div className="flex gap-2 flex-col w-1/2 ">
                          <div className="flex">
                            <label className="w-[11%] font-semibold">
                              Tên phiếu:
                            </label>
                            <Input
                              value={formik.values.tenPhieu}
                              onChangeCapture={formik.handleChange}
                              name="tenPhieu"
                              size="small"
                              className="w-full"
                            />
                          </div>
                          <div className="flex items-center">
                            <label className="w-[11%] font-semibold">
                              Nội dung:
                            </label>
                            <Input.TextArea
                              name="NoiDung"
                              value={formik.values.NoiDung}
                              onChange={formik.handleChange}
                              className="max-h-[36.4px] w-full"
                              autoSize={{
                                minRows: 1,
                              }}
                            />
                          </div>
                          <div className="flex">
                            <label className="w-[11%] font-semibold">
                              Tìm kiếm:
                            </label>
                            <Select
                              size="small"
                              placeholder="Nhập tên hàng hoá"
                              className="w-full"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 flex-col w-1/2">
                          <div className="flex gap-2">
                            <div className="flex w-1/3">
                              <label className="w-1/2 font-semibold">
                                Tổng tiền :
                              </label>
                              <p className="font-semibold w-full">
                                0 <span> VNĐ</span>
                              </p>
                            </div>
                            <div className="flex w-1/3">
                              <label className="w-1/2 font-semibold">
                                CK trước VAT :
                              </label>
                              <p className="font-semibold w-full">
                                0 <span> VNĐ</span>
                              </p>
                            </div>
                            <div className="flex w-1/3">
                              <label className="w-1/2 font-semibold">
                                Thành tiền :
                              </label>
                              <p className="font-semibold w-full">
                                0 <span> VNĐ</span>
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex w-1/3">
                              <label className="w-1/2 font-semibold">
                                VAT 5%:
                              </label>
                              <p className="font-semibold w-full">
                                0 <span> %</span>
                              </p>
                            </div>
                            <div className="flex w-1/3">
                              <label className="w-1/2 font-semibold">
                                VAT 8%:
                              </label>
                              <p className="font-semibold w-full">
                                0 <span> %</span>
                              </p>
                            </div>
                            <div className="flex w-1/3">
                              <label className="w-1/2 font-semibold">
                                VAT 10%:
                              </label>
                              <p className="font-semibold w-full">
                                0 <span> %</span>
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex w-1/3">
                              <label className="w-1/2 font-semibold">
                                Thanh toán :
                              </label>
                              <p className="font-semibold w-full">
                                0 <span> VNĐ</span>
                              </p>
                            </div>
                            <div className="flex w-1/3">
                              <label className="w-1/2 font-semibold">
                                CK sau VAT :
                              </label>
                              <p className="font-semibold w-full">
                                0 <span> VNĐ</span>
                              </p>
                            </div>
                            <div className="flex w-1/3">
                              <label className="w-1/2 font-semibold">
                                Thực trả :
                              </label>
                              <p className="font-semibold w-full">
                                0 <span> VNĐ</span>
                              </p>
                            </div>
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
                      <Button variant="outlined" color="info" size="small">
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
                      <Button variant="contained" color="success" size="small">
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
    </Layout>
  );
};

export default Nhapkho;
