import React, { useEffect } from "react";
import { Table, ConfigProvider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
const columns = [
  {
    title: "Tên dịch vụ",
    dataIndex: "TENDV",
    width: 300,
  },
  {
    title: "Thành tiền ",
    dataIndex: "THANHTIEN",
    width: 110,
    align: "center",
  },
  {
    title: "% Giảm giá",
    dataIndex: "GIAMGIA",
    width: 110,
    align: "center",
  },
  {
    title: "Tiền giảm",
    dataIndex: "TIENGIAM",
    width: 110,
    align: "center",
  },
  {
    title: "Thanh toán",
    dataIndex: "THANHTOAN",
    width: 110,
    align: "center",
  },
  {
    title: "",
    dataIndex: "action",
    align: "center",
  },
];
const data = [];

for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    TENDV: "Khám sức khoẻ",
    THANHTIEN: "200,000",
    GIAMGIA: "10%",
    THANHTOAN: "180,000",
    TIENGIAM: "20,000",
    action: <CloseOutlined className="text-red-500 cursor-pointer" />,
  });
}

const TablePay = () => {
  return (
    <>
      <ConfigProvider
      theme={{
        token:{
          padding:5
        }
      }}
      >
        <Table
          columns={columns}
          pagination={false}
          scroll={{ y: 180 }}
          dataSource={data}
          bordered
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                <Table.Summary.Cell className="text-center" index={1}>
                  <span className="font-semibold">2,000,000</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}></Table.Summary.Cell>
                <Table.Summary.Cell className="text-center" index={3}>
                  <span className="font-semibold">200,000</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell className="text-center" index={4}>
                  <span className="font-semibold">1,800,000</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}></Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </ConfigProvider>
    </>
  );
};

export default TablePay;
