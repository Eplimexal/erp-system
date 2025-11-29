import React from "react";
import { Link } from "react-router-dom";
import { getCurrentErpData, getCurrentRole } from "../seedData";

export default function Finance() {
  const erp = getCurrentErpData() || {};
  const role = getCurrentRole();

  const isAdmin = role === "admin";

  const finance = erp.finance || {
    total: 100000,
    paid: 60000,
    pending: 40000,
    scholarship: "Merit Scholarship · 25%",
    lastPaymentDate: "15 Aug 2025",
    nextDueDate: "10 Oct 2025",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Finance</h2>

      {/* Fees or admin overview */}
      <div className="bg-white shadow rounded-xl p-6 mb-4 animate-fade-in-up">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          {isAdmin ? "Campus Finance Overview" : "Fee Payment"}
        </h3>

        {isAdmin ? (
          <>
            <p className="text-gray-600 mb-1">
              <span className="font-bold">Total Collected:</span> ₹
              {(finance.totalCollected ?? 75000000).toLocaleString("en-IN")}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-bold">Pending:</span> ₹
              {(finance.totalPending ?? 12000000).toLocaleString("en-IN")}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Scholarships processed:</span>{" "}
              {finance.scholarshipsCount ?? 320}
            </p>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-1">
              <span className="font-bold">Total Fees:</span> ₹
              {finance.total.toLocaleString("en-IN")}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-bold">Paid:</span> ₹
              {finance.paid.toLocaleString("en-IN")}
            </p>
            <p className="text-gray-600 mb-3">
              <span className="font-bold">Pending:</span> ₹
              {finance.pending.toLocaleString("en-IN")}
            </p>

            <p className="text-sm text-gray-500 mb-2">
              Last payment on {finance.lastPaymentDate} · Next due{" "}
              {finance.nextDueDate}
            </p>

            <Link
              to="/payment"
              className="inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-transform duration-200 hover:-translate-y-0.5"
            >
              Pay Now
            </Link>
          </>
        )}
      </div>

      {!isAdmin && (
        <div className="bg-white shadow rounded-xl p-6 animate-fade-in-up">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Scholarship Details
          </h3>
          <p className="text-gray-600 text-sm">{finance.scholarship}</p>
        </div>
      )}
    </div>
  );
}
