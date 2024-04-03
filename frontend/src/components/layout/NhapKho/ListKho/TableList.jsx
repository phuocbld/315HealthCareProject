import React, { useEffect,useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import {CloseCircleOutlined} from '@ant-design/icons'
import { useSelector } from "react-redux";

const columns = [
  { id: "maPhieu", label: "Phiếu nhập", minWidth: 100 },
  { id: "tenPhieu", label: "Tên phiếu", minWidth: 200 },
  { id: "ngayNhan", label: "Ngày nhập", minWidth: 100 },
  { id: "idKhoNhap", label: "Kho nhập", minWidth: 100 },
  { id: "soHoaDon", label: "Số hoá đơn", minWidth: 100 },
  { id: "ngayHoaDon", label: "Ngày hoá đơn", minWidth: 100 },
  { id: "nhanVienNhan", label: "Người nhập", minWidth: 100 },
  { id: "action", label: "Hành động", minWidth: 60 },
  // {
  //   id: "size",
  //   label: "Size\u00a0(km\u00b2)",
  //   minWidth: 170,
  //   align: "right",
  //   format: (value) => value.toLocaleString("en-US"),
  // },
  // {
  //   id: "density",
  //   label: "Density",
  //   minWidth: 170,
  //   align: "right",
  //   format: (value) => value.toFixed(2),
  // },
];


const TableList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { listPhieuNhap } = useSelector((state) => state.NhapKhoReducer);
      // reverse array 
      const [reverseData, setReverseData] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    if (listPhieuNhap) {
        const reversedData = [...listPhieuNhap].reverse();
        setReverseData(reversedData);
    }
}, [listPhieuNhap]);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
              ?.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.idNhapXuat}>
                    <TableCell sx={{ padding: 1 }} >
                      {row.maPhieu}
                    </TableCell>
                    <TableCell sx={{ padding: 1 }} >
                      {row.tenPhieu}
                    </TableCell>
                    <TableCell sx={{ padding: 1 }} >
                      {moment(row.ngayNhan).format('DD-MM-YYYY h:mm:ss')}
                    </TableCell>
                    <TableCell sx={{ padding: 1 }} >
                      {row.idKhoNhap}
                    </TableCell>
                    <TableCell sx={{ padding: 1 }} >
                      {row.soHoaDon}
                    </TableCell>
                    <TableCell sx={{ padding: 1 }} >
                      {moment(row.ngayHoaDon).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell sx={{ padding: 1 }} >
                      {row.nhanVienNhan}
                    </TableCell>
                    <TableCell sx={{ padding: 1 }}  >
                    <CloseCircleOutlined className="text-xl text-red-500" />
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
    </Paper>
  );
};

export default TableList;
