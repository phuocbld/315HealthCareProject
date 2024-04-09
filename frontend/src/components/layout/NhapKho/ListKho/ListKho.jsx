import React, { useEffect,useState } from 'react'
import { Table, ConfigProvider, Input,Tooltip, Select, DatePicker, Modal } from "antd";
import {FileSearchOutlined, DownloadOutlined,ContainerOutlined,EditOutlined,DeleteOutlined,ReloadOutlined} from '@ant-design/icons'
import TableList from './TableList';
import { useDispatch } from 'react-redux';
import { getAllPhieuNhapKho } from '../../../../store/actions/NhapKhoAction';
import ModalDetail from '../Modal/ModalDetail';
const ListKho = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setShow(false)
    setIsModalOpen(false);
  };
  useEffect(()=>{
      dispatch(getAllPhieuNhapKho())
  },[])
  return (
   <>
   <div className="flex gap-5 mb-5">
        <div className="flex gap-3">
          <div>
            <label className="font-semibold">Từ ngày: </label>
            <DatePicker size="small" />
          </div>
          <div>
            <label className="font-semibold">Đến ngày: </label>
            <DatePicker size="small" />
          </div>
        </div>
        <div className="w-64 flex gap-1">
          <label htmlFor="" className="w-1/2 font-semibold">
            Chi nhánh:
          </label>
          <Select className="w-full" size="small" />
        </div>
        <div className="flex gap-3">
            <button className="bg-blue-500 text-white rounded-md px-3 font-semibold py-[1px] hover:bg-blue-400">
            <FileSearchOutlined /> Xem</button>
            <button className="bg-green-700 text-white rounded-md px-3 font-semibold py-[1px] hover:bg-green-600">
            <DownloadOutlined /> Xuất</button>
        </div>
        <div className='cursor-pointer text-orange-700 hover:bg-slate-200' onClick={()=>{
           dispatch(getAllPhieuNhapKho())
        }} >
        <ReloadOutlined className='text-lg' />
        </div>
      </div>
      <div className='border h-full'>
            <TableList handleCancel={handleCancel} showModal={showModal} />
      </div>
      <ModalDetail handleCancel={handleCancel} show={show} setShow={setShow} isModalOpen={isModalOpen}  />
   </>
  )
}

export default ListKho