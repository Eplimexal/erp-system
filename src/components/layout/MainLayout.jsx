import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
export default function MainLayout({children}){
  return (
    <div className="min-h-screen flex">
      <Sidebar/>
      <div className="flex-1 flex flex-col">
        <Header/>
        <main className="p-6"><div className="container mx-auto">{children}</div></main>
      </div>
    </div>
  )
}