import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminDashboardSubHeader from './AdminDashboardSubHeader';

export default function Dashboard() {
  return (
    <div>
      <AdminDashboardSubHeader />
      {/* Main content area where nested routes will be rendered */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}