import { useEffect, useState } from "react";
import axios from "axios";
import "./LocationManagement.css";

export default function LocationManagement() {
  const [activeTab, setActiveTab] = useState("countries");
  const [showAddModal, setShowAddModal] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  // Load Countries
  useEffect(() => {
    axios
      .get("https://localhost:5220/api/Country/GetAllCountries")
      .then((res) => setCountries(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Load States
  useEffect(() => {
    axios
      .get("https://localhost:5220/api/State/GetALlSatate")
      .then((res) => setStates(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="location-management">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Location Management</h1>
          <p className="dashboard-subtitle">
            Manage Countries, States, and Cities Database
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">Export Data</button>
          <button className="btn-primary" onClick={() => setShowAddModal(true)}>
            Add Location
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="location-stats">
        <div className="stats-grid">
          <div className="stat-card countries">
            <div className="stat-icon">🌍</div>
            <div className="stat-content">
              <h3>Total Countries</h3>
              <p className="stat-number">{countries.length}</p>
              <span className="stat-change positive">+2 this month</span>
            </div>
          </div>
          {/* Add more cards here if needed */}
        </div>
      </div>

      {/* Tabs */}
      <div className="location-tabs">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === "countries" ? "active" : ""}`}
            onClick={() => setActiveTab("countries")}
          >
            Countries ({countries.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "states" ? "active" : ""}`}
            onClick={() => setActiveTab("states")}
          >
            States
          </button>
          <button
            className={`tab-btn ${activeTab === "cities" ? "active" : ""}`}
            onClick={() => setActiveTab("cities")}
          >
            Cities
          </button>
        </div>
      </div>

      {/* Tables */}
      <div className="location-tables">
        {/* Countries Table */}

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
                    <th>States</th>
                    <th>Cities</th>
                    <th>Hospitals</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {countries.map((country, index) => (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{country.countryName}</td>
                      <td>{country.stateCount}</td>
                      <td>{country.cityCount}</td>
                      <td>{country.hospitalCount}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="edit-btn">Edit</button>
                          <button className="delete-btn">Delete</button>
                          <button className="edit-btn">Read More</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {countries.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        style={{ textAlign: "center", padding: "1rem" }}
                      >
                        No countries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* States Table */}
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
                    <th>Hospitals</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {states.map((state, index) => (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>{state.stateName}</td>
                      <td>{state.countryName}</td>
                      <td>{state.hospitalCount}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="edit-btn">Edit</button>
                          <button className="delete-btn">Delete</button>
                          <button className="readmore-btn">Read More</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {states.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        style={{ textAlign: "center", padding: "1rem" }}
                      >
                        No states found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
