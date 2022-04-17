import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CustomTextArea.css";

const CustomTextArea = (props) => {

  let text = useSelector((state) => state[props.reducer]);

  if (text) {
    text = text[props.name];
  }

  const handleChange = (e) => {
    props.onChange(e);
  }

  return (
    <textarea className={props.className} 
          type="text"
          name={props.name} 
          value={text ? text : props.value}
          placeholder={props.placeholder}
          onChange={props.onChange ? handleChange : () => {}}>
    </textarea>

  )
}

export default CustomTextArea;