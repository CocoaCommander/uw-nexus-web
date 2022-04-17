import { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import "./CustomDropdown.css";

const CustomDropdown = (props) => {

  // const selected = useSelector((state) => state[props.reducer][props.name]);

  const handleChange = (e) => {
    props.onChange(e);
  }

  const renderOptions = () => {
    const options = props.options.map((option) => <option key={option} value={option}>{option}</option>)
    options.unshift(<option value="" disabled selected>{props.placeholder}</option>)
    return options;
  }

  return (
    <select className="dropdown"
    name={props.name}
    id={props.id}
    onChange={handleChange}
    >
      {renderOptions()}
    </select>

  )
}

export default CustomDropdown;