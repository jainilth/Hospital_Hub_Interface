import "./Appointment.css";

const Appointment = () => {
  const appointments = [
    {
      appointmentId: 1,
      userId: 3,
      userName: "Michael Brown",
      userEmail: "michael.brown@email.com",
      userContactNo: "+1234567892",
      doctorId: 1,
      doctorName: "Dr. John Smith",
      doctorSpecialization: "Cardiologist",
      hospitalId: 1,
      hospitalName: "City General Hospital",
      appointmentDateTime: "2024-01-15T10:30:00",
      appointmentStatus: "Scheduled",
      symptoms: "Chest pain, shortness of breath",
      appointmentCreatedDate: "2024-01-10T09:15:00",
      appointmentDateGivenToPatient: "2024-01-12T14:20:00",
      notes: "Patient requires ECG before consultation",
    },
    {
      appointmentId: 2,
      userId: 5,
      userName: "Robert Wilson",
      userEmail: "robert.wilson@email.com",
      userContactNo: "+1234567894",
      doctorId: 2,
      doctorName: "Dr. Sarah Johnson",
      doctorSpecialization: "Dermatologist",
      hospitalId: 2,
      hospitalName: "St. Mary's Medical Center",
      appointmentDateTime: "2024-01-16T14:00:00",
      appointmentStatus: "Completed",
      symptoms: "Skin rash, itching",
      appointmentCreatedDate: "2024-01-08T11:30:00",
      appointmentDateGivenToPatient: "2024-01-09T16:45:00",
      notes: "Prescribed topical medication",
    },
    {
      appointmentId: 3,
      userId: 7,
      userName: "James Taylor",
      userEmail: "james.taylor@email.com",
      userContactNo: "+1234567896",
      doctorId: 3,
      doctorName: "Dr. Emily Davis",
      doctorSpecialization: "Orthopedic",
      hospitalId: 1,
      hospitalName: "City General Hospital",
      appointmentDateTime: "2024-01-17T09:00:00",
      appointmentStatus: "Cancelled",
      symptoms: "Knee pain, difficulty walking",
      appointmentCreatedDate: "2024-01-05T13:20:00",
      appointmentDateGivenToPatient: "2024-01-06T10:15:00",
      notes: "Patient cancelled due to emergency",
    },
    {
      appointmentId: 4,
      userId: 3,
      userName: "Michael Brown",
      userEmail: "michael.brown@email.com",
      userContactNo: "+1234567892",
      doctorId: 4,
      doctorName: "Dr. Lisa Anderson",
      doctorSpecialization: "Neurologist",
      hospitalId: 3,
      hospitalName: "Children's Healthcare Center",
      appointmentDateTime: "2024-01-18T11:15:00",
      appointmentStatus: "NoShow",
      symptoms: "Headaches, dizziness",
      appointmentCreatedDate: "2024-01-12T15:45:00",
      appointmentDateGivenToPatient: "2024-01-13T09:30:00",
      notes: "Patient did not show up",
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Scheduled: "status-scheduled",
      Completed: "status-completed",
      Cancelled: "status-cancelled",
      NoShow: "status-noshow",
    };
    return colors[status] || "status-default";
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const totalAppointments = appointments.length;
  const scheduledAppointments = appointments.filter(
    (a) => a.appointmentStatus === "Scheduled"
  ).length;
  const completedAppointments = appointments.filter(
    (a) => a.appointmentStatus === "Completed"
  ).length;
  const cancelledAppointments = appointments.filter(
    (a) => a.appointmentStatus === "Cancelled"
  ).length;

  return (
    <div className="appointment-container">
      <div className="appointment-header">
        <h1>Appointment Management</h1>
        <p>Manage patient appointments and scheduling</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-number">{totalAppointments}</div>
          <div className="stat-label">Total Appointments</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{scheduledAppointments}</div>
          <div className="stat-label">Scheduled</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedAppointments}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{cancelledAppointments}</div>
          <div className="stat-label">Cancelled</div>
        </div>
      </div>

      <div className="appointment-table-container">
        <table className="appointment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Hospital</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Symptoms</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              const appointmentDateTime = formatDateTime(
                appointment.appointmentDateTime
              );
              return (
                <tr key={appointment.appointmentId}>
                  <td>
                    <strong>#{appointment.appointmentId}</strong>
                  </td>
                  <td>
                    <div className="patient-info">
                      <strong>{appointment.userName}</strong>
                      <small>{appointment.userEmail}</small>
                    </div>
                  </td>
                  <td>
                    <div className="doctor-info">
                      <strong>{appointment.doctorName}</strong>
                      <small>{appointment.doctorSpecialization}</small>
                    </div>
                  </td>
                  <td>
                    <strong>{appointment.hospitalName}</strong>
                  </td>
                  <td>
                    <div className="datetime-info">
                      <strong>{appointmentDateTime.date}</strong>
                      <small>{appointmentDateTime.time}</small>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${getStatusColor(
                        appointment.appointmentStatus
                      )}`}
                    >
                      {appointment.appointmentStatus}
                    </span>
                  </td>
                  <td>
                    <div className="symptoms">{appointment.symptoms}</div>
                  </td>
                  <td>
                    <div className="notes">{appointment.notes}</div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="view-btn">👁️</button>
                      <button className="edit-btn">✏️</button>
                      <button className="delete-btn">🗑️</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointment;
