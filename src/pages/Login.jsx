// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fakeApi } from "../utils/fakeApi";
import ReCAPTCHA from "react-google-recaptcha"; // ← CAPTCHA import

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [captchaToken, setCaptchaToken] = useState(null); // ← CAPTCHA state

  // Local storage helpers
  const getUsers = () => {
    try {
      const stored = localStorage.getItem("users");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const markLoggedIn = (userEmail) => {
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("currentUser", userEmail);

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", userEmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter both email and password.");
      return;
    }

    // 📌 CAPTCHA check
    if (!captchaToken) {
      setMessage("Please complete the CAPTCHA.");
      return;
    }

    // Fake API call
    setLoading(true);
    await fakeApi("/api/login", { email, password }, "POST");
    setLoading(false);

    const users = getUsers();

    // SIGNUP
    if (mode === "signup") {
      const exists = users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (exists) {
        setMessage("An account with this email already exists.");
        return;
      }

      saveUsers([...users, { email, password }]);
      markLoggedIn(email);
      navigate("/");
      return;
    }

    // LOGIN
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!found) {
      setMessage("Invalid email or password.");
      return;
    }

    markLoggedIn(found.email);
    navigate("/");
  };

  const useDemo = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setMessage(`Filled demo account: ${demoEmail}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 animate-fade-in-up">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-1 text-gray-800">
            KLU ERP {mode === "login" ? "Login" : "Sign Up"}
          </h2>
          <p className="text-xs text-gray-500">
            Use your account or try a demo account
          </p>
        </div>

        {loading && (
          <div className="text-center text-sm text-indigo-600">
            Contacting server…
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* CAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey= "6LcHPxwsAAAAACpXubNG4j92keLMy6c3a7WsAU40"
      
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>

          {message && (
            <p className="text-sm text-center text-red-500">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-transform disabled:opacity-50"
          >
            {loading ? "Please wait…" : mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        {/* DEMO ACCOUNTS */}
        <div className="mt-2 bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-gray-700 space-y-2">
          <p className="font-semibold">Quick demo accounts</p>

          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => useDemo("student@klu.edu", "student123")}
              className="w-full px-3 py-2 rounded-lg bg-white hover:bg-indigo-100 border border-indigo-100 flex items-center justify-between text-xs"
            >
              <span>Student</span>
              <span className="font-mono">student123</span>
            </button>

            <button
              onClick={() => useDemo("teacher@klu.edu", "teacher123")}
              className="w-full px-3 py-2 rounded-lg bg-white hover:bg-indigo-100 border border-indigo-100 flex items-center justify-between text-xs"
            >
              <span>Teacher</span>
              <span className="font-mono">teacher123</span>
            </button>

            <button
              onClick={() => useDemo("admin@klu.edu", "admin123")}
              className="w-full px-3 py-2 rounded-lg bg-white hover:bg-indigo-100 border border-indigo-100 flex items-center justify-between text-xs"
            >
              <span>Admin</span>
              <span className="font-mono">admin123</span>
            </button>
          </div>
        </div>

        <div className="mt-2 text-center text-sm text-gray-600">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setMode("signup");
                  setMessage("");
                }}
                className="text-indigo-600 hover:underline font-medium"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setMode("login");
                  setMessage("");
                }}
                className="text-indigo-600 hover:underline font-medium"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
