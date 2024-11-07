import { AlignLeft, Bell, Gift, MessageCircle, Search, Settings } from 'lucide-react'
import React from 'react'

const TopNav = () => {
    return (
        <>
            <div className='flex justify-between items-center sm:hidden bg-backgroundPrimary p-2'>
                <div className="w-fit">
                    <label htmlFor="sidebar-mobile-fixed" className="p-2"><AlignLeft /></label>
                </div>
                <img src="logo.png" className='w-20' alt="logo" />
                <div className="avatar avatar-md">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" />
                </div>
            </div>
            <div className='sm:flex justify-between items-center pt-7 px-7'>
                <div className='bg-backgroundPrimary rounded-lg border flex justify-between items-center w-full pe-3'>
                    <input class="input input-solid bg-backgroundPrimary" placeholder="Search" />
                    <Search size={18} className='text-gray-500' />
                </div>
                <div className='py-1 px-4 flex gap-3 justify-between'>
                    <span className='bg-blue-100 text-blue-500 rounded-lg p-2'>
                        <Bell size={18} />
                    </span>
                    <span className='bg-blue-100 text-blue-500 rounded-lg p-2'>
                        <MessageCircle size={18} />
                    </span>
                    <span className='bg-gray-200 text-gray-500 rounded-lg p-2'>
                        <Gift size={18} />
                    </span>
                    <span className='bg-red-100 text-red-500 rounded-lg p-2'>
                        <Settings size={18} />
                    </span>
                    <div className='flex px-3 gap-3 items-center'>
                        <div class="hidden md:flex divider divider-vertical mx-0 h-7"></div>
                        <span className='hidden md:flex text-xs gap-1'>Hello,<b> Samantha</b></span>
                        <div className="avatar avatar-sm">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="avatar" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopNav