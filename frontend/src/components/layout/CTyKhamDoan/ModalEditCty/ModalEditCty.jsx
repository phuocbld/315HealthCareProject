import React, { useState } from "react";
import { Modal, Input, } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch,useSelector } from "react-redux";
import { useFormik } from "formik";
import * as typeAction from '../../../../store/constants/constants'
import { chuyenKhoSchema } from "../../../../schemas/addCtyKhamDoanSchema";
import { Button } from "@mui/material";
import { editCtyKhamDoanById, getCtyKhamDoanById } from "../../../../store/actions/khamDoanAction";
const ModalEditCty = ({ idct }) => {
const {modalEditCtyKhamDoan} = useSelector(state=>state.modalReducer)
const {infoCtyKhamDoan} = useSelector(state=> state.khamDoanReducer)
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch({
        type:typeAction.CLOSE_MODAL_EDIT_CTY_KHAM_DOAN
    })}
  const handleEditCtyKhamDoan = (value) => {
    dispatch(editCtyKhamDoanById(infoCtyKhamDoan?.idct,value))
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenct: infoCtyKhamDoan?.tenct,
      diachi: infoCtyKhamDoan?.diachi,
      dienthoai: infoCtyKhamDoan?.dienthoai,
      fax: infoCtyKhamDoan?.fax,
      email: infoCtyKhamDoan?.email,
      website: infoCtyKhamDoan?.website,
      ghichu: infoCtyKhamDoan?.ghichu,
    },
    validationSchema: chuyenKhoSchema,
    onSubmit: (value) => handleEditCtyKhamDoan(value),
  });
  return (
    <>

      <Modal
        footer={null}
        className="text-center"
        title="Chỉnh sửa công ty"
        open={modalEditCtyKhamDoan}
        onCancel={handleCancel}
      >
        <form className="text-start" onSubmit={formik.handleSubmit}>
          <div>
            <label className="font-semibold">
              <span className="text-red-500">*</span> Tên công ty {infoCtyKhamDoan ? `- Mã CT: ${infoCtyKhamDoan.mact}` :''}
            </label>
            <Input
              value={formik.values.tenct}
              onChange={formik.handleChange}
              name="tenct"
              status={formik.errors.tenct ? "error" : ""}
            />
          </div>
          <div>
            <label className="font-semibold">
              <span className="text-red-500">*</span> Địa chỉ
            </label>
            <Input
              value={formik.values.diachi}
              onChange={formik.handleChange}
              name="diachi"
              status={formik.errors.diachi ? "error" : ""}
            />
          </div>
          <div>
            <label className="font-semibold">
              <span className="text-red-500">*</span> Điện thoại
            </label>
            <Input
              value={formik.values.dienthoai}
              onChange={formik.handleChange}
              name="dienthoai"
              status={formik.errors.dienthoai ? "error" : ""}
            />
          </div>
          <div>
            <label className="font-semibold">
              <span className="text-red-500">*</span> Fax
            </label>
            <Input
              value={formik.values.fax}
              onChange={formik.handleChange}
              name="fax"
              status={formik.errors.fax ? "error" : ""}
            />
          </div>
          <div>
            <label className="font-semibold">
              <span className="text-red-500">*</span> Email
            </label>
            <Input
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              status={formik.errors.email ? "error" : ""}
            />
          </div>
          <div>
            <label className="font-semibold">website</label>
            <Input
              value={formik.values.website}
              onChange={formik.handleChange}
              name="website"
              //   status={formik.errors.website ? "error" : ""}
            />
          </div>
          <div>
            <label className="font-semibold">Ghi Chú</label>
            <Input
              value={formik.values.ghichu}
              onChange={formik.handleChange}
              name="ghichu"
              //   status={formik.errors.website ? "error" : ""}
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="small"
            >
              Lưu
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              variant="outlined"
              size="small"
            >
              Huỷ bỏ
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalEditCty;
