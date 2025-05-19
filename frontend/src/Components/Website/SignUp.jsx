import React, { useContext, useEffect, useState } from 'react';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import { MainContext } from '../../MainCon';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ref, set } from 'firebase/database';
import { db } from "../../Firebase";
import LoadingPage from "../../Components/Website/Loading"


function SignUp() {
    const { notify, SetUser, user } = useContext(MainContext);
    const [loading, SetLoading] = useState(false)
    const auth = getAuth();
    const navigate = useNavigate()
    const provider = new GoogleAuthProvider()


    useEffect(() => {
        if (user) {
            navigate("/")
        } else {

        }
    }, [user])

    const GoggleformHandler = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                set(ref(db, 'users/' + user.uid), {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    role: "user"
                }).then((success) => {
                    notify("Account created susseccfuly", "success")
                    navigate("/select-gender")
                })

            })
            .catch((error) => {
                console.error('Error during sign-in:', error.message);
            });
    };



    const AthUserHandler = (e) => {
        e.preventDefault()
        SetLoading(true)
        const Userdata = {
            firstname: (e.target.firstname.value).trim(),
            lastname: (e.target.lastname.value).trim(),
            email: (e.target.email.value).trim(),
            password: (e.target.password.value).trim()
        }
        if (Userdata.firstname != "" && Userdata.lastname != "" && Userdata.password != null && Userdata.email != null) {
            createUserWithEmailAndPassword(auth, Userdata.email, Userdata.password)
                .then((CreatedUser) => {
                    e.target.reset()
                    SetLoading(false)
                    set(ref(db, 'users/' + CreatedUser.user.uid), {
                        displayName: Userdata.firstname + " " + Userdata.lastname,
                        email: Userdata.email,
                        role: "user",
                        photoURL: null
                    }).then((success) => {

                        notify("Account created susseccfuly", "success")

                        navigate("/select-gender")
                    })


                }).catch((err) => {
                    SetLoading(false)
                    notify(err.message, "error")
                })
        } else {
            notify("please Enter A valid input ", 0)
        }


    }


    if (loading) return <LoadingPage />


    return (
        <section className="bg-[#1C1C1C] min-h-screen flex items-center justify-center text-white">
            <div className="w-full max-w-[500px] bg-[#1C1C1C] p-8 rounded-lg shadow-lg">
                <h1 className="text-center text-[2rem] font-bold text-[#CAFF33]">Sign Up</h1>
                <p className="text-center text-gray-400 mb-8">
                    Join our community today! Create an account to unlock exclusive features and personalized experiences.
                </p>

                {/* Form */}
                <form className="space-y-6" onSubmit={AthUserHandler}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            required
                            name='firstname'
                            className="w-full px-4 py-3 bg-[#333232] text-white rounded-lg focus:outline-none"
                        />
                        <input
                            type="text"
                            required
                            name='lastname'
                            placeholder="Enter Last Name"
                            className="w-full px-4 py-3 bg-[#333232] text-white rounded-lg focus:outline-none"
                        />
                    </div>
                    <input
                        type="email"
                        required
                        name='email'
                        placeholder="Enter your Email"
                        className="w-full px-4 py-3 bg-[#333232] text-white rounded-lg focus:outline-none"
                    />
                    <div className="relative">
                        <input
                            type="password"
                            required
                            name='password'
                            placeholder="Enter your Password"
                            className="w-full px-4 py-3 bg-[#333232] text-white rounded-lg focus:outline-none"
                        />
                        <span className="absolute right-4 top-3 text-gray-400 cursor-pointer">👁️</span>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#CAFF33] text-gray-900 font-semibold rounded-lg hover:bg-[#c9ff3387] transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Login Button */}
                <button className="w-full mt-4 py-3 bg-[#333232] text-white font-semibold rounded-lg hover:bg-[#444343] transition duration-300">
                    Login
                </button>

                {/* Social Login */}
                <div className="text-center mt-6">
                    <p className="text-gray-400 mb-4">Or Continue with</p>
                    <div className="flex justify-center gap-6">
                        <button className="bg-[#333232] p-3 rounded-full hover:bg-[#444343] transition duration-300" onClick={GoggleformHandler}>
                            <FaGoogle className="text-[#CAFF33] text-xl" />
                        </button>
                        <button className="bg-[#333232] p-3 rounded-full hover:bg-[#444343] transition duration-300">
                            <FaFacebookF className="text-[#CAFF33] text-xl" />
                        </button>
                        <button className="bg-[#333232] p-3 rounded-full hover:bg-[#444343] transition duration-300">
                            <FaApple className="text-[#CAFF33] text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;