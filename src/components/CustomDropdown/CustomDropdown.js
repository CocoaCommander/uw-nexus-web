import { useSelector } from "react-redux";
import "./CustomDropdown.css";

const CustomDropdown = (props) => {

  const selected = useSelector((state) => state[props.reducer][props.name]);

  const handleChange = (e) => {
    props.onChange(e);
  }

  const renderOptions = () => {
    let options = [];
    for (let i = 0; i < props.options.length; i++) {
      options.push(<option key={props.options[i]} value={props.values[i]}>{props.options[i]}</option>)
    }
    options.unshift(<option value="" disabled selected>{props.placeholder}</option>)
    console.log(options);
    return options;
  }

  return (
    <select className="dropdown"
    name={props.name}
    id={props.id}
    onChange={handleChange}
    value={selected ? selected : renderOptions[0]}
    >
      {renderOptions()}
    </select>

  )
}

export default CustomDropdown;