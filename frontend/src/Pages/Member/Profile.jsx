import React, { useState } from 'react';
import { FaEdit, FaCamera, FaSignOutAlt } from 'react-icons/fa';

function Profile() {
    const [showModal, setShowModal] = useState(false);
    const [firstName, setFirstName] = useState('Muhammadbotir');
    const [lastName, setLastName] = useState('Qobilov');
    const userId = '12234565';

    return (
        <div className=" min-h-screen flex flex-col items-center py-10 px-4">
            {/* Profile Header */}
            <div className="w-full max-w-[500px] p-6 rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    {/* Profile Image */}
                    <div
                        className="w-24 h-24 rounded-full bg-[#CAFF33] flex items-center justify-center text-4xl text-black cursor-pointer"
                        onClick={() => setShowModal(true)}
                    >
                        <FaCamera />
                    </div>
                    <button
                        className="mt-2 text-sm text-[#CAFF33] font-semibold hover:underline"
                        onClick={() => setShowModal(true)}
                    >
                        Load image
                    </button>
                </div>

                {/* Personal Info */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">Personal</h2>
                    <div className="space-y-4">
                        {/* First Name */}
                        <div className="flex items-center justify-between bg-white  p-3 rounded-lg">
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="bg-transparent text-black text-sm focus:outline-none w-full"
                            />
                            <FaEdit className="text-gray-500 cursor-pointer" />
                        </div>

                        {/* Last Name */}
                        <div className="flex items-center justify-between bg-white  p-3 rounded-lg">
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="bg-transparent text-black text-sm focus:outline-none w-full"
                            />
                            <FaEdit className="text-gray-500 cursor-pointer" />
                        </div>

                        {/* User ID */}
                        <div className="flex items-center justify-between bg-gray-200 p-3 rounded-lg">
                            <input
                                type="text"
                                value={`ID: ${userId}`}
                                readOnly
                                className="bg-transparent text-black text-sm focus:outline-none w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Logout Button */}
                <button className="mt-6 w-full bg-red-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition">
                    Log out <FaSignOutAlt />
                </button>
            </div>

            {/* Modal for Uploading Profile Picture */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[90%] max-w-[400px] p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Profile photo</h2>
                            <button
                                className="text-gray-500 hover:text-black"
                                onClick={() => setShowModal(false)}
                            >
                                ✖
                            </button>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500">
                                <FaCamera />
                            </div>
                            <button className="mt-4 w-full bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition">
                                Upload photo <FaCamera />
                            </button>
                            <button className="mt-4 w-full bg-gray-200 text-black py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition">
                                Use gallery <FaCamera />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;