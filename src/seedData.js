// src/seedData.js
// =======================================================
// Massive Demo Seed Data — Student + Teacher + Admin
// Blue/Teal Apple-like ERP Dataset
// =======================================================

// Utility: generate array of random values within range
function genRange(count, min, max) {
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

// Utility: generate daily attendance over 90 days
function generateAttendanceHistory() {
  const out = [];
  const today = new Date();

  for (let i = 0; i < 90; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    out.push({
      date: d.toISOString().split("T")[0],
      present: Math.random() > 0.1,
      percentage: Math.floor(Math.random() * 10) + 90,
    });
  }
  return out.reverse();
}

// =======================================================
// DEMO USERS
// =======================================================
const DEMO_USERS = [
  { email: "student@klu.edu", password: "student123", role: "student" },
  { email: "teacher@klu.edu", password: "teacher123", role: "teacher" },
  { email: "admin@klu.edu", password: "admin123", role: "admin" },
];

// =======================================================
// PROFILE DATA
// =======================================================
const DEMO_PROFILES = {
  "student@klu.edu": {
    email: "student@klu.edu",
    name: "Arjun Kumar",
    phone: "+91 98765 10101",
    age: "20",
    gender: "male",
    role: "student",
    department: "CSE",
    idNumber: "2200030001",
    locked: true,
  },

  "teacher@klu.edu": {
    email: "teacher@klu.edu",
    name: "Dr. Meera Rao",
    phone: "+91 98765 20202",
    age: "34",
    gender: "female",
    role: "teacher",
    department: "CSE (AI & ML)",
    idNumber: "FAC-1024",
    locked: true,
  },

  "admin@klu.edu": {
    email: "admin@klu.edu",
    name: "ERP Admin",
    phone: "+91 98765 30303",
    age: "29",
    gender: "other",
    role: "admin",
    department: "Administration",
    idNumber: "ADM-0001",
    locked: true,
  },
};

// =======================================================
// MAIN ERP DATA
// Adds "tasks" for student (CRUD target)
// =======================================================
const DEMO_ERP = {
  // ----------------------- STUDENT -----------------------
  "student@klu.edu": {
    role: "student",

    academics: {
      semester: "IV - CSE",
      gpa: 8.7,
      overallAttendance: 93,
      gpaTrend: [8.0, 8.2, 8.4, 8.6, 8.7, 8.8],
      courses: [
        {
          code: "CSE301",
          name: "Data Structures & Algorithms",
          faculty: "Dr. Vijay Rao",
          credits: 4,
          attendance: 96,
          marks: {
            mid1: 27,
            mid2: 26,
            assignments: [9, 8],
            quiz: 9,
            final: 78,
          },
        },
        {
          code: "CSE303",
          name: "Operating Systems",
          faculty: "Prof. Sravani",
          credits: 4,
          attendance: 94,
          marks: {
            mid1: 28,
            mid2: 25,
            assignments: [10, 10],
            quiz: 8,
            final: 80,
          },
        },
        {
          code: "CSE305",
          name: "Database Management Systems",
          faculty: "Dr. Hari",
          credits: 3,
          attendance: 92,
          marks: {
            mid1: 26,
            mid2: 24,
            assignments: [9, 9],
            quiz: 9,
            final: 75,
          },
        },
        {
          code: "CSE307",
          name: "Computer Networks",
          faculty: "Prof. Latha",
          credits: 3,
          attendance: 95,
          marks: {
            mid1: 25,
            mid2: 22,
            assignments: [10, 9],
            quiz: 8,
            final: 73,
          },
        },
      ],
      attendanceHistory: generateAttendanceHistory(),
    },

    finance: {
      total: 135000,
      paid: 90000,
      pending: 45000,
      scholarship: "Merit Scholarship (25% tuition waiver)",
      lastPaymentDate: "10 Jan 2025",
      nextDueDate: "15 Mar 2025",
      feeBreakup: {
        tuition: 95000,
        hostel: 25000,
        transport: 5000,
        lab: 5000,
        exam: 5000,
      },
      installments: [
        { label: "Installment 1", amount: 45000, paid: true },
        { label: "Installment 2", amount: 45000, paid: true },
        { label: "Installment 3", amount: 45000, paid: false },
      ],
      payments: [
        { id: "TXN-001", amount: 45000, date: "2025-01-10" },
        { id: "TXN-002", amount: 45000, date: "2024-10-10" },
        { id: "TXN-003", amount: 30000, date: "2024-07-05" },
      ],
    },

    library: {
      borrowed: [
        { title: "Algorithms Unlocked", due: "2025-02-20" },
        { title: "Design Patterns", due: "2025-03-01" },
      ],
      ebooksCount: 22,
      history: [
        "Clean Code",
        "Machine Learning Basics",
        "System Design Primer",
        "Advanced DBMS Concepts",
      ],
    },

    studentLife: {
      clubs: [
        "Coding Club",
        "Robotics Club",
        "Drama Club",
        "Cybersecurity Cell",
      ],
      achievements: [
        "Won 2nd place in Hackathon 2024",
        "Published ML research poster",
      ],
      upcomingEvents: [
        { name: "Tech Expo 2025", date: "2025-03-10" },
        { name: "Coding Marathon", date: "2025-03-22" },
      ],
      workshops: [
        { name: "Deep Learning Bootcamp", date: "2025-02-05" },
        { name: "Ethical Hacking Basics", date: "2025-02-10" },
      ],
    },

    // ⭐ NEW: PERSONAL TASKS (initial seed)
    tasks: [
      { id: 1, title: "Finish OS Assignment", done: false },
      { id: 2, title: "Prepare for DBMS quiz", done: true },
      { id: 3, title: "Buy record notebook", done: false },
    ],
  },

  // ----------------------- TEACHER -----------------------
  "teacher@klu.edu": {
    role: "teacher",
    academics: {
      coursesHandled: [
        {
          code: "CSE301",
          name: "Data Structures & Algorithms",
          students: 62,
          attendanceTrend: genRange(12, 85, 98),
        },
        {
          code: "CSE409",
          name: "Advanced Machine Learning",
          students: 48,
          attendanceTrend: genRange(12, 70, 93),
        },
      ],
      pendingEvaluations: 5,
      gradeDistribution: { A: 32, B: 41, C: 18, D: 5, F: 2 },
    },

    finance: {
      total: 0,
      paid: 0,
      pending: 0,
      note: "Salary processed monthly.",
    },

    library: {
      borrowed: [{ title: "Research in Algorithms", due: "2025-03-12" }],
      ebooksCount: 42,
    },

    studentLife: {
      clubsMentored: ["Coding Club", "Research Circle", "AI Innovation Hub"],
    },
  },

  // ----------------------- ADMIN -----------------------
  "admin@klu.edu": {
    role: "admin",
    overview: {
      totalStudents: 1450,
      totalTeachers: 112,
      activeCourses: 82,
    },
    academics: {
      averageGPA: 8.14,
      averageAttendance: 88,
      departmentPerformance: {
        CSE: 89,
        ECE: 86,
        MECH: 82,
        CIVIL: 80,
      },
    },
    finance: {
      totalCollected: 82000000,
      totalPending: 14000000,
      scholarshipsCount: 360,
    },
    systemLogs: ["Backup completed", "Fee portal updated", "New login detected"],
  },
};

// =======================================================
// SAFE PARSE
// =======================================================
function safeParse(json, fallback) {
  try {
    return json ? JSON.parse(json) : fallback;
  } catch {
    return fallback;
  }
}

// =======================================================
// AUTO-SEED
// =======================================================
(function seed() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem("demoSeeded") === "true") return;

  // Users
  const existingUsers = safeParse(localStorage.getItem("users"), []);
  const mergedUsers = [...existingUsers];
  DEMO_USERS.forEach((u) => {
    if (!mergedUsers.some((x) => x.email === u.email)) {
      mergedUsers.push({ email: u.email, password: u.password });
    }
  });
  localStorage.setItem("users", JSON.stringify(mergedUsers));

  // Profiles
  const existingProfiles = safeParse(localStorage.getItem("profiles"), {});
  const mergedProfiles = { ...DEMO_PROFILES, ...existingProfiles };
  localStorage.setItem("profiles", JSON.stringify(mergedProfiles));

  // ERP data
  const existingErp = safeParse(localStorage.getItem("erpData"), {});
  const mergedErp = { ...DEMO_ERP, ...existingErp };
  localStorage.setItem("erpData", JSON.stringify(mergedErp));

  localStorage.setItem("demoSeeded", "true");
})();

// =======================================================
// EXPORT HELPERS
// =======================================================
export function getCurrentUserEmail() {
  if (typeof window === "undefined") return "";
  return (
    sessionStorage.getItem("currentUser") ||
    localStorage.getItem("currentUser") ||
    ""
  );
}

export function getCurrentProfile() {
  const email = getCurrentUserEmail();
  const profiles = safeParse(localStorage.getItem("profiles"), {});
  return profiles[email] || null;
}

export function getCurrentErpData() {
  const email = getCurrentUserEmail();
  const erp = safeParse(localStorage.getItem("erpData"), {});
  return erp[email] || null;
}

export function getCurrentRole() {
  const profile = getCurrentProfile();
  if (profile?.role) return profile.role;

  const erp = getCurrentErpData();
  if (erp?.role) return erp.role;

  return "student";
}

// =======================================================
// ⭐ NEW TASK HELPERS (CRUD uses these)
// =======================================================
export function getTasks() {
  const email = getCurrentUserEmail();
  const erp = safeParse(localStorage.getItem("erpData"), {});
  return erp[email]?.tasks || [];
}

export function saveTasks(newTasks) {
  const email = getCurrentUserEmail();
  const erp = safeParse(localStorage.getItem("erpData"), {});
  if (!erp[email]) return;

  erp[email].tasks = newTasks;
  localStorage.setItem("erpData", JSON.stringify(erp));
}
