import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';
import { IoTrashOutline } from "react-icons/io5";

const Attendee = ({ token }) => {
  const [attendees, setAttendees] = useState([]);
  const [newAttendee, setNewAttendee] = useState('');
  const [newAttendeeEmail, setNewAttendeeEmail] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null); // To assign attendees to an event
  const [events, setEvents] = useState([]);

  // Fetch all attendees
  const fetchAttendees = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/attendee/attendees', {
        headers: { token },
      });
      if (response.data.success) {
        setAttendees(response.data.attendees);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //   fetch all events 
  const fetchEvents = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/event/events', {
        headers: { token },
      });
      if (response.data.success) {
        setEvents(response.data.events); // Store events in the state
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Handle adding a new attendee
  const handleAddAttendee = async () => {
    if (!newAttendee || !newAttendeeEmail) {
      toast.error('Attendee name and email is required!');
      return;
    }
    try {
      const response = await axios.post(
        backendUrl + '/api/attendee/attendees',
        { name: newAttendee, email: newAttendeeEmail },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setNewAttendee('');
        fetchAttendees();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Handle removing an attendee
  const handleRemoveAttendee = async (id) => {
    try {
      const response = await axios.delete(
        backendUrl + `/api/attendee/attendees/${id}`,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchAttendees();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Assign attendee to an event
  const handleAssignAttendee = async (attendeeId) => {
    if (!selectedEvent) {
      toast.error('Please select an event!');
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + `/api/attendee/event/assign-attendee/${selectedEvent}`,
        { attendeeId },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAttendees();
    fetchEvents();
  }, []);

  return (
    <div>
      <div className=" mb-4">
        <div className='flex justify-between items-center'>
          <h2 className="text-xl font-bold">Attendee Management</h2>
          
        </div>
        <div className='flex gap-3 mt-2'>
          <input
            type="text"
            value={newAttendee}
            onChange={(e) => setNewAttendee(e.target.value)}
            className="px-4 py-2 border rounded"
            placeholder="New Attendee Name"
          />
          <input
            type="email"
            value={newAttendeeEmail}
            onChange={(e) => setNewAttendeeEmail(e.target.value)}
            className="px-4 py-2 border rounded"
            placeholder="New Attendee Email"
          />
          <button
            onClick={handleAddAttendee}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Add Attendee
          </button>
        </div>

      </div>

      <div className="mb-4">
        <label className="mr-2">Assign Attendees to Event:</label>
        <select
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">Select Event</option>
          {/* Render events dynamically here */}
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      <div className="border rounded-md p-4">
        <h3 className="text-lg font-semibold mb-2">Attendees</h3>
        <div className="flex flex-col gap-2">
          {attendees.map((attendee) => (
            <div key={attendee._id} className="flex justify-between items-center">
              <span>{attendee.name}</span>
              <span>{attendee.email}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAssignAttendee(attendee._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Assign to Event
                </button>
                <IoTrashOutline
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleRemoveAttendee(attendee._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendee;
