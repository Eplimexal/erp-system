import React from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentProfile, getCurrentRole } from "../../seedData";

export default function Header() {
  const navigate = useNavigate();
  const profile = getCurrentProfile();
  const role = getCurrentRole();

  const displayName = profile?.name || profile?.email || "User";

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <header className="bg-white/80 backdrop-blur shadow flex items-center justify-between px-6 py-3">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">ERP SYSTEM</h1>
        <p className="text-xs text-gray-500">KLU · Demo Portal</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end text-right">
          <span className="text-sm font-medium text-gray-800">
            {displayName}
          </span>
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {role}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
