import React from 'react';
import { CalendarDays, MapPin, Users, User } from 'lucide-react';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../Hooks/Auth/useAuth';
import toast from 'react-hot-toast';

const EventCard = ({ data, refetch }) => {
    const { eventTitle, name, eventDate, eventTime, location, description, attendeeCount, _id } = data;

    const { currentUser } = useAuth();

    const axiosSecure = useAxiosSecure();
    const { mutateAsync } = useMutation({
        mutationFn: async (joinData) => {
            const { data } = await axiosSecure.post(`/join_events/${joinData?.event_id}`, joinData);
            return data;
        },
        onSuccess: () => {
            toast.success('Successfully joined the event!');
            refetch();
        },
        onError: (error) => {
            console.error('Error joining event:', error);
        }
    });

    const handleJoinEvent = async (id) => {
        const joinData = {
            event_id: id,
            eventTitle: eventTitle,
            name: name,
            eventDate: eventDate,
            eventTime: eventTime,
            location: location,
            description: description,
            attendeeCount: attendeeCount + 1,
            attendee: currentUser
        };

        try {
            const response = await mutateAsync(joinData);
            console.log('Event joined successfully:', response);
        } catch (error) {
            console.error('Error joining event:', error);
        }

        console.log(id);
        await mutateAsync(joinData);

    };

    return (
        <div className="w-[340px] rounded-2xl bg-gradient-to-br from-white to-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200">
            {/* Header */}
            <div className="mb-3">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{eventTitle}</h2>
                <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    <span className="font-medium">{name}</span>
                </div>
            </div>

            {/* Info */}
            <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-2 text-indigo-500" />
                    <span>{eventDate} · {eventTime}</span>
                </div>
                <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                    <span>{location}</span>
                </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-5">
                {description.slice(0, 50)}{description.length > 50 ? '...' : ''}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between border-t pt-3 text-sm text-gray-500">
                <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1 text-green-500" />
                    <span>{attendeeCount} attending</span>
                </div>
                <button onClick={() => handleJoinEvent(_id)} className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition">
                    Join Event
                </button>
            </div>
        </div>
    );
};

export default EventCard;