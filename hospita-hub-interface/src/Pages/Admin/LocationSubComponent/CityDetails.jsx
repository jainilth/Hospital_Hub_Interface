import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../DashboardSubComponent/LocationManagement.css";

export default function CityDetails() {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { cityId } = useParams();

  const API_BASE_URL = "http://localhost:5220/api";

  useEffect(() => {
    const loadData = async () => {
      if (!cityId) return;
      try {
        // Fetch city details - backend now includes hospital count and all details
        const res = await axios.get(`${API_BASE_URL}/City/GetCity/${cityId}`);
        const detail = res.data || {};
        
        setCity(detail);
      } catch (err) {
        console.error("Error loading city details:", err);
        setError("Failed to load city details.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [cityId]);

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
          <h1 className="dashboard-title">City Details</h1>
          <p className="dashboard-subtitle">
            Detailed information about {city?.cityName}
          </p>
        </div>
        <div className="header-actions">
          <Link 
            to={`/admin/locationmanagement/addCity/${cityId}`}
            className="btn-secondary"
          >
            Edit City
          </Link>
          <button 
            className="btn-primary" 
            onClick={() => navigate("/admin/locationmanagement")}
          >
            Back to Location Management
          </button>
        </div>
      </div>

      {/* City Information Table */}
      <div className="table-container" style={{ margin: "20px 0" }}>
        <div className="table-header">
          <h3>City Information</h3>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <tbody>
              <tr>
                <td><strong>City Name</strong></td>
                <td>{city?.cityName || city?.CityName}</td>
              </tr>
              <tr>
                <td><strong>City ID</strong></td>
                <td>{city?.cityId || city?.CityId}</td>
              </tr>
              <tr>
                <td><strong>State</strong></td>
                <td>
                  {(city?.stateName || city?.StateName) && (city?.stateId || city?.StateId) ? (
                    <Link 
                      to={`/admin/locationmanagement/getState/${city.stateId || city.StateId}`}
                      className="text-primary fw-bold"
                    >
                      {city.stateName || city.StateName}
                    </Link>
                  ) : (city?.stateName || city?.StateName || 'N/A')}
                </td>
              </tr>
              <tr>
                <td><strong>State ID</strong></td>
                <td>{city?.stateId || city?.StateId || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Country</strong></td>
                <td>
                  {(city?.countryName || city?.CountryName) && (city?.countryId || city?.CountryId) ? (
                    <Link 
                      to={`/admin/locationmanagement/getCountry/${city.countryId || city.CountryId}`}
                      className="text-primary fw-bold"
                    >
                      {city.countryName || city.CountryName}
                    </Link>
                  ) : (city?.countryName || city?.CountryName || 'N/A')}
                </td>
              </tr>
              <tr>
                <td><strong>Country ID</strong></td>
                <td>{city?.countryId || city?.CountryId || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Number of Hospitals</strong></td>
                <td>{city?.hospitalCount || city?.HospitalCount || 0}</td>
              </tr>
              <tr>
                <td><strong>Created Date</strong></td>
                <td>{city?.createdDate ? new Date(city.createdDate).toLocaleDateString() : 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Last Updated</strong></td>
                <td>{city?.lastUpdated ? new Date(city.lastUpdated).toLocaleDateString() : 'N/A'}</td>
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
              to={`/admin/locationmanagement/addCity/${cityId}`}
              className="btn btn-primary"
            >
              <i className="fas fa-edit me-2"></i>Edit City
            </Link>
            {(city?.stateId || city?.StateId) && (
              <Link 
                to={`/admin/locationmanagement/getState/${city.stateId || city.StateId}`}
                className="btn btn-info"
              >
                <i className="fas fa-eye me-2"></i>View State
              </Link>
            )}
            {(city?.countryId || city?.CountryId) && (
              <Link 
                to={`/admin/locationmanagement/getCountry/${city.countryId || city.CountryId}`}
                className="btn btn-info"
              >
                <i className="fas fa-eye me-2"></i>View Country
              </Link>
            )}
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
