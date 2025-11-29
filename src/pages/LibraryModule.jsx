import React from "react";
import { getCurrentErpData } from "../seedData";

/* ========================
   📚 LIBRARY PAGE
======================== */
export function LibraryPage() {
  const erp = getCurrentErpData() || {};
  const borrowed = erp.library?.borrowed || [
    { title: "Algorithms", due: "28 Sept" },
    { title: "AI Basics", due: "02 Oct" },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Library</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold mb-2">Borrowed Books</h3>
          <ul>
            {borrowed.map((b, i) => (
              <li key={i}>{b.title} (Due: {b.due})</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">E-Books</h3>
          <button className="mt-3 py-2 bg-indigo-600 text-white rounded">
            Browse Collection
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================
   🎉 STUDENT LIFE PAGE
======================== */
export function StudentLifePage() {
  const erp = getCurrentErpData() || {};
  const clubs = erp.studentLife?.clubs || ["Coding Club", "Robotics Club", "Drama Club"];
  const events = erp.studentLife?.upcomingEvents || [];
  const workshops = erp.studentLife?.workshops || [];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Student Life</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="card">
          <h3 className="font-semibold mb-2">Clubs</h3>
          <ul>{clubs.map((c, i) => <li key={i}>{c}</li>)}</ul>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">Events</h3>
          {events.map((e, i) => <p key={i}>{e.name} – {e.date}</p>)}
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">Workshops</h3>
          {workshops.map((w, i) => <p key={i}>{w.name} – {w.date}</p>)}
        </div>

      </div>
    </div>
  );
}
