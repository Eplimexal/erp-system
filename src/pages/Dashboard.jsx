// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCurrentProfile,
  getCurrentErpData,
  getCurrentRole,
} from "../seedData";

export default function Dashboard() {
  useEffect(() => {
    if (window.initDashboardCharts) window.initDashboardCharts();
    if (window.initTeacherDashboardCharts) window.initTeacherDashboardCharts();
  }, []);

  /* ---------------------- BASICS ---------------------- */
  const profile = getCurrentProfile();
  const erp = getCurrentErpData() || {};
  const role = getCurrentRole();

  const name = profile?.name || "User";
  const department = profile?.department || "Faculty";

  const firstName = name.split(" ")[0];

  const isStudent = role === "student";
  const isTeacher = role === "teacher";
  const isAdmin = role === "admin";

  /* ---------------------- STUDENT ---------------------- */
  const studentAcademics = erp.academics || {
    gpa: 8.7,
    overallAttendance: 92,
    semester: "III - CSE",
    courses: [
      { code: "CSE201", name: "Data Structures", attendance: 95, marks: 88 },
      { code: "CSE203", name: "Operating Systems", attendance: 90, marks: 82 },
      { code: "CSE205", name: "DBMS", attendance: 91, marks: 85 },
    ],
  };

  const studentFinance = erp.finance || {
    pending: 45000,
    nextDueDate: "10 Oct 2025",
  };

  const studentLife = erp.studentLife || {
    clubs: ["Coding Club", "Robotics Club"],
    upcomingEvents: [
      { name: "Hackathon 2.0", date: "01 Oct" },
      { name: "Drama Night", date: "03 Oct" },
    ],
  };

  const todaySchedule = [
    { time: "09:00–09:50", subject: "Data Structures", room: "C-302" },
    { time: "10:00–10:50", subject: "DBMS Lab", room: "Lab-5" },
  ];

  const upcomingAssessments = [
    { course: "Data Structures", type: "Quiz", date: "29 Sept", weight: "10%" },
    { course: "DBMS", type: "Midterm", date: "05 Oct", weight: "25%" },
  ];

  /* ---------------------- TEACHER ---------------------- */
  const teacherAcademics = erp.teacherAcademics || {
    coursesHandled: [
      { code: "CSE201", name: "Data Structures", students: 62 },
      { code: "CSE305", name: "Algorithms", students: 48 },
    ],
    pendingEvaluations: 3,
  };

  const teacherToday = [
    {
      time: "09:00–09:50",
      course: "CSE201 · Data Structures",
      room: "C-302",
    },
    {
      time: "11:00–12:00",
      course: "CSE305 · Algorithms",
      room: "Lab-3",
    },
  ];

  const teacherTasks = [
    {
      label: "Evaluate DS Quiz 3",
      course: "CSE201",
      due: "28 Sept",
      items: "62 scripts",
    },
    {
      label: "Upload midterm marks",
      course: "CSE305",
      due: "02 Oct",
      items: "48 students",
    },
  ];

  /* ---------------------- ADMIN ---------------------- */
  const adminOverview = erp.overview || {
    totalStudents: 1350,
    totalTeachers: 92,
    activeCourses: 72,
    departments: 10,
  };

  const adminAcademicStats = erp.academics || {
    averageGPA: 8.2,
    averageAttendance: 88,
    topDept: "CSE (AI & ML)",
    atRiskCount: 64,
  };

  const adminAlerts = [
    {
      type: "Finance",
      text: "Fee reminders pending for 3rd year.",
      severity: "medium",
    },
    {
      type: "Academics",
      text: "Attendance below 65% for 12 students.",
      severity: "high",
    },
    { type: "System", text: "Nightly backup completed.", severity: "low" },
  ];

  /* ---------------------- HERO SUBTITLE ---------------------- */
  const renderHeroSubtitle = () => {
    if (isStudent)
      return "Overview of your academics, fees, and campus activity.";
    if (isTeacher)
      return `Teaching overview for the ${department} department.`;
    if (isAdmin) return "Campus-wide snapshot of academics and finance.";
    return "Unified ERP overview.";
  };

  /* ======================================================
                      RENDER UI
  ======================================================= */
  return (
    <div className="space-y-6">
      {/* ---------------------- HEADER ---------------------- */}
      <section className="rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 text-white p-5 shadow-md">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <p className="text-xs uppercase opacity-80 mb-1">
              {isStudent && "Student Dashboard"}
              {isTeacher && "Faculty Dashboard"}
              {isAdmin && "Admin Overview"}
            </p>

            <h1 className="text-2xl sm:text-3xl font-semibold">
              {isStudent && `Welcome back, ${firstName} 👋`}
              {isTeacher &&
                `Welcome back, Dr. ${firstName} — Department of ${department}`}
              {isAdmin && "ERP Control Center"}
            </h1>

            <p className="mt-1 text-xs text-indigo-50/90">{renderHeroSubtitle()}</p>
          </div>

          {/* STUDENT ONLY */}
          {isStudent && (
            <div className="flex flex-col items-end gap-2">
              <Link
                to="/payment"
                className="px-4 py-2 rounded-full bg-white/95 text-indigo-700 text-xs font-semibold shadow-sm"
              >
                Pay fees online
              </Link>
              <span className="text-[11px] text-indigo-50/90">
                Pending: ₹{studentFinance.pending.toLocaleString("en-IN")} · Next
                due {studentFinance.nextDueDate}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------- TOP STATS ---------------------- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="card animate-fade-in-up">
          {isStudent && (
            <>
              <p className="text-[11px] font-semibold text-indigo-600">CGPA</p>
              <p className="text-3xl font-bold">{studentAcademics.gpa}</p>
            </>
          )}

          {isTeacher && (
            <>
              <p className="text-[11px] font-semibold text-indigo-600">
                Courses Handled
              </p>
              <p className="text-3xl font-bold">
                {teacherAcademics.coursesHandled.length}
              </p>
              <p className="text-xs mt-1">
                Pending Evaluations: {teacherAcademics.pendingEvaluations}
              </p>
            </>
          )}

          {isAdmin && (
            <>
              <p className="text-[11px] text-indigo-600 font-semibold">
                Total Students
              </p>
              <p className="text-3xl font-bold">
                {adminOverview.totalStudents}
              </p>
            </>
          )}
        </div>

        {/* Card 2 */}
        <div className="card animate-fade-in-up">
          {isStudent && (
            <>
              <p className="text-[11px] text-emerald-600 font-semibold">
                Attendance
              </p>
              <p className="text-3xl font-bold">
                {studentAcademics.overallAttendance}%
              </p>
            </>
          )}

          {isTeacher && (
            <>
              <p className="text-[11px] text-emerald-600 font-semibold">
                Total Students
              </p>
              <p className="text-3xl font-bold">
                {teacherAcademics.coursesHandled.reduce(
                  (sum, c) => sum + c.students,
                  0
                )}
              </p>
            </>
          )}

          {isAdmin && (
            <>
              <p className="text-[11px] text-emerald-600 font-semibold">
                Average GPA
              </p>
              <p className="text-3xl font-bold">
                {adminAcademicStats.averageGPA}
              </p>
            </>
          )}
        </div>

        {/* Card 3 */}
        <div className="card animate-fade-in-up">
          {isStudent && (
            <>
              <p className="text-[11px] text-amber-600 font-semibold">
                Fee Status
              </p>
              <p className="text-3xl font-bold">
                ₹{studentFinance.pending.toLocaleString("en-IN")}
              </p>
            </>
          )}

          {isTeacher && (
            <>
              <p className="text-[11px] text-amber-600 font-semibold">
                Evaluations Pending
              </p>
              <p className="text-3xl font-bold">
                {teacherAcademics.pendingEvaluations}
              </p>
            </>
          )}

          {isAdmin && (
            <>
              <p className="text-[11px] text-amber-600 font-semibold">
                Collections
              </p>
              <p className="text-3xl font-bold">₹82,000,000</p>
            </>
          )}
        </div>

        {/* Card 4 */}
        <div className="card animate-fade-in-up">
          {isStudent && (
            <>
              <p className="text-[11px] text-sky-600 font-semibold">Courses</p>
              <p className="text-3xl font-bold">
                {studentAcademics.courses.length}
              </p>
            </>
          )}

          {isTeacher && (
            <>
              <p className="text-[11px] text-sky-600 font-semibold">
                Sessions Today
              </p>
              <p className="text-3xl font-bold">{teacherToday.length}</p>
            </>
          )}

          {isAdmin && (
            <>
              <p className="text-[11px] font-semibold text-sky-600">
                Active Courses
              </p>
              <p className="text-3xl font-bold">
                {adminOverview.activeCourses}
              </p>
            </>
          )}
        </div>
      </section>

      {/* ---------------------- TEACHER TODAY + CHART ---------------------- */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Performance Chart */}
        <div className="card lg:col-span-2">
          <h2 className="text-sm font-semibold mb-3">Performance Trend</h2>
          <div className="h-64">
            <canvas id="dashboardPerformanceChart" />
          </div>
        </div>

        {/* Teacher Today */}
        <div className="card">
          {isTeacher && (
            <>
              <h2 className="text-sm font-semibold mb-2">Today's Sessions</h2>
              <ul className="text-xs space-y-2">
                {teacherToday.map((t, i) => (
                  <li key={i} className="bg-slate-50 px-3 py-2 rounded-lg">
                    <p className="font-semibold">{t.course}</p>
                    <p className="text-[11px]">
                      {t.time} · {t.room}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}

          {isStudent && (
            <>
              <h2 className="text-sm font-semibold mb-2">Today</h2>
              <ul className="text-xs space-y-2">
                {todaySchedule.map((s, i) => (
                  <li key={i} className="bg-slate-50 px-3 py-2 rounded-lg">
                    <p className="font-semibold">{s.subject}</p>
                    <p className="text-[11px]">{s.time} · {s.room}</p>
                  </li>
                ))}
              </ul>
            </>
          )}

          {isAdmin && (
            <>
              <h2 className="text-sm font-semibold mb-2">System Alerts</h2>
              <ul className="text-xs space-y-2">
                {adminAlerts.map((a, i) => (
                  <li key={i} className="bg-slate-50 px-3 py-2 rounded-lg">
                    <p className="text-[10px] uppercase">{a.type}</p>
                    <p className="text-[11px]">{a.text}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* ---------------------- BOTTOM GRID ---------------------- */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LEFT PANEL */}
        <div className="card lg:col-span-2">
          {isTeacher && (
            <>
              <h2 className="text-sm font-semibold mb-2">Pending Tasks</h2>
              <ul className="text-xs space-y-2">
                {teacherTasks.map((t, i) => (
                  <li key={i} className="bg-slate-50 px-3 py-2 rounded-lg flex justify-between">
                    <div>
                      <p className="font-semibold">{t.label}</p>
                      <p className="text-[11px]">{t.course} · {t.items}</p>
                    </div>
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{t.due}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {isStudent && (
            <>
              <h2 className="text-sm font-semibold mb-2">Upcoming Items</h2>
              <table className="text-xs w-full">
                <tbody>
                  {upcomingAssessments.map((a, i) => (
                    <tr key={i} className="bg-slate-50">
                      <td className="px-2 py-1">{a.course}</td>
                      <td className="px-2 py-1">{a.type}</td>
                      <td className="px-2 py-1">{a.date}</td>
                      <td className="px-2 py-1">{a.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {isAdmin && (
            <>
              <h2 className="text-sm font-semibold mb-2">Academic Overview</h2>
              <ul className="text-xs space-y-1">
                <li className="bg-slate-50 px-3 py-2 rounded-lg">
                  Top department: {adminAcademicStats.topDept}
                </li>
                <li className="bg-slate-50 px-3 py-2 rounded-lg">
                  At-risk students: {adminAcademicStats.atRiskCount}
                </li>
              </ul>
            </>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="card">
          {isTeacher && (
            <>
              <h2 className="text-sm font-semibold mb-2">Quick Teaching Snapshot</h2>
              <ul className="text-xs space-y-1">
                {teacherAcademics.coursesHandled.map((c, i) => (
                  <li key={i} className="bg-slate-50 px-3 py-2 rounded-lg flex justify-between">
                    <span>{c.code} · {c.name}</span>
                    <span>{c.students} students</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {isStudent && (
            <>
              <h2 className="text-sm font-semibold mb-2">Campus Activity</h2>
              <p className="text-[11px] uppercase mb-1">Clubs</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {studentLife.clubs.map((c, i) => (
                  <span key={i} className="px-2 py-0.5 text-[11px] bg-indigo-50 text-indigo-700 rounded-full">
                    {c}
                  </span>
                ))}
              </div>
            </>
          )}

          {isAdmin && (
            <>
              <h2 className="text-sm font-semibold mb-2">Quick Links</h2>
              <ul className="text-xs">
                <li className="bg-indigo-50 px-3 py-2 rounded-lg mb-1">Fee Defaulters</li>
                <li className="bg-emerald-50 px-3 py-2 rounded-lg mb-1">Academic Summary</li>
                <li className="bg-amber-50 px-3 py-2 rounded-lg">Notification Rules</li>
              </ul>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
