import React, { useState } from "react";
import { Modal, Select, DatePicker, Table, ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import moment from "moment";
import { useFormik } from "formik";
import dayjs from "dayjs";
const ModalDetail = ({ isModalOpen, handleCancel, setShow, show }) => {
  const { infoPTNhap, listDoiTac, listKhoNhap } = useSelector(
    (state) => state.NhapKhoReducer
  );

  const handleSave = () => {
    setShow(false);
  };
  // update thông tin phiếu nhập xuất
  const handleUpdate = () => {
    setShow(true);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      idNhapXuat: infoPTNhap?.idNhapXuat,
      maPhieu: infoPTNhap?.maPhieu,
      tenPhieu: infoPTNhap?.tenPhieu,
      idKhoNhap: infoPTNhap?.idKhoNhap,
      noiDung: infoPTNhap?.noiDung,
      nhanVienNhan: infoPTNhap?.nhanVienNhan,
      ngayNhan: infoPTNhap?.ngayNhan,
      ghiChu: infoPTNhap?.ghiChu,
      trangThai: infoPTNhap?.trangThai,
      idDoiTac: infoPTNhap?.idDoiTac,
      soHoaDon: infoPTNhap?.soHoaDon,
      ngayHoaDon: infoPTNhap?.ngayHoaDon,
      linkHoaDon: infoPTNhap?.linkHoaDon,
      fileHoaDon: infoPTNhap?.fileHoaDon,
      idHinhThuc: infoPTNhap?.idHinhThuc,
      idPhuongThuc: infoPTNhap?.idPhuongThuc,
    },
  });
  return (
    <>
      <Modal
        width={1300}
        className="text-center"
        title="Xem chi tiết phiếu thu"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <form className="flex gap-5" action="">
          <div className="w-2/3 text-start">
            <h2 className="font-semibold text-base text-blue-500 w-full">
              Chi tiết hàng hoá
            </h2>
            <div className="h-[500px]">
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
                    // dataSource={infoThuocVT?.map((items, index) => ({
                    //   STT: ++index,
                    //   TENHANG: items.TENBIETDUOC,
                    //   MAHANG: items.MATHUOC,
                    //   SLCHAN: (
                    //     <Input
                    //       min={0}
                    //       required
                    //       defaultValue={1}
                    //       className="p-0 text-center"
                    //       type="number"
                    //       onChange={(e) => {
                    //         onChangSLChan(e, items.IDTHUOC);
                    //       }}
                    //     />
                    //   ),
                    //   DVCHAN: items.DONVICHAN,
                    //   DGCHAN: formatNumberVND(items.GIABAN),
                    //   SLLE: items.khoChiTiet.soLuong * items.QUYCACHDONGGOI,
                    //   DVLE: items.DVT,
                    //   DGLE: formatNumberVND(items.GIABAN / items.QUYCACHDONGGOI),
                    //   TONGTIEN: formatNumberVND(items.khoChiTiet.soLuong * items.GIABAN),
                    //   PHIGIACONG: (
                    //     <Input
                    //       onChange={handlePhiGiaCong(items.IDTHUOC)}
                    //       type="number"
                    //       defaultValue={0}
                    //       className="p-0 text-center"
                    //     />
                    //   ),
                    //   PHIVANCHUYEN: (
                    //     <Input
                    //       onChange={handlePhiVanChuyen(items.IDTHUOC)}
                    //       type="number"
                    //       defaultValue={0}
                    //       className="p-0 text-center"
                    //     />
                    //   ),
                    //   CKTRUOCVAT: (
                    //     <Input
                    //       onChange={ptChiecKhauVAT(items.IDTHUOC)}
                    //       defaultValue={0}
                    //       className="p-0 text-center"
                    //     />
                    //   ),
                    //   TIENCKTRUOCVAT: formatNumberVND(items.khoChiTiet.ckTruocVat),
                    //   // <Input value={formatNumberVND(items.khoChiTiet.ckTruocVat)} className="p-0 text-center" />
                    //   // <Input defaultValue={items.khoChiTiet.ckTruocVat} className="p-0 text-center" />
                    //   VAT: (
                    //     <Select
                    //       onChange={handleVAT(items.IDTHUOC)}
                    //       className="w-full  h-[22px]"
                    //       options={[
                    //         { label: "5%", value: 0.05 },
                    //         { label: "8%", value: 0.08 },
                    //         { label: "10%", value: 0.1 },
                    //       ]}
                    //     />
                    //   ),
                    //   TIENVAT: items.khoChiTiet.tienVAT,
                    //   THANHTIEN: formatNumberVND(items.khoChiTiet.thanhTien),
                    //   THUCTRA: formatNumberVND(items.khoChiTiet.thucTra),
                    //   SOLO: (
                    //     <Input
                    //       onChange={hanldChangeSoLo(items.IDTHUOC)}
                    //       className="p-0 text-center"
                    //     />
                    //   ),
                    //   HANDUNG: (
                    //     <Input
                    //       type="Date"
                    //       min={tomorrowDate}
                    //       onChange={handleHanDung(items.IDTHUOC)}
                    //       className="p-0 text-center"
                    //     />
                    //   ),
                    //   ACTION: (
                    //     <CloseOutlined
                    //       onClick={() => {
                    //         deleteInfoThuocById(items.IDTHUOC);
                    //       }}
                    //       className="text-white bg-red-500 p-1 rounded-md cursor-pointer hover:bg-red-400"
                    //     />
                    //   ),
                    // }))}
                  />
                </ConfigProvider>
                <div>
                  <div>
                  <div className="flex">
                    <label className="w-1/3 font-semibold">Đối tác: </label>
                    {show ? (
                      <Select
                        showSearch
                        filterOption={(input, option) =>
                          (option?.label ?? "").toLowerCase().includes(input)
                        }
                        className="w-2/3"
                        value={formik.values.idDoiTac}
                        options={listDoiTac?.map(({ idDoiTac, tenDoiTac }) => ({
                          label: tenDoiTac,
                          value: idDoiTac,
                        }))}
                      />
                    ) : (
                      <p>{infoPTNhap?.tenKhoNhap}</p>
                    )}
                  </div>
                  <div className="flex">
                    <label className="font-semibold w-[11%]">Link hoá đơn:</label>
                    {show ? <TextField  id="standard-helperText" variant="standard" className="w-89%" size="small" value={formik.values.linkHoaDon} /> : <a className="w-89%" href={infoPTNhap?.linkHoaDon}></a>}
                  </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3 text-start ">
            <h2 className="font-semibold text-base text-blue-500 w-full">
              Thông tin phiếu - <span> {infoPTNhap?.maPhieu}</span>
            </h2>
            <div className=" flex flex-col justify-between h-[500px]">
              <div className="flex flex-col gap-2 mt-5">
                <div className="flex ">
                  <label className="font-semibold w-1/3">Trạng thái: </label>
                  <p className="bg-green-700 text-white px-2 rounded-md text-sm">
                    {infoPTNhap?.tenTrangThai}
                  </p>
                </div>
                <div className="flex ">
                  <label className="font-semibold w-1/3">Tên phiếu: </label>
                  {show ? (
                    <TextField
                      className="w-2/3"
                      size="small"
                      value={infoPTNhap?.tenPhieu}
                      id="standard-basic"
                      variant="standard"
                    />
                  ) : (
                    <p>{infoPTNhap?.tenPhieu}</p>
                  )}
                </div>
                <div className="flex">
                  <label className=" w-1/3 font-semibold">
                    Nhân viên nhập:{" "}
                  </label>
                  <p>{infoPTNhap?.tenNVNhan}</p>
                </div>
                <div className="flex">
                  <label className="w-1/3 font-semibold">Ngày nhập: </label>
                  <p>
                    {moment(infoPTNhap?.ngayNhan).format("DD/MM/YYYY hh:mm:ss")}
                  </p>
                </div>
                <div className="flex">
                  <label className="w-1/3 font-semibold">Kho nhập: </label>
                  {show ? (
                    <Select
                      className="w-2/3"
                      size="small"
                      value={formik.values.idKhoNhap}
                      options={listKhoNhap?.map(({ idKhoCN, tenKho }) => ({
                        label: tenKho,
                        value: idKhoCN,
                      }))}
                    />
                  ) : (
                    <p>{infoPTNhap?.tenKhoNhap}</p>
                  )}
                </div>
                <div className="flex">
                  <label className="w-1/3 font-semibold">Số hoá đơn: </label>
                  {show ? (
                    <TextField
                      className="w-2/3"
                      size="small"
                      value={infoPTNhap?.soHoaDon}
                      id="standard-basic"
                      variant="standard"
                    />
                  ) : (
                    <p>{infoPTNhap?.soHoaDon}</p>
                  )}
                </div>
                <div className="flex">
                  <label className="w-1/3 font-semibold">Ngày hoá đơn: </label>
                  {show ? (
                    <DatePicker
                      className="w-2/3"
                      size="small"
                      value={dayjs(infoPTNhap?.ngayHoaDon, "YYYY-DD-MM")}
                      id="standard-basic"
                      variant="standard"
                      format={"DD/MM/YYYY"}
                    />
                  ) : (
                    <p>
                      {moment(infoPTNhap?.ngayHoaDon).format(
                        "DD/MM/YYYY hh:mm:ss"
                      )}
                    </p>
                  )}
                </div>
                <div className="flex">
                  <label className="w-1/3 font-semibold">Hình thức: </label>
                  {show ? (
                    <Select
                      size="small"
                      className="w-2/3"
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
                    />
                  ) : (
                    <p>
                      {formik.values.idPhuongThuc === 1
                        ? "Tiền mặt"
                        : "Chuyển khoản"}
                    </p>
                  )}
                </div>
                <div className="flex">
                  <label className="w-1/3 font-semibold">Phương thức: </label>
                  {show ? (
                    <Select
                      size="small"
                      className="w-2/3"
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
                    />
                  ) : (
                    <p>
                      {formik.values.idPhuongThuc === 1
                        ? "Thanh Toán"
                        : "Công nợ"}
                    </p>
                  )}

                  {/* {show ? (
                  <TextField
                    className="w-2/3"
                    size="small"
                    value={infoPTNhap?.tenPhieu}
                    id="standard-basic"
                    variant="standard"
                  />
                ) : (
                  <p>{infoPTNhap?.tenPhieu}</p>
                )} */}
                </div>
                <div className="flex">
                  <label className="w-1/3 font-semibold">Nội dung: </label>
                  {show ? (
                    <TextField
                      className="w-2/3"
                      size="small"
                      value={infoPTNhap?.noiDung}
                      id="standard-basic"
                      variant="standard"
                    />
                  ) : (
                    <p>{infoPTNhap?.noiDung}</p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex gap-5">
                  {show ? (
                    <Button
                      type="button"
                      variant="contained"
                      size="small"
                      onClick={handleSave}
                    >
                      Lưu
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="contained"
                      size="small"
                      onClick={handleUpdate}
                    >
                      Sửa
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      handleCancel();
                    }}
                    variant="outlined"
                    size="small"
                    type="button"
                  >
                    Huỷ bỏ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalDetail;
