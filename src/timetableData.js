// src/timetableData.js
export const timetableData = {
  "Semester 1": {
    slots: ["9–10", "10–11", "11–12", "1–2", "2–3"],
    days: [
      { day: "Monday", classes: ["Maths", "Physics", "C Programming", "", "Chemistry"] },
      { day: "Tuesday", classes: ["Physics", "Maths", "", "English", "C Lab"] },
      { day: "Wednesday", classes: ["Chemistry", "Maths", "", "C Programming", "Library"] },
      { day: "Thursday", classes: ["English", "Physics", "C Programming", "", "Sports"] },
      { day: "Friday", classes: ["Maths", "C Lab", "", "English", "Physics"] },
    ],
  },

  "Semester 3": {
    slots: ["9–10", "10–11", "11–12", "1–2", "2–3"],
    days: [
      { day: "Monday", classes: ["Data Structures", "OS", "DS Lab", "", "English"] },
      { day: "Tuesday", classes: ["DBMS", "DS", "", "OS", "DBMS Lab"] },
      { day: "Wednesday", classes: ["Maths-3", "OS", "DS", "", "Library"] },
      { day: "Thursday", classes: ["DBMS", "Maths-3", "", "DS", "Sports"] },
      { day: "Friday", classes: ["OS", "DBMS Lab", "", "English", "Maths-3"] },
    ],
  },

  "Semester 5": {
    slots: ["9–10", "10–11", "11–12", "1–2", "2–3"],
    days: [
      { day: "Monday", classes: ["AI", "ML", "CN", "", "AI Lab"] },
      { day: "Tuesday", classes: ["ML", "AI", "", "CN", "Elective"] },
      { day: "Wednesday", classes: ["Elective", "AI", "ML", "", "Library"] },
      { day: "Thursday", classes: ["CN", "Elective", "", "ML", "Sports"] },
      { day: "Friday", classes: ["AI", "ML Lab", "", "CN", "Elective"] },
    ],
  },
};
