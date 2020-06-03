import { useEffect } from 'react';

const useRamdomCard = (setResultsAll, n, db, fetchRecipe) => {
  const randomMeals = (response) => {
    const prefix = db === 'themealdb' ? 'meals' : 'drinks';
    setResultsAll((prevData) => [...prevData, response[prefix][0]]);
  };

  useEffect(() => {
    for (let i = 0; i < n; i += 1) {
      fetchRecipe(db, 'random.php', randomMeals);
    }
    return () => setResultsAll([]);
  }, [db]);
};

export default useRamdomCard;
