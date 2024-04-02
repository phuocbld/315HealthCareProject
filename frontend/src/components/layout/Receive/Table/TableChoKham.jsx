import React from 'react'
import { Space, Table, Popover, Tag, Dropdown, Divider, ConfigProvider } from "antd";
import DropDown from "../DropDown/DropDown";
const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      width: 80,
    },
    {
      title: "Tên bệnh nhân",
      dataIndex: "TenBN",
      key: "TenBN",
    },
    {
      title: "Ngày sinh",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Phòng khám",
      dataIndex: "PK",
      key: "PK",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: 50,
    },
  ];
const TableChoKham = () => {
  return (
    <div>
        <ConfigProvider theme={{
            token:{
                padding:4
            }
        }}>
        <Table
    
      columns={columns}
      bordered
      style={{
        height: "600px",
      }}
      className="max-h-96"
      scroll={{ y: 273 }}
      pagination={{
        pageSize: 10,
      }}
      dataSource={[
        { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
        { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
        { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
        { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
        { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
        { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
        { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
        { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
        { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
        { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
        { TenBN: "Nguyễn Quốc Tài", PK: "Phòng Khám 1" },
      ].map((items) => ({
        key: items.TenBN,
        STT: "1001",
        TenBN: items.TenBN,
        date: "22/03/2024",
        PK: items.PK,
        action: (
          <>
            <DropDown />
          </>
        ),
      }))}
    />
        </ConfigProvider>
    
  </div>
  )
}

export default TableChoKham