import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const AuthTest = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testApiConnection = async () => {
    setLoading(true);
    try {
      const response = await api.get('/auth/test');
      setTestResult(`✅ API Test: ${response.data.Message}`);
    } catch (error) {
      setTestResult(`❌ API Test Failed: ${error.message}`);
    }
    setLoading(false);
  };

  const testProtectedEndpoint = async () => {
    setLoading(true);
    try {
      const response = await api.get('/auth/me');
      setTestResult(`✅ Protected Endpoint: User ID ${response.data.User.UserId}, Role: ${response.data.User.UserRole}`);
    } catch (error) {
      setTestResult(`❌ Protected Endpoint Failed: ${error.response?.data?.Message || error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h5>Authentication Test Panel</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6>Current Status:</h6>
              <ul className="list-unstyled">
                <li>✅ Authenticated: {isAuthenticated ? 'Yes' : 'No'}</li>
                {user && (
                  <>
                    <li>👤 User ID: {user.UserId}</li>
                    <li>📧 Email: {user.UserEmail}</li>
                    <li>👨‍💼 Role: {user.UserRole}</li>
                    <li>📝 Name: {user.UserName}</li>
                  </>
                )}
              </ul>
            </div>
            <div className="col-md-6">
              <h6>Test Actions:</h6>
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-primary btn-sm" 
                  onClick={testApiConnection}
                  disabled={loading}
                >
                  {loading ? 'Testing...' : 'Test API Connection'}
                </button>
                <button 
                  className="btn btn-success btn-sm" 
                  onClick={testProtectedEndpoint}
                  disabled={loading || !isAuthenticated}
                >
                  {loading ? 'Testing...' : 'Test Protected Endpoint'}
                </button>
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={logout}
                  disabled={!isAuthenticated}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          {testResult && (
            <div className="mt-3">
              <h6>Test Result:</h6>
              <div className="alert alert-info">
                {testResult}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthTest;
