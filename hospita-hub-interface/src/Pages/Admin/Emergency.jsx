import React, { useState, useEffect } from 'react';
import './Emergency.css';

export default function Emergency() {
  const [emergencyCases, setEmergencyCases] = useState([
    {
      id: 'EMG001',
      patientName: 'Rajesh Kumar',
      age: 45,
      gender: 'Male',
      emergencyType: 'Cardiac Emergency',
      severity: 'Critical',
      location: 'Mumbai, Maharashtra',
      hospital: 'Apollo Hospital',
      reportedTime: '2024-01-15 14:30:00',
      responseTime: '3.2 mins',
      status: 'In Progress',
      contactNumber: '+91 98765 43210',
      symptoms: 'Severe chest pain, difficulty breathing, sweating',
      vitals: {
        heartRate: '120 bpm',
        bloodPressure: '180/110 mmHg',
        temperature: '98.6°F',
        oxygenSaturation: '92%'
      },
      assignedDoctor: 'Dr. Sarah Johnson',
      ambulanceId: 'AMB-001'
    },
    {
      id: 'EMG002',
      patientName: 'Priya Sharma',
      age: 28,
      gender: 'Female',
      emergencyType: 'Accident',
      severity: 'Moderate',
      location: 'Delhi, India',
      hospital: 'Max Hospital',
      reportedTime: '2024-01-15 15:45:00',
      responseTime: '2.8 mins',
      status: 'Stable',
      contactNumber: '+91 98765 43211',
      symptoms: 'Head injury, multiple bruises, conscious',
      vitals: {
        heartRate: '95 bpm',
        bloodPressure: '130/85 mmHg',
        temperature: '99.1°F',
        oxygenSaturation: '96%'
      },
      assignedDoctor: 'Dr. Rajesh Kumar',
      ambulanceId: 'AMB-002'
    },
    {
      id: 'EMG003',
      patientName: 'Amit Patel',
      age: 35,
      gender: 'Male',
      emergencyType: 'Respiratory Emergency',
      severity: 'High',
      location: 'Bangalore, Karnataka',
      hospital: 'Fortis Hospital',
      reportedTime: '2024-01-15 16:20:00',
      responseTime: '4.1 mins',
      status: 'Under Treatment',
      contactNumber: '+91 98765 43212',
      symptoms: 'Severe asthma attack, wheezing, shortness of breath',
      vitals: {
        heartRate: '110 bpm',
        bloodPressure: '140/90 mmHg',
        temperature: '98.8°F',
        oxygenSaturation: '88%'
      },
      assignedDoctor: 'Dr. Meera Joshi',
      ambulanceId: 'AMB-003'
    }
  ]);

  const [selectedCase, setSelectedCase] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setEmergencyCases(prev => prev.map(case_ => ({
        ...case_,
        reportedTime: case_.reportedTime // In real app, this would update from server
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredCases = emergencyCases.filter(case_ => {
    const matchesSearch = case_.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.emergencyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || case_.status === filterStatus;
    const matchesSeverity = !filterSeverity || case_.severity === filterSeverity;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const getTimeSince = (timestamp) => {
    const now = new Date();
    const reported = new Date(timestamp);
    const diffInMinutes = Math.floor((now - reported) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} mins ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <div className="emergency-container">
      {/* Header Section */}
      <div className="emergency-header">
        <div className="header-content">
          <h1 className="emergency-title">Emergency Management</h1>
          <p className="emergency-subtitle">Real-time emergency case monitoring and response system</p>
        </div>
        <div className="header-actions">
          <button className="btn-emergency">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
            New Emergency
          </button>
          <button className="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Emergency Stats */}
      <div className="emergency-stats">
        <div className="stat-card critical">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Critical Cases</h3>
            <p className="stat-number">1</p>
            <span className="stat-change critical">Immediate attention required</span>
          </div>
        </div>

        <div className="stat-card active">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Active Cases</h3>
            <p className="stat-number">3</p>
            <span className="stat-change active">Currently being treated</span>
          </div>
        </div>

        <div className="stat-card response">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Avg Response Time</h3>
            <p className="stat-number">3.4 min</p>
            <span className="stat-change positive">-0.5 min from last hour</span>
          </div>
        </div>

        <div className="stat-card ambulance">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 17h4V5H2v12h3m5 0a2 2 0 1 0 4 0m-4 0a2 2 0 1 1-4 0m0 0H2m16 0h3V9h-5l-2-4"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Available Ambulances</h3>
            <p className="stat-number">12</p>
            <span className="stat-change positive">3 dispatched, 9 ready</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search by patient name, emergency type, or case ID..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="filters">
          <select 
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Stable">Stable</option>
            <option value="Under Treatment">Under Treatment</option>
            <option value="Resolved">Resolved</option>
          </select>
          <select 
            className="filter-select"
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
          >
            <option value="">All Severity</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Moderate">Moderate</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Emergency Cases List */}
      <div className="emergency-cases">
        <div className="cases-header">
          <h2 className="cases-title">Active Emergency Cases</h2>
          <div className="live-indicator">
            <span className="live-dot"></span>
            <span className="live-text">Live Updates</span>
          </div>
        </div>

        <div className="cases-list">
          {filteredCases.map((emergencyCase) => (
            <div key={emergencyCase.id} className={`emergency-card ${emergencyCase.severity.toLowerCase()}`}>
              <div className="emergency-card-header">
                <div className="case-id-section">
                  <span className="case-id">{emergencyCase.id}</span>
                  <span className={`severity-badge ${emergencyCase.severity.toLowerCase()}`}>
                    {emergencyCase.severity}
                  </span>
                </div>
                <div className="case-time">
                  <span className="reported-time">{getTimeSince(emergencyCase.reportedTime)}</span>
                  <span className="response-time">Response: {emergencyCase.responseTime}</span>
                </div>
              </div>

              <div className="emergency-card-body">
                <div className="patient-info-section">
                  <div className="patient-basic">
                    <h3 className="patient-name">{emergencyCase.patientName}</h3>
                    <p className="patient-details">{emergencyCase.age} years, {emergencyCase.gender}</p>
                    <p className="contact-info">📞 {emergencyCase.contactNumber}</p>
                  </div>
                  
                  <div className="emergency-details">
                    <div className="emergency-type">
                      <span className="detail-label">Emergency Type:</span>
                      <span className="detail-value emergency-type-value">{emergencyCase.emergencyType}</span>
                    </div>
                    <div className="location-info">
                      <span className="detail-label">Location:</span>
                      <span className="detail-value">📍 {emergencyCase.location}</span>
                    </div>
                    <div className="hospital-info">
                      <span className="detail-label">Hospital:</span>
                      <span className="detail-value">🏥 {emergencyCase.hospital}</span>
                    </div>
                  </div>
                </div>

                <div className="medical-info-section">
                  <div className="symptoms-section">
                    <h4 className="section-title">Symptoms</h4>
                    <p className="symptoms-text">{emergencyCase.symptoms}</p>
                  </div>

                  <div className="vitals-section">
                    <h4 className="section-title">Vital Signs</h4>
                    <div className="vitals-grid">
                      <div className="vital-item">
                        <span className="vital-label">Heart Rate</span>
                        <span className="vital-value">{emergencyCase.vitals.heartRate}</span>
                      </div>
                      <div className="vital-item">
                        <span className="vital-label">Blood Pressure</span>
                        <span className="vital-value">{emergencyCase.vitals.bloodPressure}</span>
                      </div>
                      <div className="vital-item">
                        <span className="vital-label">Temperature</span>
                        <span className="vital-value">{emergencyCase.vitals.temperature}</span>
                      </div>
                      <div className="vital-item">
                        <span className="vital-label">Oxygen Sat.</span>
                        <span className="vital-value">{emergencyCase.vitals.oxygenSaturation}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="response-info-section">
                  <div className="assigned-team">
                    <div className="team-member">
                      <span className="team-label">Assigned Doctor:</span>
                      <span className="team-value">👨‍⚕️ {emergencyCase.assignedDoctor}</span>
                    </div>
                    <div className="team-member">
                      <span className="team-label">Ambulance:</span>
                      <span className="team-value">🚑 {emergencyCase.ambulanceId}</span>
                    </div>
                  </div>
                  
                  <div className="case-status">
                    <span className={`status-badge ${emergencyCase.status.toLowerCase().replace(' ', '-')}`}>
                      {emergencyCase.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="emergency-card-actions">
                <button className="action-btn view-btn" onClick={() => setSelectedCase(emergencyCase)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  View Details
                </button>
                <button className="action-btn update-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Update Status
                </button>
                <button className="action-btn contact-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Case Detail Modal */}
      {selectedCase && (
        <div className="modal-overlay" onClick={() => setSelectedCase(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Emergency Case Details - {selectedCase.id}</h2>
              <button className="modal-close" onClick={() => setSelectedCase(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h3>Patient Information</h3>
                <div className="modal-info-grid">
                  <div className="info-item">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{selectedCase.patientName}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Age:</span>
                    <span className="info-value">{selectedCase.age} years</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Gender:</span>
                    <span className="info-value">{selectedCase.gender}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Contact:</span>
                    <span className="info-value">{selectedCase.contactNumber}</span>
                  </div>
                </div>
              </div>
              
              <div className="modal-section">
                <h3>Emergency Details</h3>
                <div className="modal-info-grid">
                  <div className="info-item">
                    <span className="info-label">Type:</span>
                    <span className="info-value">{selectedCase.emergencyType}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Severity:</span>
                    <span className={`info-value severity-${selectedCase.severity.toLowerCase()}`}>{selectedCase.severity}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status:</span>
                    <span className="info-value">{selectedCase.status}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Reported:</span>
                    <span className="info-value">{getTimeSince(selectedCase.reportedTime)}</span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Current Vital Signs</h3>
                <div className="vitals-display">
                  {Object.entries(selectedCase.vitals).map(([key, value]) => (
                    <div key={key} className="vital-display-item">
                      <span className="vital-display-label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                      <span className="vital-display-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}