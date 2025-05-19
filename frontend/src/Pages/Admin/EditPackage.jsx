import React, { useEffect, useState, useContext } from 'react';
import { db } from "../../Firebase";
import { ref, update, get } from 'firebase/database';
import { useParams, useNavigate } from 'react-router-dom';
import { MainContext } from '../../MainCon';

function Editpackage() {
    const { notify } = useContext(MainContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch package data by ID
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const snap = await get(ref(db, `packages/${id}`));
            if (snap.exists()) {
                setData({ ...snap.val(), features: snap.val().features || [''] });
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

    const handleFeatureChange = (idx, value) => {
        const updated = [...data.features];
        updated[idx] = value;
        setData(prev => ({ ...prev, features: updated }));
    };

    const addFeature = () => setData(prev => ({ ...prev, features: [...prev.features, ''] }));
    const removeFeature = (idx) => setData(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== idx)
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await update(ref(db, `packages/${id}`), data);
            notify("Package updated!✅");
            navigate("/admin/packages/view-packages");
        } catch (err) {
            notify("Error updating package", 2);
            console.log(err);
        }
    };

    if (loading || !data) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#CAFF33] border-solid mx-auto mb-4"></div>
                    <p className="text-lg">Loading package...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-full mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg mt-2">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Package</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className='grid grid-cols-2 gap-2 items-center'>
                    <div>
                        <label className="block mb-1 font-semibold">Package Name</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            required
                            min={0}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Duration (Months)</label>
                    <select
                        name="durationInMonth"
                        value={data.durationInMonth}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    >
                        <option value={1}>1 Month</option>
                        <option value={3}>3 Months</option>
                        <option value={6}>6 Months</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Features</label>
                    {data.features.map((feature, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={feature}
                                onChange={e => handleFeatureChange(idx, e.target.value)}
                                className="flex-1 p-2 rounded bg-gray-800 border border-gray-700"
                                required
                            />
                            {data.features.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeFeature(idx)}
                                    className="bg-red-500 px-2 rounded text-white cursor-pointer"
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addFeature}
                        className="bg-[#CAFF33] text-gray-900 px-3 py-1 rounded font-semibold mt-1"
                    >
                        Add Feature
                    </button>
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Description</label>
                    <textarea
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={data.isActive}
                        onChange={handleChange}
                        className="accent-[#CAFF33]"
                    />
                    <label className="font-semibold">Active</label>
                </div>
                <div className='grid grid-cols-2 gap-2 items-center'>
                    <div>
                        <label className="block mb-1 font-semibold">Max Users</label>
                        <input
                            type="number"
                            name="maxUsers"
                            value={data.maxUsers}
                            onChange={handleChange}
                            required
                            min={1}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Current Users</label>
                        <input
                            type="number"
                            name="currentUsers"
                            value={data.currentUsers}
                            onChange={handleChange}
                            min={0}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#CAFF33] text-gray-900 py-2 rounded font-bold hover:bg-[#c9ff3387] transition"
                >
                    Update Package
                </button>
            </form>
        </div>
    );
}

export default Editpackage;