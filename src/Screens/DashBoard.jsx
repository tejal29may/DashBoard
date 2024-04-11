import React from 'react'
import NavBar from '../Comonents/JsFiles/NavBar'
import SideBar from '../Comonents/JsFiles/SideBar'
import DashBoardData from '../Comonents/JsFiles/DashBoardData'
import Charts from '../Comonents/JsFiles/Charts'
function DashBoard() {
  return (
    <>
    
    <div className="main">
      <div className="mainLeft">
<SideBar/>
      </div>
      <div className="mainRight">
<DashBoardData/>

      </div>
    </div>
    </>
  )
}

export default DashBoard