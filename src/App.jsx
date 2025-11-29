import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.jsx";

import Dashboard from "./pages/Dashboard.jsx";

// IMPORT MERGED MODULES
import { AcademicsPage, ExamsPage } from "./pages/AcademicsModule.jsx";
import { FinancePage, PaymentPage } from "./pages/FinanceModule.jsx";
import { LibraryPage, StudentLifePage } from "./pages/LibraryModule.jsx";

import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";

import { getCurrentUserEmail, getCurrentRole } from "./seedData.js";

// ============================
// PROTECTED ROUTE
// ============================
function ProtectedRoute({ children, allowed }) {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  const currentEmail = getCurrentUserEmail();

  if (!loggedIn || !currentEmail) {
    return <Navigate to="/login" replace />;
  }

  if (allowed && allowed.length > 0) {
    const role = getCurrentRole();
    if (!allowed.includes(role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}

// ============================
// ROLE-AWARE DASHBOARD
// ============================
function RoleDashboard() {
  const role = getCurrentRole();

  if (role === "teacher") {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">Teacher Dashboard</h2>
        <p className="text-sm text-gray-600">
          Placeholder for teacher dashboard.
        </p>
      </div>
    );
  }

  if (role === "admin") {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
        <p className="text-sm text-gray-600">
          Placeholder for admin dashboard.
        </p>
      </div>
    );
  }

  return <Dashboard />;
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <RoleDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Academics Module */}
      <Route
        path="/academics"
        element={
          <ProtectedRoute allowed={["student"]}>
            <MainLayout>
              <AcademicsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/exams"
        element={
          <ProtectedRoute allowed={["student"]}>
            <MainLayout>
              <ExamsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Finance Module */}
      <Route
        path="/finance"
        element={
          <ProtectedRoute allowed={["student"]}>
            <MainLayout>
              <FinancePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <MainLayout>
              <PaymentPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Library Module */}
      <Route
        path="/library"
        element={
          <ProtectedRoute allowed={["student"]}>
            <MainLayout>
              <LibraryPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/studentlife"
        element={
          <ProtectedRoute allowed={["student"]}>
            <MainLayout>
              <StudentLifePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowed={["student", "teacher", "admin"]}>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
