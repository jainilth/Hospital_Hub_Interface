import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

// Layouts
import AdminLayout from "./Layouts/AdminLayout";
import PatientLayout from "./Layouts/PatientLayout";

// Pages
import Dashboard from "./Pages/Admin/Dashboard";
import PatientDashboard from "./Pages/Patient/PatientDashboard";
import Consult from "./Pages/Patient/Consult";
import Specialities from "./Pages/Patient/Specialities";
import Doctors from "./Pages/Patient/Doctors";
import ChatWithDoctorInterface from "./Pages/Patient/ChatWithDoctorInterface";
import LoginPage from "./LoginPage";
import LoadingFallback from "./components/LoadingFallback";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Login */}
            <Route path="/" element={<LoginPage />} />
            
            {/* Debug route - temporarily add this */}
            <Route path="/debug" element={<LoadingFallback />} />

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
                <ProtectedRoute requiredRole={["User", "Patient", "Admin"]}>
                  <PatientLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<PatientDashboard />} />
              <Route path="consult" element={<Consult />} />
              <Route path="specialities" element={<Specialities />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="chat" element={<ChatWithDoctorInterface />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
