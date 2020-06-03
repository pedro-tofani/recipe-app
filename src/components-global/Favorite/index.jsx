import React, { useState } from 'react';
import propTypes from 'prop-types';

import { favoriteLocal, initFavoriteParam } from '../services/favorite';
import './icons.css';

const btnFavorite = (data, setFavorite, type) => {
  favoriteLocal(data, setFavorite, type);
};

const Favorite = (props) => {
  const { data, type } = props;
  const [favorite, setFavorite] = useState(initFavoriteParam(data));

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      className="material-icons"
      onClick={() => btnFavorite(data, setFavorite, type)}
    >
      {(favorite) ? 'favorite' : 'favorite_border'}
    </button>
  );
};

Favorite.propTypes = {
  data: propTypes.instanceOf(Object).isRequired,
  type: propTypes.string.isRequired,
};

export default Favorite;
