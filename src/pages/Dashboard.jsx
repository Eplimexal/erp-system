import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  useEffect(() => {
    if (window.initAttendanceChart) window.initAttendanceChart();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

      {/* Stat Card with Pay Now */}
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Pending Fees
        </h3>
        <p className="text-gray-600 mb-4">₹40,000 pending</p>

        <Link
          to="/payment"
          className="inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
        >
          Pay Now
        </Link>
      </div>

      {/* Attendance Chart */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Attendance</h3>

        {/* ✅ Control the chart size */}
        <div className="w-full max-w-md h-64 mx-auto">
          <canvas id="attendanceChart"></canvas>
        </div>
      </div>
    </div>
  );
}
