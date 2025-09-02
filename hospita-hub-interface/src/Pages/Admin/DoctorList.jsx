import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./DoctorList.css";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";

export default function DoctorList() {
  const navigate = useNavigate();
  
  // Pagination and search states
  const [doctorsData, setDoctorsData] = useState({
    data: [],
    totalRecords: 0,
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("DoctorName");
  const [sortDirection, setSortDirection] = useState("asc");
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const API_BASE_URL = "http://localhost:5220/api";

  // Function to fetch doctors with pagination
  const fetchDoctors = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setSearchLoading(true);
      }

      const params = new URLSearchParams({
        pageNumber: currentPage.toString(),
        pageSize: itemsPerPage.toString(),
        searchTerm: debouncedSearchTerm,
        specializationFilter: specializationFilter,
        statusFilter: statusFilter,
        sortBy: sortBy,
        sortDirection: sortDirection,
      });

      console.log("Fetching doctors with params:", params.toString());
      const response = await axios.get(
        `${API_BASE_URL}/Doctor/GetDoctorsWithPagination?${params}`
      );
      
      console.log("API Response:", response.data);
      setDoctorsData(response.data);
    } catch (err) {
      console.error("API Error:", err);
      console.error("API Error Details:", err.response?.data);
      
      // If the pagination endpoint fails, try the regular endpoint as fallback
      try {
        console.log("Trying fallback endpoint...");
        const fallbackResponse = await axios.get(`${API_BASE_URL}/Doctor/GetAllDoctors`);
        console.log("Fallback response:", fallbackResponse.data);
        
        setDoctorsData({
          data: fallbackResponse.data || [],
          totalRecords: fallbackResponse.data?.length || 0,
          pageNumber: 1,
          pageSize: itemsPerPage,
          totalPages: 1,
          hasPreviousPage: false,
          hasNextPage: false,
          startRecord: 1,
          endRecord: fallbackResponse.data?.length || 0
        });
      } catch (fallbackErr) {
        console.error("Fallback API Error:", fallbackErr);
        setDoctorsData({
          data: [],
          totalRecords: 0,
          pageNumber: 1,
          pageSize: 10,
          totalPages: 0,
          hasPreviousPage: false,
          hasNextPage: false,
        });
      }
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearchTerm, specializationFilter, statusFilter, sortBy, sortDirection]);

  // Initial data load
  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  // Fetch specializations
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/Specialization/GetAllSpecializations`)
      .then((res) => {
        console.log("Specializations loaded:", res.data);
        setSpecializations(res.data);
      })
      .catch((err) => {
        console.error("Specialization API Error:", err);
        setSpecializations([]);
      });
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm, specializationFilter, statusFilter]);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newSize) => {
    setItemsPerPage(parseInt(newSize));
    setCurrentPage(1); // Reset to first page
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
    setCurrentPage(1); // Reset to first page
  };

  // Handle View Doctor
  const handleViewDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setViewModalOpen(true);
  };

  // Handle Edit Doctor
  const handleEditDoctor = (doctor) => {
    // Navigate to edit page with doctor ID
    navigate(`/admin/doctorEdit/${doctor.doctorId || doctor.DoctorId}`);
  };

  // Handle Delete Doctor
  const handleDeleteDoctor = (doctor) => {
    setDoctorToDelete(doctor);
    setDeleteModalOpen(true);
  };

  // Confirm Delete Doctor
  const confirmDeleteDoctor = async () => {
    if (!doctorToDelete) return;
    
    setDeleteLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/Doctor/DeleteDoctor/${doctorToDelete.doctorId || doctorToDelete.DoctorId}`);
      
      // Refresh the doctors list
      await fetchDoctors();
      
      setDeleteModalOpen(false);
      setDoctorToDelete(null);
    } catch (err) {
      console.error("Error deleting doctor:", err);
      alert("Error deleting doctor. Please try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Handle Consult Now
  const handleConsultNow = (doctor) => {
    // Navigate to patient chat interface
    navigate(`/patient/chat?doctorId=${doctor.doctorId || doctor.DoctorId}`);
  };

  // Handle Message
  const handleMessage = (doctor) => {
    // Navigate to messaging interface
    navigate(`/patient/chat?doctorId=${doctor.doctorId || doctor.DoctorId}&mode=message`);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const totalPages = doctorsData.totalPages;
    const current = currentPage;
    
    // Show up to 5 page numbers around current page
    let start = Math.max(1, current - 2);
    let end = Math.min(totalPages, current + 2);
    
    // Adjust if we're near the beginning or end
    if (end - start < 4) {
      if (start === 1) {
        end = Math.min(totalPages, start + 4);
      } else {
        start = Math.max(1, end - 4);
      }
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (loading) {
    return (
      <div className="doctor-list-container">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>Loading doctors...</h2>
        </div>
      </div>
    );
  }

  const doctors = doctorsData.data || [];

  return (
    <div className="doctor-list-container">
      {/* Header Section */}
      <div className="doctor-list-header">
        <h1>Doctor Management</h1>
        <p>Manage doctors, their specializations, and availability</p>
        <Link to="/admin/doctorAdd" className="add-doctor-btn">
          + Add New Doctor
        </Link>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <span className="stat-label">Total Doctors</span>
              <span className="stat-value">{doctorsData.totalRecords}</span>
            </div>
            <div className="stat-icon total">{doctorsData.totalRecords}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <span className="stat-label">Available Now</span>
              <span className="stat-value available">
                {
                  doctors.filter(
                    (doc) =>
                      (doc.availabilityStatus || doc.AvailabilityStatus) ===
                      "Available"
                  ).length
                }
              </span>
            </div>
            <div className="stat-icon available">
              {
                doctors.filter(
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
                  doctors.filter(
                    (doc) =>
                      (doc.availabilityStatus || doc.AvailabilityStatus) ===
                      "Busy"
                  ).length
                }
              </span>
            </div>
            <div className="stat-icon busy">
              {
                doctors.filter(
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
                  doctors.filter(
                    (doc) =>
                      (doc.availabilityStatus || doc.AvailabilityStatus) ===
                      "On Leave"
                  ).length
                }
              </span>
            </div>
            <div className="stat-icon leave">
              {
                doctors.filter(
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
        <div className="search-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search doctors by name, email, qualification..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchLoading && <div className="search-loading">🔍</div>}
          </div>
          
          <div className="items-per-page">
            <label>Show:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(e.target.value)}
              className="items-select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>per page</span>
          </div>
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
          
          {/* Sort controls */}
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="DoctorName">Sort by Name</option>
            <option value="Specialization">Sort by Specialization</option>
            <option value="Experience">Sort by Experience</option>
            <option value="Rating">Sort by Rating</option>
            <option value="ConsultationFee">Sort by Fee</option>
          </select>
          
          <button
            className="sort-direction-btn"
            onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
            title={`Sort ${sortDirection === "asc" ? "Descending" : "Ascending"}`}
          >
            {sortDirection === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        {searchLoading ? (
          <p>Searching...</p>
        ) : (
          <p>
            Showing {doctorsData.startRecord || 0} to {doctorsData.endRecord || 0} of{" "}
            {doctorsData.totalRecords} doctors
            {(debouncedSearchTerm || specializationFilter || statusFilter) && (
              <span className="filter-indicator"> (filtered)</span>
            )}
          </p>
        )}
      </div>

      {/* Doctors List */}
      <div className="doctors-list">
        {searchLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner">Loading...</div>
          </div>
        )}
        
        {doctors.length === 0 && !searchLoading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>No doctors found</h2>
            <p>No doctors match your search or filter criteria.</p>
          </div>
        ) : (
          doctors.map((doc, index) => (
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
                  <button 
                    className="action-btn view-btn"
                    onClick={() => handleViewDoctor(doc)}
                  >
                    View
                  </button>
                  <button 
                    className="action-btn edit-btn"
                    onClick={() => handleEditDoctor(doc)}
                  >
                    Edit
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteDoctor(doc)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <button 
                className="specialty-practo-link consult-btn"
                onClick={() => handleConsultNow(doc)}
              >
                Consult now &gt;
              </button>
              <button 
                className="message-btn"
                onClick={() => handleMessage(doc)}
              >
                Message
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {doctorsData.totalPages > 1 && (
        <div className="pagination-container">
          <div className="pagination-info">
            <span>
              Showing {doctorsData.startRecord} to {doctorsData.endRecord} of{" "}
              {doctorsData.totalRecords} entries
            </span>
          </div>
          
          <div className="pagination-controls">
            {/* First page button */}
            <button
              onClick={() => handlePageChange(1)}
              disabled={!doctorsData.hasPreviousPage || searchLoading}
              className="pagination-btn"
              title="First page"
            >
              ⟪
            </button>
            
            {/* Previous page button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!doctorsData.hasPreviousPage || searchLoading}
              className="pagination-btn"
              title="Previous page"
            >
              ⟨
            </button>
            
            {/* Page numbers */}
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`pagination-btn ${
                  pageNum === currentPage ? "active" : ""
                }`}
                disabled={searchLoading}
              >
                {pageNum}
              </button>
            ))}
            
            {/* Next page button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!doctorsData.hasNextPage || searchLoading}
              className="pagination-btn"
              title="Next page"
            >
              ⟩
            </button>
            
            {/* Last page button */}
            <button
              onClick={() => handlePageChange(doctorsData.totalPages)}
              disabled={!doctorsData.hasNextPage || searchLoading}
              className="pagination-btn"
              title="Last page"
            >
              ⟫
            </button>
          </div>
        </div>
      )}
      
      {/* View Doctor Modal */}
      {viewModalOpen && selectedDoctor && (
        <div className="modal-overlay" onClick={() => setViewModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Doctor Details</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setViewModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="doctor-detail-grid">
                <div className="detail-section">
                  <h3>Personal Information</h3>
                  <div className="detail-item">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{selectedDoctor.doctorName || selectedDoctor.DoctorName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{selectedDoctor.doctorEmail || selectedDoctor.DoctorEmail}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{selectedDoctor.doctorContectNo || selectedDoctor.DoctorContectNo}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">{selectedDoctor.doctorAddress || selectedDoctor.DoctorAddress || 'N/A'}</span>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h3>Professional Information</h3>
                  <div className="detail-item">
                    <span className="detail-label">Specialization:</span>
                    <span className="detail-value">{selectedDoctor.specializationName || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Qualification:</span>
                    <span className="detail-value">{selectedDoctor.qualification || selectedDoctor.Qualification || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">{selectedDoctor.doctorExperienceYears || selectedDoctor.DoctorExperienceYears || 'N/A'} years</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Consultation Fee:</span>
                    <span className="detail-value">₹{selectedDoctor.consultationFee || selectedDoctor.ConsultationFee || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Rating:</span>
                    <span className="detail-value">⭐ {selectedDoctor.rating || selectedDoctor.Rating || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Total Patients:</span>
                    <span className="detail-value">{selectedDoctor.totalPatient || selectedDoctor.TotalPatient || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`detail-value status-${(selectedDoctor.availabilityStatus || selectedDoctor.AvailabilityStatus || '').toLowerCase()}`}>
                      {selectedDoctor.availabilityStatus || selectedDoctor.AvailabilityStatus || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setViewModalOpen(false)}
              >
                Close
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  setViewModalOpen(false);
                  handleEditDoctor(selectedDoctor);
                }}
              >
                Edit Doctor
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {deleteModalOpen && doctorToDelete && (
        <div className="modal-overlay" onClick={() => setDeleteModalOpen(false)}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setDeleteModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete Dr. {doctorToDelete.doctorName || doctorToDelete.DoctorName}?</p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setDeleteModalOpen(false)}
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button 
                className="btn-danger"
                onClick={confirmDeleteDoctor}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete Doctor"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
