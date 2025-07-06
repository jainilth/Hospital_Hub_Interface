import { BrowserRouter, Routes, Route } from "react-router-dom";
// src/App.jsx
import AdminLayout from "./Layouts/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import DoctorList from "./Pages/Admin/DoctorList";
import DoctorAdd from "./Pages/Admin/DoctorAdd";
import AppointmantOverView from "./Pages/Admin/SubHeaderComponent/AppointmantOverView";
import DepartmentOverView from "./Pages/Admin/SubHeaderComponent/DepartmentOverView";
import DoctorOverView from "./Pages/Admin/SubHeaderComponent/DoctorOverView";
import HospitalOverView from "./Pages/Admin/SubHeaderComponent/HospitalOverView";
import OverView from "./Pages/Admin/SubHeaderComponent/OverView";
import PatientOverView from "./Pages/Admin/SubHeaderComponent/PatientOverView";
import MedicineOverView from "./Pages/Admin/SubHeaderComponent/MedicineOverView";
import LabOverView from "./Pages/Admin/SubHeaderComponent/LabOverView";
import EmergencyOverView from "./Pages/Admin/SubHeaderComponent/EmergencyOverView";

import Patient from "./Layouts/PatientLayout";
import PatientDashboard from "./Pages/Patient/PatientDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>

          <Route path="dashboard" element={<Dashboard />}>
            <Route path="overview" element={<OverView />} />
            <Route path="patientOverview" element={<PatientOverView />} />
            <Route path="doctorOverview" element={<DoctorOverView />} />
            <Route path="hospitalOverview" element={<HospitalOverView />} />
            <Route path="departmentOverview" element={<DepartmentOverView />} />
            <Route path="appointmentOverview" element={<AppointmantOverView />} />
            <Route path="medicineOverview" element={<MedicineOverView />} />
            <Route path="labOverview" element={<LabOverView />} />
            <Route path="emergencyOverview" element={<EmergencyOverView />} />
          </Route>
        
          <Route path="doctorList" element={<DoctorList />} />
          <Route path="doctorAdd" element={<DoctorAdd />} />
        </Route>

        <Route path="/patient" element={<Patient/>} >
          <Route path="home" element={<PatientDashboard />} />
          <Route path="consult" element={<div>consult</div>} />
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
