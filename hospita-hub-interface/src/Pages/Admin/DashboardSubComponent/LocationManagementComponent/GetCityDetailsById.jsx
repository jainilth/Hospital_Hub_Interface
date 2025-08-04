import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./GetCityDetailsById.module.css";

export default function GetCityDetailsById() {
  const { cityId } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:5220/api/City/GetCity/${cityId}`)
      .then((res) => {
        setCity(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch city details", err);
        setError("Failed to load city details. Please try again.");
        setLoading(false);
      });
  }, [cityId]);

  if (loading)
    return (
      <div className={styles.cityDetailsContainer}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "1.2rem", color: "#0ea5e9" }}>
            Loading city details...
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className={styles.cityDetailsContainer}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "1.2rem", color: "#ef4444" }}>{error}</div>
          <button
            onClick={() => window.history.back()}
            className={styles.backBtn}
            style={{ marginTop: "20px" }}
          >
            ← Back
          </button>
        </div>
      </div>
    );

  if (!city)
    return (
      <div className={styles.cityDetailsContainer}>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "1.2rem", color: "#ef4444" }}>
            City not found
          </div>
          <button
            onClick={() => window.history.back()}
            className={styles.backBtn}
            style={{ marginTop: "20px" }}
          >
            ← Back
          </button>
        </div>
      </div>
    );

  return (
    <div className={styles.cityDetailsContainer}>
      <h2 className={styles.cityDetailsHeader}>City Details</h2>

      <div
        className="table-container"
        style={{ maxWidth: 600, margin: "0 auto 24px" }}
      >
        <div className="table-wrapper">
          <table className="data-table">
            <tbody>
              <tr>
                <th>City ID</th>
                <td>{city.cityId}</td>
              </tr>
              <tr>
                <th>City Name</th>
                <td>{city.cityName}</td>
              </tr>
              <tr>
                <th>State Name</th>
                <td>{city.stateName}</td>
              </tr>
              <tr>
                <th>Country Name</th>
                <td>{city.countryName}</td>
              </tr>
              <tr>
                <th>State ID</th>
                <td>{city.stateId}</td>
              </tr>
              <tr>
                <th>Country ID</th>
                <td>{city.countryId}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button
          onClick={() => window.history.back()}
          className={styles.backBtn}
        >
          ← Back to List
        </button>
        <button
          onClick={() =>
            (window.location.href = `/locationmanagement/addCity/${city.cityId}`)
          }
          className={styles.editBtn}
        >
          Edit City
        </button>
      </div>
    </div>
  );
}
