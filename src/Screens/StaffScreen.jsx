import React from 'react'
import SideBar from '../Comonents/JsFiles/SideBar'
import SatffDetails from '../Comonents/JsFiles/Satff' 
function StaffScreen() {
  return (
    <>
     <div className="main">
      <div className="mainLeft">
<SideBar/>
      </div>
      <div className="mainRight">
<SatffDetails/>
      </div>
    </div>
    
    </>
  )
}

export default StaffScreen