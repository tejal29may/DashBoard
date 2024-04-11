


// // import React, { useState, useEffect } from "react";
// // import "../CSSFiles/Appointments.css";

// // const generateRandomAppointments = () => {
// //   const appointments = [];
// //   for (let i = 1; i <= 20; i++) {
// //     const randomDate = new Date(
// //       Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
// //     );
// //     const appointment = {
// //       id: i,
// //       img: "https://via.placeholder.com/50",
// //       name: `User ${i}`,
// //       email: `user${i}@example.com`,
// //       date: randomDate.toISOString().split("T")[0],
// //       time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(
// //         Math.random() * 60
// //       )
// //         .toString()
// //         .padStart(2, "0")} ${Math.random() < 0.5 ? "AM" : "PM"}`,
// //       doctor: `Dr. ${["Smith", "Johnson", "Brown", "Lee"][
// //         Math.floor(Math.random() * 4)
// //       ]}`,
// //       condition: ["Fever", "Cold", "Cough", "Headache", "Stomachache"][
// //         Math.floor(Math.random() * 5)
// //       ],
// //     };
// //     appointments.push(appointment);
// //   }
// //   return appointments;
// // };

// // const Appointments = () => {
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [appointmentsPerPage] = useState(5);
// //   const [appointments, setAppointments] = useState(() => {
// //     const storedAppointments = JSON.parse(localStorage.getItem("appointments"));
// //     return storedAppointments || generateRandomAppointments();
// //   });
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [showModal, setShowModal] = useState(false);
// //   const [newAppointment, setNewAppointment] = useState({
// //     name: "",
// //     email: "",
// //     date: "",
// //     time: "",
// //     doctor: "",
// //     condition: ""
// //   });

// //   useEffect(() => {
// //     localStorage.setItem("appointments", JSON.stringify(appointments));
// //   }, [appointments]);

// //   const handleDelete = (id) => {
// //     const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
// //     setAppointments(updatedAppointments);
// //     alert("user deleted")
// //   };

// //   const indexOfLastAppointment = currentPage * appointmentsPerPage;
// //   const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
// //   const filteredAppointments = appointments.filter((appointment) =>
// //     appointment.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );
// //   const currentAppointments = filteredAppointments.slice(
// //     indexOfFirstAppointment,
// //     indexOfLastAppointment
// //   );

// //   const paginate = (pageNumber) => setCurrentPage(pageNumber);

// //   const handleSearch = (e) => {
// //     setSearchTerm(e.target.value);
// //     setCurrentPage(1);
// //   };

// //   const openModal = () => {
// //     setShowModal(true);
// //   };

// //   const closeModal = () => {
// //     setShowModal(false);
// //   };

// //   const addAppointment = () => {
// //     const updatedAppointments = [...appointments, newAppointment];
// //     setAppointments(updatedAppointments);
// //     setNewAppointment({
// //       name: "",
// //       email: "",
// //       date: "",
// //       time: "",
// //       doctor: "",
// //       condition: ""
// //     });
// //     closeModal();
// //   };

// //   return (
// //     <div className="appointment">
// //       <h2>Appointments</h2><br />
// //       <div className="add">
// //         <button onClick={openModal}>Add New</button>
// //         <input
// //           type="text"
// //           placeholder="Search by name"
// //           value={searchTerm}
// //           onChange={handleSearch}
// //         />
// //       </div>
// //       {showModal && (
// //         <div className="modal">
// //           <div className="modal-content">
// //             <span className="close" onClick={closeModal}>
// //               &times;
// //             </span>
// //             <h3>Add New Appointment</h3>
// //             <input
// //               type="text"
// //               placeholder="Name"
// //               value={newAppointment.name}
// //               onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })}
// //             />
// //             <input
// //               type="email"
// //               placeholder="Email"
// //               value={newAppointment.email}
// //               onChange={(e) => setNewAppointment({ ...newAppointment, email: e.target.value })}
// //             />
// //             <input
// //               type="date"
// //               value={newAppointment.date}
// //               onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
// //             />
// //             <input
// //               type="time"
// //               value={newAppointment.time}
// //               onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
// //             />
// //             <input
// //               type="text"
// //               placeholder="Doctor"
// //               value={newAppointment.doctor}
// //               onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
// //             />
// //             <input
// //               type="text"
// //               placeholder="Condition"
// //               value={newAppointment.condition}
// //               onChange={(e) => setNewAppointment({ ...newAppointment, condition: e.target.value })}
// //             />
// //             <button onClick={addAppointment}>Add</button>
// //           </div>
// //         </div>
// //       )}
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Image</th>
// //             <th>Name</th>
// //             <th>Email</th>
// //             <th>Date</th>
// //             <th>Time</th>
// //             <th>Doctor</th>
// //             <th>Condition</th>
// //             <th>Action</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {currentAppointments.map((appointment) => (
// //             <tr key={appointment.id}>
// //               <td>
// //                 <img src="https://th.bing.com/th/id/OIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ?rs=1&pid=ImgDetMain" alt="User" />
// //               </td>
// //               <td>{appointment.name}</td>
// //               <td>{appointment.email}</td>
// //               <td>{appointment.date}</td>
// //               <td>{appointment.time}</td>
// //               <td>{appointment.doctor}</td>
// //               <td>{appointment.condition}</td>
// //               <td>
// //                 <button>Edit</button>
// //                 <button onClick={() => handleDelete(appointment.id)}>Delete</button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //       <div>
// //         {filteredAppointments.length > appointmentsPerPage && (
// //           <ul className="pagination">
// //             {Array.from(
// //               { length: Math.ceil(filteredAppointments.length / appointmentsPerPage) },
// //               (_, i) => (
// //                 <li key={i} onClick={() => paginate(i + 1)}>
// //                   {i + 1}
// //                 </li>
// //               )
// //             )}
// //           </ul>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Appointments;



// import React, { useState, useEffect } from "react";
// import "../CSSFiles/Appointments.css";

// const generateRandomAppointments = () => {
//   const appointments = [];
//   for (let i = 1; i <= 20; i++) {
//     const randomDate = new Date(
//       Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
//     );
//     const appointment = {
//       id: i,
//       img: "https://via.placeholder.com/50",
//       name: `User ${i}`,
//       email: `user${i}@example.com`,
//       date: randomDate.toISOString().split("T")[0],
//       time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(
//         Math.random() * 60
//       )
//         .toString()
//         .padStart(2, "0")} ${Math.random() < 0.5 ? "AM" : "PM"}`,
//       doctor: `Dr. ${["Smith", "Johnson", "Brown", "Lee"][
//         Math.floor(Math.random() * 4)
//       ]}`,
//       condition: ["Fever", "Cold", "Cough", "Headache", "Stomachache"][
//         Math.floor(Math.random() * 5)
//       ],
//     };
//     appointments.push(appointment);
//   }
//   return appointments;
// };

// const Appointments = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [appointmentsPerPage] = useState(5);
//   const [appointments, setAppointments] = useState(() => {
//     const storedAppointments = JSON.parse(localStorage.getItem("appointments"));
//     return storedAppointments || generateRandomAppointments();
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [newAppointment, setNewAppointment] = useState({
//     name: "",
//     email: "",
//     date: "",
//     time: "",
//     doctor: "",
//     condition: ""
//   });
//   const [editAppointment, setEditAppointment] = useState(null);

//   useEffect(() => {
//     localStorage.setItem("appointments", JSON.stringify(appointments));
//   }, [appointments]);

//   const handleDelete = (id) => {
//     const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
//     setAppointments(updatedAppointments);
//     alert("User deleted");
//   };

//   const indexOfLastAppointment = currentPage * appointmentsPerPage;
//   const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
//   const filteredAppointments = appointments.filter((appointment) =>
//     appointment.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const currentAppointments = filteredAppointments.slice(
//     indexOfFirstAppointment,
//     indexOfLastAppointment
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditAppointment(null);
//     setNewAppointment({
//       name: "",
//       email: "",
//       date: "",
//       time: "",
//       doctor: "",
//       condition: ""
//     });
//   };

//   const addAppointment = () => {
//     if (editAppointment) {
//       const updatedAppointments = appointments.map((appointment) =>
//         appointment.id === editAppointment.id ? newAppointment : appointment
//       );
//       setAppointments(updatedAppointments);
//       setEditAppointment(null);
//     } else {
//       const updatedAppointments = [...appointments, newAppointment];
//       setAppointments(updatedAppointments);
//       alert("apppoinment added!")
//     }
//     closeModal();
//   };

//   const handleEdit = (appointment) => {
//     setEditAppointment(appointment);
//     setNewAppointment(appointment);
//     setShowModal(true);
//   };

//   return (
//     <div className="appointment">
//       <h2>Appointments</h2><br />
//       <div className="add">
//         <button onClick={openModal} className="addbutton">Add New</button>
//         <button onClick={openModal} className="addbutton">Sort By Date</button>
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//       </div>
//       {showModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={closeModal}>
//               &times;
//             </span>
//             <h3>{editAppointment ? "Edit Appointment" : "Add New Appointment"}</h3>
//             <input
//               type="text"
//               placeholder="Name"
//               value={newAppointment.name}
//               onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })}
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={newAppointment.email}
//               onChange={(e) => setNewAppointment({ ...newAppointment, email: e.target.value })}
//             />
//             <input
//               type="date"
//               value={newAppointment.date}
//               onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
//             />
//             <input
//               type="time"
//               value={newAppointment.time}
//               onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Doctor"
//               value={newAppointment.doctor}
//               onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Condition"
//               value={newAppointment.condition}
//               onChange={(e) => setNewAppointment({ ...newAppointment, condition: e.target.value })}
//             />
//             <button onClick={addAppointment}>{editAppointment ? "Update" : "Add"}</button>
//           </div>
//         </div>
//       )}
//       <table>
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Doctor</th>
//             <th>Condition</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentAppointments.map((appointment) => (
//             <tr key={appointment.id}>
//               <td>
//                 <img src="https://th.bing.com/th/id/OIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ?rs=1&pid=ImgDetMain" alt="User" />
//               </td>
//               <td>{appointment.name}</td>
//               <td>{appointment.email}</td>
//               <td>{appointment.date}</td>
//               <td>{appointment.time}</td>
//               <td>{appointment.doctor}</td>
//               <td>{appointment.condition}</td>
//               <td>
//                 <button onClick={() => handleEdit(appointment)}>Edit</button>
//                 <button onClick={() => handleDelete(appointment.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div>
//         {filteredAppointments.length > appointmentsPerPage && (
//           <ul className="pagination">
//             {Array.from(
//               { length: Math.ceil(filteredAppointments.length / appointmentsPerPage) },
//               (_, i) => (
//                 <li key={i} onClick={() => paginate(i + 1)}>
//                   {i + 1}
//                 </li>
//               )
//             )}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Appointments;



import React, { useState, useEffect } from "react";
import "../CSSFiles/Appointments.css";

const generateRandomAppointments = () => {
  const appointments = [];
  for (let i = 1; i <= 20; i++) {
    const randomDate = new Date(
      Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    );
    const appointment = {
      id: i,
      img: "https://via.placeholder.com/50",
      name: `User ${i}`,
      email: `user${i}@example.com`,
      date: randomDate.toISOString().split("T")[0],
      time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(
        Math.random() * 60
      )
        .toString()
        .padStart(2, "0")} ${Math.random() < 0.5 ? "AM" : "PM"}`,
      doctor: `Dr. ${["Smith", "Johnson", "Brown", "Lee"][
        Math.floor(Math.random() * 4)
      ]}`,
      condition: ["Fever", "Cold", "Cough", "Headache", "Stomachache"][
        Math.floor(Math.random() * 5)
      ],
    };
    appointments.push(appointment);
  }
  return appointments;
};

const Appointments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(5);
  const [appointments, setAppointments] = useState(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments"));
    return storedAppointments || generateRandomAppointments();
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    doctor: "",
    condition: ""
  });
  const [editAppointment, setEditAppointment] = useState(null);
  const [sortByDate, setSortByDate] = useState(false); // State variable to track sorting by date

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const handleDelete = (id) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
    setAppointments(updatedAppointments);
    alert("User deleted");
  };

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  let filteredAppointments = appointments.filter((appointment) =>
    appointment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (sortByDate) {
    // Sort by date if sortByDate is true
    filteredAppointments = [...filteredAppointments].sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
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
    setEditAppointment(null);
    setNewAppointment({
      name: "",
      email: "",
      date: "",
      time: "",
      doctor: "",
      condition: ""
    });
  };

  const addAppointment = () => {
    if (editAppointment) {
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === editAppointment.id ? newAppointment : appointment
      );
      setAppointments(updatedAppointments);
      setEditAppointment(null);
    } else {
      const updatedAppointments = [...appointments, newAppointment];
      setAppointments(updatedAppointments);
      alert("Appointment added!");
    }
    closeModal();
  };

  const handleEdit = (appointment) => {
    setEditAppointment(appointment);
    setNewAppointment(appointment);
    setShowModal(true);
  };

  const handleSortByDate = () => {
    setSortByDate(!sortByDate); // Toggle sorting by date
  };

  return (
    <div className="appointment">
      <h2>Appointments</h2>
      <div className="add">
        <button onClick={openModal} className="addbutton">Add New</button>
        <button onClick={handleSortByDate} className="addbutton">Sort By Date</button>
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
            <h3>{editAppointment ? "Edit Appointment" : "Add New Appointment"}</h3>
            <input
              type="text"
              placeholder="Name"
              value={newAppointment.name}
              onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={newAppointment.email}
              onChange={(e) => setNewAppointment({ ...newAppointment, email: e.target.value })}
            />
            <input
              type="date"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
            />
            <input
              type="time"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
            />
            <input
              type="text"
              placeholder="Doctor"
              value={newAppointment.doctor}
              onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
            />
            <input
              type="text"
              placeholder="Condition"
              value={newAppointment.condition}
              onChange={(e) => setNewAppointment({ ...newAppointment, condition: e.target.value })}
            />
            <button onClick={addAppointment}>{editAppointment ? "Update" : "Add"}</button>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor</th>
            <th>Condition</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>
                <img src="https://th.bing.com/th/id/OIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ?rs=1&pid=ImgDetMain" alt="User" />
              </td>
              <td>{appointment.name}</td>
              <td>{appointment.email}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.doctor}</td>
              <td>{appointment.condition}</td>
              <td>
                <button onClick={() => handleEdit(appointment)}>Edit</button>
                <button onClick={() => handleDelete(appointment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {filteredAppointments.length > appointmentsPerPage && (
          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(filteredAppointments.length / appointmentsPerPage) },
              (_, i) => (
                <li key={i} onClick={() => paginate(i + 1)}>
                  {i + 1}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Appointments;
