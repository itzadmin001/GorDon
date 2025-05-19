import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../MainCon';
import { db } from "../../Firebase";
import { ref, update } from 'firebase/database';
import { useParams, useNavigate } from 'react-router-dom';

function EditTrainer() {
    const { fetchDataFromDatabase, supplement, notify } = useContext(MainContext);
    const [form, setForm] = useState({
        name: '',
        des: '',
        clients: '',
        experience: '',
        special: [],
        gender: '',
    });
    const [specialInput, setSpecialInput] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch trainer data on mount
    useEffect(() => {
        fetchDataFromDatabase('trainers', id);
    }, [id]);

    // Set form fields when data is loaded
    useEffect(() => {
        if (supplement && supplement.length > 0) {
            const trainer = supplement[0];
            setForm({
                name: trainer.name || '',
                des: trainer.des || '',
                clients: trainer.clients || '',
                experience: trainer.experience || '',
                special: Array.isArray(trainer.special) ? trainer.special : [],
                gender: trainer.gender || '',
            });
        }
    }, [supplement]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddSpecial = (e) => {
        e.preventDefault();
        if (specialInput.trim() && !form.special.includes(specialInput.trim())) {
            setForm({ ...form, special: [...form.special, specialInput.trim()] });
            setSpecialInput('');
        }
    };

    const handleRemoveSpecial = (item) => {
        setForm({ ...form, special: form.special.filter(s => s !== item) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await update(ref(db, `trainers/${id}`), form);
            notify && notify("Trainer updated!✅");
            navigate('/admin/trainers/view-trainer');
        } catch (err) {
            notify && notify("Error updating trainer!", "error");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md space-y-5"
            >
                <h2 className="text-2xl font-bold text-center text-[#CAFF33] mb-4">Edit Trainer</h2>
                <div>
                    <label className="block mb-1 font-semibold text-gray-200">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-200">Description</label>
                    <input
                        type="text"
                        name="des"
                        value={form.des}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-200">Clients</label>
                    <input
                        type="number"
                        name="clients"
                        value={form.clients}
                        onChange={handleChange}
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
                        value={form.experience}
                        onChange={handleChange}
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
                        {form.special.map((item, idx) => (
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
                        value={form.gender}
                        onChange={handleChange}
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
                    {loading ? 'Updating...' : 'Update Trainer'}
                </button>
            </form>
        </div>
    );
}

export default EditTrainer;