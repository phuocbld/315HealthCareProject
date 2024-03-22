import React from 'react'
import { Divider, Table } from 'antd';
import style from './style.module.css'
const columns = [
  {
    title: 'Ngày khám',
    dataIndex: 'NgayKham',
    width:100
  },
  {
    title: 'Tái khám',
    dataIndex: 'TaiKham',
    width:100
  },
  {
    title: 'Loại khám',
    dataIndex: 'LoaiKham',
    width:150
  },
  {
    title: 'Chuẩn đoán',
    dataIndex: 'ChuanDoan',
  },
  {
    title: 'Bác sĩ khám',
    dataIndex: 'BSKham',
  },
];
const data = [
  {
    key: '1',
    NgayKham: '20/03/2024',
    TaiKham: '23/03/2024',
    LoaiKham: 'Khám bệnh mới',
    ChuanDoan:'Bệnh ho,....',
    BSKham:'Nguyễn Văn A'

  },
  {
    key: '3',
    NgayKham: '20/03/2024',
    TaiKham: '23/03/2024',
    LoaiKham: 'Khám bệnh mới',
    ChuanDoan:'Bệnh ho,....',
    BSKham:'Nguyễn Văn A'

  },
  {
    key: '2',
    NgayKham: '20/03/2024',
    TaiKham: '23/03/2024',
    LoaiKham: 'Khám bệnh mới',
    ChuanDoan:'Bệnh ho,....',
    BSKham:'Nguyễn Văn A'

  },
  {
    key: '6',
    NgayKham: '20/03/2024',
    TaiKham: '23/03/2024',
    LoaiKham: 'Khám bệnh mới',
    ChuanDoan:'Bệnh ho,....',
    BSKham:'Nguyễn Văn A'

  },
  {
    key: '8',
    NgayKham: '20/03/2024',
    TaiKham: '23/03/2024',
    LoaiKham: 'Khám bệnh mới',
    ChuanDoan:'Bệnh ho,....',
    BSKham:'Nguyễn Văn A'

  },
];

const TableHistory = () => {
  return (
   <>
    <Divider ><span className="text-blue-500" >LỊCH SỬ KHÁM BỆNH</span></Divider>
    <h2> <span className='text-blue-500 font-semibold'>Bệnh nhân:</span>  Nguyễn Quốc Tài - BN00989</h2>
    <Table bordered className={style.table_history} scroll={{y:150}} columns={columns} dataSource={data} size="middle" />
   </>
  )
}

export default TableHistory