import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentProfile, getCurrentErpData, getCurrentRole } from "../seedData";

export default function Dashboard() {
  useEffect(() => {
    if (window.initAttendanceChart) window.initAttendanceChart();
  }, []);

  const profile = getCurrentProfile();
  const erp = getCurrentErpData() || {};
  const role = getCurrentRole();

  const name = profile?.name || "Welcome back";

  const finance = erp.finance || {
    total: 100000,
    paid: 60000,
    pending: 40000,
    scholarship: "Merit Scholarship",
  };

  const academics = (erp.academics || erp.overview || {
    gpa: 8.5,
    overallAttendance: 90,
  });

  const isStudent = role === "student";
  const isTeacher = role === "teacher";
  const isAdmin = role === "admin";

  return (
    <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-800">
            {isStudent && `Hello, ${name.split(" ")[0]} 👋`}
            {isTeacher && `Good to see you, ${name.split(" ")[0]}`}
            {isAdmin && `Admin Overview`}
          </h2>
          <p className="text-sm text-gray-500">
            {isStudent && "Track your academics, fees and campus life at a glance."}
            {isTeacher && "Stay on top of your classes, evaluations and students."}
            {isAdmin && "High level stats for the entire campus ERP."}
          </p>
        </div>

        {isStudent && (
          <Link
            to="/payment"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
          >
            Pay Fees
          </Link>
        )}
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Finance */}
        <div className="card animate-fade-in-up">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            {isAdmin ? "Total Collections" : "Fees Status"}
          </h3>
          {isAdmin ? (
            <>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                ₹{(erp.finance?.totalCollected ?? 75000000).toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                Pending: ₹
                {(erp.finance?.totalPending ?? 12000000).toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-green-600">
                Scholarships processed:{" "}
                {erp.finance?.scholarshipsCount ?? 320}
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                ₹{finance.pending.toLocaleString("en-IN")}{" "}
                <span className="text-xs font-normal text-gray-500">
                  pending
                </span>
              </p>
              <p className="text-xs text-gray-500">
                Total: ₹{finance.total.toLocaleString("en-IN")} · Paid: ₹
                {finance.paid.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-indigo-600 mt-2">
                {finance.scholarship}
              </p>
            </>
          )}
        </div>

        {/* Academics */}
        <div className="card animate-fade-in-up">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            {isTeacher ? "Courses Handled" : "Academics"}
          </h3>
          {isTeacher ? (
            <>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {erp.academics?.coursesHandled?.length ?? 2}{" "}
                <span className="text-xs font-normal text-gray-500">
                  active courses
                </span>
              </p>
              <p className="text-xs text-gray-500">
                Pending evaluations:{" "}
                <span className="font-semibold">
                  {erp.academics?.pendingEvaluations ?? 3}
                </span>
              </p>
            </>
          ) : isAdmin ? (
            <>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {erp.academics?.averageGPA ?? 8.1}
              </p>
              <p className="text-xs text-gray-500">
                Average GPA · Attendance:{" "}
                {erp.academics?.averageAttendance ?? 89}%
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                GPA {academics.gpa ?? 8.5}
              </p>
              <p className="text-xs text-gray-500">
                Overall attendance:{" "}
                <span className="font-semibold">
                  {academics.overallAttendance ?? 90}%
                </span>
              </p>
              {academics.semester && (
                <p className="text-xs text-gray-500 mt-1">
                  {academics.semester}
                </p>
              )}
            </>
          )}
        </div>

        {/* Overview */}
        <div className="card animate-fade-in-up">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            {isAdmin ? "Campus Overview" : "Quick Summary"}
          </h3>
          {isAdmin ? (
            <ul className="text-xs text-gray-600 space-y-1">
              <li>
                Students:{" "}
                <span className="font-semibold">
                  {erp.overview?.totalStudents ?? 1200}
                </span>
              </li>
              <li>
                Teachers:{" "}
                <span className="font-semibold">
                  {erp.overview?.totalTeachers ?? 85}
                </span>
              </li>
              <li>
                Active Courses:{" "}
                <span className="font-semibold">
                  {erp.overview?.activeCourses ?? 64}
                </span>
              </li>
            </ul>
          ) : (
            <ul className="text-xs text-gray-600 space-y-1">
              <li>Profile status: ✅ completed</li>
              <li>Library books: {erp.library?.borrowed?.length ?? 2} borrowed</li>
              <li>E-books: {erp.library?.ebooksCount ?? 10} in your shelf</li>
            </ul>
          )}
        </div>
      </div>

      {/* Attendance chart */}
      <div className="card animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Attendance</h3>
          <span className="text-xs text-gray-500">
            Interactive demo chart
          </span>
        </div>
        <div className="w-full max-w-md h-64 mx-auto">
          <canvas id="attendanceChart"></canvas>
        </div>
      </div>

      {/* Quick links */}
      {isStudent && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/academics" className="card animate-fade-in-up">
            <h4 className="text-sm font-semibold mb-1">View academics</h4>
            <p className="text-xs text-gray-500">
              Check your courses, marks and detailed attendance.
            </p>
          </Link>
          <Link to="/library" className="card animate-fade-in-up">
            <h4 className="text-sm font-semibold mb-1">Library</h4>
            <p className="text-xs text-gray-500">
              See borrowed books and explore e-resources.
            </p>
          </Link>
          <Link to="/studentlife" className="card animate-fade-in-up">
            <h4 className="text-sm font-semibold mb-1">Campus life</h4>
            <p className="text-xs text-gray-500">
              Stay updated with clubs, events and workshops.
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
