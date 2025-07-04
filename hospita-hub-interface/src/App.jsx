// src/App.jsx
import AdminLayout from "./Layouts/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import DoctorList from "./Pages/Admin/DoctorList";

import Patient from "./Layouts/PatientLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientDashboard from "./Pages/Patient/PatientDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="doctorList" element={<DoctorList />} />
        </Route>

        <Route path="/patient" element={<Patient/>} >
          <Route path="home" element={<PatientDashboard />} />
        </Route>



      </Routes>
    </BrowserRouter>
  );
}

export default App;
// export default App;
