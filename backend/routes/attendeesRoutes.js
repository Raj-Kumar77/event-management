import express from 'express';
import { addAttendee, getAllAttendees, removeAttendee, assignAttendeeToEvent } from '../controllers/attendeesController.js';

const attendeeRouter = express.Router();

attendeeRouter.post('/attendees', addAttendee); 
attendeeRouter.get('/attendees', getAllAttendees);
attendeeRouter.delete('/attendees/:id', removeAttendee);
attendeeRouter.post('/event/assign-attendee/:eventId', assignAttendeeToEvent); 

export default attendeeRouter;
