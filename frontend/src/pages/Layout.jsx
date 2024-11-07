import React from 'react'
import SideNav from '../components/layout/SideNav'
import { Outlet } from 'react-router-dom'
import TopNav from '../components/layout/TopNav'

function Layout() {
    return (
        <div className='flex'>
            <SideNav />
            <div className='w-full min-h-[100vh]  bg-backgroundSecondary'>
                <TopNav />
                <div className='px-7 py-5'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout
