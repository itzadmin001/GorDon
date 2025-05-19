import React, { useContext, useState, useRef, useEffect } from 'react';
import { FaBell, FaHeadset, FaExclamationTriangle } from 'react-icons/fa';
import { MainContext } from '../../MainCon';

function Header() {
    const { member, notifications } = useContext(MainContext);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const notifRef = useRef(null);

    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Red dot if notifications exist
    const hasNotifications = Array.isArray(notifications) && notifications.length > 0;

    // Close notification dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
        }
        if (isNotificationOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNotificationOpen]);

    const GymNotification = () => (
        <div className="absolute top-10 right-0 md:w-80 w-64 bg-[#FF6B6B] p-4 rounded-lg shadow-lg z-50">
            <div className="flex items-center gap-4">
                <FaExclamationTriangle className="md:text-3xl text-xl text-white" />
                <p className="md:text-sm text-[2vw] text-white">
                    Note: Gym closed on Sunday due to maintenance.
                </p>
            </div>
        </div>
    );

    return (
        <header className="bg-[#1C1C1C] text-white px-4 py-3 shadow-md relative">
            <div className="flex items-center justify-between">
                {/* Left Section */}
                <div>
                    <h1 className="text-lg md:text-2xl font-bold">{member?.displayName}</h1>
                    <p className="text-sm md:text-base text-yellow-500">Today: {today}</p>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Notification Bell */}
                    <div className="relative" ref={notifRef}>
                        <button
                            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            className="p-2 bg-[#333232] rounded-full hover:bg-[#444343] transition duration-300 relative"
                        >
                            <FaBell className="text-lg md:text-xl" />
                            {hasNotifications && (
                                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#1C1C1C]"></span>
                            )}
                        </button>
                        {/* Notification Dropdown */}
                        {isNotificationOpen && (
                            <div className="absolute right-0 mt-2 md:w-80 w-64 bg-gray-800 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                                <div className="p-4 border-b border-gray-700 font-semibold text-gray-200">
                                    Notifications
                                </div>
                                <ul className="py-2">
                                    {notifications && notifications.length > 0 ? (
                                        notifications.map((notif, idx) => (
                                            <li key={idx} className="px-4 py-3 border-b border-gray-700 last:border-b-0">
                                                <div className="text-gray-100">{notif.message}</div>
                                                <div className="text-xs text-gray-400 mt-1 text-right">{notif.timestamp}</div>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="px-4 py-3 text-gray-400 text-center">No notifications</li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* Headset Icon */}
                    <button className="p-2 bg-[#333232] rounded-full hover:bg-[#444343] transition duration-300">
                        <FaHeadset className="text-lg md:text-xl" />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;