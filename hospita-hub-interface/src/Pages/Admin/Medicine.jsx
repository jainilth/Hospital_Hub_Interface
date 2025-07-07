import { useState } from "react";
import "./Medicine.css";

const Medicine = () => {
  // Static data for medicines
  const [medicines, setMedicines] = useState([
    {
      medicineId: 1,
      medicineName: "Paracetamol",
      medicineGenericName: "Acetaminophen",
      medicineBrand: "Crocin",
      medicineDescription: "Pain reliever and fever reducer",
      medicineDosage: "500mg",
      medicinePrice: 25.5,
      categoryId: 1,
      categoryName: "Analgesics",
      unitId: 1,
      unitName: "Tablet",
    },
    {
      medicineId: 2,
      medicineName: "Amoxicillin",
      medicineGenericName: "Amoxicillin",
      medicineBrand: "Amoxil",
      medicineDescription: "Antibiotic for bacterial infections",
      medicineDosage: "250mg",
      medicinePrice: 45.0,
      categoryId: 2,
      categoryName: "Antibiotics",
      unitId: 2,
      unitName: "Capsule",
    },
    {
      medicineId: 3,
      medicineName: "Cetirizine",
      medicineGenericName: "Cetirizine HCl",
      medicineBrand: "Zyrtec",
      medicineDescription: "Antihistamine for allergies",
      medicineDosage: "10mg",
      medicinePrice: 18.75,
      categoryId: 3,
      categoryName: "Antihistamines",
      unitId: 1,
      unitName: "Tablet",
    },
    {
      medicineId: 4,
      medicineName: "Cough Syrup",
      medicineGenericName: "Dextromethorphan",
      medicineBrand: "Robitussin",
      medicineDescription: "Cough suppressant syrup",
      medicineDosage: "100ml",
      medicinePrice: 65.0,
      categoryId: 4,
      categoryName: "Cough & Cold",
      unitId: 3,
      unitName: "ml",
    },
    {
      medicineId: 5,
      medicineName: "Insulin",
      medicineGenericName: "Human Insulin",
      medicineBrand: "Humulin",
      medicineDescription: "Diabetes medication",
      medicineDosage: "10ml",
      medicinePrice: 450.0,
      categoryId: 5,
      categoryName: "Diabetes",
      unitId: 3,
      unitName: "ml",
    },
  ]);

  const [categories] = useState([
    { categoryId: 1, categoryName: "Analgesics" },
    { categoryId: 2, categoryName: "Antibiotics" },
    { categoryId: 3, categoryName: "Antihistamines" },
    { categoryId: 4, categoryName: "Cough & Cold" },
    { categoryId: 5, categoryName: "Diabetes" },
    { categoryId: 6, categoryName: "Cardiovascular" },
  ]);

  const [units] = useState([
    { unitId: 1, unitName: "Tablet" },
    { unitId: 2, unitName: "Capsule" },
    { unitId: 3, unitName: "ml" },
    { unitId: 4, unitName: "mg" },
    { unitId: 5, unitName: "Injection" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [formData, setFormData] = useState({
    medicineName: "",
    medicineGenericName: "",
    medicineBrand: "",
    medicineDescription: "",
    medicineDosage: "",
    medicinePrice: "",
    categoryId: "",
    unitId: "",
  });

  // Filter medicines based on search and category
  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.medicineGenericName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      medicine.medicineBrand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" ||
      medicine.categoryId.toString() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMedicines = filteredMedicines.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryName =
      categories.find(
        (cat) => cat.categoryId.toString() === formData.categoryId
      )?.categoryName || "";
    const unitName =
      units.find((unit) => unit.unitId.toString() === formData.unitId)
        ?.unitName || "";

    if (editingMedicine) {
      // Update existing medicine
      setMedicines(
        medicines.map((medicine) =>
          medicine.medicineId === editingMedicine.medicineId
            ? {
                ...medicine,
                ...formData,
                categoryId: Number.parseInt(formData.categoryId),
                unitId: Number.parseInt(formData.unitId),
                medicinePrice: Number.parseFloat(formData.medicinePrice),
                categoryName,
                unitName,
              }
            : medicine
        )
      );
    } else {
      // Add new medicine
      const newMedicine = {
        medicineId: Math.max(...medicines.map((m) => m.medicineId)) + 1,
        ...formData,
        categoryId: Number.parseInt(formData.categoryId),
        unitId: Number.parseInt(formData.unitId),
        medicinePrice: Number.parseFloat(formData.medicinePrice),
        categoryName,
        unitName,
      };
      setMedicines([...medicines, newMedicine]);
    }

    resetForm();
  };

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);
    setFormData({
      medicineName: medicine.medicineName,
      medicineGenericName: medicine.medicineGenericName,
      medicineBrand: medicine.medicineBrand,
      medicineDescription: medicine.medicineDescription,
      medicineDosage: medicine.medicineDosage,
      medicinePrice: medicine.medicinePrice.toString(),
      categoryId: medicine.categoryId.toString(),
      unitId: medicine.unitId.toString(),
    });
    setShowModal(true);
  };

  const handleDelete = (medicineId) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      setMedicines(
        medicines.filter((medicine) => medicine.medicineId !== medicineId)
      );
    }
  };

  const resetForm = () => {
    setFormData({
      medicineName: "",
      medicineGenericName: "",
      medicineBrand: "",
      medicineDescription: "",
      medicineDosage: "",
      medicinePrice: "",
      categoryId: "",
      unitId: "",
    });
    setEditingMedicine(null);
    setShowModal(false);
  };

  return (
    <div className="medicine-container">
      <div className="medicine-header">
        <h1>Medicine Management</h1>
        <p>Manage your hospital's medicine inventory</p>
      </div>

      {/* Controls Section */}
      <div className="medicine-controls">
        <div className="search-filter-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <i className="search-icon">🔍</i>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <button className="add-medicine-btn" onClick={() => setShowModal(true)}>
          + Add New Medicine
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-number">{medicines.length}</div>
          <div className="stat-label">Total Medicines</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{categories.length}</div>
          <div className="stat-label">Categories</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{filteredMedicines.length}</div>
          <div className="stat-label">Filtered Results</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            ₹
            {medicines
              .reduce((sum, med) => sum + med.medicinePrice, 0)
              .toFixed(2)}
          </div>
          <div className="stat-label">Total Value</div>
        </div>
      </div>

      {/* Medicine Table */}
      <div className="medicine-table-container">
        <table className="medicine-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Generic Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Dosage</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMedicines.map((medicine) => (
              <tr key={medicine.medicineId}>
                <td>
                  <div className="medicine-name-cell">
                    <strong>{medicine.medicineName}</strong>
                    <small>{medicine.medicineDescription}</small>
                  </div>
                </td>
                <td>{medicine.medicineGenericName}</td>
                <td>{medicine.medicineBrand}</td>
                <td>
                  <span className="category-badge">
                    {medicine.categoryName}
                  </span>
                </td>
                <td>{medicine.medicineDosage}</td>
                <td>{medicine.unitName}</td>
                <td>₹{medicine.medicinePrice.toFixed(2)}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(medicine)}
                    >
                      ✏️
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(medicine.medicineId)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>

        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingMedicine ? "Edit Medicine" : "Add New Medicine"}</h2>
              <button className="close-btn" onClick={resetForm}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="medicine-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Medicine Name *</label>
                  <input
                    type="text"
                    name="medicineName"
                    value={formData.medicineName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Generic Name *</label>
                  <input
                    type="text"
                    name="medicineGenericName"
                    value={formData.medicineGenericName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Brand</label>
                  <input
                    type="text"
                    name="medicineBrand"
                    value={formData.medicineBrand}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Dosage *</label>
                  <input
                    type="text"
                    name="medicineDosage"
                    value={formData.medicineDosage}
                    onChange={handleInputChange}
                    placeholder="e.g., 500mg, 1 Tablet"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Unit *</label>
                  <select
                    name="unitId"
                    value={formData.unitId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Unit</option>
                    {units.map((unit) => (
                      <option key={unit.unitId} value={unit.unitId}>
                        {unit.unitName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    name="medicinePrice"
                    value={formData.medicinePrice}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="medicineDescription"
                  value={formData.medicineDescription}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter medicine description..."
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={resetForm}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingMedicine ? "Update Medicine" : "Add Medicine"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medicine;
