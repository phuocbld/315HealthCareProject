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
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { postBNKhamDoan } from "../../../../store/actions/khamDoanAction";


const ModalAdd = () => {
  const dispatch = useDispatch();
  const { modalAddKhamDoan } = useSelector((state) => state.modalReducer);
  const formik = useFormik({
    initialValues: {
      tenbn: "",
      gioitinh: "",
      ngaysinh: "",
      sodienthoai: "",
      ghichu: "",
      idct: "",
      trangthaikham: 1,
    },
    onSubmit: (value) => handleAddBN(value)
  });
const handleChangeGioiTinh = (e) => {
  const value = e.target.value
 formik.setFieldValue('gioitinh',value)
}
  const handleAddBN = (value) => {
    dispatch(postBNKhamDoan(value))
    formik.handleReset()
  }
  const handleIdCTy = (value) => {
    formik.setFieldValue('idct',value)
  }
  const handleChangeDate = (e) => {
    const value =e.target.value
    console.log(value);
    formik.setFieldValue('ngaysinh',moment(value).format())
  }
  const handleOk = () => {
    dispatch({
      type: typeAction.CLOSE_ADD_KHAM_DOAN,
    });
  };

  const handleCancel = () => {
    formik.handleReset()
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
        <form className="text-start" action="#">
          <div>
            <label
              class="block text-sm font-medium text-gray-700"
              for="username"
            >
              Tên bệnh nhân
            </label>
            <div class="mt-1">
              <Input
                value={formik.values.tenbn}
                onChange={formik.handleChange}
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required="Vui lòng nhập tên bệnh nhân"
                autocomplete="Tên bệnh nhân"
                type="text"
                name="tenbn"
                id="username"
              />
            </div>
          </div>

          <div class="mt-2">
            <label class="block text-sm font-medium text-gray-700" for="email">
              Số điện thoại
            </label>
            <div class="mt-1">
              <Input
              value={formik.values.sodienthoai}
              onChange={formik.handleChange}
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required=""
                autocomplete="email"
                type="number"
                name="sodienthoai"
                id="email"
              />
            </div>
          </div>

          <div class="mt-2">
            <label
              class="block text-sm font-medium text-gray-700"
              for="password"
            >
              Chọn công ty
            </label>
            <div class="mt-1">
              <Select
              onChange={handleIdCTy}
                className=" w-full "
                required=""
                autocomplete="current-password"
                type="password"
                name="password"
                id="password"
                options={[{label:'Công ty khám đoàn',value:1}]}
              />
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

          <div class="mt-2">
            <label class="block text-sm font-medium text-gray-700" for="dob">
              Ngày sinh
            </label>
            <div class="mt-1">
              <input
              onChange={handleChangeDate}
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required=""
                type="date"
                name="dob"
                id="dob"
              />
            </div>
          </div>

          <div class="flex items-center justify-center mt-6">
            <span class="mr-3 text-gray-700 font-medium">Giới tinh:</span>
            <label class="inline-flex items-center">
              <input
                onChange={handleChangeGioiTinh}
                type="radio"
                class="form-radio h-5 w-5 text-pink-600"
                name="gender"
                value="Nam"
              />
              <span class="ml-2 text-gray-700">Nam</span>
            </label>
            <label class="inline-flex items-center ml-6">
              <input
              onChange={handleChangeGioiTinh}
                type="radio"
                class="form-radio h-5 w-5 text-purple-600"
                name="gender"
                value="Nữ"
              />
              <span class="ml-2 text-gray-700">Nữ</span>
            </label>
          </div>

          <div class="mt-6">
            <button
              onClick={formik.handleSubmit}
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button"
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
