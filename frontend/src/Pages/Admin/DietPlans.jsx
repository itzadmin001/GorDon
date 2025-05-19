import React, { useState, useContext } from 'react';
import { MainContext } from '../../MainCon';
import { db } from "../../Firebase"
import { push, ref, set } from 'firebase/database';

function DietPlans() {
    const { fetchDataFromDatabase, notify } = useContext(MainContext);
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            breakfast: e.target.breakfast.value,
            lunch: e.target.lunch.value,
            dinner: e.target.dinner.value,
            snacks: e.target.snacks.value,
        };
        console.log(data)

        try {
            const newDietsRef = push(ref(db, `deitsPlans/${e.target.goal.value}`));
            set(newDietsRef, data)
                .then(() => {
                    e.target.reset()
                    notify("deits created!✅");
                    setLoading(false);
                })
                .catch((err) => {
                    console.log("Error saving package:", err);
                });
        } catch (err) {
            console.log("Unexpected error:", err);
        }


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 rounded-lg shadow-lg p-8 w-full space-y-5"
            >
                <h2 className="text-2xl font-bold text-center text-[#CAFF33] mb-4">Create Diet Plan</h2>
                <div>
                    <label className="block mb-1 font-semibold text-gray-200">Goal</label>
                    <input
                        type="text"
                        name="goal"
                        placeholder="e.g. Weight Gain"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-200">Breakfast</label>
                    <input
                        type="text"
                        name="breakfast"

                        placeholder="e.g. Milk + Eggs"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-200">Lunch</label>
                    <input
                        type="text"
                        name="lunch"

                        placeholder="e.g. Rice + Chicken"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-200">Dinner</label>
                    <input
                        type="text"
                        name="dinner"

                        placeholder="e.g. Roti + Paneer"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-200">Snacks</label>
                    <input
                        type="text"
                        name="snacks"

                        placeholder="e.g. Protein Shake"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#CAFF33] text-gray-900 py-2 rounded font-bold hover:bg-[#b6e62e] transition"
                >
                    {loading ? 'Saving...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default DietPlans;