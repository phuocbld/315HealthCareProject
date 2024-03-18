import React from 'react'
import Header from '../components/layout/Header/Header'
import Sidenav from '../components/layout/Sidenav/Sidenav'

const Layout = (props) => {
  return (
    <>
        <Header/>
        <div className='hidden lg:block bg-[#F4F5F7]'>
        <Sidenav  children = {props.children}/> 
        </div>
             
    </>
  )
}

export default Layout