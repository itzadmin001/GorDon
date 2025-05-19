import React, { useContext, useEffect, useState } from 'react'
import { MainContext } from '../../MainCon'
import { FaEdit, FaTrash } from 'react-icons/fa'
import LoadingPage from "../../Components/Website/Loading"
import { useNavigate } from 'react-router-dom'

function ViewMember() {
    const { MemberDetails, deleteUserFromdataBase, fetchMemberData } = useContext(MainContext)
    const [loading, SetLoding] = useState(true)
    const navigate = useNavigate()


    const fetchData = async () => {
        await fetchMemberData();
        SetLoding(false);
    };
    useEffect(() => {
        fetchData();
    }, []);

    console.log(MemberDetails)
    if (loading) return <LoadingPage />

    return (
        <div className="p-4 md:p-8 bg-gray-900 min-h-screen">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">All Members</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Email</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Phone</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Age</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Address</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Package Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Package Price</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Join Date</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Expiry Date</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Diet Plan</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase">Status</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MemberDetails && MemberDetails.length > 0 ? (
                            MemberDetails.map((user, idx) => (
                                <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700 transition">
                                    <td className="px-4 py-3 text-white font-semibold">{user.displayName || ""}</td>
                                    <td className="px-4 py-3 text-gray-300">{user.email || ""}</td>
                                    <td className="px-4 py-3 text-gray-300">{user.phone || ""}</td>
                                    <td className="px-4 py-3 text-gray-300">{user.age || ""}</td>
                                    <td className="px-4 py-3 text-gray-300">{user.address || ""}</td>
                                    <td className="px-4 py-3 text-gray-300">{user.packageName || ""}</td>
                                    <td className="px-4 py-3 text-gray-300">{user.packagePrice || ""}</td>
                                    <td className="px-4 py-3 text-gray-300">{user.packageDate || ""}</td>
                                    <td className="px-4 py-3 text-gray-300">{user.expiryDate || ""}</td>
                                    <td className="px-4 py-3 text-gray-300">{user.dietPlan || ""}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`px-3 py-1 rounded-full font-bold text-xs ${user.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                                            {user.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center flex items-center justify-center gap-2">
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition" title="Edit" onClick={() => navigate(`/admin/user-mangement/update-member/${user.id}`)}>
                                            <FaEdit />
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition" title="Delete" onClick={() => deleteUserFromdataBase("/member", user.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={12} className="text-center text-gray-400 py-8">
                                    No members found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewMember