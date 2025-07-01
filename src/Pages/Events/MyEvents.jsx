import React from 'react';
import useAuth from '../../Hooks/Auth/useAuth';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import MyEventCard from '../../components/Cards/MyEventCard';

const MyEvents = () => {

    const { currentUser } = useAuth();

    const axiosSecure = useAxiosSecure();
    const { data: myEvents = [], refetch } = useQuery({
        queryKey: ['myEvents', currentUser],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/myEvents/${currentUser}`);
            return data;
        },
        enabled: !!currentUser,
        refetchOnWindowFocus: false,
    });

    console.log('My Events:', myEvents);



    return (
        <div className='min-h-[calc(100dvh-80px)] mt-20 max-w-6xl mx-auto'>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full'>
                {
                    myEvents?.map((got, idx) => (<MyEventCard key={idx} data={got} />))
                }
            </div>
        </div>
    );
};

export default MyEvents;