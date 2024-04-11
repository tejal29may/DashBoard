import React from 'react'
import SideBar from '../Comonents/JsFiles/SideBar'
import RoomAllocated from '../Comonents/JsFiles/RoomAllocated'
function RoomAllocatedScreen() {
  return (
    <>
     <div className="main">
      <div className="mainLeft">
<SideBar/>
      </div>
      <div className="mainRight">
<RoomAllocated/>
      </div>
    </div>
    
    </>
  )
}

export default RoomAllocatedScreen