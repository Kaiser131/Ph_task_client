import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWindowScroll } from "react-use";
import { motion } from 'framer-motion';
import React from 'react';
import { FaBook, FaHome, FaOpencart } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { GiCrossedAxes } from "react-icons/gi";
import { Bs1CircleFill } from "react-icons/bs";
import { FaWpforms } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { BiCross } from "react-icons/bi";
import { LiaHomeSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import { TbUsersGroup } from "react-icons/tb";
import { FaYoutube } from "react-icons/fa";
import useAuth from "../../Hooks/Auth/useAuth";
import useAxiosSecure from "../../Hooks/Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const Navbar = () => {

    const { currentUser, removeCurrentUser } = useAuth();
    const location = useLocation();


    const axiosSecure = useAxiosSecure();
    const { data = [] } = useQuery({
        queryKey: ['user', currentUser],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/current_user/${currentUser}`);
            return data;
        }
    });


    const navContainerRef = useRef(null);
    const navItems = [
        { name: 'Home', destination: '/', icon: <LiaHomeSolid /> },
        { name: 'Events', destination: '/events', icon: <CiUser /> },
        { name: 'Add Events', destination: '/add_events', icon: <TbUsersGroup /> },
        { name: 'My Events', destination: '/my_events', icon: <TbUsersGroup /> },
    ];

    // scroll implementation using react-use
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const { y: currentScrollY } = useWindowScroll();


    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true),
                navContainerRef.current.classList.remove('floating-nav');
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false),
                navContainerRef.current.classList.add('floating-nav');
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true),
                navContainerRef.current.classList.add('floating-nav');
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);


    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2
        });
    }, [isNavVisible]);


    return (
        <div ref={navContainerRef} className="fixed inset-x-0 top-0 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6  mt-5">

            {isOpen && <div onClick={() => setIsOpen(!isOpen)} className="bg-black/30 min-h-screen w-screen absolute top-[-36px]" />}

            <header className="absolute top-1/2 w-full -translate-y-1/2 ">
                <nav className={`flex size-full items-center justify-between p-4  gap-5`}>

                    <div className="flex items-center gap-7">
                        <Link to='/'><motion.button
                            initial={{
                                opacity: 0,
                                y: -40
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    delay: 2,
                                    duration: 2,
                                    ease: 'easeInOut'
                                }

                            }}
                            className={` text-3xl 
                            ${location?.pathname === '/' && 'text-white'}   
                            ${location?.pathname !== '/' && currentScrollY !== 0 ? 'text-white' : 'text-black '}`}>Arcane</motion.button></Link>
                    </div>




                    <motion.div
                        className={`flex  h-full items-center 
                             ${location?.pathname === '/' && 'text-white'}
                        ${location?.pathname !== '/' && currentScrollY !== 0 ? 'text-white' : 'text-black '}`}>

                        <div className={` hidden md:block`}>
                            {navItems.map((nav, idx) => (
                                <Link key={idx} to={nav?.destination} >
                                    <button className={`uppercase nav-hover-btn`}>{nav?.name}</button>
                                </Link>
                            ))}
                        </div>

                        {!currentUser && <Link to='/login' className="nav-hover-btn" >Sign In</Link>}
                        {currentUser && <button className="nav-hover-btn" onClick={removeCurrentUser}>log out</button>}
                        {currentUser &&
                            <img src={data?.image} alt="" className="w-10 h-10 rounded-full object-cover ml-4" />
                        }

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="nav-hover-btn text-xl md:hidden"
                        >
                            <AiOutlineMenu />
                        </button>

                    </motion.div>

                </nav>
            </header>
        </div >
    );
};

export default Navbar;