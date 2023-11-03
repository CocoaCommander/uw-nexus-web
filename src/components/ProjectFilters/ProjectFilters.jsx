import React, { useState, useEffect } from 'react';
import './ProjectFilters.css'
import {ReactComponent as TimeIcon} from '../../assets/icons/time-icon.svg';
import {ReactComponent as LocationIcon} from '../../assets/icons/location-icon.svg';
import {ReactComponent as PersonIcon} from '../../assets/icons/person-icon.svg';



const ProjectFilters = ({ setFilters, filters }) => {
  const [sizeFilters, setSizeFilters] = useState({
    Micro: false,
    Small: false,
    Medium: false,
    Large: false,
  });

  const [durationFilters, setDurationFilters] = useState({
    '1-3 months': false,
    '3-6 months': false,
    '6-9 months': false,
    'more than 9 months': false,
  });

  const [locationFilter, setLocationFilter] = useState("");

//   useEffect(() => {
//     const newFilters = {
//       size: Object.keys(sizeFilters).filter((key) => sizeFilters[key]),
//       duration: Object.keys(durationFilters).filter((key) => durationFilters[key]),
//       location: locationFilter,
//     };
//     setFilters(newFilters);
//   }, [sizeFilters, durationFilters, locationFilter, setFilters]);

  
  const toggleFilter = (type, value) => {
    if (type === "size") {
      setSizeFilters((prevFilters) => ({
        ...prevFilters,
        [value]: !prevFilters[value],
      }));
    } else if (type === "duration") {
      setDurationFilters((prevFilters) => ({
        ...prevFilters,
        [value]: !prevFilters[value],
      }));
    } else if (type === "location") {
      setLocationFilter(value);
    }
  };

  const clearFilters = () => {
    setSizeFilters({
      micro: false,
      small: false,
      medium: false,
      large: false,
    });
    setDurationFilters({
      '3 months': false,
      '6 months': false,
      '9 months': false,
      'more than 9 months': false,
    });
    setLocationFilter("");
  };

  const applyFilters = () => {
    const newFilters = {
        size: Object.keys(sizeFilters).filter((key) => sizeFilters[key]),
        duration: Object.keys(durationFilters).filter((key) => durationFilters[key]),
        location: locationFilter,
    };
    setFilters(newFilters);
  };

  return (
    <div className="project-filters-container">
      <div className="filter-column">
        <div className="filter-type">
            <PersonIcon/> 
            <span className="filter-name">Size</span>
        </div>
        {Object.keys(sizeFilters).map((size) => (
          <div key={size}>
            <input
              type="checkbox"
              id={size}
              name={size}
              checked={sizeFilters[size]}
              onChange={(e) => toggleFilter("size", e.target.name)}
            />
            <label htmlFor={size}>{size}</label>
          </div>
        ))}
      </div>
      <div className="filter-column">
        <div className="filter-type">
            <TimeIcon/> 
            <span className="filter-name">Duration</span>
        </div>
        {Object.keys(durationFilters).map((duration) => (
          <div key={duration}>
            <input
              type="checkbox"
              id={duration}
              name={duration}
              checked={durationFilters[duration]}
              onChange={(e) => toggleFilter("duration", e.target.name)}
            />
            <label htmlFor={duration}>{duration}</label>
          </div>
        ))}
      </div>
      <div className="filter-column">
        <div className="filter-type">
            <LocationIcon/> 
            <span className="filter-name">Location</span>
        </div>
        <input
          type="text"
          className="location-filter"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        <div className="filter-buttons-container">
          <button onClick={clearFilters} className="clear-filters-button">
            Clear All
          </button>
          <button onClick={applyFilters} className="apply-filters-button">
            Apply 
          </button>
        </div>
      </div>
    </div>
  );
}

  

export default ProjectFilters;
