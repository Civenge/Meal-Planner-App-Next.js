import Head from 'next/head';
import { useState } from 'react';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { fetchRecipes } from '../lib/api';

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
  const [numRecipes, setNumRecipes] = useState(10);
  const [searchedRecipes, setSearchedRecipes] = useState(null); // State to store search results

  const handleSearch = async (event) => {
    event.preventDefault();

    // Fetch recipes data with the user-entered search query
    const recipesData = await fetchRecipes(searchQuery, excludedQuery);

    // Update the state with the new search results
    setSearchedRecipes(recipesData);
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Welcome to the Meal Planner App!</p>
        <p>Here you can search for new recipes.</p>

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
          <div>
              Run search 
          </div>
          <div>
          <button type="submit">Search</button>
          </div>
        </form>
      </section>

      {/* Display Recipes */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Recipes</h2>
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
