import React from "react";

export default function Payment() {
  const handlePayment = (e) => {
    e.preventDefault();
    alert("✅ Payment Successful!");
    window.location.href = "/finance"; // go back after payment
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Page</h2>
        <p className="text-gray-600 mb-6">
          Enter your details to complete the payment.
        </p>

        <form onSubmit={handlePayment} className="space-y-4">
          <input
            type="text"
            placeholder="Card Holder Name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <input
            type="text"
            placeholder="Card Number"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="MM/YY"
              required
              className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="text"
              placeholder="CVV"
              required
              className="w-1/2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
