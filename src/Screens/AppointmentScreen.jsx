import React from "react";
import NavBar from "../Comonents/JsFiles/NavBar";
import SideBar from "../Comonents/JsFiles/SideBar";
import "./AppointmentScreen.css";
import Appointments from "../Comonents/JsFiles/Appointmenet";

function AppointmentScreen() {
  return (
    <>
      <div className="main">
        <div className="mainLeft">
          <SideBar />
        </div>
        <div className="mainRight">
          <Appointments />
        </div>
      </div>
    </>
  );
}

export default AppointmentScreen;
