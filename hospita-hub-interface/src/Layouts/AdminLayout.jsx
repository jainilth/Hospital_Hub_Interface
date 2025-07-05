import { Outlet } from "react-router-dom";
import "./AdminLayout.css";
import { Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    // This is the main layout for the admin section of the hospital hub interface
    <div className="layout-wrapper">
      {/* Header section with navigation links and logo */}
      <header className="header">
        <div className="container">
          <div className="logo">•Helth Hub•</div>
          <nav className="nav-links">
            <Link to="/dashboard">Dashboard</Link>
            <div className="dropdown">
              <a href="">Doctors ▾</a>
              <div className="dropdown-content">
                <a href="/doctorAdd">Add Doctor</a>
                <a href="/doctorList">View Doctors</a>
              </div>
            </div>
            <a href="#">Video Consult</a>
            <a href="#">Surgeries</a>
            <div className="dropdown">
              <a href="#">For Corporates ▾</a>
              <div className="dropdown-content">
                <a href="#">Health Plans</a>
                <a href="#">Employee Benefits</a>
              </div>
            </div>
            <div className="dropdown">
              <a href="#">For Providers ▾</a>
              <div className="dropdown-content">
                <a href="#">Dashboard</a>
                <a href="#">Login</a>
              </div>
            </div>
            <div className="dropdown">
              <a href="#">Security & Help ▾</a>
              <div className="dropdown-content">
                <a href="#">Privacy</a>
                <a href="#">Contact</a>
              </div>
            </div>
          </nav>
          <button className="login-btn">Login / Signup</button>
        </div>
      </header>
      {/*Header End*/}

      {/* Main content area where nested routes will be rendered */}
      <main className="main-content">
        <Outlet />
      </main>
      {/*Main Content End*/}

      {/* Footer section with copyright information */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Hospital Hub. All rights reserved.</p>
        </div>
      </footer>
      {/*Footer End*/}
    </div>
  );
};

export default AdminLayout;
