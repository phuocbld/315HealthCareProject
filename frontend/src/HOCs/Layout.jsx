import React from 'react'
import Header from '../components/layout/Header/Header'
import Sidenav from '../components/layout/Sidenav/Sidenav'

const Layout = (props) => {
  return (
    <>
        <Header/>
        <Sidenav children = {props.children}/>
    </>
  )
}

export default Layout