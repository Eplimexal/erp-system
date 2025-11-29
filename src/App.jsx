import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Academics from "./pages/Academics";
import Finance from "./pages/Finance";
import Exams from "./pages/Exams";
import Library from "./pages/Library";
import StudentLife from "./pages/StudentLife";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

// ============================
// ROLE HELPERS
// ============================
function getCurrentUser() {
  try {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const email =
      sessionStorage.getItem("currentUser") ||
      localStorage.getItem("currentUser");
    if (!email) return null;
    return users.find(u => u.email === email) || null;
  } catch {
    return null;
  }
}

function ProtectedRoute({ children, allowed }) {
  const loggedIn = localStorage.getItem("loggedIn") === "true";

  if (!loggedIn) return <Navigate to="/login" replace />;

  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;

  // If allowed roles are specified, enforce them
  if (allowed && !allowed.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  function RoleDashboard() {
  const user = getCurrentUser();

  if (!user) return null;

  if (user.role === "teacher") return <div>Teacher Dashboard (Phase 3)</div>;
  if (user.role === "admin")   return <div>Admin Dashboard (Phase 3)</div>;

  return <Dashboard />; // default student dashboard
}

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Academics */}
      <Route
        path="/academics"
        element={
          <ProtectedRoute allowed={["student"]}>
            <MainLayout>
              <Academics />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Finance */}
      <Route
        path="/finance"
        element={
          <ProtectedRoute allowed={["student"]}>
            <MainLayout>
              <Finance />
           </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Payment */}
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Payment />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Exams */}
      <Route
        path="/exams"
        element={
          <ProtectedRoute allowed={["student"]}>
            <MainLayout>
             <Exams />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Library */}
      <Route
        path="/library"
        element={
          <ProtectedRoute allowed={["student"]}>
            <MainLayout>
              <Library />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Student Life */}
      <Route
        path="/studentlife"
        element={
          <ProtectedRoute allowed={["student"]}>
            <MainLayout>
              <StudentLife />
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


      <Route
        path="/teacher/classes"
        element={
          <ProtectedRoute allowed={["teacher"]}>
            <MainLayout>
              <div>Teacher Classes (Phase 3)</div>
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowed={["admin"]}>
            <MainLayout>
              <div>Admin User Management (Phase 3)</div>
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
