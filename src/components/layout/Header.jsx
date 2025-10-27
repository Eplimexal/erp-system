import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn"); // clear flag
    navigate("/login"); // go back to login
  };

  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-3">
      <h1 className="text-xl font-semibold text-gray-700">ERP SYSTEM</h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
      >
        Logout
      </button>
    </header>
  );
}
 