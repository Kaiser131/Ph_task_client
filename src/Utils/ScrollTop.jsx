import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ScrollTop = ({ children }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return children;
};

export default ScrollTop;