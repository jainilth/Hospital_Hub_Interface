import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DoctorList.css";
import { Link } from "react-router-dom";

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    // Fetch doctors
    axios
      .get("http://localhost:5220/api/Doctor/GetAllDoctors")
      .then((res) => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setDoctors([]);
        setLoading(false);
      });

    // Fetch specializations
    axios
      .get("http://localhost:5220/api/Doctor/GetAllSpecializations")
      .then((res) => {
        setSpecializations(res.data);
      })
      .catch((err) => {
        console.error("Specialization API Error:", err);
        setSpecializations([]);
      });
  }, []);

  if (loading) {
    return (
      <div className="doctor-list-container">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>Loading doctors...</h2>
        </div>
      </div>
    );
  }

  // Apply filters
  const filteredDoctors = doctors.filter((doc) => {
    const name = doc.doctorName || doc.DoctorName || "";
    const specialization =
      doc.specializationName || doc.specialization || doc.Specialization || "";
    const status = doc.availabilityStatus || doc.AvailabilityStatus || "";

    return (
      (name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        specialization.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (specializationFilter === "" ||
        specialization.toLowerCase() === specializationFilter.toLowerCase()) &&
      (statusFilter === "" ||
        status.toLowerCase() === statusFilter.toLowerCase())
    );
  });

  return (
    <div className="doctor-list-container">
      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <span className="stat-label">Total Doctors</span>
              <span className="stat-value">{filteredDoctors.length}</span>
            </div>
            <div className="stat-icon total">{filteredDoctors.length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <span className="stat-label">Available Now</span>
              <span className="stat-value available">
                {
                  filteredDoctors.filter(
                    (doc) =>
                      (doc.availabilityStatus || doc.AvailabilityStatus) ===
                      "Available"
                  ).length
                }
              </span>
            </div>
            <div className="stat-icon available">
              {
                filteredDoctors.filter(
                  (doc) =>
                    (doc.availabilityStatus || doc.AvailabilityStatus) ===
                    "Available"
                ).length
              }
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <span className="stat-label">Busy</span>
              <span className="stat-value busy">
                {
                  filteredDoctors.filter(
                    (doc) =>
                      (doc.availabilityStatus || doc.AvailabilityStatus) ===
                      "Busy"
                  ).length
                }
              </span>
            </div>
            <div className="stat-icon busy">
              {
                filteredDoctors.filter(
                  (doc) =>
                    (doc.availabilityStatus || doc.AvailabilityStatus) ===
                    "Busy"
                ).length
              }
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <span className="stat-label">On Leave</span>
              <span className="stat-value leave">
                {
                  filteredDoctors.filter(
                    (doc) =>
                      (doc.availabilityStatus || doc.AvailabilityStatus) ===
                      "On Leave"
                  ).length
                }
              </span>
            </div>
            <div className="stat-icon leave">
              {
                filteredDoctors.filter(
                  (doc) =>
                    (doc.availabilityStatus || doc.AvailabilityStatus) ===
                    "On Leave"
                ).length
              }
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search doctors by name or specialization..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filters">
          {/* Dynamic specialization dropdown */}
          <select
            className="filter-select"
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
          >
            <option value="">All Specializations</option>
            {specializations.map((spec) => (
              <option
                key={spec.specializationId || spec.id}
                value={spec.specializationName}
              >
                {spec.specializationName}
              </option>
            ))}
          </select>

          {/* Status filter */}
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
      </div>

      {/* Doctors List */}
      <div className="doctors-list">
        {filteredDoctors.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>No doctors found</h2>
            <p>No doctors match your search or filter criteria.</p>
          </div>
        ) : (
          filteredDoctors.map((doc, index) => (
            <div
              className="doctor-card"
              key={doc.doctorId || doc.DoctorId || index}
            >
              <div className="doctor-card-left">
                <div className="doctor-image">
                  {doc.doctorPhotoUrl || doc.DoctorPhotoUrl ? (
                    <img
                      src={doc.doctorPhotoUrl || doc.DoctorPhotoUrl}
                      alt={doc.doctorName || doc.DoctorName}
                    />
                  ) : (
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt={doc.doctorName || doc.DoctorName}
                    />
                  )}
                </div>
                <div className="doctor-basic-info">
                  <h3 className="doctor-name">
                    {doc.doctorName || doc.DoctorName || "N/A"}
                  </h3>
                  <p className="doctor-qualification">
                    {doc.qualification || doc.Qualification || "N/A"}
                  </p>
                  <div className="doctor-specialization">
                    <span className="specialization-badge">
                      Specialization: {doc.specializationName || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="doctor-card-center">
                <div className="doctor-details">
                  <div className="detail-row">
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">
                      {doc.doctorExperienceYears ||
                        doc.DoctorExperienceYears ||
                        "N/A"}{" "}
                      years
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">
                      {doc.doctorAddress || doc.DoctorAddress || "N/A"}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Consultation Fee:</span>
                    <span className="detail-value fee">
                      ₹
                      {doc.consultationFee || doc.ConsultationFee || "N/A"}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Department ID:</span>
                    <span className="detail-value next-available">
                      {doc.departmentId || doc.DepartmentId || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="doctor-stats">
                  <div className="stat-item">
                    <span className="stat-number">
                      {doc.totalPatient || doc.TotalPatient || "N/A"}
                    </span>
                    <span className="stat-text">Patients</span>
                  </div>
                  <div className="stat-item">
                    <span className="rating">
                      <span className="star">★</span>
                      {doc.rating || doc.Rating || "N/A"}
                    </span>
                    <span className="stat-text">Rating</span>
                  </div>
                </div>

                <div className="doctor-contact">
                  <div className="contact-info">
                    <div className="contact-item">
                      <span className="contact-icon">📞</span>
                      <span className="contact-text">
                        {doc.doctorContectNo || doc.DoctorContectNo || "N/A"}
                      </span>
                    </div>
                    <div className="contact-item">
                      <span className="contact-icon">✉️</span>
                      <span className="contact-text">
                        {doc.doctorEmail || doc.DoctorEmail || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="doctor-card-right">
                <div
                  className={`status-badge ${(doc.availabilityStatus ||
                    doc.AvailabilityStatus ||
                    "").toLowerCase().replace(" ", "")}`}
                >
                  {doc.availabilityStatus || doc.AvailabilityStatus || "N/A"}
                </div>
                <div className="doctor-actions">
                  <button className="action-btn view-btn">View</button>
                  <button className="action-btn edit-btn">Edit</button>
                  <button className="action-btn delete-btn">Delete</button>
                </div>
              </div>
              <Link className="specialty-practo-link" to="chat">
                Consult now &gt;
              </Link>
              <Link>Message</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
