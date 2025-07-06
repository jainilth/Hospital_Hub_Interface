import React from 'react'
import { Link } from "react-router-dom";
import './AdminDashboardSubHeader.css'; // Assuming you have a CSS file for styles

export default function AdminDashboardSubHeader() {
  return (
    <div>
      {/* Header section with navigation links and logo */}
      <header className="header">
        <div className="container">
          <nav className="nav-links">
            <Link to="/dashboard/overview">OverView</Link>   
            <Link to="/dashboard/patientOverview">Patient</Link>   
            <Link to="/dashboard/doctorOverview">Doctor</Link>   
            <Link to="/dashboard/hospitalOverview">Hospital</Link>   
            <Link to="/dashboard/departmentOverview">Department</Link>   
            <Link to="/dashboard/medicineOverview">Medicine</Link>   
            <Link to="/dashboard/appointmentOverview">Appointment</Link>   
            <Link to="/dashboard/emergencyOverview">Emergency</Link>   
            <Link to="/dashboard/labOverview">Lab</Link>   
          </nav>
        </div>
      </header>
      {/*Header End*/}
    </div>
  )
}
