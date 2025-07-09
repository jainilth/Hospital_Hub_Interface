import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./PatientLayout.css";

export default function Patient() {
  return (
    <>
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
                <a className="nav-link" href="#">
                  Find Doctors
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='consult'>
                  Video Consult
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Medicines
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Lab Tests
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Surgeries
                </a>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <span className="badge bg-primary me-3">NEW</span>
              <span className="text-muted me-3">For Corporates</span>
              <span className="text-muted me-3">For Providers</span>
              <span className="text-muted me-3">Security & help</span>
              <span className="text-muted btn">Login / Signup</span>
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
      <footer className="footer">
        <div className="container-fluid">
          <div className="footer-logo">
            {/* <span style={"color: #60a5fa;"}>●</span>practo<span style={"color: #60a5fa;"}>●</span> */}
          </div>

          <div className="row">
            <div className="col-lg-2 col-md-4 col-6 mb-4">
              <h6 className="footer-heading">Practo</h6>
              <ul className="footer-links">
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-4 col-6 mb-4">
              <h6 className="footer-heading">For patients</h6>
              <ul className="footer-links">
                <li>
                  <a href="#">Ask free health questions</a>
                </li>
                <li>
                  <a href="#">Search for doctors</a>
                </li>
                <li>
                  <a href="#">Search for clinics</a>
                </li>
                <li>
                  <a href="#">Search for hospitals</a>
                </li>
                <li>
                  <a href="#">Book Diagnostic Tests</a>
                </li>
                <li>
                  <a href="#">Book Full Body Checkups</a>
                </li>
                <li>
                  <a href="#">Read health articles</a>
                </li>
                <li>
                  <a href="#">Consult a doctor</a>
                </li>
                <li>
                  <a href="#">Order medicines</a>
                </li>
                <li>
                  <a href="#">Read about medicines</a>
                </li>
                <li>
                  <a href="#">Practo drive</a>
                </li>
                <li>
                  <a href="#">Health app</a>
                </li>
                <li>
                  <a href="#">Practo Plus</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-4 col-6 mb-4">
              <h6 className="footer-heading">For doctors</h6>
              <ul className="footer-links">
                <li>
                  <a href="#">Practo Consult</a>
                </li>
                <li>
                  <a href="#">Practo Health Feed</a>
                </li>
                <li>
                  <a href="#">Practo Profile</a>
                </li>
              </ul>

              <h6 className="footer-heading mt-4">For clinics</h6>
              <ul className="footer-links">
                <li>
                  <a href="#">Practo Prime</a>
                </li>
                <li>
                  <a href="#">Ray by Practo</a>
                </li>
                <li>
                  <a href="#">Practo Reach</a>
                </li>
                <li>
                  <a href="#">Ray Tab</a>
                </li>
                <li>
                  <a href="#">Practo Pro</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-4 col-6 mb-4">
              <h6 className="footer-heading">For hospitals</h6>
              <ul className="footer-links">
                <li>
                  <a href="#">Insta by Practo</a>
                </li>
                <li>
                  <a href="#">Qikwell by Practo</a>
                </li>
                <li>
                  <a href="#">Practo Profile</a>
                </li>
                <li>
                  <a href="#">Practo Reach</a>
                </li>
                <li>
                  <a href="#">Practo Drive</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-4 col-6 mb-4">
              <h6 className="footer-heading">More</h6>
              <ul className="footer-links">
                <li>
                  <a href="#">Help</a>
                </li>
                <li>
                  <a href="#">Developers</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#">PCS T&C</a>
                </li>
                <li>
                  <a href="#">Healthcare Directory</a>
                </li>
                <li>
                  <a href="#">Practo Health Wiki</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-4 col-6 mb-4">
              <h6 className="footer-heading">Social</h6>
              <ul className="footer-links">
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">LinkedIn</a>
                </li>
                <li>
                  <a href="#">Youtube</a>
                </li>
                <li>
                  <a href="#">Github</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-copyright">
            Copyright © 2017, Practo. All rights reserved.
          </div>
        </div>
      </footer>
      {/* Footer End*/}
    </>
  );
}
