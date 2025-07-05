import "./DoctorList.css"

export default function DoctorList() {
  return (
    <div className="doctor-list-container">
      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <span className="stat-label">Total Doctors</span>
              <span className="stat-value">4</span>
            </div>
            <div className="stat-icon total">4</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <span className="stat-label">Available Now</span>
              <span className="stat-value available">2</span>
            </div>
            <div className="stat-icon available">2</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <span className="stat-label">Busy</span>
              <span className="stat-value busy">1</span>
            </div>
            <div className="stat-icon busy">1</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-info">
              <span className="stat-label">On Leave</span>
              <span className="stat-value leave">1</span>
            </div>
            <div className="stat-icon leave">1</div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-box">
          <input type="text" placeholder="Search doctors by name or specialization..." className="search-input" />
          <span className="search-icon">🔍</span>
        </div>
        <div className="filters">
          <select className="filter-select">
            <option value="">All Specializations</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Orthopedist">Orthopedist</option>
          </select>
          <select className="filter-select">
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
      </div>

      {/* Doctors List - Column Layout */}
      <div className="doctors-list">
        {/* Doctor Card 1 */}
        <div className="doctor-card">
          <div className="doctor-card-left">
            <div className="doctor-image">
              <img src="/placeholder.svg?height=100&width=100" alt="Dr. Sarah Johnson" />
            </div>
            <div className="doctor-basic-info">
              <h3 className="doctor-name">Dr. Sarah Johnson</h3>
              <p className="doctor-qualification">MBBS, MD - Cardiology</p>
              <div className="doctor-specialization">
                <span className="specialization-badge">Cardiologist</span>
              </div>
            </div>
          </div>

          <div className="doctor-card-center">
            <div className="doctor-details">
              <div className="detail-row">
                <span className="detail-label">Experience:</span>
                <span className="detail-value">15 years</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">Mumbai, Maharashtra</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Consultation Fee:</span>
                <span className="detail-value fee">₹800</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Next Available:</span>
                <span className="detail-value next-available">Today, 2:00 PM</span>
              </div>
            </div>

            <div className="doctor-stats">
              <div className="stat-item">
                <span className="stat-number">245</span>
                <span className="stat-text">Patients</span>
              </div>
              <div className="stat-item">
                <span className="rating">
                  <span className="star">★</span>
                  4.8
                </span>
                <span className="stat-text">Rating</span>
              </div>
            </div>

            <div className="doctor-contact">
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span className="contact-text">+91 98765 43210</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span className="contact-text">sarah.johnson@hospitalhub.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="doctor-card-right">
            <div className="status-badge available">Available</div>
            <div className="doctor-actions">
              <button className="action-btn view-btn">View</button>
              <button className="action-btn edit-btn">Edit</button>
              <button className="action-btn delete-btn">Delete</button>
            </div>
          </div>
        </div>

        {/* Doctor Card 2 */}
        <div className="doctor-card">
          <div className="doctor-card-left">
            <div className="doctor-image">
              <img src="/placeholder.svg?height=100&width=100" alt="Dr. Rajesh Kumar" />
            </div>
            <div className="doctor-basic-info">
              <h3 className="doctor-name">Dr. Rajesh Kumar</h3>
              <p className="doctor-qualification">MBBS, MS - Neurology</p>
              <div className="doctor-specialization">
                <span className="specialization-badge">Neurologist</span>
              </div>
            </div>
          </div>

          <div className="doctor-card-center">
            <div className="doctor-details">
              <div className="detail-row">
                <span className="detail-label">Experience:</span>
                <span className="detail-value">12 years</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">Delhi, India</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Consultation Fee:</span>
                <span className="detail-value fee">₹1200</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Next Available:</span>
                <span className="detail-value next-available">Tomorrow, 10:00 AM</span>
              </div>
            </div>

            <div className="doctor-stats">
              <div className="stat-item">
                <span className="stat-number">189</span>
                <span className="stat-text">Patients</span>
              </div>
              <div className="stat-item">
                <span className="rating">
                  <span className="star">★</span>
                  4.6
                </span>
                <span className="stat-text">Rating</span>
              </div>
            </div>

            <div className="doctor-contact">
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span className="contact-text">+91 98765 43211</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span className="contact-text">rajesh.kumar@hospitalhub.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="doctor-card-right">
            <div className="status-badge busy">Busy</div>
            <div className="doctor-actions">
              <button className="action-btn view-btn">View</button>
              <button className="action-btn edit-btn">Edit</button>
              <button className="action-btn delete-btn">Delete</button>
            </div>
          </div>
        </div>

        {/* Doctor Card 3 */}
        <div className="doctor-card">
          <div className="doctor-card-left">
            <div className="doctor-image">
              <img src="/placeholder.svg?height=100&width=100" alt="Dr. Priya Sharma" />
            </div>
            <div className="doctor-basic-info">
              <h3 className="doctor-name">Dr. Priya Sharma</h3>
              <p className="doctor-qualification">MBBS, MD - Pediatrics</p>
              <div className="doctor-specialization">
                <span className="specialization-badge">Pediatrician</span>
              </div>
            </div>
          </div>

          <div className="doctor-card-center">
            <div className="doctor-details">
              <div className="detail-row">
                <span className="detail-label">Experience:</span>
                <span className="detail-value">8 years</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">Bangalore, Karnataka</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Consultation Fee:</span>
                <span className="detail-value fee">₹600</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Next Available:</span>
                <span className="detail-value next-available">Today, 4:00 PM</span>
              </div>
            </div>

            <div className="doctor-stats">
              <div className="stat-item">
                <span className="stat-number">156</span>
                <span className="stat-text">Patients</span>
              </div>
              <div className="stat-item">
                <span className="rating">
                  <span className="star">★</span>
                  4.9
                </span>
                <span className="stat-text">Rating</span>
              </div>
            </div>

            <div className="doctor-contact">
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span className="contact-text">+91 98765 43212</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span className="contact-text">priya.sharma@hospitalhub.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="doctor-card-right">
            <div className="status-badge available">Available</div>
            <div className="doctor-actions">
              <button className="action-btn view-btn">View</button>
              <button className="action-btn edit-btn">Edit</button>
              <button className="action-btn delete-btn">Delete</button>
            </div>
          </div>
        </div>

        {/* Doctor Card 4 */}
        <div className="doctor-card">
          <div className="doctor-card-left">
            <div className="doctor-image">
              <img src="/placeholder.svg?height=100&width=100" alt="Dr. Amit Patel" />
            </div>
            <div className="doctor-basic-info">
              <h3 className="doctor-name">Dr. Amit Patel</h3>
              <p className="doctor-qualification">MBBS, MD - Orthopedics</p>
              <div className="doctor-specialization">
                <span className="specialization-badge">Orthopedist</span>
              </div>
            </div>
          </div>

          <div className="doctor-card-center">
            <div className="doctor-details">
              <div className="detail-row">
                <span className="detail-label">Experience:</span>
                <span className="detail-value">20 years</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">Ahmedabad, Gujarat</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Consultation Fee:</span>
                <span className="detail-value fee">₹1000</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Next Available:</span>
                <span className="detail-value next-available">Next Week</span>
              </div>
            </div>

            <div className="doctor-stats">
              <div className="stat-item">
                <span className="stat-number">312</span>
                <span className="stat-text">Patients</span>
              </div>
              <div className="stat-item">
                <span className="rating">
                  <span className="star">★</span>
                  4.7
                </span>
                <span className="stat-text">Rating</span>
              </div>
            </div>

            <div className="doctor-contact">
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span className="contact-text">+91 98765 43213</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span className="contact-text">amit.patel@hospitalhub.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="doctor-card-right">
            <div className="status-badge leave">On Leave</div>
            <div className="doctor-actions">
              <button className="action-btn view-btn">View</button>
              <button className="action-btn edit-btn">Edit</button>
              <button className="action-btn delete-btn">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
