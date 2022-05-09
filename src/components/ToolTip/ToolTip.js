import { useState, useEffect } from "react";
import "./ToolTip.css";



const ToolTip = (props) => {
  console.log("props = " + props.display);
  if (props.display) {
    return (
      <div>
        <p> ToolTip </p>
      </div>
      )
  }
  else {
    return <p>oops!</p>
  }

}

export default ToolTip;