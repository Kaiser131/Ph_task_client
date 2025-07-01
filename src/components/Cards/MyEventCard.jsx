import React from 'react';
import { CalendarDays, MapPin, Users, User } from 'lucide-react';
import { RxCross2 } from 'react-icons/rx';
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import UpdateModal from '../Modal/UpdateModal';



const MyEventCard = ({ data, refetch }) => {
    const { eventTitle, name, eventDate, eventTime, location, description, attendeeCount } = data;

    const axiosSecure = useAxiosSecure();
    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/myEvents/${id}`);
            return data;
        },
        onSuccess: () => {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            refetch();
        }
    });

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                await mutateAsync(id);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="w-[340px] relative rounded-2xl bg-gradient-to-br from-white to-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200">
            {/* delete button */}
            <button onClick={() => handleDelete(data?._id)} className='absolute top-2 right-2 text-gray-500 hover:text-gray-800'>
                <RxCross2 />
            </button>


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
                {/* <button className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition">
                    Update
                </button> */}
                <div>
                    <UpdateModal refetch={refetch} data={data} />
                </div>
            </div>
        </div>
    );
};

export default MyEventCard;