import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AuthTest() {
  const { user, token, isAuthenticated, loading } = useAuth();

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', margin: '10px' }}>
      <h3>Auth Debug Info</h3>
      <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
        <p><strong>Loading:</strong> {loading ? 'true' : 'false'}</p>
        <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'true' : 'false'}</p>
        <p><strong>Token:</strong> {token ? 'Present' : 'None'}</p>
        <p><strong>User:</strong></p>
        <pre style={{ backgroundColor: 'white', padding: '10px', overflow: 'auto' }}>
          {JSON.stringify(user, null, 2)}
        </pre>
        <p><strong>User Role:</strong> {user?.UserRole || 'undefined'}</p>
      </div>
    </div>
  );
}
