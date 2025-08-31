import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./PatientLayout.css";
import { useAuth } from "../contexts/AuthContext";

export default function Patient() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="patient-layout">
      {/*Header for patient*/}
      <header className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container-fluid m-3">
          <a className="navbar-brand" href="#">
          Helth Hub
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="home">
                  Find Doctors
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='consult'>
                  Video Consult
                </Link>
              </li>
            </ul>

            {/* User info and logout */}
            <div className="d-flex align-items-center">
              <span className="text-muted me-3">Welcome, {user?.UserName}</span>
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      {/*Header End for patient*/}

      {/* Main content area where nested routes will be rendered */}
      <main className="main-content">
        <Outlet />
      </main>
      {/* Main content area End*/}

      {/* Footer section with copyright information */}
      {/* <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Hospital Hub. All rights reserved.</p>
        </div>
      </footer> */}
      {/*Footer End*/}
      {/* Footer section with copyright information */}
      <footer className="footer">
        <div className="container-fluid">
          {/* Footer Brand and Logo */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="footer-brand">
                <h2 className="footer-logo">🏥 Health Hub</h2>
                <p className="footer-tagline">Your trusted healthcare companion - connecting you with quality healthcare services</p>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div className="row">
            <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
              <h6 className="footer-heading">Health Hub</h6>
              <ul className="footer-links">
                <li><Link to="/patient/home">About Us</Link></li>
                <li><a href="#">Our Mission</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">News & Press</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Support Center</a></li>
              </ul>
            </div>
            
            <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
              <h6 className="footer-heading">For Patients</h6>
              <ul className="footer-links">
                <li><Link to="/patient/home">Find Doctors</Link></li>
                <li><Link to="/patient/specialities">Browse Specialities</Link></li>
                <li><a href="#">Book Appointments</a></li>
                <li><Link to="/patient/consult">Video Consultation</Link></li>
                <li><a href="#">Lab Tests</a></li>
                <li><a href="#">Health Checkups</a></li>
                <li><a href="#">Medicine Delivery</a></li>
                <li><a href="#">Health Records</a></li>
                <li><a href="#">Insurance Plans</a></li>
              </ul>
            </div>
            
            <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
              <h6 className="footer-heading">For Doctors</h6>
              <ul className="footer-links">
                <li><a href="#">Doctor Registration</a></li>
                <li><a href="#">Practice Management</a></li>
                <li><a href="#">Digital Tools</a></li>
                <li><a href="#">Patient Records</a></li>
                <li><a href="#">Telemedicine</a></li>
                <li><a href="#">Medical Resources</a></li>
                <li><a href="#">Professional Network</a></li>
              </ul>
            </div>
            
            <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
              <h6 className="footer-heading">Healthcare Services</h6>
              <ul className="footer-links">
                <li><a href="#">Emergency Care</a></li>
                <li><a href="#">Hospital Network</a></li>
                <li><a href="#">Diagnostic Centers</a></li>
                <li><a href="#">Pharmacy Services</a></li>
                <li><a href="#">Home Healthcare</a></li>
                <li><a href="#">Mental Health</a></li>
                <li><a href="#">Wellness Programs</a></li>
              </ul>
            </div>
            
            <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
              <h6 className="footer-heading">Resources</h6>
              <ul className="footer-links">
                <li><a href="#">Health Articles</a></li>
                <li><a href="#">Medical Encyclopedia</a></li>
                <li><a href="#">Disease Information</a></li>
                <li><a href="#">Treatment Guides</a></li>
                <li><a href="#">Preventive Care</a></li>
                <li><a href="#">Nutrition Tips</a></li>
                <li><a href="#">Fitness & Wellness</a></li>
              </ul>
            </div>
            
            <div className="col-lg-2 col-md-4 col-sm-6 mb-4">
              <h6 className="footer-heading">Legal & Support</h6>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">Data Security</a></li>
                <li><a href="#">Accessibility</a></li>
                <li><a href="#">Feedback</a></li>
              </ul>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="footer-bottom">
                <div className="footer-bottom-content">
                  {/* Social Media Links */}
                  <div className="social-section">
                    <h6 className="social-heading">Follow Us</h6>
                    <div className="social-links">
                      <a href="#" className="social-link" title="Facebook">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      <a href="#" className="social-link" title="Twitter">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                      <a href="#" className="social-link" title="LinkedIn">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a href="#" className="social-link" title="Instagram">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.624 5.367 11.99 11.988 11.99s11.99-5.366 11.99-11.99C24.007 5.367 18.641.001 12.017.001zM8.449 16.988c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.468 4.467-4.468c2.458 0 4.467 2.01 4.467 4.468s-2.009 4.468-4.467 4.468zm7.119 0c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.468 4.467-4.468c2.459 0 4.467 2.01 4.467 4.468s-2.008 4.468-4.467 4.468z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  {/* Mobile App Downloads */}
                  <div className="apps-section">
                    <h6 className="apps-heading">Download Our App</h6>
                    <div className="download-apps">
                      <a href="#" className="app-link" title="Download on Google Play">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                          alt="Get it on Google Play" 
                          className="app-badge"
                        />
                      </a>
                      <a href="#" className="app-link" title="Download on App Store">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                          alt="Download on the App Store" 
                          className="app-badge"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Copyright */}
                <div className="footer-copyright">
                  <div className="copyright-content">
                    <p>&copy; 2025 Health Hub. All rights reserved.</p>
                    <p className="copyright-sub">Providing trusted healthcare solutions with care and compassion.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
