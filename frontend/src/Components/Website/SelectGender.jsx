import React, { useContext, useEffect, useState } from 'react';
import Male from "../../assets/Images/Male.avif"
import Female from "../../assets/Images/Female.avif"
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { ref, update } from 'firebase/database';
import { db } from "../../Firebase";
import { MainContext } from '../../MainCon';

function SelectGender() {
    const [selectedGender, setSelectedGender] = useState('Male');
    const auth = getAuth();
    const navigate = useNavigate()
    const { user, userUID, notify } = useContext(MainContext)


    const genders = [
        {
            label: 'Male',
            image: Male // Replace with actual male image URL
        },
        {
            label: 'Female',
            image: Female// Replace with actual female image URL
        },
    ];



    useEffect(() => {
        if (user?.gender) {
            navigate("/")
        }
    }, [user])

    const ChaneGenderHanlder = () => {
        update(ref(db, 'users/' + userUID), { gender: selectedGender })
            .then(() => {
                navigate("/");
                notify("Congratulations 🎉🎉", 1);
            })
            .catch((error) => {
                console.error("Error updating user data:", error);
            });
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            {/* Header */}
            <h1 className="text-xl font-bold text-center mb-6">
                Welcome To Achieving <br /> Your Dream
            </h1>

            {/* Gender Selection */}
            <div className="space-y-4 w-full max-w-[400px]">
                {genders.map((gender) => (
                    <div
                        key={gender.label}
                        className={`flex items-center justify-between p-4 rounded-lg shadow-lg cursor-pointer ${selectedGender === gender.label ? 'bg-white text-black' : 'bg-black text-white'
                            }`}
                        onClick={() => setSelectedGender(gender.label)}
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={gender.image}
                                alt={gender.label}
                                className="w-18 h-18 rounded-full object-cover"
                            />
                            <p className="text-lg font-semibold">
                                Your Gender <span className="font-bold">({gender.label})</span>
                            </p>
                        </div>
                        <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedGender === gender.label ? 'border-green-500 bg-green-500' : 'border-gray-400'
                                }`}
                        >
                            {selectedGender === gender.label && (
                                <div className="w-3 h-3 rounded-full bg-white"></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="mt-8 w-full max-w-[400px] space-y-4">

                <button onClick={ChaneGenderHanlder} className="w-full cursor-pointer py-3 bg-gray-800  text-white rounded-lg font-semibold hover:bg-gray-600 transition">
                    Continue
                </button>
            </div>
        </div>
    );
}

export default SelectGender;