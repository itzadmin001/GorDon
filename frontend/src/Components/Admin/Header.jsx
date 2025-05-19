import React, { useContext, useState } from 'react';
import { FaSearch, FaBell, FaDatabase } from 'react-icons/fa';
import { MainContext } from '../../MainCon';

function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    return (
        <header className="bg-gray-900 text-white flex items-center justify-between px-6 py-4 shadow-md">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 w-1/3">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent text-gray-300 outline-none w-full"
                />
            </div>

            {/* Icons and Profile */}
            <div className="flex items-center space-x-6">
                {/* Icons */}
                <FaDatabase className="text-gray-400 text-lg cursor-pointer hover:text-white" />

                {/* Admin Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-2 focus:outline-none"
                    >
                        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                        <span className="text-gray-300">Admin</span>
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

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg">
                            <ul className="py-2">
                                <li>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;