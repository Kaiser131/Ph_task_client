import React from 'react';
import useAuth from '../../Hooks/Auth/useAuth';

const Home = () => {

    const { currentUser } = useAuth();
    console.log(currentUser);


    return (
        <div className='min-h-[100dvh]'>
            <h1>Welcome to the Home Page</h1>
        </div>
    );
};

export default Home;