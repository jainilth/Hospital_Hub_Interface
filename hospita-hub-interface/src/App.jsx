import { BrowserRouter, Routes, Route } from "react-router-dom";
// src/App.jsx
import AdminLayout from "./Layouts/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import DoctorList from "./Pages/Admin/DoctorList";
import DoctorAdd from "./Pages/Admin/DoctorAdd";
import Emergency from "./Pages/Admin/Emergency";

// src/Layouts/PatientLayout.jsx
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
          <Route path="emergency" element={<Emergency />} />
          {/* Add more admin routes as needed */}
        </Route>

        <Route path="/patient" element={<Patient />}>
          <Route path="home" element={<PatientDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// export default App;
