import React, { useEffect, useState } from "react";
import Layout from "../../../HOCs/Layout";
import { Input, Tabs, Select } from "antd";
import {
  MoreOutlined,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { Space, Table, Popover, Tag, Dropdown, Divider } from "antd";
import {
  getAllSelectClinicAction,
  getQuanAction,
  getXaAction,
} from "../../../store/actions/receiveAction";
import DropDown from "./DropDown/DropDown";
import TableHistory from "./Table/TableHistory";
import { Button } from "@mui/material";
import TabsChiDinh from "./TabsChiDinh/TabsChiDinh";
import TablePay from "./Table/TablePay";
const columns = [
  {
    title: "STT",
    dataIndex: "STT",
    key: "STT",
    width: 80,
  },
  {
    title: "Tên bệnh nhân",
    dataIndex: "TenBN",
    key: "TenBN",
  },
  {
    title: "Ngày sinh",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Phòng khám",
    dataIndex: "PK",
    key: "PK",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    width: 50,
  },
];

const Receive = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(getAllSelectClinicAction());
  }, []);
  return (
    <Layout>
      <div>
        <div
          className="bg-white m-5 p-5 rounded-lg "
          style={{
            height: 875,
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
                              <Input size="small" />
                            </div>
                            <div className="flex w-3/5 items-center">
                              <label className="w-[15.5%]">Mã BN:</label>
                              <Input size="small" />
                            </div>
                          </div>
                          <div className="flex gap-5">
                            <div className="flex w-2/5 items-center">
                              <label className="w-1/3">Điện thoại:</label>
                              <Input size="small" />
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
                              <label className="w-1/3">Tình trạng:</label>
                              <Input size="small" />
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
                              <Input.TextArea />
                            </div>
                          </div>
                        </div>
                      </>
                    ),
                  },
                  {
                    label: "Danh sách chờ khám",
                    key: 2,
                    children: (
                      <>
                        <div>
                          <Table
                            columns={columns}
                            bordered
                            style={{
                              height: "600px",
                            }}
                            className="max-h-96"
                            scroll={{ y: 273 }}
                            pagination={{
                              pageSize: 10,
                            }}
                            dataSource={[
                              { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
                              { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
                              { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
                              { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
                              { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
                              { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
                              { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
                              { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
                              { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
                              { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
                              { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
                            ].map((items) => ({
                              key: items.TenBN,
                              STT: "1001",
                              TenBN: items.TenBN,
                              date: "22/03/2024",
                              PK: items.PK,
                              action: (
                                <>
                                  <DropDown />
                                </>
                              ),
                            }))}
                          />
                        </div>
                      </>
                    ),
                  },
                ]}
              />
              <TableHistory />
            </div>
            <div className="w-1/2 border p-2 rounded-lg">
              <div className="border h-[292px] rounded-md">
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
                      <div className="flex items-center gap-5">
                      <Button
                      className="w-2/3"
                    variant="contained"
                    size="small"
                    color="success"
                  >
                    Thanh toán
                  </Button>
                  <div className="text-green-700 text-xl font-semibold w-1/3 text-center">
                    1,800,000 VNĐ
                  </div>
                      </div>
                  
                </div>
              </div>
              <Divider>
                <span className="text-blue-500">CHỈ ĐỊNH</span>
              </Divider>
              <div className="border h-96 rounded-md">
                <TabsChiDinh />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Receive;
