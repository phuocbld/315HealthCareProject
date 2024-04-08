import React, { useState } from "react";
import * as typeAction from "../../../../store/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Cascader,
  DatePicker,
  Mentions,
  Select,
  TreeSelect,
  Radio,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { postBNKhamDoan } from "../../../../store/actions/khamDoanAction";
import { addBNKhamDoanSchema } from "../../../../schemas/addBNKhamDoanSchema";

const ModalAdd = () => {
  const dispatch = useDispatch();
  const { modalAddKhamDoan } = useSelector((state) => state.modalReducer);
  const { listCTy } = useSelector((state) => state.khamDoanReducer);
  const infoUser = JSON.parse(localStorage.getItem("USER_INFO"));
  const now = moment();
  function disabledDate(current) {
    // Hàm này nhận vào một đối số là ngày hiện tại và trả về true nếu ngày đó nên bị vô hiệu hóa, ngược lại trả về false
    // Ví dụ: Vô hiệu hóa tất cả các ngày trong quá khứ
    return current && current >= moment().startOf("day");
  }
  const formik = useFormik({
    initialValues: {
      tenbn: "",
      gioitinh: "",
      ngaysinh: "",
      sodienthoai: "",
      ghichu: "",
      mact: "",
      ngaytao: moment(now).format(),
      nguoitao: infoUser.tenNV,
    },
    onSubmit: (value) => handleAddBN(value),
    validationSchema: addBNKhamDoanSchema,
  });
  const handleChangeGioiTinh = (e) => {
    const value = e.target.value;
    formik.setFieldValue("gioitinh", value);
  };
  const handleAddBN = (value) => {
    dispatch(postBNKhamDoan(value));
    handleCancel();
    formik.handleReset();
  };
  const handleIdCTy = (value) => {
    formik.setFieldValue("mact", value);
  };
  const handleChangeDate = (value) => {
    formik.setFieldValue("ngaysinh", moment(value).format());
  };
  const handleOk = () => {
    dispatch({
      type: typeAction.CLOSE_ADD_KHAM_DOAN,
    });
  };

  const handleCancel = () => {
    formik.handleReset();
    dispatch({
      type: typeAction.CLOSE_ADD_KHAM_DOAN,
    });
  };
  return (
    <>
      <Modal
        className="text-center"
        footer={null}
        title="Thêm bệnh nhân "
        open={modalAddKhamDoan}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className="text-start" >
          <div>
            <label
              class="block text-sm font-medium text-gray-700"
              for="password"
            >
              <span className="text-red-500">(*)</span>
              Chọn công ty
            </label>
            <div class="mt-1">
              <Select
                onChange={handleIdCTy}
                value={formik.values.mact}
                className=" w-full "
                required=""
                autocomplete="current-password"
                type="password"
                name="mact"
                id="password"
                options={listCTy?.map(({ tenct, mact }) => ({
                  label: tenct,
                  value: mact,
                }))}
              />
              {formik.errors.mact && (
                <span className="text-red-500">* Vui lòng chọn công ty</span>
              )}
            </div>
          </div>
          <div class="mt-2">
            <label
              class="block text-sm font-medium text-gray-700"
              for="username"
            >
              <span className="text-red-500">(*)</span>
              Tên bệnh nhân
            </label>
            <div class="mt-1">
              <Input
                value={formik.values.tenbn}
                onChangeCapture={formik.handleChange}
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                autocomplete="Tên bệnh nhân"
                type="text"
                name="tenbn"
                id="username"
              />
              {formik.errors.tenbn && (
                <span className="text-red-500">
                  * Vui lòng nhập tên bệnh nhân
                </span>
              )}
            </div>
          </div>
          <div className="flex mt-2 ">
          <div class=" flex flex-col w-1/2 ">
            <span class="mr-3 text-gray-700 font-medium">
              <span className="text-red-500">(*)</span>Giới tính:
            </span>
            <Radio.Group
              name="gioitinh"
              onChange={handleChangeGioiTinh}
              value={formik.values.gioitinh}
              options={[
                {
                  label: "Nam",
                  value: "Nam",
                },
                {
                  label: "Nữ",
                  value: "Nữ",
                },
              ]}
            />
            {formik.errors.gioitinh && (
              <span className="text-red-500">* Vui lòng chọn giới tính</span>
            )}
          </div>
          
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700" for="dob">
              <span className="text-red-500">(*)</span>
              Ngày sinh
            </label>
            <div class="mt-1">
              <DatePicker
                disabledDate={disabledDate}
                name="ngaySinh"
                format={"DD/MM/YYYY"}
                onChange={handleChangeDate}
                className="appearance-none block w-full  border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required=""
                type="date"
                id="dob"
              />
            </div>
            {formik.errors.ngaysinh && (
              <span className="text-red-500">* Vui lòng chọn ngày sinh</span>
            )}
          </div>
          </div>


          <div class="mt-2">
            <label class="block text-sm font-medium text-gray-700" for="email">
              Số điện thoại
            </label>
            <div class="mt-1">
              <Input        
                value={formik.values.sodienthoai}
                onChangeCapture={formik.handleChange}
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required=""
                type="text"
                name="sodienthoai"
              />
              {formik.errors.sodienthoai && (
                <span className="text-red-500">
                 {formik.errors.sodienthoai}
                </span>
              )}
            </div>
          </div>

          <div class="mt-2">
            <label
              class="block text-sm font-medium text-gray-700"
              for="confirm-password"
            >
              Ghi chú
            </label>
            <div class="mt-1">
              <Input
                value={formik.values.ghichu}
                onChange={formik.handleChange}
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                autocomplete="current-password"
                type="text"
                name="ghichu"
                id="confirm-password"
              />
            </div>
          </div>

          <div class="mt-6">
            <button
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
              onClick={formik.handleSubmit}
            >
              Thêm bệnh nhân
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalAdd;
