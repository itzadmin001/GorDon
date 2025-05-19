import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../MainCon';
import { Link } from 'react-router-dom';

function ViewTrainers() {
    const { fetchDataFromDatabase, supplement, deleteUserFromdataBase, notify } = useContext(MainContext);
    const [trainerDetails, setTrainerDetails] = useState([]);

    // Fetch trainers on mount
    useEffect(() => {
        fetchDataFromDatabase('trainers');
    }, []);

    // Update local state when supplement changes
    useEffect(() => {
        setTrainerDetails(Array.isArray(supplement) ? supplement : []);
    }, [supplement]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this trainer?")) {
            await deleteUserFromdataBase('trainers', id);
            notify && notify("Trainer deleted!", "success");
            // Refresh trainers
            fetchDataFromDatabase('trainers');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-4 md:p-8">
            <h2 className="text-2xl font-bold text-center text-[#CAFF33] mb-8">All Trainers</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Description</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Clients</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Experience</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Specialization</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase">Gender</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-300 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainerDetails.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center text-gray-400 py-8">
                                    No trainers found.
                                </td>
                            </tr>
                        ) : (
                            trainerDetails.map((trainer) => (
                                <tr key={trainer.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                                    <td className="px-4 py-3 text-white">{trainer.name}</td>
                                    <td className="px-4 py-3 text-gray-300">{trainer.des}</td>
                                    <td className="px-4 py-3 text-gray-300">{trainer.clients}</td>
                                    <td className="px-4 py-3 text-gray-300">{trainer.experience} yrs</td>
                                    <td className="px-4 py-3 text-gray-300">
                                        {Array.isArray(trainer.special)
                                            ? trainer.special.join(', ')
                                            : trainer.special}
                                    </td>
                                    <td className="px-4 py-3 text-gray-300">{trainer.gender}</td>
                                    <td className="px-4 py-3 text-center flex gap-2 justify-center">
                                        <Link to={`/admin/trainers/edit-trainer/` + trainer.id}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded font-semibold transition"
                                            // onClick={() => handleEdit(trainer.id)} // Implement edit as needed
                                            disabled
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold transition"
                                            onClick={() => handleDelete(trainer.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewTrainers;