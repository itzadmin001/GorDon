import React, { useContext, useEffect, useState } from 'react';
import { FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { MainContext } from '../../MainCon';
import LoadingPage from "../../Components/Website/Loading"

function Login() {
    const auth = getAuth();
    const { user, SetUser, notify, fetchUser } = useContext(MainContext)
    const [loading, SetLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate("/")
        } else {

        }
    }, [user])

    const LoginUserHandler = (e) => {
        e.preventDefault()
        SetLoading(true)
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                e.target.reset()
                SetLoading(false)
                if (user) {
                    fetchUser(user.uid)
                    notify("Login Successfully", "success")
                } else {
                    notify("Login faild Please try 5 mints later", "error")
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                SetLoading(false)
            });

    }

    if (loading) return <LoadingPage />


    return (
        <section className="bg-[#1C1C1C] min-h-screen flex items-center justify-center text-white">

            <div className="w-full max-w-[500px] bg-[#1C1C1C] p-8 rounded-lg shadow-lg">
                <h1 className="text-center text-[2rem] font-bold text-[#CAFF33]">Login</h1>
                <p className="text-center text-gray-400 mb-8">
                    Welcome back! Please log in to access your account.
                </p>

                {/* Form */}
                <form className="space-y-6" onSubmit={LoginUserHandler}>
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        name='email'
                        required
                        className="w-full px-4 py-3 bg-[#333232] text-white rounded-lg focus:outline-none"
                    />
                    <div className="relative">
                        <input
                            type="password"
                            name='password'
                            required
                            placeholder="Enter your Password"
                            className="w-full px-4 py-3 bg-[#333232] text-white rounded-lg focus:outline-none"
                        />
                        <span className="absolute right-4 top-3 text-gray-400 cursor-pointer">👁️</span>
                    </div>
                    <div className="text-right">
                        <Link to="/forgot-password" className="text-[#CAFF33] text-sm hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#CAFF33] text-gray-900 font-semibold rounded-lg hover:bg-[#c9ff3387] transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Sign Up Button */}
                <Link
                    to="/signup"
                    className="block w-full mt-4 py-3 bg-[#333232] text-center text-white font-semibold rounded-lg hover:bg-[#444343] transition duration-300"
                >
                    Sign Up
                </Link>

                {/* Login as Member */}
                <div className="text-center mt-4">
                    <p className="text-gray-400 text-sm">
                        🔒 Login as a <span className='font-bold'>Member?</span> {' '}
                        <Link to="/member-login" className="text-[#CAFF33] hover:underline">
                            Click here
                        </Link>
                    </p>
                </div>

                {/* Social Login */}
                <div className="text-center mt-6">
                    <p className="text-gray-400 mb-4">Or Continue with</p>
                    <div className="flex justify-center gap-6">
                        <button className="bg-[#333232] p-3 rounded-full hover:bg-[#444343] transition duration-300">
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

                {/* No Account */}
                <div className="text-center mt-6">
                    <p className="text-gray-400 text-sm">
                        Don’t have an account?{' '}
                        <Link to="/sign-up" className="text-[#CAFF33] hover:underline">
                            Click here
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Login;