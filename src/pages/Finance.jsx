import React from "react";
import { Link } from "react-router-dom";

export default function Finance() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Finance</h2>

      {/* Fees Section */}
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Fee Payment
        </h3>
        <p className="text-gray-600 mb-2">
          <span className="font-bold">Total Fees:</span> ₹1,00,000
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-bold">Paid:</span> ₹60,000
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-bold">Pending:</span> ₹40,000
        </p>

        {/* ✅ Pay Now Button */}
        <Link
          to="/payment"
          className="inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
        >
          Pay Now
        </Link>
      </div>

      {/* Scholarships Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Scholarship Details
        </h3>
        <p className="text-gray-600">
          You have received a <span className="font-bold">Merit Scholarship</span> 
          covering 25% of tuition fees.
        </p>
      </div>
    </div>
  );
}
