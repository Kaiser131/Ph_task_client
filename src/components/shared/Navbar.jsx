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


const Navbar = () => {

    const { currentUser, removeCurrentUser } = useAuth();
    const location = useLocation();

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

    // ${location?.pathname === '/' && currentScrollY === 0 ? 'text-black' : 'text-white'}

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
                            className={`font-kaushan  text-3xl text-black`}>HandsOn</motion.button></Link>
                    </div>




                    <motion.div
                        className={`flex  h-full items-center text-black`}>

                        <div className={` hidden md:block`}>
                            {navItems.map((nav, idx) => (
                                <Link key={idx} to={nav?.destination} >
                                    <button className={`uppercase nav-hover-btn`}>{nav?.name}</button>
                                </Link>
                            ))}
                        </div>

                        {!currentUser && <Link to='/login' className="nav-hover-btn" >login</Link>}

                        {currentUser && <button className="nav-hover-btn" onClick={removeCurrentUser}>log out</button>}

                        {/* {user && <button onClick={logOut} className="nav-hover-btn" >LogOut</button>} */}

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="nav-hover-btn text-xl md:hidden"
                        >
                            <AiOutlineMenu />
                        </button>

                    </motion.div>




                    {/* modal */}
                    {/* <motion.div
                        initial={{}}
                        animate={{ x: isOpen ? -330 : 0 }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="absolute  md:py-5 right-[-330px] top-[-32px] pl-5 w-4/5 min-h-[100dvh] md:w-64 bg-white shadow-lg"
                    >
                        <button
                            onClick={() => setIsOpen(!open)}
                            className="absolute p-4 text-xl md:text-2xl text-black right-2 md:right-10 top-5"
                        >
                            <RxCross2 />
                        </button>


                        <div className="mt-16 pr-5 flex flex-col items-center gap-2">
                            <p className="text-black text-center text-sm mt-[-30px] font-galada">বিশুদ্ধতা, বিশ্বস্ততা ও সুন্নাহ-সম্মত বিবাহের নির্ভরযোগ্য প্রতিষ্ঠান</p>
                            <img src="/images/underline_img2.png" alt="" />
                        </div>



                        <nav className="mt-10 flex flex-col gap-4 text-xs md:text-sm">
                            <div className={` md:hidden text-white flex space-y-2 flex-col`}>
                                {navItems.map((nav, idx) => (
                                    <Link key={idx} to={nav?.destination} className="flex border-b -ml-5 px-5 pb-2 gap-2" >
                                        <span className="text-2xl text-[#C3937C]">{nav?.icon}</span>
                                        <button className={`uppercase nav-hover-btn text-black font-galada`}>{nav?.name}</button>
                                    </Link>
                                ))}
                            </div>
                            {
                                user ?
                                    <button className="absolute bottom-5 left-10 text-base font-raleway text-red-600" onClick={logOut}>Logout</button> :
                                    <Link to='/login' className="absolute bottom-5 font-lexend left-10 text-base text-green-600">Login</Link>
                            }
                        </nav>
                    </motion.div> */}





                </nav>
            </header>
        </div >
    );
};

export default Navbar;