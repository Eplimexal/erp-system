import React from 'react'
import { NavLink } from 'react-router-dom'
const links = [
  {to: '/', label: 'Dashboard'},
  {to: '/academics', label: 'Academics'},
  {to: '/finance', label: 'Finance'},
  {to: '/exams', label: 'Exams'},
  {to: '/library', label: 'Library'},
  {to: '/studentlife', label: 'Student Life'},
]
export default function Sidebar(){
  return (
    <aside className="w-64 bg-gradient-to-b from-black to-gray-800 text-white p-6">
      <div className="mb-8">
        <div className="text-2xl font-bold">ERP System</div>
        <div className="text-sm opacity-90">Student Portal</div>
      </div>
      <nav className="space-y-2">
        {links.map(l => (
          <NavLink key={l.to} to={l.to} className={({isActive}) => `block px-3 py-2 rounded-lg ${isActive ? 'bg-white/20' : 'hover:bg-white/10'}`}>
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-8 text-xs opacity-90">© ERP | Demo</div>
    </aside>
  )
}