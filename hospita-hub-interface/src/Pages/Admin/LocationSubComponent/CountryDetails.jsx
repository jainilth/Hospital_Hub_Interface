import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../DashboardSubComponent/LocationManagement.css";

export default function CountryDetails() {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { countryId } = useParams();

  const API_BASE_URL = "http://localhost:5220/api";

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!countryId) return;

        // Fetch country details - backend now includes counts
        const detailRes = await axios.get(`${API_BASE_URL}/Country/GetCountryById/${countryId}`);
        const detail = detailRes.data || {};
        
        setCountry(detail);
      } catch (err) {
        console.error("Error loading country details:", err);
        setError("Failed to load country details.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [countryId]);

  if (loading) {
    return (
      <div className="location-management">
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="location-management">
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">Error</h1>
            <p className="dashboard-subtitle">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="location-management">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Country Details</h1>
          <p className="dashboard-subtitle">
            Detailed information about {country?.countryName}
          </p>
        </div>
        <div className="header-actions">
          <Link 
            to={`/admin/locationmanagement/addCountry/${countryId}`}
            className="btn-secondary"
          >
            Edit Country
          </Link>
          <button 
            className="btn-primary" 
            onClick={() => navigate("/admin/locationmanagement")}
          >
            Back to Location Management
          </button>
        </div>
      </div>

      {/* Country Information Table */}
      <div className="table-container" style={{ margin: "20px 0" }}>
        <div className="table-header">
          <h3>Country Information</h3>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <tbody>
              <tr>
                <td><strong>Country Name</strong></td>
                <td>{country?.countryName || country?.CountryName}</td>
              </tr>
              <tr>
                <td><strong>Country ID</strong></td>
                <td>{country?.countryId || country?.CountryId}</td>
              </tr>
              <tr>
                <td><strong>Number of States</strong></td>
                <td>{country?.stateCount || country?.StateCount || 0}</td>
              </tr>
              <tr>
                <td><strong>Number of Cities</strong></td>
                <td>{country?.cityCount || country?.CityCount || 0}</td>
              </tr>
              <tr>
                <td><strong>Number of Hospitals</strong></td>
                <td>{country?.hospitalCount || country?.HospitalCount || 0}</td>
              </tr>
              <tr>
                <td><strong>Created Date</strong></td>
                <td>{country?.createdDate ? new Date(country.createdDate).toLocaleDateString() : 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Last Updated</strong></td>
                <td>{country?.lastUpdated ? new Date(country.lastUpdated).toLocaleDateString() : 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="table-container" style={{ margin: "20px 0" }}>
        <div className="table-header">
          <h3>Quick Actions</h3>
        </div>
        <div style={{ padding: "20px" }}>
          <div className="d-flex flex-wrap gap-3">
            <Link 
              to={`/admin/locationmanagement/addCountry/${countryId}`}
              className="btn btn-primary"
            >
              <i className="fas fa-edit me-2"></i>Edit Country
            </Link>
            <Link 
              to="/admin/locationmanagement/addState"
              className="btn btn-success"
            >
              <i className="fas fa-plus me-2"></i>Add State
            </Link>
            <Link 
              to="/admin/locationmanagement/addCity"
              className="btn btn-info"
            >
              <i className="fas fa-plus me-2"></i>Add City
            </Link>
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate("/admin/locationmanagement")}
            >
              <i className="fas fa-arrow-left me-2"></i>Back to Location Management
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
