import React from "react";
import Layout from "../../../HOCs/Layout";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import RoomIcon from '@mui/icons-material/Room';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Button from '@mui/material/Button';
import { staffData } from "../../../data/staff/staffData";
import { Box } from "@mui/material";
const Staff = () => {
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
      </GridToolbarContainer>
    );
  }
  const deteleUser = (id) => {
    console.log(id);
  };
  const editUser = (id) => {
    console.log(id);
  };
  return (
    <Layout>
      <div className="p-5 h-full">
        <div className=" flex justify-between">
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
        <div className="flex gap-5 justify-between" >
          <Box className="p-10 bg-white rounded-md mt-5 w-full h-[80vh]" >
            <Box>
              <Button variant="contained" >
                + Thêm nhân viên
              </Button>
            </Box>
            <DataGrid
            slots={{
              toolbar: CustomToolbar,
            }}
              rows={staffData}
              columns={[
                { field: "MANV", headerName: "Mã nhân viên", width: 130 },
                { field: "TENNV", headerName: "Tên nhân viên", width: 250 },
                { field: "NGUOITAO", headerName: "Người tạo", width: 130 },
                { field: "NGAYTAO", headerName: "Ngày tạo", width: 130 },
                { field: "GHICHU", headerName: "Ghi chú", width: 250 },
                {
                  field: "action",
                  headerName: "Hành động",
                  type: "actions",
                  width: 130 ,
                  getActions: (params) => [
                    <GridActionsCellItem
                      icon={<DeleteIcon />}
                      label="xoá"
                      onClick={() => {
                        deteleUser(params.id);
                      }}
                    />,
                    <GridActionsCellItem
                      icon={<BorderColorIcon />}
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
          <Box className=" p-10 bg-white rounded-md mt-5 w-[500px]">
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
            </Box>
        </div>
      </div>
    </Layout>
  );
};

export default Staff;
