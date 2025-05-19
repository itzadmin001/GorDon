import React, { useState, useContext } from 'react';
import { MainContext } from '../../MainCon';
import { db } from "../../Firebase"
import { push, ref, set } from 'firebase/database';

function AddSupplements() {
    const { notify, } = useContext(MainContext);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const description = form.description.value;
        const rating = parseFloat(form.rating.value);
        const price = parseFloat(form.price.value);
        const data = {
            name,
            description,
            rating,
            price
        };
        try {
            const newSupplementRef = push(ref(db, 'Supplements'));
            set(newSupplementRef, data)
                .then(() => {
                    e.target.reset()
                    setFeatures([""])
                    notify("Supplemnt created!✅");
                })
                .catch((err) => {
                    console.log("Error saving package:", err);
                });
        } catch (err) {
            console.log("Unexpected error:", err);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Supplement</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-semibold">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Description</label>
                    <textarea
                        name="description"
                        required
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-semibold">Rating</label>
                        <input
                            type="number"
                            name="rating"
                            min={0}
                            max={5}
                            step={0.1}
                            required
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            min={0}
                            step={0.01}
                            required
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    // disabled={loading}
                    className="w-full bg-[#CAFF33] text-gray-900 py-2 rounded font-bold hover:bg-[#c9ff3387] transition"
                >
                    {/* {loading ? "Adding..." : "Add Supplement"} */} add
                </button>
            </form>
        </div>
    );
}

export default AddSupplements;