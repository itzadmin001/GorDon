import React, { useEffect, useContext, useState } from 'react';
import { MainContext } from '../../MainCon';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ViewSupplements() {
    const { fetchDataFromDatabase, supplement, PricingDetails, deleteUserFromdataBase, notify } = useContext(MainContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDataFromDatabase('Supplements');
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#CAFF33] border-solid mx-auto mb-4"></div>
                    <p className="text-lg">Loading supplements...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 bg-gray-900 min-h-screen">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">All Supplements</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Description</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Price ($)</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Rating</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplement && supplement.length > 0 ? (
                            supplement.map((item, idx) => (
                                <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700 transition">
                                    <td className="px-4 py-3 text-white font-semibold">{item.name || ""}</td>
                                    <td className="px-4 py-3 text-gray-300">{item.description || ""}</td>
                                    <td className="px-4 py-3 text-[#CAFF33] font-bold">{item.price || ""}</td>
                                    <td className="px-4 py-3 text-yellow-400 font-bold">{item.rating || ""}</td>
                                    <td className="px-4 py-3 text-center flex items-center justify-center gap-2">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition"
                                            title="Edit"
                                            onClick={() => navigate(`/admin/supplements/edit/${item.id}`)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
                                            title="Delete"
                                            onClick={async () => {
                                                await deleteUserFromdataBase('Supplements', item.id);
                                                notify("Supplement deleted!");
                                                fetchDataFromDatabase('Supplements');
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center text-gray-400 py-8">
                                    No supplements found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewSupplements;