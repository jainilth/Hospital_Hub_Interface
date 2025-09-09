import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientListByDoctorID() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Get values from localStorage
  const doctorId = localStorage.getItem("doctorId"); // Doctor ID
  const objId = localStorage.getItem("UserId");
  const objRole = localStorage.getItem("UserRole");
  const objAdmin = localStorage.getItem("UserName");
  const objEmail = localStorage.getItem("UserEmail");
  const token = localStorage.getItem("jwtToken"); // JWT

  useEffect(() => {
    const fetchPatients = async () => {
      if (!doctorId) {
        setError("Doctor ID not found. Please set doctorId in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5220/api/Chat/patients-test",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              doctorId: parseInt(doctorId),
              userId: parseInt(objId) || 1,
              role: objRole || "Admin",
              admin: objAdmin || "Test Admin",
              email: objEmail || "test@example.com",
            }),
          }
        );

        if (!response.ok) {
          setError("Failed to fetch patients.");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setPatients(data.patients); 
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching patients.");
        setLoading(false);
      }
    };

    fetchPatients();
  }, [doctorId, objId, objRole, objAdmin, objEmail]);

  if (loading) return <div>Loading patients...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      {patients.map((patientId) => (
        <div key={patientId} style={{ marginBottom: "10px" }}>
          <div>Patient ID: {patientId}</div>
          <div>
            <button
              style={{
                padding: "6px 12px",
                marginTop: "5px",
                cursor: "pointer",
              }}
              
              onClick={() =>
                navigate(
                  `/patient/chat?doctorId=${doctorId}&patientId=${patientId}`
                )
              }
            >
              Message
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
