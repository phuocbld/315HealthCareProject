import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { demoModalCAction } from '../../store/actions/BranchAction'
import Layout from '../../HOCs/Layout'

const Home = () => {
  const dispatch = useDispatch()
  const demoAction = () => {
    dispatch(demoModalCAction({value:123}))
  } 
  return (
    <Layout>
      <div className='flex justify-center p-10 flex-col h-full'>
      <div className='h-5/6 text-center flex justify-center'>
      {/* <img className='bg-cover bg-no-repeat p-2 ' src="https://cdn.dribbble.com/users/1502817/screenshots/6372301/glowbabyedit6.gif" alt="coming soon" />  */}
      </div>
    </div>
    </Layout>
    
    
  )
}

export default Home