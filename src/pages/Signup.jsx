import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setMessage('');
            setLoading(true);
            const { data, error } = await signUp(email, password);
            if (error) throw error;

            if (data?.user && !data?.session) {
                setMessage('Account created! Please check your email to verify your account.');
            } else {
                navigate('/');
            }
        } catch (error) {
            setError('Failed to create account: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 font-sans selection:bg-zinc-700 selection:text-white">
            <div className="max-w-md w-full space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="mt-6 text-center text-4xl font-extrabold text-white tracking-tight">
                        IRON<span className="text-red-600">FOCUS</span>
                    </h2>
                    <p className="mt-2 text-center text-sm text-zinc-500 uppercase tracking-widest">
                        Begin Your Transformation
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 shadow-2xl backdrop-blur-sm"
                >
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-900/30 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        {message && (
                            <div className="bg-green-900/30 border border-green-500 text-green-400 px-4 py-3 rounded-lg text-sm" role="alert">
                                <span className="block sm:inline">{message}</span>
                            </div>
                        )}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="mb-4">
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-xl relative block w-full px-5 py-4 bg-zinc-900 border border-zinc-700 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent focus:z-10 sm:text-sm transition-all"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none rounded-xl relative block w-full px-5 py-4 bg-zinc-900 border border-zinc-700 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent focus:z-10 sm:text-sm transition-all"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none rounded-xl relative block w-full px-5 py-4 bg-zinc-900 border border-zinc-700 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent focus:z-10 sm:text-sm transition-all"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {loading ? 'Creating Account...' : 'START JOURNEY'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-zinc-500">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-red-500 hover:text-red-400 transition-colors">
                                Log In
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
