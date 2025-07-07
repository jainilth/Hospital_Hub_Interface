import { useState } from "react";
import "./User.css";

const UserComponent = () => {
  // Static data for users
  const [users, setUsers] = useState([
    {
      userId: 1,
      userName: "Dr. John Smith",
      userEmail: "john.smith@hospital.com",
      userContactNo: "+1234567890",
      userRole: "Admin",
      userPassword: "********",
      isAdmin: 1,
      isHospital: 1,
      isLab: 0,
      createdDate: "2024-01-15",
      lastLogin: "2024-01-07",
      status: "Active",
    },
    {
      userId: 2,
      userName: "Sarah Johnson",
      userEmail: "sarah.johnson@hospital.com",
      userContactNo: "+1234567891",
      userRole: "Staff",
      userPassword: "********",
      isAdmin: 0,
      isHospital: 1,
      isLab: 1,
      createdDate: "2024-01-10",
      lastLogin: "2024-01-06",
      status: "Active",
    },
    {
      userId: 3,
      userName: "Michael Brown",
      userEmail: "michael.brown@email.com",
      userContactNo: "+1234567892",
      userRole: "Patient",
      userPassword: "********",
      isAdmin: 0,
      isHospital: 0,
      isLab: 0,
      createdDate: "2024-01-05",
      lastLogin: "2024-01-07",
      status: "Active",
    },
    {
      userId: 4,
      userName: "Emily Davis",
      userEmail: "emily.davis@hospital.com",
      userContactNo: "+1234567893",
      userRole: "Staff",
      userPassword: "********",
      isAdmin: 0,
      isHospital: 1,
      isLab: 0,
      createdDate: "2023-12-20",
      lastLogin: "2024-01-05",
      status: "Active",
    },
    {
      userId: 5,
      userName: "Robert Wilson",
      userEmail: "robert.wilson@email.com",
      userContactNo: "+1234567894",
      userRole: "Patient",
      userPassword: "********",
      isAdmin: 0,
      isHospital: 0,
      isLab: 0,
      createdDate: "2023-12-15",
      lastLogin: "2024-01-03",
      status: "Inactive",
    },
    {
      userId: 6,
      userName: "Dr. Lisa Anderson",
      userEmail: "lisa.anderson@hospital.com",
      userContactNo: "+1234567895",
      userRole: "Admin",
      userPassword: "********",
      isAdmin: 1,
      isHospital: 1,
      isLab: 1,
      createdDate: "2023-11-30",
      lastLogin: "2024-01-07",
      status: "Active",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userContactNo: "",
    userRole: "Patient",
    userPassword: "",
    isAdmin: 0,
    isHospital: 0,
    isLab: 0,
    status: "Active",
  });

  const userRoles = ["Admin", "Staff", "Patient"];
  const userStatuses = ["Active", "Inactive", "Suspended"];

  // Filter users based on search, role, and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userContactNo.includes(searchTerm);
    const matchesRole = selectedRole === "" || user.userRole === selectedRole;
    const matchesStatus =
      selectedStatus === "" || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.userId === editingUser.userId
            ? {
                ...user,
                ...formData,
                lastLogin: user.lastLogin, // Keep existing last login
                createdDate: user.createdDate, // Keep existing created date
              }
            : user
        )
      );
    } else {
      // Add new user
      const newUser = {
        userId: Math.max(...users.map((u) => u.userId)) + 1,
        ...formData,
        createdDate: new Date().toISOString().split("T")[0],
        lastLogin: "Never",
      };
      setUsers([...users, newUser]);
    }

    resetForm();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      userName: user.userName,
      userEmail: user.userEmail,
      userContactNo: user.userContactNo,
      userRole: user.userRole,
      userPassword: "", // Don't populate password for security
      isAdmin: user.isAdmin,
      isHospital: user.isHospital,
      isLab: user.isLab,
      status: user.status,
    });
    setShowModal(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.userId !== userId));
    }
  };

  const handleStatusToggle = (userId, newStatus) => {
    setUsers(
      users.map((user) =>
        user.userId === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const resetForm = () => {
    setFormData({
      userName: "",
      userEmail: "",
      userContactNo: "",
      userRole: "Patient",
      userPassword: "",
      isAdmin: 0,
      isHospital: 0,
      isLab: 0,
      status: "Active",
    });
    setEditingUser(null);
    setShowModal(false);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "admin-badge";
      case "Staff":
        return "staff-badge";
      case "Patient":
        return "patient-badge";
      default:
        return "default-badge";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "active-status";
      case "Inactive":
        return "inactive-status";
      case "Suspended":
        return "suspended-status";
      default:
        return "default-status";
    }
  };

  return (
    <div className="user-container">
      <div className="user-header">
        <h1>User Management</h1>
        <p>Manage system users and their permissions</p>
      </div>

      {/* Controls Section */}
      <div className="user-controls">
        <div className="search-filter-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <i className="search-icon">🔍</i>
          </div>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="role-filter"
          >
            <option value="">All Roles</option>
            {userRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="status-filter"
          >
            <option value="">All Status</option>
            {userStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <button className="add-user-btn" onClick={() => setShowModal(true)}>
          + Add New User
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-number">{users.length}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {users.filter((u) => u.userRole === "Admin").length}
          </div>
          <div className="stat-label">Admins</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {users.filter((u) => u.userRole === "Staff").length}
          </div>
          <div className="stat-label">Staff</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {users.filter((u) => u.userRole === "Patient").length}
          </div>
          <div className="stat-label">Patients</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {users.filter((u) => u.status === "Active").length}
          </div>
          <div className="stat-label">Active Users</div>
        </div>
      </div>

      {/* User Table */}
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>User Info</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Permissions</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.userId}>
                <td>
                  <div className="user-info-cell">
                    <div className="user-avatar">
                      {user.userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                      <strong>{user.userName}</strong>
                      <small>{user.userEmail}</small>
                    </div>
                  </div>
                </td>
                <td>{user.userContactNo}</td>
                <td>
                  <span className={`role-badge ${getRoleColor(user.userRole)}`}>
                    {user.userRole}
                  </span>
                </td>
                <td>
                  <div className="permissions-cell">
                    {user.isAdmin === 1 && (
                      <span className="permission-tag admin-tag">Admin</span>
                    )}
                    {user.isHospital === 1 && (
                      <span className="permission-tag hospital-tag">
                        Hospital
                      </span>
                    )}
                    {user.isLab === 1 && (
                      <span className="permission-tag lab-tag">Lab</span>
                    )}
                    {user.isAdmin === 0 &&
                      user.isHospital === 0 &&
                      user.isLab === 0 && (
                        <span className="permission-tag basic-tag">Basic</span>
                      )}
                  </div>
                </td>
                <td>
                  <select
                    value={user.status}
                    onChange={(e) =>
                      handleStatusToggle(user.userId, e.target.value)
                    }
                    className={`status-select ${getStatusColor(user.status)}`}
                  >
                    {userStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className="last-login-cell">
                    {user.lastLogin}
                    <small>Created: {user.createdDate}</small>
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(user)}
                    >
                      ✏️
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user.userId)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>

        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingUser ? "Edit User" : "Add New User"}</h2>
              <button className="close-btn" onClick={resetForm}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="user-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Contact Number *</label>
                  <input
                    type="tel"
                    name="userContactNo"
                    value={formData.userContactNo}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>User Role *</label>
                  <select
                    name="userRole"
                    value={formData.userRole}
                    onChange={handleInputChange}
                    required
                  >
                    {userRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Password{" "}
                    {editingUser ? "(Leave blank to keep current)" : "*"}
                  </label>
                  <input
                    type="password"
                    name="userPassword"
                    value={formData.userPassword}
                    onChange={handleInputChange}
                    required={!editingUser}
                    placeholder={
                      editingUser
                        ? "Leave blank to keep current password"
                        : "Enter password"
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    {userStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="permissions-section">
                <h3>Permissions</h3>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isAdmin"
                      checked={formData.isAdmin === 1}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Admin Access
                    <small>Full system administration rights</small>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isHospital"
                      checked={formData.isHospital === 1}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Hospital Access
                    <small>Hospital management and operations</small>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isLab"
                      checked={formData.isLab === 1}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    Lab Access
                    <small>Laboratory tests and reports</small>
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={resetForm}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingUser ? "Update User" : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserComponent;
