export function getRandomRecipes(hits, numRecipes) {
    const shuffledHits = [...hits];
    const randomComparator = () => Math.random() - 0.5;
    shuffledHits.sort(randomComparator);
    return shuffledHits.slice(0, numRecipes);
  }