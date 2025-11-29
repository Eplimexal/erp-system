import React from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentProfile, getCurrentRole } from "../../seedData";

export default function Header() {
  const navigate = useNavigate();
  const profile = getCurrentProfile();
  const role = getCurrentRole();

  const displayName = profile?.name || profile?.email || "User";
  const initials =
    (displayName || "")
      .split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 bg-slate-50/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left side: title + subtitle */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white shadow-sm">
              K
            </span>
            <h1 className="text-sm sm:text-base font-semibold text-slate-800 tracking-tight">
              KLU ERP Portal
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500">
            Unified dashboard for academics, finance, and campus life.
          </p>
        </div>

        {/* Right side: user chip + logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 rounded-full bg-white/80 border border-slate-200 px-3 py-1 shadow-sm">
            <div className="h-7 w-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center">
              {initials}
            </div>
            <div className="leading-tight">
              <div className="text-xs font-medium text-slate-800 truncate max-w-[140px]">
                {displayName}
              </div>
              <div className="text-[10px] uppercase tracking-wide text-slate-500">
                {role || "student"} view
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-rose-500 text-white text-xs font-semibold shadow-sm hover:bg-rose-600 active:translate-y-[1px] transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
