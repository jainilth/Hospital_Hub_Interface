import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import AdminLayout from "./Layouts/AdminLayout";
import PatientLayout from "./Layouts/PatientLayout";

// Pages
import Dashboard from "./Pages/Admin/Dashboard";
import PatientDashboard from "./Pages/Patient/PatientDashboard";
import Consult from "./Pages/Patient/Consult";
import LoginPage from "./LoginPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Login */}
          <Route path="/" element={<LoginPage />} />

          {/* Admin Area */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole={["Admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          {/* Patient Area */}
          <Route
            path="/patient"
            element={
              <ProtectedRoute requiredRole={["User", "Patient"]}>
                <PatientLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<PatientDashboard />} />
            <Route path="consult" element={<Consult />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
