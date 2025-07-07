import "./Hospital.css";

const Hospital = () => {
  // Static hospital data
  const hospitals = [
    {
      hospitalId: 1,
      hospitalName: "City General Hospital",
      hospitalType: "General Hospital",
      hospitalAddress: "123 Main Street, Downtown",
      cityId: 1,
      cityName: "New York",
      stateName: "New York",
      countryName: "USA",
      hospitalContactNo: "+1-555-0101",
      hospitalEmail: "info@citygeneralhospital.com",
      establishedDate: "1985-03-15",
      websiteURL: "www.citygeneralhospital.com",
      userId: 1,
      userName: "Dr. John Smith",
      totalDoctors: 45,
      totalDepartments: 12,
      status: "Active",
    },
    {
      hospitalId: 2,
      hospitalName: "St. Mary's Medical Center",
      hospitalType: "Specialty Hospital",
      hospitalAddress: "456 Oak Avenue, Midtown",
      cityId: 2,
      cityName: "Los Angeles",
      stateName: "California",
      countryName: "USA",
      hospitalContactNo: "+1-555-0102",
      hospitalEmail: "contact@stmarysmedical.com",
      establishedDate: "1978-08-22",
      websiteURL: "www.stmarysmedical.com",
      userId: 2,
      userName: "Dr. Sarah Johnson",
      totalDoctors: 38,
      totalDepartments: 8,
      status: "Active",
    },
    {
      hospitalId: 3,
      hospitalName: "Children's Healthcare Center",
      hospitalType: "Pediatric Hospital",
      hospitalAddress: "789 Pine Road, Uptown",
      cityId: 3,
      cityName: "Chicago",
      stateName: "Illinois",
      countryName: "USA",
      hospitalContactNo: "+1-555-0103",
      hospitalEmail: "info@childrenshealthcare.com",
      establishedDate: "1992-11-10",
      websiteURL: "www.childrenshealthcare.com",
      userId: 3,
      userName: "Dr. Michael Brown",
      totalDoctors: 28,
      totalDepartments: 6,
      status: "Active",
    },
    {
      hospitalId: 4,
      hospitalName: "Metro Emergency Hospital",
      hospitalType: "Emergency Hospital",
      hospitalAddress: "321 Elm Street, Central",
      cityId: 4,
      cityName: "Houston",
      stateName: "Texas",
      countryName: "USA",
      hospitalContactNo: "+1-555-0104",
      hospitalEmail: "emergency@metrohospital.com",
      establishedDate: "2001-05-18",
      websiteURL: "www.metroemergency.com",
      userId: 4,
      userName: "Dr. Emily Davis",
      totalDoctors: 52,
      totalDepartments: 15,
      status: "Active",
    },
    {
      hospitalId: 5,
      hospitalName: "Riverside Rehabilitation Center",
      hospitalType: "Rehabilitation Hospital",
      hospitalAddress: "654 River Drive, Westside",
      cityId: 5,
      cityName: "Phoenix",
      stateName: "Arizona",
      countryName: "USA",
      hospitalContactNo: "+1-555-0105",
      hospitalEmail: "info@riversiderehab.com",
      establishedDate: "1995-09-30",
      websiteURL: "www.riversiderehab.com",
      userId: 5,
      userName: "Dr. Robert Wilson",
      totalDoctors: 22,
      totalDepartments: 5,
      status: "Inactive",
    },
    {
      hospitalId: 6,
      hospitalName: "Advanced Cardiac Institute",
      hospitalType: "Cardiac Hospital",
      hospitalAddress: "987 Heart Lane, Northside",
      cityId: 6,
      cityName: "Miami",
      stateName: "Florida",
      countryName: "USA",
      hospitalContactNo: "+1-555-0106",
      hospitalEmail: "cardiac@advancedcardiac.com",
      establishedDate: "2005-12-08",
      websiteURL: "www.advancedcardiac.com",
      userId: 6,
      userName: "Dr. Lisa Anderson",
      totalDoctors: 35,
      totalDepartments: 7,
      status: "Active",
    },
    {
      hospitalId: 7,
      hospitalName: "Women's Health Clinic",
      hospitalType: "Women's Hospital",
      hospitalAddress: "147 Rose Street, Eastside",
      cityId: 7,
      cityName: "Seattle",
      stateName: "Washington",
      countryName: "USA",
      hospitalContactNo: "+1-555-0107",
      hospitalEmail: "info@womenshealthclinic.com",
      establishedDate: "1988-04-25",
      websiteURL: "www.womenshealthclinic.com",
      userId: 7,
      userName: "Dr. Maria Garcia",
      totalDoctors: 18,
      totalDepartments: 4,
      status: "Active",
    },
    {
      hospitalId: 8,
      hospitalName: "Orthopedic Surgery Center",
      hospitalType: "Orthopedic Hospital",
      hospitalAddress: "258 Bone Avenue, Southside",
      cityId: 8,
      cityName: "Denver",
      stateName: "Colorado",
      countryName: "USA",
      hospitalContactNo: "+1-555-0108",
      hospitalEmail: "ortho@orthosurgerycenter.com",
      establishedDate: "2010-07-14",
      websiteURL: "www.orthosurgerycenter.com",
      userId: 8,
      userName: "Dr. James Taylor",
      totalDoctors: 25,
      totalDepartments: 3,
      status: "Active",
    },
  ];

  const hospitalTypes = [
    "General Hospital",
    "Specialty Hospital",
    "Pediatric Hospital",
    "Emergency Hospital",
    "Rehabilitation Hospital",
    "Cardiac Hospital",
    "Women's Hospital",
    "Orthopedic Hospital",
  ];

  const getStatusColor = (status) => {
    return status === "Active" ? "status-active" : "status-inactive";
  };

  const getTypeColor = (type) => {
    const typeColors = {
      "General Hospital": "type-general",
      "Specialty Hospital": "type-specialty",
      "Pediatric Hospital": "type-pediatric",
      "Emergency Hospital": "type-emergency",
      "Rehabilitation Hospital": "type-rehab",
      "Cardiac Hospital": "type-cardiac",
      "Women's Hospital": "type-womens",
      "Orthopedic Hospital": "type-orthopedic",
    };
    return typeColors[type] || "type-default";
  };

  const totalHospitals = hospitals.length;
  const activeHospitals = hospitals.filter((h) => h.status === "Active").length;
  const totalDoctors = hospitals.reduce((sum, h) => sum + h.totalDoctors, 0);
  const totalDepartments = hospitals.reduce(
    (sum, h) => sum + h.totalDepartments,
    0
  );

  return (
    <div className="hospital-container">
      <div className="hospital-header">
        <h1>Hospital Management</h1>
        <p>Manage healthcare facilities and hospital information</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-number">{totalHospitals}</div>
          <div className="stat-label">Total Hospitals</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{activeHospitals}</div>
          <div className="stat-label">Active Hospitals</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalDoctors}</div>
          <div className="stat-label">Total Doctors</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalDepartments}</div>
          <div className="stat-label">Total Departments</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{hospitalTypes.length}</div>
          <div className="stat-label">Hospital Types</div>
        </div>
      </div>

      {/* Hospital Table */}
      <div className="hospital-table-container">
        <div className="table-header">
          <h2>Hospital Directory</h2>
          <div className="table-actions">
            <button className="add-hospital-btn">+ Add New Hospital</button>
            <button className="export-btn">📊 Export Data</button>
          </div>
        </div>

        <table className="hospital-table">
          <thead>
            <tr>
              <th>Hospital Info</th>
              <th>Type</th>
              <th>Location</th>
              <th>Contact Details</th>
              <th>Established</th>
              <th>Administrator</th>
              <th>Statistics</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map((hospital) => (
              <tr key={hospital.hospitalId}>
                <td>
                  <div className="hospital-info-cell">
                    <div className="hospital-icon">🏥</div>
                    <div className="hospital-details">
                      <strong>{hospital.hospitalName}</strong>
                      <small>ID: {hospital.hospitalId}</small>
                      <div className="website-link">
                        <a
                          href={`https://${hospital.websiteURL}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🌐 {hospital.websiteURL}
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`type-badge ${getTypeColor(
                      hospital.hospitalType
                    )}`}
                  >
                    {hospital.hospitalType}
                  </span>
                </td>
                <td>
                  <div className="location-cell">
                    <div className="address">{hospital.hospitalAddress}</div>
                    <div className="location-hierarchy">
                      <span className="city">{hospital.cityName}</span>
                      <span className="separator">•</span>
                      <span className="state">{hospital.stateName}</span>
                      <span className="separator">•</span>
                      <span className="country">{hospital.countryName}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="contact-cell">
                    <div className="contact-item">
                      <span className="contact-icon">📞</span>
                      <span className="contact-value">
                        {hospital.hospitalContactNo}
                      </span>
                    </div>
                    <div className="contact-item">
                      <span className="contact-icon">✉️</span>
                      <span className="contact-value">
                        {hospital.hospitalEmail}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="date-cell">
                    <strong>
                      {new Date(hospital.establishedDate).toLocaleDateString()}
                    </strong>
                    <small>
                      {Math.floor(
                        (new Date() - new Date(hospital.establishedDate)) /
                          (365.25 * 24 * 60 * 60 * 1000)
                      )}{" "}
                      years ago
                    </small>
                  </div>
                </td>
                <td>
                  <div className="admin-cell">
                    <div className="admin-avatar">
                      {hospital.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="admin-info">
                      <strong>{hospital.userName}</strong>
                      <small>User ID: {hospital.userId}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="stats-cell">
                    <div className="stat-item">
                      <span className="stat-icon">👨‍⚕️</span>
                      <span className="stat-text">
                        {hospital.totalDoctors} Doctors
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-icon">🏢</span>
                      <span className="stat-text">
                        {hospital.totalDepartments} Departments
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`status-badge ${getStatusColor(
                      hospital.status
                    )}`}
                  >
                    {hospital.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="view-btn" title="View Details">
                      👁️
                    </button>
                    <button className="edit-btn" title="Edit Hospital">
                      ✏️
                    </button>
                    <button className="delete-btn" title="Delete Hospital">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hospital Types Summary */}
      <div className="hospital-types-summary">
        <h3>Hospital Types Distribution</h3>
        <div className="types-grid">
          {hospitalTypes.map((type) => {
            const count = hospitals.filter(
              (h) => h.hospitalType === type
            ).length;
            return (
              <div key={type} className="type-summary-card">
                <div className={`type-icon ${getTypeColor(type)}`}>🏥</div>
                <div className="type-info">
                  <div className="type-name">{type}</div>
                  <div className="type-count">
                    {count} Hospital{count !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hospital;
