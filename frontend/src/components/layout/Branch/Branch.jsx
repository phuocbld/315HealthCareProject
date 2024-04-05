import React, { useRef } from 'react'
import LayoutApp from '../../../HOCs/LayoutApp'
import { Divider, Table } from 'antd';
import { Button } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
const columns = [
  {
    title: 'IDND',
    dataIndex: 'IDND',
  },
  {
    title: 'Họ và tên',
    dataIndex: 'NAME',
  },

  {
    title: 'Chi nhanh',
    dataIndex: 'CHINHANH',
  },
  {
    title: 'IP',
    dataIndex: 'IP',
  },
  {
    title: 'Thời gian đăng nhập',
    dataIndex: 'TIMELOGIN',
  },
];
const data = [
  {
    IDND: '1',
    NAME: 'John Brown',
    CHINHANH:'207b Hoàng Văn Thụ',
    TIMELOGIN: '21/03/2024',
    IP: '192.168.1.200',
  },
  {
    IDND: '2',
    NAME: 'Jim Green',
    CHINHANH:'207b Hoàng Văn Thụ',
    TIMELOGIN: '21/03/2024',
    IP: '192.168.1.200',
  },
  {
    IDND: '3',
    NAME: 'Jim Green',
    CHINHANH:'207b Hoàng Văn Thụ',
    TIMELOGIN: '21/03/2024',
    IP: '192.168.1.200',
  },
];

const Branch = () => {
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });
    // const handlePrint = () => {
    //     window.print();
    //   }
  return (
    <LayoutApp>
        <div className='p-5 bg-white h-full'>
        <Button onClick={() => {
        handlePrint(null, () => contentToPrint.current);
      }} variant='contained'>In</Button>
        <div ref={contentToPrint}>
        <Table columns={columns} dataSource={data} size="middle" />
        </div>
    
        </div>
    </LayoutApp>
  )
}

export default Branch