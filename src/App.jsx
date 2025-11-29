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
import AssignmentsPage from "./pages/Assignments.jsx";
import TimetablePage from "./pages/Timetable.jsx"; // ⭐ NEW

// Helpers
import { getCurrentUserEmail, getCurrentRole } from "./seedData.js";

function ProtectedRoute({ children, allowed }) {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  const currentEmail = getCurrentUserEmail();

  if (!loggedIn || !currentEmail) return <Navigate to="/login" replace />;

  if (allowed?.length) {
    const role = getCurrentRole();
    if (!allowed.includes(role)) return <Navigate to="/" replace />;
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

      {/* Academics */}
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

      {/* ⭐ NEW TIMETABLE ROUTE */}
      <Route
        path="/timetable"
        element={
          <ProtectedRoute allowed={["student"]}>
            <MainLayout>
              <TimetablePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Assignments */}
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

      {/* Campus */}
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

      {/* Tasks */}
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

      {/* Finance */}
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

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
