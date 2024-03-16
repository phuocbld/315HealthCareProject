import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  
  return (
    <div className='w-screen h-screen flex flex-col justify-center text-center'>
      <div className='relative w-full h-[360px]'>
        <h2 className='text-[236px] font-thin'>OOPS!</h2>
        <span className='text-[28px] bg-white p-3 absolute bottom-0 -translate-x-1/2 -translate-y-3/4  '>404 - không thể tìm thấy trang này</span>
      </div >
      <div className='w-full'>
      <button onClick={()=>{navigate('/')}} className='bg-[#008CBF]  text-2xl w-fit rounded-sm p-2 text-white duration-200 hover:bg-sky-500'>ĐẾN TRANG CHỦ</button>
      </div>
      
      
      
    </div>
  )
}

export default NotFound