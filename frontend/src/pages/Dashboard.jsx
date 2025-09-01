import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Trash2 } from "lucide-react"; // Importing the Trash2 icon

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: passedUser } = location.state || {};

  const [user, setUser] = useState(passedUser || null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/tasks/read", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (err) {
        console.error("Error fetching tasks", err);
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

    if (!token) {
      alert("You must be logged in to delete tasks.");
      return;
    }

    const response = await axios.delete(
      `http://localhost:3000/api/tasks/delete/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Remove deleted task from state to re-render UI
    setTasks(tasks.filter((task) => task._id !== id));
    alert(response.data.message); // show success message
  } catch (err) {
    if (err.response) {
      // The request was made and the server responded with a status code outside 2xx
      console.error("Server responded with:", err.response.data);
      alert(err.response.data.message); // show backend message
    } else if (err.request) {
      // The request was made but no response received
      console.error("No response received:", err.request);
      alert("Server did not respond. Try again later.");
    } else {
      // Something else happened
      console.error("Error deleting task:", err.message);
      alert("An error occurred. Try again.");
    }
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Greeting Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back,{" "}
            <span className="text-blue-600">{user?.name || "User"} 👋</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Here’s what you need to focus on today
          </p>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">
            Your Tasks
          </h2>

          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              No tasks found. Enjoy your free time 🎉
            </p>
          ) : (
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="relative p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow hover:shadow-md transition"
                >
                  {/* Trash Bin Delete Button at Top Right */}
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                    aria-label={`Delete task: ${task.title}`}
                  >
                    <Trash2 size={16} />
                  </button>

                  <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
                  {task.description && (
                    <p className="mt-2 text-sm text-gray-600">{task.description}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
