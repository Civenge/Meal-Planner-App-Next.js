import { getRandomRecipes } from "./utils";

function formatIncludedIngredients(queryString) {
    if (!queryString) {
        return '';
    }

    return encodeURIComponent(queryString);
}

function formatExcludedIngredients(excludedIngredientsStr) {
    if (!excludedIngredientsStr) {
      return '';
    }
  
    const excludedIngredientsArray = excludedIngredientsStr.split(',').map((ingredient) => `excluded=${ingredient.trim()}`);
    const formattedString = excludedIngredientsArray.join('&');
  
    return formattedString;
  }

  function formatCuisineTypes(cuisineTypeStr) {
    if (!cuisineTypeStr || typeof cuisineTypeStr !== 'string') {
      return '';
    }
  
    const cuisineTypesArray = cuisineTypeStr.split(',').map((cuisineType) => cuisineType.trim());
    const formattedCuisineString = cuisineTypesArray.join('&cuisineType=');
  
    return `${formattedCuisineString}`;
  }

export async function fetchRecipes(formattedString, excludedIngredientsStr, cuisineTypeStr) {
  const apiEndpoint = "https://api.edamam.com/api/recipes/v2";
  const appId = "2286dd85";
  const appKey = "1cdfcd395ccf99e349b18f54eaa4416f";
  const random = true;

  const formattedIncludedIngredients = formatIncludedIngredients(formattedString);
  const formattedExcludedIngredients = formatExcludedIngredients(excludedIngredientsStr);
  const formattedCuisineTypes = formatCuisineTypes(cuisineTypeStr);

  let queryString = `type=public&q=${formattedIncludedIngredients}&app_id=${appId}&app_key=${appKey}&random=${random}&field=url&field=label&field=ingredientLines`;

  if (formattedExcludedIngredients) {
    queryString += `&${formattedExcludedIngredients}`;
  }

  if (formattedCuisineTypes) {
    queryString += `&cuisineType=${formattedCuisineTypes}`;
  }
  
  try {
    const response = await fetch(`${apiEndpoint}?${queryString}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.hits || data.hits.length === 0) {
      return null;
    }

    return data;

  } catch (error) {
    console.error("Error fetching recipes:", error);
    return null;
  }
}
