import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "./config.js";
import "./style.css";

const MedicineManager = () => {
  const [medicines, setMedicines] = useState([]);
  const [medicine, setMedicine] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    quantity: "",
    manufactureDate: "",
    expiryDate: "",
    batchNumber: ""
  });
  const [idToFetch, setIdToFetch] = useState("");
  const [fetchedMedicine, setFetchedMedicine] = useState(null);
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${config.url}/medicineapi`;

  // Fetch all medicines initially
  useEffect(() => {
    fetchAllMedicines();
  }, []);

  const fetchAllMedicines = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setMedicines(res.data);
    } catch (error) {
      setMessage("Error fetching medicines.");
    }
  };

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  // ✅ Validation (ignores "id")
  const validateForm = () => {
    for (let key in medicine) {
      if (!medicine[key] || medicine[key].toString().trim() === "") {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  // Add Medicine
  const addMedicine = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, medicine);
      setMessage("Medicine added successfully.");
      fetchAllMedicines();
      resetForm();
    } catch (error) {
      setMessage("Error adding medicine.");
    }
  };

  // Update Medicine
  const updateMedicine = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, { ...medicine });
      setMessage("Medicine updated successfully.");
      fetchAllMedicines();
      resetForm();
    } catch (error) {
      setMessage("Error updating medicine.");
    }
  };

  // Delete Medicine
  const deleteMedicine = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllMedicines();
    } catch (error) {
      setMessage("Error deleting medicine.");
    }
  };

  // Get Medicine by ID
  const getMedicineById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedMedicine(res.data);
      setMessage("");
    } catch (error) {
      setFetchedMedicine(null);
      setMessage("Medicine not found.");
    }
  };

  // Edit Mode
  const handleEdit = (med) => {
    setMedicine({
      id: med.id, // keep id for update
      name: med.name,
      category: med.category,
      brand: med.brand,
      price: med.price,
      quantity: med.quantity,
      manufactureDate: med.manufactureDate,
      expiryDate: med.expiryDate,
      batchNumber: med.batchNumber
    });
    setEditMode(true);
    setMessage(`Editing medicine with ID ${med.id}`);
  };

  const resetForm = () => {
    setMedicine({
      name: "",
      category: "",
      brand: "",
      price: "",
      quantity: "",
      manufactureDate: "",
      expiryDate: "",
      batchNumber: ""
    });
    setEditMode(false);
  };

  return (
    <div className="student-container">
      {/* ✅ Message Banner */}
      {message && (
        <div
          className={`message-banner ${
            message.toLowerCase().includes("error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      <h2>Medicine Management</h2>

      {/* ✅ Add / Edit Medicine Form */}
      <div>
        <h3>{editMode ? "Edit Medicine" : "Add Medicine"}</h3>
        <div className="form-grid">
          <input type="text" name="name" placeholder="Name" value={medicine.name} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={medicine.category} onChange={handleChange} />
          <input type="text" name="brand" placeholder="Brand" value={medicine.brand} onChange={handleChange} />
          <input type="number" name="price" placeholder="Price" value={medicine.price} onChange={handleChange} />
          <input type="number" name="quantity" placeholder="Quantity" value={medicine.quantity} onChange={handleChange} />
          <input type="date" name="manufactureDate" value={medicine.manufactureDate} onChange={handleChange} />
          <input type="date" name="expiryDate" value={medicine.expiryDate} onChange={handleChange} />
          <input type="text" name="batchNumber" placeholder="Batch Number" value={medicine.batchNumber} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addMedicine}>Add Medicine</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateMedicine}>Update Medicine</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      {/* ✅ Fetch Medicine By ID */}
      <div>
        <h3>Get Medicine By ID</h3>
        <input type="number" value={idToFetch} onChange={(e) => setIdToFetch(e.target.value)} placeholder="Enter ID" />
        <button className="btn-blue" onClick={getMedicineById}>Fetch</button>

        {fetchedMedicine && (
          <div>
            <h4>Medicine Found:</h4>
            <pre>{JSON.stringify(fetchedMedicine, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* ✅ Medicines Table */}
      <div>
        <h3>All Medicines</h3>
        {medicines.length === 0 ? (
          <p>No medicines found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Manufacture Date</th>
                  <th>Expiry Date</th>
                  <th>Batch Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr key={med.id}>
                    <td>{med.id}</td>
                    <td>{med.name}</td>
                    <td>{med.category}</td>
                    <td>{med.brand}</td>
                    <td>{med.price}</td>
                    <td>{med.quantity}</td>
                    <td>{med.manufactureDate}</td>
                    <td>{med.expiryDate}</td>
                    <td>{med.batchNumber}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(med)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteMedicine(med.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineManager;
