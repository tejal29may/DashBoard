import React, { useState, useEffect } from "react";

import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../../Screens/Firebase";

const generateRandomStaff = () => {
  // const staff = [];
  
  // for (let i = 1; i <= 20; i++) {
  //   const randomDate = new Date(
  //     Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
  //   );
  //   const staffMember = {
  //     id: i,
  //     img: `https://via.placeholder.com/50?text=Staff${i}`,
  //     name: `Staff Member ${i}`,
  //     designation: `Designation ${Math.floor(Math.random() * 5)}`,
  //     mobile: `123456789${i}`,
  //     email: `staff${i}@example.com`,
  //     joiningDate: randomDate.toISOString().split("T")[0]
  //   };
  //   staff.push(staffMember);
   
   
    
  // }

  // return staff;


};

const Staff = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [staffPerPage] = useState(5);
  const [staff, setStaff] = useState(() => {
    const storedStaff = JSON.parse(localStorage.getItem("staff"));
    return storedStaff || generateRandomStaff();
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newStaffMember, setNewStaffMember] = useState({
    img: null,
    name: "",
    designation: "",
    mobile: "",
    email: "",
    joiningDate: ""
  });
  const [editStaffMember, setEditStaffMember] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    localStorage.setItem("staff", JSON.stringify(staff));
  }, [staff]);

  const handleDelete = (id) => {
    const updatedStaff = staff.filter((member) => member.id !== id);
    setStaff(updatedStaff);
    alert("Staff member deleted");
  };
  console.log("staffs",staff);
  const indexOfLastStaffMember = currentPage * staffPerPage;
  const indexOfFirstStaffMember = indexOfLastStaffMember - staffPerPage;
  const filteredStaff = staff.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedStaff = [...filteredStaff].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.joiningDate) - new Date(b.joiningDate);
    } else {
      return new Date(b.joiningDate) - new Date(a.joiningDate);
    }
  });
  const currentStaff = sortedStaff.slice(
    indexOfFirstStaffMember,
    indexOfLastStaffMember
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
    setEditStaffMember(null);
    setNewStaffMember({
      img: null,
      name: "",
      designation: "",
      mobile: "",
      email: "",
      joiningDate: ""
    });
  };

  const addStaffMember = async () => {
    if (editStaffMember) {
      const updatedStaff = staff.map((member) =>
        member.id === editStaffMember.id ? newStaffMember : member
      );
      setStaff(updatedStaff);
      setEditStaffMember(null);
    } else {
      const updatedStaff = [...staff, newStaffMember];
      setStaff(updatedStaff);
      alert("Staff member added!");


      
      await setDoc(doc(db, "cities"), {
        ...newStaffMember
      });


    }
    closeModal();
  };

  const handleEdit = (member) => {
    setEditStaffMember(member);
    setNewStaffMember(member);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewStaffMember({ ...newStaffMember, img: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="staff">
      <h2>Staff</h2><br />
      <div className="add">
        <button onClick={openModal} className="addbutton">Add New Staff</button>
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
            <h3>{editStaffMember ? "Edit Staff Member" : "Add Staff Member"}</h3>
            {newStaffMember.img && <img src={newStaffMember.img} alt="Staff Member" style={{ maxWidth: "100px" }} />}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <input
              type="text"
              placeholder="Name"
              value={newStaffMember.name}
              onChange={(e) => setNewStaffMember({ ...newStaffMember, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Designation"
              value={newStaffMember.designation}
              onChange={(e) => setNewStaffMember({ ...newStaffMember, designation: e.target.value })}
            />
            <input
              type="text"
              placeholder="Mobile"
              value={newStaffMember.mobile}
              onChange={(e) => setNewStaffMember({ ...newStaffMember, mobile: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newStaffMember.email}
              onChange={(e) => setNewStaffMember({ ...newStaffMember, email: e.target.value })}
            />
            <input
              type="date"
              value={newStaffMember.joiningDate}
              onChange={(e) => setNewStaffMember({ ...newStaffMember, joiningDate: e.target.value })}
            />
            <button onClick={addStaffMember}>{editStaffMember ? "Update" : "Add"}</button>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Joining Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStaff.map((member) => (
            <tr key={member.id}>
              <td><img src={member.img} alt="Staff Member" style={{ maxWidth: "50px" }} /></td>
              <td>{member.name}</td>
              <td>{member.designation}</td>
              <td>{member.mobile}</td>
              <td>{member.email}</td>
              <td>{member.joiningDate}</td>
              <td>
                <button onClick={() => handleEdit(member)}>Edit</button>
                <button onClick={() => handleDelete(member.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredStaff.length > staffPerPage && (
        <div className="pagination">
          <ul>
            {Array.from({ length: Math.ceil(filteredStaff.length / staffPerPage) }).map((_, index) => (
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

export default Staff;
