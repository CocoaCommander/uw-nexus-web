import { useSelector } from "react-redux";
import "./CustomTextArea.css";

const CustomTextArea = (props) => {

  let text = useSelector((state) => state[props.reducer]);
  const value = props.value;
  console.log(props);

  if (text) {
    text = text[props.name];
  }

  const handleChange = (e) => {
    props.onChange(e);
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
      <p className="word-count"> {value ? value.length : 0}/500</p>
    </div>


  )
}

export default CustomTextArea;