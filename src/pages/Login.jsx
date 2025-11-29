import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter both email and password.");
      return;
    }

    const users = getUsers();

    if (mode === "signup") {
      const alreadyExists = users.some(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );

      if (alreadyExists) {
        setMessage("An account with this email already exists.");
        return;
      }

      const newUsers = [...users, { email, password }];
      saveUsers(newUsers);

      markLoggedIn(email);
      navigate("/");
      return;
    }

    // LOGIN MODE
    const foundUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (!foundUser) {
      setMessage("Invalid email or password.");
      return;
    }

    markLoggedIn(foundUser.email);
    navigate("/");
  };

  const useDemo = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setMessage(`Auto-filled demo account: ${demoEmail}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-500 p-4">

      {/* GLASS CARD */}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/20 
        border border-white/30 shadow-2xl rounded-2xl p-8 space-y-6 animate-fade-in-up">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            KLU ERP Portal
          </h2>
          <p className="text-indigo-100 text-sm mt-1">
            {mode === "login" 
              ? "Login with your account or use a demo account"
              : "Create a new student account"}
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/70 shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/70 shadow-sm
              focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-700"
          />

          {message && (
            <p className="text-sm text-center text-rose-500">{message}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 
              text-white font-semibold shadow-lg transition-transform 
              duration-200 hover:-translate-y-0.5"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        {/* DEMO ACCOUNTS */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 
          rounded-xl p-4 text-sm text-white space-y-3">
          <p className="font-semibold opacity-90">Quick Demo Accounts</p>

          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => useDemo("student@klu.edu", "student123")}
              className="w-full px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 
                border border-white/30 flex justify-between text-xs text-white"
            >
              <span>Student · student@klu.edu</span>
              <span className="font-mono">student123</span>
            </button>

            <button
              onClick={() => useDemo("teacher@klu.edu", "teacher123")}
              className="w-full px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 
                border border-white/30 flex justify-between text-xs text-white"
            >
              <span>Teacher · teacher@klu.edu</span>
              <span className="font-mono">teacher123</span>
            </button>

            <button
              onClick={() => useDemo("admin@klu.edu", "admin123")}
              className="w-full px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30
                border border-white/30 flex justify-between text-xs text-white"
            >
              <span>Admin · admin@klu.edu</span>
              <span className="font-mono">admin123</span>
            </button>
          </div>
        </div>

        {/* MODE SWITCH */}
        <div className="text-center text-sm text-white/80">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  setMode("signup");
                  setMessage("");
                }}
                className="text-white underline underline-offset-2 hover:opacity-80"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already registered?{" "}
              <button
                onClick={() => {
                  setMode("login");
                  setMessage("");
                }}
                className="text-white underline underline-offset-2 hover:opacity-80"
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
