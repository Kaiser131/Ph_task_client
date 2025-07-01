import React from 'react';
import { Outlet } from 'react-router';
import ScrollTop from '../Utils/ScrollTop';
import Navbar from '../components/shared/Navbar';


const Main = () => {
    return (
        <ScrollTop>
            <Navbar />
            <Outlet />
        </ScrollTop>
    );
};

export default Main;