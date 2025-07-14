import React, { useEffect } from 'react'
import SideMenu from './SideMenu'
import Navbar from './Navbar'
import { UserContext } from '../../context/userContext'
import { useContext } from 'react'
import { useState } from 'react'

const DashboardLayout = ({ children }) => {
    const {user} = useContext(UserContext)
    const [activeMenu, setActiveMenu] = useState('Dashboard')

    const handleClick = (label) => {
        setActiveMenu(label)
    }

    useEffect(() => {
        const currentPath = location.pathname
        const labelMap = {
            '/dashboard': 'Dashboard',
            '/income': 'Income',
            '/expense': 'Expense',
        }

        setActiveMenu(labelMap[currentPath] || 'Dashboard')
    }, [location.pathname])

    if (!user) return null;
  return (
    <div className=''>
        <Navbar activeMenu={activeMenu} handleClick={handleClick}/>
            <div className='flex'>
                <div className='max-[1080px]:hidden'>
                    <SideMenu activeMenu={activeMenu} handleClick={handleClick}/>
                </div>

                <div className='grow mx-5'>{children}</div>
            </div>
    </div>
  )
}

export default DashboardLayout