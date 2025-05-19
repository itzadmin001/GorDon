import React, { useState } from 'react';
import { FaUser, FaFileInvoiceDollar, FaBell, FaDumbbell, FaStore, FaChartBar } from 'react-icons/fa';
import { MdExpandMore, MdExpandLess, MdOutlineDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { GoPackage } from "react-icons/go";

function SideBar() {
    const [userManagementOpen, setUserManagementOpen] = useState(false);
    const [supplementStoreOpen, setSupplementStoreOpen] = useState(false);
    const [trainerMenuOpen, SetTrainerMenuOpen] = useState(false)
    const [packages, Setpackage] = useState(false);


    const menuItems = [
        {
            name: "Dashboard",
            icon: <MdOutlineDashboard />,
            isDropdown: false,
            link: "/admin",
        },
        {
            name: "User Management",
            icon: <FaUser />,
            isDropdown: true,
            link: "/admin/user-mangement",
            isOpen: userManagementOpen,
            toggleOpen: () => setUserManagementOpen(!userManagementOpen),
            children: [
                { name: "View Member", link: "/admin/user-mangement/view-member" },
                { name: "Update Member", link: "/admin/user-mangement/view-member" },
            ],
        },
        {
            name: "Trainers",
            icon: <FaUser />,
            isDropdown: true,
            link: "/admin/trainers",
            isOpen: trainerMenuOpen,
            toggleOpen: () => SetTrainerMenuOpen(!trainerMenuOpen),
            children: [
                { name: "Add Trainer", link: "/admin/trainers/add-trainer" },
                { name: "View Trainer", link: "/admin/trainers/view-trainer" },
            ],

        },
        {
            name: "Add Packages",
            icon: <GoPackage />,
            isDropdown: true,
            link: "/admin/package",
            isOpen: packages,
            toggleOpen: () => Setpackage(!packages),
            children: [
                { name: "Add Packages", link: "/admin/packages/add-package" },
                { name: "View Packages", link: "/admin/packages/view-package" },
                { name: "Edit Packages", link: "/admin/packages/edit-package" },
            ],
        },
        {
            name: "Billing",
            icon: <FaFileInvoiceDollar />,
            isDropdown: false,
            link: "/admin/billing",
        },
        {
            name: "Notifications",
            icon: <FaBell />,
            isDropdown: false,
            link: "/admin/notifications",
        },
        {
            name: "Diet Plans",
            icon: <FaDumbbell />,
            isDropdown: false,
            link: "/admin/diet-plan",
        },
        {
            name: "Supplement Store",
            icon: <FaStore />,
            isDropdown: true,
            isOpen: supplementStoreOpen,
            toggleOpen: () => setSupplementStoreOpen(!supplementStoreOpen),
            children: [
                { name: "Add Supplement", link: "/admin/supplement-store/add-supplement" },
                { name: "Edit Supplement", link: "/admin/supplement-store/view-supplement" },
            ],
        },
        {
            name: "Reports",
            icon: <FaChartBar />,
            isDropdown: false,
            link: "/admin/reports",
        },
    ];

    return (
        <div className="sidebar bg-gray-700 text-white h-full">
            <h1 className="text-center text-2xl font-bold mt-10">ADMIN Panel</h1>
            <ul className="sidebar-menu mt-5">
                {menuItems.map((item, index) => (
                    <li key={index} className="menu-item mb-4">
                        {item.isDropdown ? (
                            <>
                                <div
                                    className="flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-gray-600"
                                    onClick={item.toggleOpen}
                                >
                                    <div className="flex items-center">
                                        {item.icon}
                                        <span className="ml-3">{item.name}</span>
                                    </div>
                                    {item.isOpen ? <MdExpandLess /> : <MdExpandMore />}
                                </div>
                                {item.isOpen && (
                                    <ul className="submenu ml-6 mt-2">
                                        {item.children.map((child, childIndex) => (
                                            <li key={childIndex} className="mb-2">
                                                <Link
                                                    to={child.link}
                                                    className="text-gray-300 hover:text-white"
                                                >
                                                    {child.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ) : (
                            <Link
                                to={item.link}
                                className="flex items-center px-4 py-2 hover:bg-gray-600"
                            >
                                {item.icon}
                                <span className="ml-3">{item.name}</span>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SideBar;