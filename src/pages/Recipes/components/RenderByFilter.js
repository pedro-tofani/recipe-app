import React, { useContext, useState, useEffect } from 'react';
import context from '../../../context/Context';
import Loading from '../../../components-global/Loading';
import RecipeCard from '../../../components-global/renderCards/recipeCard';
import '../../../components-global/renderCards/style/RenderAllCards.css';

const RenderByFilter = () => {
  const { dataBase: [db], fetchRecipe, setIsLoading, isLoading,
    selectedFilterContext: [selectedFilter] } = useContext(context);
  const [resultsAll, setResultsAll] = useState([]);

  const resultsSucces = (response) => {
    setResultsAll(response);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchRecipe(db, `filter.php?c=${selectedFilter}`, resultsSucces);
  }, [selectedFilter]);

  const prefix = db === 'themealdb' ? 'Meal' : 'Drink';
  const resultsAdjusted = resultsAll.meals || resultsAll.drinks || [];

  return (
    <div className="container-renderCards">
      {isLoading && <Loading />}
      {!isLoading &&
        resultsAdjusted.map((recipe) => (
          <div className="container-cards" key={recipe[`id${prefix}`]}>
            <RecipeCard details={recipe} dataBase={prefix} />
          </div>
        ))
      }
    </div>
  );
};

export default RenderByFilter;
