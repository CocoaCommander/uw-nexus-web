import { useSelector } from "react-redux";
import "./CustomTextArea.css";

const CustomTextArea = (props) => {

  let text = useSelector((state) => state[props.reducer]);
  const value = props.value;

  if (text) {
    text = text[props.name];
  }

  const handleChange = (e) => {
    props.onChange(e);
  }

  const getTextLength = () => {
    if (text) {
      return text.length;
    } else if (value) {
      return value.length;
    } else {
      return 0;
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
      <p className="word-count"> {getTextLength()}/500</p>
    </div>


  )
}

export default CustomTextArea;