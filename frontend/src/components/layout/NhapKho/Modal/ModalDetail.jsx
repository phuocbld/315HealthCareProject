import React, { useState } from "react";
import { Modal, Select } from "antd";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import moment from "moment";
import { useFormik } from "formik";
const ModalDetail = ({ isModalOpen, handleCancel,setShow,show }) => {

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
        <form className="flex" action="">
          <div className="w-2/3 text-start">
            <h2 className="font-semibold text-base">Chi tiết hàng hoá</h2>
            <div className="h-[500px]"></div>
          </div>
          <div className="w-1/3 text-start h-[500px]">
            <h2 className="font-semibold text-base text-blue-500 w-full">
              Thông tin phiếu - <span> {infoPTNhap?.maPhieu}</span>
            </h2>
            <div className=" flex flex-col gap-2 mt-5">
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
                <label className=" w-1/3 font-semibold">Nhân viên nhập: </label>
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
                    options={listKhoNhap?.map(({idKhoCN,tenKho})=>({
                        label:tenKho,
                        value:idKhoCN
                    }))}
                  />
                ) : (
                  <p>{infoPTNhap?.tenKhoNhap}</p>
                )}
              </div>
              {/* <div className="flex">
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
              </div> */}
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
                  <TextField
                    className="w-2/3"
                    size="small"
                    value={infoPTNhap?.ngayHoaDon}
                    id="standard-basic"
                    variant="standard"
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
                  onClick={()=>{
                    handleCancel()
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
        </form>
      </Modal>
    </>
  );
};

export default ModalDetail;
