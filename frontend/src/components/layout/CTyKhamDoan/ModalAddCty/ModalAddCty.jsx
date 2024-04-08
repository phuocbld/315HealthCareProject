import React, { useState } from "react";
import { Modal, Input } from "antd";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as typeAction from "../../../../store/constants/constants";
import { useFormik } from "formik";
import { addCtyKhamDoanSchema } from "../../../../schemas/addCtyKhamDoanSchema";
import { addCtyKhamDoan } from "../../../../store/actions/khamDoanAction";
import moment from "moment";
const ModalAddCty = () => {
  const { modalAddCtyKhamDoan } = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();
  const infoUser = JSON.parse(localStorage.getItem("USER_INFO"));
  const handleOk = () => {
    dispatch({
      type: typeAction.CLOSE_ADD_CTY_KHAM_DOAN,
    });
  };
  const handleShow = () => {
    dispatch({
      type: typeAction.OPEN_ADD_CTY_KHAM_DOAN,
    });
  };
  const handleCancel = () => {
    formik.handleReset();
    dispatch({
      type: typeAction.CLOSE_ADD_CTY_KHAM_DOAN,
    });
  };

  const handleAddCty = (value) => {
    dispatch(addCtyKhamDoan(value));
    handleCancel();
  };
  const formik = useFormik({
    initialValues: {
      mact: "",
      tenct: "",
      diachi: "",
      dienthoai: "",
      fax: "",
      email: "",
      website: "",
      ghichu: "",
      ngaytao: "",
      nguoitao: infoUser.tenNV,
    },
    validationSchema: addCtyKhamDoanSchema,
    onSubmit: (value) => handleAddCty(value),
  });
  return (
    <>
      <Button onClick={handleShow} size="small" variant="contained">
        Thêm Công ty
      </Button>
      <Modal
        className="text-center"
        title="Thêm công Ty"
        open={modalAddCtyKhamDoan}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className="text-start" onSubmit={formik.handleSubmit}>
          <div>
            <label className="font-semibold">
              <span className="text-red-500">*</span> Tên công ty
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
              <span className="text-red-500">*</span> Mã công ty
            </label>
            <Input
              value={formik.values.mact}
              onChange={formik.handleChange}
              name="mact"
              status={formik.errors.mact ? "error" : ""}
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

export default ModalAddCty;
