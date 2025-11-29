import React from "react";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left rail */}
      <Sidebar />

      {/* Right content area */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
