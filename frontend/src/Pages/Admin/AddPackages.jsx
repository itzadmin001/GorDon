import React, { useContext, useState } from 'react';
import { db } from "../../Firebase"
import { push, ref, set } from 'firebase/database';
import { MainContext } from '../../MainCon';

function AddPackages() {
    const { notify } = useContext(MainContext)
    const [features, setFeatures] = useState([""]);
    const [checkBox, SetcheckBox] = useState(true)

    const handleFeatureChange = (index, value) => {
        const updated = [...features];
        updated[index] = value;
        setFeatures(updated);
    };

    const addFeature = () => {
        setFeatures([...features, ""]);
    };

    const removeFeature = (index) => {
        const updated = features.filter((_, idx) => idx !== index);
        setFeatures(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: e.target.name.value,
            price: e.target.price.value,
            durationInMonth: e.target.durationInMonth.value,
            features: features,
            description: e.target.description.value,
            isActive: checkBox,
            maxUsers: e.target.maxUsers.value,
            currentUsers: e.target.currentUsers.value
        };

        try {
            const newPackageRef = push(ref(db, 'packages'));
            set(newPackageRef, data)
                .then(() => {
                    e.target.reset()

                    setFeatures([""])
                    notify("Package created!✅");
                })
                .catch((err) => {
                    console.log("Error saving package:", err);
                });
        } catch (err) {
            console.log("Unexpected error:", err);
        }
    }


    return (
        <div className="max-w-full mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg mt-2">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Package</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className='grid grid-cols-2 gap-2 items-center'>
                    <div>
                        <label className="block mb-1 font-semibold">Package Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Price ($)</label>
                        <input
                            type="number"
                            name="price"
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

                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    >
                        <option value={1}>1 Month</option>
                        <option value={3}>3 Months</option>
                        <option value={6}>6 Months</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Features</label>
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={feature}
                                onChange={e => handleFeatureChange(idx, e.target.value)}
                                className="flex-1 p-2 rounded bg-gray-800 border border-gray-700"
                                required
                            />
                            {features.length > 1 && (
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
                        required
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="isActive"
                        value={checkBox}
                        defaultChecked
                        onChange={() => SetcheckBox(!checkBox)}
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
                            min={0}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#CAFF33] text-gray-900 py-2 rounded font-bold hover:bg-[#c9ff3387] transition"
                >
                    Add Package
                </button>
            </form>
        </div>
    );
}

export default AddPackages;