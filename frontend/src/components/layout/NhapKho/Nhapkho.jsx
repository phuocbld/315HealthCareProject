import React, { useEffect } from "react";
import Layout from "../../../HOCs/Layout";
import { Input, Select, Tabs } from "antd";
import { Button } from "@mui/material";
import { Formik } from "formik";
import TableChiTiet from "./TableChiTiet/TableChiTiet";
import Attach from "./Attach/Attach";
import ListKho from "./ListKho/ListKho";
import { useDispatch, useSelector } from "react-redux";
import { getBranchNhapKho } from "../../../store/actions/NhapKhoAction";
const Nhapkho = () => {
  const dispatch = useDispatch()
  const handleSave = () => {};
  const {branch} = useSelector(state => state.NhapKhoReducer)
  useEffect(()=>{
    dispatch(getBranchNhapKho())
  },[])
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
                  <Formik
                    initialValues={{
                      tenPhieu: "",
                      idKhoNhap: localStorage.getItem('BRANH_LOGIN'),
                      NoiDung: "",
                      nhanVienNhan: "",
                      ngayNhan: "",
                      trangThai: 3,
                      IidDoiTac: "",
                      soHoaDon: "",
                      ngayHoaDon: "",
                      linkHoaDon: "",
                      fileHoaDon: "",
                    }}
                    onSubmit={handleSave}
                  >
                    {(props) => (
                      <form onSubmit={props.handleSubmit}>
                        <div>
                          <div className="flex gap-2">
                            <div className="flex flex-col w-2/4 gap-2">
                              <div className="flex gap-2">
                                <div className="flex w-1/2">
                                  <label className="w-1/4 font-semibold ">
                                    Người nhập:{" "}
                                  </label>
                                  <Input
                                    name="nhanVienNhan"
                                    value={props.values.nhanVienNhan}
                                    size="small"
                                  />
                                </div>
                                <div className="flex w-1/2">
                                  <label className="w-1/4 font-semibold">
                                    Nơi Nhập:{" "}
                                  </label>
                                  <Input  value={branch} className="w-full" size="small" />
                                </div>
                              </div>
                              <div className="flex ">
                                <label className="w-[11%] font-semibold">
                                  Tên đối tác:
                                </label>
                                <Select className="w-full" size="small" />
                              </div>
                              <div className="flex ">
                                <label className="w-[11%] font-semibold">
                                  Địa chỉ:
                                </label>
                                <Input size="small" />
                              </div>
                              <div className="flex gap-2">
                                <div className="flex w-1/2">
                                  <label className="w-1/4 font-semibold ">
                                    Số hóa đơn:{" "}
                                  </label>
                                  <Input size="small" />
                                </div>
                                <div className="flex w-1/2">
                                  <label className="w-1/4 font-semibold">
                                    Ngày HĐ :{" "}
                                  </label>
                                  <Input size="small" />
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col w-1/4 gap-2">
                              <div className="flex ">
                                <label className="w-1/3 font-semibold">
                                  Kho nhập:
                                </label>
                                <Select className="w-full" size="small" />
                              </div>
                              <div className="flex ">
                                <label className="w-1/3 font-semibold">
                                  Mã đối tác:
                                </label>
                                <Select className="w-full" size="small" />
                              </div>
                              <div className="flex ">
                                <label className="w-1/3 font-semibold">
                                  SĐT:
                                </label>
                                <Input size="small" />
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
                                <Input value={new Date} size="small" />
                              </div>
                              <div className="flex ">
                                <label className="w-1/3 font-semibold">
                                  Mã số thuế:
                                </label>
                                <Input size="small" />
                              </div>
                              <div className="flex ">
                                <label className="w-1/3 font-semibold">
                                  Email:
                                </label>
                                <Input size="small" />
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
                                <Input size="small" className="w-full" />
                              </div>
                              <div className="flex items-center">
                                <label className="w-[11%] font-semibold">
                                  Ghi chú:
                                </label>
                                <Input.TextArea
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
                        <div>
                          <Tabs
                            style={{
                              boxShadow:
                                "0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15)",
                            }}
                            className="border rounded-md h-[510px]"
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
                                children: <Attach />,
                              },
                            ]}
                          />
                        </div>
                        <div className="mt-5 flex gap-5 justify-end">
                          <Button variant="outlined" color="info" size="small">
                            Làm mới
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            Lưu
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                          >
                            Lưu & in
                          </Button>
                        </div>
                      </form>
                    )}
                  </Formik>
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
