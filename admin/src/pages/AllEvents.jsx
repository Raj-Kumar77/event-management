import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import { IoTrashOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { Link } from 'react-router-dom';

const AllEvents = ({ token }) => {
  const [list, setList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // For handling the selected event to update
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    attendees: []
  });

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/event/events');

      if (response.data.success) {
        setList(response.data.events);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeEvent = async (id) => {
    try {
      const response = await axios.delete(backendUrl + `/api/event/events/${id}`, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleUpdateClick = (event) => {
    setSelectedEvent(event); // Set the selected event for updating
    setFormData({
      name: event.name,
      description: event.description,
      location: event.location,
      date: event.date,
      attendees: event.attendees
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateEvent = async () => {
    const { name, description, location, date, attendees } = formData;
    try {
      const response = await axios.put(
        backendUrl + `/api/event/events/${selectedEvent._id}`,
        { name, description, location, date, attendees },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
        setSelectedEvent(null); // Close the form/modal after update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
    <div className='flex justify-between items-center'>
      <p className="mb-2">All Events List</p>
      <Link to='/add-event' className='border px-4 py-2 rounded mb-2 hover:bg-gray-600 hover:text-white'>+ Add New Event</Link>
    </div>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_2fr_2fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Name</b>
          <b>Description</b>
          <b>Location</b>
          <b>Date</b>
          <b className="text-center">Action</b>
        </div>

        {list.map((event, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_2fr_2fr_1fr] md:grid-cols-[1fr_3fr_2fr_2fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <p>{event.name}</p>
            <p>{event.description}</p>
            <p>{event.location}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-right md:text-center flex justify-center items-center">
              <span
                onClick={() => handleUpdateClick(event)}
                className="cursor-pointer text-blue-500 mr-2 text-xl me-3"
              >
                <BiEdit />
              </span>
              <span
                onClick={() => removeEvent(event._id)}
                className="cursor-pointer text-lg text-red-500"
              >
                <IoTrashOutline />
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Update Event Form (Can be a modal or inline form) */}
      {selectedEvent && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update Event</h2>
            <form>
              <div className="mb-4">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button
                type="button"
                onClick={updateEvent}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update Event
              </button>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AllEvents;
