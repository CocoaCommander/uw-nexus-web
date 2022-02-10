import { useEffect, useRef, useState } from "react";
import "./InfoForm.css";


const InfoForm = (props) => {

  const handleChange = (e) => {
    props.onChange(e);
  }

  // TODO: fix value/onChange for all input fields
  return(
    <form>
      <div className="field-set">
        <label>Full Name</label>
        <input className="sign-up-detail" 
              type="text"
              name="first-name" 
              placeholder=" E.g. John Doe"
              value={props.test123}
              onChange={handleChange}>
        </input>
      </div>

      <div className="field-set">
        <label>Year</label>
        <input className="sign-up-detail" 
              type="text"
              name="year" 
              placeholder=" E.g. Sophomore"
              onChange={handleChange}>
        </input>
      </div>

      <div className="field-set">
        <label>Major / Intended Major</label>
        <input className="sign-up-detail" 
              type="text"
              name="major" 
              placeholder=" E.g. Bioengineering"
              onChange={handleChange}>
        </input>
      </div>

      <div className="field-set">
        <label>University of Washington Campus</label>
        <input className="sign-up-detail" 
              type="text"
              name="campus" 
              placeholder=" E.g. Seattle, Tacoma, Bothell"
              onChange={handleChange}>
        </input>
      </div>
    </form>
  )
}

export default InfoForm;