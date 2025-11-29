import React from "react";
import { NavLink } from "react-router-dom";
import { getCurrentRole } from "../../seedData";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/academics", label: "Academics" },
  { to: "/finance", label: "Finance" },
  { to: "/exams", label: "Exams" },
  { to: "/library", label: "Library" },
  { to: "/studentlife", label: "Student Life" },
  { to: "/profile", label: "Profile" },
];

export default function Sidebar() {
  const role = getCurrentRole();

  return (
    <aside className="sidebar w-64 bg-gradient-to-b from-black via-slate-900 to-gray-800 text-white p-6 animate-slide-in-left flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <div className="text-2xl font-bold tracking-wide">ERP System</div>
          <div className="text-xs opacity-80">Student Portal</div>
          <span className="inline-flex mt-2 px-2 py-1 text-[11px] rounded-full bg-white/10 border border-white/20 uppercase tracking-wide">
            {role} view
          </span>
        </div>

        <nav className="space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                [
                  "block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  "flex items-center justify-between",
                  isActive
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-100/90 hover:bg-white/10",
                ].join(" ")
              }
            >
              <span>{l.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-8 text-[11px] opacity-70">
        © ERP Demo · KLU
      </div>
    </aside>
  );
}
