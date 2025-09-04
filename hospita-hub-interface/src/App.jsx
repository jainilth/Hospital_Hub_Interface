import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

// Layouts
import AdminLayout from "./Layouts/AdminLayout";
import PatientLayout from "./Layouts/PatientLayout";

// Pages
// Admin Pages
import Dashboard from "./Pages/Admin/Dashboard";
import DoctorAdd from "./Pages/Admin/DoctorAdd";
import DoctorEdit from "./Pages/Admin/DoctorEdit";
import DoctorList from "./Pages/Admin/DoctorList";
import Emergency from "./Pages/Admin/Emergency";
import Medicine from "./Pages/Admin/Medicine";
import User from "./Pages/Admin/User";
import Hospital from "./Pages/Admin/Hospital";
import Appointment from "./Pages/Admin/Appointment";
import Country from "./Pages/Admin/Country";

// Location Management Components
import LocationManagement from "./Pages/Admin/DashboardSubComponent/LocationManagement";
import AddCountry from "./Pages/Admin/LocationSubComponent/AddCountry";
import AddState from "./Pages/Admin/LocationSubComponent/AddState";
import AddCity from "./Pages/Admin/LocationSubComponent/AddCity";
import CountryDetails from "./Pages/Admin/LocationSubComponent/CountryDetails";
import StateDetails from "./Pages/Admin/LocationSubComponent/StateDetails";
import CityDetails from "./Pages/Admin/LocationSubComponent/CityDetails";

// Patient Pages
import PatientDashboard from "./Pages/Patient/PatientDashboard";
import Consult from "./Pages/Patient/Consult";
import Specialities from "./Pages/Patient/Specialities";
import Doctors from "./Pages/Patient/Doctors";

// Other Pages
import LoginPage from "./LoginPage";
import LoadingFallback from "./components/LoadingFallback";
import ChatConnect from "./Pages/Patient/chat/ChatConnect";

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
              <Route path="doctorAdd" element={<DoctorAdd />} />
              <Route path="doctorEdit/:id" element={<DoctorEdit />} />
              <Route path="doctorList" element={<DoctorList />} />
              <Route path="emergency" element={<Emergency />} />
              <Route path="medicine" element={<Medicine />} />
              <Route path="user" element={<User />} />
              <Route path="hospital" element={<Hospital />} />
              <Route path="appointment" element={<Appointment />} />
              <Route path="country" element={<Country />} />
              
              {/* Location Management Routes */}
              <Route path="locationmanagement" element={<LocationManagement />} />
              <Route path="locationmanagement/addCountry" element={<AddCountry />} />
              <Route path="locationmanagement/addCountry/:countryId" element={<AddCountry />} />
              <Route path="locationmanagement/addState" element={<AddState />} />
              <Route path="locationmanagement/addState/:stateId" element={<AddState />} />
              <Route path="locationmanagement/addCity" element={<AddCity />} />
              <Route path="locationmanagement/addCity/:cityId" element={<AddCity />} />
              <Route path="locationmanagement/getCountry/:countryId" element={<CountryDetails />} />
              <Route path="locationmanagement/getState/:stateId" element={<StateDetails />} />
              <Route path="locationmanagement/getCity/:cityId" element={<CityDetails />} />
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
              <Route path="chat" element={<ChatConnect/>} />
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
