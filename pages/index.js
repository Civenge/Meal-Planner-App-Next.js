import Head from 'next/head';
import { useState } from 'react';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { fetchRecipes } from '../lib/api';
import CuisineCheckboxes from '../components/CuisineCheckboxes';

export async function getStaticProps() {
  // Fetch recipes data with default search query
  const recipesData = await fetchRecipes("", "");

  // Fetch blog posts data (existing code)
  const allPostsData = getSortedPostsData();

  return {
    props: {
      recipesData,
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [excludedQuery, setExcludedQuery] = useState("");
  const [selectedCuisineTypes, setSelectedCuisineTypes] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState(null); // State to store search results

  const handleSearch = async (event) => {
    event.preventDefault();

    // Convert selectedCuisineTypes array to a comma-separated string
    const cuisineTypeStr = selectedCuisineTypes.join(',');

    // Fetch recipes data with the user-entered search query
    const recipesData = await fetchRecipes(searchQuery, excludedQuery, cuisineTypeStr);

    // Update the state with the new search results
    setSearchedRecipes(recipesData);
  };

  const handleCuisineTypeChange = (cuisineType) => {
    setSelectedCuisineTypes((prevSelectedCuisineTypes) => {
      const updatedCuisineTypes = new Set(prevSelectedCuisineTypes);
  
      if (updatedCuisineTypes.has(cuisineType)) {
        updatedCuisineTypes.delete(cuisineType);
      } else {
        updatedCuisineTypes.add(cuisineType);
      }
  
      return Array.from(updatedCuisineTypes);  // Convert the set back to an array
    });
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} cuisineTypesSection`}>
        <h1 className={utilStyles.headingLg}>Welcome to the Meal Planner App!</h1>
        <p>Search for new recipes based upon your favorite ingredients to include, ingredients you want to exclude, and by one or more of your favorite cuisine types.</p>

        {/* Search Form */}
        <form onSubmit={handleSearch}>
          <label>
            <div>Ingredients to include (Ex: chicken, rice):</div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
          <label>
            <div>
              Ingredients to exclude (Ex: beans, broccoli):
            </div>
            <input
              type="text"
              value={excludedQuery}
              onChange={(e) => setExcludedQuery(e.target.value)}
              />
          </label>
          
          <CuisineCheckboxes
            selectedCuisineTypes={selectedCuisineTypes}
            handleCuisineTypeChange={handleCuisineTypeChange}
          />
          
          <div className={utilStyles.runSearchSection}>
            <h2 className={utilStyles.headingLg}>
              Run search:
            </h2>
          </div>
          <div>
          <button type="submit">Search</button>
          </div>
        </form>
      </section>

      {/* Display Recipes */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Recipes:</h2>
        <ul className={utilStyles.list}>
          {searchedRecipes &&
            searchedRecipes.hits.map(({ recipe }, index) => (
              <li className={utilStyles.listItem} key={index}>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                  {recipe.label}
                </a>
                <br />
                <small className={utilStyles.lightText}>
                  Ingredients:
                  {recipe.ingredientLines.map((ingredient, i) => (
                    <div key={i}>{ingredient}</div>
                  ))}
                </small>
              </li>
            ))}
        </ul>
      </section>

      {/* Display Blog Posts
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section> */}
    </Layout>
  );
}
