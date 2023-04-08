import "./ToolTip.css";



const ToolTip = (props) => {
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