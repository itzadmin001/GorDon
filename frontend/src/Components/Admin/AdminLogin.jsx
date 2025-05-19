import React, { useState, useContext } from 'react';
import { MainContext } from '../../MainCon';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const { signInWithEmailPassword, admin, SetAdmin, notify } = useContext(MainContext); // Make sure this function exists in MainCon.jsx
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const errs = {};
        if (!email) errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Invalid email";
        if (!password) errs.password = "Password is required";
        else if (password.length < 6) errs.password = "Password must be at least 6 characters";
        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setLoading(true);
        try {
            // Only allow specific admin email(s)
            const adminEmails = ['gym@gmail.com']; // <-- Change to your admin email(s)
            if (!adminEmails.includes(email)) {
                notify && notify("Only admin can login!", "error");
                setLoading(false);
                return;
            }
            await signInWithEmailPassword(email, password);
            notify && notify("Login successful!", "success");
            navigate('/admin');
        } catch (err) {
            notify && notify("Invalid credentials!", "error");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-sm space-y-5"
            >
                <h2 className="text-2xl font-bold text-center text-[#CAFF33] mb-4">Admin Login</h2>
                <div>
                    <label className="block mb-1 font-semibold text-gray-200">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={loading}
                    />
                    {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-200">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        disabled={loading}
                    />
                    {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#CAFF33] text-gray-900 py-2 rounded font-bold hover:bg-[#b6e62e] transition"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;