import React, { useState, useEffect } from "react";

const generateRandomPayments = () => {
  const payments = [];
  for (let i = 1; i <= 20; i++) {
    const randomDate = new Date(
      Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    );
    const payment = {
      billNo: i,
      patient: `Patient ${i}`,
      doctor: `Doctor ${i}`,
      date: randomDate.toISOString().split("T")[0],
      charges: Math.floor(Math.random() * 1000),
      tax: Math.floor(Math.random() * 200),
      total: Math.floor(Math.random() * 2000) + 1000
    };
    payments.push(payment);
  }
  return payments;
};

const PaymentDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(5);
  const [payments, setPayments] = useState(() => {
    const storedPayments = JSON.parse(localStorage.getItem("payments"));
    return storedPayments || generateRandomPayments();
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newPayment, setNewPayment] = useState({
    patient: "",
    doctor: "",
    date: "",
    charges: "",
    tax: "",
    total: ""
  });
  const [editPayment, setEditPayment] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    localStorage.setItem("payments", JSON.stringify(payments));
  }, [payments]);

  const handleDelete = (billNo) => {
    const updatedPayments = payments.filter((payment) => payment.billNo !== billNo);
    setPayments(updatedPayments);
    alert("Payment deleted");
  };

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const filteredPayments = payments.filter((payment) =>
    payment.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedPayments = [...filteredPayments].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });
  const currentPayments = sortedPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
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
    setEditPayment(null);
    setNewPayment({
      patient: "",
      doctor: "",
      date: "",
      charges: "",
      tax: "",
      total: ""
    });
  };

  const addPayment = () => {
    if (editPayment) {
      const updatedPayments = payments.map((payment) =>
        payment.billNo === editPayment.billNo ? newPayment : payment
      );
      setPayments(updatedPayments);
      setEditPayment(null);
    } else {
      const updatedPayments = [...payments, newPayment];
      setPayments(updatedPayments);
      alert("Payment added!");
    }
    closeModal();
  };

  // const handleEdit = (payment) => {
  //   setEditPayment(payment);
  //   setNewPayment(payment);
  //   setShowModal(true);
  // };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="payments"><br />
      <h2>Hospital Payments</h2><br />
      <div className="add">
        <button onClick={openModal} className="addbutton">Add New Payment</button>
        <button onClick={toggleSortOrder} className="oldest">Sort by Date ({sortOrder === "asc" ? "Oldest" : "Newest"} )</button>
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
            <h3>{editPayment ? "Edit Payment" : "Add Payment"}</h3>
            <input
              type="text"
              placeholder="Patient Name"
              value={newPayment.patient}
              onChange={(e) => setNewPayment({ ...newPayment, patient: e.target.value })}
            />
            <input
              type="text"
              placeholder="Doctor"
              value={newPayment.doctor}
              onChange={(e) => setNewPayment({ ...newPayment, doctor: e.target.value })}
            />
            <input
              type="date"
              placeholder="Date"
              value={newPayment.date}
              onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
            />
            <input
              type="number"
              placeholder="Charges"
              value={newPayment.charges}
              onChange={(e) => setNewPayment({ ...newPayment, charges: e.target.value })}
            />
            <input
              type="number"
              placeholder="Tax"
              value={newPayment.tax}
              onChange={(e) => setNewPayment({ ...newPayment, tax: e.target.value })}
            />
            <input
              type="number"
              placeholder="Total"
              value={newPayment.total}
              onChange={(e) => setNewPayment({ ...newPayment, total: e.target.value })}
            />
            <button onClick={addPayment}>{editPayment ? "Update" : "Add"}</button>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Charges</th>
            <th>Tax</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPayments.map((payment) => (
            <tr key={payment.billNo}>
              <td>{payment.patient}</td>
              <td>{payment.doctor}</td>
              <td>{payment.date}</td>
              <td>{payment.charges}</td>
              <td>{payment.tax}</td>
              <td>{payment.total}</td>
              <td>
                {/* <button onClick={() => handleEdit(payment)}>Edit</button> */}
                <button onClick={() => handleDelete(payment.billNo)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredPayments.length > paymentsPerPage && (
        <div className="pagination">
          <ul>
            {Array.from({ length: Math.ceil(filteredPayments.length / paymentsPerPage) }).map((_, index) => (
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

export default PaymentDetail;
