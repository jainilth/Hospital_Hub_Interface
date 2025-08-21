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
            <Link to="/admin/dashboard">Dashboard</Link>

            <div className="dropdown">
              <Link to="">Doctors ▾</Link>
              <div className="dropdown-content">
                <Link to="/admin/doctorAdd">Add Doctor</Link>
                <Link to="/admin/doctorList">View Doctors</Link>
              </div>
            </div>

            <Link to="/admin/emergency">Emergency</Link>
            <Link to="/admin/medicine">Medicines</Link>
            <Link to="/admin/user">Users</Link>
            <Link to="/admin/hospital">Hospitals</Link>
            <Link to="/admin/appointment">Appointments</Link>
            <Link to="/admin/country">Country</Link>
            <Link to="#">Labs</Link>
            {/* <div className="dropdown">
              <Link to="#">For Corporates ▾</Link>
              <div className="dropdown-content">
                <Link to="#">Health Plans</Link>
                <Link to="#">Employee Benefits</Link>
              </div>
            </div> */}
            {/* <div className="dropdown">
              <Link to="#">For Providers ▾</Link>
              <div className="dropdown-content">
                <Link to="#">Dashboard</Link>
                <Link to="#">Login</Link>
              </div>
            </div> */}
            <div className="dropdown">
              <Link to="#">Security & Help ▾</Link>
              <div className="dropdown-content">
                <Link to="#">Privacy</Link>
                <Link to="#">Contact</Link>
              </div>
            </div>
          </nav>
          {/* <button className="login-btn">Login / Signup</button> */}
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
