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
      present: Math.random() > 0.1, // 90% attendance
      percentage: Math.floor(Math.random() * 10) + 90, // 90–100%
    });
  }
  return out.reverse();
}

// =======================================================
//  DEMO USERS (login credentials)
// =======================================================
const DEMO_USERS = [
  { email: "student@klu.edu", password: "student123", role: "student" },
  { email: "teacher@klu.edu", password: "teacher123", role: "teacher" },
  { email: "admin@klu.edu", password: "admin123", role: "admin" },
];

// =======================================================
//  PROFILE DATA — Expanded metadata for all accounts
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
//  MAIN ERP DATA (Student, Teacher, Admin)
// =======================================================
const DEMO_ERP = {
  // =====================================================
  // STUDENT ERP
  // =====================================================
  "student@klu.edu": {
    role: "student",

    academics: {
      semester: "IV - CSE",
      gpa: 8.7,
      overallAttendance: 93,

      // 6-semester CGPA history (chart-ready)
      gpaTrend: [8.0, 8.2, 8.4, 8.6, 8.7, 8.8],

      // 8 Subjects
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
        {
          code: "CSE309",
          name: "Web Technologies",
          faculty: "Mr. Aditya",
          credits: 3,
          attendance: 91,
          marks: {
            mid1: 29,
            mid2: 28,
            assignments: [10, 10],
            quiz: 10,
            final: 85,
          },
        },
        {
          code: "CSE311",
          name: "AI & ML Foundations",
          faculty: "Dr. Lavanya",
          credits: 3,
          attendance: 90,
          marks: {
            mid1: 24,
            mid2: 23,
            assignments: [9, 8],
            quiz: 7,
            final: 70,
          },
        },
      ],

      // Attendance timeline for 90 days
      attendanceHistory: generateAttendanceHistory(),
    },

    finance: {
      total: 135000,
      paid: 90000,
      pending: 45000,
      scholarship: "Merit Scholarship (25% tuition waiver)",
      lastPaymentDate: "10 Jan 2025",
      nextDueDate: "15 Mar 2025",

      // Fee breakup
      feeBreakup: {
        tuition: 95000,
        hostel: 25000,
        transport: 5000,
        lab: 5000,
        exam: 5000,
      },

      // Installments (chart-ready)
      installments: [
        { label: "Installment 1", amount: 45000, paid: true },
        { label: "Installment 2", amount: 45000, paid: true },
        { label: "Installment 3", amount: 45000, paid: false },
      ],

      // Payment history
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

      // Borrow history
      history: [
        "Clean Code",
        "Machine Learning Basics",
        "System Design Primer",
        "Advanced DBMS Concepts",
        "Operating Systems Internals",
        "React.js Guide",
        "Python Deep Dive",
        "Linux Kernel Notes",
        "AI for Engineers",
        "Competitive Programming Handbook",
      ],
    },

    studentLife: {
      clubs: ["Coding Club", "Robotics Club", "Drama Club", "Cybersecurity Cell"],
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
  },

  // =====================================================
  // TEACHER ERP
  // =====================================================
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
        {
          code: "CSE305",
          name: "Advanced Algorithms",
          students: 50,
          attendanceTrend: genRange(12, 80, 96),
        },
      ],

      pendingEvaluations: 5,

      // Student grade distribution per batch
      gradeDistribution: {
        A: 32,
        B: 41,
        C: 18,
        D: 5,
        F: 2,
      },
    },

    finance: {
      total: 0,
      paid: 0,
      pending: 0,
      note: "Salary is processed via monthly payroll.",
      salaryHistory: [
        { month: "Jan", amount: 78000 },
        { month: "Dec", amount: 78000 },
        { month: "Nov", amount: 78000 },
      ],
    },

    library: {
      borrowed: [{ title: "Research in Algorithms", due: "2025-03-12" }],
      ebooksCount: 42,
      researchPapers: [
        "Neural Compression Techniques",
        "Graph Models in ML Systems",
        "Optimizing Hash-based Indexing",
      ],
    },

    studentLife: {
      clubsMentored: ["Coding Club", "Research Circle", "AI Innovation Hub"],
      upcomingEvents: [{ name: "Research Expo", date: "2025-03-15" }],
    },
  },

  // =====================================================
  // ADMIN ERP
  // =====================================================
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
      revenueTrend: genRange(12, 55, 90),
    },

    systemLogs: [
      "User login spike detected",
      "Backup completed",
      "New device registered",
      "Fee payment portal updated",
    ],
  },
};

// =======================================================
//  SAFE PARSE
// =======================================================
function safeParse(json, fallback) {
  try {
    return json ? JSON.parse(json) : fallback;
  } catch {
    return fallback;
  }
}

// =======================================================
//  AUTO-SEED
// =======================================================
(function seed() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem("demoSeeded") === "true") return;

  // Seed users
  const existingUsers = safeParse(localStorage.getItem("users"), []);
  const mergedUsers = [...existingUsers];

  DEMO_USERS.forEach((demo) => {
    if (!mergedUsers.some((u) => u.email === demo.email)) {
      mergedUsers.push({ email: demo.email, password: demo.password });
    }
  });

  localStorage.setItem("users", JSON.stringify(mergedUsers));

  // Seed profiles
  const existingProfiles = safeParse(localStorage.getItem("profiles"), {});
  const mergedProfiles = { ...DEMO_PROFILES, ...existingProfiles };
  localStorage.setItem("profiles", JSON.stringify(mergedProfiles));

  // Seed ERP data
  const existingErp = safeParse(localStorage.getItem("erpData"), {});
  const mergedErp = { ...DEMO_ERP, ...existingErp };
  localStorage.setItem("erpData", JSON.stringify(mergedErp));

  localStorage.setItem("demoSeeded", "true");
})();

// =======================================================
//  EXPORT HELPERS
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
  if (!email) return null;
  const profiles = safeParse(localStorage.getItem("profiles"), {});
  return profiles[email] || null;
}

export function getCurrentErpData() {
  const email = getCurrentUserEmail();
  if (!email) return null;
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
