import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import context from '../../context/Context';
import './style/recipeCard.css';

const goToId = (id, history, db, setIsLoading, setIdRecipe) => {
  setIsLoading(true);
  setIdRecipe(id);
  history.push(`/receitas/${db === 'Meal' ? 'comida' : 'bebida'}/${id}`);
};

const RecipeCard = ({ details, dataBase }) => {
  const history = useHistory();
  const { setIsLoading, setIdRecipe } = useContext(context);
  const { [`id${dataBase}`]: id, [`str${dataBase}`]: recipe, [`str${dataBase}Thumb`]: img, strCategory: category } = details;
  return (
    <div className="recipe-card-container" data-testid={`${id}-recomendation-card`}>
      <div className="container-imgR">
        <img data-testid={`${id}-card-img`} className="img-card" src={img} alt={recipe} />
      </div>
      <div className="container-infos">
        <div data-testid={`${id}-card-category`} className="categorie-card">{category}</div>
        <div data-testid={`${id}-card-name`} className="recipe-card">{recipe}</div>
        <button
          onClick={() => goToId(id, history, dataBase, setIsLoading, setIdRecipe)}
          className="btn-ver-mais"
        >Visitar receita!</button>
      </div>
    </div>
  );
};

export default RecipeCard;

RecipeCard.propTypes = {
  details: PropTypes.instanceOf(Object).isRequired,
  dataBase: PropTypes.string.isRequired,
};
