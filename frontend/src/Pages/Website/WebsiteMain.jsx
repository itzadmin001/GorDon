import React from 'react'
import Navbar from '../../Components/Website/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Website/Footer'

function WebsiteMain() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default WebsiteMain
