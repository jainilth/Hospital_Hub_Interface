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
      .get(`${API_BASE_URL}/City/GetAllCity`)
      .then((res) => {
        console.log("Cities data:", res.data); // Debug log
        setCities(res.data);
      })
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
    console.log("Attempting to delete city with ID:", id); // Debug log
    if (!window.confirm("Are you sure you want to delete this city?")) return;

    const url = `${API_BASE_URL}/City/DeleteCity/${id}`;
    console.log("Delete URL:", url); // Debug log

    axios
      .delete(url)
      .then((response) => {
        console.log("Delete response:", response); // Debug log
        alert("City deleted successfully!");
        setCities((prev) => prev.filter((c) => (c.cityId || c.CityId) !== id));
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        console.error("Delete error response:", err.response); // Debug log
        alert("Failed to delete city. Please try again.");
      });
  };

  const handleDeleteCountry = (id) => {
    if (!window.confirm("Are you sure you want to delete this country?"))
      return;
    axios
      .delete(`${API_BASE_URL}/Country/DeleteCountry/${id}`)
      .then(() => {
        alert("Country deleted successfully!");
        setCountries((prev) => prev.filter((c) => c.countryId !== id));
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        alert("Failed to delete country. Please try again.");
      });
  };

  const handleDeleteState = (id) => {
    if (!window.confirm("Are you sure you want to delete this state?")) return;
    axios
      .delete(`${API_BASE_URL}/State/DeleteState/${id}`)
      .then(() => {
        alert("State deleted successfully!");
        setStates((prev) => prev.filter((s) => s.stateId !== id));
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        alert("Failed to delete state. Please try again.");
      });
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

  const handleAddClick = () => {
    if (activeTab === "countries") {
      navigate("/admin/locationmanagement/addCountry");
    } else if (activeTab === "states") {
      navigate("/admin/locationmanagement/addState");
    } else {
      navigate("/admin/locationmanagement/addCity");
    }
  };

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
        onAddClick={handleAddClick}
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
                    <td>{country.stateCount || country.StateCount || 0}</td>
                    <td>{country.cityCount || country.CityCount || 0}</td>
                    <td>{country.hospitalCount || country.HospitalCount || 0}</td>
                    <td>
                      <Link
                        className="edit-btn"
                        to={`/admin/locationmanagement/addCountry/${country.countryId}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteCountry(country.countryId)}
                      >
                        Delete
                      </button>
                      <Link
                        to={`/admin/locationmanagement/getCountry/${country.countryId}`}
                        className="readmore-btn"
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
                    <td>{state.cityCount || state.CityCount || 0}</td>
                    <td>{state.hospitalCount || state.HospitalCount || 0}</td>
                    <td>
                      <Link
                        className="edit-btn"
                        to={`/admin/locationmanagement/addState/${state.stateId}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteState(state.stateId)}
                      >
                        Delete
                      </button>
                      <Link
                        to={`/admin/locationmanagement/getState/${state.stateId}`}
                        className="readmore-btn"
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
                  <tr key={city.cityId || city.CityId}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{city.cityName}</td>
                    <td>{city.stateName}</td>
                    <td>{city.countryName}</td>
                    <td>{city.hospitalCount || city.HospitalCount || 0}</td>
                    <td>
                      <Link
                        className="edit-btn"
                        to={`/admin/locationmanagement/addCity/${
                          city.cityId || city.CityId
                        }`}
                      >
                        Edit
                      </Link>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDeleteCity(city.cityId || city.CityId)
                        }
                      >
                        Delete
                      </button>
                      <Link
                        className="readmore-btn"
                        to={`/admin/locationmanagement/getCity/${
                          city.cityId || city.CityId
                        }`}
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
