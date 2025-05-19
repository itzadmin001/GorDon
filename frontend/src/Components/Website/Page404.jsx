import React from 'react'
import Page404 from "../../assets/Images/oops-404.avif"


function PageError() {
    return (
        <div>
            <img src={Page404} alt="" className='w-full h-[100vh]' />

        </div>
    )
}

export default PageError
