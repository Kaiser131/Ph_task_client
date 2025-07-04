import React from 'react';
import useAuth from '../../Hooks/Auth/useAuth';
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Hero from '../../components/Home/Hero';
import About from '../../components/Home/About';
import Features from '../../components/Features/Features';
import Story from '../../components/Story/Story';
import Contact from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';

const Home = () => {

    const { currentUser } = useAuth();
    console.log(currentUser);


    return (
        <div className='min-h-[100dvh]'>
            <Hero />
            <About />
            <Features />
            <Story />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;