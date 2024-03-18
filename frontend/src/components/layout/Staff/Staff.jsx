import React from "react";
import Layout from "../../../HOCs/Layout";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import RoomIcon from "@mui/icons-material/Room";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AddIcon from "@mui/icons-material/Add";
import GetAppIcon from "@mui/icons-material/GetApp";
import Button from "@mui/material/Button";
import { staffData } from "../../../data/staff/staffData";
import { Box } from "@mui/material";
const Staff = () => {
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const deteleUser = (id) => {
    console.log(id);
  };
  const editUser = (id) => {
    console.log(id);
  };
  return (
    <Layout>
      <div className="p-5 h-full w-full ">
        <div className=" flex justify-between pb-5">
          <h2 className="text-lg font-medium ">Nhân viên</h2>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link underline="hover" color="inherit">
                Hệ Thống
              </Link>
              <Typography color="text.primary">Nhân viên</Typography>
            </Breadcrumbs>
          </div>
        </div>
        <div className="flex w-full gap-5 justify-between max-h-[90%]">
          <Box className=" p-5 bg-white rounded-md w-full">
            <Box sx={{ paddingBottom: 1, display:'flex' , justifyContent:'space-between', alignItems:'center' }}>
              <div class="flex items-center justify-center">
                <div class="rounded-lg ">
                  <div class="flex ">
                    <div class="flex w-8 bg-[#e8e8e8]  items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-white p-5 px-4">
                      <svg
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        class="pointer-events-none absolute w-5 fill-gray-500 transition"
                      >
                        <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      class="w-full max-w-[160px]  bg-[#e8e8e8] pl-2 text-base font-normal outline-0"
                      placeholder="Nhập tên tìm kiếm"
                      id=""
                    />
                    <input
                      type="button"
                      value="Search"
                      class="bg-blue-500 p-2 cursor-pointer rounded-tr-lg rounded-br-lg text-white font-normal hover:bg-blue-800 transition-colors"
                    />
                  </div>
                </div>
              </div>
              <div>
                <Button size="small" color="success">
                  <GetAppIcon /> Xuất exel
                </Button>
                <Button size="small" variant="contained">
                  {" "}
                  <AddIcon />
                  Thêm nhân viên
                </Button>
              </div>
            </Box>
            <DataGrid
              
              sx={{ maxHeight: "90%", maxWidth:'1200px'}}
              rows={staffData}
              columns={[
                { field: "MANV", headerName: "Mã nhân viên", width: 130 },
                { field: "TENNV", headerName: "Tên nhân viên", width: 250 },
                { field: "NGUOITAO", headerName: "Người tạo", width: 130 },
                { field: "NGAYTAO", headerName: "Ngày tạo", width: 130 },
                { field: "SDT", headerName: "Số điện thoại", width: 130 },
                { field: "EMAIL", headerName: "email", width: 130 },
                { field: "GHICHU", headerName: "Ghi chú", width: 250 },
                {
                  field: "action",
                  headerName: "Hành động",
                  type: "actions",
                  width: 130,
                  getActions: (params) => [
                    <GridActionsCellItem
                      icon={<DeleteIcon color="error" />}
                      label="xoá"
                      onClick={() => {
                        deteleUser(params.id);
                      }}
                    />,
                    <GridActionsCellItem
                      icon={<BorderColorIcon color="success" />}
                      label="Sửa"
                      onClick={() => {
                        editUser(params.id);
                      }}
                    />,
                  ],
                },
              ]}
            />
          </Box>
        </div>
        {/* <Box className=" p-10 bg-white rounded-md mt-5 w-[500px]">
              <div className="flex items-center gap-2">
                <img
                  className="w-20 h-20  rounded-full border-2 border-gray-200"
                  src="data:image/png;base64,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"
                  alt="#"
                />
                <div className="">
                  <h2 className="font-medium">Nguyễn Quốc Tài</h2>
                  <p className="text-gray-500">Chức danh: IT</p>
                </div>
              </div>
              <ul className="my-2 flex flex-col gap-3">
                <li className="text-gray-500"><LocalPhoneIcon fontSize="small" /> SDT: <span className="text-black"> 0908315315</span> </li>
                <li className="text-gray-500"><EmailIcon fontSize="small" /> Email: <span className="text-black">nguyen@gmail.com</span> </li>
                <li className="text-gray-500"><RoomIcon fontSize="small"/> Address: <span className="text-black">207B Hoàng văn Thụ, Phú nhuận, HCM</span> </li>
              </ul>
              <span className="font-medium text-lg border-t-2 border-gray-300 mt-2 block">Thông tin thêm</span>
              <ul>
                <li>Mã nhân viên: <span>NV0001</span></li>
                <li>Ngày tạo: 12/4/5</li>
                <li>Người tạo: it-nqtai</li>
                <li>Ghi chú: được cấp phép bala bla bal</li>
              </ul>
              <div className="my-2 flex gap-5">
              <Button variant="contained">Chỉnh sửa</Button>
              <Button variant="outlined">Xoá</Button>
              </div>
            </Box> */}

      </div>
    </Layout>
  );
};

export default Staff;
