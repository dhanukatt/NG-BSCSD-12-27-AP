import React, { useState, useCallback, useRef } from 'react';
import { authApi } from '../api';
import { User } from '../types';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Signup = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
        isLoading: false
    });
    const navigate = useNavigate();

    const performSignup = useCallback(async () => {
        if (formState.isLoading) return;

        // Validate password match
        if (formState.password !== formState.confirmPassword) {
            setFormState(prev => ({ ...prev, error: 'Passwords do not match' }));
            return;
        }

        setFormState(prev => ({ ...prev, error: '', isLoading: true }));

        try {
            const response = await authApi.signup(formState.username, formState.email, formState.password);

            // Store tokens and user data
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);

            const user: User = {
                id: response.id,
                username: response.username,
                email: response.email,
                role: response.role,
                customerId: response.customerId || undefined,
                driverId: response.driverId || undefined,
                status: response.status as "active" | "blocked" || "active"
            };

            localStorage.setItem('user', JSON.stringify(user));

            // Navigate to the home page or dashboard
            navigate('/');

        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 
                               err.response?.data?.error ||
                               err.message || 
                               'Signup failed. Please try again.';
            setFormState(prev => ({ ...prev, error: errorMessage }));
        } finally {
            setFormState(prev => ({ ...prev, isLoading: false }));
        }
    }, [formState.username, formState.email, formState.password, formState.confirmPassword, formState.isLoading, navigate]);

    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (!formState.username) {
            setFormState(prev => ({ ...prev, error: 'Username is required' }));
            return;
        }
        if (!formState.email) {
            setFormState(prev => ({ ...prev, error: 'Email is required' }));
            return;
        }
        if (!formState.password) {
            setFormState(prev => ({ ...prev, error: 'Password is required' }));
            return;
        }
        if (!formState.confirmPassword) {
            setFormState(prev => ({ ...prev, error: 'Confirm Password is required' }));
            return;
        }

        performSignup();
    }, [formState.username, formState.email, formState.password, formState.confirmPassword, performSignup]);

    const handleInputChange = useCallback((field: 'username' | 'email' | 'password' | 'confirmPassword', value: string) => {
        setFormState(prev => ({ ...prev, [field]: value, error: '' }));
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-black p-6 mt-20">
                <div className="flex w-full max-w-6xl mx-auto gap-6">
                    <div className="flex-1 bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-800">
                        <h2 className="text-2xl font-bold mb-4 text-center text-white flex items-center justify-center">
                            <FontAwesomeIcon icon={faSignInAlt} className="mr-2 text-indigo-500" />
                            Sign Up
                        </h2>
                        {formState.error && (
                            <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-200 rounded relative" role="alert" aria-live="assertive">
                                <strong className="font-bold">Error: </strong>
                                <span className="block sm:inline">{formState.error}</span>
                            </div>
                        )}
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
                            <div>
                                <label htmlFor="username" className="block text-gray-300 text-sm font-bold mb-2">Username</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="username"
                                        className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline pl-10"
                                        value={formState.username}
                                        onChange={(e) => handleInputChange('username', e.target.value)}
                                        required
                                        aria-required="true"
                                    />
                                    <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline pl-10"
                                        value={formState.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        required
                                        aria-required="true"
                                    />
                                    <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="password"
                                        className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline pl-10"
                                        value={formState.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        required
                                        aria-required="true"
                                    />
                                    <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-bold mb-2">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 bg-gray-800 leading-tight focus:outline-none focus:shadow-outline pl-10"
                                        value={formState.confirmPassword}
                                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                        required
                                        aria-required="true"
                                    />
                                    <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <button 
                                    type="submit"
                                    className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform hover:scale-105 transition-transform ${formState.isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                    disabled={formState.isLoading}
                                    aria-disabled={formState.isLoading}
                                >
                                    {formState.isLoading ? 'Signing up...' : 'Sign Up'}
                                </button>
                            </div>
                        </form>
                        <p className="mt-4 text-center text-gray-400">
                            Already have an account? <Link to="/login" className="text-indigo-500 hover:underline">Log In</Link>
                        </p>
                    </div>
                    <div className="flex-1">
                        <img 
                            src="/assets/images/signup.jpg" 
                            alt="Sign Up" 
                            className="object-cover w-full h-full rounded-lg shadow-lg"
                            style={{ minHeight: '500px' }} 
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default React.memo(Signup);