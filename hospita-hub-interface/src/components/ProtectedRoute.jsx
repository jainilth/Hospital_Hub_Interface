import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { extractUserRole, normalizeRole } from "../utils/roleUtils";

const ProtectedRoute = ({ children, requiredRole = [] }) => {
  const { user, loading, isAuthenticated } = useAuth();

  // Get user role using utility function first
  const rawRole = extractUserRole(user);
  const role = normalizeRole(rawRole);
  
  // Debug logging
  console.log('ProtectedRoute Debug:', {
    loading,
    isAuthenticated,
    user,
    rawRole,
    normalizedRole: role,
    requiredRole,
    roleIncludes: requiredRole.includes(role)
  });

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
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/" replace />;
  }

  // If role doesn't match required role → redirect to their default home
  if (requiredRole.length > 0 && !requiredRole.includes(role)) {
    console.log('Role mismatch, checking if admin has universal access');
    
    // Special case: If user is Admin, they can access patient pages too
    // Only restrict access if it's a patient trying to access admin pages
    if (role === "Admin") {
      // Admin can access everything, so grant access
      console.log('Admin user accessing patient area - access granted');
    } else {
      // Non-admin trying to access admin pages - redirect to patient area
      console.log('Non-admin user trying to access restricted area, redirecting to patient home');
      return <Navigate to="/patient/home" replace />;
    }
  }

  console.log('Access granted, rendering children');
  // ✅ Allow access
  return children;
};

export default ProtectedRoute;
