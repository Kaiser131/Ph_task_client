import React, { useState } from 'react';

import * as Dialog from "@radix-ui/react-dialog"; // ✅ CORRECT IMPORT
import { Cross2Icon } from "@radix-ui/react-icons";
import "./styles.css"; // your custom styles
import useAxiosSecure from '../../Hooks/Axios/useAxiosSecure';
import { useMutation } from '@tanstack/react-query'; // Ensure you have react-query installed
import toast from 'react-hot-toast';




const UpdateModal = ({ data, refetch }) => {

    const { eventTitle, name, eventDate, eventTime, location, description, attendeeCount, _id } = data;

    const [update, setUpdate] = useState({});

    // console.table(update);
    const axiosSecure = useAxiosSecure();
    const { mutateAsync } = useMutation({
        mutationFn: async (updateData) => {
            const { data } = await axiosSecure.patch(`/events/${_id}`, updateData);
            return data;
        },
        onSuccess: () => {
            toast.success("Event updated successfully!");
            refetch();
        }
    });

    const handleUpdate = async () => {
        await mutateAsync(update);
        setUpdate({});
    };


    return (
        <div>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className="Button violet">Update</button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                        <Dialog.Title className="DialogTitle">Update the necessary information</Dialog.Title>
                        <Dialog.Description className="DialogDescription">
                            Make your changes here. Click save when you're done.
                        </Dialog.Description>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="name">
                                Event Title
                            </label>
                            <input
                                onChange={(e) => {
                                    setUpdate(prev => ({
                                        ...prev,
                                        eventTitle: e.target.value
                                    }));
                                }}

                                className="Input" name='eventTitle' defaultValue={eventTitle} />
                        </fieldset>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="name">
                                Name
                            </label>
                            <input
                                onChange={(e) => {
                                    setUpdate(prev => ({
                                        ...prev,
                                        name: e.target.value
                                    }));
                                }}

                                className="Input" name='name' defaultValue={name} />
                        </fieldset>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="username">
                                Event Date
                            </label>
                            <input
                                onChange={(e) => {
                                    setUpdate(prev => ({
                                        ...prev,
                                        eventDate: e.target.value
                                    }));
                                }}

                                type='date' className="Input" id="username" defaultValue={eventDate} />
                        </fieldset>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="username">
                                Event Time
                            </label>
                            <input
                                onChange={(e) => {
                                    setUpdate(prev => ({
                                        ...prev,
                                        eventTime: e.target.value
                                    }));
                                }}

                                type='time' className="Input" id="username" defaultValue={eventTime} />
                        </fieldset>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="username">
                                Location
                            </label>
                            <input
                                onChange={(e) => {
                                    setUpdate(prev => ({
                                        ...prev,
                                        location: e.target.value
                                    }));
                                }}

                                type='text' className="Input" id="username" defaultValue={location} />
                        </fieldset>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="username">
                                Description
                            </label>
                            <textarea
                                onChange={(e) => {
                                    setUpdate(prev => ({
                                        ...prev,
                                        description: e.target.value
                                    }));
                                }}
                                name="description" rows={4} className='Text_Area_Input outline-none px-4 py-2 border border-gray-300 rounded-md' defaultValue={description}></textarea>
                        </fieldset>

                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="username">
                                attendeeCount
                            </label>
                            <input
                                onChange={(e) => {
                                    setUpdate(prev => ({
                                        ...prev,
                                        attendeeCount: e.target.value
                                    }));
                                }}
                                type='number' className="Input" id="username" defaultValue={attendeeCount} />
                        </fieldset>

                        <div
                            style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
                        >
                            <Dialog.Close asChild>
                                <button onClick={handleUpdate} className="Button green">Save changes</button>
                            </Dialog.Close>
                        </div>
                        <Dialog.Close asChild>
                            <button className="IconButton" aria-label="Close">
                                <Cross2Icon />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default UpdateModal;