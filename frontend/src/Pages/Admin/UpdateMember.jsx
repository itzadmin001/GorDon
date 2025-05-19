import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from "../../Firebase";
import { ref, get, update } from 'firebase/database';
import { MainContext } from '../../MainCon';

function UpdateMember() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { notify } = useContext(MainContext);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch member data by ID
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const snap = await get(ref(db, `member/${id}`));
            if (snap.exists()) {
                setData(snap.val());
            }
            setLoading(false);
        }
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await update(ref(db, `member/${id}`), data);
            notify("Member updated successfully!✅");
            navigate("/admin/user-mangement/view-member");
        } catch (err) {
            notify("Error updating member", 2);
            console.log(err);
        }
    };

    if (loading || !data) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#CAFF33] border-solid mx-auto mb-4"></div>
                    <p className="text-lg">Loading member...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Member</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-semibold">Name</label>
                        <input
                            type="text"
                            name="displayName"
                            value={data.displayName || ""}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email || ""}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={data.phone || ""}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={data.age || ""}
                            onChange={handleChange}
                            min={0}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={data.address || ""}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Package Name</label>
                        <input
                            type="text"
                            name="packageName"
                            value={data.packageName || ""}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Package Price</label>
                        <input
                            type="text"
                            name="packagePrice"
                            value={data.packagePrice || ""}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Join Date</label>
                        <input
                            type="text"
                            name="packageDate"
                            value={data.packageDate || ""}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Expiry Date</label>
                        <input
                            type="text"
                            name="expiryDate"
                            value={data.expiryDate || ""}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Diet Plan</label>
                        <input
                            type="text"
                            name="dietPlan"
                            value={data.dietPlan || ""}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={data.isActive || false}
                            onChange={handleChange}
                            className="accent-[#CAFF33]"
                        />
                        <label className="font-semibold">Active</label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#CAFF33] text-gray-900 py-2 rounded font-bold hover:bg-[#c9ff3387] transition mt-4"
                >
                    Update Member
                </button>
            </form>
        </div>
    );
}

export default UpdateMember;