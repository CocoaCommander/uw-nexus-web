import { useSelector } from "react-redux";
import "./InfoForm.css";




const InfoForm = (props) => {

  const handleChange = (e) => {
    props.onChange(e);
  }

  const fullName = useSelector((state) => state.signUp.fullName);
  // const email = useSelector((state) => state.signUp.email);
  // const password = useSelector((state) => state.signUp.password);
  // const year = useSelector((state) => state.signUp.year);
  const major = useSelector((state) => state.signUp.major);
  // const campus = useSelector((state) => state.signUp.campus);

  return(
    <form>

      <div className="field-set">
        <label>Full Name <span className="asterix-signup">*</span></label>
        <input className="sign-up-detail" 
              type="text"
              name="fullName" 
              placeholder=" E.g. John Doe"
              value={fullName}
              onChange={handleChange}>
              
        </input>
      </div>

      <div className="field-set">
        <label>Year <span className="asterix-signup">*</span></label>
        <select className="sign-up-detail"
                name="year"
                id="select-year"
                onChange={handleChange}
                >
          <option value="" disabled selected>E.g. Sophomore</option>
          <option value="Freshman">Freshman</option>
          <option value="Sophomore">Sophomore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <div className="field-set">
        <label>Major / Intended Major <span className="asterix-signup">*</span></label>
        <input className="sign-up-detail" 
              type="text"
              name="major" 
              placeholder=" E.g. Bioengineering"
              value={major}
              onChange={handleChange}>
        </input>
      </div>

      <div className="field-set">
        <label>University of Washington Campus <span className="asterix-signup">*</span></label>
        <select className="sign-up-detail"
                name="campus"
                id="select-campus"
                onChange={handleChange}
                >
          <option value="" disabled selected>E.g. Seattle, Tacoma, Bothell</option>
          <option value="Seattle">Seattle</option>
          <option value="Tacoma">Tacoma</option>
          <option value="Bothell">Bothell</option>
        </select>
      </div>
    </form>
  )
}

export default InfoForm;