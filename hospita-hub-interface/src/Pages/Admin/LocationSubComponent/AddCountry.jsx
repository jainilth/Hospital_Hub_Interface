import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../DashboardSubComponent/LocationManagement.css";

export default function AddCountry() {
  const [countryName, setCountryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { countryId } = useParams();

  const API_BASE_URL = "http://localhost:5220/api";

  // Fetch country data if editing
  useEffect(() => {
    if (countryId) {
      setLoading(true);
      const url = `${API_BASE_URL}/Country/GetCountryById/${countryId}`;

      axios
        .get(url)
        .then((res) => {
          const country = res.data;
          setCountryName(country.countryName);
        })
        .catch((err) => {
          console.error("Error loading country data:", err);
          setError("Failed to load country data.");
        })
        .finally(() => setLoading(false));
    }
  }, [countryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (countryId) {
        // Update country
        await axios.put(`${API_BASE_URL}/Country/UpdateCountry/${countryId}`, {
          countryId: parseInt(countryId),
          countryName,
        });
        alert("Country updated successfully!");
      } else {
        // Add new country
        await axios.post(`${API_BASE_URL}/Country/AddCountry`, {
          countryName,
        });
        alert("Country added successfully!");
      }
      navigate("/admin/locationmanagement");
    } catch (err) {
      console.error("Error:", err);
      setError(
        countryId
          ? "Failed to update country. Please try again."
          : "Failed to add country. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="location-management"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">
            {countryId ? "Edit Country" : "Add New Country"}
          </h1>
          <p className="dashboard-subtitle">
            {countryId
              ? "Update country details"
              : "Register a new country in the system"}
          </p>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <div
          className="table-container"
          style={{ width: "100%", maxWidth: 600, margin: "40px 0" }}
        >
          <form onSubmit={handleSubmit} style={{ padding: 32 }}>
            <div className="form-group">
              <label htmlFor="countryName">Country Name *</label>
              <input
                id="countryName"
                className="form-input"
                type="text"
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                placeholder="Enter country name"
                required
                disabled={loading}
              />
            </div>
            {error && (
              <div style={{ color: "#dc2626", marginBottom: 16 }}>{error}</div>
            )}
            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/admin/locationmanagement")}
                disabled={loading}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading
                  ? countryId
                    ? "Updating..."
                    : "Adding..."
                  : countryId
                  ? "Update Country"
                  : "Add Country"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 