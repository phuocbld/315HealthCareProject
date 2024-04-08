import React, { useState } from "react";
import { Modal, Table, ConfigProvider, notification } from "antd";
import Button from "@mui/material/Button";
import { ExclamationCircleFilled } from "@ant-design/icons";
import * as typeAction from "../../../../store/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import ButtonImportExcel from "../ButtonImportExcel/ButtonImportExcel";
import { importListBNKhamDoan } from "../../../../store/actions/khamDoanAction";
const columns = [
  {
    title: "STT",
    dataIndex: "STT",
    key: "STT",
    width: 40,
    align: "center",
  },
  {
    title: "Tên BN",
    dataIndex: "TENBN",
    key: "TEBN",
    width: 200,
  },
  {
    title: "Giới tính",
    dataIndex: "GIOITINH",
    key: "GIOITINH",
    width: 70,
    align: "center",
  },
  {
    title: "Ngày sinh",
    dataIndex: "NGAYSINH",
    key: "NGAYSINH",
    width: 100,
  },
  {
    title: "SĐT",
    dataIndex: "SODIENTHOAI",
    key: "SODIENTHOAI",
    width: 100,
  },
  {
    title: "Tên công ty",
    dataIndex: "TENCT",
    key: "TENCT",
    width: 200,
  },
  {
    title: "MACT",
    dataIndex: "MACT",
    key: "MACT",
    width: 100,
    align: "center",
  },
];
const { confirm } = Modal;
const ModalImport = () => {
  const dispatch = useDispatch();
  const { modalImportKhamDoan } = useSelector((state) => state.modalReducer);
  const { listBNImport } = useSelector((state) => state.khamDoanReducer);
  const handleCancel = () => {
    dispatch({
      type: typeAction.CLOSE_MODAL_IMPORT_KHAM_DOAN,
    });
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, desc) => {
    api[type]({
      message: "Lỗi thêm file",
      description: desc,
      placement: "top",
    });
  };
  const showConfirm = () => {
    confirm({
      title: "Bạn có chắc muốn thêm danh sách  ?",
      icon: <ExclamationCircleFilled />,
      content: "Danh sách sẽ được tạo nếu tiếp tục",
      okText: "Tạo",
      cancelText: "Huỷ",
      onOk() {
        dispatch(importListBNKhamDoan(listBNImport));
        handleCancel();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <>
      <Modal
        footer={null}
        width={800}
        className="text-center"
        title="Import danh sách bệnh nhân"
        open={modalImportKhamDoan}
        onCancel={handleCancel}
      >
        {contextHolder}
        <div className="text-start">
            <ButtonImportExcel
              openNotificationWithIcon={openNotificationWithIcon}
            />
          <ConfigProvider
            theme={{
              token: {
                padding: 5,
              },
            }}
          >
            <Table bordered columns={columns} dataSource={listBNImport} />
          </ConfigProvider>
        </div>
        <div className="flex gap-5 justify-end mt-2">
          <Button
            disabled={listBNImport ? false : true}
            onClick={showConfirm}
            variant="contained"
            size="small"
          >
            Tạo danh sách
          </Button>
          <Button
            onClick={() => {
              handleCancel();
              dispatch({
                type: typeAction.RESET_DATA_BN_IMPORT,
              });
            }}
            variant="outlined"
            color="warning"
            size="small"
          >
            {" "}
            Huỷ
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalImport;
