import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { Tooltip,Modal,Spin } from "antd";
import { DeleteOutlined, FileDoneOutlined,ExclamationCircleFilled } from "@ant-design/icons";
import { useSelector,useDispatch } from "react-redux";
import { deletePhieuNhapKhoAction, getInfoPTNhapByIdAction } from "../../../../store/actions/NhapKhoAction";
const { confirm } = Modal;
const columns = [
  { id: "SST", label: "STT", minWidth: 20, align: "center" },
  { id: "maPhieu", label: "Phiếu nhập", minWidth: 100 },
  { id: "tenPhieu", label: "Tên phiếu", minWidth: 200 },
  { id: "ngayNhan", label: "Ngày nhập", minWidth: 100 },
  { id: "idKhoNhap", label: "Kho nhập", minWidth: 100 },
  { id: "tenChiNhanh", label: "Chi nhánh", minWidth: 100 },
  { id: "soHoaDon", label: "Số hoá đơn", minWidth: 100 },
  { id: "ngayHoaDon", label: "Ngày hoá đơn", minWidth: 100 },
  { id: "nhanVienNhan", label: "Người nhập", minWidth: 100 },
  { id: "action", label: "Hành động", minWidth: 40, align: "center" },
];

const TableList = ({handleCancel,showModal}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { listPhieuNhap,isLoading } = useSelector((state) => state.NhapKhoReducer); 
  // reverse array
  const dispatch = useDispatch()
  const [reverseData, setReverseData] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // show delete phiếu thu
  const showDeleteConfirm = (maPhieu,idPhieu) => {
    confirm({
      title: 'Bạn có chắc muốn xoá phiếu nhập kho ?',
      icon: <ExclamationCircleFilled />,
      content: `Phiếu nhập kho muốn xoá là: ${maPhieu}`,
      okText: 'Xoá',
      okType: 'danger',
      cancelText: 'Huỷ',
      onOk() {
        dispatch(deletePhieuNhapKhoAction(idPhieu))
      },
      onCancel() {
        // console.log('Cancel');
      }
    });
  };
  useEffect(() => {
    if (listPhieuNhap) {
      const reversedData = [...listPhieuNhap].reverse();
      setReverseData(reversedData);
    }
  }, [listPhieuNhap]);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", position:'relative' }}>
      <TableContainer sx={{ maxHeight: 560 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: 600,
                    padding: 5,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reverseData
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.idNhapXuat}
                  >
                    <TableCell sx={{ padding: 1, textAlign: "center" }}>
                      {++index}
                    </TableCell>
                    <TableCell sx={{ padding: 1 }}>{row.maPhieu}</TableCell>
                    <TableCell sx={{ padding: 1 }}>{row.tenPhieu}</TableCell>
                    <TableCell sx={{ padding: 1 }}>
                      {moment(row.ngayNhan).format("DD-MM-YYYY h:mm:ss")}
                    </TableCell>
                    <TableCell sx={{ padding: 1 }}>{row.tenKhoNhap}</TableCell>
                    <TableCell sx={{ padding: 1 }}>{row.soHoaDon}</TableCell>
                    <TableCell sx={{ padding: 1 }}>{row.tenChiNhanhNhan}</TableCell>
                    <TableCell sx={{ padding: 1 }}>
                      {moment(row.ngayHoaDon).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell sx={{ padding: 1 }}>{row.tenNVNhan}</TableCell>
                    <TableCell
                      sx={{
                        padding: 1,
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Tooltip title="Xoá" className="cursor-pointer" color="red">
                        {" "}
                        <DeleteOutlined onClick={()=>{showDeleteConfirm(row.maPhieu,row.idNhapXuat)}} className="text-xl text-red-500" />
                      </Tooltip>
                      <Tooltip color="blue" className="cursor-pointer" title="Xem">
                        <FileDoneOutlined onClick={()=>{
                          dispatch(getInfoPTNhapByIdAction(row.idNhapXuat))
                          showModal()}} className="text-xl text-blue-500" />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={listPhieuNhap?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {isLoading && <div style={{
        backgroundColor:'rgba(0, 0, 0, 0.05)',
      }} className="absolute w-full h-full  top-0 flex items-center justify-center">
      <Spin size="large"/>
      </div>}
      
    </Paper>
  );
};

export default TableList;
