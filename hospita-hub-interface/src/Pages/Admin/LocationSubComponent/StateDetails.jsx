import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../DashboardSubComponent/LocationManagement.css";

export default function StateDetails() {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { stateId } = useParams();

  const API_BASE_URL = "http://localhost:5220/api";

  useEffect(() => {
    const loadData = async () => {
      if (!stateId) return;
      setLoading(true);
      try {
        // Fetch state details - backend now includes counts and country name
        const detailRes = await axios.get(`${API_BASE_URL}/State/GetStateById/${stateId}`);
        const detail = detailRes.data || {};
        
        setState(detail);
      } catch (err) {
        console.error("Error loading state details:", err);
        setError("Failed to load state details.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [stateId]);
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
          <h1 className="dashboard-title">State Details</h1>
          <p className="dashboard-subtitle">
            Detailed information about {state?.stateName}
          </p>
        </div>
        <div className="header-actions">
          <Link 
            to={`/admin/locationmanagement/addState/${stateId}`}
            className="btn-secondary"
          >
            Edit State
          </Link>
          <button 
            className="btn-primary" 
            onClick={() => navigate("/admin/locationmanagement")}
          >
            Back to Location Management
          </button>
        </div>
      </div>

      {/* State Information Table */}
      <div className="table-container" style={{ margin: "20px 0" }}>
        <div className="table-header">
          <h3>State Information</h3>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <tbody>
              <tr>
                <td><strong>State Name</strong></td>
                <td>{state?.stateName || state?.StateName}</td>
              </tr>
              <tr>
                <td><strong>State ID</strong></td>
                <td>{state?.stateId || state?.StateId}</td>
              </tr>
              <tr>
                <td><strong>Country</strong></td>
                <td>
                  {(state?.countryName || state?.CountryName) ? (
                    <Link 
                      to={`/admin/locationmanagement/getCountry/${state.countryId || state.CountryId}`}
                      className="text-primary fw-bold"
                    >
                      {state.countryName || state.CountryName}
                    </Link>
                  ) : 'N/A'}
                </td>
              </tr>
              <tr>
                <td><strong>Country ID</strong></td>
                <td>{state?.countryId || state?.CountryId || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Number of Cities</strong></td>
                <td>{state?.cityCount || state?.CityCount || 0}</td>
              </tr>
              <tr>
                <td><strong>Number of Hospitals</strong></td>
                <td>{state?.hospitalCount || state?.HospitalCount || 0}</td>
              </tr>
              <tr>
                <td><strong>Created Date</strong></td>
                <td>{state?.createdDate ? new Date(state.createdDate).toLocaleDateString() : 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Last Updated</strong></td>
                <td>{state?.lastUpdated ? new Date(state.lastUpdated).toLocaleDateString() : 'N/A'}</td>
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
              to={`/admin/locationmanagement/addState/${stateId}`}
              className="btn btn-primary"
            >
              <i className="fas fa-edit me-2"></i>Edit State
            </Link>
            <Link 
              to="/admin/locationmanagement/addCity"
              className="btn btn-success"
            >
              <i className="fas fa-plus me-2"></i>Add City
            </Link>
            {state?.countryId && (
              <Link 
                to={`/admin/locationmanagement/getCountry/${state.countryId}`}
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
