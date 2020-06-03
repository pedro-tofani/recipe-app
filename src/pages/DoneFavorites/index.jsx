import React from 'react';
import propTypes from 'prop-types';
import DoneRecipes from './DoneRecipes';
import FavoritesRecipes from './FavoritesRecipes';

function switchDoneFavorite(history) {
  if (history.location.pathname === '/receitas-favoritas') {
    return <FavoritesRecipes history={history} />;
  }
  if (history.location.pathname === '/receitas-feitas') {
    return <DoneRecipes history={history} />;
  }
  return <div />;
}

const DoneFavorites = (props) => {
  const { history } = props;
  return (
    <div>
      {switchDoneFavorite(history)}
    </div>
  );
};

DoneFavorites.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
};

export default DoneFavorites;
