import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'events',
        required: true
    },
    assignedAttendee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendee'
    }
});

const taskModel = mongoose.model('Task', TaskSchema);

export default taskModel
