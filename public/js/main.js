/* ============================================================
   🧭 SIDEBAR TOGGLE (For Mobile Only)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar = document.querySelector(".sidebar");

  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
});


/* ============================================================
   ✨ SMOOTH-LOAD EFFECTS
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("page-loaded");
});

/* ============================================================
   🔄 CHART AUTO-INIT FALLBACK
   Only runs if React didn't mount first (rare, but safe)
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (window.initDashboardCharts) {
    const hasDashboard = document.getElementById("dashboardPerformanceChart");
    if (hasDashboard) window.initDashboardCharts();
  }

  if (window.initAcademicsCharts) {
    const hasAcademic = document.getElementById("academicsAttendanceChart");
    if (hasAcademic) window.initAcademicsCharts(window.studentData);
  }
});
