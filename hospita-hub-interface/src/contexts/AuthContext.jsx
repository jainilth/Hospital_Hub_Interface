import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  }, []);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const response = await api.get('/auth/validate');
          setUser(response.data?.User || null);
        } catch (error) {
          console.error('Token validation failed:', error);
          logout();
        }
      }
      setLoading(false);
    };

    validateToken();
  }, [token, logout]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email: email.trim(),
        password
      });

      const payload = response?.data || {};
      const token = payload.Token || payload.token || payload.accessToken;
      const userPayload = payload.User || payload.user;
      if (!token || !userPayload) {
        if (import.meta?.env?.MODE !== 'production') {
          // Non-intrusive debug for development
          // eslint-disable-next-line no-console
          console.warn('Unexpected login payload shape:', payload);
        }
        return { success: false, error: 'Invalid server response' };
      }

      localStorage.setItem('token', token);
      setToken(token);
      setUser(userPayload);

      return { success: true, user: userPayload };
    } catch (error) {
      console.error('Login error:', error);
      const backendMessage = error.response?.data?.Message;
      let message = backendMessage || 'Login failed';
      if (error.code === 'ERR_NETWORK') message = 'Network error';
      if (error.message?.includes('timeout')) message = 'Server timeout, try again';
      return { success: false, error: message };
    }
  };

  const register = async (name, email, password, role = 'User') => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
        role
      });

      return { success: true, message: response.data.Message };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.response?.data?.Message || 'Registration failed'
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
