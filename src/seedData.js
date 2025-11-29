// src/seedData.js

const DEMO_USERS = [
  { email: "student@klu.edu", password: "student123", role: "student" },
  { email: "teacher@klu.edu", password: "teacher123", role: "teacher" },
  { email: "admin@klu.edu", password: "admin123", role: "admin" },
];

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

const DEMO_ERP = {
  "student@klu.edu": {
    role: "student",
    academics: {
      gpa: 8.7,
      overallAttendance: 92,
      semester: "III - CSE",
      courses: [
        {
          code: "CSE201",
          name: "Data Structures",
          attendance: 95,
          marks: 88,
        },
        {
          code: "CSE203",
          name: "Operating Systems",
          attendance: 90,
          marks: 82,
        },
        {
          code: "CSE205",
          name: "Database Management Systems",
          attendance: 91,
          marks: 85,
        },
      ],
    },
    finance: {
      total: 100000,
      paid: 60000,
      pending: 40000,
      scholarship: "Merit Scholarship: 25% tuition waiver",
      lastPaymentDate: "15 Aug 2025",
      nextDueDate: "10 Oct 2025",
    },
    library: {
      borrowed: [
        { title: "Algorithms", due: "28 Sept 2025" },
        { title: "AI Basics", due: "02 Oct 2025" },
      ],
      ebooksCount: 14,
    },
    studentLife: {
      clubs: ["Coding Club", "Robotics Club", "Drama Club"],
      upcomingEvents: [
        { name: "Hackathon", date: "01 Oct 2025" },
        { name: "Drama Night", date: "03 Oct 2025" },
      ],
      workshops: [{ name: "AI & ML Workshop", date: "05 Oct 2025" }],
    },
  },

  "teacher@klu.edu": {
    role: "teacher",
    academics: {
      coursesHandled: [
        { code: "CSE201", name: "Data Structures", students: 62 },
        { code: "CSE305", name: "Advanced Algorithms", students: 48 },
      ],
      pendingEvaluations: 3,
    },
    finance: {
      total: 0,
      paid: 0,
      pending: 0,
      note: "Salary processed monthly via payroll.",
    },
    library: {
      borrowed: [{ title: "Research in Algorithms", due: "10 Oct 2025" }],
      ebooksCount: 32,
    },
    studentLife: {
      clubsMentored: ["Coding Club", "Research Circle"],
      upcomingEvents: [
        { name: "Project Expo Mentoring", date: "07 Oct 2025" },
      ],
    },
  },

  "admin@klu.edu": {
    role: "admin",
    overview: {
      totalStudents: 1200,
      totalTeachers: 85,
      activeCourses: 64,
    },
    finance: {
      totalCollected: 75000000,
      totalPending: 12000000,
      scholarshipsCount: 320,
    },
    academics: {
      averageGPA: 8.1,
      averageAttendance: 89,
    },
  },
};

function safeParse(json, fallback) {
  try {
    return json ? JSON.parse(json) : fallback;
  } catch {
    return fallback;
  }
}

(function seed() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem("demoSeeded") === "true") return;

  // Seed users
  const existingUsers = safeParse(localStorage.getItem("users"), []);
  const mergedUsers = [...existingUsers];

  DEMO_USERS.forEach((demo) => {
    if (!mergedUsers.some((u) => u.email === demo.email)) {
      // Only email + password are stored; role is inferred via profile/ERP
      mergedUsers.push({ email: demo.email, password: demo.password });
    }
  });
  localStorage.setItem("users", JSON.stringify(mergedUsers));

  // Seed profiles
  const existingProfiles = safeParse(localStorage.getItem("profiles"), {});
  const mergedProfiles = { ...existingProfiles };

  Object.entries(DEMO_PROFILES).forEach(([email, profile]) => {
    if (!mergedProfiles[email]) {
      mergedProfiles[email] = profile;
    }
  });
  localStorage.setItem("profiles", JSON.stringify(mergedProfiles));

  // Seed ERP data
  const existingErp = safeParse(localStorage.getItem("erpData"), {});
  const mergedErp = { ...DEMO_ERP, ...existingErp };
  localStorage.setItem("erpData", JSON.stringify(mergedErp));

  localStorage.setItem("demoSeeded", "true");
})();

export function getCurrentUserEmail() {
  if (typeof window === "undefined") return "";
  return (
    sessionStorage.getItem("currentUser") ||
    localStorage.getItem("currentUser") ||
    ""
  );
}

function getAllProfiles() {
  return safeParse(localStorage.getItem("profiles"), {});
}

export function getCurrentProfile() {
  const email = getCurrentUserEmail();
  if (!email) return null;
  const profiles = getAllProfiles();
  return profiles[email] || null;
}

function getAllErpData() {
  return safeParse(localStorage.getItem("erpData"), {});
}

export function getCurrentErpData() {
  const email = getCurrentUserEmail();
  if (!email) return null;
  const erp = getAllErpData();
  return erp[email] || null;
}

export function getCurrentRole() {
  const profile = getCurrentProfile();
  if (profile?.role) return profile.role;
  const erp = getCurrentErpData();
  if (erp?.role) return erp.role;
  return "student";
}
