/* ============================================================
   🟦 GLOBAL CHART REGISTRY (prevents re-creation overlap)
============================================================ */
window._charts = {
  dashboard: null,
  academicsAttendance: null,
  academicsMarks: null,
};

/* ============================================================
   📊 DASHBOARD — Performance Trend Line Chart
============================================================ */
window.initDashboardCharts = function () {
  const canvas = document.getElementById("dashboardPerformanceChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Destroy old instance
  if (window._charts.dashboard) {
    window._charts.dashboard.destroy();
  }

  // Fake performance trend
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const data = [72, 75, 78, 80, 83, 85];

  window._charts.dashboard = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Performance Index",
          data,
          borderWidth: 2,
          tension: 0.3,
          fill: false,
          borderColor: "#6366f1",
          pointBackgroundColor: "#6366f1",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 10 } },
      },
    },
  });
};

/* ============================================================
   📘 ACADEMICS — Attendance Line Chart
============================================================ */
window.initAcademicsCharts = function (studentData) {
  // Fallback if no student data passed
  const courses = studentData?.courses || [
    { name: "DS", marks: 88, attendance: 95 },
    { name: "OS", marks: 82, attendance: 90 },
    { name: "DBMS", marks: 85, attendance: 91 },
  ];

  /* ---------------- ATTENDANCE LINE CHART ---------------- */
  const attCanvas = document.getElementById("academicsAttendanceChart");
  if (attCanvas) {
    const ctx = attCanvas.getContext("2d");

    if (window._charts.academicsAttendance) {
      window._charts.academicsAttendance.destroy();
    }

    // Generate fake 90-day attendance trend
    const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
    const values = labels.map(() => 85 + Math.random() * 10); // 85–95%

    window._charts.academicsAttendance = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Attendance %",
            data: values,
            borderColor: "#10b981",
            borderWidth: 2,
            tension: 0.25,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: false, min: 70, max: 100 } },
      },
    });
  }

  /* ---------------- MARKS BAR CHART ---------------- */
  const marksCanvas = document.getElementById("academicsMarksChart");
  if (marksCanvas) {
    const ctx = marksCanvas.getContext("2d");

    if (window._charts.academicsMarks) {
      window._charts.academicsMarks.destroy();
    }

    window._charts.academicsMarks = new Chart(ctx, {
      type: "bar",
      data: {
        labels: courses.map((c) => c.name),
        datasets: [
          {
            label: "Marks",
            data: courses.map((c) => c.marks || c.marks?.final || 80),
            backgroundColor: "#6366f1",
          },
        ],
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true, max: 100 } },
        plugins: {
          legend: { display: false },
        },
      },
    });
  }
};

/* ============================================================
   OPTIONAL: AUTO-INIT FOR NON-REACT FALLBACK
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("dashboardPerformanceChart")) {
    window.initDashboardCharts();
  }
});
