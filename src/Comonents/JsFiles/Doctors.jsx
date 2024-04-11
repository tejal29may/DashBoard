import React, { useState, useEffect } from "react";
import "../CSSFiles/Doctors.css";

const generateRandomDoctors = () => {
  const doctors = [];
  for (let i = 1; i <= 20; i++) {
    const randomDate = new Date(
      Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    );
    const doctor = {
      id: i,
      img: `https://via.placeholder.com/50?text=Dr.${i}`,
      name: `Dr. User ${i}`,
      department: `Department ${Math.floor(Math.random() * 5)}`,
      specialization: `MBBS, ${["BDS", "MD", "MS", "DM"][Math.floor(Math.random() * 4)]}`,
      degree: `Degree ${Math.floor(Math.random() * 5)}`,
      mobile: `123456789${i}`,
      email: `druser${i}@example.com`,
      joiningDate: randomDate.toISOString().split("T")[0]
    };
    doctors.push(doctor);
  }
  return doctors;
};

const Doctors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(5);
  const [doctors, setDoctors] = useState(() => {
    const storedDoctors = JSON.parse(localStorage.getItem("doctors"));
    return storedDoctors || generateRandomDoctors();
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    img: null,
    name: "",
    department: "",
    specialization: "",
    degree: "",
    mobile: "",
    email: "",
    joiningDate: ""
  });
  const [editDoctor, setEditDoctor] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  const handleDelete = (id) => {
    const updatedDoctors = doctors.filter((doctor) => doctor.id !== id);
    setDoctors(updatedDoctors);
    alert("Doctor deleted");
  };

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.joiningDate) - new Date(b.joiningDate);
    } else {
      return new Date(b.joiningDate) - new Date(a.joiningDate);
    }
  });
  const currentDoctors = sortedDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
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
    setEditDoctor(null);
    setNewDoctor({
      img: null,
      name: "",
      department: "",
      specialization: "",
      degree: "",
      mobile: "",
      email: "",
      joiningDate: ""
    });
  };

  const addDoctor = () => {
    if (editDoctor) {
      const updatedDoctors = doctors.map((doctor) =>
        doctor.id === editDoctor.id ? newDoctor : doctor
      );
      setDoctors(updatedDoctors);
      setEditDoctor(null);
    } else {
      const updatedDoctors = [...doctors, newDoctor];
      setDoctors(updatedDoctors);
      alert("Doctor added!");
    }
    closeModal();
  };

  const handleEdit = (doctor) => {
    setEditDoctor(doctor);
    setNewDoctor(doctor);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewDoctor({ ...newDoctor, img: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="doctors">
      <h2>Doctors</h2><br />
      <div className="add">
        <button onClick={openModal} className="addbutton">Add New</button>
        <button onClick={toggleSortOrder} className="oldest">Sort by Joining Date ({sortOrder === "asc" ? "Oldest" : "Newest"} )</button>
        <input
          type="text"
          placeholder="Search by name"
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
            <h3>{editDoctor ? "Edit Doctor" : "Add Doctor"}</h3>
            {newDoctor.img && <img src={newDoctor.img} alt="Doctor" style={{ maxWidth: "100px" }} />}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <input
              type="text"
              placeholder="Name"
              value={newDoctor.name}
              onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Department"
              value={newDoctor.department}
              onChange={(e) => setNewDoctor({ ...newDoctor, department: e.target.value })}
            />
            <input
              type="text"
              placeholder="Specialization"
              value={newDoctor.specialization}
              onChange={(e) => setNewDoctor({ ...newDoctor, specialization: e.target.value })}
            />
            <input
              type="text"
              placeholder="Degree"
              value={newDoctor.degree}
              onChange={(e) => setNewDoctor({ ...newDoctor, degree: e.target.value })}
            />
            <input
              type="text"
              placeholder="Mobile"
              value={newDoctor.mobile}
              onChange={(e) => setNewDoctor({ ...newDoctor, mobile: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newDoctor.email}
              onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
            />
            <input
              type="date"
              value={newDoctor.joiningDate}
              onChange={(e) => setNewDoctor({ ...newDoctor, joiningDate: e.target.value })}
            />
            <button onClick={addDoctor}>{editDoctor ? "Update" : "Add"}</button>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Department</th>
            <th>Specialization</th>
            <th>Degree</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Joining Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentDoctors.map((doctor) => (
            <tr key={doctor.id}>
              <td><img src={doctor.img} alt="Doctor" style={{ maxWidth: "50px" }} /></td>
              <td>{doctor.name}</td>
              <td>{doctor.department}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.degree}</td>
              <td>{doctor.mobile}</td>
              <td>{doctor.email}</td>
              <td>{doctor.joiningDate}</td>
              <td>
                <button onClick={() => handleEdit(doctor)}>Edit</button>
                <button onClick={() => handleDelete(doctor.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredDoctors.length > doctorsPerPage && (
        <div className="pagination">
          <ul>
            {Array.from({ length: Math.ceil(filteredDoctors.length / doctorsPerPage) }).map((_, index) => (
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

export default Doctors;
