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
              <Link href="">Doctors ▾</Link>
              <div className="dropdown-content">
                <Link to="/doctorAdd">Add Doctor</Link>
                <Link to="/doctorList">View Doctors</Link>
              </div>
            </div>
            <Link href="/emergency">Emergency</Link>
            <Link href="#">Medicines</Link>
            <Link href="#">Users</Link>
            <Link href="#">Hospitals</Link>
            <Link href="#">Appointments</Link>
            <Link href="#">Labs</Link>
            <div className="dropdown">
              <Link href="#">For Corporates ▾</Link>
              <div className="dropdown-content">
                <Link href="#">Health Plans</Link>
                <Link href="#">Employee Benefits</Link>
              </div>
            </div>
            <div className="dropdown">
              <Link href="#">For Providers ▾</Link>
              <div className="dropdown-content">
                <Link href="#">Dashboard</Link>
                <Link href="#">Login</Link>
              </div>
            </div>
            <div className="dropdown">
              <Link href="#">Security & Help ▾</Link>
              <div className="dropdown-content">
                <Link href="#">Privacy</Link>
                <Link href="#">Contact</Link>
              </div>
            </div>
          </nav>
          <button className="login-btn">Login / Signup</button>
        </div>
      </header>
      {/*Header End*/}

      {/* Main content area where nested routes will be rendered */}
      <main className="main-content" style={{ padding: "0px" }}>
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
