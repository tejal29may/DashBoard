import React, { useState, useEffect } from "react";

const generateRandomPatients = () => {
  const patients = [];
  for (let i = 1; i <= 20; i++) {
    const randomDate = new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    );
    const patient = {
      id: i,
      name: `Patient ${i}`,
      gender: Math.random() > 0.5 ? "Male" : "Female",
      address: `Address ${i}`,
      mobile: `123456789${i}`,
      dob: randomDate.toISOString().split("T")[0],
      age: Math.floor(Math.random() * 90) + 10,
      bloodGroup: ["A", "B", "AB", "O"][Math.floor(Math.random() * 4)],
      status: ["Discharge", "Operation", "Checkup"][Math.floor(Math.random() * 3)]
    };
    patients.push(patient);
  }
  return patients;
};

const PatientsData = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(5);
  const [patients, setPatients] = useState(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients"));
    return storedPatients || generateRandomPatients();
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    gender: "",
    address: "",
    mobile: "",
    dob: "",
    age: "",
    bloodGroup: "",
    status: ""
  });
  const [editPatient, setEditPatient] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients]);

  const handleDelete = (id) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
    alert("Patient deleted");
  };

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.dob) - new Date(b.dob);
    } else {
      return new Date(b.dob) - new Date(a.dob);
    }
  });
  const currentPatients = sortedPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditPatient(null);
    setNewPatient({
      name: "",
      gender: "",
      address: "",
      mobile: "",
      dob: "",
      age: "",
      bloodGroup: "",
      status: ""
    });
  };

  const addPatient = () => {
    if (editPatient) {
      const updatedPatients = patients.map((patient) =>
        patient.id === editPatient.id ? newPatient : patient
      );
      setPatients(updatedPatients);
      setEditPatient(null);
    } else {
      const updatedPatients = [...patients, newPatient];
      setPatients(updatedPatients);
      alert("Patient added!");
    }
    closeModal();
  };

  const handleEdit = (patient) => {
    setEditPatient(patient);
    setNewPatient(patient);
    setShowModal(true);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="patients">
      <h2>Patients</h2><br />
      <div className="add">
        <button onClick={openModal} className="addbutton">Add New Patient</button>
        <button onClick={toggleSortOrder} className="oldest">Sort by Date of Birth ({sortOrder === "asc" ? "Oldest" : "Newest"} )</button>
        <input
          type="text"
          placeholder="Search by patient name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>{editPatient ? "Edit Patient" : "Add Patient"}</h3>
            <input
              type="text"
              placeholder="Name"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            />
            <select value={newPatient.gender} onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              placeholder="Address"
              value={newPatient.address}
              onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="Mobile"
              value={newPatient.mobile}
              onChange={(e) => setNewPatient({ ...newPatient, mobile: e.target.value })}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={newPatient.dob}
              onChange={(e) => setNewPatient({ ...newPatient, dob: e.target.value })}
            />
            <input
              type="number"
              placeholder="Age"
              value={newPatient.age}
              onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
            />
            <input
              type="text"
              placeholder="Blood Group"
              value={newPatient.bloodGroup}
              onChange={(e) => setNewPatient({ ...newPatient, bloodGroup: e.target.value })}
            />
            <select value={newPatient.status} onChange={(e) => setNewPatient({ ...newPatient, status: e.target.value })}>
              <option value="">Select Status</option>
              <option value="Discharge">Discharge</option>
              <option value="Operation">Operation</option>
              <option value="Checkup">Checkup</option>
            </select>
            <button onClick={addPatient}>{editPatient ? "Update" : "Add"}</button>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Mobile</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Blood Group</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.gender}</td>
              <td>{patient.address}</td>
              <td>{patient.mobile}</td>
              <td>{patient.dob}</td>
              <td>{patient.age}</td>
              <td>{patient.bloodGroup}</td>
              <td>{patient.status}</td>
              <td>
                <button onClick={() => handleEdit(patient)}>Edit</button>
                <button onClick={() => handleDelete(patient.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredPatients.length > patientsPerPage && (
        <div className="pagination">
          <ul>
            {Array.from({ length: Math.ceil(filteredPatients.length / patientsPerPage) }).map((_, index) => (
              <li key={index}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientsData;
