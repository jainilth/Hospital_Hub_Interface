import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import AdminLayout from "./Layouts/AdminLayout";
import Patient from "./Layouts/PatientLayout";

// Admin Pages
import Dashboard from "./Pages/Admin/Dashboard";
import DoctorList from "./Pages/Admin/DoctorList";
import DoctorAdd from "./Pages/Admin/DoctorAdd";
import Emergency from "./Pages/Admin/Emergency";
import Medicine from "./Pages/Admin/Medicine";
import User from "./Pages/Admin/User";
import Hospital from "./Pages/Admin/Hospital";
import Appointment from "./Pages/Admin/Appointment";
import Country from "./Pages/Admin/Country";

// Admin Location Management
import LocationManagement from "./Pages/Admin/DashboardSubComponent/LocationManagement";
import HospitalManagement from "./Pages/Admin/DashboardSubComponent/HospitalManagement";
import AddCity from "./Pages/Admin/LocationSubComponent/AddCity";
import AddCountry from "./Pages/Admin/LocationSubComponent/AddCountry";
import AddState from "./Pages/Admin/LocationSubComponent/AddState";
import GetCityDetailsById from "./Pages/Admin/DashboardSubComponent/LocationManagementComponent/GetCityDetailsById";
import GetCountryDetailsById from "./Pages/Admin/DashboardSubComponent/LocationManagementComponent/GetCountryDetailsById";
import GetStateDetailsById from "./Pages/Admin/DashboardSubComponent/LocationManagementComponent/GetStateDetailsById";

// Chat Connect Components (renamed to avoid conflicts)
import AdminChatConnect from "./Pages/Admin/ChatWithPatient/ChatConnect";
import PatientChatConnect from "./Pages/Patient/chat/ChatConnect";

// Patient Pages
import PatientDashboard from "./Pages/Patient/PatientDashboard";
import Consult from "./Pages/Patient/Consult";
import Specialities from "./Pages/Patient/Specialities";
import Doctors from "./Pages/Patient/Doctors";
import LoginPage from "./LoginPage";

//chat
import ChatWithDoctorInterface from "./Pages/Patient/ChatWithDoctorInterface";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Login Route */}
          <Route path="/" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="Admin">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="doctorList" element={<DoctorList />} />
            <Route path="doctorAdd" element={<DoctorAdd />} />
            <Route path="emergency" element={<Emergency />} />
            <Route path="medicine" element={<Medicine />} />
            <Route path="user" element={<User />} />
            <Route path="hospital" element={<Hospital />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="country" element={<Country />} />
            <Route path="locationmanagement" element={<LocationManagement />} />
            <Route path="locationmanagement/addCity" element={<AddCity />} />
            <Route path="locationmanagement/addCity/:cityId" element={<AddCity />} />
            <Route path="locationmanagement/addCountry" element={<AddCountry />} />
            <Route path="locationmanagement/addCountry/:countryId" element={<AddCountry />} />
            <Route path="locationmanagement/addState" element={<AddState />} />
            <Route path="locationmanagement/addState/:stateId" element={<AddState />} />
            <Route path="locationmanagement/getCity/:cityId" element={<GetCityDetailsById />} />
            <Route path="locationmanagement/getCountry/:countryId" element={<GetCountryDetailsById />} />
            <Route path="locationmanagement/getState/:stateId" element={<GetStateDetailsById />} />
            <Route path="hospitalmanagemeent" element={<HospitalManagement />} />

            {/* ✅ Admin-side Chat */}
            <Route path="doctorList/chat" element={<AdminChatConnect />} />
          </Route>

          {/* Patient Routes */}
          <Route path="/patient" element={
            <ProtectedRoute requiredRole="User">
              <Patient />
            </ProtectedRoute>
          }>
            <Route path="home" element={<PatientDashboard />} />
            <Route path="consult" element={<Consult />} />
            <Route path="consult/chat" element={<PatientChatConnect />} />
            <Route path="specialities" element={<Specialities />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="ordermedic" element={<div>order medicine</div>} />
            <Route path="bookappointment" element={<div>bookappointment</div>} />
            <Route path="labtestbook" element={<div>labtestbook</div>} />
            <Route path="readarticles" element={<div>readarticles</div>} />
            <Route path="surgeries" element={<div>surgeries</div>} />
            <Route path="patient/doctors/chat" element={<PatientChatConnect />} />
            <Route path="chatInterface" element={<ChatWithDoctorInterface />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
