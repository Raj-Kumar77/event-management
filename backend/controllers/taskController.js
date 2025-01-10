import taskModel from '../models/taskModel.js';
import eventsModel from '../models/eventsModel.js';
import attendeeModel from '../models/attendeeModel.js';

// Create a new task
const createTask = async (req, res) => {
  const { name, deadline, event, assignedAttendee } = req.body;

  try {
    // Check if the event exists
    const eventExists = await eventsModel.findById(event);
    if (!eventExists) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    // Check if the attendee exists
    if (assignedAttendee) {
      const attendeeExists = await attendeeModel.findById(assignedAttendee);
      if (!attendeeExists) {
        return res.status(404).json({ success: false, message: 'Attendee not found' });
      }
    }

    // Create and save the new task
    const newTask = new taskModel({ name, deadline, event, assignedAttendee });
    await newTask.save();

    // Return success response
    res.status(201).json({ success: true, message: 'Task created successfully', task: newTask });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all tasks for an event
const getTasksForEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    // Find tasks associated with the event
    const tasks = await taskModel.find({ event: eventId }).populate('assignedAttendee', 'name email');
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ success: false, message: 'No tasks found for this event' });
    }

    // Return the tasks
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update the status of a task
const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    // Validate status value
    if (!['Pending', 'Completed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status. Must be "Pending" or "Completed"' });
    }

    // Find and update the task
    const updatedTask = await taskModel.findByIdAndUpdate(taskId, { status }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Return success response
    res.status(200).json({ success: true, message: 'Task status updated', task: updatedTask });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    // Find and delete the task
    const deletedTask = await taskModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Return success response
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export { createTask, getTasksForEvent, updateTaskStatus, deleteTask };
