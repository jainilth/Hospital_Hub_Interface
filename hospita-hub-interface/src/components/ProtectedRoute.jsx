import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, requiredRole = [] }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Not logged in → go to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Get user role
  const role = user?.UserRole;

  // If role doesn’t match required role → redirect to their default home
  if (requiredRole.length > 0 && !requiredRole.includes(role)) {
    if (role === "Admin") return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/patient/home" replace />;
  }

  // ✅ Allow access
  return children;
};

export default ProtectedRoute;
