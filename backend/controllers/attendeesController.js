import attendeeModel from '../models/attendeeModel.js';
import eventsModel from '../models/eventsModel.js';

// Create a new attendee
const addAttendee = async (req, res) => {
  const { name, email } = req.body;

  try {
    const attendee = new attendeeModel({ name,email });
    await attendee.save();
    res.status(201).json({ success: true, message: 'Attendee Added' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all attendees
const getAllAttendees = async (req, res) => {
  try {
    const attendees = await attendeeModel.find();
    res.status(200).json({ success: true, attendees });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove an attendee
const removeAttendee = async (req, res) => {
  const { id } = req.params;

  try {
    const attendee = await attendeeModel.findByIdAndDelete(id);
    if (!attendee) {
      return res.status(404).json({ success: false, message: 'Attendee not found' });
    }
    res.status(200).json({ success: true, message: 'Attendee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Assign an attendee to an event
const assignAttendeeToEvent = async (req, res) => {
  const { eventId } = req.params;
  const { attendeeId } = req.body;

  try {
    const event = await eventsModel.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Add the attendee to the event's attendees list
    event.attendees.push(attendeeId);
    await event.save();

    res.status(200).json({ success: true, message: 'Attendee assigned to event' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { addAttendee, getAllAttendees, removeAttendee, assignAttendeeToEvent };
