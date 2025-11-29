// src/pages/Dashboard.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCurrentProfile,
  getCurrentErpData,
  getCurrentRole,
} from "../seedData";

export default function Dashboard() {
  // Init charts if your chart script is present
  useEffect(() => {
    if (window.initDashboardCharts) {
      window.initDashboardCharts();
    }
  }, []);

  const profile = getCurrentProfile();
  const erp = getCurrentErpData() || {};
  const role = getCurrentRole();

  const name = profile?.name || "User";

  const isStudent = role === "student";
  const isTeacher = role === "teacher";
  const isAdmin = role === "admin";

  // ====== STUDENT DATA (with rich defaults) ======
  const studentAcademics =
    erp.academics || {
      gpa: 8.7,
      overallAttendance: 92,
      semester: "III - CSE",
      courses: [
        {
          code: "CSE201",
          name: "Data Structures",
          attendance: 95,
          marks: 88,
        },
        {
          code: "CSE203",
          name: "Operating Systems",
          attendance: 90,
          marks: 82,
        },
        {
          code: "CSE205",
          name: "DBMS",
          attendance: 91,
          marks: 85,
        },
        {
          code: "MAT203",
          name: "Discrete Mathematics",
          attendance: 89,
          marks: 81,
        },
      ],
    };

  const studentFinance =
    erp.finance || {
      total: 110000,
      paid: 65000,
      pending: 45000,
      scholarship: "Merit + Sports: 30% tuition waiver",
      lastPaymentDate: "15 Aug 2025",
      nextDueDate: "10 Oct 2025",
    };

  const studentLibrary = erp.library || {
    borrowed: [
      { title: "Algorithms Unlocked", due: "28 Sept 2025" },
      { title: "AI Basics", due: "02 Oct 2025" },
      { title: "Clean Code", due: "12 Oct 2025" },
    ],
    ebooksCount: 18,
  };

  const studentLife = erp.studentLife || {
    clubs: ["Coding Club", "Robotics Club", "Drama Club", "Photography Club"],
    upcomingEvents: [
      { name: "Hackathon 2.0", date: "01 Oct 2025" },
      { name: "Drama Night", date: "03 Oct 2025" },
      { name: "Code Golf Evening", date: "08 Oct 2025" },
    ],
    workshops: [
      { name: "AI & ML Workshop", date: "05 Oct 2025" },
      { name: "Git & DevOps Bootcamp", date: "15 Oct 2025" },
    ],
  };

  const todaySchedule = [
    {
      time: "09:00 – 09:50",
      subject: "Data Structures",
      room: "C-302",
      type: "Lecture",
    },
    {
      time: "10:00 – 10:50",
      subject: "DBMS Lab",
      room: "Lab-5",
      type: "Lab",
    },
    {
      time: "14:00 – 14:50",
      subject: "Discrete Mathematics",
      room: "A-105",
      type: "Lecture",
    },
  ];

  const upcomingAssessments = [
    {
      course: "Data Structures",
      type: "Quiz",
      date: "29 Sept 2025",
      weight: "10%",
    },
    {
      course: "DBMS",
      type: "Midterm",
      date: "05 Oct 2025",
      weight: "25%",
    },
    {
      course: "Operating Systems",
      type: "Assignment",
      date: "07 Oct 2025",
      weight: "5%",
    },
  ];

  // ====== TEACHER DATA ======
  const teacherAcademics =
    erp.academics || {
      coursesHandled: [
        { code: "CSE201", name: "Data Structures", students: 62 },
        { code: "CSE305", name: "Advanced Algorithms", students: 48 },
        { code: "CSE401", name: "Competitive Programming", students: 40 },
      ],
      pendingEvaluations: 5,
    };

  const teacherLibrary = erp.library || {
    borrowed: [
      { title: "Research in Algorithms", due: "10 Oct 2025" },
      { title: "Distributed Systems", due: "19 Oct 2025" },
    ],
    ebooksCount: 32,
  };

  const teacherToday = [
    {
      time: "09:00 – 09:50",
      course: "CSE201 · Data Structures",
      room: "C-302",
      type: "Lecture",
    },
    {
      time: "11:00 – 12:30",
      course: "CSE305 · Advanced Algorithms",
      room: "Lab-3",
      type: "Lab",
    },
    {
      time: "14:00 – 15:00",
      course: "Project Reviews – Batch A",
      room: "Online · MS Teams",
      type: "Review",
    },
  ];

  const teacherTasks = [
    {
      label: "Evaluate DS Quiz 3",
      course: "CSE201",
      due: "28 Sept 2025",
      items: "62 scripts",
    },
    {
      label: "Upload midterm marks",
      course: "CSE305",
      due: "02 Oct 2025",
      items: "48 students",
    },
    {
      label: "Prepare slides – DP techniques",
      course: "CSE305",
      due: "30 Sept 2025",
      items: "Lecture week 6",
    },
  ];

  // ====== ADMIN DATA ======
  const adminOverview =
    erp.overview || {
      totalStudents: 1350,
      totalTeachers: 92,
      activeCourses: 72,
      departments: 10,
    };

  const adminFinance =
    erp.finance || {
      totalCollected: 82000000,
      totalPending: 9500000,
      scholarshipsCount: 410,
    };

  const adminAcademicStats =
    erp.academics || {
      averageGPA: 8.2,
      averageAttendance: 88,
      topDept: "CSE (AI & ML)",
      atRiskCount: 64,
    };

  const adminAlerts = [
    {
      type: "Finance",
      text: "Fee due reminders pending for 3rd year B.Tech.",
      severity: "medium",
    },
    {
      type: "Academics",
      text: "Attendance below 65% for 12 students in CSE.",
      severity: "high",
    },
    {
      type: "System",
      text: "Nightly backup completed successfully.",
      severity: "low",
    },
  ];

  // ====== Render helpers based on role ======
  const renderHeroSubtitle = () => {
    if (isStudent) {
      return "Overview of your academics, fees, and campus activity.";
    }
    if (isTeacher) {
      return "Snapshot of your classes, evaluations, and resources.";
    }
    if (isAdmin) {
      return "Campus-wide snapshot of academics and finance.";
    }
    return "Unified ERP overview.";
  };

  const firstName = name.split(" ")[0];

  return (
    <div className="space-y-6">
      {/* ============= HERO / HEADER ============= */}
      <section className="rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 text-white p-5 sm:p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] opacity-80 mb-1">
              {isStudent && "Student dashboard"}
              {isTeacher && "Faculty dashboard"}
              {isAdmin && "Admin overview"}
              {!isStudent && !isTeacher && !isAdmin && "KLU ERP"}
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {isStudent && `Welcome back, ${firstName} 👋`}
              {isTeacher && `Good to see you, Dr. ${firstName}`}
              {isAdmin && "ERP Control Center"}
              {!isStudent && !isTeacher && !isAdmin && "Dashboard"}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-indigo-50/90 max-w-xl">
              {renderHeroSubtitle()}
            </p>
          </div>

          {isStudent && (
            <div className="flex flex-col items-end gap-2">
              <Link
                to="/payment"
                className="inline-flex items-center px-4 py-2 rounded-full bg-white/95 text-indigo-700 text-xs sm:text-sm font-semibold shadow-sm hover:bg-white transition"
              >
                Pay fees online
              </Link>
              <span className="text-[11px] text-indigo-50/90">
                Pending: ₹{studentFinance.pending.toLocaleString("en-IN")} ·
                next due {studentFinance.nextDueDate}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ============= TOP STATS GRID ============= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="card animate-fade-in-up border border-indigo-50">
          {isStudent && (
            <>
              <p className="text-[11px] font-semibold text-indigo-600 uppercase mb-1">
                CGPA
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {studentAcademics.gpa?.toFixed(2) ?? "8.7"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Semester: {studentAcademics.semester || "III - CSE"}
              </p>
            </>
          )}

          {isTeacher && (
            <>
              <p className="text-[11px] font-semibold text-indigo-600 uppercase mb-1">
                Courses handled
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {teacherAcademics.coursesHandled?.length ?? 3}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Pending evaluations:{" "}
                <span className="font-semibold">
                  {teacherAcademics.pendingEvaluations ?? 0}
                </span>
              </p>
            </>
          )}

          {isAdmin && (
            <>
              <p className="text-[11px] font-semibold text-indigo-600 uppercase mb-1">
                Total students
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {adminOverview.totalStudents ?? 0}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Departments: {adminOverview.departments ?? 0}
              </p>
            </>
          )}
        </div>

        {/* Card 2 */}
        <div className="card animate-fade-in-up border border-emerald-50">
          {isStudent && (
            <>
              <p className="text-[11px] font-semibold text-emerald-600 uppercase mb-1">
                Attendance
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {studentAcademics.overallAttendance ?? 0}
                <span className="text-base font-medium text-slate-500">%</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Target: 75% · Safe zone ✅
              </p>
            </>
          )}

          {isTeacher && (
            <>
              <p className="text-[11px] font-semibold text-emerald-600 uppercase mb-1">
                Total students
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {teacherAcademics.coursesHandled
                  ?.reduce((acc, c) => acc + (c.students || 0), 0)
                  .toString() ?? "0"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Across all active courses
              </p>
            </>
          )}

          {isAdmin && (
            <>
              <p className="text-[11px] font-semibold text-emerald-600 uppercase mb-1">
                Average GPA
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {adminAcademicStats.averageGPA ?? 0}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Attendance: {adminAcademicStats.averageAttendance ?? 0}%
              </p>
            </>
          )}
        </div>

        {/* Card 3 */}
        <div className="card animate-fade-in-up border border-amber-50">
          {isStudent && (
            <>
              <p className="text-[11px] font-semibold text-amber-600 uppercase mb-1">
                Fee status
              </p>
              <p className="text-3xl font-bold text-slate-900">
                ₹{studentFinance.pending.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Total: ₹{studentFinance.total.toLocaleString("en-IN")} · Paid: ₹
                {studentFinance.paid.toLocaleString("en-IN")}
              </p>
            </>
          )}

          {isTeacher && (
            <>
              <p className="text-[11px] font-semibold text-amber-600 uppercase mb-1">
                Library resources
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {teacherLibrary.ebooksCount ?? 0}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                E-books in your teaching shelf
              </p>
            </>
          )}

          {isAdmin && (
            <>
              <p className="text-[11px] font-semibold text-amber-600 uppercase mb-1">
                Fee collections
              </p>
              <p className="text-3xl font-bold text-slate-900">
                ₹
                {(adminFinance.totalCollected ?? 0).toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Pending: ₹
                {(adminFinance.totalPending ?? 0).toLocaleString("en-IN")}
              </p>
            </>
          )}
        </div>

        {/* Card 4 */}
        <div className="card animate-fade-in-up border border-sky-50">
          {isStudent && (
            <>
              <p className="text-[11px] font-semibold text-sky-600 uppercase mb-1">
                Courses this semester
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {studentAcademics.courses?.length ?? 0}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Library books: {studentLibrary.borrowed?.length ?? 0} · E-books:{" "}
                {studentLibrary.ebooksCount ?? 0}
              </p>
            </>
          )}

          {isTeacher && (
            <>
              <p className="text-[11px] font-semibold text-sky-600 uppercase mb-1">
                Today&apos;s sessions
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {teacherToday.length}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Next: {teacherToday[0]?.course || "—"}
              </p>
            </>
          )}

          {isAdmin && (
            <>
              <p className="text-[11px] font-semibold text-sky-600 uppercase mb-1">
                Active courses
              </p>
              <p className="text-3xl font-bold text-slate-900">
                {adminOverview.activeCourses ?? 0}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Scholarships processed: {adminFinance.scholarshipsCount ?? 0}
              </p>
            </>
          )}
        </div>
      </section>

      {/* ============= CHART + TODAY SECTION ============= */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart card – line / bar chart placeholder */}
        <div className="card animate-fade-in-up lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-800">
              {isStudent && "Performance trend (demo line chart)"}
              {isTeacher && "Class attendance trend (demo chart)"}
              {isAdmin && "Fee collection trend (demo chart)"}
            </h2>
            <span className="text-[11px] text-slate-400">
              Last 6 months · interactive demo
            </span>
          </div>
          <div className="w-full h-64">
            {/* Use this ID in your JS to render a LINE/BAR chart instead of pie */}
            <canvas id="dashboardPerformanceChart"></canvas>
          </div>
        </div>

        {/* Today / alerts card */}
        <div className="card animate-fade-in-up">
          {isStudent && (
            <>
              <h2 className="text-sm font-semibold text-slate-800 mb-2">
                Today&apos;s schedule
              </h2>
              <ul className="space-y-2 text-xs text-slate-600">
                {todaySchedule.map((slot, i) => (
                  <li
                    key={i}
                    className="flex items-start justify-between rounded-lg bg-slate-50 px-3 py-2"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {slot.subject}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {slot.time} · {slot.room}
                      </p>
                    </div>
                    <span className="text-[10px] uppercase tracking-wide text-indigo-600 font-semibold">
                      {slot.type}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {isTeacher && (
            <>
              <h2 className="text-sm font-semibold text-slate-800 mb-2">
                Today&apos;s sessions
              </h2>
              <ul className="space-y-2 text-xs text-slate-600">
                {teacherToday.map((session, i) => (
                  <li
                    key={i}
                    className="rounded-lg bg-slate-50 px-3 py-2 flex flex-col gap-0.5"
                  >
                    <p className="font-semibold text-slate-800">
                      {session.course}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {session.time} · {session.room}
                    </p>
                    <span className="text-[10px] uppercase tracking-wide text-emerald-600 font-semibold">
                      {session.type}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {isAdmin && (
            <>
              <h2 className="text-sm font-semibold text-slate-800 mb-2">
                System alerts
              </h2>
              <ul className="space-y-2 text-xs">
                {adminAlerts.map((a, i) => {
                  let color =
                    a.severity === "high"
                      ? "bg-rose-50 text-rose-700 border-rose-100"
                      : a.severity === "medium"
                      ? "bg-amber-50 text-amber-700 border-amber-100"
                      : "bg-emerald-50 text-emerald-700 border-emerald-100";
                  return (
                    <li
                      key={i}
                      className={`rounded-lg border px-3 py-2 flex flex-col gap-0.5 ${color}`}
                    >
                      <span className="text-[10px] uppercase tracking-wide font-semibold">
                        {a.type}
                      </span>
                      <span className="text-[11px]">{a.text}</span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* ============= BOTTOM GRID (details) ============= */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: academics / tasks */}
        <div className="card animate-fade-in-up lg:col-span-2">
          {isStudent && (
            <>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-slate-800">
                  Upcoming academic items
                </h2>
                <Link
                  to="/exams"
                  className="text-[11px] font-semibold text-indigo-600 hover:underline"
                >
                  View exams
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs text-left border-separate border-spacing-y-1">
                  <thead className="text-[11px] uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-2 py-1">Course</th>
                      <th className="px-2 py-1">Type</th>
                      <th className="px-2 py-1">Date</th>
                      <th className="px-2 py-1">Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingAssessments.map((item, i) => (
                      <tr
                        key={i}
                        className="bg-slate-50 hover:bg-slate-100 transition"
                      >
                        <td className="px-2 py-1 font-medium text-slate-800">
                          {item.course}
                        </td>
                        <td className="px-2 py-1 text-slate-600">
                          {item.type}
                        </td>
                        <td className="px-2 py-1 text-slate-600">
                          {item.date}
                        </td>
                        <td className="px-2 py-1 text-slate-600">
                          {item.weight}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {isTeacher && (
            <>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-slate-800">
                  Pending tasks
                </h2>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {teacherTasks.map((task, i) => (
                  <li
                    key={i}
                    className="flex items-start justify-between rounded-lg bg-slate-50 px-3 py-2"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {task.label}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {task.course} · {task.items}
                      </p>
                    </div>
                    <span className="text-[11px] text-amber-600 font-semibold">
                      Due {task.due}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {isAdmin && (
            <>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-slate-800">
                  Academic overview
                </h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <li className="rounded-lg bg-slate-50 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    Top performing department
                  </p>
                  <p className="mt-1 font-semibold">
                    {adminAcademicStats.topDept || "CSE (AI & ML)"}
                  </p>
                </li>
                <li className="rounded-lg bg-slate-50 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    Students at risk
                  </p>
                  <p className="mt-1 font-semibold text-rose-600">
                    {adminAcademicStats.atRiskCount ?? 0}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    &lt; 65% attendance or GPA &lt; 6
                  </p>
                </li>
              </ul>
            </>
          )}
        </div>

        {/* Right: campus / clubs / quick links */}
        <div className="card animate-fade-in-up">
          {isStudent && (
            <>
              <h2 className="text-sm font-semibold text-slate-800 mb-2">
                Campus activity
              </h2>
              <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">
                Clubs you are part of
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {studentLife.clubs?.map((club, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 text-[11px] font-medium"
                  >
                    {club}
                  </span>
                ))}
              </div>

              <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">
                Upcoming events
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 mb-3">
                {studentLife.upcomingEvents?.map((e, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{e.name}</span>
                    <span className="text-[11px] text-slate-500">
                      {e.date}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">
                Workshops
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {studentLife.workshops?.map((w, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{w.name}</span>
                    <span className="text-[11px] text-slate-500">
                      {w.date}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {isTeacher && (
            <>
              <h2 className="text-sm font-semibold text-slate-800 mb-2">
                Quick teaching snapshot
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-700 mb-3">
                {teacherAcademics.coursesHandled?.map((c, i) => (
                  <li
                    key={i}
                    className="flex justify-between rounded-lg bg-slate-50 px-3 py-2"
                  >
                    <span>
                      {c.code} · {c.name}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {c.students} students
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">
                Borrowed from library
              </p>
              <ul className="space-y-1 text-xs text-slate-700">
                {teacherLibrary.borrowed?.map((b, i) => (
                  <li key={i}>
                    {b.title}{" "}
                    <span className="text-[11px] text-slate-500">
                      (Due: {b.due})
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {isAdmin && (
            <>
              <h2 className="text-sm font-semibold text-slate-800 mb-2">
                Quick links
              </h2>
              <ul className="space-y-2 text-xs text-slate-700">
                <li>
                  <span className="inline-flex rounded-full bg-indigo-50 text-indigo-700 px-2 py-1 text-[11px] font-semibold">
                    View fee defaulters list
                  </span>
                </li>
                <li>
                  <span className="inline-flex rounded-full bg-emerald-50 text-emerald-700 px-2 py-1 text-[11px] font-semibold">
                    Export academic summary
                  </span>
                </li>
                <li>
                  <span className="inline-flex rounded-full bg-amber-50 text-amber-700 px-2 py-1 text-[11px] font-semibold">
                    Configure notification rules
                  </span>
                </li>
              </ul>
              <p className="mt-3 text-[11px] text-slate-500">
                These are demo chips – you can later wire them to real admin
                routes like <code>/admin/users</code>, <code>/admin/fees</code>,
                etc.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
