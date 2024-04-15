import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import dayjs from "dayjs";
import {QuestionCircleOutlined} from "@ant-design/icons"
import {Popconfirm} from 'antd'
import {
  Table,
  ConfigProvider,
  Input,
  Tooltip,
  Select,
  DatePicker,
} from "antd";
import {
  FileSearchOutlined,
  DownloadOutlined,
  ContainerOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button } from "@mui/material";
import { listBranchAction } from "../../../../../store/actions/BranchAction";
import { filterPT_createCK } from "../../../../../store/actions/chuyenKhoAction";
import { deletePhieuNhapKhoAction } from "../../../../../store/actions/NhapKhoAction";
const now = new Date();
const dateFormat = "DD-MM-YYYY";
const BranchLogin = localStorage.getItem("BRANH_LOGIN");
const columns = [
  {
    title: "STT",
    dataIndex: "STT",
    key: "STT",
    width: 40,
    align: "center",
  },
  {
    title: "Mã phiếu",
    dataIndex: "MAPHIEU",
    key: "MAPHIEU",
    width: 120,
  },
  {
    title: "Tên phiếu",
    dataIndex: "TENPHIEU",
    key: "TENPHIEU",
    width: 200,
  },
  {
    title: "Người chuyển",
    dataIndex: "NGUOICHUYEN",
    key: "NGUOICHUYEN",
  },
  {
    title: "Ngày chuyển",
    dataIndex: "NGAYNHAN",
    key: "NGAYNHAN",
    width: 120,
  },
  {
    title: "Chi nhánh chuyển",
    dataIndex: "NOICHUYEN",
    key: "NOICHUYEN",
  },
  {
    title: "Chi nhánh nhận",
    dataIndex: "NOINHAN",
    key: "NOINHAN",
  },
  {
    title: "Xác nhận xuất kho",
    dataIndex: "XACNHAN",
    key: "XACNHAN",
    width: 150,
    align: "center",
  },
  {
    title: "Hành động",
    dataIndex: "ACTION",
    key: "unit",
    width: 120,
    align: "center",
  },
];
const Create = () => {
  const { listBranch } = useSelector((state) => state.branchReducer);
  const [branch, setBranch] = useState("");
  const [since, setSince] = useState(now);
  const [toDate, SetToDate] = useState(now);
  const [idChiNhanh, setIdChiNhanh] = useState(Number(BranchLogin));
  const dispatch = useDispatch();
  const { PTCreate } = useSelector((state) => state.chuyenKhoReducer);
  const newListBranch = [...branch, { idChiNhanh: "", tenChiNhanh: "Tất cả" }];
  // set ngày lại từ ngày
  const handleSince = (name) => (date, dateString) => {
    if (name == "since") {
      setSince(dateString);
    } else {
      SetToDate(dateString);
    }
  };
  // xử lí chọn chi nhánh
  const handleSelected = (value) => {
    setIdChiNhanh(value);
  };
  // xoá phiếu chuyển kho
  const handleDelete_CK = (idPhieu) => {
    dispatch(deletePhieuNhapKhoAction(idPhieu))
    dispatch(filterPT_createCK(filter));
  }
  const filter = {
    since: moment(since, dateFormat).format(),
    toDate: moment(toDate, dateFormat).format(),
    idChiNhanh,
  };
  // xử lí lọc dưc liệu
  const handleFilter = () => {
    dispatch(filterPT_createCK(filter));
  };
  useEffect(() => {
    // dispatch(getAllPhieuNhapKho());
    dispatch(filterPT_createCK(filter));
    dispatch(listBranchAction());
  }, []);
  useEffect(() => {
    listBranch && setBranch(listBranch); // nếu có set lại list chi nhánh
  }, [listBranch]);
  return (
    <div className="h-full">
      <div className="flex gap-5">
        <div className="flex gap-3">
          <div>
            <label className="font-semibold">Từ ngày: </label>
            <DatePicker
              allowClear={false}
              defaultValue={dayjs(now)}
              maxDate={dayjs(now)}
              onChange={handleSince("since")}
              format={dateFormat}
              size="small"
            />
          </div>
          <div>
            <label className="font-semibold">Đến ngày: </label>
            <DatePicker
              allowClear={false}
              defaultValue={dayjs(now)}
              maxDate={dayjs(now)}
              minDate={dayjs(since, dateFormat)}
              onChange={handleSince("toDate")}
              format={dateFormat}
              size="small"
            />
          </div>
        </div>
        <div className="w-80 flex gap-1">
          <label htmlFor="" className="w-1/3 font-semibold">
            Chi nhánh:
          </label>
          <Select
            onChange={handleSelected}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input)
            }
            defaultValue={idChiNhanh}
            options={newListBranch?.map(({ idChiNhanh, tenChiNhanh }) => ({
              label: tenChiNhanh,
              value: idChiNhanh,
            }))}
            className="w-full"
            size="small"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white rounded-md px-3 font-semibold py-[1px] hover:bg-blue-400"
          >
            <FileSearchOutlined /> Xem
          </button>
          <button className="bg-green-700 text-white rounded-md px-3 font-semibold py-[1px] hover:bg-green-600">
            <DownloadOutlined /> Xuất
          </button>
        </div>
      </div>
      <div
        className=" h-[745px] mt-2 border rounded-md"
        style={{
          boxShadow:
            "0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15)",
        }}
      >
        <ConfigProvider
          theme={{
            token: {
              padding: 4,
              fontSize: 12,
            },
          }}
        >
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={PTCreate?.map((items,index) => ({
              STT: ++index,
              MAPHIEU: items.maPhieu,
              NGUOICHUYEN: items.tenNVXuat,
              TENPHIEU: items.tenPhieu,
              NGAYNHAN: moment(items.ngayXuat).format('DD/MM/YYYY hh:mm:ss'),
              NOICHUYEN: items.tenChiNhanhXuat,
              NOINHAN: items.tenChiNhanhNhan,
              XACNHAN: (
                <>
                  <Button
                    size="small"
                    variant="contained"
                    style={{
                      fontSize: 12,
                      padding: 2,
                    }}
                  >
                    xuất kho
                  </Button>
                </>
              ),
              ACTION: (
                <div className="flex gap-4 justify-center ">
                  <Tooltip title="Xem chi tiết" color="#108ee9">
                    <ContainerOutlined className="text-xl text-[#108ee9]  cursor-pointer" />
                  </Tooltip>
                  <Tooltip title="Sửa phiếu" color="green">
                    <EditOutlined className="text-xl text-green-700  cursor-pointer" />
                  </Tooltip>
                  <Tooltip title="Xoá phiếu" color="red">
                  <Popconfirm
                            placement="left"
                            title="Xoá phiếu chuyển kho"
                            description={`Bạn có chắc muốn xoá phiếu ${items.maPhieu}?`}
                            onConfirm={() => {
                              handleDelete_CK(items.idNhapXuat)
                            }}
                            okText="Xoá"
                            okType="danger"
                            cancelText="Huỷ"
                            icon={
                              <QuestionCircleOutlined
                                style={{
                                  color: "red",
                                }}
                              />
                            }
                          >
                    <DeleteOutlined className="text-xl text-red-500  cursor-pointer" />
                    </Popconfirm>
                  </Tooltip>
                </div>
              ),
            }))}
          />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default Create;
