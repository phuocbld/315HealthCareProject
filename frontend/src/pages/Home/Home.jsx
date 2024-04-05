import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { demoModalCAction } from '../../store/actions/BranchAction'
import LayoutApp from '../../HOCs/LayoutApp'
import Dashboard from '../../components/layout/Dashboard/Dashboard'

const Home = () => {
  const dispatch = useDispatch()
  const {infoUser} = useSelector(state=> state.userReducer)
  const demoAction = () => {
    dispatch(demoModalCAction({value:123}))
  } 
  return (
    <LayoutApp>
     {infoUser?.tenNhom === 'Ban Giám đốc' ? <Dashboard/> :''}
    </LayoutApp>
    
    
  )
}

export default Home