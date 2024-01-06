// PrepTimeCheckboxes.js
import React from 'react';
import utilStyles from '../styles/utils.module.css';
import PrepTimeCheckbox from './PrepTimeCheckbox';

const PrepTimeCheckboxes = ({ selectedPrepTimeTypes, handlePrepTypeChange }) => {
  const prepTimes = [
    "15",
    "30",
    "45",
    "60",
    "90",
  ];

  return (
    <div className={utilStyles.runSearchSection}>
      
      {prepTimes.map((time) => (
        <PrepTimeCheckbox
          key={time}
          value={time}
          checked={selectedPrepTimeTypes.includes(time)}
          onChange={() => handlePrepTypeChange(time)}
        />
      ))}
    </div>
  );
};

export default PrepTimeCheckboxes;
