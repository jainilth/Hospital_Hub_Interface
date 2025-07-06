import { BrowserRouter, Routes, Route } from "react-router-dom";
// src/App.jsx
import AdminLayout from "./Layouts/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import DoctorList from "./Pages/Admin/DoctorList";
import DoctorAdd from "./Pages/Admin/DoctorAdd";

import Patient from "./Layouts/PatientLayout";
import PatientDashboard from "./Pages/Patient/PatientDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
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
