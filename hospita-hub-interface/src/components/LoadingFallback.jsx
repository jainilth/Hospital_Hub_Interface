import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LoadingFallback() {
  const { user, token, isAuthenticated, loading } = useAuth();

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Debug Information</h4>
          <div className="row">
            <div className="col-md-6">
              <h6>Authentication Status</h6>
              <ul className="list-unstyled">
                <li><strong>Loading:</strong> {loading ? 'true' : 'false'}</li>
                <li><strong>Is Authenticated:</strong> {isAuthenticated ? 'true' : 'false'}</li>
                <li><strong>Token:</strong> {token ? 'Present' : 'None'}</li>
                <li><strong>User Role:</strong> {user?.UserRole || 'undefined'}</li>
                <li><strong>User Name:</strong> {user?.UserName || 'undefined'}</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h6>User Object</h6>
              <pre className="bg-light p-2" style={{ fontSize: '12px', maxHeight: '200px', overflow: 'auto' }}>
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </div>
          
          <div className="mt-3">
            <h6>Current URL</h6>
            <p>{window.location.href}</p>
            
            <h6>Available Actions</h6>
            <div className="btn-group">
              <a href="/admin/dashboard" className="btn btn-outline-primary btn-sm">Admin Dashboard</a>
              <a href="/patient/home" className="btn btn-outline-success btn-sm">Patient Home</a>
              <a href="/" className="btn btn-outline-secondary btn-sm">Login Page</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
