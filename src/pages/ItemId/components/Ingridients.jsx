import React, { useState } from 'react';
import propTypes from 'prop-types';

import { addProggress, deleteProggress } from '../services/proggress';
import {
  stringToObj,
} from '../../../components-global/services/localservice';

const initChecked = (data, arr) => {
  const { id } = data;
  const obj = stringToObj(localStorage.getItem('proggress'));
  const checks2 = arr;
  if (obj[id]) {
    obj[id].forEach((item) => {
      checks2[item].check = true;
    });
  }
};

const initChecks = (data, ingridients) => {
  const arr = [];
  ingridients.forEach((item) => {
    const obj = {};
    obj.ingridient = item[0];
    obj.measure = item[1];
    obj.check = false;
    arr.push(obj);
  });
  initChecked(data, arr);
  return arr;
};

const allCheckedFunc = (checks) => (!checks.every((obj) => obj.check));

const changeHandle = (e, checks, setChecks, setAllChecked, data) => {
  const { name, checked } = e.target;
  const obj = [...checks];
  obj[name].check = checked;
  setChecks(obj);
  setAllChecked(allCheckedFunc(obj));
  if (checked) {
    addProggress(data, name);
  } else {
    deleteProggress(data, name);
  }
};

const ingredientsList = (checks) => (
  <ul>
    {checks.map((item, index) => (
      <li key={`${item.ingridient}${item.measure}`}>
        <span data-testid={`${index}-ingredient-name`}>{item.ingridient}</span>
        <span data-testid={`${index}-ingredient-measure`}> - {item.measure}</span>
      </li>
    ))}
  </ul>
);

const ingredientsCheckbox = (checks, setChecks, setAllChecked, data) => (
  <React.Fragment>
    {checks.map((item, index) => (
      <div className="checkbox" key={`${item.ingridient}${item.measure}`}>
        <input
          type="checkbox"
          name={index}
          onChange={(e) => changeHandle(e, checks, setChecks, setAllChecked, data)}
          defaultChecked={checks[index].check}
        />
        <div style={(checks[index].check) ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>
          <span data-testid={`${index}-ingredient-name`}>{item.ingridient}</span>
          <span data-testid={`${index}-ingredient-measure`}> - {item.measure}</span>
        </div>
      </div>
    ))}
  </React.Fragment>
);

const Ingridients = (props) => {
  const { ingridients, setAllChecked, making, data } = props;
  const [checks, setChecks] = useState(initChecks(data, ingridients));
  return (
    <div className="ingredients">
      <p className="subtitle">Ingredients</p>
      <div className="box">
        {(making) ?
          ingredientsCheckbox(checks, setChecks, setAllChecked, data) :
          ingredientsList(checks)}
      </div>
    </div>
  );
};

Ingridients.propTypes = {
  data: propTypes.instanceOf(Object).isRequired,
  making: propTypes.string,
  ingridients: propTypes.instanceOf(Array).isRequired,
  setAllChecked: propTypes.func.isRequired,
};

export default Ingridients;
