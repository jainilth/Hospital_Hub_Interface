import { useEffect, useState } from "react";
import axios from "axios";
import "./LocationManagement.css";
import { Link, useNavigate } from "react-router-dom";
import LocationHeader from "../../Admin/DashboardSubComponent/LocationManagementComponent/LocationTableHeader";

export default function LocationManagement() {
  const [activeTab, setActiveTab] = useState("countries");
  const [showAddModal, setShowAddModal] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:5220/api";

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/Country/GetAllCountries`)
      .then((res) => setCountries(res.data))
      .catch((err) => console.error("Error loading countries:", err));
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/State/GetALlSatate`)
      .then((res) => setStates(res.data))
      .catch((err) => console.error("Error loading states:", err));
  }, []);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/City`)
      .then((res) => setCities(res.data))
      .catch((err) => console.error("Error loading cities:", err));
  }, []);

  const handleExportData = async () => {
    try {
      let url = "";
      if (activeTab === "countries")
        url = `${API_BASE_URL}/Country/ExportToExcel`;
      else if (activeTab === "states")
        url = `${API_BASE_URL}/State/ExportToExcel`;
      else url = `${API_BASE_URL}/City/ExportToExcel`;

      const response = await axios.get(url, { responseType: "blob" });
      const fileName = `${activeTab}_data.xlsx`;
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(new Blob([response.data]));
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data.");
    }
  };

  const handleDeleteCity = (id) => {
    if (!window.confirm("Are you sure?")) return;
    axios
      .delete(`${API_BASE_URL}/City/${id}`)
      .then(() => {
        alert("City Deleted");
        setCities((prev) => prev.filter((c) => c.cityId !== id));
      })
      .catch(() => alert("Delete failed"));
  };

  const handleDeleteCountry = (id) => {
    if (!window.confirm("Are you sure?")) return;
    // Add API call here
    alert("Country delete not implemented");
  };

  const handleDeleteState = (id) => {
    if (!window.confirm("Are you sure?")) return;
    // Add API call here
    alert("State delete not implemented");
  };

  const getHeaderProps = () => {
    if (activeTab === "countries") {
      return {
        title: "Country Management",
        subtitle: "Manage Countries and Their Data",
        addButtonLabel: "Add Country",
      };
    } else if (activeTab === "states") {
      return {
        title: "State Management",
        subtitle: "Manage States under Countries",
        addButtonLabel: "Add State",
      };
    } else {
      return {
        title: "City Management",
        subtitle: "Manage Cities, States, and Countries",
        addButtonLabel: "Add City",
      };
    }
  };

  const { title, subtitle, addButtonLabel } = getHeaderProps();

  return (
    <div className="location-management">
      <div className="location-tabs">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === "countries" ? "active" : ""}`}
            onClick={() => setActiveTab("countries")}
          >
            Countries ({countries.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "states" ? "active" : ""}`}
            onClick={() => setActiveTab("states")}
          >
            States ({states.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "cities" ? "active" : ""}`}
            onClick={() => setActiveTab("cities")}
          >
            Cities ({cities.length})
          </button>
        </div>
      </div>

      <LocationHeader
        title={title}
        subtitle={subtitle}
        onExport={handleExportData}
        onAddClick={() => setShowAddModal(true)}
        addButtonLabel={addButtonLabel}
      />

      <div className="location-tables">
        {activeTab === "countries" && (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Country Name</th>
                  <th>States</th>
                  <th>Cities</th>
                  <th>Hospitals</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {countries.map((country) => (
                  <tr key={country.countryId}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{country.countryName}</td>
                    <td>{country.stateCount}</td>
                    <td>{country.cityCount}</td>
                    <td>{country.hospitalCount}</td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(`/edit-country/${country.countryId}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCountry(country.countryId)}
                      >
                        Delete
                      </button>
                      <Link to={`/country/${country.countryId}`}>
                        <button>Read More</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "states" && (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th></th>
                  <th>State Name</th>
                  <th>Country</th>
                  <th>Cities</th>
                  <th>Hospitals</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {states.map((state) => (
                  <tr key={state.stateId}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{state.stateName}</td>
                    <td>{state.countryName}</td>
                    <td>{state.cityCount}</td>
                    <td>{state.hospitalCount}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/edit-state/${state.stateId}`)}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDeleteState(state.stateId)}>
                        Delete
                      </button>
                      <Link to={`/state/${state.stateId}`}>
                        <button>Read More</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "cities" && (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th></th>
                  <th>City Name</th>
                  <th>State Name</th>
                  <th>Country Name</th>
                  <th>Hospitals</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cities.map((city) => (
                  <tr key={city.cityId}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{city.cityName}</td>
                    <td>{city.stateName}</td>
                    <td>{city.countryName}</td>
                    <td>{city.hospitalCount}</td>
                    <td>
                      <Link
                        className="edit-btn"
                        to={`/locationmanagement/addCity/${city.cityId}`}
                      >
                        Edit
                      </Link>
                      <button onClick={() => handleDeleteCity(city.cityId)}>
                        Delete
                      </button>
                      <Link
                        className="readmore-btn"
                        to={`/locationmanagement/getCity/${city.cityId}`}
                      >
                        Read More
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
