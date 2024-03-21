import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import Button from '@mui/material/Button';
import { Col, Row, Statistic } from "antd";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as typeAction from '../../../store/constants/constants'
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
const dispatch = useDispatch()

const closeCaLamViec = () =>{
    dispatch({
        type:typeAction.CLOSE_MODAL_MOCA
    })
}
    
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
          <div>
            <h2 className="font-medium text-lg">Thông tin ca làm việc</h2>
            <div>
              <div className="flex gap-2">
                <span className="">Tên nhân viên:</span>
                <h2>Nguyễn Quốc Tài - Nhân viên IT</h2>
              </div>
              <h2>Mã nhân viên: NV0002</h2>
              <h2>Chi nhánh: 207B Hoàng văn Thụ</h2>
              <div className="flex justify-between">
                <h2 className="font-medium">Mở ca: 16/3/2024-19:54:01</h2>
                <h2 className="font-medium">Đóng ca: 16/3/2024-19:54:01</h2>
              </div>
            </div>
          </div>
          <div>
            <div className="flex">
              <h2 className="font-medium text-lg">
                Doanh thu dịch vụ - Số lượng: 12
              </h2>
            </div>

            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              scroll={{
                y: 150,
              }}
            />
          </div>
          <div>
            <h2 className="font-medium text-lg">Doanh thu thẻ thành viên - Số lượng: 5</h2>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              scroll={{
                y: 150,
              }}
            />
          </div>
          <div className="flex justify-around">
          <Statistic title="Thẻ thành viên" value={1128} suffix="VNĐ" />
          <Statistic title="Doanh thu dịch vụ" value={9300} suffix="VNĐ" />
          <Statistic valueStyle={{
            color: '#3f8600',
          }} title="Tổng doanh thu" value={11128+9300} suffix="VNĐ" />
          </div>
        </div>
        <div className="flex justify-end gap-5 py-4">
      <Button onClick={closeCaLamViec} variant="outlined">Huỷ</Button>
      <Button onClick={closeCaLamViec} variant="contained">Đóng ca</Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalMoca;
