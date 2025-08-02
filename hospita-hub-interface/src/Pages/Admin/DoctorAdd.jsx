import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./DoctorAdd.css";

const initialState = {
  DoctorName: "",
  ConsultationFee: "",
  DoctorEmail: "",
  DoctorContectNo: "",
  DoctorGender: "",
  SpecializationId: "",
  DepartmentId: "",
  HospitalId: "",
  DoctorExperienceYears: "",
  Rating: "",
  UserId: "",
  ProfilePhoto: null,
  Qualification: "",
  AvailabilityStatus: "",
  StartWorkTime: "",
  EndWorkTime: "",
  TotalPatient: "",
  DoctorAddress: "",
  DoctorCityId: "",
  DoctorStateId: "",
  DoctorCountryId: ""
};

export default function DoctorAdd() {
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [fileName, setFileName] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [users, setUsers] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:5220/api/Specialization/GetAllSpecializations")
      .then(res => setSpecializations(res.data))
      .catch(() => setSpecializations([]));
    axios.get("http://localhost:5220/api/Department/GetAllDepartment")
      .then(res => setDepartments(res.data))
      .catch(() => setDepartments([]));
    axios.get("http://localhost:5220/api/Hospital/GetAllHospitals")
      .then(res => setHospitals(res.data))
      .catch(() => setHospitals([]));
    axios.get("http://localhost:5220/api/User/GetAllUsers")
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setFileName(files[0] ? files[0].name : "");
      if (files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImage(e.target.result);
        };
        reader.readAsDataURL(files[0]);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError(false);

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") submitData.append(key, value);
    });

    try {
      await axios.post(
        "http://localhost:5220/api/Doctor/AddDoctor",
        submitData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage("Doctor added successfully!");
      setFormData(initialState);
      setFileName("");
      setPreviewImage(null);
    } catch (err) {
      setMessage("Error adding doctor.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFileButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  return (
    <div className="doctor-add-container">
      {/* Header Section */}
      <div className="form-header">
        <div className="header-content">
          <h1 className="form-title">Add New Doctor</h1>
          <p className="form-subtitle">
            Register a new doctor to the healthcare platform
          </p>
        </div>
        <div className="header-icon">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>

      {/* Form Container */}
      <div className="form-container">
        <form className="doctor-form" onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="form-section">
            <div className="section-header">
              <h3 className="section-title">Personal Information</h3>
              <div className="section-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="DoctorName"
                  className="form-input"
                  placeholder="Enter doctor's full name"
                  value={formData.DoctorName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                  name="DoctorGender"
                  className="form-select"
                  value={formData.DoctorGender}
                  onChange={handleInputChange}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="DoctorEmail"
                  className="form-input"
                  placeholder="doctor@example.com"
                  value={formData.DoctorEmail}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="DoctorContectNo"
                  className="form-input"
                  placeholder="+91 98765 43210"
                  value={formData.DoctorContectNo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="form-section">
            <div className="section-header">
              <h3 className="section-title">Professional Information</h3>
              <div className="section-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Specialization *</label>
                <select
                  name="SpecializationId"
                  className="form-select"
                  value={formData.SpecializationId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select specialization</option>
                  {specializations.map((spec) => (
                    <option key={spec.specializationId || spec.SpecializationId} value={spec.specializationId || spec.SpecializationId}>
                      {spec.specializationName || spec.SpecializationName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Department *</label>
                <select
                  name="DepartmentId"
                  className="form-select"
                  value={formData.DepartmentId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select department</option>
                  {departments.map((dep) => (
                    <option key={dep.departmentId || dep.DepartmentId} value={dep.departmentId || dep.DepartmentId}>
                      {dep.departmentName || dep.DepartmentName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Hospital *</label>
                <select
                  name="HospitalId"
                  className="form-select"
                  value={formData.HospitalId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select hospital</option>
                  {hospitals.map((hos) => (
                    <option key={hos.hospitalId || hos.HospitalId} value={hos.hospitalId || hos.HospitalId}>
                      {hos.hospitalName || hos.HospitalName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Qualification *</label>
                <input
                  type="text"
                  name="Qualification"
                  className="form-input"
                  placeholder="e.g. MBBS, MD - Cardiology"
                  value={formData.Qualification}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Experience (Years) *</label>
                <input
                  type="number"
                  name="DoctorExperienceYears"
                  className="form-input"
                  placeholder="e.g. 5"
                  min="0"
                  max="50"
                  value={formData.DoctorExperienceYears}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Consultation Fee (₹) *</label>
                <input
                  type="number"
                  name="ConsultationFee"
                  className="form-input"
                  placeholder="e.g. 500"
                  min="0"
                  value={formData.ConsultationFee}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Rating</label>
                <input
                  type="number"
                  name="Rating"
                  className="form-input"
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="e.g. 4.5"
                  value={formData.Rating}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Availability Status</label>
                <input
                  type="text"
                  name="AvailabilityStatus"
                  className="form-input"
                  placeholder="e.g. Available"
                  value={formData.AvailabilityStatus}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Total Patients</label>
                <input
                  type="number"
                  name="TotalPatient"
                  className="form-input"
                  min="0"
                  placeholder="e.g. 100"
                  value={formData.TotalPatient}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Start Work Time</label>
                <input
                  type="time"
                  name="StartWorkTime"
                  className="form-input"
                  value={formData.StartWorkTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">End Work Time</label>
                <input
                  type="time"
                  name="EndWorkTime"
                  className="form-input"
                  value={formData.EndWorkTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">User *</label>
                <select
                  name="UserId"
                  className="form-select"
                  value={formData.UserId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select user</option>
                  {users.map((user) => (
                    <option key={user.userId || user.UserId} value={user.userId || user.UserId}>
                      {user.userName || user.UserName || (user.email || user.Email)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Location Information Section */}
          <div className="form-section">
            <div className="section-header">
              <h3 className="section-title">Location Information</h3>
              <div className="section-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="DoctorAddress"
                  className="form-input"
                  placeholder="Enter complete address"
                  value={formData.DoctorAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">City ID</label>
                <input
                  type="number"
                  name="DoctorCityId"
                  className="form-input"
                  placeholder="e.g. 1"
                  value={formData.DoctorCityId}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">State ID</label>
                <input
                  type="number"
                  name="DoctorStateId"
                  className="form-input"
                  placeholder="e.g. 2"
                  value={formData.DoctorStateId}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Country ID</label>
                <input
                  type="number"
                  name="DoctorCountryId"
                  className="form-input"
                  placeholder="e.g. 3"
                  value={formData.DoctorCountryId}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Profile & Additional Information Section */}
          <div className="form-section">
            <div className="section-header">
              <h3 className="section-title">
                Profile & Additional Information
              </h3>
              <div className="section-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group photo-upload">
                <label className="form-label">Profile Photo</label>
                <div className="photo-upload-container">
                  <div className="photo-preview">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="preview-image"
                      />
                    ) : (
                      <div className="photo-placeholder">
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="9" cy="9" r="2" />
                          <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                        <p>Upload Photo</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    name="ProfilePhoto"
                    className="file-input"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleInputChange}
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="file-upload-btn" onClick={handleFileButtonClick}>
                    Choose Photo
                  </label>
                  <p className="file-help-text">
                    {fileName ? (fileName.length > 22 ? fileName.slice(0, 19) + "..." : fileName) : "JPG, PNG or GIF (max. 5MB)"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" className="btn-secondary" disabled={loading}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {loading ? "Adding..." : "Add Doctor"}
            </button>
          </div>
        </form>
      </div>

      {message && (
        <div className={`doctor-form-message${error ? " error" : ""}`} style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '15px 20px',
          borderRadius: '8px',
          color: 'white',
          fontWeight: '500',
          zIndex: 1000,
          backgroundColor: error ? '#ef4444' : '#10b981'
        }}>
          {message}
        </div>
      )}
    </div>
  );
}
