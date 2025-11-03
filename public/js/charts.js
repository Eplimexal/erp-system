// adapted charts.js: exposes initAttendanceChart and initMarksChart
function createAttendanceChart() {
  const canvas = document.getElementById("attendanceChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (canvas._chartInstance) canvas._chartInstance.destroy();
  canvas._chartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Present", "Absent"],
      datasets: [{
        data: [window.studentData?.attendance?.present || 85, window.studentData?.attendance?.absent || 15],
        backgroundColor: ["#10b981", "#ef4444"]
      }]
    },
    options: { plugins: { legend: { position: "bottom" } } }
  });
}

function createMarksChart() {
  const canvas = document.getElementById("marksChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (canvas._marksChart) canvas._marksChart.destroy();
  // sample marks
  const labels = ['DS', 'OS', 'DBMS', 'AI'];
  const data = [78, 82, 74, 88];
  canvas._marksChart = new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ label: 'Marks', data }] },
    options: { scales: { y: { beginAtZero: true, max: 100 } } }
  });
}

// expose to window for React components to call after mount
window.initAttendanceChart = createAttendanceChart;
window.initMarksChart = createMarksChart;

// Auto-init on DOMContentLoaded for non-SPA fallback
document.addEventListener('DOMContentLoaded', () => {
  createAttendanceChart();
  createMarksChart();
});
 