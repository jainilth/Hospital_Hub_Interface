import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./GetCityDetailsById.module.css";

export default function GetCountryDetailsById() {
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5220/api/Country/GetCountryById/${countryId}`)
      .then((res) => {
        setCountry(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch country details", err);
      });
  }, [countryId]);

  if (!country) return <div>Loading country details...</div>;

  return (
    <div className={styles.cityDetailsContainer}>
      <h2 className={styles.cityDetailsHeader}>Country Details</h2>
      <div
        className="table-container"
        style={{ maxWidth: 600, margin: "0 auto 24px" }}
      >
        <div className="table-wrapper">
          <table className="data-table">
            <tbody>
              <tr>
                <th>Country Id</th>
                <td>{country.countryId}</td>
              </tr>
              <tr>
                <th>Country Name</th>
                <td>{country.countryName}</td>
              </tr>
              <tr>
                <th>Created Date</th>
                <td>{new Date(country.createdDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th>Modified Date</th>
                <td>
                  {country.modifiedDate
                    ? new Date(country.modifiedDate).toLocaleDateString()
                    : "Not modified"}
                </td>
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
