// src/pages/Tasks.jsx
import React, { useState, useEffect } from "react";
import { getTasks, saveTasks } from "../seedData";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  // CREATE
  const addTask = () => {
    if (!newTask.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: newTask.trim(),
      done: false,
    };

    const updated = [...tasks, newEntry];
    setTasks(updated);
    saveTasks(updated);

    setNewTask("");
  };

  // UPDATE
  const startEditing = (task) => {
    setEditingTask(task);
    setEditText(task.title);
  };

  const saveEdit = () => {
    if (!editText.trim()) return;

    const updated = tasks.map((t) =>
      t.id === editingTask.id ? { ...t, title: editText.trim() } : t
    );

    setTasks(updated);
    saveTasks(updated);

    setEditingTask(null);
    setEditText("");
  };

  // DELETE
  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  // TOGGLE DONE
  const toggleDone = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTasks(updated);
    saveTasks(updated);
  };

  // ----------- UI START -----------
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* PAGE HEADER */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white p-5 shadow-md">
        <h1 className="text-2xl font-semibold tracking-tight">
          Tasks & Reminders
        </h1>
        <p className="text-sm opacity-90 mt-1">
          Manage your personal academic reminders here.
        </p>
      </div>

      {/* ADD NEW TASK */}
      <div className="card animate-fade-in-up p-5 space-y-3">
        <h2 className="text-sm font-semibold text-slate-700">
          Add New Task
        </h2>

        <div className="flex items-center gap-3">
          <input
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Enter a task... (ex: Submit OS assignment)"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* TASK LIST */}
      <div className="card animate-fade-in-up p-5">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">
          Your Tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="text-sm text-slate-500">No tasks yet. Add one above!</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2"
              >
                {/* LEFT: Checkbox + Title */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleDone(task.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />

                  <span
                    className={`text-sm ${
                      task.done
                        ? "line-through text-slate-400"
                        : "text-slate-700"
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                {/* RIGHT: Edit + Delete */}
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => startEditing(task)}
                    className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 hover:bg-indigo-200 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-2 py-1 rounded bg-rose-100 text-rose-700 hover:bg-rose-200 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* EDIT MODAL */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl space-y-4 animate-fade-in-up">
            <h2 className="text-lg font-semibold text-slate-800">
              Edit Task
            </h2>

            <input
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />

            <div className="flex justify-end gap-2 text-sm">
              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 bg-slate-200 rounded-lg hover:bg-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
