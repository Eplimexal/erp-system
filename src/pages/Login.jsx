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
            Demo portal – use your own account or a demo one below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {message && (
            <p className="text-sm text-center text-red-500">{message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-transform duration-200 hover:-translate-y-0.5"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Demo accounts block */}
        <div className="mt-2 bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-gray-700 space-y-2">
          <p className="font-semibold">Quick demo accounts</p>
          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => useDemo("student@klu.edu", "student123")}
              className="w-full px-3 py-2 rounded-lg bg-white hover:bg-indigo-100 border border-indigo-100 flex items-center justify-between text-xs"
            >
              <span>Student · student@klu.edu</span>
              <span className="font-mono">student123</span>
            </button>
            <button
              type="button"
              onClick={() => useDemo("teacher@klu.edu", "teacher123")}
              className="w-full px-3 py-2 rounded-lg bg-white hover:bg-indigo-100 border border-indigo-100 flex items-center justify-between text-xs"
            >
              <span>Teacher · teacher@klu.edu</span>
              <span className="font-mono">teacher123</span>
            </button>
            <button
              type="button"
              onClick={() => useDemo("admin@klu.edu", "admin123")}
              className="w-full px-3 py-2 rounded-lg bg-white hover:bg-indigo-100 border border-indigo-100 flex items-center justify-between text-xs"
            >
              <span>Admin · admin@klu.edu</span>
              <span className="font-mono">admin123</span>
            </button>
          </div>
        </div>

        <div className="mt-2 text-center text-sm text-gray-600">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
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
                type="button"
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
