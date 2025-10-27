import React from 'react'
export default function Exams(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Exams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card"><h3 className="font-semibold mb-2">Upcoming Exams</h3><ul><li>Data Structures – 25th Sept</li><li>DBMS – 28th Sept</li></ul></div>
        <div className="card"><h3 className="font-semibold mb-2">Results</h3><p>Last Semester GPA: <strong>8.5</strong></p><button className="mt-3 py-2 bg-indigo-600 text-white rounded">Download Report</button></div>
      </div>
    </div>
  )
}