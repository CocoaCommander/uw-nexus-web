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

  const returnCharacters = () => {
    if (text) {
      return text.replace(/\s+/g, '').length;
    } else {
      return 0
    }
    
  }

  return (
    <div className="textarea-wrapper">
      <textarea className={props.className} 
            type="text"
            name={props.name} 
            value={text ? text : props.value}
            placeholder={props.placeholder}
            onChange={props.onChange ? handleChange : () => {}}
            maxLength={500}>
      </textarea>
      <p className="word-count"> {returnCharacters()}/500</p>
    </div>


  )
}

export default CustomTextArea;