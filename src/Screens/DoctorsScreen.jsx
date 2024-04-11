import React from 'react'
import SideBar from '../Comonents/JsFiles/SideBar'
import Doctors from '../Comonents/JsFiles/Doctors'
function DoctorsScreen() {
  return (
    <>
     <div className="main">
      <div className="mainLeft">
<SideBar/>
      </div>
      <div className="mainRight">
<Doctors/>
      </div>
    </div>
    
    </>
  )
}

export default DoctorsScreen