import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Health Hub Admin Portal</h1>
          <p className="dashboard-subtitle">
            Comprehensive Healthcare Management System
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Export Data
          </button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="metrics-overview">
        <div className="metrics-grid">
          <div className="metric-card hospitals">
            <div className="metric-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="metric-content">
              <h3>Total Hospitals</h3>
              <p className="metric-number">1,247</p>
              <span className="metric-change positive">+12% this month</span>
            </div>
          </div>

          <div className="metric-card doctors">
            <div className="metric-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="metric-content">
              <h3>Active Doctors</h3>
              <p className="metric-number">8,456</p>
              <span className="metric-change positive">+8% this month</span>
            </div>
          </div>

          <div className="metric-card appointments">
            <div className="metric-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div className="metric-content">
              <h3>Today's Appointments</h3>
              <p className="metric-number">2,341</p>
              <span className="metric-change positive">
                +15% from yesterday
              </span>
            </div>
          </div>

          <div className="metric-card patients">
            <div className="metric-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="metric-content">
              <h3>Total Patients</h3>
              <p className="metric-number">45,892</p>
              <span className="metric-change positive">+23% this month</span>
            </div>
          </div>

          <div className="metric-card revenue">
            <div className="metric-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div className="metric-content">
              <h3>Monthly Revenue</h3>
              <p className="metric-number">₹12,45,678</p>
              <span className="metric-change positive">+18% this month</span>
            </div>
          </div>

          <div className="metric-card emergency">
            <div className="metric-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div className="metric-content">
              <h3>Emergency Cases</h3>
              <p className="metric-number">127</p>
              <span className="metric-change negative">-5% from yesterday</span>
            </div>
          </div>
        </div>
      </div>

      {/* Database Management Sections */}
      <div className="management-sections">
        <h2 className="section-title">Database Management Hub</h2>
        <div className="management-grid">
          {/* Location Management */}
          <div className="management-card">
            <div className="card-header">
              <div className="card-icon location">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3>Location Management</h3>
            </div>
            <div className="card-content">
              <div className="stat-row">
                <span>Countries</span>
                <span className="stat-value">25</span>
              </div>
              <div className="stat-row">
                <span>States</span>
                <span className="stat-value">156</span>
              </div>
              <div className="stat-row">
                <span>Cities</span>
                <span className="stat-value">2,847</span>
              </div>
            </div>
            <div className="card-actions">
              <Link to={"/locationmanagement"} className="action-btn">Manage Locations</Link>
            </div>
          </div>

          {/* Hospital Management */}
          <div className="management-card">
            <div className="card-header">
              <div className="card-icon hospital">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Hospital System</h3>
            </div>
            <div className="card-content">
              <div className="stat-row">
                <span>Total Hospitals</span>
                <span className="stat-value">1,247</span>
              </div>
              <div className="stat-row">
                <span>Departments</span>
                <span className="stat-value">45</span>
              </div>
              <div className="stat-row">
                <span>Hospital Reviews</span>
                <span className="stat-value">15,678</span>
              </div>
            </div>
            <div className="card-actions">
              <button className="action-btn">Manage Hospitals</button>
            </div>
          </div>

          {/* Doctor Management */}
          <div className="management-card">
            <div className="card-header">
              <div className="card-icon doctor">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3>Doctor System</h3>
            </div>
            <div className="card-content">
              <div className="stat-row">
                <span>Active Doctors</span>
                <span className="stat-value">8,456</span>
              </div>
              <div className="stat-row">
                <span>Specializations</span>
                <span className="stat-value">32</span>
              </div>
              <div className="stat-row">
                <span>Available Slots</span>
                <span className="stat-value">15,678</span>
              </div>
            </div>
            <div className="card-actions">
              <button className="action-btn">Manage Doctors</button>
            </div>
          </div>

          {/* Appointment Management */}
          <div className="management-card">
            <div className="card-header">
              <div className="card-icon appointment">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3>Appointment System</h3>
            </div>
            <div className="card-content">
              <div className="stat-row">
                <span>Total Appointments</span>
                <span className="stat-value">45,892</span>
              </div>
              <div className="stat-row">
                <span>Completed Today</span>
                <span className="stat-value">1,856</span>
              </div>
              <div className="stat-row">
                <span>Cancellation Logs</span>
                <span className="stat-value">2,341</span>
              </div>
            </div>
            <div className="card-actions">
              <button className="action-btn">Manage Appointments</button>
            </div>
          </div>

          {/* Medicine Management */}
          <div className="management-card">
            <div className="card-header">
              <div className="card-icon medicine">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4.5 16.5c-1.5 1.5-1.5 3.5 0 5s3.5 1.5 5 0l4-4a3 3 0 0 0-3-3l-6 2z" />
                  <path d="M13.5 6.5a3 3 0 0 0-3 3l-4 4c-1.5 1.5-1.5 3.5 0 5s3.5 1.5 5 0l4-4a3 3 0 0 0-3-3z" />
                </svg>
              </div>
              <h3>Medicine System</h3>
            </div>
            <div className="card-content">
              <div className="stat-row">
                <span>Total Medicines</span>
                <span className="stat-value">5,678</span>
              </div>
              <div className="stat-row">
                <span>Categories</span>
                <span className="stat-value">24</span>
              </div>
              <div className="stat-row">
                <span>Units</span>
                <span className="stat-value">12</span>
              </div>
            </div>
            <div className="card-actions">
              <button className="action-btn">Manage Medicines</button>
            </div>
          </div>

          {/* Lab Management */}
          <div className="management-card">
            <div className="card-header">
              <div className="card-icon lab">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 2v6l3 1 3-1V2" />
                  <path d="M12 17.5L9 15l3-2.5L15 15z" />
                  <path d="M6 8h12l-1 9H7z" />
                </svg>
              </div>
              <h3>Laboratory System</h3>
            </div>
            <div className="card-content">
              <div className="stat-row">
                <span>Lab Tests</span>
                <span className="stat-value">234</span>
              </div>
              <div className="stat-row">
                <span>Lab Bookings</span>
                <span className="stat-value">3,456</span>
              </div>
              <div className="stat-row">
                <span>Lab Reports</span>
                <span className="stat-value">12,789</span>
              </div>
            </div>
            <div className="card-actions">
              <button className="action-btn">Manage Lab System</button>
            </div>
          </div>

          {/* Payment Management */}
          <div className="management-card">
            <div className="card-header">
              <div className="card-icon payment">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <h3>Payment System</h3>
            </div>
            <div className="card-content">
              <div className="stat-row">
                <span>Total Payments</span>
                <span className="stat-value">₹45,67,890</span>
              </div>
              <div className="stat-row">
                <span>Successful</span>
                <span className="stat-value">98.5%</span>
              </div>
              <div className="stat-row">
                <span>Pending</span>
                <span className="stat-value">156</span>
              </div>
            </div>
            <div className="card-actions">
              <button className="action-btn">Manage Payments</button>
            </div>
          </div>

          {/* User Management */}
          <div className="management-card">
            <div className="card-header">
              <div className="card-icon user">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>User Management</h3>
            </div>
            <div className="card-content">
              <div className="stat-row">
                <span>Total Users</span>
                <span className="stat-value">45,892</span>
              </div>
              <div className="stat-row">
                <span>Patients</span>
                <span className="stat-value">42,156</span>
              </div>
              <div className="stat-row">
                <span>Staff & Admins</span>
                <span className="stat-value">3,736</span>
              </div>
            </div>
            <div className="card-actions">
              <button className="action-btn">Manage Users</button>
            </div>
          </div>

          {/* Emergency Management */}
          <div className="management-card">
            <div className="card-header">
              <div className="card-icon emergency">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h3>Emergency System</h3>
            </div>
            <div className="card-content">
              <div className="stat-row">
                <span>Emergency Cases</span>
                <span className="stat-value">1,234</span>
              </div>
              <div className="stat-row">
                <span>Active Cases</span>
                <span className="stat-value">27</span>
              </div>
              <div className="stat-row">
                <span>Avg Response Time</span>
                <span className="stat-value">4.2 min</span>
              </div>
            </div>
            <div className="card-actions">
              <button className="action-btn">Manage Emergency</button>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="analytics-section">
        <div className="analytics-grid">
          {/* Revenue Chart */}
          <div className="chart-container">
            <div className="chart-header">
              <h3>Revenue Analytics</h3>
              <div className="chart-filters">
                <button className="filter-btn active">7 Days</button>
                <button className="filter-btn">30 Days</button>
                <button className="filter-btn">90 Days</button>
              </div>
            </div>
            <div className="chart-content">
              <div className="chart-bars">
                <div
                  className="bar"
                  style={{ height: "60%" }}
                  data-value="₹45,000"
                ></div>
                <div
                  className="bar"
                  style={{ height: "80%" }}
                  data-value="₹60,000"
                ></div>
                <div
                  className="bar"
                  style={{ height: "45%" }}
                  data-value="₹35,000"
                ></div>
                <div
                  className="bar"
                  style={{ height: "90%" }}
                  data-value="₹70,000"
                ></div>
                <div
                  className="bar"
                  style={{ height: "70%" }}
                  data-value="₹55,000"
                ></div>
                <div
                  className="bar"
                  style={{ height: "85%" }}
                  data-value="₹65,000"
                ></div>
                <div
                  className="bar"
                  style={{ height: "95%" }}
                  data-value="₹75,000"
                ></div>
              </div>
              <div className="chart-labels">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="activities-container">
            <div className="activities-header">
              <h3>Recent Database Activities</h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="activities-list">
              <div className="activity-item">
                <div className="activity-icon new-hospital">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  </svg>
                </div>
                <div className="activity-content">
                  <p>
                    <strong>New Hospital</strong> added to database
                  </p>
                  <span className="activity-time">2 minutes ago</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon new-doctor">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="activity-content">
                  <p>
                    <strong>Dr. Sarah Wilson</strong> profile updated
                  </p>
                  <span className="activity-time">15 minutes ago</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon appointment">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  </svg>
                </div>
                <div className="activity-content">
                  <p>
                    <strong>1,234 appointments</strong> processed today
                  </p>
                  <span className="activity-time">30 minutes ago</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon medicine">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4.5 16.5c-1.5 1.5-1.5 3.5 0 5s3.5 1.5 5 0l4-4a3 3 0 0 0-3-3l-6 2z" />
                  </svg>
                </div>
                <div className="activity-content">
                  <p>
                    <strong>Medicine inventory</strong> updated
                  </p>
                  <span className="activity-time">45 minutes ago</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon payment">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="activity-content">
                  <p>
                    <strong>₹45,678</strong> payment processed
                  </p>
                  <span className="activity-time">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Tables Section */}
      <div className="tables-section">
        <div className="tables-grid">
          {/* Recent Appointments Table */}
          <div className="table-container">
            <div className="table-header">
              <h3>Recent Appointments</h3>
              <button className="export-btn">Export</button>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Hospital</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="patient-info">
                        <img
                          src="/placeholder.svg?height=32&width=32"
                          alt="Patient"
                        />
                        <div>
                          <p className="patient-name">Amit Patel</p>
                          <span className="patient-id">#P001234</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="doctor-info">
                        <p>Dr. Sarah Wilson</p>
                        <span>Cardiologist</span>
                      </div>
                    </td>
                    <td>Apollo Hospital</td>
                    <td>
                      <div className="datetime">
                        <p>Jan 15, 2024</p>
                        <span>10:30 AM</span>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge scheduled">Scheduled</span>
                    </td>
                    <td>
                      <span className="payment-badge success">₹500</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="patient-info">
                        <img
                          src="/placeholder.svg?height=32&width=32"
                          alt="Patient"
                        />
                        <div>
                          <p className="patient-name">Priya Singh</p>
                          <span className="patient-id">#P001235</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="doctor-info">
                        <p>Dr. Rajesh Kumar</p>
                        <span>Neurologist</span>
                      </div>
                    </td>
                    <td>Max Hospital</td>
                    <td>
                      <div className="datetime">
                        <p>Jan 15, 2024</p>
                        <span>02:15 PM</span>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge completed">Completed</span>
                    </td>
                    <td>
                      <span className="payment-badge success">₹800</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="patient-info">
                        <img
                          src="/placeholder.svg?height=32&width=32"
                          alt="Patient"
                        />
                        <div>
                          <p className="patient-name">Rohit Sharma</p>
                          <span className="patient-id">#P001236</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="doctor-info">
                        <p>Dr. Meera Joshi</p>
                        <span>Pediatrician</span>
                      </div>
                    </td>
                    <td>Fortis Hospital</td>
                    <td>
                      <div className="datetime">
                        <p>Jan 16, 2024</p>
                        <span>09:00 AM</span>
                      </div>
                    </td>
                    <td>
                      <span className="status-badge cancelled">Cancelled</span>
                    </td>
                    <td>
                      <span className="payment-badge refund">₹600</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Emergency Cases Table */}
          <div className="table-container">
            <div className="table-header">
              <h3>Active Emergency Cases</h3>
              <button className="export-btn">View All</button>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Hospital</th>
                    <th>Emergency Type</th>
                    <th>Status</th>
                    <th>Response Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="patient-info">
                        <img
                          src="/placeholder.svg?height=32&width=32"
                          alt="Patient"
                        />
                        <div>
                          <p className="patient-name">Rohit Sharma</p>
                          <span className="patient-id">#E001</span>
                        </div>
                      </div>
                    </td>
                    <td>Apollo Hospital</td>
                    <td>Cardiac Emergency</td>
                    <td>
                      <span className="status-badge critical">Critical</span>
                    </td>
                    <td>3.2 mins</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="patient-info">
                        <img
                          src="/placeholder.svg?height=32&width=32"
                          alt="Patient"
                        />
                        <div>
                          <p className="patient-name">Meera Joshi</p>
                          <span className="patient-id">#E002</span>
                        </div>
                      </div>
                    </td>
                    <td>Max Hospital</td>
                    <td>Accident</td>
                    <td>
                      <span className="status-badge stable">Stable</span>
                    </td>
                    <td>2.8 mins</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="patient-info">
                        <img
                          src="/placeholder.svg?height=32&width=32"
                          alt="Patient"
                        />
                        <div>
                          <p className="patient-name">Arjun Patel</p>
                          <span className="patient-id">#E003</span>
                        </div>
                      </div>
                    </td>
                    <td>Fortis Hospital</td>
                    <td>Respiratory Emergency</td>
                    <td>
                      <span className="status-badge under-treatment">
                        Under Treatment
                      </span>
                    </td>
                    <td>4.1 mins</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Database Statistics Table */}
        <div className="database-stats">
          <div className="table-header">
            <h3>Database Statistics Overview</h3>
            <button className="export-btn">Generate Report</button>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-label">Total Database Records</div>
              <div className="stat-number">2,45,678</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Active Connections</div>
              <div className="stat-number">1,234</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Daily Transactions</div>
              <div className="stat-number">45,892</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">System Uptime</div>
              <div className="stat-number">99.9%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
