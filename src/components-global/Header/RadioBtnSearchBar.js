import React, { useContext } from 'react';
import RecipeAppContext from '../../context/Context';
import './style/RadioBtnSearchBar.css';

const RadioBtnSearchBar = () => {
  const { radioButtonSearch, setRadioButtonSearch } = useContext(RecipeAppContext);

  return (
    <form
      onChange={(e) => setRadioButtonSearch(e.target.value)}
      value={radioButtonSearch}
      className="form-header-flex"
      data-testid="radio-value"
    >
      <div className="option-container">
        <input
          type="radio"
          name="t"
          value="ingredients"
          // checked={radioButtonSearch === 'ingredients'}
          data-testid="ingredient-search-radio"
        />
        <div>Ingredientes</div>
      </div>
      <div className="option-container">
        <input type="radio" name="t" value="name" data-testid="name-search-radio" />
        <div>Nome</div>
      </div>
      <div className="option-container">
        <input type="radio" name="t" value="first" data-testid="first-letter-search-radio" />
        <div>Primeira letra</div>
      </div>
    </form>
  );
};

export default RadioBtnSearchBar;
