import React, { useState, useEffect } from 'react';
import './ProjectFilters.css'


function ProjectFilters({ setFilters, filters }) {
  const [sizeFilters, setSizeFilters] = useState({
    micro: false,
    small: false,
    medium: false,
    large: false,
  });

  const [durationFilters, setDurationFilters] = useState({
    '3 months': false,
    '6 months': false,
    '9 months': false,
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
        <div className="filter-type">Size</div>
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
        <div className="filter-type">Duration</div>
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
        <div className="filter-type">Location</div>
        <input
          type="text"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        <div className="filter-buttons-container">
          <button onClick={clearFilters} className="clear-filters-button">
            Clear All
          </button>
          <button onClick={applyFilters} className="apply-filters-button">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

  

export default ProjectFilters;
