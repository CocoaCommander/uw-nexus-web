import { useSelector } from "react-redux";
import "./SelectionsGrid.css";

const SelectionsGrid = (props) => {

  const selectedOptions = useSelector((state) => state.signUp[props.selectionType]);
  const list = useSelector((state) => state.serverContent[props.selectionType + "List"]);

  const handleOnClick = (e) => {
    props.onClick(e, selectedOptions);
  }

  const generateGrid = () => {
    let grid = [];

    if (list) {

      let selections = list.map((selection) => 
      <div key={selection} name={selection} className={selectedOptions.includes(selection) ? "selected" : "selection"} onClick={handleOnClick}>
        <p className="selection-text">{selection}</p>
        <span class={selectedOptions.includes(selection) ? "_2JvrO" : "_2JvrO-hidden"}>
          <svg width="1.5rem" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 3.5L4.5 7.5L12 1" stroke="white" stroke-width="1.5">
            </path>
          </svg>
          </span>
      </div>)

      for (let i = 0; i < selections.length; i+=2) {
        grid.push(<div key={i} className="row">
                    {selections[i]}
                    {selections[i+1]}
                  </div>)
      }

      return grid;

    }
    

  }

  return(
    <div className="grid">
      {generateGrid()}
    </div>
  )
}

export default SelectionsGrid;