import { BrowserRouter, Routes, Route } from "react-router-dom";
// src/App.jsx
import AdminLayout from "./Layouts/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import DoctorList from "./Pages/Admin/DoctorList";
import DoctorAdd from "./Pages/Admin/DoctorAdd";
import Emergency from "./Pages/Admin/Emergency";
import Medicine from "./Pages/Admin/Medicine";
import User from "./Pages/Admin/User";
import Hospital from "./Pages/Admin/Hospital"; 
import Appointment from "./Pages/Admin/Appointment";
import LocationManagement from "./Pages/Admin/DashboardSubComponent/LocationManagement";
import HospitalManagement from "./Pages/Admin/DashboardSubComponent/HospitalManagement";
import AddCity from "./Pages/Admin/LocationSubComponent/AddCity";

import Country from "./Pages/Admin/Country";

// src/Layouts/PatientLayout.jsx
import Patient from "./Layouts/PatientLayout";
import PatientDashboard from "./Pages/Patient/PatientDashboard";
import Consult from "./Pages/Patient/Consult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
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
          <Route path="hospitalmanagemeent" element={<HospitalManagement/>}/>
          <Route path="addCity" element={<AddCity />} />
          {/* Add more admin routes as needed */}
        </Route>

        <Route path="/patient" element={<Patient />}>
          <Route path="home" element={<PatientDashboard />} />
          <Route path="consult" element={<Consult/>} />
          <Route path="ordermedic" element={<div>order medicine</div>} />
          <Route path="bookappointment" element={<div>bookappointment</div>} />
          <Route path="labtestbook" element={<div>labtestbook</div>} />
          <Route path="readarticles" element={<div>readarticles</div>} />
          <Route path="surgeries" element={<div>surgeries</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// export default App;
