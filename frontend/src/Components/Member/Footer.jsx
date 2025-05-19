import React from 'react';
import { FaHome, FaRocket, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-[#1C1C1C] shadow-lg">
            <div className="flex justify-between items-center px-6 py-3 md:px-20 md:py-4">
                {/* Home Button */}
                <Link
                    to="/member"
                    className="flex flex-col items-center text-[#CAFF33] hover:text-white transition duration-300"
                >
                    <div className="flex items-center gap-2 bg-[#CAFF33] text-black px-4 py-2 rounded-full">
                        <FaHome className="text-lg" />
                        <span className="text-sm font-semibold">Home</span>
                    </div>
                </Link>

                {/* Middle Button */}
                <Link
                    to="/explore"
                    className="flex flex-col items-center text-gray-400 hover:text-white transition duration-300"
                >
                    <FaRocket className="text-xl" />
                </Link>

                {/* Profile Button */}
                <Link
                    to="/member/profile"
                    className="flex flex-col items-center text-gray-400 hover:text-white transition duration-300"
                >
                    <FaUser className="text-xl" />
                </Link>
            </div>
        </footer>
    );
}

export default Footer;