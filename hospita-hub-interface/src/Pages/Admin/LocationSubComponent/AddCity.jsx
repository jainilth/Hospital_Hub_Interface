import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../DashboardSubComponent/LocationManagement.css";

export default function AddCity() {
  const [cityName, setCityName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { cityId } = useParams();

  const API_BASE_URL = "http://localhost:5220/api";

  // Fetch countries on mount
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/Country/GetAllCountries`)
      .then((res) => setCountries(res.data))
      .catch(() => setCountries([]));
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (!countryId) {
      setStates([]);
      setStateId("");
      return;
    }
    axios
      .get(`${API_BASE_URL}/State/GetStatesByCountry/${countryId}`)
      .then((res) => setStates(res.data))
      .catch(() => setStates([]));
  }, [countryId]);

  // Fetch city data if editing
  useEffect(() => {
    if (cityId) {
      setLoading(true);
      axios
        .get(`${API_BASE_URL}/City/${cityId}`)
        .then((res) => {
          const city = res.data;
          setCityName(city.cityName);
          setCountryId(city.countryId);
          setStateId(city.stateId);
        })
        .catch(() => setError("Failed to load city data."))
        .finally(() => setLoading(false));
    }
  }, [cityId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (cityId) {
        // Update city
        await axios.put(`${API_BASE_URL}/City/${cityId}`, {
          cityId,
          cityName,
          stateId,
        });
        alert("City updated successfully!");
      } else {
        // Add new city
        await axios.post(`${API_BASE_URL}/City`, {
          cityName,
          stateId,
        });
        alert("City added successfully!");
      }
      navigate("/locationmanagement");
    } catch (err) {
      setError(
        cityId
          ? "Failed to update city. Please try again."
          : "Failed to add city. Please try again."
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
            {cityId ? "Edit City" : "Add New City"}
          </h1>
          <p className="dashboard-subtitle">
            {cityId
              ? "Update city details"
              : "Register a new city in the system"}
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
            {/* form fields */}
            <div className="form-group">
              <label htmlFor="cityName">City Name *</label>
              <input
                id="cityName"
                className="form-input"
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Enter city name"
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
            <div className="form-group">
              <label htmlFor="stateId">State *</label>
              <select
                id="stateId"
                className="form-input"
                value={stateId}
                onChange={(e) => setStateId(e.target.value)}
                required
                disabled={!countryId || loading}
              >
                <option value="">
                  {countryId ? "Select state" : "Select country first"}
                </option>
                {states.map((state) => (
                  <option key={state.stateId} value={state.stateId}>
                    {state.stateName}
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
                  ? cityId
                    ? "Updating..."
                    : "Adding..."
                  : cityId
                  ? "Update City"
                  : "Add City"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
