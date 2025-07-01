import login_image from '/images/login_image.jpg';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import Loading from '../../components/shared/Loading';
import useAuth from '../../Hooks/Auth/useAuth';
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa6";
import { useState } from 'react';
import useAxiosCommon from '../../Hooks/Axios/useAxiosCommon';
import { useMutation } from '@tanstack/react-query';
import { imageUpload } from '../../Utils/ImageUpload';
import axios from 'axios';



const Register = () => {

    const [passText, setPassText] = useState(true);
    const [confirmPassText, setConfirmPassText] = useState(true);

    const navigate = useNavigate();


    const axiosCommon = useAxiosCommon();
    const { mutateAsync } = useMutation({
        mutationFn: async (userData) => {
            const { data } = await axiosCommon.post('/users', userData);
            return data;
        },
        onSuccess: (data) => {
            if (data?.acknowledged) {
                toast.success('Registration Successful! Please Login');
                navigate('/login');
            } else {
                toast.error('Registration failed. Please try again.');
            }
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status;
                const message = error.response?.data?.message;

                if (status === 400) {
                    toast.error(message || 'User already exists.');
                } else {
                    toast.error(`Registration failed: ${message || 'Unknown error'}`);
                }

                console.error('Registration error:', status, message);
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    });



    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const image = form.image.files[0];
        const email = form.email.value;
        const confirmPassword = form.confirm_password.value;
        const password = form.password.value;




        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
        const emailChecker = emailRegex.test(email);
        const passChecker = passRegex.test(password);

        let imageUrl = '';

        try {
            imageUrl = await imageUpload(image);
        } catch (error) {
            toast.error('Image upload failed. Please try again.');
        }


        // email check
        if (!emailChecker) {
            return toast.error('Provide a valid Email');
        }

        // pass checker
        if (!passChecker) {
            return toast.error('Password should contain atleast 6 numbers 1 capital or small character');
        }
        if (password !== confirmPassword) {
            return toast.error('Password is not matched !');
        }

        await mutateAsync({
            name,
            email,
            password,
            image: imageUrl,
            currently_logged_in: false,
        });

    };

    // if (loading) return <Loading />;

    return (
        <div className="flex h-screen bg-cover bg-center" style={{
            backgroundImage: "url('/images/login_image.jpg')", // replace with your image
        }}>

            <div className="w-1/2 hidden md:block "></div>

            {/* Right side with glassmorphism */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white/10 backdrop-blur-md">
                <div className="w-full max-w-2xl p-8 text-white h-full flex flex-col justify-center">
                    <div className='text-center mb-8'>
                        <h2 className="text-4xl font-semibold mb-2">Sign In</h2>
                        <p className="mb-6 text-sm text-gray-200">Please enter your details.</p>
                    </div>

                    <form onSubmit={handleSignUp}>
                        <div className='space-y-4'>
                            {/* Name and image Input */}
                            <div className='space-y-2 flex flex-col md:flex-row gap-4'>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                                    <input
                                        type="text"
                                        name='name'
                                        placeholder="Enter your name"
                                        className="w-full mt-1 px-4 py-2 bg-transparent border-b border-gray-400 text-white placeholder-gray-300 outline-none"
                                    />
                                </div>
                                <div className=''>
                                    <label htmlFor="image" className="block text-sm font-medium">Image</label>
                                    <input
                                        type="file"
                                        name='image'
                                        className="w-full pl-1 pt-4 bg-transparent rounded-full file:rounded-full file:border-none  text-white outline-none"
                                    />
                                </div>
                            </div>


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
                            {/* confirm password */}
                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium">Confirm Password</label>
                                <div className='relative'>
                                    <input
                                        required
                                        placeholder="••••••••"
                                        name="confirm_password"
                                        className='w-full mt-1 px-4 py-2 bg-transparent border-b border-gray-400 text-white placeholder-gray-300 outline-none'
                                        type={confirmPassText ? "password" : "text"} />
                                    <span onClick={() => setConfirmPassText(!confirmPassText)} className='absolute right-5 top-4'> {confirmPassText ? <FaLock /> : <FaLockOpen />} </span>
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
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-300 hover:underline">
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;