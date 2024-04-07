import React, { useEffect, useState,useRef } from "react";
import Highlighter from 'react-highlight-words';
import LayoutApp from "../../../HOCs/LayoutApp";
import {
  Input,
  Button,
  Table,
  ConfigProvider,
  Tooltip,
  Tag,
  Popconfirm,
  Space,
  Modal
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  ExclamationCircleFilled
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import ModalAdd from "./ModalAddBenhNhan/ModalAdd";
import * as typeAction from "../../../store/constants/constants";
import {
  deleteBNKhamDoanById,
  getAllBNKhamDoan,
  getListCtyKhamDoan,
  infoBNKhamDoanAction,
  sendSMSKhamDoanAction,
} from "../../../store/actions/khamDoanAction";
import moment from "moment";
import ModalImport from "./ModalInponrt/ModalImport";
import ModalEditBenhNham from "./ModalEditBenhNhan/ModalEditBenhNham";
const { confirm } = Modal;

const KhachKhamDoan = () => {
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { listBNImport, ListBNKhamDoan,listSMS,isLoadingBN } = useSelector(
    (state) => state.khamDoanReducer
  );
  const onSelectChange = (newSelectedRowKeys,infoBN) => {
   dispatch({
    type:typeAction.ADD_LIST_INFO_SMS,
    payload:infoBN
   })
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={'Nhập tìm kiếm'}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Xoá
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const handlDeleteBenhNhan = (idbn) => {
    dispatch(deleteBNKhamDoanById(idbn));
  };
  const handleAddKhamDoan = () => {
    dispatch({
      type: typeAction.OPEN_ADD_KHAM_DOAN,
    });
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const showConfirm = () => {
    confirm({
      title: 'Bạn có muốn gửi sms hay không ?',
      icon: <ExclamationCircleFilled />,
      content: `số lượng bệnh nhân gửi của bạn là ${listSMS.length} bệnh nhân !`,
      okText:'Gửi SMS',
      cancelText:'Huỷ bỏ',
      onOk() {
       dispatch(sendSMSKhamDoanAction(listSMS))
       setSelectedRowKeys([]);
      },
      onCancel() {
        setSelectedRowKeys([]);
      },
    });
  };
  useEffect(() => {
    dispatch(getAllBNKhamDoan());
    dispatch(getListCtyKhamDoan());
  }, []);
  useEffect(()=>{
    console.log(listSMS);
  },[listSMS])
  const columns = [
    {
      title: "Mã BN",
      dataIndex: "MABN",
      key: "MABN",
      width: 100,
      ...getColumnSearchProps('MABN'),
    },
    {
      title: "Tên BN",
      dataIndex: "TENBN",
      key: "TENBN",
      width: 200,
      ...getColumnSearchProps('TENBN'),
    },
    {
      title: "Giới tính",
      dataIndex: "GIOITINH",
      key: "GIOITINH",
      width: 90,
      align: "center",
      ...getColumnSearchProps('GIOITINH'),
    },
    {
      title: "Ngày sinh",
      dataIndex: "NGAYSINH",
      key: "NGAYSINH",
      width: 100,
      align: "center",
    },
    {
      title: "SĐT",
      dataIndex: "SODIENTHOAI",
      key: "SODIENTHOAI",
      width: 100,
      align: "center",
      ...getColumnSearchProps('SODIENTHOAI'),
    },
    {
      title: "Trạng thái khám",
      dataIndex: "TTKHAM",
      key: "TTKHAM",
      width: 180,
    },
    {
      title: "Tên công ty",
      dataIndex: "TENCTY",
      key: "TENCTY",
      width: 250,
      ...getColumnSearchProps('TENCTY'),
    },
    {
      title: "KQ xét Nghiệm",
      dataIndex: "KQXN",
      key: "KQXN",
      width: 130,
      align: "center",
      filters: [
        {
          text: "Chưa có",
          value: "Chưa có",
        },
        {
          text: "Hoàn thành",
          value: "Hoàn thành",
        },
      ],
      onFilter: (value, record) =>
        record.KQXN.props.children.indexOf(value) === 0,
    },
    {
      title: "KQ khám",
      dataIndex: "KQK",
      key: "LQK",
      width: 100,
      align: "center",
      filters: [
        {
          text: "Chưa có",
          value: "Chưa có",
        },
        {
          text: "Hoàn thành",
          value: "Hoàn thành",
        },
      ],
      onFilter: (value, record) =>
        record.KQXN.props.children.indexOf(value) === 0,
    },    {
      title: "Người cập nhập KQ",
      dataIndex: "NGUOIKQ",
      key: "NGUOIKQ",
      width: 150,
      align: "center",

    },    {
      title: "Ngày cập nhập KQ",
      dataIndex: "NGAYKQ",
      key: "NGAYKQ",
      width: 150,
      align: "center",
    },
    {
      title: "SMS",
      dataIndex: "SMS",
      key: "SMS",
      width: 120,
      align: "center",
      filters: [
        {
          text: "Chưa gửi",
          value: "Chưa gửi",
        },
        {
          text: "Gửi thành công",
          value: "Gửi thành công",
        },
        {
          text: "Gửi thất bại",
          value: "Gửi thất bại",
        },
      ],
      onFilter: (value, record) => record.SMS.props.children.indexOf(value) === 0,
    },
    {
      title: "Người gửi SMS",
      dataIndex: "NGUOIGUISNS",
      key: "NGUOIGUISNS",
      width: 150,
    },
    {
      title: "Ngày gửi SMS",
      dataIndex: "NGAYGUISMS",
      key: "NGAYGUISMS",
      width: 120,
      align: "center",
    },
    {
      title: "Người tạo",
      dataIndex: "NGUOITAO",
      key: "NGUOITAO",
      width: 150,
    },
    {
      title: "Ngày tạo",
      dataIndex: "NGAYTAO",
      key: "NGAYTAO",
      width: 150,
      align: "center",
    },
    {
      title: "Ghi chú",
      dataIndex: "GHICHU",
      key: "GHICHU",
      width: 200,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: 90,
      fixed: "right",
    },
  ];
  return (
    <LayoutApp>
      <div className="p-2">
        <div className="flex justify-between">
          <div className="flex gap-5">
            <Input.Search
              className="w-72"
              placeholder="Tìm kiếm tên bệnh nhân"
            />
            <Button
              onClick={() => {
                dispatch(getAllBNKhamDoan());
              }}
              type="primary"
              icon={<ReloadOutlined />}
            >
              {" "}
              Tải lại
            </Button>
          </div>
          <div className="flex items-center gap-5">
          {selectedRowKeys.length !== 0 ? <p>Đã chọn {selectedRowKeys.length} </p> :'' }
            <Button
            disabled={selectedRowKeys.length !== 0 ? false : true}
              onClick={showConfirm}
              className="bg-orange-600 hover:bg-orange-500 text-white"
            >
              Gửi SMS
            </Button>
            <Button
              onClick={handleAddKhamDoan}
              className="bg-green-700 hover:bg-green-500 text-white"
            >
              Thêm bệnh nhân
            </Button>
            <Button
              onClick={() => {
                dispatch({
                  type: typeAction.OPEN_MODAL_IMPORT_KHAM_DOAN,
                });
              }}
              className="bg-blue-500 hover:bg-blue-400 text-white"
            >
              import
            </Button>
          </div>
        </div>
        <div className="mt-5">
          <ConfigProvider
            theme={{
              token: {
                padding: 5,
              },
            }}
          >
            <Table
              loading={isLoadingBN}
              pagination={false}
              bordered
              rowSelection={rowSelection}
              className="mb-5"
              scroll={{
                y: 600,
                x: 1500,
              }}
              dataSource={ListBNKhamDoan?.map(
                ({
                  trangthaisms,
                  idbn,
                  mabn,
                  tenbn,
                  gioitinh,
                  ngaysinh,
                  sodienthoai,
                  ghichu,
                  trangthai,
                  tenct,
                  trangthaikham,
                  kqxn,
                  kqkham,
                  daguisms,
                  ngaykq,
                  nguoikq,
                  ngaytao,
                  nguoitao,
                  ngayguisms,
                  nguoiguisms,
                }) => ({
                  key: idbn,
                  MABN: mabn,
                  TENBN: tenbn,
                  GIOITINH: gioitinh,
                  NGAYSINH: ngaysinh && moment(ngaysinh).format("DD/MM/YYYY"),
                  SODIENTHOAI: sodienthoai,
                  TTKHAM: trangthai,
                  KQXN: !kqxn ? (
                    <Tag color="volcano">Chưa có </Tag>
                  ) : (
                    <Tag color="green">Hoàn thành</Tag>
                  ),
                  KQK: !kqkham ? (
                    <Tag color="volcano">Chưa có </Tag>
                  ) : (
                    <Tag color="green">Hoàn thành</Tag>
                  ),
                  TENCTY: tenct,
                  NGUOIGUISNS: nguoiguisms,
                  NGAYGUISMS: ngayguisms,
                  NGUOITAO: nguoitao,
                  NGAYTAO: ngaytao && moment(ngaytao).format("DD/MM/YY hh:mm:ss"),
                  NGAYKQ: ngaykq && moment(ngaykq).format("DD/MM/YY hh:mm:ss"),
                  NGUOIKQ:nguoikq,
                  GHICHU: ghichu,
                  SMS:
                    trangthaisms === 1 ? (
                      <Tag>Chưa gửi</Tag>
                    ) : trangthaisms === 2 ? (
                      <Tag color="success">Gửi thành công</Tag>
                    ) : (
                      <Tag color="error">Gửi thất bại</Tag>
                    ),
                  action: (
                    <ul className="flex gap-2 justify-around gap-2 ">
                      <li className="text-lg text-red-500">
                        <Tooltip
                          title="Xóa"
                          placement="top"
                          className="cursor-pointer"
                          color="red"
                        >
                          <Popconfirm
                            placement="left"
                            title="Xoá bệnh nhân"
                            description="Bạn có chắc xoá bệnh nhân này không ?"
                            onConfirm={() => {
                              handlDeleteBenhNhan(idbn);
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
                            <DeleteOutlined />
                          </Popconfirm>
                        </Tooltip>
                      </li>
                      <li
                        onClick={() => {
                          dispatch(infoBNKhamDoanAction(idbn));
                          dispatch({
                            type: typeAction.OPEN_MODAL_EDIT_BN_KHAM_DOAN,
                          });
                        }}
                        className="text-lg text-green-500"
                      >
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
                  ),
                })
              )}
              columns={columns}
            />
          </ConfigProvider>
        </div>
      </div>
      <ModalAdd />
      <ModalImport />
      <ModalEditBenhNham />
    </LayoutApp>
  );
};

export default KhachKhamDoan;
