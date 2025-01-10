import express from 'express'
import { addEvent, deleteEvent, getAllEvent, getSingleEvent, updateEvent } from '../controllers/eventsController.js'

const eventRouter = express.Router()

eventRouter.post('/add-event', addEvent)
eventRouter.get('/events', getAllEvent)
eventRouter.get('/events/:id', getSingleEvent)
eventRouter.put('/events/:id', updateEvent)
eventRouter.delete('/events/:id', deleteEvent)

export default eventRouter