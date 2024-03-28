import React, { useEffect, useRef, useState } from "react";
import Layout from "../../../HOCs/Layout";
import { Input, Tabs, Select, ConfigProvider, DatePicker, Divider } from "antd";
import { useReactToPrint } from "react-to-print";
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSelectClinicAction,
  getQuanAction,
  getXaAction,
} from "../../../store/actions/receiveAction";
import TableHistory from "./Table/TableHistory";
import { Button } from "@mui/material";
import TabsChiDinh from "./TabsChiDinh/TabsChiDinh";
import TablePay from "./Table/TablePay";
import TableChoKham from "./Table/TableChoKham";

const Receive = () => {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const {
    nguonKH,
    phongKham,
    ngheNghiep,
    hinhThucTT,
    danToc,
    doiTuong,
    tinhTP,
    quocTich,
    phuongXa,
    quanHuyen,
  } = useSelector((state) => state.receiveReducer);

  const handleTinh = (value) => {
    dispatch(getQuanAction(value));
  };
  const handleXaPhuong = (value) => {
    dispatch(getXaAction(value));
  };
  const handlPrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: "@page { size: A5 }",
    onAfterPrint: () => {
      console.log(componentRef.current);
    },
  });
  // const handlPrint = () =>{
  //   handleGenerateDocx()
  // }
  useEffect(() => {
    dispatch(getAllSelectClinicAction());
  }, []);
  return (
    <Layout>
      <div className="overflow-auto h-full">
        <div
          className="bg-white m-2 p-2 rounded-lg "
          style={{
            height: 858,
            border: "1px solid #B6BBC4",
            boxShadow:
              "0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15)",
          }}
        >
          <form className="flex " action="">
            <div className="flex flex-col gap-1 w-1/2 border p-2 rounded-lg ">
              <Input.Search
                allowClear
                enterButton="Tìm kiếm"
                placeholder="Tiềm kiếm mã BN, SĐT, Tên bệnh nhân"
                className="mb-1"
              />
              <Tabs
                type="card"
                items={[
                  {
                    label: "Thông tin bệnh nhân",
                    key: 1,
                    children: (
                      <>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-5">
                            <div className="flex w-2/5 items-center">
                              <label className="w-1/3">Họ và tên:</label>
                              <Input
                                placeholder="Họ tên bệnh nhân"
                                size="small"
                              />
                            </div>
                            <div className="flex w-3/5 items-center">
                              <label className="w-[15.5%]">Mã BN:</label>
                              <Input size="small" />
                            </div>
                          </div>
                          <div className="flex gap-5">
                            <div className="flex w-2/5 items-center">
                              <label className="w-1/3">Số TTV:</label>
                              <Input
                                placeholder="Số thẻ thành viên"
                                size="small"
                              />
                            </div>
                            <div className="flex w-3/5 items-center">
                              <label className="w-[15.5%]">Loại TTV:</label>
                              <Input size="small" />
                            </div>
                          </div>
                          <div className="flex gap-5">
                            <div className="flex w-2/5 items-center">
                              <label className="w-1/3">Người thân:</label>
                              <Select
                                placeholder="Chọn người ngân"
                                size="small"
                                className="w-full"
                                options={[
                                  {
                                    label: "Cha",
                                    value: 2,
                                  },
                                  {
                                    label: "Mẹ",
                                    value: 3,
                                  },
                                  {
                                    label: "Cô/Dì",
                                    value: 4,
                                  },
                                  {
                                    label: "Chú/Dượng",
                                    value: 1,
                                  },
                                  {
                                    label: "Ông",
                                    value: 5,
                                  },
                                  {
                                    label: "Bà",
                                    value: 6,
                                  },
                                ]}
                              />
                            </div>
                            <div className="flex w-3/5 items-center">
                              <label className="w-[15.5%]">Thông tin:</label>
                              <Input
                                placeholder="Thông tin người thân"
                                size="small"
                              />
                            </div>
                          </div>
                          <div className="flex gap-5">
                            <div className="flex w-2/5 items-center">
                              <label className="w-1/3">Điện thoại:</label>
                              <Input
                                placeholder="SĐT bệnh nhân hoặc người giám hộ"
                                size="small"
                              />
                            </div>
                            <div className="flex w-3/5 gap-5 items-center">
                              <div className="flex w-1/2">
                                <label className="w-2/5">Giới tính:</label>
                                <Select
                                  className="w-full"
                                  options={[
                                    { label: "Nam", value: "Nam" },
                                    { label: "Nữ", value: "Nữ" },
                                    { label: "Khác", value: "Khác" },
                                  ]}
                                  size="small"
                                />
                              </div>
                              <div className="flex w-1/2">
                                <label className="w-3/5">Ngày sinh:</label>
                                <Input size="small" />
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-5">
                            <div className="flex w-2/5 items-center">
                              <label className="w-1/3">Loại khám:</label>
                              <Input size="small" />
                            </div>
                            <div className="flex w-3/5 gap-5 items-center">
                              <div className="flex w-1/2">
                                <label className="w-2/5">Dân tộc:</label>
                                <Select
                                  options={danToc?.map((items) => ({
                                    label: items.tenDanToc,
                                    value: items.tenDanToc,
                                  }))}
                                  className="w-full"
                                  size="small"
                                />
                              </div>
                              <div className="flex w-1/2">
                                <label className="w-3/5">Tuổi:</label>
                                <Input size="small" />
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-5">
                            <div className="flex w-2/5 items-center">
                              <label className="w-1/3">Lý do:</label>
                              <Input
                                placeholder="Lý do khám bệnh"
                                size="small"
                              />
                            </div>
                            <div className="flex w-3/5 gap-5 items-center">
                              <div className="flex w-1/2">
                                <label className="w-2/5">Nguồn:</label>
                                <Select
                                  options={nguonKH?.map((items) => ({
                                    value: items.idNguonKH,
                                    label: items.nguon,
                                  }))}
                                  className="w-full"
                                  size="small"
                                />
                              </div>
                              <div className="flex w-1/2">
                                <label className="w-[43%]">Quốc tịch:</label>
                                <Select
                                  options={quocTich?.map((items) => ({
                                    label: items.tenQuocTich,
                                    value: items.idQuocTich,
                                  }))}
                                  className="w-3/4"
                                  size="small"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-5">
                            <div className="flex w-1/2 items-center">
                              <label className="w-1/4">Đối tượng:</label>
                              <Select
                                options={doiTuong?.map((items) => ({
                                  label: items.tenDoiTuong,
                                  value: items.idDOiTuong,
                                }))}
                                className="w-full"
                                size="small"
                              />
                            </div>
                            <div className="flex gap-1 w-1/2 ">
                              <label className="w-1/3">Nghề nghiệp:</label>
                              <Select
                                options={ngheNghiep?.map((items) => ({
                                  value: items.idNN,
                                  label: items.tenNN,
                                }))}
                                className="w-full"
                                size="small"
                              />
                            </div>
                          </div>
                          <div className="flex gap-5">
                            <div className="flex w-1/2 items-center">
                              <label className="w-1/4">CCCD:</label>
                              <Input size="small" />
                            </div>
                            <div className="flex gap-1 w-1/2 ">
                              <label className="w-1/3">Ngày cấp:</label>
                              <DatePicker className="w-full" size="small" />
                            </div>
                          </div>
                          <div className="flex gap-5">
                            <div className="flex w-1/2 items-center">
                              <label className="w-1/4">Mã TCQG:</label>
                              <Input size="small" />
                            </div>
                            <div className="flex gap-1 w-1/2 ">
                              <label className="w-1/3">Phòng khám:</label>
                              <Select
                                className="w-full"
                                options={phongKham?.map((items) => ({
                                  value: items.maPK,
                                  label: items.tenPK,
                                }))}
                                size="small"
                              />
                            </div>
                          </div>
                          <div className="flex gap-5">
                            <div className="flex gap-1 w-1/3 ">
                              <label className="w-[42%]">Tỉnh/TP:</label>
                              <Select
                                showSearch
                                optionFilterProp="children"
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
                                onChange={handleTinh}
                                options={tinhTP?.map((item) => ({
                                  label: item.tenTinh,
                                  value: item.idTinh,
                                }))}
                                className="w-full"
                                size="small"
                              />
                            </div>
                            <div className="flex gap-1 w-1/3 ">
                              <label>Q.Huyện:</label>
                              <Select
                                showSearch
                                optionFilterProp="children"
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
                                onChange={handleTinh}
                                options={quanHuyen?.map((item) => ({
                                  label: item.tenQuan,
                                  value: item.idQuan,
                                }))}
                                className="w-full"
                                size="small"
                              />
                            </div>
                            <div className="flex gap-1 w-1/3 ">
                              <label>X.Phường:</label>
                              <Select
                                showSearch
                                optionFilterProp="children"
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
                                onChange={handleTinh}
                                options={phuongXa?.map((item) => ({
                                  label: item.tenPhuong,
                                  value: item.idPhuong,
                                }))}
                                className="w-full"
                                size="small"
                              />
                            </div>
                          </div>
                          <div className="flex ">
                            <label className="w-[11%]">Địa chỉ:</label>
                            <Input size="small" />
                          </div>
                          <div className="flex gap-5">
                            <div className="flex gap-1 w-1/3 ">
                              <label className="w-[42%]">SpO2:</label>
                              <Input addonAfter="%" size="small" />
                            </div>
                            <div className="flex gap-1 w-1/3 ">
                              <label className="w-[35%]">Huyết áp:</label>
                              <Input addonAfter="mmHg" size="small" />
                            </div>
                            <div className="flex gap-1 w-1/3 ">
                              <label className="w-[36%]">Nhiệp thở:</label>
                              <Input addonAfter="Lần/p" size="small" />
                            </div>
                          </div>
                          <div className="flex gap-5">
                            <div className="flex gap-1 w-1/3 ">
                              <label className="w-[42%]">Cân nặng:</label>
                              <Input addonAfter="kg" size="small" />
                            </div>
                            <div className="flex gap-1 w-1/3 ">
                              <label className="w-[35%]">Chiều cao:</label>
                              <Input addonAfter="Cm" size="small" />
                            </div>
                            <div className="flex gap-1 w-1/3 ">
                              <label className="w-[36%]">Nhiệt độ:</label>
                              <Input addonAfter="C" size="small" />
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <div className="flex w-full gap-4 items-center">
                              <label className="w-[9%]">Ghi Chú</label>
                              <Input.TextArea
                                size="small"
                                autoSize={{
                                  maxRows: 1,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ),
                  },
                  {
                    label: "Danh sách chờ khám",
                    key: 2,
                    children: <TableChoKham />,
                  },
                ]}
              />
              <TableHistory />
            </div>
            <div className="w-1/2 border p-2 rounded-lg">
              <div className="border h-[248px] rounded-md">
                <TablePay />
              </div>
              <div className="flex w-full gap-5 py-3">
                <div className="flex flex-col w-1/3 gap-5">
                  <div className=" flex ">
                    <label className="w-1/2 text-sm"> Hình thức:</label>
                    <Select
                      size="small"
                      className="w-full"
                      options={hinhThucTT?.map((items) => ({
                        label: items.tenHinhThuc,
                        value: items.idHinhThuc,
                      }))}
                    />
                  </div>
                  <div className="flex ">
                    <label className="w-[50%] text-sm"> Phương thức:</label>
                    <Select
                      size="small"
                      className="w-full"
                      options={["Phương thức", "Công nợ"]?.map((items) => ({
                        label: items,
                        value: items,
                      }))}
                    />
                  </div>
                </div>
                <div className="w-2/3 flex flex-col gap-4  ">
                  <div className=" flex gap-5">
                    <div className="w-2/3 flex justify-start items-center gap-5">
                      <label className="text-sm">Voucher:</label>
                      <Input size="small" />
                      <div className="flex gap-3">
                        <CheckOutlined className="text-green-700" />
                        <CloseOutlined className="text-red-500" />
                        <PlusOutlined />
                      </div>
                    </div>
                    <div className="w-1/3 font-semibold text-center text-lg">
                      <span className="text-red-500"> - 0 VNĐ</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <div className="w-2/3 flex gap-5">
                    <Button
                    className="w-1/2"
                      onClick={() => {
                        handlPrint();
                      }}
                      
                      variant="contained"
                      size="small"
                      color="primary"
                    >
                      In
                    </Button>
                    <Button
                    className="w-1/2"
                      onClick={() => {
                        handlPrint();
                      }}
                      variant="contained"
                      size="small"
                      color="success"
                    >
                      Lưu & In
                    </Button>
                    </div>
                    
                    <div className="text-green-700 text-xl font-semibold w-1/3 text-center">
                      1,800,000 VNĐ
                    </div>
                  </div>
                </div>
              </div>
              <Divider style={{
                margin:'10px 0'
              }}>
                <span className="text-blue-500">CHỈ ĐỊNH</span>
              </Divider>
              <div className="border h-96 rounded-md">
                <TabsChiDinh />
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <div ref={componentRef}>Hello Again</div> */}
    </Layout>
  );
};

export default Receive;
