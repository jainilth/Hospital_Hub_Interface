import axios from 'axios';

const resolvedBaseURL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL)
    ? import.meta.env.VITE_API_BASE_URL
    : (window.__API_BASE_URL__ || 'http://localhost:5220/api');

const api = axios.create({
  baseURL: resolvedBaseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';
    const hasToken = Boolean(localStorage.getItem('token'));
    const isAuth = url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/validate');

    if (status === 401 && hasToken && !isAuth) {
      localStorage.removeItem('token');
      window.location.href = '/';
      return;
    }
    return Promise.reject(error);
  }
);

export default api;
