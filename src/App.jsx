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
import TasksPage from "./pages/Tasks.jsx";
import AssignmentsPage from "./pages/Assignments.jsx"; // ⭐ NEW

// Helpers
import { getCurrentUserEmail, getCurrentRole } from "./seedData.js";

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

function RoleDashboard() {
  return <Dashboard />;
}

export default function App() {
  return (
    <Routes>
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

      {/* ACADEMICS MODULE */}
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

      {/* ⭐ NEW — ASSIGNMENTS */}
      <Route
        path="/assignments"
        element={
          <ProtectedRoute allowed={["student"]}>
            <MainLayout>
              <AssignmentsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* CAMPUS */}
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

      {/* TASKS */}
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
