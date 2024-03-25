import React from 'react'

const Reponsive = () => {
  return (
    <div className=' w-full  h-screen absolute p-10 top-0 bg-[#EAEAEA] z-[2000] text-center justify-center flex flex-col font-mono lg:hidden'>
        <div className="text-5xl mb-5">
            <h2 className='text-black font-bold  sm:text-4xl text-[30px]   mb-5'>Đang update phiên bản dành cho</h2>
            <span className='text-[#d3bf67] sm:text-5xl text-[30px]  font-bold'> Điện Thoại và IPad</span>
        </div>
        <img className='w-auto' src="https://cdn.dribbble.com/users/1088223/screenshots/4854478/computer-settings.gif" alt="setting app" />
    </div>
  )
}

export default Reponsive