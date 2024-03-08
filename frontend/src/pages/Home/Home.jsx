import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex justify-center p-10 flex-col h-screen'>
      <nav className='h-1/6 text-center '>
      <NavLink className='bg-blue-500 rounded-md px-5 py-2 text-lg text-white hover:bg-blue-400 duration-300 mr-5 '>
          Home
        </NavLink>
        <NavLink to={'/login'} className='bg-blue-500 rounded-md px-5 py-2 text-lg text-white hover:bg-blue-400 duration-300 mr-10'>
          Login
        </NavLink>
      </nav>
      <div className='h-5/6 text-center flex justify-center'>
      <img className='bg-cover bg-no-repeat p-2 ' src="https://cdn.dribbble.com/users/1502817/screenshots/6372301/glowbabyedit6.gif" alt="coming soon" />
      </div>
      
    </div>
    
  )
}

export default Home