import {
  ConfigProvider,
  Table,
  Input,
  Select,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import * as typeAction from "../../../../store/constants/constants";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatNumberVND } from "../../../../utils/formatNumberVND";
import moment from "moment";
const TableChiTiet = () => {
  const { infoThuocVT } = useSelector((state) => state.NhapKhoReducer);

  const dispatch = useDispatch();

  // thay đổi số lượng thuốc
  const onChangSLChan = (e, idThuoc) => {
    const value = e.target.value;
    dispatch({
      type: typeAction.EDIT_INFO_SL_THUOCVT_BY_ID,
      payload: {
        idThuoc: idThuoc,
        value: Number(value),
      },
    });
  };

  const handleVAT = (idThuoc) => (value) => {
    dispatch({
      type: typeAction.DISPATCH_VAT_THUOCVT,
      payload: {
        idThuoc,
        value,
      },
    });
  };
  // thay đổi giá phi phát sing
  const handlePhiVanChuyen = (idThuoc) => (e) => {
    const value = e.target.value;
    dispatch({
      type: typeAction.EDIT_PHI_VAN_CHUYEN_BY_ID,
      payload: {
        idThuoc,
        value: Number(value),
      },
    });
  };
  const handlePhiGiaCong = (idThuoc) => (e) => {
    const value = e.target.value;
    dispatch({
      type: typeAction.EDIT_PHI_GIA_CONG_BY_ID,
      payload: {
        idThuoc,
        value: Number(value),
      },
    });
  };
  // %CK trước VAT
  const ptChiecKhauVAT = (idThuoc) => (e) => {
    const value = e.target.value;
    dispatch({
      type: typeAction.EDIT_PT_CK_VAT_BY_ID,
      payload: {
        idThuoc,
        value: Number(value),
      },
    });
  };
  // remote infoThuocByID
  const deleteInfoThuocById = (idThuoc) => {
    dispatch({
      type: typeAction.DELETE_INFO_THUOCVT_BY_ID,
      payload: idThuoc,
    });
  };
  // handle số lô
  const hanldChangeSoLo = (idThuoc) => (e) => {
    const value = e.target.value;
    dispatch({
      type: typeAction.DISPATCH_SOLO_THUOCVT,
      payload: {
        idThuoc,
        value,
      },
    });
  };

  const handleHanDung = (idThuoc) => (e) => {
    const value = e.target.value;
    const date = moment(value).format();
    dispatch({
      type: typeAction.DISPATCH_HANDUNG_THUOCVT,
      payload: {
        date,
        idThuoc,
      },
    });
  };

  // Tạo ngày của ngày mai
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  // Lấy ngày, tháng và năm của ngày mai
  var tomorrowDate =
    tomorrow.getFullYear() +
    "-" +
    ("0" + (tomorrow.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + tomorrow.getDate()).slice(-2);
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            padding: 5,
            fontSize: 12,
          },
        }}
      >
        <Table
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
                  width: 60,
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
                  width: 60,
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
                  key: 4.7,
                  title: "Tiền %VAT",
                  dataIndex: "TIENVAT",
                  width: 70,
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
                  width: 120,
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
            TENHANG: items.TENBIETDUOC,
            MAHANG: items.MATHUOC,
            SLCHAN: (
              <Input
                min={0}
                required
                defaultValue={1}
                className="p-0 text-center"
                type="number"
                onChange={(e) => {
                  onChangSLChan(e, items.IDTHUOC);
                }}
              />
            ),
            DVCHAN: items.DONVICHAN,
            DGCHAN: formatNumberVND(items.GIABAN),
            SLLE: items.khoChiTiet.soLuong * items.QUYCACHDONGGOI,
            DVLE: items.DVT,
            DGLE: formatNumberVND(items.GIABAN / items.QUYCACHDONGGOI),
            TONGTIEN: formatNumberVND(items.khoChiTiet.soLuong * items.GIABAN),
            PHIGIACONG: (
              <Input
                onChange={handlePhiGiaCong(items.IDTHUOC)}
                type="number"
                defaultValue={0}
                className="p-0 text-center"
              />
            ),
            PHIVANCHUYEN: (
              <Input
                onChange={handlePhiVanChuyen(items.IDTHUOC)}
                type="number"
                defaultValue={0}
                className="p-0 text-center"
              />
            ),
            CKTRUOCVAT: (
              <Input
                onChange={ptChiecKhauVAT(items.IDTHUOC)}
                defaultValue={0}
                className="p-0 text-center"
              />
            ),
            TIENCKTRUOCVAT: formatNumberVND(items.khoChiTiet.ckTruocVat),
            // <Input value={formatNumberVND(items.khoChiTiet.ckTruocVat)} className="p-0 text-center" />
            // <Input defaultValue={items.khoChiTiet.ckTruocVat} className="p-0 text-center" />
            VAT: (
              <Select
                onChange={handleVAT(items.IDTHUOC)}
                className="w-full  h-[22px]"
                options={[
                  { label: "5%", value: 0.05 },
                  { label: "8%", value: 0.08 },
                  { label: "10%", value: 0.1 },
                ]}
              />
            ),
            TIENVAT: items.khoChiTiet.tienVAT,
            THANHTIEN: formatNumberVND(items.khoChiTiet.thanhTien),
            THUCTRA: formatNumberVND(items.khoChiTiet.thucTra),
            SOLO: (
              <Input
                onChange={hanldChangeSoLo(items.IDTHUOC)}
                className="p-0 text-center"
              />
            ),
            HANDUNG: (
              <Input
                type="Date"
                min={tomorrowDate}
                onChange={handleHanDung(items.IDTHUOC)}
                className="p-0 text-center"
              />
            ),
            ACTION: (
              <CloseOutlined
                onClick={() => {
                  deleteInfoThuocById(items.IDTHUOC);
                }}
                className="text-white bg-red-500 p-1 rounded-md cursor-pointer hover:bg-red-400"
              />
            ),
          }))}
        />
      </ConfigProvider>
    </div>
  );
};

export default TableChiTiet;
