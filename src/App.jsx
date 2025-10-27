import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Academics from "./pages/Academics";
import Finance from "./pages/Finance";
import Exams from "./pages/Exams";
import Library from "./pages/Library";
import StudentLife from "./pages/StudentLife";
import Payment from "./pages/Payment";   // ✅ import Payment page
import Login from "./pages/Login";

function ProtectedRoute({ children }) {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  return loggedIn ? children : <Navigate to="/login" replace />;
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
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Academics */}
      <Route
        path="/academics"
        element={
          <ProtectedRoute>
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
          <ProtectedRoute>
            <MainLayout>
              <Finance />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ✅ Payment */}
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
          <ProtectedRoute>
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
          <ProtectedRoute>
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
          <ProtectedRoute>
            <MainLayout>
              <StudentLife />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
