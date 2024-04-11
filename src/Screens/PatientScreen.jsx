import React from 'react'
import SideBar from '../Comonents/JsFiles/SideBar'
import PatientsData from '../Comonents/JsFiles/PatientsData'

function PatientScreen() {
  return (
    <>
    <div className="main">
     <div className="mainLeft">
<SideBar/>
     </div>
     <div className="mainRight">
<PatientsData/>
     </div>
   </div>
   
   </>
  )
}

export default PatientScreen