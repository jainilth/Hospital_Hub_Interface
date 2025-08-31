import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./GetCityDetailsById.module.css";

export default function GetStateDetailsById() {
  const { stateId } = useParams();
  const [state, setState] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5220/api/State/GetStateById/${stateId}`)
      .then((res) => {
        setState(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch state details", err);
      });
  }, [stateId]);

  if (!state) return <div>Loading state details...</div>;

  return (
    <div className={styles.cityDetailsContainer}>
      <h2 className={styles.cityDetailsHeader}>State Details</h2>
      <div
        className="table-container"
        style={{ maxWidth: 600, margin: "0 auto 24px" }}
      >
        <div className="table-wrapper">
          <table className="data-table">
            <tbody>
              <tr>
                <th>State Id</th>
                <td>{state.stateId}</td>
              </tr>
              <tr>
                <th>State Name</th>
                <td>{state.stateName}</td>
              </tr>
              <tr>
                <th>Country ID</th>
                <td>{state.countryId}</td>
              </tr>
              <tr>
                <th>Country Name</th>
                <td>{state.countryName || state.CountryName}</td>
              </tr>
              <tr>
                <th>Number of Cities</th>
                <td>{state.cityCount || state.CityCount || 0}</td>
              </tr>
              <tr>
                <th>Number of Hospitals</th>
                <td>{state.hospitalCount || state.HospitalCount || 0}</td>
              </tr>
              <tr>
                <th>Created Date</th>
                <td>{new Date(state.createdDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th>Modified Date</th>
                <td>
                  {state.modifiedDate
                    ? new Date(state.modifiedDate).toLocaleDateString()
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
