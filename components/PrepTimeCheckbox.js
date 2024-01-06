// PrepTimeCheckbox.js
import React from 'react';
import utilStyles from '../styles/utils.module.css';

const PrepTimeCheckbox = ({ value, checked, onChange }) => {
  return (
    <div className={utilStyles.cuisineCheckboxContainer}>
      <label>
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        {value}
      </label>
    </div>
  );
};

export default PrepTimeCheckbox;
