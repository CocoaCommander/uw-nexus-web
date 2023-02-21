import { useSelector } from "react-redux";
import Select from "react-select";
import "./InfoForm.css";




const InfoForm = (props) => {

  console.log(`infoform prop = ${props.err}`)

  const handleChange = (e) => {
    props.onChange(e);
  }

  const fullName = useSelector((state) => state.signUp.fullName);
  // const email = useSelector((state) => state.signUp.email);
  // const password = useSelector((state) => state.signUp.password);
  const year = useSelector((state) => state.signUp.year);
  const major = useSelector((state) => state.signUp.major);
  const majorsList = useSelector((state) => state.serverContent.majorsList);
  const errorMsg = useSelector((state) => state.signUp.errorMsg);
  const campus = useSelector((state) => state.signUp.campus);

  const selectOptions = () => {
    return majorsList.map(major => {
      return {value: major, label: major}
    })
  }

  const selectBarStyling = {
    control: (provided) => ({
      ...provided,
      border: "solid 1.5px #c4c4c4",
      borderRadius: "5px",
      height: "50px",
    }),

    input: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),

    menuList: (provided) => ({
      ...provided,
      height: 130,
      fontSize: "12px"
    }),

    placeholder: (provided) => ({
      ...provided,
      fontSize: "12px"
    }),


    singleValue: (provided) => ({
      ...provided,
      fontSize: "12px",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      backgroundImage: "",
      color: "black",
      padding: "0px",
      display: "flex",
      justifyContent: "flex-end",
      width: "17px",
      height: "20px",
      marginLeft: "10px",
      paddingRight: "2px"
    })
  }

  return(
    <>
      <p className="error-msg-signup">{errorMsg}</p>
      <form>
        <div className="field-set">
          <label>Full Name<span className="asterix-signup">*</span></label>
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
                  value={year}
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
          <Select className="react-select-bar"
            name="major"
            placeholder="E.g. Bioengineering"
            value={selectOptions().find(item => item.value == major)}
            onChange={handleChange}
            options={selectOptions()}
            styles={selectBarStyling}
            >

          </Select>
        </div>

        <div className="field-set">
          <label>University of Washington Campus <span className="asterix-signup">*</span></label>
          <select className="sign-up-detail"
                  name="campus"
                  id="select-campus"
                  onChange={handleChange}
                  value={campus}
                  >
            <option value="" disabled selected>E.g. Seattle, Tacoma, Bothell</option>
            <option value="Seattle">Seattle</option>
            <option value="Tacoma">Tacoma</option>
            <option value="Bothell">Bothell</option>
          </select>
        </div>
      </form>
    </>
  )
}

export default InfoForm;