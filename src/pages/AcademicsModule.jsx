// src/pages/AcademicsModule.jsx
import React, { useEffect } from "react";
import { getCurrentErpData, getCurrentRole } from "../seedData";

/* ============================================
   📘 ACADEMICS — NeoGlass OS Edition
============================================ */
export function AcademicsPage() {
  const erp = getCurrentErpData() || {};
  const role = getCurrentRole();
  const isStudent = role === "student";
  const isTeacher = role === "teacher";

  const student = erp.academics || {};
  const teacher = erp.academics || {};

  // charts
  useEffect(() => {
    if (window.initAcademicsCharts) window.initAcademicsCharts(student);
  }, [student]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <section className="rounded-xl bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 text-white p-5 shadow-md">
        <h1 className="text-xl sm:text-2xl font-semibold">Academics</h1>
        <p className="text-indigo-50 text-xs mt-1">
          {isStudent
            ? "Track your academic metrics, trends, and course performance."
            : "Overview of courses handled, evaluations, and class trends."}
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ATTENDANCE TREND */}
        <div className="card lg:col-span-2 animate-fade-in-up">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Attendance Trend</h2>
            <span className="text-[11px] text-slate-500">
              90-day line chart
            </span>
          </div>
          <canvas id="academicsAttendanceChart" height="120"></canvas>
        </div>

        {/* PERFORMANCE BAR CHART */}
        <div className="card animate-fade-in-up">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Marks Overview</h2>
            <span className="text-[11px] text-slate-500">
              Subject-wise marks
            </span>
          </div>
          <canvas id="academicsMarksChart" height="120"></canvas>
        </div>
      </div>

      {/* COURSES */}
      <section className="card animate-fade-in-up">
        <h2 className="text-sm font-semibold mb-3">
          {isTeacher ? "Courses Handled" : "Your Courses"}
        </h2>

        {!isTeacher ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs border-separate border-spacing-y-1">
              <thead className="uppercase text-[11px] text-slate-500">
                <tr>
                  <th className="px-2 py-1">Code</th>
                  <th className="px-2 py-1">Subject</th>
                  <th className="px-2 py-1">Attendance</th>
                  <th className="px-2 py-1">Marks</th>
                </tr>
              </thead>
              <tbody>
                {student.courses?.map((c, i) => (
                  <tr
                    key={i}
                    className="bg-slate-50 hover:bg-slate-100 transition"
                  >
                    <td className="px-2 py-1 font-semibold">{c.code}</td>
                    <td className="px-2 py-1">{c.name}</td>
                    <td className="px-2 py-1">{c.attendance}%</td>
                    <td className="px-2 py-1">{c.marks.final ?? c.marks}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <ul className="space-y-2 text-xs">
            {teacher.coursesHandled?.map((c, i) => (
                <li
                    key={i}
                    className="flex justify-between rounded-lg bg-slate-50 px-3 py-2"
                >
                    <span>
                        {c.code} · {c.name}
                    </span>
                <span className="text-slate-600">{c.students} students</span>
            </li>
        ))}
        <p className="text-[11px] text-rose-600 mt-2">
            Pending evaluations: {teacher.pendingEvaluations}
        </p>
    </ul>
        )}
      </section>

      {/* SEMESTER SUMMARY */}
      {isStudent && (
        <section className="card animate-fade-in-up">
          <h2 className="text-sm font-semibold mb-2">
            Semester Summary
          </h2>
          <p className="text-xs text-slate-600">
            GPA:{" "}
            <span className="font-bold text-indigo-700">
              {student.gpa}
            </span>{" "}
            · Attendance:{" "}
            <span className="font-bold text-emerald-700">
              {student.overallAttendance}%
            </span>
          </p>
        </section>
      )}
    </div>
  );
}

/* ============================================
   📝 EXAMS — NeoGlass OS Edition
============================================ */
export function ExamsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 text-white p-5 shadow-md">
        <h1 className="text-xl sm:text-2xl font-semibold">Exams & Results</h1>
        <p className="text-indigo-50 text-xs mt-1">
          Upcoming assessments and detailed performance summary.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold mb-2">Upcoming Exams</h3>
          <ul className="text-xs space-y-1">
            <li>DSA Mid-2 — 25 Sept</li>
            <li>DBMS Lab Test — 28 Sept</li>
            <li>OS End-Lab — 02 Oct</li>
          </ul>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">Previous Semester</h3>
          <p className="text-xs">
            GPA: <b>8.7</b>
          </p>
          <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded text-xs">
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
}
