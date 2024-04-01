import React, { useRef, useState } from "react";
import Layout from "../../../HOCs/Layout";
import { Input, Tabs } from "antd";
import DocViewer from "react-doc-viewer";
import { Table, ConfigProvider } from "antd";
import { Button } from "@mui/material";
import ButtonLang from "../../common/ButtonLang/ButtonLang";
import Receive from "./Satus/Receive/Receive";
import Pedding from "./Satus/Pedding/Pedding";
import Create from "./Satus/Create/Create";
import Transfer from "./Satus/Transfer/Transfer";
import { useReactToPrint } from "react-to-print";
import Phieu from "../../../data/Form/phieu.docx";
import PDFfile from "../../../data/Form/output.pdf"
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import jsPDF from 'jspdf';
import { saveAs } from "file-saver";
import FormChuyenKho from "../../../utils/FormChuyenKho";
const columns = [
  {
    key: 1,
    title: "Thông tin hàng hoá",
    children: [
      {
        title: "Tên hàng",
        dataIndex: "tenHangHoa",
        key: 1.1,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: "Mã hàng",
        dataIndex: "MaHangHoa",
        key: 1.2,
        width: 120,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: "Số lô",
        dataIndex: "MaHangHoa",
        key: 1.3,
        width: 120,
        sorter: (a, b) => a.age - b.age,
      },
    ],
  },
  {
    key: 2,
    title: "Đơn vị chẳn",
    children: [
      {
        title: "Số lượng",
        dataIndex: "tenHangHoa",
        key: 2.1,
        width: 120,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: "Đơn vi",
        dataIndex: "MaHangHoa",
        key: 2.2,
        width: 120,
        sorter: (a, b) => a.age - b.age,
      },
    ],
  },
  {
    key: 3,
    title: "Đơn vị lẻ",
    children: [
      {
        title: "Quy cách",
        dataIndex: "tenHangHoa",
        key: 3.1,
        width: 120,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: "Số lượng",
        dataIndex: "tenHangHoa",
        key: 3.2,
        width: 120,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: "Đơn vi",
        dataIndex: "MaHangHoa",
        key: 3.3,
        width: 120,
        sorter: (a, b) => a.age - b.age,
      },
    ],
  },
  {
    key: 4,
    title: "",
    dataIndex: "action",
    width: 50,
  },
];

const ChuyenKho = () => {
  const docRef = useRef(null);
  const componentRef = useRef();
  const [docx, setdocx] = useState(null);
  const handlePrinter = useReactToPrint({
    content: () => componentRef.current,
  });
 
  const saveDocx = async () => {
    handlePrinter()
    // generateDocx();
  };
  
  return (
    <Layout>
      <div className="h-full w-full p-2">
        <div
          className="h-full w-full bg-white rounded-md border"
          style={{
            boxShadow:
              "0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15)",
          }}
        >
          <div className="p-2">
            <Tabs
              items={[
                {
                  label: "Phiếu chuyển",
                  key: 1,
                  children: (
                    <>
                      <div className="flex h-[750px] ">
                        <div className=" border p-2 rounded-md w-3/4  h-full">
                          <div className="flex gap-5">
                            <div className="flex flex-col gap-4 w-2/5">
                              <div className="flex">
                                <label className="font-semibold w-1/4">
                                  Người chuyển:
                                </label>
                                <Input size="small" />
                              </div>
                              <Input
                                size="small"
                                addonBefore={<span>Tìm kiếm</span>}
                                placeholder="Tìm hoàng hoá theo mã hoặt tên"
                                allowClear
                              />
                            </div>
                            <div className="flex flex-col gap-4 w-3/5">
                              <div className="w-full flex gap-2">
                                <div className="flex w-1/2">
                                  <label className="font-semibold w-1/3">
                                    Nơi chuyển:
                                  </label>
                                  <Input size="small" />
                                </div>
                                <div className="flex w-1/2">
                                  <label className="font-semibold w-1/3">
                                    Kho xuất:
                                  </label>
                                  <Input size="small" />
                                </div>
                              </div>
                              <div className="w-full flex gap-2">
                                <div className="flex w-1/2">
                                  <label className="font-semibold w-1/3">
                                    Nơi nhận:
                                  </label>
                                  <Input size="small" />
                                </div>
                                <div className="flex w-1/2">
                                  <label className="font-semibold w-1/3">
                                    Kho nhận:
                                  </label>
                                  <Input size="small" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="rounded-lg  mt-5 border-2 h-[650px]"
                            style={{
                              boxShadow:
                                "0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15)",
                            }}
                          >
                            <ConfigProvider
                              theme={{
                                token: {
                                  padding: 3,
                                },
                              }}
                            >
                              <Table
                                bordered
                                columns={columns}
                                scroll={{
                                  y: 650,
                                }}
                              />
                            </ConfigProvider>
                          </div>
                        </div>
                        <div className=" border p-2 rounded-md w-1/4 h-full">
                          <div>
                            <div className="flex flex-col gap-4">
                              <div className="flex">
                                <label className="w-1/3 font-medium">
                                  {" "}
                                  Phiếu chuyển:
                                </label>
                                <Input value="PT00000012" size="small" />
                              </div>
                              <div className="flex">
                                <label className="w-1/3 font-medium">
                                  {" "}
                                  Ngày Chuyển:
                                </label>
                                <Input value="26/03/2024 4:23" size="small" />
                              </div>
                              <div className="flex">
                                <label className="w-1/3 font-medium">
                                  {" "}
                                  Trạng thái:
                                </label>
                                <Input value="Mới chuyển" size="small" />
                              </div>
                              <div className="flex">
                                <label className="w-1/3 font-medium">
                                  {" "}
                                  Ghi chú:
                                </label>
                                <Input.TextArea
                                  showCount
                                  maxLength={500}
                                  style={{
                                    height: 120,
                                    resize: "none",
                                  }}
                                  size="small"
                                />
                              </div>
                            </div>
                            <div
                              className="mt-6  border rounded-lg "
                              style={{
                                boxShadow:
                                  "0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15)",
                              }}
                            >
                              <ul className="flex p-2 bg-slate-100">
                                <li className="w-3/4 font-semibold border-r border-gray-300">
                                  Tên hàng
                                </li>
                                <li className="w-1/4 font-semibold text-center">
                                  Số lượng
                                </li>
                              </ul>
                              <div className=" overflow-auto border h-[430px]">
                                <ul>
                                  <li className="flex p-1 border-b">
                                    <span className="w-3/4">
                                      Thuốc AAAAAAAAAAAAAAAA
                                    </span>
                                    <span className="w-1/4 text-center">2</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="p-2 flex gap-5 w-2/3">
                                <Button
                                  size="small"
                                  color="primary"
                                  variant="contained"
                                >
                                  In phiếu
                                </Button>
                                <Button
                                  onClick={saveDocx}
                                  size="small"
                                  color="success"
                                  variant="contained"
                                >
                                  Lưu phiếu
                                </Button>
                              </div>
                              <div>
                                <span className="font-semibold text-green-700 text-xl">
                                  100,000 VNĐ
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ),
                },
                {
                  label: "Danh sách phiếu",
                  key: 2,
                  children: (
                    <Tabs
                      tabPosition="left"
                      defaultActiveKey="1"
                      type="card"
                      items={[
                        {
                          label: "Phiếu đã nhận",
                          key: 2.1,
                          children: <Receive />,
                        },
                        {
                          label: "Phiếu chờ xác nhận",
                          key: 2.2,
                          children: <Pedding />,
                        },
                        {
                          label: "Phiếu tạo",
                          key: 2.3,
                          children: <Create />,
                        },
                        {
                          label: "Phiếu đã rời",
                          key: 2.4,
                          children: <Transfer />,
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChuyenKho;
