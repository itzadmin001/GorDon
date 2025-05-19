import React from 'react'
import Header from '../../Components/Member/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Member/Footer'

function MemberMain() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default MemberMain
