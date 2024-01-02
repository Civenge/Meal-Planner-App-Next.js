// pages/index.js or any other React component
import { useEffect } from 'react';
import { fetchRecipes } from '../lib/api';

export default function RecipePage() {
  useEffect(() => {
    async function fetchData() {
      const formattedString = "chicken";
      const excludedIngredientsStr = "";

      try {
        const recipesData = await fetchRecipes(formattedString, excludedIngredientsStr);

        if (recipesData) {
          // Process the retrieved data as needed
          console.log(recipesData);
        } else {
          console.log("No recipes found. Please try again.");
        }
      } catch (error) {
        console.error("Error performing recipe search:", error);
      }
    }

    fetchData(); // Call the function when the component mounts
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    // Your JSX for the component
    <div>
      {/* ... */}
    </div>
  );
}
