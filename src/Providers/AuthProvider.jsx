import { createContext, useState } from "react";
import React from 'react';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [contentLoading, setContentLoading] = useState(false);


    const currentUser = localStorage.getItem('currentUser');

    const removeCurrentUser = () => {
        localStorage.removeItem('currentUser');
    };

    console.log('Current User:', currentUser);


    const authInfo = {
        user, loading, setLoading, contentLoading, setContentLoading, currentUser, removeCurrentUser
    };



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;