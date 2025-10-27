import React, {useEffect} from 'react'
export default function Academics(){
  useEffect(()=>{ if(window.initAttendanceChart) window.initAttendanceChart(); if(window.initMarksChart) window.initMarksChart(); },[])
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Academics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card"><h3 className="font-semibold mb-2">Attendance</h3><canvas id="attendanceChart"></canvas></div>
        <div className="card"><h3 className="font-semibold mb-2">Marks</h3><canvas id="marksChart"></canvas></div>
        <div className="card"><h3 className="font-semibold mb-2">Courses</h3><ul><li>Data Structures</li><li>Operating Systems</li><li>DBMS</li></ul></div>
      </div>
    </div>
  )
}