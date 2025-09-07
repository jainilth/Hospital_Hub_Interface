import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthTest() {
  const { user, token, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Authentication Test Page</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Current Authentication Status</h3>
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "15px",
            borderRadius: "5px",
          }}
        >
          <p>
            <strong>Is Authenticated:</strong>{" "}
            {isAuthenticated ? "✅ Yes" : "❌ No"}
          </p>
          <p>
            <strong>Has Token:</strong> {token ? "✅ Yes" : "❌ No"}
          </p>
          <p>
            <strong>User Role:</strong> {user?.userRole || "Not set"}
          </p>
          <p>
            <strong>User Name:</strong> {user?.userName || "Not set"}
          </p>
          <p>
            <strong>User Email:</strong> {user?.userEmail || "Not set"}
          </p>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>LocalStorage Values</h3>
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "15px",
            borderRadius: "5px",
          }}
        >
          <p>
            <strong>jwtToken:</strong>{" "}
            {localStorage.getItem("jwtToken") ? "✅ Present" : "❌ Missing"}
          </p>
          <p>
            <strong>token:</strong>{" "}
            {localStorage.getItem("token") ? "✅ Present" : "❌ Missing"}
          </p>
          <p>
            <strong>user:</strong>{" "}
            {localStorage.getItem("user") ? "✅ Present" : "❌ Missing"}
          </p>
          <p>
            <strong>UserId:</strong>{" "}
            {localStorage.getItem("UserId") || "Not set"}
          </p>
          <p>
            <strong>UserName:</strong>{" "}
            {localStorage.getItem("UserName") || "Not set"}
          </p>
          <p>
            <strong>UserEmail:</strong>{" "}
            {localStorage.getItem("UserEmail") || "Not set"}
          </p>
          <p>
            <strong>UserRole:</strong>{" "}
            {localStorage.getItem("UserRole") || "Not set"}
          </p>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Test Actions</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>

          <button
            onClick={() => (window.location.href = "/admin/dashboard")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Go to Admin Dashboard
          </button>

          <button
            onClick={() => (window.location.href = "/patient/home")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Go to Patient Home
          </button>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Raw User Object</h3>
        <pre
          style={{
            backgroundColor: "#f8f9fa",
            padding: "15px",
            borderRadius: "5px",
            overflow: "auto",
            fontSize: "12px",
          }}
        >
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Instructions</h3>
        <ol>
          <li>
            If you're not logged in, you should be redirected to the login page
          </li>
          <li>After logging in, you should be able to access this page</li>
          <li>
            Try accessing <code>/admin/dashboard</code> or{" "}
            <code>/patient/home</code> directly in the URL
          </li>
          <li>If you're not logged in, you should be redirected to login</li>
          <li>
            After login, you should be redirected back to the page you were
            trying to access
          </li>
        </ol>
      </div>
    </div>
  );
}
