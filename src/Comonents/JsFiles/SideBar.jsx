

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faCalendarAlt,
  faUserMd,
  faUsers,
  faUser,
  faCalendarPlus,
  faBed,
  faMoneyBill,
  faChartLine
} from "@fortawesome/free-solid-svg-icons";
import "../CSSFiles/SideBar.css"; // Import your CSS file
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <FontAwesomeIcon icon={faChartBar} />
         <NavLink to="/dashboard"  className="Navlink"> <span>Dashboard</span></NavLink>
        </li>
        <li>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <NavLink to="/calenderScreen"  className="Navlink">  <span>Calendar</span></NavLink>
         
        </li>
        <li>
          <FontAwesomeIcon icon={faUser} />
          <NavLink to="/patientScreen"  className="Navlink">  <span>Patients</span></NavLink>
         
        </li>
        <li>
          <FontAwesomeIcon icon={faCalendarPlus} />
         <NavLink to="/appointmentScreen" className="Navlink"><span>Appointments</span></NavLink> 
        </li>
        <li>
          <FontAwesomeIcon icon={faBed} />
          <NavLink to="/roomAllocatedScreen"  className="Navlink">  <span>Room Allocated</span></NavLink>
         
        </li>
        <li>
          <FontAwesomeIcon icon={faMoneyBill} />
          <NavLink to="/paymentScreen"  className="Navlink"><span>Payment</span></NavLink>
          
        </li>
        <li>
          <FontAwesomeIcon icon={faChartLine} />
          <NavLink to="/chartsScreen"  className="Navlink">  <span>Charts</span></NavLink>
         
        </li>
        <li>
          <FontAwesomeIcon icon={faUserMd} />
          <NavLink to="/doctorsScreen"  className="Navlink">  <span>Doctors</span></NavLink>
         
        </li>
        <li>
          <FontAwesomeIcon icon={faUsers} />
          <NavLink to="/staffScreen"  className="Navlink"> <span>Staff</span></NavLink>
         
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
