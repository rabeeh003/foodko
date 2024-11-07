import { HomeIcon, ListIcon, UserIcon } from 'lucide-react';
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';

const SideNav = () => {
    const location = useLocation();

    const menuItems = [
        { name: "Dashboard", path: "/", icon: <HomeIcon size={20} /> },
        { name: "Order List", path: "/orders", icon: <ListIcon size={20} /> },
        { name: "Order Detail", path: "/order-detail", icon: <ListIcon size={20} /> },
        { name: "Customer", path: "/customer", icon: <UserIcon size={20} /> },
        // { name: "Analytics", path: "/analytics", icon: <ChartIcon /> },
        // { name: "Reviews", path: "/reviews", icon: <PencilIcon /> },
        // { name: "Foods", path: "/foods", icon: <PencilIcon /> },
        // { name: "Food Detail", path: "/food-detail", icon: <PencilIcon /> },
        // { name: "Customer Detail", path: "/customer-detail", icon: <UserIcon /> },
        // { name: "Calendar", path: "/calendar", icon: <CalendarIcon /> },
        // { name: "Chat", path: "/chat", icon: <ChatIcon /> },
        // { name: "Wallet", path: "/wallet", icon: <WalletIcon /> },
      ];
      
    return (
        <div className="sm:w-full sm:max-w-[18rem]">
            <input type="checkbox" id="sidebar-mobile-fixed" className="sidebar-state" />
            <label htmlFor="sidebar-mobile-fixed" className="sidebar-overlay"></label>
            <aside className="sidebar sidebar-fixed-left sidebar-mobile h-full justify-start max-sm:fixed max-sm:-translate-x-full bg-backgroundPrimary">
            <section className="sidebar-title items-center p-4 pt-7">
                <img src="logo.png" className="max-w-52 mx-auto" alt="logo image" />
            </section>
            <section className="sidebar-content">
                <nav className="menu rounded-md">
                    <section className="menu-section px-4">
                        <ul className="menu-items">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    className={`ps-5 border-l-4 ${location.pathname === item.path ? 'border-green-500' : 'border-transparent'}`}
                                >
                                    <NavLink to={item.path} className={`menu-item hover:bg-green-100 flex items-center text-xs gap-2 ${location.pathname === item.path ? 'bg-green-100 font-bold text-green-500' : ''}`}>
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </section>
                </nav>
            </section>
        </aside>
        </div>
    )
}

export default SideNav
