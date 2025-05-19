import React, { useContext, useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MainContext } from '../../MainCon';
import LoadingPage from "../../Components/Website/Loading"
import { useNavigate } from 'react-router-dom';


function ViewPackage() {
    const navigate = useNavigate()
    const { fetchPackageDetails, PricingDetails, deleteUserFromdataBase, notify } = useContext(MainContext)
    const [loading, SetLoding] = useState(true)

    const fetchData = async () => {
        await fetchPackageDetails();
        SetLoding(false);
    };
    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <LoadingPage />


    const deleteFromDataBase = (route, id) => {
        deleteUserFromdataBase(route, id)
        fetchData();
        notify("package Deleted successfully", "success")

    }
    return (
        <div className="p-2 md:p-8 bg-gray-900 min-h-screen">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">All Packages</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Description</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Features</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase">Status</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase">Duration (mo)</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase">Max Users</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase">Current Users</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase">Price ($)</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PricingDetails.map(pkg => (

                            <tr key={pkg.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                                <td className="px-4 py-3 text-white font-semibold">{pkg.name}</td>
                                <td className="px-4 py-3 text-gray-300">{pkg.description}</td>
                                <td className="px-4 py-2">
                                    <ul className="list-disc list-inside text-gray-200 space-y-1 text-sm">
                                        {pkg.features.map((f, i) => (
                                            <li key={i}>{f}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        className={`px-3 py-1 rounded-full font-bold text-xs ${pkg.isActive
                                            ? "bg-green-500 text-white"
                                            : "bg-red-500 text-white"
                                            }`}
                                    >
                                        {pkg.isActive ? "Active" : "Inactive"}
                                    </button>
                                </td>
                                <td className="px-4 py-3 text-center text-gray-200">{pkg.durationInMonth}</td>
                                <td className="px-4 py-3 text-center text-gray-200">{pkg.maxUsers}</td>
                                <td className="px-4 py-3 text-center text-gray-200">{pkg.currentUsers}</td>
                                <td className="px-4 py-3 text-center text-[#CAFF33] font-bold">${pkg.price}</td>
                                <td className="px-4 py-3 text-center flex items-center justify-center gap-2 mt-5">
                                    <button className="bg-blue-500 cursor-pointer  hover:bg-blue-600 text-white p-2 rounded-full transition" title="Edit" onClick={() => navigate(`/admin/packages/edit-package/${pkg.id}`)}>
                                        <FaEdit />
                                    </button>
                                    <button className="bg-red-500 cursor-pointer hover:bg-red-600 text-white p-2 rounded-full transition" title="Delete" onClick={() => deleteFromDataBase("/packages", pkg.id)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewPackage;