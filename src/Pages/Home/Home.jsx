import React from 'react';
import useAuth from '../../Hooks/Auth/useAuth';
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Hero from '../../components/Home/Hero';
import About from '../../components/Home/About';

const Home = () => {

    const { currentUser } = useAuth();
    console.log(currentUser);


    return (
        <div className='min-h-[100dvh]'>
            <Hero />
            <About />
        </div>
    );
};

export default Home;