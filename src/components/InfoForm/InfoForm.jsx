import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./InfoForm.css";




const InfoForm = (props) => {

  const handleChange = (e) => {
    props.onChange(e);
  }

  const fullName = useSelector((state) => state.signUp.fullName);
  const year = useSelector((state) => state.signUp.year);
  const major = useSelector((state) => state.signUp.major);
  const campus = useSelector((state) => state.signUp.campus);

  // TODO: fix value/onChange for all input fields
  return(
    <form>
      <div className="field-set">
        <label>Full Name</label>
        <input className="sign-up-detail" 
              type="text"
              name="fullName" 
              placeholder=" E.g. John Doe"
              value={fullName}
              onChange={handleChange}>
              
        </input>
      </div>

      <div className="field-set">
        <label>Year</label>
        <input className="sign-up-detail" 
              type="text"
              name="year" 
              placeholder=" E.g. Sophomore"
              value={year}
              onChange={handleChange}>
        </input>
      </div>

      <div className="field-set">
        <label>Major / Intended Major</label>
        <input className="sign-up-detail" 
              type="text"
              name="major" 
              placeholder=" E.g. Bioengineering"
              value={major}
              onChange={handleChange}>
        </input>
      </div>

      <div className="field-set">
        <label>University of Washington Campus</label>
        <input className="sign-up-detail" 
              type="text"
              name="campus" 
              placeholder=" E.g. Seattle, Tacoma, Bothell"
              value={campus}
              onChange={handleChange}>
        </input>
      </div>
    </form>
  )
}

export default InfoForm;