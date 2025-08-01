import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DoctorAdd.css";

export default function DoctorAdd() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialization: "",
    hospital: "",
    experience: "",
    qualification: "",
    consultationFee: "",
    address: "",
    city: "",
    state: "",
    country: "",
    licenseNumber: "",
    about: "",
    languages: "",
    profilePhoto: null,
    availabilityStatus: "NOT AVAILABLE",
    nextAvailable: "",
    totalPatients: "",
    rating: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field ${name} changed to: ${value}`); // Debug log
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: file,
      }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append("FullName", formData.fullName);
      submitData.append("Qualification", formData.qualification);
      submitData.append("Specialization", formData.specialization);
      submitData.append("ExperienceYears", formData.experience);
      submitData.append("Location_City", formData.city);
      submitData.append("Location_State", formData.state);
      submitData.append("AvailabilityStatus", formData.availabilityStatus);
      submitData.append("ConsultationFee", formData.consultationFee);
      submitData.append("NextAvailable", formData.nextAvailable);
      submitData.append("TotalPatients", formData.totalPatients);
      submitData.append("Rating", formData.rating);
      submitData.append("PhoneNumber", formData.phone);
      submitData.append("Email", formData.email);
      submitData.append("ProfileImageUrl", formData.profilePhoto);
      // Optionally add other fields if needed by backend
      // submitData.append('Hospital', formData.hospital);
      // submitData.append('Country', formData.country);
      // submitData.append('LicenseNumber', formData.licenseNumber);
      // submitData.append('About', formData.about);
      // submitData.append('Languages', formData.languages);

      await axios.post("http://localhost:5220/api/Doctors", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Doctor added successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        specialization: "",
        hospital: "",
        experience: "",
        qualification: "",
        consultationFee: "",
        address: "",
        city: "",
        state: "",
        country: "",
        licenseNumber: "",
        about: "",
        languages: "",
        profilePhoto: null,
        availabilityStatus: "NOT AVAILABLE",
        nextAvailable: "",
        totalPatients: "",
        rating: "",
      });
      setPreviewImage(null);
    } catch (error) {
      alert("Failed to add doctor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  function Specialities() {
    const [specializations, setSpecializations] = useState([]);

    useEffect(() => {
      axios
        .get("http://localhost:5220/api/Specialization/GetAllSpecializations")
        .then((res) => setSpecializations(res.data))
        .catch(() => setSpecializations([]));
    }, []);

    return (
      <>
        {specializations.map((spec, index) => (
          <option key={index} value={spec.specializationName}>{spec.specializationName}</option>
        ))}
      </>
    );
  }

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
                  name="fullName"
                  className="form-input"
                  placeholder="Enter doctor's full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="doctor@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* <div className="form-group">
                <label className="form-label">Medical License Number *</label>
                <input
                  type="text"
                  name="licenseNumber"
                  className="form-input"
                  placeholder="Enter license number"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  required
                />
              </div> */}
              gender
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
                  name="specialization"
                  className="form-select"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select specialization</option>
                  <Specialities />
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Qualification *</label>
                <input
                  type="text"
                  name="qualification"
                  className="form-input"
                  placeholder="e.g. MBBS, MD - Cardiology"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Experience (Years) *</label>
                <input
                  type="number"
                  name="experience"
                  className="form-input"
                  placeholder="e.g. 5"
                  min="0"
                  max="50"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Consultation Fee (₹) *</label>
                <input
                  type="number"
                  name="consultationFee"
                  className="form-input"
                  placeholder="e.g. 500"
                  min="0"
                  value={formData.consultationFee}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Hospital/Clinic *</label>
                <input
                  type="text"
                  name="hospital"
                  className="form-input"
                  placeholder="Enter hospital or clinic name"
                  value={formData.hospital}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Languages Spoken</label>
                <input
                  type="text"
                  name="languages"
                  className="form-input"
                  placeholder="e.g. English, Hindi, Gujarati"
                  value={formData.languages}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Availability Status *</label>
                <select
                  name="availabilityStatus"
                  className="form-select"
                  value={formData.availabilityStatus}
                  onChange={handleInputChange}
                  required
                >
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="NOT AVAILABLE">NOT AVAILABLE</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Next Available</label>
                <input
                  type="datetime-local"
                  name="nextAvailable"
                  className="form-input"
                  value={formData.nextAvailable}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">starting time</label>
                <input type="time" id="appointment-time" name="appointment-time" />
              </div>
              <div className="form-group">
                <label className="form-label">Total Patients</label>
                <input
                  type="number"
                  name="totalPatients"
                  className="form-input"
                  min="0"
                  value={formData.totalPatients}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Rating</label>
                <input
                  type="number"
                  name="rating"
                  className="form-input"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleInputChange}
                />
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
                <label className="form-label">Address *</label>
                <textarea
                  name="address"
                  className="form-textarea"
                  placeholder="Enter complete address"
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  name="city"
                  className="form-input"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">State *</label>
                <select
                  name="state"
                  className="form-select"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select state</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Country *</label>
                <select
                  name="country"
                  className="form-select"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
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
              <div className="form-group full-width">
                <label className="form-label">About Doctor</label>
                <textarea
                  name="about"
                  className="form-textarea"
                  placeholder="Brief description about the doctor's expertise and experience..."
                  rows="4"
                  value={formData.about}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="form-group photo-upload">
                <label className="form-label">Profile Photo</label>
                <div className="photo-upload-container">
                  <div className="photo-preview">
                    {previewImage ? (
                      <img
                        src={previewImage || "/placeholder.svg"}
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
                    name="profilePhoto"
                    className="file-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="file-upload-btn">
                    Choose Photo
                  </label>
                  <p className="file-help-text">JPG, PNG or GIF (max. 5MB)</p>
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
    </div>
  );
}
