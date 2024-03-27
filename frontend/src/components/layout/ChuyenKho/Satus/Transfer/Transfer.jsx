import React from 'react'
import { Table, ConfigProvider, Input, Select, DatePicker,Tooltip } from "antd";
import {FileSearchOutlined, DownloadOutlined,ContainerOutlined} from '@ant-design/icons'
const columns = [
    {
      title: "Mã phiếu",
      dataIndex: "MAPHIEU",
      key: "MAPHIEU",
      width: 120,
    },
    {
      title: "Người nhận",
      dataIndex: "NGUOINHAN",
      key: "NGUOINHAN",
    },
    {
      title: "Ngày Nhận",
      dataIndex: "NGAYNHAN",
      key: "NGAYNHAN",
      width: 120,
    },
    {
      title: "Kho nhận",
      dataIndex: "KHONHAN",
      key: "KHONHAN",
    },
    {
      title: "Người chuyển",
      dataIndex: "NGUOICHUYEN",
      key: "NGUOICHUYEN",
    },
    {
      title: "Ngày chuyển",
      dataIndex: "NGAYCHUYEN",
      key: "NGAYCHUYEN",
      width: 120,
    },
    {
      title: "Kho chuyển",
      dataIndex: "KHOCHUYEN",
      key: "KHOCHUYEN",
    },
    {
      title: "Trạng thái",
      dataIndex: "TRANGTHAI",
      key: "TRANGTHAI",
      width: 150,
      align:'center'
    },
    {
      title: "Hành động",
      dataIndex: "ACTION",
      key: "unit",
      width: 120,
      align: "center",
    },
  ];
  const data = [
    {
      MAPHIEU: "PT000021",
      NGUOINHAN: "ds.Nguyen Quoc Tài",
      NGAYNHAN: "20/23/2024 11:42",
      KHONHAN: "kho duoc",
      NGUOICHUYEN: "Nguyễn Văn A",
      NGAYCHUYEN: "27/03/2024 11:56",
      KHOCHUYEN: "kho Tổng",
      TRANGTHAI: <span className='text-blue-500 border border-blue-500 font-semibold p-[2px] rounded-lg'>Đang chờ xác nhận</span>,
      ACTION: <Tooltip title='Xem chi tiết' color="#108ee9">
      <ContainerOutlined className="text-xl text-[#108ee9]  cursor-pointer" />
</Tooltip>,
    },
  ];
const Transfer = () => {
  return (
    <div className="h-full">
      <div className="flex gap-5">
        <div className="flex gap-3">
          <div>
            <label className="font-semibold">Từ ngày: </label>
            <DatePicker size="small" />
          </div>
          <div>
            <label className="font-semibold">Đến ngày: </label>
            <DatePicker size="small" />
          </div>
        </div>
        <div className="w-64 flex gap-1">
          <label htmlFor="" className="w-1/2 font-semibold">
            Chi nhánh:
          </label>
          <Select className="w-full" size="small" />
        </div>
        <div className="flex gap-3">
            <button className="bg-blue-500 text-white rounded-md px-3 font-semibold py-[1px] hover:bg-blue-400">
            <FileSearchOutlined /> Xem</button>
            <button className="bg-green-700 text-white rounded-md px-3 font-semibold py-[1px] hover:bg-green-600">
            <DownloadOutlined /> Xuất</button>
        </div>
      </div>
      <div className=" h-[745px] mt-2 border rounded-md" style={{
        boxShadow:"0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15)"
      }}>
      <ConfigProvider
        theme={{
          token: {
            padding: 4,
            fontSize: 12,
          },
        }}
      >
        <Table pagination={false} columns={columns} dataSource={data} />
      </ConfigProvider>
      </div>
      
    </div>
  )
}

export default Transfer