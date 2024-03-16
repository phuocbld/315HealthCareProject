import React from 'react'
import style from './style.module.css'
const LoadingPage = () => {
  return (
    <div className='absolute top-0 w-full h-full bg-[#000000d5]  z-[2000] flex items-center justify-center'>
      <div className={style.loader}></div>
    </div>
    
  )
}

export default LoadingPage