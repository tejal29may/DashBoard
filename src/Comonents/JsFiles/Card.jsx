import React from "react";
import "../CSSFiles/Card.css";
import { colors } from "@mui/material";
function Card(props) {
  return (
    <>
      <div className="card" style={{backgroundColor:props.bg } }>
        {/* <div className="left">
          <div className="circle">
           {props.chart}
          </div>
        </div> */}
        <div className="right">
          <h2 style={{color:"white"}}>{props.name}</h2>
          <h2 style={{textAlign:"left",color:"white"}}>{props.number}</h2>
          <h3 style={{color:"white"}}>{props.increase} Increase in 2... </h3>
        </div>
      </div>



    </>
  );
}

export default Card;
