import React, { useEffect, useState } from "react";
import { Input, Modal } from "antd";
import Button from "@mui/material/Button";
import { Statistic } from "antd";
import { Table } from "antd";
import { Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as typeAction from "../../../store/constants/constants";

const columns = [
  {
    title: "Mã DV",
    dataIndex: "MADV",
    width: 50,
  },
  {
    title: "Tên dịch vụ",
    dataIndex: "TENDV",
    width: 150,
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    MADV: `DV00${i}`,
    TENDV: `London, Park Lane no. ${i}`,
  });
}
const ModalMoca = () => {
  const { modalMoCa } = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();

  const closeCaLamViec = () => {
    dispatch({
      type: typeAction.CLOSE_MODAL_MOCA,
    });
  };

  useEffect(() => {
    // console.log(modalMoCa);
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
        <div>
          <div className="text-base ">
            <h2 className="font-medium text-lg">
              CHI NHÁNH: 207B HOÀNG VĂN THỤ - VP{" "}
            </h2>
            <div className="my-2">
              <div className="flex gap-2">
                <div className="flex justify-between w-full">
                  <h2>
                    {" "}
                    <span className="font-medium ">Nhân viên:</span> Nguyễn Quốc
                    Tài - NV0002
                  </h2>
                  <h2>
                    {" "}
                    <span className="font-medium "> Vai trò:</span> Nhân viên IT
                  </h2>
                </div>
              </div>
              <div className="flex my-2 flex-col gap-2">
                <div className="flex">
                  <label className="w-20 font-semibold ">Mở ca: </label>
                  <Input className="w-1/3" size="small" />
                </div>
                <div className="flex">
                  <label className="w-20 font-semibold">Đóng ca: </label>
                  <Input className="w-1/3" size="small" />
                </div>
              </div>
              <div className="flex my-2 gap-6 ">
                <div className=" flex w-3/5">
                  <label className=" w-24 font-semibold mr-1 ">Dịch vụ: </label>
                  <Input value={0} addonBefore="SL" className="w-[80%]" size="small" />
                  
                </div>
                <div className="flex w-1/2">
                  <label className=" w-14 font-semibold">Thẻ: </label>
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
      </Modal>
    </>
  );
};

export default ModalMoca;
