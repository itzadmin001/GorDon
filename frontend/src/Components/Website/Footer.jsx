import React from 'react'
import Container from './Container'
import { Link } from 'react-router-dom'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import Gordonlogo from "../../assets/Images/GorDon.png"

function Footer() {
    const menu = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "About us",
            path: "/about"
        },
        {
            name: "Services",
            path: "/service"
        },
        {
            name: "Pricing",
            path: "/pricing"
        },
        {
            name: "Our Team",
            path: "/our-team"
        }
    ]

    return (

        <section>
            <Container classes="p-4 flex flex-col gap-15 mt-10">
                <footer className='flex flex-col items-center justify-center gap-8 mt-10'>
                    {/* <h1 className='text-2xl font-semibold'>GorDon</h1> */}
                    <img src={Gordonlogo} alt="" className='w-[30vw] md:w-[20vw]' />
                    <ul className='flex items-center gap-5 md:text-xl text-sm text-gray-400'>
                        {
                            menu.map((item, i) => {
                                return (
                                    <Link to={item.path} key={i}>{item.name}</Link>
                                )
                            })
                        }
                    </ul>
                    <div className='md:flex flex-wrap items-center gap-6'>
                        <div className='flex items-center gap-2 text-sm'>
                            <MdEmail className=' text-[#CAFF33]' />
                            <h1 className='text-gray-400'>YogeshKumarSwami121212@gmail.com</h1>
                        </div>
                        <div className='flex items-center gap-2 text-sm'>
                            <FaPhoneAlt className=' text-[#CAFF33]' />
                            <h1 className='text-gray-400'>+91 9828887630</h1>
                        </div>
                        <div className='flex items-center gap-2 text-sm'>
                            <IoLocationSharp className=' text-[#CAFF33]' />
                            <h1 className='text-gray-400'>SuratGarh,(Rajasthan), india</h1>
                        </div>
                    </div>

                </footer>
                <div className='md:flex flex flex-col items-center md:justify-between justify-center md:gap-0 gap-5 mt-10'>
                    <div className='flex items-center gap-3 '>
                        <h1 className=' p-3 bg-[#CAFF33] text-gray-300  text-sm rounded-full'><FaFacebook /></h1>
                        <h1 className=' p-3 bg-[#CAFF33] text-gray-300 text-sm  rounded-full'><FaTwitter /></h1>
                        <h1 className=' p-3 bg-[#CAFF33] text-gray-300 text-sm  rounded-full'><FaLinkedin /></h1>
                    </div>
                    <div>
                        <h1 className='md:text-gray-200 text-gray-300'>Sweat & Steel All Rights Reserved</h1>
                    </div>
                    <div>
                        <h1 className='md:text-gray-200 text-gray-300'>Privacy Policy | Terms of Service</h1>
                    </div>
                </div>
            </Container>

        </section>
    )
}

export default Footer
