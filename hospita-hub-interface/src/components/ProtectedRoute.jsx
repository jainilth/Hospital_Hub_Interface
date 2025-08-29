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

  const roles = Array.isArray(requiredRole) ? requiredRole : (requiredRole ? [requiredRole] : []);
  const role = user?.UserRole;

  if (roles.length > 0 && !roles.includes(role)) {
    console.log(role);
    if (role === 'Admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    console.log('Patient');
    return <Navigate to="/patient/consult" replace />;
  }

  return children;
};

export default ProtectedRoute;
