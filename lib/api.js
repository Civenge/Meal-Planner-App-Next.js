export async function fetchRecipes(formattedString, excludedIngredientsStr) {
    const apiEndpoint = "https://api.edamam.com/api/recipes/v2";
    const appId = "2286dd85";
    const appKey = "1cdfcd395ccf99e349b18f54eaa4416f";
    const random = true;
  
    const queryString = `type=public&q=${formattedString}&app_id=${appId}&app_key=${appKey}&${excludedIngredientsStr}&random=${random}&field=url&field=label&field=ingredientLines`;
  
    try {
      const response = await fetch(`${apiEndpoint}?${queryString}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (!data.hits || data.hits.length === 0) {
        console.log(`Your search for ${formattedString} found no recipes, please try again.`);
        return null;
      }
  
      return data;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return null;
    }
  }
  