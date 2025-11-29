// src/pages/FinanceModule.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentErpData, getCurrentRole, getCurrentProfile } from "../seedData";

/* =====================================================
   💰 FINANCE PAGE — Updated for all 3 roles
====================================================== */
export function FinancePage() {
  const erp = getCurrentErpData() || {};
  const role = getCurrentRole();
  const profile = getCurrentProfile();

  const isStudent = role === "student";
  const isTeacher = role === "teacher";
  const isAdmin = role === "admin";

  /* ---------------- STUDENT FINANCE ---------------- */
  const studentFinance = erp.finance || {
    total: 100000,
    paid: 60000,
    pending: 40000,
    scholarship: "Merit Scholarship",
    lastPaymentDate: "15 Aug 2025",
    nextDueDate: "10 Oct 2025",
  };

  /* ---------------- TEACHER PAYROLL ---------------- */
  const teacherFinance = erp.teacherFinance || {
    monthlySalary: 72000,
    lastCredited: "31 Aug 2025",
    nextPayroll: "30 Sept 2025",
    pfStatus: "Active · UAN Linked",
    esiStatus: "Active",
    tds: "12% applied",
    reimbursements: [
      { title: "Conference Travel", amount: 3500, status: "Pending" },
      { title: "Lab Consumables", amount: 1200, status: "Approved" },
    ],
    salarySlips: [
      { month: "August 2025" },
      { month: "July 2025" },
      { month: "June 2025" },
    ],
    grants: {
      eligible: true,
      title: "Minor Research Project Funding",
      amount: "₹1,00,000",
      deadline: "15 Oct 2025",
    }
  };

  /* ---------------- ADMIN FINANCE ---------------- */
  const adminFinance = erp.finance || {
    totalCollected: 82000000,
    totalPending: 9500000,
    scholarshipsCount: 410,
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Finance</h1>

      {/* =====================================================
                           STUDENT VIEW
      ====================================================== */}
      {isStudent && (
        <>
          <div className="card animate-fade-in-up">
            <h3 className="text-xl font-semibold mb-3">Fee Payment</h3>

            <p>Total Fees: ₹{studentFinance.total}</p>
            <p>Paid: ₹{studentFinance.paid}</p>
            <p>Pending: ₹{studentFinance.pending}</p>
            <p className="text-sm text-gray-500">
              Last payment on {studentFinance.lastPaymentDate} · Next due{" "}
              {studentFinance.nextDueDate}
            </p>

            <Link
              to="/payment"
              className="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white rounded"
            >
              Pay Now
            </Link>
          </div>

          <div className="card animate-fade-in-up">
            <h3 className="font-semibold mb-2">Scholarship</h3>
            <p>{studentFinance.scholarship}</p>
          </div>
        </>
      )}

      {/* =====================================================
                           TEACHER VIEW
      ====================================================== */}
      {isTeacher && (
        <>
          {/* Salary Overview */}
          <div className="card animate-fade-in-up space-y-2">
            <h3 className="text-xl font-semibold mb-3">Salary Overview</h3>

            <p>
              <b>Monthly Salary:</b> ₹{teacherFinance.monthlySalary.toLocaleString("en-IN")}
            </p>
            <p>
              <b>Last Credited:</b> {teacherFinance.lastCredited}
            </p>
            <p>
              <b>Next Payroll:</b> {teacherFinance.nextPayroll}
            </p>

            <p className="text-sm text-gray-500">
              PF: {teacherFinance.pfStatus} · ESI: {teacherFinance.esiStatus}
            </p>
            <p className="text-sm text-gray-500">TDS: {teacherFinance.tds}</p>
          </div>

          {/* Salary Slips */}
          <div className="card animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-2">Salary Slips</h3>

            <ul className="space-y-2">
              {teacherFinance.salarySlips.map((s, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg"
                >
                  <span className="text-sm">{s.month}</span>
                  <button
                    onClick={() => alert("Download starting… (fake)")}
                    className="px-3 py-1 bg-indigo-600 text-white rounded text-xs"
                  >
                    Download
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Reimbursements */}
          <div className="card animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-2">Reimbursements</h3>

            <ul className="space-y-2">
              {teacherFinance.reimbursements.map((r, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-gray-500">₹{r.amount}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      r.status === "Pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Grant */}
          <div className="card animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-2">Research Grant Status</h3>
            {teacherFinance.grants.eligible ? (
              <>
                <p className="font-medium">
                  {teacherFinance.grants.title}
                </p>
                <p className="text-sm text-gray-700">
                  Amount: {teacherFinance.grants.amount}
                </p>
                <p className="text-xs text-gray-500">
                  Apply before {teacherFinance.grants.deadline}
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-500">No active grant eligibility</p>
            )}
          </div>
        </>
      )}

      {/* =====================================================
                           ADMIN VIEW
      ====================================================== */}
      {isAdmin && (
        <div className="card animate-fade-in-up">
          <h3 className="text-xl font-semibold mb-3">Campus Finance Overview</h3>

          <p>Total collected: <b>₹{adminFinance.totalCollected}</b></p>
          <p>Pending: <b>₹{adminFinance.totalPending}</b></p>
          <p>Scholarships processed: <b>{adminFinance.scholarshipsCount}</b></p>
        </div>
      )}
    </div>
  );
}

/* =====================================================
   💳 PAYMENT PAGE (Unchanged)
====================================================== */
export function PaymentPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Payment Successful!");
    navigate("/finance");
  };

  return (
    <div className="p-6">
      <div className="card max-w-lg mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">Payment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full px-4 py-2 border rounded-lg" placeholder="Card Holder Name" />
          <input className="w-full px-4 py-2 border rounded-lg" placeholder="Card Number" />
          <div className="flex gap-4">
            <input className="w-1/2 px-4 py-2 border rounded-lg" placeholder="MM/YY" />
            <input className="w-1/2 px-4 py-2 border rounded-lg" placeholder="CVV" />
          </div>
          <button className="w-full py-2 bg-green-600 text-white rounded">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
