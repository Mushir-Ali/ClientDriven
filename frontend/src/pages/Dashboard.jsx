import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Trash2, Plus, Edit2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: passedUser } = location.state || {};

  const [user, setUser] = useState(passedUser || null);
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [editingTask, setEditingTask] = useState(null); // For edit

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://clientdriven-backend-ey3f.onrender.com/api/tasks/read", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (err) {
        toast.error("Error fetching tasks");
      }
    };

    if (user) fetchTasks();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`https://clientdriven-backend-ey3f.onrender.com/api/tasks/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting task");
    }
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) {
      toast.error("Task title is required");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://clientdriven-backend-ey3f.onrender.com/api/tasks/create",
        { title: newTaskTitle, description: newTaskDesc },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([response.data.task, ...tasks]);
      setIsModalOpen(false);
      setNewTaskTitle("");
      setNewTaskDesc("");
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding task");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setNewTaskTitle(task.title);
    setNewTaskDesc(task.description || "");
    setIsModalOpen(true);
  };

  const handleUpdateTask = async () => {
    if (!newTaskTitle.trim()) {
      toast.error("Task title is required");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://clientdriven-backend-ey3f.onrender.com/api/tasks/update/${editingTask._id}`,
        { title: newTaskTitle, description: newTaskDesc },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update tasks list karke state ko update karo
      setTasks(tasks.map((t) => (t._id === editingTask._id ? response.data.task : t)));
      setIsModalOpen(false);
      setNewTaskTitle("");
      setNewTaskDesc("");
      setEditingTask(null);
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, <span className="text-blue-600">{user?.name || "User"} 👋</span>
            </h1>
            <p className="text-gray-500 mt-2">Here’s what you need to focus on today</p>
          </div>
          <button
            onClick={() => {
              setEditingTask(null);
              setNewTaskTitle("");
              setNewTaskDesc("");
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
          >
            <Plus size={18} /> Add Task +
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">Your Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No tasks found. Enjoy your free time 🎉</p>
          ) : (
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="relative p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow hover:shadow-md transition"
                >
                  {/* Delete button only for admins */}
                  {user?.role === "ADMIN" && (
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                      aria-label={`Delete task: ${task.title}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}

                  {/* Edit button only for creator - jisne wohi task banaya hoga */}
                  {(user?.role === "ADMIN" || task.createdBy.id === user?._id) && (
                    <button
                      onClick={() => handleEdit(task)}
                      className="absolute top-2 right-10 bg-blue-400 text-white rounded-full p-1 hover:bg-yellow-500 transition"
                      aria-label={`Edit task: ${task.title}`}
                    >
                      <Edit2 size={16} />
                    </button>
                  )}

                  <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
                  {task.description && (
                    <p className="mt-2 text-sm text-gray-600">{task.description}</p>
                  )}

                  {task.createdBy && (
                    <p className="mt-3 text-sm text-gray-500">
                      Created by: <span className="font-medium">{task.createdBy.name}</span> (
                      <span className="italic">{task.createdBy.role}</span>)
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/30 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">
              {editingTask ? "Edit Task" : "Add New Task"}
            </h2>

            <label className="block mb-2 text-gray-700">Task Title</label>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block mb-2 text-gray-700">Description</label>
            <textarea
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingTask(null);
                  setNewTaskTitle("");
                  setNewTaskDesc("");
                }}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={editingTask ? handleUpdateTask : handleAddTask}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                {editingTask ? "Update Task" : "Add Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
