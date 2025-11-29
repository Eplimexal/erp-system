// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout.jsx";

// Pages
import Dashboard from "./pages/Dashboard.jsx";
import { AcademicsPage, ExamsPage } from "./pages/AcademicsModule.jsx";
import { FinancePage, PaymentPage } from "./pages/FinanceModule.jsx";
import { LibraryPage, StudentLifePage } from "./pages/LibraryModule.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";

// ⭐ NEW — Tasks CRUD Page
import TasksPage from "./pages/Tasks.jsx";

// Helpers
import { getCurrentUserEmail, getCurrentRole } from "./seedData.js";


// ==========================================================
// PROTECTED ROUTE WRAPPER
// ==========================================================
function ProtectedRoute({ children, allowed }) {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  const currentEmail = getCurrentUserEmail();

  // Not logged in → redirect to login
  if (!loggedIn || !currentEmail) {
    return <Navigate to="/login" replace />;
  }

  // If allowed roles are specified → enforce role check
  if (allowed && allowed.length > 0) {
    const role = getCurrentRole();
    if (!allowed.includes(role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}


// ==========================================================
// ROLE-AWARE DASHBOARD WRAPPER
// (Currently: student, teacher, admin all use same Dashboard)
// ==========================================================
function RoleDashboard() {
  return <Dashboard />;
}


// ==========================================================
// MAIN APP ROUTES
// ==========================================================
export default function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTE */}
      <Route path="/login" element={<Login />} />

      {/* DASHBOARD */}
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

      {/* ACADEMICS */}
      <Route
        path="/academics"
        element={
          <ProtectedRoute allowed={["student", "teacher"]}>
            <MainLayout>
              <AcademicsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/exams"
        element={
          <ProtectedRoute allowed={["student", "teacher"]}>
            <MainLayout>
              <ExamsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* FINANCE */}
      <Route
        path="/finance"
        element={
          <ProtectedRoute allowed={["student", "teacher", "admin"]}>
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

      {/* CAMPUS MODULE */}
      <Route
        path="/library"
        element={
          <ProtectedRoute allowed={["student", "teacher"]}>
            <MainLayout>
              <LibraryPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/studentlife"
        element={
          <ProtectedRoute allowed={["student", "teacher"]}>
            <MainLayout>
              <StudentLifePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ⭐ NEW — TASKS CRUD MODULE */}
      <Route
        path="/tasks"
        element={
          <ProtectedRoute allowed={["student"]}>
            <MainLayout>
              <TasksPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* PROFILE */}
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

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
