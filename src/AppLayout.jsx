import React from 'react'
import Header from './Components/AppLayout/Header'
import BottomNavBar from './Components/AppLayout/BottomNavBar'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className='max-w-[1000px] px-2 h-screen mx-auto overflow-hidden'>
        <div>
            <Header/>
        </div>
        <div className='overflow-auto h-screen spb-20 pb-10'>
            <Outlet/>
        </div>
        <div className='md:hidden'>
            <BottomNavBar/>
        </div>
    </div>
  )
}

export default AppLayout