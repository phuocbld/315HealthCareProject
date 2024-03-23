import React from "react";
import { Tabs } from "antd";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Dịch vụ - Khám nhi",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Dịch vụ - Khám tiêm chủng",
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Dịch vụ - Khí dung",
    children: "Content of Tab Pane 3",
  },
  {
    key: "4",
    label: "Dịch vụ - Thủ thuật ",
    children: "Content of Tab Pane 3",
  },
  {
    key: "5",
    label: "Dịch vụ - Khám nhi",
    children: "Content of Tab Pane 1",
  },
  {
    key: "6",
    label: "Dịch vụ - Khám tiêm chủng",
    children: "Content of Tab Pane 2",
  },
  {
    key: "7",
    label: "Dịch vụ - Khí dung",
    children: "Content of Tab Pane 3",
  },
  {
    key: "8",
    label: "Dịch vụ - Thủ thuật ",
    children: "Content of Tab Pane 3",
  },
  {
    key: "9",
    label: "Dịch vụ - Thủ thuật ",
    children: "Content of Tab Pane 3",
  },
  {
    key: "10",
    label: "Dịch vụ - Thủ thuật ",
    children: "Content of Tab Pane 3",
  },
];
const TabsChiDinh = () => {
  return (
    <>
      <Tabs
      style={{
        height:380
      }}
        type="card"
        tabPosition="left"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </>
  );
};

export default TabsChiDinh;
