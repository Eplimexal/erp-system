// src/pages/LibraryModule.jsx
import React from "react";
import { getCurrentErpData } from "../seedData";

/* ============================================
   📚 LIBRARY — NeoGlass OS Edition
============================================ */
export function LibraryPage() {
  const erp = getCurrentErpData() || {};
  const library = erp.library || {};
  const borrowed = library.borrowed || [];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <section className="rounded-xl bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 text-white p-5 shadow-md">
        <h1 className="text-xl sm:text-2xl font-semibold">Library</h1>
        <p className="text-indigo-50 text-xs mt-1">
          View borrowed books, digital resources, and history.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Borrowed Books */}
        <div className="card lg:col-span-2 animate-fade-in-up">
          <h3 className="font-semibold mb-2">Borrowed Books</h3>

          <ul className="space-y-2 text-xs">
            {borrowed.map((b, i) => (
              <li
                key={i}
                className="flex justify-between bg-slate-50 rounded-lg px-3 py-2"
              >
                <span className="font-medium text-slate-800">
                  {b.title}
                </span>
                <span className="text-[11px] text-slate-600">
                  Due: {b.due}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* E-books */}
        <div className="card animate-fade-in-up">
          <h3 className="font-semibold mb-2">Digital Library</h3>
          <p className="text-xs text-slate-600">
            E-books available:{" "}
            <span className="font-semibold text-indigo-700">
              {library.ebooksCount ?? 0}
            </span>
          </p>
          <button className="mt-3 w-full py-2 bg-indigo-600 text-white rounded text-xs">
            Browse Collection
          </button>
        </div>
      </div>

      {/* History */}
      {library.history && (
        <div className="card animate-fade-in-up">
          <h3 className="font-semibold mb-2">Reading History</h3>
          <ul className="text-xs space-y-1">
            {library.history.map((book, i) => (
              <li key={i} className="bg-slate-50 rounded px-3 py-1">
                {book}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ============================================
   🎉 STUDENT LIFE — NeoGlass OS Edition
============================================ */
export function StudentLifePage() {
  const erp = getCurrentErpData() || {};
  const life = erp.studentLife || {};

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <section className="rounded-xl bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 text-white p-5 shadow-md">
        <h1 className="text-xl sm:text-2xl font-semibold">Student Life</h1>
        <p className="text-indigo-50 text-xs mt-1">
          Clubs, workshops, events & achievements.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Clubs */}
        <div className="card animate-fade-in-up">
          <h3 className="font-semibold mb-3">Clubs</h3>
          <div className="flex flex-wrap gap-2">
            {life.clubs?.map((club, i) => (
              <span
                key={i}
                className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-1 text-[11px] rounded-full"
              >
                {club}
              </span>
            ))}
          </div>
        </div>

        {/* Events */}
        <div className="card animate-fade-in-up">
          <h3 className="font-semibold mb-3">Upcoming Events</h3>
          <ul className="space-y-2 text-xs">
            {life.upcomingEvents?.map((e, i) => (
              <li
                key={i}
                className="rounded bg-slate-50 px-3 py-2 flex justify-between"
              >
                <span>{e.name}</span>
                <span className="text-[11px] text-slate-500">{e.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Workshops */}
        <div className="card animate-fade-in-up">
          <h3 className="font-semibold mb-3">Workshops</h3>
          <ul className="space-y-2 text-xs">
            {life.workshops?.map((w, i) => (
              <li
                key={i}
                className="rounded bg-slate-50 px-3 py-2 flex justify-between"
              >
                <span>{w.name}</span>
                <span className="text-[11px] text-slate-500">{w.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
