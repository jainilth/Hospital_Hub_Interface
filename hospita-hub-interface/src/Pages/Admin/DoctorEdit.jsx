"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./DoctorAdd.css"; // Reuse the same styles

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
  DoctorCountryId: "",
  languages: "",
  nextAvailable: "",
};

export default function DoctorEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(initialState);
  const [originalData, setOriginalData] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [fileName, setFileName] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [users, setUsers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const fileInputRef = useRef();

  useEffect(() => {
    // Load all required data and doctor details
    const loadData = async () => {
      try {
        const [
          doctorRes,
          specializationsRes,
          departmentsRes,
          hospitalsRes,
          usersRes,
          countriesRes,
        ] = await Promise.all([
          axios.get(`http://localhost:5220/api/Doctor/GetDoctorById/${id}`),
          axios.get("http://localhost:5220/api/Specialization/GetAllSpecializations"),
          axios.get("http://localhost:5220/api/Department/GetAllDepartment"),
          axios.get("http://localhost:5220/api/Hospital/GetAllHospitals"),
          axios.get("http://localhost:5220/api/User/GetAllUsers"),
          axios.get("http://localhost:5220/api/Country/GetAllCountries"),
        ]);

        // Set dropdown data
        setSpecializations(specializationsRes.data);
        setDepartments(departmentsRes.data);
        setHospitals(hospitalsRes.data);
        setUsers(usersRes.data);
        setCountries(countriesRes.data);

        // Set doctor data
        const doctor = doctorRes.data;
        setOriginalData(doctor);
        
        // Map doctor data to form fields with flexible property names
        const mappedData = {
          DoctorName: doctor.doctorName || doctor.DoctorName || "",
          ConsultationFee: doctor.consultationFee || doctor.ConsultationFee || "",
          DoctorEmail: doctor.doctorEmail || doctor.DoctorEmail || "",
          DoctorContectNo: doctor.doctorContectNo || doctor.DoctorContectNo || "",
          DoctorGender: doctor.doctorGender || doctor.DoctorGender || "",
          SpecializationId: doctor.specializationId || doctor.SpecializationId || "",
          DepartmentId: doctor.departmentId || doctor.DepartmentId || "",
          HospitalId: doctor.hospitalId || doctor.HospitalId || "",
          DoctorExperienceYears: doctor.doctorExperienceYears || doctor.DoctorExperienceYears || "",
          Rating: doctor.rating || doctor.Rating || "",
          UserId: doctor.userId || doctor.UserId || "",
          ProfilePhoto: null, // Don't set existing photo file
          Qualification: doctor.qualification || doctor.Qualification || "",
          AvailabilityStatus: doctor.availabilityStatus || doctor.AvailabilityStatus || "",
          StartWorkTime: doctor.startWorkTime || doctor.StartWorkTime || "",
          EndWorkTime: doctor.endWorkTime || doctor.EndWorkTime || "",
          TotalPatient: doctor.totalPatient || doctor.TotalPatient || "",
          DoctorAddress: doctor.doctorAddress || doctor.DoctorAddress || "",
          DoctorCityId: doctor.doctorCityId || doctor.DoctorCityId || "",
          DoctorStateId: doctor.doctorStateId || doctor.DoctorStateId || "",
          DoctorCountryId: doctor.doctorCountryId || doctor.DoctorCountryId || "",
          languages: doctor.languages || "",
          nextAvailable: doctor.nextAvailable || "",
        };
        
        setFormData(mappedData);
        
        // Set preview image if doctor has photo
        const photoUrl = doctor.doctorPhotoUrl || doctor.DoctorPhotoUrl;
        if (photoUrl) {
          setPreviewImage(photoUrl);
        }
        
      } catch (err) {
        console.error("Error loading data:", err);
        setMessage("Error loading doctor data. Please try again.");
        setError(true);
      } finally {
        setDataLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);

  // Load states when country changes
  useEffect(() => {
    if (formData.DoctorCountryId) {
      axios
        .get(`http://localhost:5220/api/State/GetStatesByCountry/GetStatesByCountry/${formData.DoctorCountryId}`)
        .then((res) => setStates(res.data))
        .catch(() => setStates([]));
    } else {
      setStates([]);
      setFormData((prev) => ({ ...prev, DoctorStateId: "", DoctorCityId: "" }));
    }
  }, [formData.DoctorCountryId]);

  // Load cities when state changes
  useEffect(() => {
    if (formData.DoctorStateId) {
      axios
        .get(`http://localhost:5220/api/City/GetCitiesByState/GetCitiesByState/${formData.DoctorStateId}`)
        .then((res) => setCities(res.data))
        .catch(() => setCities([]));
    } else {
      setCities([]);
      setFormData((prev) => ({ ...prev, DoctorCityId: "" }));
    }
  }, [formData.DoctorStateId]);

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

    // Basic validation
    if (
      !formData.DoctorName ||
      !formData.DoctorEmail ||
      !formData.DoctorContectNo
    ) {
      setMessage("Please fill in all required fields.");
      setError(true);
      setLoading(false);
      return;
    }

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") submitData.append(key, value);
    });

    console.log("Submitting doctor update:");
    console.log("Doctor ID:", id);
    console.log("Form Data:", formData);
    console.log("FormData entries:");
    for (let [key, value] of submitData.entries()) {
      console.log(key, value);
    }

    try {
      console.log("Making PUT request to:", `http://localhost:5220/api/Doctor/UpdateDoctor/${id}`);
      const response = await axios.put(
        `http://localhost:5220/api/Doctor/UpdateDoctor/${id}`,
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Update response:", response);
      setMessage("Doctor updated successfully!");
      // Navigate back to doctor list after successful update
      setTimeout(() => {
        navigate('/admin/doctorList');
      }, 2000);
    } catch (err) {
      console.error("Error updating doctor:", err);
      console.error("Error details:", err.response?.data);
      console.error("Error status:", err.response?.status);
      console.error("Error headers:", err.response?.headers);
      
      let errorMessage = "Error updating doctor. Please check all required fields and try again.";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.status === 404) {
        errorMessage = "Update endpoint not found. The UpdateDoctor API endpoint needs to be implemented in the backend.";
      } else if (err.response?.status === 400) {
        errorMessage = `Bad Request: ${err.response?.data?.title || err.response?.data?.message || 'Invalid data format'}`;
      } else if (err.response?.status === 500) {
        errorMessage = "Server error. Please check the backend logs.";
      }
      
      setMessage(errorMessage);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFileButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  if (dataLoading) {
    return (
      <div className="doctor-add-container">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>Loading doctor data...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-add-container">
      {/* Header Section */}
      <div className="form-header">
        <div className="header-content">
          <h1 className="form-title">Edit Doctor</h1>
          <p className="form-subtitle">
            Update doctor information in the healthcare platform
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
                  required
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
                  required
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
                    <option
                      key={spec.specializationId || spec.SpecializationId}
                      value={spec.specializationId || spec.SpecializationId}
                    >
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
                    <option
                      key={dep.departmentId || dep.DepartmentId}
                      value={dep.departmentId || dep.DepartmentId}
                    >
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
                    <option
                      key={hos.hospitalId || hos.HospitalId}
                      value={hos.hospitalId || hos.HospitalId}
                    >
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
                  required
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
                  required
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
                <label className="form-label">Availability Status *</label>
                <select
                  name="AvailabilityStatus"
                  className="form-select"
                  value={formData.AvailabilityStatus}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select availability</option>
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="On Leave">On Leave</option>
                </select>
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
                    <option
                      key={user.userId || user.UserId}
                      value={user.userId || user.UserId}
                    >
                      {user.userName ||
                        user.UserName ||
                        user.email ||
                        user.Email}
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
                <label className="form-label">Country *</label>
                <select
                  name="DoctorCountryId"
                  className="form-select"
                  value={formData.DoctorCountryId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select country</option>
                  {countries.map((country) => (
                    <option
                      key={country.countryId || country.CountryId}
                      value={country.countryId || country.CountryId}
                    >
                      {country.countryName || country.CountryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">State *</label>
                <select
                  name="DoctorStateId"
                  className="form-select"
                  value={formData.DoctorStateId}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.DoctorCountryId}
                >
                  <option value="">
                    {formData.DoctorCountryId
                      ? "Select state"
                      : "Select country first"}
                  </option>
                  {states.map((state) => (
                    <option
                      key={state.stateId || state.StateId}
                      value={state.stateId || state.StateId}
                    >
                      {state.stateName || state.StateName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">City *</label>
                <select
                  name="DoctorCityId"
                  className="form-select"
                  value={formData.DoctorCityId}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.DoctorStateId}
                >
                  <option value="">
                    {formData.DoctorStateId
                      ? "Select city"
                      : "Select state first"}
                  </option>
                  {cities.map((city) => (
                    <option
                      key={city.cityId || city.CityId}
                      value={city.cityId || city.CityId}
                    >
                      {city.cityName || city.CityName}
                    </option>
                  ))}
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
                    name="ProfilePhoto"
                    className="file-input"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleInputChange}
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="file-upload-btn"
                    onClick={handleFileButtonClick}
                  >
                    Choose Photo
                  </label>
                  <p className="file-help-text">
                    {fileName
                      ? fileName.length > 22
                        ? fileName.slice(0, 19) + "..."
                        : fileName
                      : "JPG, PNG or GIF (max. 5MB)"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary" 
              disabled={loading}
              onClick={() => navigate('/admin/doctorList')}
            >
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
              {loading ? "Updating..." : "Update Doctor"}
            </button>
          </div>
        </form>
      </div>

      {message && (
        <div
          className={`doctor-form-message${error ? " error" : ""}`}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "15px 20px",
            borderRadius: "8px",
            color: "white",
            fontWeight: "500",
            zIndex: 1000,
            backgroundColor: error ? "#ef4444" : "#10b981",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
