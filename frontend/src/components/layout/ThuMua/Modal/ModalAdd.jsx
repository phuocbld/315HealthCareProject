import { Modal } from "antd";
import { useFormik } from "formik";
import React from "react";

const ModalAdd = ({ isModalOpen, handleCancel }) => {
    const userInfo = JSON.parse(localStorage.getItem('USER_INFO'))
  // data form formik
  const formik = useFormik({
    initialValues: {
      tenBietDuoc: "",
      tenHoatChat: "",
      dvt: "",
      quyCach: "",
      nongDo: "",
      hamLuong: "",
      duongDung: "",
      nuocSanXuat: "",
      nhaSanXuat: "",
      suDung: 0,
      ghiChu: "",
      idCt: '',
      barcode: "",
      qrCode: "",
      cachDung: "",
      maSoDangKy: "",
      donViChan: "",
      chuyenKhoa: "",
      tenDoiTac: "",
      donViDung: "",
      idNhom: 0,
      nguoiTao: userInfo?.tenNV,
      //   ngayTao: "2024-04-13T04:08:31.711Z", // chuyển về saga khi thực hiện post API >>  cùng time
      ptVatNhap: 0,
      ptVatBanLe: 0,
      ptVatToa: 0,
      quyCachDongGoi: 0,
      giaBan: 0,
      giaMua: 0,
    },
  });

  return (
    <Modal
      className="text-center"
      title="Thêm thuốc vật tư"
      okText="Thêm"
      cancelText="Huỷ bỏ"
      open={isModalOpen}
      onOk={handleCancel}
      onCancel={handleCancel}
    >
      <form className="text-start">
        <div>

        </div>
        <div>

        </div>
      </form>
    </Modal>
  );
};

export default ModalAdd;