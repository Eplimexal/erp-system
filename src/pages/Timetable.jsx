// src/pages/Timetable.jsx
import React, { useState } from "react";
import { timetableData } from "../timetableData";

export default function TimetablePage() {
  const semesters = Object.keys(timetableData);
  const [current, setCurrent] = useState(semesters[0]);

  const table = timetableData[current];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-2">Timetable</h1>
      <p className="text-sm text-slate-600">
        View weekly timetable for different semesters.
      </p>

      {/* Semester selector */}
      <div className="card p-4">
        <label className="text-sm font-medium">Choose Semester</label>
        <select
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          className="mt-2 px-3 py-2 border rounded-lg w-full"
        >
          {semesters.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Timetable grid */}
      <div className="card p-4 overflow-x-auto">
        <table className="min-w-full text-xs border-separate border-spacing-y-1">
          <thead className="text-[11px] uppercase text-slate-500">
            <tr>
              <th className="px-2 py-1">Day</th>
              {table.slots.map((slot, i) => (
                <th key={i} className="px-2 py-1">
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.days.map((row, i) => (
              <tr key={i} className="bg-slate-50">
                <td className="px-2 py-1 font-semibold">{row.day}</td>
                {row.classes.map((cls, j) => (
                  <td key={j} className="px-2 py-1 text-slate-700">
                    {cls || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
