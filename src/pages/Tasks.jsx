// src/pages/Tasks.jsx
import React, { useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { getCurrentUserEmail } from "../seedData";

export default function TasksPage() {
  const email = getCurrentUserEmail();
  const STORAGE_KEY = `tasks_${email}`;

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Local Storage Helpers
  // -----------------------------
  const loadTasks = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const saveTasks = (updated) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setTasks(updated);
  };

  // -----------------------------
  // Initial Load
  // -----------------------------
  useEffect(() => {
    setLoading(true);

    // Simulate backend fetch
    apiClient.request("/tasks", {}, "GET").then(() => {
      setTasks(loadTasks());
      setLoading(false);
    });
  }, []);

  // -----------------------------
  // CRUD Operations
  // -----------------------------
  const addTask = async () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      text: newTask.trim(),
      done: false,
    };

    setLoading(true);
    await apiClient.request("/tasks", task, "POST");
    setLoading(false);

    saveTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleDone = async (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );

    setLoading(true);
    await apiClient.request("/tasks", updated, "PUT");
    setLoading(false);

    saveTasks(updated);
  };

  const deleteTask = async (id) => {
    setLoading(true);
    await apiClient.request(`/tasks/${id}`, {}, "DELETE");
    setLoading(false);

    saveTasks(tasks.filter((t) => t.id !== id));
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Tasks</h1>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-sm text-indigo-600 animate-pulse">
          Updating…
        </div>
      )}

      {/* Add Task */}
      <div className="card p-4 space-y-3">
        <h3 className="font-semibold text-gray-700">Add new task</h3>

        <div className="flex gap-3">
          <input
            value={newTask}
            disabled={loading}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg"
            placeholder="Enter a note or reminder..."
          />

          <button
            onClick={addTask}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="card p-4 space-y-3">
        <h3 className="font-semibold text-gray-700">Your Reminders</h3>

        {tasks.length === 0 ? (
          <p className="text-sm text-gray-500">No tasks yet.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.done}
                    disabled={loading}
                    onChange={() => toggleDone(task.id)}
                  />

                  <span
                    className={`text-sm ${
                      task.done
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {task.text}
                  </span>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  disabled={loading}
                  className="text-xs text-red-600 hover:underline disabled:opacity-50"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
