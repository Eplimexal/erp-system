import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentErpData, getCurrentRole } from "../seedData";

/* =====================================================
   💰 FINANCE PAGE
====================================================== */
export function FinancePage() {
  const erp = getCurrentErpData() || {};
  const role = getCurrentRole();

  const isAdmin = role === "admin";

  const finance = erp.finance || {
    total: 100000,
    paid: 60000,
    pending: 40000,
    scholarship: "Merit Scholarship",
    lastPaymentDate: "15 Aug 2025",
    nextDueDate: "10 Oct 2025",
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Finance</h1>

      {/* Admin Finance */}
      <div className="card animate-fade-in-up">
        <h3 className="text-xl font-semibold mb-3">
          {isAdmin ? "Campus Finance Overview" : "Fee Payment"}
        </h3>

        {isAdmin ? (
          <>
            <p>Total collected: <b>₹{finance.totalCollected ?? 75000000}</b></p>
            <p>Pending: <b>₹{finance.totalPending ?? 12000000}</b></p>
            <p>Scholarships processed: <b>{finance.scholarshipsCount ?? 320}</b></p>
          </>
        ) : (
          <>
            <p>Total Fees: ₹{finance.total}</p>
            <p>Paid: ₹{finance.paid}</p>
            <p>Pending: ₹{finance.pending}</p>
            <p className="text-sm text-gray-500">
              Last payment on {finance.lastPaymentDate} · Next due {finance.nextDueDate}
            </p>

            <Link
              to="/payment"
              className="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white rounded"
            >
              Pay Now
            </Link>
          </>
        )}
      </div>

      {!isAdmin && (
        <div className="card animate-fade-in-up">
          <h3 className="font-semibold mb-2">Scholarship</h3>
          <p>{finance.scholarship}</p>
        </div>
      )}
    </div>
  );
}


/* =====================================================
   💳 PAYMENT PAGE
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
