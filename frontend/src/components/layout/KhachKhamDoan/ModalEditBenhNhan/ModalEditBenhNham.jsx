import React, { useState } from "react";
import { Input, Modal, Tabs, Radio, Empty, DatePicker, Select } from "antd";
import Button from "@mui/material/Button";
// Import the main component
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import * as typeAction from "../../../../store/constants/constants";
import {
  UserOutlined,
  FileDoneOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import dayjs from "dayjs";
import moment from "moment";
import { editingBNKhamDoanSchema } from "../../../../schemas/editingBNKhamDoanSchema";
import { UpdateBNKhamDoanAction } from "../../../../store/actions/khamDoanAction";
const ModalEditBenhNham = () => {
  const dispatch = useDispatch();
  const newPlugin = defaultLayoutPlugin();
  const { modalEditBNKhamDoan } = useSelector((state) => state.modalReducer);
  const { infoBNKhamDoan, listCTy } = useSelector(
    (state) => state.khamDoanReducer
  );
  const infoUser = JSON.parse(localStorage.getItem("USER_INFO"));
  const fileType = ["application/pdf"];

  // xử lí file khám bệnh
  const handleChangeFileKham = (e) => {
    let File = e.target.files[0];

    console.log(File);
    if (File) {
      if (File && fileType.includes(File.type)) {
        let render = new FileReader();
        render.readAsDataURL(File);
        render.onload = (e) => {
          formik.setFieldValue("kqkham", e.target.result);
          setKq();
        };
      }
    } else {
      formik.setFieldValue("kqkham", null);
    }
  };

  const handleRadio = (name) => (e) => {
    const value = e.target.value;
    formik.setFieldValue(name, value);
  };
  const handleSelected = (name) => (value) => {
    formik.setFieldValue(name, value);
  };
  const cancelPDFKham = (name) => {
    formik.setFieldValue(name, null);
  };
  const handleDate = (name) => (date, dateString) => {
    const newDate = moment(dateString, "DD/MM/YYYY").format();
    console.log(newDate);
    formik.setFieldValue(name, newDate);
  };
  const handleSubmit = (value) => {
    dispatch(UpdateBNKhamDoanAction(infoBNKhamDoan?.idbn, value));
    handleCancel();
  };
  const setKq = () => {
    const now = moment();
    formik.setFieldValue("nguoikq", infoUser.tenNV);
    formik.setFieldValue("ngaykq", now.format());
  };
  // xử lí file khám xét nghiệm
  const handleChangeFileXetNghiem = (e) => {
    let File = e.target.files[0];
    if (File) {
      if (File && fileType.includes(File.type)) {
        let render = new FileReader();
        render.readAsDataURL(File);
        render.onload = (e) => {
          formik.setFieldValue("kqxn", e.target.result);
          setKq();
          // setPdfXetNghiem(e.target.result);
        };
      }
    } else {
      formik.setFieldValue("kqxn", e.target.result);
    }
  };
  // FORRMIK
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      idbn: infoBNKhamDoan?.idbn,
      mabn: infoBNKhamDoan?.mabn,
      tenbn: infoBNKhamDoan?.tenbn,
      gioitinh: infoBNKhamDoan?.gioitinh,
      ngaysinh: infoBNKhamDoan?.ngaysinh,
      sodienthoai: infoBNKhamDoan?.sodienthoai,
      ghichu: infoBNKhamDoan?.ghichu,
      idct: infoBNKhamDoan?.idct,
      kqxn: infoBNKhamDoan?.kqxn,
      kqkham: infoBNKhamDoan?.kqkham,
      ngaykq: infoBNKhamDoan?.ngaykq,
      nguoikq: infoBNKhamDoan?.nguoikq,
      trangthaisms: infoBNKhamDoan?.trangthaisms,
      trangthaikham: infoBNKhamDoan?.trangthaikham,
    },
    onSubmit: (value) => handleSubmit(value),
    validationSchema: editingBNKhamDoanSchema,
  });
  const handleCancel = () => {
    dispatch({
      type: typeAction.CLOSE_MODAL_EDIT_BN_KHAM_DOAN,
    });
  };
  return (
    <>
      <Modal
        width={800}
        className="text-center"
        footer={null}
        title="Sửa thông tin bệnh nhân"
        open={modalEditBNKhamDoan}
        onCancel={handleCancel}
      >
        <form className="text-start">
          <p>
            <span className="font-semibold">Tên BN:</span>{" "}
            {infoBNKhamDoan?.tenbn}
          </p>
          <p>
            <span className="font-semibold">Mã BN:</span> {infoBNKhamDoan?.mabn}
          </p>
          <div className=" shadow-gray-500">
            <Tabs
              type="card"
              defaultActiveKey="1"
              items={[
                {
                  key: 1,
                  label: "Thông tin",
                  icon: <UserOutlined />,
                  children: (
                    <>
                      <div>
                        <div className="flex gap-5">
                          <div className="w-1/2">
                            <label className="font-semibold">
                              <span className="text-red-500">*</span>
                              Tên BN:
                            </label>
                            <Input
                              status={formik.errors.tenbn ? "error" : ""}
                              name="tenbn"
                              onChange={formik.handleChange}
                              value={formik.values.tenbn}
                            />
                          </div>
                          <div className="w-1/2 flex flex-col">
                            <label className="font-semibold">Ngày sinh:</label>
                            <DatePicker
                              allowClear={false}
                              onChange={handleDate("ngaysinh")}
                              value={dayjs(
                                formik.values.ngaysinh,
                                "YYYY-MM-DD"
                              )}
                              format={"DD/MM/YYYY"}
                            />
                          </div>
                        </div>
                        <div className="flex gap-5">
                          <div className="w-1/2">
                            <label className="font-semibold">
                              <span className="text-red-500">*</span>
                              Số điện thoại:
                            </label>
                            <Input
                              status={formik.errors.sodienthoai ? "error" : ""}
                              onChange={formik.handleChange}
                              name="sodienthoai"
                              value={formik.values.sodienthoai}
                            />
                          </div>
                          <div className="w-1/2">
                            <label className="font-semibold">
                              Tên công ty:
                            </label>
                            <Select
                              className="w-full"
                              onChange={handleSelected("idct")}
                              value={formik.values.idct}
                              options={listCTy?.map(({ idct, tenct }) => ({
                                label: tenct,
                                value: idct,
                              }))}
                            />
                          </div>
                        </div>
                        <div className="flex gap-5">
                          <div className="w-1/2">
                            <label className="font-semibold">Ghi chú:</label>
                            <Input
                              onChange={formik.handleChange}
                              name="ghichu"
                              value={formik.values.ghichu}
                            />
                          </div>
                          <div class="flex items-center  mt-6 w-1/2">
                            <span class="mr-3 text-gray-700 font-medium">
                              Giới tinh:
                            </span>
                            <Radio.Group
                              onChange={handleRadio("gioitinh")}
                              value={formik.values.gioitinh}
                              name="gioitinh"
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
                          </div>
                        </div>
                      </div>
                    </>
                  ),
                },
                {
                  key: 2,
                  label: "KQ khám",
                  icon: <FileDoneOutlined />,
                  children: (
                    <div className="h-[450px]">
                      <div className="flex gap-5">
                        <Button type="button" variant="contained" size="small">
                          <label
                            className="cursor-pointer "
                            for="file-upload-kham"
                          >
                            Chọn file
                          </label>
                          <input
                            id="file-upload-kham"
                            type="file"
                            accept="application/pdf"
                            onChange={handleChangeFileKham}
                          />
                        </Button>
                        {formik.values.kqkham ? (
                          <Button
                            size="small"
                            color="error"
                            onClick={() => {
                              cancelPDFKham("kqkham");
                            }}
                            variant="outlined"
                          >
                            Xoá file
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        {formik.values.kqkham ? (
                          <div
                            className="mt-2"
                            style={{
                              border: "1px solid rgba(0, 0, 0, 0.3)",
                              height: "400px",
                            }}
                          >
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                              <Viewer
                                fileUrl={formik.values.kqkham}
                                plugins={[newPlugin]}
                              />
                            </Worker>
                          </div>
                        ) : (
                          <Empty
                            description={<span>Chưa có file kết quả khám</span>}
                          />
                        )}
                      </div>
                    </div>
                  ),
                },
                {
                  key: 3,
                  label: "KQ xét nghiệm",
                  icon: <ExperimentOutlined />,
                  children: (
                    <div className="h-[450px]">
                      <div className="flex gap-5">
                        <Button type="button" variant="contained" size="small">
                          <label
                            className="cursor-pointer "
                            for="file-upload-xet-nghiem"
                          >
                            Chọn file
                          </label>
                          <input
                            id="file-upload-xet-nghiem"
                            type="file"
                            accept="application/pdf"
                            onChange={handleChangeFileXetNghiem}
                          />
                        </Button>
                        {formik.values.kqxn ? (
                          <Button
                            size="small"
                            color="error"
                            onClick={() => {
                              cancelPDFKham("kqxn");
                            }}
                            variant="outlined"
                          >
                            Xoá file
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>

                      <div>
                        {formik.values.kqxn ? (
                          <div
                            className="mt-2"
                            style={{
                              border: "1px solid rgba(0, 0, 0, 0.3)",
                              height: "400px",
                            }}
                          >
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                              <Viewer
                                fileUrl={formik.values.kqxn}
                                plugins={[newPlugin]}
                              />
                            </Worker>
                          </div>
                        ) : (
                          <Empty
                            description={
                              <span>Chưa có file kết xét nghiệm</span>
                            }
                          />
                        )}
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </div>
          <div className="flex justify-end gap-5 pt-2">
            <Button
              onClick={() => {
                formik.handleSubmit();
              }}
              variant="contained"
              size="small"
            >
              Cập nhập
            </Button>
            <Button onClick={handleCancel} variant="outlined">
              Huỷ bỏ
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalEditBenhNham;
