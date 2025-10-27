import React from 'react'
export default function Library(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card"><h3 className="font-semibold mb-2">Borrowed Books</h3><ul><li>Algorithms (Due: 28th Sept)</li><li>AI Basics (Due: 2nd Oct)</li></ul></div>
        <div className="card"><h3 className="font-semibold mb-2">E-Books</h3><button className="mt-3 py-2 bg-indigo-600 text-white rounded">Browse Collection</button></div>
      </div>
    </div>
  )
}