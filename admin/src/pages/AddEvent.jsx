import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const Add = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [attendees, setAttendees] = useState(['']);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // Prepare data to be sent to the backend
        const eventData = {
            name,
            description,
            location,
            date: new Date(date).toISOString(),
            attendees: attendees.filter(attendee => attendee !== '') 
        };

        try {
            const response = await axios.post(backendUrl + '/api/event/add-event', eventData); 

            if (response.data.success) {
                toast.success(response.data.message);
                setName('');
                setDescription('');
                setLocation('');
                setDate('');
                setAttendees(['']);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to add event. Please try again.');
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>

            <div className='w-full'>
                <p className='mb-2'>Event Name</p>
                <input
                    className='w-full max-w-[500px] px-3 py-2'
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Type here'
                    required
                />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Event Description</p>
                <textarea
                    className='w-full max-w-[500px] px-3 py-2'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Write content here'
                    required
                />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Event Location</p>
                <input
                    className='w-full max-w-[500px] px-3 py-2'
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder='Type here'
                    required
                />
            </div>

            <div className='w-full'>
                <p className='mb-2'>Event Date</p>
                <input
                    className='w-full max-w-[500px] px-3 py-2'
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>


            <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>

        </form>
    );
};

export default Add;
