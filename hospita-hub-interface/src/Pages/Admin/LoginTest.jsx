import React, { useState } from "react";

export default function LoginTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:5220/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token and user info in localStorage
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("UserId", data.user.userId);
        localStorage.setItem("UserRole", data.user.userRole);
        localStorage.setItem("UserName", data.user.userName);
        localStorage.setItem("UserEmail", data.user.userEmail);

        setResult({
          success: true,
          message: "Login successful!",
          token: data.token,
          user: data.user,
        });
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const testEndpoint = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setError("Please login first to get a token");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5220/api/Chat/patients", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: 1,
          userId: parseInt(localStorage.getItem("UserId")),
          role: localStorage.getItem("UserRole"),
          admin: localStorage.getItem("UserName"),
          email: localStorage.getItem("UserEmail"),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: "API call successful!",
          data: data,
        });
      } else {
        setError(
          `API Error: ${response.status} - ${data.message || "Unknown error"}`
        );
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const testEndpointWithoutAuth = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5220/api/Chat/patients-test",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            doctorId: 1,
            userId: 1,
            role: "Admin",
            admin: "Test Admin",
            email: "test@example.com",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: "Test endpoint call successful!",
          data: data,
        });
      } else {
        setError(
          `API Error: ${response.status} - ${data.message || "Unknown error"}`
        );
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Login Test & API Testing</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Step 1: Login to get JWT Token</h3>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "10px" }}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Step 2: Test API Endpoints</h3>
        <button
          onClick={testEndpoint}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            marginRight: "10px",
          }}
        >
          Test Protected Endpoint (with JWT)
        </button>
        <button
          onClick={testEndpointWithoutAuth}
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ffc107",
            color: "black",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Test Public Endpoint (no JWT)
        </button>
      </div>

      {error && (
        <div
          style={{
            color: "red",
            backgroundColor: "#f8d7da",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div
          style={{
            backgroundColor: "#d4edda",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <h4 style={{ color: "#155724" }}>{result.message}</h4>
          <pre
            style={{
              backgroundColor: "#f8f9fa",
              padding: "10px",
              borderRadius: "4px",
              overflow: "auto",
            }}
          >
            {JSON.stringify(result.data || result, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
        <h4>Current localStorage values:</h4>
        <ul>
          <li>
            jwtToken:{" "}
            {localStorage.getItem("jwtToken") ? "✓ Present" : "✗ Missing"}
          </li>
          <li>UserId: {localStorage.getItem("UserId") || "Not set"}</li>
          <li>UserRole: {localStorage.getItem("UserRole") || "Not set"}</li>
          <li>UserName: {localStorage.getItem("UserName") || "Not set"}</li>
          <li>UserEmail: {localStorage.getItem("UserEmail") || "Not set"}</li>
        </ul>
      </div>
    </div>
  );
}
