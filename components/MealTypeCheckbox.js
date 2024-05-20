// MealTypeCheckbox.js
import React from 'react';
import utilStyles from '../styles/utils.module.css';

const MealTypeCheckbox = ({ value, checked, onChange }) => {
  return (
    <div className={utilStyles.cuisineCheckboxContainer}>
      <label>
        <input
          type="checkbox"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        {value}
      </label>
    </div>
  );
};

export default MealTypeCheckbox;