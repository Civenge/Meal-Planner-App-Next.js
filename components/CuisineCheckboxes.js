// CuisineCheckboxes.js
import React from 'react';
import CuisineCheckbox from './cuisineCheckbox';
import utilStyles from '../styles/utils.module.css';

const CuisineCheckboxes = ({ selectedCuisineTypes, handleCuisineTypeChange }) => {
  const cuisines = [
    "American",
    "Asian",
    "British",
    "Caribbean",
    "Chinese",
    "French",
    "Indian",
    "Italian",
    "Japanese",
    "Kosher",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
  ];

  return (
    <div className={utilStyles.runSearchSection}>
      
      {cuisines.map((cuisine) => (
        <CuisineCheckbox
          key={cuisine}
          value={cuisine}
          checked={selectedCuisineTypes.includes(cuisine)}
          onChange={() => handleCuisineTypeChange(cuisine)}
        />
      ))}
    </div>
  );
};

export default CuisineCheckboxes;
