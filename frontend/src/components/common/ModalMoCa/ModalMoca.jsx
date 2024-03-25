import React, { useEffect, useState } from "react";
import { Input, Modal } from "antd";
import Button from "@mui/material/Button";
import { Statistic } from "antd";
import { Table, Select } from "antd";
import { Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as typeAction from "../../../store/constants/constants";
import { listCaLamViec } from "../../../store/actions/BranchAction";
import { Formik } from "formik";

const ModalMoca = () => {
  const { modalMoCa } = useSelector((state) => state.modalReducer);
  const { PkDangNhap, listCa } = useSelector((state) => state.branchReducer);
  const dispatch = useDispatch();

  const closeCaLamViec = () => {
    dispatch({
      type: typeAction.CLOSE_MODAL_MOCA,
    });
  };

  useEffect(() => {
    dispatch(listCaLamViec());
  }, []);
  return (
    <>
      <Modal
        title="Ca làm việc"
        centered
        footer={null}
        open={modalMoCa}
        onCancel={closeCaLamViec}
        width={500}
      >
        <Formik
          initialValues={{
            idNguoiDung: 0,
            thoiGianDangNhap: null,
            dangXuat: null,
            ip: '',
            ghiChu: '',
            idPK: '',
            idCaLamViec: '',
            idChiNhanh: '',
          }}
        >
          {(props) => (
            <form action="">
              <div>
                <div className="text-base ">
                  <h2 className="font-medium text-lg">
                    CHI NHÁNH: {PkDangNhap?.tenChiNhanh}
                  </h2>
                  <div className="my-2">
                    <div className="flex gap-2">
                      <div className="flex flex-col justify-between w-full">
                        <h2>
                          {" "}
                          <span className="font-medium ">Nhân viên:</span>{" "}
                          Nguyễn Quốc Tài - NV0002
                        </h2>
                        <h2>
                          {" "}
                          <span className="font-medium "> Vai trò:</span> Nhân
                          viên IT
                        </h2>
                      </div>
                    </div>
                    <div className="flex my-2  gap-2">
                      <div className="flex w-1/2">
                        <label className="font-semibold mr-1 ">Mở ca: </label>
                        <i>25/3/2024 10:25 AM</i>
                      </div>
                      <div className="flex w-1/2">
                        <label className="font-semibold mr-1">Đóng ca: </label>
                        <i>25/3/2024 10:25 AM</i>
                      </div>
                    </div>
                    <div className="flex">
                      <label className=" font-semibold mr-1 ">
                        Ca làm việc:{" "}
                      </label>
                      <Select
                        placeholder="Chọn ca làm việc"
                        options={listCa?.map((item) => ({
                          label: item.tenCa,
                          value: item.idCalamViec,
                        }))}
                        className="w-[32%]"
                        size="small"
                      />
                    </div>
                    <div className="flex my-2 gap-6 ">
                      <div className=" flex w-3/5">
                        <label className=" w-28 font-semibold mr-1 ">
                          Dịch vụ:{" "}
                        </label>
                        <Input
                          value={0}
                          addonBefore="SL"
                          className="w-[80%]"
                          size="small"
                        />
                      </div>
                      <div className="flex w-1/2">
                        <label className=" w-28 font-semibold">Thẻ: </label>
                        <Input value={0} addonBefore="SL" size="small" />
                      </div>
                    </div>
                  </div>
                </div>
                <Divider className="my-3" />
                <div className="flex justify-around">
                  <Statistic title="Thẻ thành viên" value={0} suffix="VNĐ" />
                  <Statistic title="Doanh thu dịch vụ" value={0} suffix="VNĐ" />
                  <Statistic
                    valueStyle={{
                      color: "#3f8600",
                    }}
                    title="Tổng doanh thu"
                    value={0}
                    suffix="VNĐ"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-5 py-4">
                <Button onClick={closeCaLamViec} variant="outlined">
                  Huỷ
                </Button>
                <Button onClick={closeCaLamViec} variant="contained">
                  Đóng ca
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default ModalMoca;
