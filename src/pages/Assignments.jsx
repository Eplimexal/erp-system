// src/pages/Assignments.jsx
import React, { useState } from "react";

// Dummy assignment list
const DUMMY_ASSIGNMENTS = [
  {
    id: 1,
    title: "DSA Assignment 3",
    course: "CSE201 — Data Structures",
    due: "29 Sept",
    description: `Implement Stack & Queue using Linked Lists and explain complexity for each operation.`,
  },
  {
    id: 2,
    title: "OS Mini Project",
    course: "CSE203 — Operating Systems",
    due: "03 Oct",
    description: `Simulate CPU Scheduling (FCFS, SJF, Priority). Show Gantt Charts and turnaround times.`,
  },
  {
    id: 3,
    title: "DBMS ER Diagram",
    course: "CSE205 — DBMS",
    due: "05 Oct",
    description: `Design a fully-labelled ER diagram for an e-commerce system, including relationships.`,
  },
];

export default function AssignmentsPage() {
  const [uploadStatus, setUploadStatus] = useState({});
  const [progress, setProgress] = useState({});
  const [submissions, setSubmissions] = useState({});
  const [modal, setModal] = useState(null); // modal content

  // Fake upload handler
  const handleUpload = (id, file) => {
    if (!file) return;

    // Reset state
    setUploadStatus((prev) => ({ ...prev, [id]: "uploading" }));
    setProgress((prev) => ({ ...prev, [id]: 0 }));

    // Fake progress bar animation
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 12;
      if (current >= 100) current = 100;
      setProgress((p) => ({ ...p, [id]: Math.floor(current) }));
      if (current >= 100) clearInterval(interval);
    }, 120);

    // Simulate API success/failure
    const delay = 800 + Math.random() * 700;
    const success = Math.random() > 0.2; // 80% success

    setTimeout(() => {
      setUploadStatus((prev) => ({
        ...prev,
        [id]: success ? "success" : "fail",
      }));

      if (success) {
        const entry = {
          fileName: file.name,
          timestamp: new Date().toLocaleString(),
          status: "submitted",
        };

        setSubmissions((prev) => ({
          ...prev,
          [id]: [entry, ...(prev[id] || [])],
        }));
      }
    }, delay);
  };

  const removeSubmission = (assignmentId, index) => {
    setSubmissions((prev) => {
      const updated = [...(prev[assignmentId] || [])];
      updated.splice(index, 1);
      return { ...prev, [assignmentId]: updated };
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <section className="rounded-xl bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 text-white p-5 shadow-md">
        <h1 className="text-xl sm:text-2xl font-semibold">Assignments</h1>
        <p className="text-indigo-50 text-xs mt-1">
          Submit your coursework & review past uploads.
        </p>
      </section>

      {/* ASSIGNMENT LIST */}
      <section className="space-y-4">
        {DUMMY_ASSIGNMENTS.map((a) => {
          return (
            <div key={a.id} className="card animate-fade-in-up space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-sm font-semibold">{a.title}</h2>
                  <p className="text-xs text-slate-600">{a.course}</p>
                  <p className="text-[11px] text-slate-500 mt-1">Due: {a.due}</p>
                </div>

                {/* Instructions button */}
                <button
                  onClick={() => setModal(a)}
                  className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-lg shadow-sm"
                >
                  View Instructions
                </button>
              </div>

              {/* Upload */}
              <div className="mt-2">
                <label className="text-xs font-medium">
                  Upload Submission
                </label>
                <input
                  type="file"
                  className="mt-1 w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50"
                  onChange={(e) => handleUpload(a.id, e.target.files[0])}
                />

                {/* Progress bar */}
                {uploadStatus[a.id] === "uploading" && (
                  <div className="w-full mt-2 bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 bg-indigo-600 transition-all"
                      style={{ width: `${progress[a.id] || 0}%` }}
                    ></div>
                  </div>
                )}

                {/* Upload result */}
                {uploadStatus[a.id] === "success" && (
                  <p className="text-[11px] text-emerald-600 mt-1">
                    ✔ Uploaded successfully
                  </p>
                )}

                {uploadStatus[a.id] === "fail" && (
                  <p className="text-[11px] text-red-600 mt-1">
                    ✘ Upload failed — try again
                  </p>
                )}
              </div>

              {/* Submission history */}
              {submissions[a.id]?.length > 0 && (
                <div className="mt-3 border-t pt-3">
                  <h3 className="text-[11px] uppercase font-semibold text-slate-500 mb-2">
                    Submission History
                  </h3>

                  <ul className="space-y-2 text-xs">
                    {submissions[a.id].map((s, i) => (
                      <li
                        key={i}
                        className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{s.fileName}</p>
                          <p className="text-[10px] text-slate-500">
                            {s.timestamp}
                          </p>
                        </div>

                        <button
                          onClick={() => removeSubmission(a.id, i)}
                          className="text-red-500 text-[11px] hover:underline"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* INSTRUCTIONS MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 animate-fade-in-up">
            <h2 className="text-lg font-semibold mb-2">{modal.title}</h2>
            <p className="text-xs text-indigo-700 font-medium mb-1">
              {modal.course}
            </p>
            <p className="text-xs text-slate-600">{modal.description}</p>

            <button
              onClick={() => setModal(null)}
              className="mt-5 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
