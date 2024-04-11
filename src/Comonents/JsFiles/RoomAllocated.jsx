import React, { useState, useEffect } from "react";
// import "../CSSFiles/RoomAllocated.css"; // Assuming you have a CSS file for room allocated styles

const generateRandomRooms = () => {
  const rooms = [];
  for (let i = 1; i <= 20; i++) {
    const randomDate = new Date(
      Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    );
    const room = {
      id: i,
      photo: `https://via.placeholder.com/50?text=Room${i}`,
      roomNumber: `Room ${i}`,
      roomType: `Type ${Math.floor(Math.random() * 5)}`,
      patientName: `Patient ${i}`,
      allocatedDate: randomDate.toISOString().split("T")[0],
      dischargeDate: randomDate.toISOString().split("T")[0]
    };
    rooms.push(room);
  }
  return rooms;
};

const RoomAllocated = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(5);
  const [rooms, setRooms] = useState(() => {
    const storedRooms = JSON.parse(localStorage.getItem("rooms"));
    return storedRooms || generateRandomRooms();
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomNumber: "",
    roomType: "",
    patientName: "",
    allocatedDate: "",
    dischargeDate: ""
  });
  const [editRoom, setEditRoom] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  const handleDelete = (id) => {
    const updatedRooms = rooms.filter((room) => room.id !== id);
    setRooms(updatedRooms);
    alert("Room deleted");
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const filteredRooms = rooms.filter((room) =>
    room.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.allocatedDate) - new Date(b.allocatedDate);
    } else {
      return new Date(b.allocatedDate) - new Date(a.allocatedDate);
    }
  });
  const currentRooms = sortedRooms.slice(
    indexOfFirstRoom,
    indexOfLastRoom
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
    setEditRoom(null);
    setNewRoom({
      photo: null,
      roomNumber: "",
      roomType: "",
      patientName: "",
      allocatedDate: "",
      dischargeDate: ""
    });
  };

  const addRoom = () => {
    if (editRoom) {
      const updatedRooms = rooms.map((room) =>
        room.id === editRoom.id ? newRoom : room
      );
      setRooms(updatedRooms);
      setEditRoom(null);
    } else {
      const updatedRooms = [...rooms, newRoom];
      setRooms(updatedRooms);
      alert("Room added!");
    }
    closeModal();
  };

  const handleEdit = (room) => {
    setEditRoom(room);
    setNewRoom(room);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewRoom({ ...newRoom, photo: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="rooms">
      <h2>Rooms Allocated</h2><br />
      <div className="add">
        <button onClick={openModal} className="addbutton">Add New Room</button>
        <button onClick={toggleSortOrder} className="oldest">Sort by Allocation Date ({sortOrder === "asc" ? "Oldest" : "Newest"} )</button>
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
            <h3>{editRoom ? "Edit Room" : "Add Room"}</h3>
            {newRoom.photo && <img src={newRoom.photo} alt="Room" style={{ maxWidth: "100px" }} />}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <input
              type="text"
              placeholder="Room Number"
              value={newRoom.roomNumber}
              onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
            />
            <input
              type="text"
              placeholder="Room Type"
              value={newRoom.roomType}
              onChange={(e) => setNewRoom({ ...newRoom, roomType: e.target.value })}
            />
            <input
              type="text"
              placeholder="Patient Name"
              value={newRoom.patientName}
              onChange={(e) => setNewRoom({ ...newRoom, patientName: e.target.value })}
            />
            <input
              type="date"
              placeholder="Allocated Date"
              value={newRoom.allocatedDate}
              onChange={(e) => setNewRoom({ ...newRoom, allocatedDate: e.target.value })}
            />
            <input
              type="date"
              placeholder="Discharge Date"
              value={newRoom.dischargeDate}
              onChange={(e) => setNewRoom({ ...newRoom, dischargeDate: e.target.value })}
            />
            <button onClick={addRoom}>{editRoom ? "Update" : "Add"}</button>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Patient Name</th>
            <th>Allocation Date</th>
            <th>Discharge Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRooms.map((room) => (
            <tr key={room.id}>
              <td><img src={room.photo} alt="Room" style={{ maxWidth: "50px" }} /></td>
              <td>{room.roomNumber}</td>
              <td>{room.roomType}</td>
              <td>{room.patientName}</td>
              <td>{room.allocatedDate}</td>
              <td>{room.dischargeDate}</td>
              <td>
                <button onClick={() => handleEdit(room)}>Edit</button>
                <button onClick={() => handleDelete(room.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredRooms.length > roomsPerPage && (
        <div className="pagination">
          <ul>
            {Array.from({ length: Math.ceil(filteredRooms.length / roomsPerPage) }).map((_, index) => (
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

export default RoomAllocated;
