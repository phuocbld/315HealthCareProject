import React, { useEffect } from "react";
import LayoutApp from "../../../HOCs/LayoutApp";
import { Space, Table, Tag,Tooltip } from "antd";
import { Button } from "@mui/material";
import { DeleteOutlined, EditOutlined,ReloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getListCtyKhamDoan } from "../../../store/actions/khamDoanAction";
const columns = [
  {
    title: "Mã Cty",
    dataIndex: "mact",
    key: "mact",
  },
  {
    title: "Tên Cty",
    dataIndex: "tenct",
    key: "tenct",
  },
  {
    title: "Địa chỉ",
    dataIndex: "diachi",
    key: "diachi",
  },
  {
    title: "Điện Thoại",
    dataIndex: "dienthoai",
    key: "dienthoai",
  },
  {
    title: "Fax",
    dataIndex: "fax",
    key: "fax",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Website",
    dataIndex: "website",
    key: "website",
  },
  {
    title: "Ghi chú",
    dataIndex: "ghichu",
    key: "ghichu",
  },
  {
    title: "Hành động",
    key: "action",
    dataIndex: "action",
    width: 120,
    align: "center",
  },
];

const CTyKhamDoan = () => {
  const dispatch = useDispatch();
  const { listCTy } = useSelector((state) => state.khamDoanReducer);
  useEffect(() => {
    dispatch(getListCtyKhamDoan());
  }, []);
  return (
    <LayoutApp>
      <div className="p-5">
        <div className="mb-5">
          <Button size="small" variant="contained">
            Thêm Công ty
          </Button>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={listCTy?.map(
              ({
                idct,
                mact,
                tenct,
                diachi,
                dienthoai,
                fax,
                email,
                webside,
                ghichu,
              }) => ({
                key: idct,
                mact,
                tenct,
                diachi,
                dienthoai,
                fax,
                email,
                webside,
                ghichu,
                action:<ul className="flex gap-2 justify-around gap-2 ">
                <li className="text-lg text-red-500">
                  <Tooltip
                    title="Xóa"
                    placement="top"
                    className="cursor-pointer"
                    color="red"
                  >
                    <DeleteOutlined />
                  </Tooltip>
                </li>
                <li className="text-lg text-green-500">
                  <Tooltip
                    title="sửa"
                    className="cursor-pointer"
                    placement="top"
                    color="green"
                  >
                    <EditOutlined />
                  </Tooltip>
                </li>
              </ul>
              })
            )}
          />
        </div>
      </div>
    </LayoutApp>
  );
};

export default CTyKhamDoan;
