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
    // for session
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("currentUser", userEmail);

    // for existing code that still uses localStorage
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

      // auto-login after signup
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

    // Mark as logged in
    markLoggedIn(foundUser.email);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-pink-500 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          KLU ERP {mode === "login" ? "Login" : "Sign Up"}
        </h2>

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
            <p className="text-sm text-red-500 text-center">{message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
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
