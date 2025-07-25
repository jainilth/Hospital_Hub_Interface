import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./GetCityDetailsById.module.css";

export default function GetCityDetailsById() {
  const { cityId } = useParams();
  const [city, setCity] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5220/api/City/${cityId}`)
      .then((res) => {
        setCity(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch city details", err);
      });
  }, [cityId]);

  if (!city) return <div>Loading city details...</div>;

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
                <th>City Id</th>
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
      <button onClick={() => window.history.back()} className={styles.backBtn}>
        ← Back
      </button>
    </div>
  );
}
