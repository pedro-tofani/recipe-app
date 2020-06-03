import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../../../context/Context';
import RenderALLCards from '../../../components-global/RenderAllCards';
import '../style/ByOrign.css';
import '../style/renderIngredients.css';

const byCountrie = (recipesByContry, hist) => (
  <div className="render-ing-container">
    {recipesByContry.meals.map((recipe) => (
      <div key={recipe.strMeal} className="card-ing">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} height="80vh" />
        <p>{recipe.strMeal}</p>
        <button
          onClick={() => hist.push(`/receitas/comida/${recipe.idMeal}`)}
          className="btn-ver-mais"
        >Visitar receita!</button>
      </div>))}
  </div>
);

const ByOrign = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState([]);
  const [recipesByContry, setRecipesByContry] = useState([]);
  const { fetchRecipe } = useContext(context);
  const hist = useHistory();
  const adjustSelectorArea = (response) => {
    setAreas(() => [{ strArea: 'All areas' }, ...response.meals]);
  };
  useEffect(() => {
    fetchRecipe('themealdb', 'list.php?a=list', adjustSelectorArea);
  }, []);
  useEffect(() => {
    if (selectedArea !== 'All areas') {
      fetchRecipe('themealdb', `filter.php?a=${selectedArea}`, setRecipesByContry);
    }
  }, [selectedArea]);
  return (
    <div className="by-orign-container">
      <select
        data-testid="explore-by-area-dropdown"
        onChange={(e) => setSelectedArea(e.target.value)}
      >
        {areas.map(({ strArea: place }) =>
          <option data-testid={`${place}-option`} value={place} key={place}>{place}</option>)}
      </select>
      {!recipesByContry.meals && <div>Nenhum resultado</div>}
      {recipesByContry.meals && selectedArea !== 'All areas' && byCountrie(recipesByContry, hist)}
      {recipesByContry.meals && selectedArea === 'All areas' && <RenderALLCards />}
    </div>
  );
};

export default ByOrign;
