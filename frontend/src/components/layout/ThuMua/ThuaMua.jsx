import React, { useEffect, useState  } from "react";
import LayoutApp from "../../../HOCs/LayoutApp";
import {
  ConfigProvider,
  Input,
  Select,
  Table,
  Tooltip,
  Popconfirm,
} from "antd";
import {
  ContainerOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getListThuocVT_Action } from "../../../store/actions/thuocVTAction";
import { formatNumberVND } from "../../../utils/formatNumberVND";
import ModalAdd from "./Modal/ModalAdd";
const columns = [
  {
    title: "STT",
    dataIndex: "STT",
    width: 40,
    align: "center",
  },
  {
    title: "Mã thuốc",
    dataIndex: "maThuoc",
  },
  {
    title: "Tên thuốc",
    dataIndex: "tenBietDuoc",
    width: 250,
  },
  {
    title: "Hoạt chất",
    dataIndex: "tenHoatChat",
    width: 400,
  },
  {
    title: "Đơn vị tính",
    dataIndex: "dvt",
  },

  {
    title: "Quy cách",
    dataIndex: "quyCach",
  },
  {
    title: "Đóng gói",
    dataIndex: "quyCachDongGoi",
    width: 80,
    align: "center",
  },
  {
    title: "Đường dùng",
    dataIndex: "duongDung",
  },
  {
    title: "Số đăng kí",
    dataIndex: "maSoDangKy",
  },
  {
    title: "Giá bán",
    dataIndex: "giaBan",
    width: 80,
  },
  {
    title: "Gia mua",
    dataIndex: "giaMua",
    width: 80,
  },
  {
    title: "Hành động",
    dataIndex: "action",
    width: 100,
    fixed: "right",
  },
];
const ThuaMua = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { listThuocVT } = useSelector((state) => state.thuocVTReducer);
  useEffect(() => {
    dispatch(getListThuocVT_Action());
  }, []);
  return (
    <LayoutApp>
      <div className="p-5">
        <div className="flex gap-5">
          <div>
            <Tooltip title='Thêm' color="green">
            <button
            onClick={showModal}
              class="group cursor-pointer outline-none hover:rotate-90 duration-300"
            >
              <svg
                class="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
                viewBox="0 0 24 24"
                height="25px"
                width="25px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-width="1.5"
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                ></path>
                <path stroke-width="1.5" d="M8 12H16"></path>
                <path stroke-width="1.5" d="M12 16V8"></path>
              </svg>
            </button>
            </Tooltip>
           
          </div>
          <div className="w-80 flex gap-1">
            <label className="font-semibold">Loại: </label>
            <Select className="w-full" size="small" />
          </div>
          <div className="font-semibold w-80 flex gap-1">
            <label>Nhóm: </label>
            <Select className="w-full" size="small" />
          </div>
        </div>
        <div className="mt-2">
          <ConfigProvider
            theme={{
              token: {
                padding: 5,
                fontSize: 14,
              },
            }}
          >
            <Table
              pagination={{
                defaultPageSize: 20,
              }}
              bordered
              scroll={{
                x: 1500,
              }}
              columns={columns}
              dataSource={listThuocVT?.map(
                (
                  {
                    maThuoc,
                    tenBietDuoc,
                    tenHoatChat,
                    dvt,
                    quyCach,
                    quyCachDongGoi,
                    giaBan,
                    giaMua,
                    maSoDangKy,
                    duongDung,
                  },
                  index
                ) => ({
                  STT: ++index,
                  maThuoc,
                  tenBietDuoc,
                  tenHoatChat,
                  dvt,
                  quyCach,
                  quyCachDongGoi,
                  giaBan: formatNumberVND(giaBan),
                  giaMua: formatNumberVND(giaMua),
                  maSoDangKy,
                  duongDung,
                  action: (
                    <ul className="flex justify-around">
                      <li>
                        <Tooltip title="Xem chi tiết" color="#108ee9">
                          <ContainerOutlined className="text-xl text-[#108ee9]  cursor-pointer" />
                        </Tooltip>
                      </li>
                      <li>
                        {" "}
                        <Tooltip title="Xoá phiếu" color="red">
                          <Popconfirm
                            placement="left"
                            title="Xoá thuốc vật tư"
                            description={`Bạn có chắc muốn xoá loại mã ${maThuoc}?`}
                            onConfirm={() => {
                              // handleDelete_CK(items.idNhapXuat)
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
                      </li>
                    </ul>
                  ),
                })
              )}
            />
          </ConfigProvider>
        </div>
      </div>
      <ModalAdd isModalOpen={isModalOpen} handleCancel={handleCancel}/>
    </LayoutApp>
  );
};

export default ThuaMua;
