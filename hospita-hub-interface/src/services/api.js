import axios from 'axios';

// Create axios instance with base configuration
const resolvedBaseURL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
    ? import.meta.env.VITE_API_BASE_URL
    : (window.__API_BASE_URL__ || 'http://localhost:5220/api');

const api = axios.create({
  baseURL: resolvedBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || '';
    const hasToken = Boolean(localStorage.getItem('token'));

    // Avoid redirecting on 401 for auth endpoints (e.g., bad login) or when no token exists
    const isAuthEndpoint = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register');

    if (status === 401 && hasToken && !isAuthEndpoint) {
      // Token expired or invalid during an authenticated request
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
