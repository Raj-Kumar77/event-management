import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attendee'
}]
});


const eventsModel = mongoose.models.events || mongoose.model('events', eventSchema)
export default eventsModel
