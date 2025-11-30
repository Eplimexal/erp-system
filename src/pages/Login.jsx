// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fakeApi } from "../utils/apiClient";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem("users")) || [];
    } catch {
      return [];
    }
  };

  const saveUsers = (u) => {
    localStorage.setItem("users", JSON.stringify(u));
  };

  const markLoggedIn = (email) => {
    sessionStorage.setItem("loggedIn", "true");
    localStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("currentUser", email);
    localStorage.setItem("currentUser", email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (!captchaToken) {
      setMessage("Please complete the CAPTCHA.");
      return;
    }

    setLoading(true);
    await fakeApi("/api/login", { email, password }, "POST");
    setLoading(false);

    const users = getUsers();

    if (mode === "signup") {
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        setMessage("Account already exists.");
        return;
      }
      saveUsers([...users, { email, password }]);
      markLoggedIn(email);
      navigate("/");
      return;
    }

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

  const useDemo = (mail, pass) => {
    setEmail(mail);
    setPassword(pass);
    setMessage(`Loaded demo account: ${mail}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-fade-in-up border border-slate-200">

        {/* HEADER */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-600 text-white font-semibold shadow">
            ERP
          </div>

          <h2 className="text-2xl font-bold mt-3 text-gray-800">
            {mode === "login" ? "Login to ERP" : "Create an Account"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Secure access to academics, finance & campus data
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center text-sm text-indigo-600">
            Contacting server…
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {/* CAPTCHA */}
          <div className="flex justify-center py-2">
            <ReCAPTCHA
              sitekey="6LcHPxwsAAAAACpXubNG4j92keLMy6c3a7WsAU40"
              onChange={(t) => setCaptchaToken(t)}
            />
          </div>

          {message && (
            <p className="text-sm text-center text-red-500">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loading
              ? "Please wait…"
              : mode === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        {/* DEMO ACCOUNTS */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 space-y-2 text-sm">
          <p className="font-semibold">Demo accounts</p>

          <button
            onClick={() => useDemo("student@klu.edu", "student123")}
            className="px-3 py-2 w-full rounded-lg bg-white border border-indigo-100 hover:bg-indigo-100 flex justify-between text-xs"
          >
            <span>Student</span>
            <span className="font-mono">student123</span>
          </button>

          <button
            onClick={() => useDemo("teacher@klu.edu", "teacher123")}
            className="px-3 py-2 w-full rounded-lg bg-white border border-indigo-100 hover:bg-indigo-100 flex justify-between text-xs"
          >
            <span>Teacher</span>
            <span className="font-mono">teacher123</span>
          </button>

          <button
            onClick={() => useDemo("admin@klu.edu", "admin123")}
            className="px-3 py-2 w-full rounded-lg bg-white border border-indigo-100 hover:bg-indigo-100 flex justify-between text-xs"
          >
            <span>Admin</span>
            <span className="font-mono">admin123</span>
          </button>
        </div>

        {/* MODE SWITCH */}
        <div className="text-center text-sm text-gray-600">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                className="text-indigo-600 hover:underline font-medium"
                onClick={() => {
                  setMode("signup");
                  setMessage("");
                }}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already registered?{" "}
              <button
                className="text-indigo-600 hover:underline font-medium"
                onClick={() => {
                  setMode("login");
                  setMessage("");
                }}
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
