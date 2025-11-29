import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    age: "",
    gender: "",
    role: "student", // student | teacher
    department: "",
    idNumber: "",
  });

  const [message, setMessage] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  // Helper to get current user email (ID)
  const getCurrentUserEmail = () => {
    return (
      sessionStorage.getItem("currentUser") ||
      localStorage.getItem("currentUser") ||
      ""
    );
  };

  const getProfiles = () => {
    try {
      const stored = localStorage.getItem("profiles");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const saveProfiles = (profiles) => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  };

  // Load profile on mount
  useEffect(() => {
    const currentEmail = getCurrentUserEmail();

    if (!currentEmail) {
      // not logged in, bounce to login
      navigate("/login");
      return;
    }

    const profiles = getProfiles();
    const existing = profiles[currentEmail];

    if (existing) {
      setForm({
        email: currentEmail,
        name: existing.name || "",
        phone: existing.phone || "",
        age: existing.age || "",
        gender: existing.gender || "",
        role: existing.role || "student",
        department: existing.department || "",
        idNumber: existing.idNumber || "",
      });
      const locked = Boolean(existing.locked);
      setIsLocked(locked);
      if (locked) {
        setMessage("Profile is locked and cannot be edited.");
      }
    } else {
      setForm((prev) => ({ ...prev, email: currentEmail }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    if (isLocked) return; // no editing once locked

    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLocked) {
      setMessage("Profile is locked and cannot be edited.");
      return;
    }

    const currentEmail = getCurrentUserEmail();
    if (!currentEmail) {
      navigate("/login");
      return;
    }

    const profiles = getProfiles();
    profiles[currentEmail] = {
      ...form,
      email: currentEmail,
      locked: true, // 🔒 mark as locked after first save
    };

    saveProfiles(profiles);
    setIsLocked(true);
    setMessage("Profile saved and locked. Further edits are not allowed.");
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow p-6 max-w-3xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          User Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email (read only, linked to account) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (ID)
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={isLocked}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none ${
                  isLocked ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={isLocked}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none ${
                  isLocked ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                disabled={isLocked}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none ${
                  isLocked ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="20"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                disabled={isLocked}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none bg-white ${
                  isLocked ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_say">Prefer not to say</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                disabled={isLocked}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none bg-white ${
                  isLocked ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                disabled={isLocked}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none ${
                  isLocked ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="CSE, ECE, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Number
              </label>
              <input
                type="text"
                name="idNumber"
                value={form.idNumber}
                onChange={handleChange}
                disabled={isLocked}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none ${
                  isLocked ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="University / Employee ID"
              />
            </div>
          </div>

          {message && (
            <p
              className={`text-sm mt-2 text-left ${
                isLocked ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}

          {!isLocked && (
            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
              >
                Save Profile
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
