import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { IoTrashOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";

const Task = ({ token }) => {
  const { eventId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [taskFormData, setTaskFormData] = useState({
    name: "",
    deadline: "",
    event: eventId,
    assignedAttendee: "",
  });
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch all tasks for the event
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        backendUrl + `/api/task/event/${eventId}`,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setTasks(response.data.tasks);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Fetch all attendees for the event
  const fetchAttendees = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/attendee/attendees`, {
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

  // Handle input field changes for task form
  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle task creation
  const createTask = async () => {
    const { name, deadline, assignedAttendee } = taskFormData;

    if (!name || !deadline || !assignedAttendee) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/task/create",
        { name, deadline, event: eventId, assignedAttendee },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchTasks();
        setTaskFormData({ name: "", deadline: "", assignedAttendee: "" });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Handle task status update
  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await axios.put(
        backendUrl + `/api/task/update-status/${taskId}`,
        { status },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchTasks();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        backendUrl + `/api/task/${taskId}`,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchTasks();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Fetch tasks and attendees when component mounts
  useEffect(() => {
    fetchTasks();
    fetchAttendees();
  }, [eventId, token]);

  return (
    <div className="task-management">
      <div className="header flex justify-between items-center">
        <p className="text-xl font-bold">Manage Tasks for Event</p>
      </div>

      <div className="task-form mt-4">
        <h3 className="text-lg font-semibold mb-2">Create New Task</h3>
        <div className="mb-2">
          <label>Task Name</label>
          <input
            type="text"
            name="name"
            value={taskFormData.name}
            onChange={handleTaskFormChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={taskFormData.deadline}
            onChange={handleTaskFormChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label>Assign Attendee</label>
          <select
            name="assignedAttendee"
            value={taskFormData.assignedAttendee}
            onChange={handleTaskFormChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Attendee</option>
            {attendees.map((attendee) => (
              <option key={attendee._id} value={attendee._id}>
                {attendee.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={createTask}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Task
        </button>
      </div>

      <div className="tasks mt-6">
        <h3 className="text-lg font-semibold mb-2">Task List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="task-card p-4 border rounded-md shadow-lg"
            >
              <h4 className="font-semibold">{task.name}</h4>
              <p>Assigned to: {task.assignedAttendee?.name || "N/A"}</p>
              <p>Status: {task.status}</p>
              <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => updateTaskStatus(task._id, "Completed")}
                  className="bg-yellow-500 text-white px-4 py-1 rounded"
                >
                  Mark as Completed
                </button>
                <IoTrashOutline
                  className="text-red-500 cursor-pointer"
                  onClick={() => deleteTask(task._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Task;
