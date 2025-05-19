import React, { useContext, useEffect, useState } from 'react';
import Container from './Container';
import arrow from "../../assets/Images/Group.svg";
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Gordon from "../../assets/Images/GorDon.png"
import { MainContext } from '../../MainCon';
import Woman from "../../assets/Images/3d-cartoon-woman.jpg"
import ManImg from "../../assets/Images/3d-cartoon-Man.jpg"

function Navbar() {
    const { user, SetUser, handleLogout, notify } = useContext(MainContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const Navigate = useNavigate()





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
    ];

    return (
        <Container classes="mt-10">
            <div className='absolute top-0 left-0 z-[-1]'>
                <img src={arrow} alt="" />
            </div>
            <nav className='bg-[#2e2b2b75] md:py-2 py-3 px-4 rounded-3xl flex items-center justify-between'>
                <div className='text-xl cursor-pointer'>
                    <img src={Gordon} alt="" className='w-[18vw] md:w-[5vw]' />
                    {/* <h1 className='cursor-pointer font-bold'>GorDon</h1>? */}
                </div>
                <ul className='md:flex hidden items-center gap-3'>
                    {
                        menu.map((item, i) => (
                            <Link to={item.path} key={i} className='hover:bg-[#2e2b2b8e] py-2 px-3 rounded-4xl duration-300'>{item.name}</Link>
                        ))
                    }
                </ul>
                <div className='md:flex hidden items-center gap-3 relative'>
                    {
                        user ?
                            <>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 focus:outline-none relative cursor-pointer"
                                >
                                    <div className="w-8 h-8 bg-gray-700 rounded-full">
                                        <img src={user.gender === "Female" ? Woman : ManImg} alt="" className='w-full h-full rounded-full object-top object-cover' />
                                    </div>
                                    <span className="text-gray-300">{user?.displayName}</span>
                                    <svg
                                        className={`w-4 h-4 transform ${isDropdownOpen ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute top-10 right-0 mt-2 w-32 bg-[#181717] hover:bg-[#c9ff33d3]  font-semibold rounded-md shadow-lg">
                                        <ul className="">
                                            <li>
                                                <button onClick={() => {
                                                    handleLogout()
                                                    notify("logout successfully", 1)
                                                }}
                                                    className="block w-full text-left px-4 py-2 text-gray-200 hover:text-gray-900 cursor-pointer "
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </>
                            :
                            <>

                                <Link className='hover:bg-[#2e2b2b8e] py-2 px-3 rounded-4xl duration-200 cursor-pointer' to={"/sign-up"}>Sign up</Link>
                                <Link className='duration-300 py-2 px-5 rounded-4xl bg-[#CAFF33] text-gray-900 font-semibold cursor-pointer' to={"/login"}>Login</Link>
                            </>
                    }

                </div>
                {/* Mobile Menu Icon */}
                <div className='md:hidden text-black py-2 px-5 bg-[#CAFF33] rounded-full cursor-pointer'>
                    <HiOutlineMenuAlt3
                        onClick={() => setIsMenuOpen(true)}
                    />
                </div>
            </nav>

            {/* Overlay and Mobile Menu */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}
            <div
                className={`fixed top-0 left-0 h-full w-[70%] bg-[#1C1C1C] text-white z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}
            >
                <div className='flex items-center justify-between p-4 border-b border-gray-700'>
                    <h1 className='text-xl font-bold'>Menu</h1>
                    <IoClose
                        className='text-2xl cursor-pointer'
                        onClick={() => setIsMenuOpen(false)}
                    />
                </div>
                <ul className='flex flex-col gap-4 p-4'>
                    {
                        menu.map((item, i) => (
                            <Link
                                to={item.path}
                                key={i}
                                className='hover:bg-[#2e2b2b8e] py-2 px-3 rounded-lg duration-300'
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))
                    }
                </ul>
                <div className='flex md:flex-col gap-3 p-4'>
                    {
                        user ? <Link classes='duration-300 py-2 px-5 rounded-lg bg-[#CAFF33] hover:bg-[#c9ff3387] text-gray-900 font-semibold cursor-pointer'>Logout</Link> :
                            <>
                                <Link classes='hover:bg-[#2e2b2b8e] py-2 px-3 rounded-lg duration-200 cursor-pointer' to={"/sign-up"}>Sign up</Link>
                                <Link classes='duration-300 py-2 px-5 rounded-lg bg-[#CAFF33] hover:bg-[#c9ff3387] text-gray-900 font-semibold cursor-pointer' to={"/login"}>Login</Link>

                            </>

                    }
                </div>
            </div>
        </Container>
    );
}

export default Navbar;