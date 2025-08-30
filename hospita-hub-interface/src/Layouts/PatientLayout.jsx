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
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Hospital Hub. All rights reserved.</p>
        </div>
      </footer>
      {/*Footer End*/}
    </div>
  );
}
