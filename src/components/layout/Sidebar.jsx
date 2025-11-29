import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { getCurrentRole } from "../../seedData";

const SECTIONS = [
  {
    id: "overview",
    label: "Overview",
    items: [{ to: "/", label: "Dashboard" }],
  },
  {
    id: "academics",
    label: "Academics",
    items: [
      { to: "/academics", label: "Courses & Attendance" },
      { to: "/exams", label: "Exams & Results" },
    ],
  },
  {
    id: "campus",
    label: "Campus",
    items: [
      { to: "/library", label: "Library" },
      { to: "/studentlife", label: "Student Life" },
    ],
  },
  {
    id: "account",
    label: "Account",
    items: [
      { to: "/finance", label: "Fee & Finance" },
      { to: "/profile", label: "Profile" },
    ],
  },
];

export default function Sidebar() {
  const role = getCurrentRole();
  const [openSections, setOpenSections] = useState(() =>
    SECTIONS.reduce((acc, s) => {
      acc[s.id] = true;
      return acc;
    }, {})
  );

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="sidebar w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col">
      {/* Brand / header */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
            ERP
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              KLU ERP System
            </div>
            <div className="text-[11px] text-slate-500">Web demo instance</div>
          </div>
        </div>

        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 uppercase tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>{role || "student"} mode</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {SECTIONS.map((section) => {
          const isOpen = openSections[section.id];

          return (
            <div key={section.id} className="text-xs text-slate-500">
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-slate-100 text-[11px] font-semibold tracking-wide uppercase"
              >
                <span>{section.label}</span>
                <span
                  className={`transition-transform text-slate-400 ${
                    isOpen ? "rotate-0" : "-rotate-90"
                  }`}
                >
                  ▾
                </span>
              </button>

              {isOpen && (
                <ul className="mt-1 space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          [
                            "block rounded-md px-3 py-1.5 text-[13px] font-medium transition",
                            isActive
                              ? "bg-indigo-600 text-white shadow-sm"
                              : "text-slate-700 hover:bg-slate-100",
                          ].join(" ")
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer small text */}
      <div className="px-4 py-3 border-t border-slate-200 text-[10px] text-slate-400">
        <div>KLU ERP · Demo build</div>
        <div className="mt-0.5">Not connected to real campus data.</div>
      </div>
    </aside>
  );
}
