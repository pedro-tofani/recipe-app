import React from 'react';
import propTypes from 'prop-types';

import Generics from './Generics';

function Meal(props) {
  const { convertTypeToData, data, making, type } = props;
  return (
    <Generics
      data={convertTypeToData('comida', data)}
      making={making}
      type={type}
    />
  );
}

Meal.propTypes = {
  convertTypeToData: propTypes.func.isRequired,
  data: propTypes.instanceOf(Object).isRequired,
  making: propTypes.string,
  type: propTypes.string.isRequired,
};

Meal.defaultProps = {
  making: undefined,
};

export default Meal;
