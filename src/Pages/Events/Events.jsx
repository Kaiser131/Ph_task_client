import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import EventCard from '../../components/Cards/EventCard';
import { FaCalendar, FaCross, FaSearch } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

const Events = () => {

    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('');
    const [todayDate, setTodayDate] = useState('');
    const [dateRange, setDateRange] = useState('');

    // console.table(searchQuery, todayDate, dateRange);



    const { data = [], refetch } = useQuery({
        queryKey: ['events', searchQuery, todayDate, dateRange],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/events?search=${searchQuery}&date=${todayDate}&dateRange=${dateRange}`);
            return data;
        },
    });

    // console.log(data);

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const searchValue = form.search.value;
        setSearchQuery(searchValue);
        form.reset();
    };

    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    // console.log(formatted);


    return (
        <div className='min-h-[calc(100dvh-80px)] mt-20 max-w-6xl mx-auto'>
            {/* search  todays date filter*/}
            <div className='flex flex-col md:flex-row gap-3'>
                <form onSubmit={handleSearch} className='relative mb-6'>
                    <input name='search' type="text" placeholder="Search events by title..." className="w-full p-2 border border-gray-300 rounded-md" />
                    <button className='absolute right-5 top-1/2 transform -translate-y-1/2'><FaSearch /></button>
                </form>
                <div className='relative mb-6'>
                    <input type='date' onChange={(e) => setTodayDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <select className='border border-gray-300 rounded-md p-2' onChange={(e) => setDateRange(e.target.value)} >
                        <option selected disabled>Select a Date Range</option>
                        <option value="current_week">Current week</option>
                        <option value="last_week">Last week</option>
                        <option value="current_month">Current month</option>
                        <option value="last_month">Last month</option>
                    </select>
                </div>
                <div>
                    <button onClick={() => {
                        setSearchQuery('');
                        setTodayDate('');
                        setDateRange('');
                    }} className='flex items-center gap-1 px-2 py-2 border rounded-md border-gray-300'><span>Clear Filters</span> <RxCross2 /> </button>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full'>
                {
                    data?.map((got, idx) => (<EventCard refetch={refetch} key={idx} data={got} />))
                }
            </div>
        </div>
    );
};

export default Events;