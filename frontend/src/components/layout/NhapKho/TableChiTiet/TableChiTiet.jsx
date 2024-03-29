import { ConfigProvider, Table } from "antd";
import {CloseOutlined} from '@ant-design/icons'
import React from "react";

const TableChiTiet = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            padding: 5,
            fontSize: 12,
          },
        }}
      >
        <Table
          className="h-full "
          bordered
          pagination={false}
          scroll={{
            y:500
          }}                
          columns={[
            {
              key: 1,
              title: "Thông tin hàng",
              
              children: [
                {
                  key: 1.1,
                  title: "STT",
                  dataIndex: "STT",
                  width:50,
                  fixed:true,
                  align:'center'
                },
                {
                  key: 1.2,
                  title: "Tên hàng",
                  dataIndex: "TENHANG",
                  width:250,
                  fixed:true,
                },
                {
                  key: 1.3,
                  title: "Mã hàng",
                  dataIndex: "MAHANG",
                  width:100,
                  fixed:true,
                },
              ],
            },
            {
              key: 2,
              title: "Đơn vị chẳn",
              children: [
                {
                  key: 2.1,
                  title: "Số lượng",
                  dataIndex: "SLCHAN",
                  width:100,
                  editable: true,
                },
                {
                  key: 2.2,
                  title: "Đơn vị",
                  dataIndex: "DVCHAN",
                  width:100
                },
                {
                  key: 2.3,
                  title: "Đơn giá",
                  dataIndex: "DGCHAN",
                  width:100
                },
              ],
            },
            {
              key: 3,
              title: "Đơn vị lẻ",
              children: [
                {
                  key: 3.1,
                  title: "Số lượng",
                  dataIndex: "SLLE",
                  width:100
                },
                {
                  key: 3.2,
                  title: "Đơn vị",
                  dataIndex: "DVLE",
                  width:100
                },
                {
                  key: 3.3,
                  title: "Đơn giá",
                  dataIndex: "DGLE",
                  width:100
                },
              ],
            },{
                key:4,
                title:'Thành tiền',
                children:[{
                    key:4.1,
                    title:'Tổng tiền',
                    dataIndex:'TONGTIEN',
                    width:100
                },{
                    key:4.2,
                    title:'Phí gia công',
                    dataIndex:'PHIGIACONG',
                    width:100
                },{
                    key:4.3,
                    title:'Phí vận chuyển',
                    dataIndex:'PHIVANCHUYEN',
                    width:100
                },{
                    key:4.4,
                    title:'%CK trước VAT',
                    dataIndex:'CKTRUOCVAT',
                    width:100
                },{
                    key:4.5,
                    title:'Tiền CK trước VAT',
                    dataIndex:'TIENCKTRUOCVAT',
                    width:140
                },{
                    key:4.6,
                    title:'VAT 5%',
                    dataIndex:'VAT5%',
                    width:100
                },{
                    key:4.7,
                    title:'VAT 8%',
                    dataIndex:'VAT8%',
                    width:100
                },{
                    key:4.8,
                    title:'VAT 10%',
                    dataIndex:'VAT10%',
                    width:100
                },{
                    key:4.9,
                    title:'Thành tiền',
                    dataIndex:'THANHTIEN',
                    width:100
                },{
                    key:4.10,
                    title:'Thực trả',
                    dataIndex:'THUCTRA',
                    width:100
                },
            ]
            },{
                key: 5,
                title: "Chi tiết",
                children: [
                  {
                    key: 5.1,
                    title: "Số lô",
                    dataIndex: "SOLO",
                    width:100,
                  },
                  {
                    key: 5.2,
                    title: "Hạn dùng",
                    dataIndex: "HANDUNG",
                    width:100,
                  },
                ],
              },{
                key: 6,
                title: "",
                dataIndex:'ACTION',
                width:40,
                align:'center',
               fixed:'right'
              }
              
          ]}
          dataSource={[
            {   STT:1,
                TENHANG:'Thuốc bổ dưỡng trí não',
                MAHANG:'HH0012',
                SLCHAN:'1',
                DVCHAN:'hộp',
                DGCHAN:'250,000',
                SLLE:'10',
                DVLE:'bịt',
                DGLE:'20,500',
                TONGTIEN:'250,000',
                THANHTIEN:'250,000',
                THUCTRA:'250,000',
                SOLO:'0987876',
                HANDUNG:'20/7/2025',
                ACTION:<CloseOutlined className="text-red-500 cursor-pointer font-semibold text-base" />
            }
          ]}
        />
      </ConfigProvider>
    </>
  );
};

export default TableChiTiet;
