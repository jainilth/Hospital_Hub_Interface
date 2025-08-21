import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = React.useState("")
  const [error, setError] = React.useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    if (!selectedRole) {
      setError('Please select Admin or User')
      return
    }
    setError("")
    if (selectedRole === 'user') {
      navigate('/patient/home')
    } else if (selectedRole === 'admin') {
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="row w-100" style={{ maxWidth: '420px' }}>
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="mb-1 text-center">Hospital Hub</h3>
              <p className="text-muted mb-4 text-center">Sign in to continue</p>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" placeholder="you@example.com" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" placeholder="••••••••" required />
                </div>
                <div className="mb-3">
                  <label className="form-label d-block">Login as</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="roleUser"
                      checked={selectedRole === 'user'}
                      onChange={() => setSelectedRole('user')}
                    />
                    <label className="form-check-label" htmlFor="roleUser">User</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="roleAdmin"
                      checked={selectedRole === 'admin'}
                      onChange={() => setSelectedRole('admin')}
                    />
                    <label className="form-check-label" htmlFor="roleAdmin">Admin</label>
                  </div>
                  {error && (
                    <div className="form-text text-danger">{error}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
          <p className="text-center text-muted mt-3" style={{ fontSize: '0.9rem' }}>
            By continuing, you agree to our Terms and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
