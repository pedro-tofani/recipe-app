import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import '../style/BtnExplore.css';

const BtnKindOfRecipe = () => {
  const history = useHistory();
  const { type } = useParams();

  const changeRoute = (route) => {
    history.push(`/explorar/${type}/${route}`);
  };

  return (
    <div className="btn-explore-container">
      <button
        data-testid="explore-by-ingredient"
        onClick={() => changeRoute('ingredientes')}
      >Por ingredientes</button>
      {type !== 'bebidas' &&
        <button
          onClick={() => changeRoute('area')}
          data-testid="explore-by-area"
        >Por local de origem</button>}
      <button
        onClick={() => changeRoute('surprise-me')}
        data-testid="explore-surprise"
      >Me surpreenda!</button>
    </div>
  );
};

export default BtnKindOfRecipe;
