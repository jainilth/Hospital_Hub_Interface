import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        if (!formData.email || !formData.password) {
          setError('Email and password are required');
          return;
        }

        const result = await login(formData.email, formData.password);
        if (result.success) {
          const role = result.user.UserRole;
          if (role === 'Admin') navigate('/admin/dashboard');
          else navigate('/patient/home');
        } else {
          setError(result.error);
        }
      } else {
        if (!formData.name || !formData.email || !formData.password) {
          setError('All fields are required');
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters long');
          return;
        }

        const result = await register(formData.name, formData.email, formData.password, formData.role);
        if (result.success) {
          setError('');
          setIsLogin(true);
          setFormData({ name: '', email: '', password: '', confirmPassword: '', role: 'User' });
          alert('Registration successful! Please login.');
        } else {
          setError(result.error);
        }
      }
    } catch (error) {
      setError('Unexpected error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="row w-100" style={{ maxWidth: '450px' }}>
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="mb-1 text-center">Hospital Hub</h3>
              <p className="text-muted mb-4 text-center">
                {isLogin ? 'Sign in to continue' : 'Create your account'}
              </p>

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required={!isLogin}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {!isLogin && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required={!isLogin}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label d-block">Register as</label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="role"
                          id="roleUser"
                          value="User"
                          checked={formData.role === 'User'}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="roleUser">Patient</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="role"
                          id="roleAdmin"
                          value="Admin"
                          checked={formData.role === 'Admin'}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="roleAdmin">Admin</label>
                      </div>
                    </div>
                  </>
                )}

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      {isLogin ? 'Signing in...' : 'Creating account...'}
                    </>
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </button>
              </form>

              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setFormData({ name: '', email: '', password: '', confirmPassword: '', role: 'User' });
                  }}
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </div>
          <p className="text-center text-muted mt-3" style={{ fontSize: '0.9rem' }}>
            By continuing, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
