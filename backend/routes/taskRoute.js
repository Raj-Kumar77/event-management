import express from 'express';
import { createTask, getTasksForEvent, updateTaskStatus, deleteTask } from '../controllers/taskController.js';

const taskRouter = express.Router();

// Create a new task
taskRouter.post('/tasks', createTask);

// Get tasks for a specific event
taskRouter.get('/tasks/:eventId', getTasksForEvent);

// Update task status
taskRouter.put('/tasks/:taskId/status', updateTaskStatus);

// Delete a task
taskRouter.delete('/tasks/:taskId', deleteTask);

export default taskRouter;
