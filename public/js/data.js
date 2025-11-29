/* ============================================================
   📦 GLOBAL DUMMY DATA — Shared Across Public Scripts
============================================================ */

window.studentData = {
  profile: {
    name: "Eplimexal",
    regNo: "22K61A4501",
    dept: "CSE - AI & ML",
  },

  attendance: {
    present: 87,
    absent: 13,
    trend: Array.from({ length: 30 }, () => 80 + Math.random() * 15), // 80–95%
  },

  courses: [
    {
      code: "CSE201",
      name: "Data Structures",
      marks: 88,
      attendance: 95,
    },
    {
      code: "CSE203",
      name: "Operating Systems",
      marks: 82,
      attendance: 90,
    },
    {
      code: "CSE205",
      name: "Database Systems",
      marks: 85,
      attendance: 91,
    },
  ],

  finance: {
    totalFees: 110000,
    paid: 65000,
    pending: 45000,
    nextDue: "10 Oct 2025",
  },

  exams: [
    { subject: "DSA", date: "2025-09-29" },
    { subject: "DBMS", date: "2025-10-05" },
  ],
};
