import {
  ConfigProvider,
  Table,
  Input,
  InputNumber,
  Form,
  DatePicker,
  Select,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import * as typeAction from "../../../../store/constants/constants";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatNumberVND } from "../../../../utils/formatNumberVND";
const TableChiTiet = () => {
  const { infoThuocVT } = useSelector((state) => state.NhapKhoReducer);
  const dispatch = useDispatch();
  const onChangSLChan = (value) => {
    console.log(value);
  };

  // remote infoThuocByID
  const deleteInfoThuocById = (idThuoc) => {
    dispatch({
      type: typeAction.DELETE_INFO_THUOCVT_BY_ID,
      payload: idThuoc,
    });
  };
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            padding: 5,
            fontSize: 12,
          },
        }}
      >
        <Table
          className="h-full "
          bordered
          pagination={false}
          scroll={{
            y: 500,
          }}
          columns={[
            {
              key: 1,
              title: "Thông tin hàng",

              children: [
                {
                  key: 1.1,
                  title: "STT",
                  dataIndex: "STT",
                  width: 40,
                  fixed: true,
                  align: "center",
                },
                {
                  key: 1.2,
                  title: "Tên hàng",
                  dataIndex: "TENHANG",
                  width: 200,
                  fixed: true,
                },
                {
                  key: 1.3,
                  title: "Mã hàng",
                  dataIndex: "MAHANG",
                  width: 70,
                  fixed: true,
                },
              ],
            },
            {
              key: 2,
              title: "Đơn vị chẳn",
              children: [
                {
                  key: 2.1,
                  title: "SL",
                  dataIndex: "SLCHAN",
                  width: 40,
                  align: "center",
                  editable: true,
                },
                {
                  key: 2.2,
                  title: "Đơn vị",
                  dataIndex: "DVCHAN",
                  align: "center",
                  width: 60,
                },
                {
                  key: 2.3,
                  title: "Đơn giá",
                  dataIndex: "DGCHAN",
                  align: "center",
                  width: 80,
                },
              ],
            },
            {
              key: 3,
              title: "Đơn vị lẻ",
              children: [
                {
                  key: 3.1,
                  title: "SL",
                  dataIndex: "SLLE",
                  width: 40,
                  align: "center",
                },
                {
                  key: 3.2,
                  title: "Đơn vị",
                  dataIndex: "DVLE",
                  align: "center",
                  width: 60,
                },
                {
                  key: 3.3,
                  title: "Đơn giá",
                  dataIndex: "DGLE",
                  align: "center",
                  width: 80,
                },
              ],
            },
            {
              key: 4,
              title: "Thành tiền",
              children: [
                {
                  key: 4.1,
                  title: "Tổng tiền",
                  dataIndex: "TONGTIEN",
                  align: "center",
                  width: 90,
                },
                {
                  key: 4.2,
                  title: "P. Gia công",
                  dataIndex: "PHIGIACONG",
                  width: 75,
                  align: "center",
                },
                {
                  key: 4.3,
                  title: "P. Vận chuyển",
                  dataIndex: "PHIVANCHUYEN",
                  width: 89,
                  align: "center",
                },
                {
                  key: 4.4,
                  title: "%CK trước VAT",
                  dataIndex: "CKTRUOCVAT",
                  width: 95,
                  align: "center",
                },
                {
                  key: 4.5,
                  title: "Tiền CK trước VAT",
                  dataIndex: "TIENCKTRUOCVAT",
                  width: 110,
                  align: "center",
                },
                {
                  key: 4.6,
                  title: "VAT",
                  dataIndex: "VAT",
                  width: 80,
                  align: "center",
                },
                {
                  key: 4.9,
                  title: "Thành tiền",
                  dataIndex: "THANHTIEN",
                  width: 90,
                  align: "center",
                },
                {
                  key: 4.1,
                  title: "Thực trả",
                  dataIndex: "THUCTRA",
                  width: 90,
                  align: "center",
                },
              ],
            },
            {
              key: 5,
              title: "Chi tiết",
              children: [
                {
                  key: 5.1,
                  title: "Số lô",
                  dataIndex: "SOLO",
                  width: 90,
                  align: "center",
                },
                {
                  key: 5.2,
                  title: "Hạn dùng",
                  dataIndex: "HANDUNG",
                  align: "center",
                  width: 90,
                },
              ],
            },
            {
              key: 6,
              title: "",
              dataIndex: "ACTION",
              width: 40,
              align: "center",
              fixed: "right",
            },
          ]}
          dataSource={infoThuocVT?.map((items, index) => ({
            STT: ++index,
            TENHANG: items.tenBietDuoc,
            MAHANG: items.maThuoc,
            SLCHAN: (
              <Input
                required
                defaultValue={1}
                className="p-0 text-center"
                type="number"
                onChange={onChangSLChan}
              />
            ),
            DVCHAN: items.donViChan,
            DGCHAN: formatNumberVND(items.donGia),
            SLLE: "",
            DVLE: "",
            DGLE: "",
            TONGTIEN: formatNumberVND(items.soLuong * items.donGiaMua),
            PHIGIACONG: (
              <Input
                type="number"
                defaultValue={0}
                className="p-0 text-center"
              />
            ),
            PHIVANCHUYEN: (
              <Input
                type="number"
                defaultValue={0}
                className="p-0 text-center"
              />
            ),
            CKTRUOCVAT: <Input defaultValue={0} className="p-0 text-center" />,
            TIENCKTRUOCVAT: (
              <Input defaultValue={0} className="p-0 text-center" />
            ),
            VAT: (
              <Select
                className="w-full  h-[22px]"
                options={[
                  { label: "5%", value: 0.05 },
                  { label: "8%", value: 0.08 },
                  { label: "10%", value: 0.1 },
                ]}
              />
            ),
            THANHTIEN: formatNumberVND(items.thanhTien),
            THUCTRA: formatNumberVND(items.thucTra),
            SOLO: <Input className="p-0 text-center" />,
            HANDUNG: <Input className="p-0 text-center" />,
            ACTION: (
              <CloseOutlined
                onClick={() => {
                  deleteInfoThuocById(items.idThuoc);
                }}
                className="text-white bg-red-500 p-1 rounded-md cursor-pointer hover:bg-red-400"
              />
            ),
          }))}
        />
      </ConfigProvider>
    </>
  );
};

export default TableChiTiet;
