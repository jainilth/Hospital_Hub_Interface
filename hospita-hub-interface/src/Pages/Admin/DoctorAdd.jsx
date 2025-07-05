import './DoctorAdd.css'; // Custom CSS file

export default function DoctorAdd() {
  return (
    <div className="doctor-form-container">
      <h2>Add Doctor</h2>
      <form className="doctor-form">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter full name" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter email" required />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="Enter phone number" required />
        </div>

        <div className="form-group">
          <label>Specialization</label>
          <input type="text" placeholder="e.g. Cardiologist" required />
        </div>

        <div className="form-group">
          <label>Hospital</label>
          <input type="text" placeholder="Enter hospital name" required />
        </div>

        <div className="form-group">
          <label>Experience (Years)</label>
          <input type="number" placeholder="e.g. 5" required />
        </div>

        <div className="form-group">
          <label>Profile Photo</label>
          <input type="file" accept="image/*" />
        </div>

        <button type="submit" className="submit-btn">Add Doctor</button>
      </form>
    </div>
  );
}
