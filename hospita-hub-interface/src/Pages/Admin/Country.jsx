import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Country() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:̥/api/Country")
      .then((response) => {
        console.log("Countries fetched:", response.data);
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  return (
    <div>
      <h2>Country List</h2>
      <ul>
        {countries.map((country) => (
          <li>{country.countryName}</li>
        ))}
      </ul>
    </div>
  );
}
