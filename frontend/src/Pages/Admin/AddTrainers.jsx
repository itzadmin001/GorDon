import React, { useContext, useState } from 'react';
import { db } from "../../Firebase"
import { push, ref, set } from 'firebase/database';
import { MainContext } from '../../MainCon';

function AddTrainers() {
    const [loading, setLoading] = useState(false);
    const [specialInput, setSpecialInput] = useState('');
    const [specialList, setSpecialList] = useState([]);
    const { notify } = useContext(MainContext);

    const handleAddSpecial = (e) => {
        e.preventDefault();
        if (specialInput.trim() && !specialList.includes(specialInput.trim())) {
            setSpecialList([...specialList, specialInput.trim()]);
            setSpecialInput('');
        }
    };

    const handleRemoveSpecial = (item) => {
        setSpecialList(specialList.filter(s => s !== item));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            name: e.target.name.value,
            gender: e.target.gender.value,
            des: e.target.des.value,
            clients: e.target.clients.value,
            experience: e.target.experience.value,
            special: specialList,
        };
        try {
            const newTrainersRef = push(ref(db, 'trainers'));
            await set(newTrainersRef, data);
            e.target.reset();
            setSpecialList([]);
            notify("Trainer added!✅");
        } catch (err) {
            console.log("Error saving trainer:", err);
            notify("Error saving trainer!", "error");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md space-y-5"
            >
                <h2 className="text-2xl font-bold text-center text-[#CAFF33] mb-4">Add Trainer</h2>
                <div>
                    <label className="block mb-1 font-semibold text-gray-200">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-200">Description</label>
                    <input
                        type="text"
                        name="des"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-200">Clients</label>
                    <input
                        type="number"
                        name="clients"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        required
                        min={0}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-200">Years Experience</label>
                    <input
                        type="number"
                        name="experience"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        required
                        min={0}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-200">Specialization</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={specialInput}
                            onChange={e => setSpecialInput(e.target.value)}
                            className="flex-1 p-2 rounded bg-gray-700 border border-gray-600 text-white"
                            placeholder="Add specialization"
                        />
                        <button
                            onClick={handleAddSpecial}
                            className="bg-[#CAFF33] text-gray-900 px-3 py-1 rounded font-bold hover:bg-[#b6e62e] transition"
                            type="button"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {specialList.map((item, idx) => (
                            <span
                                key={idx}
                                className="bg-[#CAFF33] text-gray-900 px-2 py-1 rounded flex items-center gap-1"
                            >
                                {item}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSpecial(item)}
                                    className="ml-1 text-red-600 font-bold"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-200">Gender</label>
                    <select
                        name="gender"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#CAFF33] text-gray-900 py-2 rounded font-bold hover:bg-[#b6e62e] transition"
                >
                    {loading ? 'Adding...' : 'Add Trainer'}
                </button>
            </form>
        </div>
    );
}

export default AddTrainers;