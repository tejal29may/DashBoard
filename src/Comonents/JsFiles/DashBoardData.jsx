import React, { PureComponent } from 'react'
import Card from './Card'
import "../CSSFiles/DashBoardData.css"
import Charts from './Charts'
import { Height } from '@mui/icons-material'
import BarCharts from './BarCharts'
import SmallPieCharts from '../Chartsss/SmallPieCharts'
function DashBoardData() {

  
  return (
    <>
    <div className="dashboardData">
        <h2>Dashboard</h2>
        <div className="cards">
        <Card name="New Patients" number="125" increase="45%" chart={<SmallPieCharts/>} bg="green"/>
        <Card name="OPD Patients" number="218" increase="40%" bg="blue"/>
        <Card name="Todays Oprations" number="25" increase="85%" bg="red"/>
        <Card name="Visitors" number="1560" increase="50%" bg="navy"/>
        </div>
      

      <div className="charts" style={{display:"flex"}}>
        <div className="left" >
<Charts/>
        </div>
        <div className="right" >
       <BarCharts/>
        </div>
      </div>
      <br /><br />
    </div>
    </>
  )
}

export default DashBoardData