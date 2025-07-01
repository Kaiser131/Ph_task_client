import React, { use, useState } from 'react';
import login_image from '/images/login_image.jpg';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import Loading from '../../components/shared/Loading';
import useAuth from '../../Hooks/Auth/useAuth';
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa6";
import useAxiosCommon from '../../Hooks/Axios/useAxiosCommon';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';


const Login = () => {

    const [passText, setPassText] = useState(true);
    const navigate = useNavigate();

    const axiosCommon = useAxiosCommon();
    const { mutateAsync } = useMutation({
        mutationFn: async (userData) => {
            const { data } = await axiosCommon.post('/login', userData);
            return data;
        }
    });


    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
        const emailChecker = emailRegex.test(email);
        const passChecker = passRegex.test(password);
        // console.log(passChecker);
        // console.log(email, password);

        // check email and password
        if (!emailChecker) {
            return toast.error('Provide a valid Email');
        }
        // pass checker
        if (!passChecker) {
            return toast.error('Password should contain atleast 6 numbers 1 capital or small character');
        }

        const userData = {
            email,
            password,
            currently_logged_in: true
        };


        try {
            const result = await mutateAsync({ email, password });
            console.log(result.message);
            console.log(result.email);

            //  Save to localStorage
            localStorage.setItem('currentUser', result.email);
            toast.success(result.message);
            navigate('/');
            setTimeout(() => {
                window.location.reload();
            }, 100);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const msg = err.response?.data?.message || 'Login failed';
                toast.error(msg);
                console.error('Error:', err.response?.status, msg);
            } else {
                toast.error('Unknown error');
            }
        }
        form.reset();

    };



    return (
        <div className="flex h-screen bg-cover bg-center" style={{
            backgroundImage: "url('/images/login_image.jpg')", // replace with your image
        }}>

            <div className="w-1/2 hidden md:block "></div>

            {/* Right side with glassmorphism */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white/10 backdrop-blur-md">
                <div className="w-full max-w-2xl p-8 text-white h-full flex flex-col justify-center">
                    <div className='text-center mb-8'>
                        <h2 className="text-4xl font-semibold mb-2">Welcome back</h2>
                        <p className="mb-6 text-sm text-gray-200">Please enter your details.</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className='space-y-4'>
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">E-mail</label>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder="Enter your e-mail"
                                    className="w-full mt-1 px-4 py-2 bg-transparent border-b border-gray-400 text-white placeholder-gray-300 outline-none"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                                <div className='relative'>
                                    <input
                                        required
                                        placeholder="••••••••"
                                        name="password"
                                        className='w-full mt-1 px-4 py-2 bg-transparent border-b border-gray-400 text-white placeholder-gray-300 outline-none'
                                        type={passText ? "password" : "text"} />
                                    <span onClick={() => setPassText(!passText)} className='absolute right-5 top-4'> {passText ? <FaLock /> : <FaLockOpen />} </span>
                                </div>
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="form-checkbox text-white" />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="text-blue-300 hover:underline">Forgot your password?</a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-black hover:bg-gray-900 text-white rounded-md transition mt-10"
                        >
                            Log in
                        </button>

                        {/* Register Link */}
                        <p className="text-sm mt-4 text-center text-gray-300">
                            Don’t have an account?{' '}
                            <Link to="/register" className="text-blue-300 hover:underline">
                                Register here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;