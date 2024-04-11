import React, { useEffect, useState } from "react";
import {
  Table,
  ConfigProvider,
  Input,
  Tooltip,
  Select,
  DatePicker,
  Modal,
} from "antd";
import { useSelector } from "react-redux";
import {
  FileSearchOutlined,
  DownloadOutlined,
  ContainerOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import TableList from "./TableList";
import { useDispatch } from "react-redux";
import { filterPTNhapKhoAction, getAllPhieuNhapKho } from "../../../../store/actions/NhapKhoAction";
import ModalDetail from "../Modal/ModalDetail";
import moment from "moment";
import dayjs from "dayjs";
import { listBranchAction } from "../../../../store/actions/BranchAction";
const now = new Date();
const dateFormat = "DD-MM-YYYY";
const BranchLogin = localStorage.getItem("BRANH_LOGIN");
const ListKho = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { listBranch } = useSelector((state) => state.branchReducer);
  const [branch,setBranch] =useState('')
  const [since, setSince] = useState(now);
  const [toDate, SetToDate] = useState(now);
  const [idChiNhanh, setIdChiNhanh] = useState(Number(BranchLogin));
  const [show, setShow] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const newListBranch = [
    ...branch,
    { idChiNhanh: "", tenChiNhanh: "Tất cả" },
  ];
  const handleCancel = () => {
    setShow(false);
    setIsModalOpen(false);
  };
  // set ngày lại từ ngày
  const handleSince = (name) => (date, dateString) => {
    if (name == "since") {
      setSince(dateString);
    } else {
      SetToDate(dateString);
    }
  };
  const filter = {
    since:moment(since,dateFormat).format(),
    toDate:moment(toDate,dateFormat).format(),
    idChiNhanh,
  }; 
  // xử lí chọn chi nhánh
  const handleSelected = (value) => {
    setIdChiNhanh(value);
  };
  // xử lí lọc dưc liệu
  const handleFilter = () => {
    dispatch(filterPTNhapKhoAction(filter))
  };
  useEffect(() => {
    // dispatch(getAllPhieuNhapKho());
    dispatch(filterPTNhapKhoAction(filter))
    dispatch(listBranchAction());
  }, []);
  // set lại mãng dữ liệu nếu có
  useEffect(()=>{
    listBranch && setBranch(listBranch) // nếu có set lại list chi nhánh
  },[listBranch])
  return (
    <>
      <div className="flex gap-5 mb-5">
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
        <div
          className="cursor-pointer text-orange-700 hover:bg-slate-200"
          onClick={() => {
            dispatch(getAllPhieuNhapKho());
          }}
        >
          <ReloadOutlined className="text-lg" />
        </div>
      </div>
      <div className="border h-full">
        <TableList handleCancel={handleCancel} showModal={showModal} />
      </div>
      <ModalDetail
        handleCancel={handleCancel}
        show={show}
        setShow={setShow}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default ListKho;
