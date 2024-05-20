// MealTypeCheckboxes.js
import React from 'react';
import MealTypeCheckbox from './MealTypeCheckbox';
import utilStyles from '../styles/utils.module.css';

const MealTypeCheckboxes = ({ selectedMealTypes, handleMealTypeChange }) => {
  const mealTypes = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
  ];

  return (
    <div className={utilStyles.runSearchSection}>
      
      {mealTypes.map((meal) => (
        <MealTypeCheckbox
          key={meal}
          value={meal}
          checked={selectedMealTypes.includes(meal)}
          onChange={() => handleMealTypeChange(meal)}
        />
      ))}
    </div>
  );
};

export default MealTypeCheckboxes;