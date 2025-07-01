import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import useAuth from '../../Hooks/Auth/useAuth';

const AddEvents = () => {

    const { currentUser } = useAuth();
    console.log(currentUser);




    const axiosSecure = useAxiosSecure();

    const { mutateAsync } = useMutation({
        mutationFn: async (eventData) => {
            const { data } = await axiosSecure.post('/event', eventData);
            return data;
        },
        onSuccess: () => {
            toast.success('Event added successfully!');
        }
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const eventTitle = form.eventTitle.value;
        const name = form.name.value;
        const eventDate = form.eventDate.value;
        const eventTime = form.eventTime.value;
        const location = form.location.value;
        const description = form.description.value;
        const attendeeCount = parseInt(form.attendeeCount.value) || 0;

        const eventsData =
        {
            eventTitle,
            name,
            eventDate,
            eventTime,
            location,
            description,
            attendeeCount: attendeeCount || 0,
            eventOwner: currentUser,
        };

        await mutateAsync(eventsData);
        form.reset();
    };


    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 pt-24">
            <div className="max-w-2xl mx-auto p-8 shadow-lg rounded-2xl">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Add New Event</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block font-medium">Event Title</label>
                        <input
                            type="text"
                            name="eventTitle"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block font-medium">Date</label>
                            <input
                                type="date"
                                name="eventDate"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block font-medium">Time</label>
                            <input
                                type="time"
                                name="eventTime"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium">Location</label>
                        <input
                            type="text"
                            name="location"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Description</label>
                        <textarea
                            name="description"
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Attendee Count</label>
                        <input
                            type="number"
                            name="attendeeCount"
                            placeholder='0'
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            min="0"
                        />
                    </div>

                    <div className="text-center pt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Add Event
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddEvents;