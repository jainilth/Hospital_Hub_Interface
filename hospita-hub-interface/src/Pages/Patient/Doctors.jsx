import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import './Doctors.css';

const Doctors = () => {
  const [searchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeSlotsByDoctor, setTimeSlotsByDoctor] = useState({});
  const [filters, setFilters] = useState({
    speciality: searchParams.get('speciality') || '',
    specializationId: searchParams.get('specializationId') || '',
    experience: '',
    rating: '',
    fee: '',
    availability: ''
  });

  useEffect(() => {
    const specializationId = searchParams.get('specializationId');
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        let response;
        if (specializationId) {
          response = await axios.get(`http://localhost:5220/api/Doctor/GetDoctorsBySpecialization/${specializationId}`);
        } else {
          response = await axios.get('http://localhost:5220/api/Doctor/GetAllDoctors');
        }
        const data = response.data || [];
        const normalized = data.map((d) => ({
          id: d.doctorId,
          name: d.doctorName,
          speciality: d.specializationName || (searchParams.get('speciality') || ''),
          experience: d.doctorExperienceYears ? `${d.doctorExperienceYears} years` : '',
          rating: d.rating || 0,
          reviews: d.totalPatient || 0,
          fee: d.consultationFee || 0,
          location: d.doctorAddress || '',
          hospital: d.hospitalName || '',
          availability: d.availabilityStatus || '',
          image: d.doctorPhotoUrl || 'https://via.placeholder.com/80x80?text=Dr',
          qualification: d.qualification || '',
          verified: true,
          online: (d.availabilityStatus || '').toLowerCase().includes('available')
        }));
        setDoctors(normalized);

        // Fetch time slots for each doctor in parallel
        const slotPromises = normalized.map(async (doc) => {
          try {
            const res = await axios.get(`http://localhost:5220/api/DoctorAvailableTimeSlot/GetByDoctor/${doc.id}`);
            return [doc.id, res.data || []];
          } catch {
            return [doc.id, []];
          }
        });
        const entries = await Promise.all(slotPromises);
        const mapObj = {};
        entries.forEach(([id, slots]) => { mapObj[id] = slots; });
        setTimeSlotsByDoctor(mapObj);
      } catch (e) {
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [searchParams]);

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

  const formatTime = (t) => {
    if (!t) return '';
    if (typeof t === 'string') return t.slice(0, 5);
    if (typeof t === 'object' && t.hour !== undefined) {
      const h = String(t.hour).padStart(2, '0');
      const m = String(t.minute || 0).padStart(2, '0');
      return `${h}:${m}`;
    }
    return '';
  };

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
        <div className="container-xxl">
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
        <div className="container-xxl">
          <div className="row g-3">
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
        <div className="container-xxl">
          <div className="row g-4">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="col-12 col-lg-6">
                <div className="doctor-card">
                  {/* Left section */}
                  <div className="doctor-card-left">
                    <div className="doctor-image">
                      <img src={doctor.image} alt={doctor.name} />
                    </div>
                    <div className="doctor-basic-info">
                      <h3 className="doctor-name">
                        {doctor.name}
                        {doctor.verified && <i className="fas fa-check-circle verified-badge ms-2"></i>}
                      </h3>
                      <p className="doctor-qualification">{doctor.qualification || 'N/A'}</p>
                      <div className="doctor-specialization">
                        <span className="specialization-badge">Specialization: {doctor.speciality || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center section */}
                  <div className="doctor-card-center">
                    <div className="doctor-details-grid">
                      <div className="detail-row"><span className="detail-label">Experience</span><span className="detail-value">{doctor.experience || 'N/A'}</span></div>
                      <div className="detail-row"><span className="detail-label">Location</span><span className="detail-value">{doctor.location || 'N/A'}</span></div>
                      <div className="detail-row"><span className="detail-label">Consultation Fee</span><span className="detail-value fee">₹{doctor.fee}</span></div>
                      <div className="detail-row"><span className="detail-label">Hospital</span><span className="detail-value">{doctor.hospital || 'N/A'}</span></div>
                    </div>

                    <div className="doctor-stats">
                      <div className="stat-item">
                        <span className="stat-number">{doctor.reviews || 'N/A'}</span>
                        <span className="stat-text">Patients</span>
                      </div>
                      <div className="stat-item">
                        <span className="rating"><span className="star">★</span>{doctor.rating}</span>
                        <span className="stat-text">Rating</span>
                      </div>
                    </div>

                    {/* Time slots */}
                    <div className="doctor-slots">
                      <div style={{ fontWeight: 600, marginBottom: 8 }}>Available time slots</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {(timeSlotsByDoctor[doctor.id] || []).map((slot, idx) => (
                          <div key={idx} className="badge bg-light text-dark" style={{ border: '1px solid #e5e5e5' }}>
                            {slot.dayOfWeek} {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                          </div>
                        ))}
                        {(timeSlotsByDoctor[doctor.id] || []).length === 0 && (
                          <span className="text-muted">No slots configured</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right section */}
                  <div className="doctor-card-right">
                    <div className="status-badge available">{(doctor.availability || 'Available')}</div>
                    <div className="doctor-actions">
                      <button className="btn btn-primary">
                        <i className="fas fa-video me-2"></i>
                        Consult Now
                      </button>
                      <button className="btn btn-outline-primary">
                        <i className="fas fa-calendar me-2"></i>
                        Book Appointment
                      </button>
                      <Link to="/patient/chatInterface">
                        Chat Now
                      </Link>
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