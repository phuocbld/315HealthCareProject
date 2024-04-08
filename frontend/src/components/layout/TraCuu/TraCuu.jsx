import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Tabs, message, Drawer } from "antd";
import style from "./style.module.css";
import { PhoneFilled } from "@ant-design/icons";
import {
  CustomerServiceOutlined,
  RollbackOutlined,
  UnorderedListOutlined,
  FundViewOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";
import filePDF from "../../../data/Form/KQK_NGUYENVANA.pdf";
import PDFXetNghiem from "../../../data/Form/KQXN_NGUYENVANA.pdf";
import { useFormik } from "formik";
import { traCuuSchema } from "../../../schemas/traCuuSchema";
import logo from "../../../assets/images/logo/logo_ivy.png";
// Import the main component
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
const TraCuu = () => {
  const [open, setOpen] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const newPlugin = defaultLayoutPlugin()
  const handleSubmit = (value) => {
    if (value.maBN !== "1234567") {
      error();
      return;
    }
    setOpen(false);
    formik.handleReset();
  };
  const [show, setShow] = useState(false);

  const showDrawer = () => {
    setShow(true);
  };
  const onClose = () => {
    setShow(false);
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Mã hồ sơ không đúng",
    });
  };
  const formik = useFormik({
    initialValues: {
      maBN: "",
    },
    onSubmit: (value) => handleSubmit(value),
    validationSchema: traCuuSchema,
  });
  return (
    <>
      {contextHolder}
      <header className={style.header}>
        <nav>
          <ul className={style.ul_nav}>
            {[
              {
                label: <>Điểm lấy máu</>,
                url: "#",
              },
              {
                label: <>Xem kết quả xét nghiệm</>,
                url: "#",
              },
              {
                label: <>Ứng dụng dành cho đối tác</>,
                url: "#",
              },
              {
                label: <>Hỗ trợ</>,
                url: "#",
              },
            ].map((item) => (
              <li className={style.li} key={item.label}>
                <Link to={item.url}>{item.label}</Link>
              </li>
            ))}
            <li className={style.img_responsive}>
              <img src={logo} alt="#" />
            </li>
            <li className={style.phone}>
              <Link to="#">
                <PhoneFilled /> 0908.710.710
              </Link>
            </li>
            <li onClick={showDrawer} className={style.icon_responsive}>
              <UnorderedListOutlined />
            </li>
          </ul>
        </nav>
        <div className={style.container_nav_2}>
          <img src={logo} alt="#" />
          <div className={style.menu}>
            <ul>
              {[
                {
                  label: "Về IVY Health",
                  url: "#",
                },
                {
                  label: "Xét nghiệm",
                  url: "#",
                },
                {
                  label: "Kết quả xét nghiệm",
                  url: "#",
                },
                {
                  label: "Khách hàng",
                  url: "#",
                },
                {
                  label: "Hỗ trợ",
                  url: "#",
                },
              ].map((items) => (
                <li key={items.label}>
                  <Link to={items.url}>{items.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
      {open ? (
        <>
          {" "}
          <main>
            <div className={style.main}>
              <h2 className="text-xl font-semibold">Kết Quả Trực Tuyến</h2>
              <p>Dành cho phòng khám, bệnh viện và bệnh nhân</p>
              <p>
                Chào mừng đến với{" "}
                <span style={{ color: "#00afef" }}>
                  Hệ Thống Phòng Khám Đa Khoa Quốc Tế IVY Health.
                </span>{" "}
                Để tra cứu <i>Kết Quả Xét Nghiệm và kết quả khám trực tuyến</i>,
                quý khách vui lòng nhập vào hệ thống.
              </p>
            </div>
            <div className={style.container_form}>
              <form className={style.form}>
                <div className={style.input_container}>
                  <span>Mã hồ sơ</span>
                  <input
                    name="maBN"
                    value={formik.values.maBN}
                    onChange={formik.handleChange}
                    placeholder="Mã hồ sơ"
                  />
                  {formik.errors.maBN && (
                    <span className="text-red-500 text-sm">
                      {formik.errors.maBN}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={formik.handleSubmit}
                  className={style.submit}
                >
                  Xem kết quả
                </button>
              </form>
            </div>
          </main>{" "}
        </>
      ) : (
        <div className="flex w-full py-5 justify-center">
          <div className="md:w-1/2 sm:w-4/5 sm:p-0 w-full p-2 ">
            <div className="flex justify-between items-center">
              <div>
                <p className="sm:text-[16px] text-[14px]">
                  <span className="font-semibold ">Tên BN: </span>Nguyễn Văn A
                </p>
                <p className="sm:text-[16px] text-[14px]">
                  <span className="font-semibold">Mã BN: </span> 1234567
                </p>
              </div>
              <div className="cursor-pointer">
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="text-blue-500 hover:text-blue-400 sm:text-[16px] text-[14px]"
                >
                  Quay lại tra cứu <RollbackOutlined />
                </button>
              </div>
            </div>

            <Tabs
              type="card"
              items={[
                {
                  key: 1,
                  label: "Khám bệnh",
                  children: (
                    <div className="overflow-auto w-full h-fit">
                      {/* <embed
                        src={filePDF}
                        type="application/pdf"
                        width="100%"
                        height="600px"
                      /> */}
                      <div
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.3)",
                          height: "600px",
                        }}
                      >
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                          <Viewer fileUrl={filePDF} plugins={[newPlugin]}/>
                        </Worker>
                      </div>
                    </div>
                  ),
                },
                {
                  key: 2,
                  label: "Xét nghiệm",
                  children: (
                    <div className="overflow-auto w-full h-fit">
                      {/* <embed
                        src={PDFXetNghiem}
                        type="application/pdf"
                        width="100%"
                        height="600px"
                      /> */}
                      <div
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.3)",
                          height: "600px",
                        }}
                      >
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                          <Viewer fileUrl={PDFXetNghiem} plugins={[newPlugin]}/>
                        </Worker>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      )}
      <Drawer
        title={<img className="w-36" src={logo} alt="#" />}
        onClose={onClose}
        open={show}
      >
        <Menu
          style={{}}
          // defaultSelectedKeys={['1']}
          // defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          items={[
            {
              key: 1,
              label: (
                <h2 className="font-semibold text-lg text-blue-500">
                  Xem kết quả xét nghiệm
                </h2>
              ),
            },
            {
              key: 1,
              label: (
                <h2 className="font-semibold text-lg text-blue-500">
                  Điểm lấy máu
                </h2>
              ),
            },
            {
              key: 1,
              label: (
                <h2 className="font-semibold text-lg text-blue-500">
                  ứng dụng dành cho đối tác
                </h2>
              ),
            },
            {
              type: "divider",
            },
            {
              key: 1,
              label: <h2 className="font-semibold text-lg ">về IVY Health</h2>,
            },
            {
              key: 1,
              label: <h2 className="font-semibold text-lg ">Xét nghiệm</h2>,
            },
            {
              key: 1,
              label: <h2 className="font-semibold text-lg ">Khách hàng</h2>,
            },
            {
              key: 1,
              label: <h2 className="font-semibold text-lg ">Hổ trợ</h2>,
            },
          ]}
        />
      </Drawer>
      <FloatButton
        shape="circle"
        type="primary"
        style={{
          right: 94,
        }}
        icon={<CustomerServiceOutlined />}
      />
    </>
  );
};

export default TraCuu;
