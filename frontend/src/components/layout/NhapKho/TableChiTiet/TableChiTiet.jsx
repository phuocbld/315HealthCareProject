import { ConfigProvider, Table,Input, InputNumber,Form } from "antd";
import {CloseOutlined} from '@ant-design/icons'
import React,{  useContext, useEffect, useRef, useState } from "react";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

const TableChiTiet = () => {
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            padding: 5,
            fontSize: 12,
          },
        }}
      >
        <Table
          className="h-full "
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          pagination={false}
          scroll={{
            y:500
          }}                
          columns={[
            {
              key: 1,
              title: "Thông tin hàng",
              
              children: [
                {
                  key: 1.1,
                  title: "STT",
                  dataIndex: "STT",
                  width:40,
                  fixed:true,
                  align:'center'
                },
                {
                  key: 1.2,
                  title: "Tên hàng",
                  dataIndex: "TENHANG",
                  width:200,
                  fixed:true,
                },
                {
                  key: 1.3,
                  title: "Mã hàng",
                  dataIndex: "MAHANG",
                  width:70,
                  fixed:true,
                },
              ],
            },
            {
              key: 2,
              title: "Đơn vị chẳn",
              children: [
                {
                  key: 2.1,
                  title: "SL",
                  dataIndex: "SLCHAN",
                  width:40,
                  align:'center',
                  editable: true,
                },
                {
                  key: 2.2,
                  title: "Đơn vị",
                  dataIndex: "DVCHAN",
                  align:'center',
                  width:60
                },
                {
                  key: 2.3,
                  title: "Đơn giá",
                  dataIndex: "DGCHAN",
                  align:'center',
                  width:80
                },
              ],
            },
            {
              key: 3,
              title: "Đơn vị lẻ",
              children: [
                {
                  key: 3.1,
                  title: "SL",
                  dataIndex: "SLLE",
                  width:40,
                  align:'center',
                },
                {
                  key: 3.2,
                  title: "Đơn vị",
                  dataIndex: "DVLE",
                  align:'center',
                  width:60
                },
                {
                  key: 3.3,
                  title: "Đơn giá",
                  dataIndex: "DGLE",
                  align:'center',
                  width:80
                },
              ],
            },{
                key:4,
                title:'Thành tiền',
                children:[{
                    key:4.1,
                    title:'Tổng tiền',
                    dataIndex:'TONGTIEN',
                    align:'center',
                    width:90
                },{
                    key:4.2,
                    title:'P. Gia công',
                    dataIndex:'PHIGIACONG',
                    width:75,
                    align:'center',
                },{
                    key:4.3,
                    title:'P. Vận chuyển',
                    dataIndex:'PHIVANCHUYEN',
                    width:89,
                    align:'center',
                },{
                    key:4.4,
                    title:'%CK trước VAT',
                    dataIndex:'CKTRUOCVAT',
                    width:95,
                    align:'center',
                },{
                    key:4.5,
                    title:'Tiền CK trước VAT',
                    dataIndex:'TIENCKTRUOCVAT',
                    width:110,
                    align:'center',
                },{
                    key:4.6,
                    title:'VAT 5%',
                    dataIndex:'VAT5%',
                    width:55,
                    align:'center'
                },{
                    key:4.7,
                    title:'VAT 8%',
                    dataIndex:'VAT8%',
                    width:55,
                    align:'center'
                },{
                    key:4.8,
                    title:'VAT 10%',
                    dataIndex:'VAT10%',
                    width:60,
                    align:'center'
                },{
                    key:4.9,
                    title:'Thành tiền',
                    dataIndex:'THANHTIEN',
                    width:90,
                    align:'center'
                },{
                    key:4.10,
                    title:'Thực trả',
                    dataIndex:'THUCTRA',
                    width:90,
                    align:'center'
                },
            ]
            },{
                key: 5,
                title: "Chi tiết",
                children: [
                  {
                    key: 5.1,
                    title: "Số lô",
                    dataIndex: "SOLO",
                    width:70,
                    align:'center'
                  },
                  {
                    key: 5.2,
                    title: "Hạn dùng",
                    dataIndex: "HANDUNG",
                    align:'center',
                    width:70,
                  },
                ],
              },{
                key: 6,
                title: "",
                dataIndex:'ACTION',
                width:40,
                align:'center',
               fixed:'right'
              }
              
          ]}
          dataSource={[
            {   STT:1,
                TENHANG:'Thuốc bổ dưỡng trí não',
                MAHANG:'HH0012',
                SLCHAN:'1',
                DVCHAN:'hộp',
                DGCHAN:'250,000',
                SLLE:'10',
                DVLE:'bịt',
                DGLE:'20,500',
                TONGTIEN:'250,000',
                THANHTIEN:'250,000',
                THUCTRA:'250,000',
                SOLO:'0987876',
                HANDUNG:'20/7/2025',
                ACTION:<CloseOutlined className="text-red-500 cursor-pointer font-semibold text-base" />
            }
          ]}
        />
      </ConfigProvider>
    </>
  );
};

export default TableChiTiet;
