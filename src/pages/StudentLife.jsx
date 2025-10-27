import React from 'react'
export default function StudentLife(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Student Life</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card"><h3 className="font-semibold mb-2">Clubs</h3><ul><li>Coding Club</li><li>Robotics Club</li><li>Drama Club</li></ul></div>
        <div className="card"><h3 className="font-semibold mb-2">Upcoming Events</h3><p>Hackathon – 1st Oct</p><p>Drama Night – 3rd Oct</p></div>
        <div className="card"><h3 className="font-semibold mb-2">Workshops</h3><p>AI & ML Workshop – 5th Oct</p></div>
      </div>
    </div>
  )
}