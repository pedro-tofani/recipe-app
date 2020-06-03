import React from 'react';
import propTypes from 'prop-types';

import {
  convertArrayObjToString,
  convertStringToArrayObj,
} from '../../../components-global/services/localservice';
import { favoriteDeletebyId } from '../../../components-global/services/favorite';

import './icons.css';

const btnFavorite = (data, setItems) => {
  const arr = favoriteDeletebyId(data);
  localStorage.setItem('favorite-recipes', convertArrayObjToString(arr));
  const str = convertStringToArrayObj(localStorage.getItem('favorite-recipes'));
  setItems(str);
};

const Favorite = (props) => {
  const { data, setItems, id } = props;
  return (
    <button
      type="button"
      data-testid={`${id}-horizontal-favorite-btn`}
      className="material-icons"
      onClick={() => btnFavorite(data, setItems)}
    >
      favorite
    </button>
  );
};

Favorite.propTypes = {
  data: propTypes.instanceOf(Object).isRequired,
  setItems: propTypes.func.isRequired,
  id: propTypes.number.isRequired,
};

export default Favorite;
