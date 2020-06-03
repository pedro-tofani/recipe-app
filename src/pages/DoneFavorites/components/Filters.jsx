import React from 'react';
import propTypes from 'prop-types';

import { convertStringToArrayObj } from '../../../components-global/services/localservice';
import './filters.css';

const btnAll = (setItems, local) => {
  setItems(convertStringToArrayObj(localStorage.getItem(local)));
};

const btnFood = (setItems, local) => {
  const items = convertStringToArrayObj(localStorage.getItem(local));
  setItems(items.filter((obj) => obj.type === 'comida'));
};

const btnDrinks = (setItems, local) => {
  const items = convertStringToArrayObj(localStorage.getItem(local));
  setItems(items.filter((obj) => obj.type === 'bebida'));
};

const Filters = (props) => {
  const { setItems, local } = props;
  return (
    <div className="comp_filters">
      <button type="button" onClick={() => btnAll(setItems, local)}>All</button>
      <button type="button" onClick={() => btnFood(setItems, local)}>Food</button>
      <button type="button" onClick={() => btnDrinks(setItems, local)}>Drinks</button>
    </div>
  );
};

Filters.propTypes = {
  setItems: propTypes.func.isRequired,
  local: propTypes.string.isRequired,
};

export default Filters;
