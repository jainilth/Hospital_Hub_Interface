import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './Doctors.css';

const Doctors = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    speciality: searchParams.get('speciality') || '',
    experience: '',
    rating: '',
    fee: '',
    availability: ''
  });

  useEffect(() => {
    // Mock data for doctors - in real app, this would come from API
    const mockDoctors = [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        speciality: "Dermatologist",
        experience: "15 years",
        rating: 4.8,
        reviews: 1247,
        fee: 1200,
        location: "Bangalore",
        hospital: "Apollo Hospital",
        availability: "Available Today",
        image: "https://via.placeholder.com/80x80/4ECDC4/FFFFFF?text=Dr.SJ",
        verified: true,
        online: true
      },
      {
        id: 2,
        name: "Dr. Michael Chen",
        speciality: "Cardiologist",
        experience: "12 years",
        rating: 4.9,
        reviews: 892,
        fee: 1500,
        location: "Mumbai",
        hospital: "Fortis Hospital",
        availability: "Available Tomorrow",
        image: "https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=Dr.MC",
        verified: true,
        online: false
      },
      {
        id: 3,
        name: "Dr. Emily Rodriguez",
        speciality: "Pediatrician",
        experience: "8 years",
        rating: 4.7,
        reviews: 567,
        fee: 800,
        location: "Delhi",
        hospital: "Max Hospital",
        availability: "Available Today",
        image: "https://via.placeholder.com/80x80/45B7D1/FFFFFF?text=Dr.ER",
        verified: true,
        online: true
      },
      {
        id: 4,
        name: "Dr. David Kim",
        speciality: "Orthopedist",
        experience: "20 years",
        rating: 4.6,
        reviews: 2341,
        fee: 2000,
        location: "Chennai",
        hospital: "Apollo Hospital",
        availability: "Available Today",
        image: "https://via.placeholder.com/80x80/96CEB4/FFFFFF?text=Dr.DK",
        verified: true,
        online: true
      },
      {
        id: 5,
        name: "Dr. Lisa Wang",
        speciality: "Gynecologist",
        experience: "10 years",
        rating: 4.9,
        reviews: 1567,
        fee: 1000,
        location: "Pune",
        hospital: "Ruby Hall Clinic",
        availability: "Available Tomorrow",
        image: "https://via.placeholder.com/80x80/DDA0DD/FFFFFF?text=Dr.LW",
        verified: true,
        online: false
      },
      {
        id: 6,
        name: "Dr. James Wilson",
        speciality: "Psychiatrist",
        experience: "18 years",
        rating: 4.5,
        reviews: 789,
        fee: 1800,
        location: "Hyderabad",
        hospital: "KIMS Hospital",
        availability: "Available Today",
        image: "https://via.placeholder.com/80x80/F4A460/FFFFFF?text=Dr.JW",
        verified: true,
        online: true
      }
    ];

    setDoctors(mockDoctors);
    setLoading(false);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredDoctors = doctors.filter(doctor => {
    if (filters.speciality && doctor.speciality !== filters.speciality) return false;
    if (filters.experience && doctor.experience !== filters.experience) return false;
    if (filters.rating && doctor.rating < parseFloat(filters.rating)) return false;
    if (filters.fee && doctor.fee > parseInt(filters.fee)) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="doctors-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="doctors-container">
      {/* Header Section */}
      <div className="doctors-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="doctors-title">
                {filters.speciality ? `${filters.speciality} Doctors` : 'All Doctors'}
              </h1>
              <p className="doctors-subtitle">
                {filteredDoctors.length} doctors available for consultation
              </p>
            </div>
            <div className="col-md-4 text-end">
              <Link to="/patient/home" className="btn btn-outline-primary">
                <i className="fas fa-arrow-left me-2"></i>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="doctors-filters">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-3">
              <select 
                className="form-select"
                value={filters.speciality}
                onChange={(e) => handleFilterChange('speciality', e.target.value)}
              >
                <option value="">All Specialities</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Orthopedist">Orthopedist</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Psychiatrist">Psychiatrist</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <select 
                className="form-select"
                value={filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
              >
                <option value="">All Experience</option>
                <option value="5 years">5+ years</option>
                <option value="10 years">10+ years</option>
                <option value="15 years">15+ years</option>
                <option value="20 years">20+ years</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <select 
                className="form-select"
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              >
                <option value="">All Ratings</option>
                <option value="4.5">4.5+ stars</option>
                <option value="4.0">4.0+ stars</option>
                <option value="3.5">3.5+ stars</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <select 
                className="form-select"
                value={filters.fee}
                onChange={(e) => handleFilterChange('fee', e.target.value)}
              >
                <option value="">All Fees</option>
                <option value="500">Under ₹500</option>
                <option value="1000">Under ₹1000</option>
                <option value="1500">Under ₹1500</option>
                <option value="2000">Under ₹2000</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="doctors-content">
        <div className="container">
          <div className="row">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="col-lg-6 mb-4">
                <div className="doctor-card">
                  <div className="doctor-header">
                    <div className="doctor-avatar">
                      <img src={doctor.image} alt={doctor.name} />
                      {doctor.online && <div className="online-indicator"></div>}
                    </div>
                    <div className="doctor-info">
                      <h3 className="doctor-name">
                        {doctor.name}
                        {doctor.verified && <i className="fas fa-check-circle verified-badge"></i>}
                      </h3>
                      <p className="doctor-speciality">{doctor.speciality}</p>
                      <p className="doctor-experience">{doctor.experience} experience</p>
                    </div>
                    <div className="doctor-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`fas fa-star ${i < Math.floor(doctor.rating) ? 'filled' : ''}`}
                          ></i>
                        ))}
                      </div>
                      <span className="rating-text">{doctor.rating}</span>
                      <span className="reviews-count">({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="doctor-details">
                    <div className="detail-item">
                      <i className="fas fa-hospital"></i>
                      <span>{doctor.hospital}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{doctor.location}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-clock"></i>
                      <span>{doctor.availability}</span>
                    </div>
                  </div>

                  <div className="doctor-actions">
                    <div className="consultation-fee">
                      <span className="fee-label">Consultation fee</span>
                      <span className="fee-amount">₹{doctor.fee}</span>
                    </div>
                    <div className="action-buttons">
                      <button className="btn btn-primary btn-sm">
                        <i className="fas fa-video me-2"></i>
                        Consult Now
                      </button>
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="fas fa-calendar me-2"></i>
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* No Results */}
      {filteredDoctors.length === 0 && (
        <div className="no-results">
          <div className="container text-center">
            <i className="fas fa-search fa-3x text-muted mb-3"></i>
            <h3>No doctors found</h3>
            <p className="text-muted">Try adjusting your filters to find more doctors.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors; 