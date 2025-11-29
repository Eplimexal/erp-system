import React, { useEffect } from "react";
import { getCurrentErpData, getCurrentRole } from "../seedData";

/* ============================
   📘 ACADEMICS PAGE
=============================== */
export function AcademicsPage() {
  useEffect(() => {
    if (window.initAttendanceChart) window.initAttendanceChart();
    if (window.initMarksChart) window.initMarksChart();
  }, []);

  const erp = getCurrentErpData() || {};
  const role = getCurrentRole();

  const isStudent = role === "student";
  const isTeacher = role === "teacher";

  const studentAcademics = erp.academics || {
    gpa: 8.5,
    overallAttendance: 90,
    courses: [
      { code: "CSE201", name: "Data Structures", attendance: 95, marks: 88 },
      { code: "CSE203", name: "Operating Systems", attendance: 90, marks: 82 },
      { code: "CSE205", name: "DBMS", attendance: 91, marks: 85 },
    ],
  };

  const teacherAcademics = erp.academics || {
    coursesHandled: [
      { code: "CSE201", name: "Data Structures", students: 62 },
      { code: "CSE305", name: "Advanced Algorithms", students: 48 },
    ],
    pendingEvaluations: 3,
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Academics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Attendance */}
        <div className="card animate-fade-in-up">
          <h3 className="font-semibold mb-2 text-gray-700">Attendance</h3>
          <canvas id="attendanceChart"></canvas>
        </div>

        {/* Marks */}
        <div className="card animate-fade-in-up">
          <h3 className="font-semibold mb-2 text-gray-700">Marks</h3>
          <canvas id="marksChart"></canvas>
        </div>

        {/* Courses */}
        <div className="card animate-fade-in-up">
          <h3 className="font-semibold mb-2 text-gray-700">
            {isTeacher ? "Courses Handled" : "Courses"}
          </h3>

          {isTeacher ? (
            <ul className="text-sm text-gray-600 space-y-1">
              {teacherAcademics.coursesHandled?.map((c) => (
                <li key={c.code} className="flex justify-between">
                  <span>{c.code} · {c.name}</span>
                  <span className="text-xs text-gray-500">{c.students} students</span>
                </li>
              ))}
              <li className="text-xs text-red-500 mt-2">
                Pending evaluations: {teacherAcademics.pendingEvaluations}
              </li>
            </ul>
          ) : (
            <ul className="text-sm text-gray-600 space-y-1">
              {studentAcademics.courses?.map((course) => (
                <li key={course.code} className="flex justify-between">
                  <span>{course.code} · {course.name}</span>
                  <span className="text-xs text-gray-500">
                    {course.attendance}% · {course.marks}%
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isStudent && (
        <div className="card animate-fade-in-up">
          <h3 className="font-semibold mb-2">Semester Summary</h3>
          <p className="text-sm text-gray-600">
            GPA: <b>{studentAcademics.gpa}</b> · Attendance: <b>{studentAcademics.overallAttendance}%</b>
          </p>
        </div>
      )}
    </div>
  );
}


/* ============================
   📝 EXAMS PAGE
=============================== */
export function ExamsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Exams</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Upcoming */}
        <div className="card">
          <h3 className="font-semibold mb-2">Upcoming Exams</h3>
          <ul>
            <li>Data Structures – 25th Sept</li>
            <li>DBMS – 28th Sept</li>
          </ul>
        </div>

        {/* Results */}
        <div className="card">
          <h3 className="font-semibold mb-2">Results</h3>
          <p>Last Semester GPA: <strong>8.5</strong></p>
          <button className="mt-3 py-2 bg-indigo-600 text-white rounded">
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
}
