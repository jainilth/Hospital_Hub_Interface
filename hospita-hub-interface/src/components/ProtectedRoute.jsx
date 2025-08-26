import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Support single role or an array of roles
  const roles = Array.isArray(requiredRole) ? requiredRole : (requiredRole ? [requiredRole] : []);

  if (roles.length > 0 && !roles.includes(user?.UserRole)) {
    // Redirect based on user role
    if (user?.UserRole === 'Admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/patient/home" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
