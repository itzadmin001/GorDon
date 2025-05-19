import React, { useContext, useEffect } from 'react'
import Header from '../../Components/Admin/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../../Components/Admin/SideBar'
import { MainContext } from '../../MainCon'

function AdminMain() {
    const { admin } = useContext(MainContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (admin) {
            navigate("/admin");
        } else navigate("/admin/login");

    }, [admin]);

    return (
        <>
            <div className='grid grid-cols-5 min-h-screen'>
                <SideBar />
                <div className='col-span-4'>
                    <Header />
                    <div className='p-3'>
                        <Outlet />
                    </div>
                </div>
            </div>



        </>
    )
}

export default AdminMain
