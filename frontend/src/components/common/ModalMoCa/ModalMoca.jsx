import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import Button from "@mui/material/Button";
import { Col, Row, Statistic } from "antd";
import { Table } from "antd";
import { Divider } from "antd";
import { Card, List } from 'antd';
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
          <div className="text-base">
            <h2 className="font-medium text-lg">CHI NHÁNH: 669 QUANG TRUNG - PHỤ SẢN </h2>
            <div>
              <div className="flex gap-2">
                <div className="flex justify-between w-full">
                <h2>  <span className="font-medium ">Nhân viên:</span>   Nguyễn Quốc Tài - NV0002</h2>
                <h2> <span className="font-medium "> Vai trò:</span> Nhân viên IT</h2>
                </div>
              </div>
              <div className="">
                <h2 ><span className="font-medium ">Mở ca:</span> 16/3/2024-19:54:01</h2>
                <h2 > <span className="font-medium ">Đóng ca:</span> 16/3/2024-19:54:01</h2>
              </div>
            </div>
            <div>
              <h2> <span className="font-medium ">Dịch vụ:</span> 25</h2>
              <h2> <span className="font-medium "> Thẻ thành viên:</span> 25</h2>
            </div>
            
          </div>
          <Divider className="my-3" />
          <div className="flex justify-around">
            <Statistic title="Thẻ thành viên" value={1128} suffix="VNĐ" />
            <Statistic title="Doanh thu dịch vụ" value={9300} suffix="VNĐ" />
            <Statistic
              valueStyle={{
                color: "#3f8600",
              }}
              title="Tổng doanh thu"
              value={11128 + 9300}
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
