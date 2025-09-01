// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) onLogout();
    toast.success("Logged out successfully"); // ✅ toast on logout
    navigate("/"); // redirect to home after logout
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-800 text-white shadow-md">
      {/* Left side - Title */}
      <h1 className="text-xl font-bold">ClientDriven</h1>

      {/* Right side - User card */}
      {user ? (
        <div className="flex items-center space-x-4">
          <div className="bg-gray-700 px-4 py-2 rounded-lg shadow">
            <p className="font-medium">{user?.name || "User"}</p>
            <p className="text-sm text-gray-300">{user?.role || "Role"}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm font-medium"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-gray-300">Not logged in</p>
      )}
    </nav>
  );
};

export default Navbar;
