import React from "react";
import "./LocationManagement.css";

export default function HospitalManagement() {
  return (
    <div className="location-management">
      {/* Header */}
      <div className="location-management">
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">Hospital Management</h1>
            <p className="dashboard-subtitle">Manage Hospital Database</p>
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
            <button
              className="btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Hospital
            </button>
          </div>
        </div>
      </div>
      {/* End Header */}

      {/* Location Statistics */}
      <div className="location-stats">
        <div className="stats-grid">
          <div className="stat-card countries">
            <div className="stat-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <div className="stat-content">
              <h3>Total Countries</h3>
              <p className="stat-number">25</p>
              <span className="stat-change positive">+2 this month</span>
            </div>
          </div>

          <div className="stat-card states">
            <div className="stat-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="stat-content">
              <h3>Total States</h3>
              <p className="stat-number">156</p>
              <span className="stat-change positive">+8 this month</span>
            </div>
          </div>

          <div className="stat-card cities">
            <div className="stat-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 21h18" />
                <path d="M5 21V7l8-4v18" />
                <path d="M19 21V11l-6-4" />
              </svg>
            </div>
            <div className="stat-content">
              <h3>Total Cities</h3>
              <p className="stat-number">2,847</p>
              <span className="stat-change positive">+45 this month</span>
            </div>
          </div>

          <div className="stat-card active">
            <div className="stat-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
              </svg>
            </div>
            <div className="stat-content">
              <h3>Active Locations</h3>
              <p className="stat-number">3,028</p>
              <span className="stat-change positive">98.5% active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-container">
          <div className="search-box">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search locations..."
              className="search-input"
            />
          </div>
          <div className="filter-buttons">
            <select className="filter-select">
              <option>All Countries</option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
            </select>
            <select className="filter-select">
              <option>All States</option>
              <option>Maharashtra</option>
              <option>Delhi</option>
              <option>Karnataka</option>
            </select>
            <button className="filter-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
              </svg>
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Location Tabs */}
      <div className="location-tabs">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === "countries" ? "active" : ""}`}
            onClick={() => setActiveTab("countries")}
          >
            Countries (25)
          </button>
          <button
            className={`tab-btn ${activeTab === "states" ? "active" : ""}`}
            onClick={() => setActiveTab("states")}
          >
            States (156)
          </button>
          <button
            className={`tab-btn ${activeTab === "cities" ? "active" : ""}`}
            onClick={() => setActiveTab("cities")}
          >
            Cities (2,847)
          </button>
        </div>
      </div>

      {/* Location Tables */}
      <div className="location-tables">
        {activeTab === "countries" && (
          <div className="table-container">
            <div className="table-header">
              <h3>Countries Management</h3>
              <div className="table-actions">
                <button className="action-btn secondary">Bulk Import</button>
                <button className="action-btn primary">Add Country</button>
              </div>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>Country Name</th>
                    <th>Country Code</th>
                    <th>States</th>
                    <th>Cities</th>
                    <th>Hospitals</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div className="location-info">
                        <img
                          src="/placeholder.svg?height=24&width=24"
                          alt="Flag"
                        />
                        <span>India</span>
                      </div>
                    </td>
                    <td>IN</td>
                    <td>28</td>
                    <td>1,247</td>
                    <td>856</td>

                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div className="location-info">
                        <img
                          src="/placeholder.svg?height=24&width=24"
                          alt="Flag"
                        />
                        <span>United States</span>
                      </div>
                    </td>
                    <td>US</td>
                    <td>50</td>
                    <td>892</td>
                    <td>234</td>

                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div className="location-info">
                        <img
                          src="/placeholder.svg?height=24&width=24"
                          alt="Flag"
                        />
                        <span>United Kingdom</span>
                      </div>
                    </td>
                    <td>UK</td>
                    <td>4</td>
                    <td>156</td>
                    <td>89</td>

                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "states" && (
          <div className="table-container">
            <div className="table-header">
              <h3>States Management</h3>
              <div className="table-actions">
                <button className="action-btn secondary">Bulk Import</button>
                <button className="action-btn primary">Add State</button>
              </div>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>State Name</th>
                    <th>Country</th>
                    <th>State Code</th>
                    <th>Cities</th>
                    <th>Hospitals</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Maharashtra</td>
                    <td>India</td>
                    <td>MH</td>
                    <td>358</td>
                    <td>245</td>

                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Delhi</td>
                    <td>India</td>
                    <td>DL</td>
                    <td>11</td>
                    <td>189</td>

                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Karnataka</td>
                    <td>India</td>
                    <td>KA</td>
                    <td>224</td>
                    <td>156</td>

                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "cities" && (
          <div className="table-container">
            <div className="table-header">
              <h3>Cities Management</h3>
              <div className="table-actions">
                <button className="action-btn secondary">Bulk Import</button>
                <button className="action-btn primary">Add City</button>
              </div>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>City Name</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>Hospitals</th>
                    <th>Doctors</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Mumbai</td>
                    <td>Maharashtra</td>
                    <td>India</td>
                    <td>89</td>
                    <td>1,245</td>

                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Delhi</td>
                    <td>Delhi</td>
                    <td>India</td>
                    <td>156</td>
                    <td>2,134</td>

                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>Bangalore</td>
                    <td>Karnataka</td>
                    <td>India</td>
                    <td>78</td>
                    <td>987</td>

                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-info">Showing 1 to 10 of 156 entries</div>
        <div className="pagination-controls">
          <button className="page-btn">Previous</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">Next</button>
        </div>
      </div>

      {/* Add Location Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Location</h3>
              <button
                className="close-btn"
                onClick={() => setShowAddModal(false)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Location Type</label>
                <select className="form-input">
                  <option>Country</option>
                  <option>State</option>
                  <option>City</option>
                </select>
              </div>
              <div className="form-group">
                <label>Location Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter location name"
                />
              </div>
              <div className="form-group">
                <label>Parent Location</label>
                <select className="form-input">
                  <option>Select parent location</option>
                  <option>India</option>
                  <option>USA</option>
                </select>
              </div>
              <div className="form-group">
                <label>Location Code</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter location code"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button className="btn-primary">Add Location</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
