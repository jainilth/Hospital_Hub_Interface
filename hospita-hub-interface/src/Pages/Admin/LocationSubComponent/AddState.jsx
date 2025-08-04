import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../DashboardSubComponent/LocationManagement.css";

export default function AddState() {
  const [stateName, setStateName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { stateId } = useParams();

  const API_BASE_URL = "http://localhost:5220/api";

  // Fetch countries on mount
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/Country/GetAllCountries`)
      .then((res) => setCountries(res.data))
      .catch((err) => {
        console.error("Error loading countries:", err);
        setCountries([]);
      });
  }, []);

  // Fetch state data if editing
  useEffect(() => {
    if (stateId) {
      setLoading(true);
      const url = `${API_BASE_URL}/State/GetStateById/${stateId}`;

      axios
        .get(url)
        .then((res) => {
          const state = res.data;
          setStateName(state.stateName);
          setCountryId(state.countryId?.toString() || "");
        })
        .catch((err) => {
          console.error("Error loading state data:", err);
          setError("Failed to load state data.");
        })
        .finally(() => setLoading(false));
    }
  }, [stateId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (stateId) {
        // Update state
        await axios.put(`${API_BASE_URL}/State/UpdateState/${stateId}`, {
          stateId: parseInt(stateId),
          stateName,
          countryId: parseInt(countryId),
        });
        alert("State updated successfully!");
      } else {
        // Add new state
        await axios.post(`${API_BASE_URL}/State/AddState`, {
          stateName,
          countryId: parseInt(countryId),
        });
        alert("State added successfully!");
      }
      navigate("/locationmanagement");
    } catch (err) {
      console.error("Error:", err);
      setError(
        stateId
          ? "Failed to update state. Please try again."
          : "Failed to add state. Please try again."
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
            {stateId ? "Edit State" : "Add New State"}
          </h1>
          <p className="dashboard-subtitle">
            {stateId
              ? "Update state details"
              : "Register a new state in the system"}
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
              <label htmlFor="stateName">State Name *</label>
              <input
                id="stateName"
                className="form-input"
                type="text"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                placeholder="Enter state name"
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="countryId">Country *</label>
              <select
                id="countryId"
                className="form-input"
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
                required
                disabled={loading}
              >
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country.countryId} value={country.countryId}>
                    {country.countryName}
                  </option>
                ))}
              </select>
            </div>
            {error && (
              <div style={{ color: "#dc2626", marginBottom: 16 }}>{error}</div>
            )}
            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/locationmanagement")}
                disabled={loading}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading
                  ? stateId
                    ? "Updating..."
                    : "Adding..."
                  : stateId
                  ? "Update State"
                  : "Add State"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
