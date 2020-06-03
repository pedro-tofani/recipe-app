import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../../../context/Context';
import '../style/renderIngredients.css';

const RenderIngredients = () => {
  const { ing: [ingredients], setIsOnSearchBar, setSearchBarInput,
    setRadioButtonSearch, dataBase: [db] } = useContext(context);

  const history = useHistory();

  const ingredientsArray = ingredients.meals || ingredients.drinks;
  const adjustedName = ingredientsArray[0].strIngredient ? 'strIngredient' : 'strIngredient1';
  const adjustedDB = ingredientsArray[0].strIngredient ? 'themealdb' : 'thecocktaildb';

  const listByIng = (ing) => {
    setIsOnSearchBar(true);
    setSearchBarInput(ing);
    setRadioButtonSearch('ingredients');
    history.push(`/${db === 'themealdb' ? 'comidas' : 'bebidas'}`);
  };

  return (
    <div className="render-ing-container">
      {ingredientsArray.map((ing) => (
        <div className="card-ing" key={ing[adjustedName]}>
          <p data-testid={`${ing[adjustedName]}-card-name`} >{ing[adjustedName]}</p>
          <img
            src={
              `https://www.${adjustedDB}.com/images/ingredients/${ing[adjustedName]}-Small.png`
            }
            alt={ing[adjustedName]}
            data-testid={`${ing[adjustedName]}-card-img`}
          />
          <button onClick={() => listByIng(ing[adjustedName])}>Ver receitas!</button>
        </div>
      ))}
    </div>
  );
};

export default RenderIngredients;
