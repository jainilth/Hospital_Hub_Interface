import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Specialities.css';

const Specialities = () => {
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for specialities - in real app, this would come from API
    const mockSpecialities = [
      {
        id: 1,
        name: "Dermatologist",
        description: "Skin, hair & nail problems",
        icon: "fas fa-user-md",
        color: "#FF6B6B",
        doctorCount: 1250
      },
      {
        id: 2,
        name: "Pediatrician",
        description: "Child & adolescent health",
        icon: "fas fa-baby",
        color: "#4ECDC4",
        doctorCount: 890
      },
      {
        id: 3,
        name: "Gynecologist/Obstetrician",
        description: "Women's health & pregnancy",
        icon: "fas fa-female",
        color: "#45B7D1",
        doctorCount: 756
      },
      {
        id: 4,
        name: "Cardiologist",
        description: "Heart & blood vessel problems",
        icon: "fas fa-heartbeat",
        color: "#FF8E53",
        doctorCount: 432
      },
      {
        id: 5,
        name: "Orthopedist",
        description: "Bones, joints & muscles",
        icon: "fas fa-bone",
        color: "#96CEB4",
        doctorCount: 654
      },
      {
        id: 6,
        name: "Psychiatrist",
        description: "Mental health & behavior",
        icon: "fas fa-brain",
        color: "#DDA0DD",
        doctorCount: 321
      },
      {
        id: 7,
        name: "Dentist",
        description: "Dental & oral health",
        icon: "fas fa-tooth",
        color: "#87CEEB",
        doctorCount: 543
      },
      {
        id: 8,
        name: "Neurologist",
        description: "Brain & nervous system",
        icon: "fas fa-head-side-virus",
        color: "#F0E68C",
        doctorCount: 234
      },
      {
        id: 9,
        name: "Ophthalmologist",
        description: "Eye & vision problems",
        icon: "fas fa-eye",
        color: "#98FB98",
        doctorCount: 187
      },
      {
        id: 10,
        name: "ENT Specialist",
        description: "Ear, nose & throat",
        icon: "fas fa-ear",
        color: "#DDA0DD",
        doctorCount: 298
      },
      {
        id: 11,
        name: "Gastroenterologist",
        description: "Digestive system problems",
        icon: "fas fa-stomach",
        color: "#F4A460",
        doctorCount: 345
      },
      {
        id: 12,
        name: "Urologist",
        description: "Urinary & male reproductive",
        icon: "fas fa-user",
        color: "#20B2AA",
        doctorCount: 267
      }
    ];

    setSpecialities(mockSpecialities);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="specialities-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="specialities-container">
      {/* Header Section */}
      <div className="specialities-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="specialities-title">Find Doctors by Speciality</h1>
              <p className="specialities-subtitle">
                Choose from over 100+ specialities and find the right doctor for your health concerns
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

      {/* Search Section */}
      <div className="specialities-search">
        <div className="container">
          <div className="search-box">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search for specialities..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Specialities Grid */}
      <div className="specialities-content">
        <div className="container">
          <div className="row">
            {specialities.map((speciality) => (
              <div key={speciality.id} className="col-lg-4 col-md-6 mb-4">
                <Link 
                  to={`/patient/doctors?speciality=${speciality.name}`}
                  className="speciality-card"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="speciality-icon" style={{ backgroundColor: speciality.color }}>
                    <i className={speciality.icon}></i>
                  </div>
                  <div className="speciality-content">
                    <h3 className="speciality-name">{speciality.name}</h3>
                    <p className="speciality-description">{speciality.description}</p>
                    <div className="speciality-meta">
                      <span className="doctor-count">
                        <i className="fas fa-user-md me-1"></i>
                        {speciality.doctorCount} doctors
                      </span>
                      <span className="consult-fee">₹99 onwards</span>
                    </div>
                  </div>
                  <div className="speciality-arrow">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Specialities Section */}
      <div className="popular-specialities">
        <div className="container">
          <h2 className="section-title">Popular Specialities</h2>
          <div className="row">
            <div className="col-md-3 mb-3">
              <div className="popular-speciality-item">
                <i className="fas fa-user-md"></i>
                <span>Dermatologist</span>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="popular-speciality-item">
                <i className="fas fa-baby"></i>
                <span>Pediatrician</span>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="popular-speciality-item">
                <i className="fas fa-female"></i>
                <span>Gynecologist</span>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="popular-speciality-item">
                <i className="fas fa-heartbeat"></i>
                <span>Cardiologist</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialities; 