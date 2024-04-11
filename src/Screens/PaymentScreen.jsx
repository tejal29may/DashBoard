import React from "react";
import SideBar from "../Comonents/JsFiles/SideBar";
import PaymentDetail from "../Comonents/JsFiles/PaymentDetails";
function PaymentScreen() {
  return (
    <>
      <div className="main">
        <div className="mainLeft">
          <SideBar />
        </div>
        <div className="mainRight">
          <PaymentDetail />
        </div>
      </div>
    </>
  );
}

export default PaymentScreen;
