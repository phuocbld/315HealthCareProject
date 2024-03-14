import React from 'react'
import Header from '../components/layout/Header/Header'

const Layout = (props) => {
  return (
    <>
        <Header/>
        {props.children}

    </>
  )
}

export default Layout