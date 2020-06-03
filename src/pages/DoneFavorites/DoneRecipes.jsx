import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import Filters from './components/Filters';
import Header2 from '../../components-global/Header2';
import SubCard2 from './components/SubCard2';
import Message from '../../components-global/Message';
import { convertStringToArrayObj } from '../../components-global/services/localservice';
import './style/style.css';

const DoneRecipes = (props) => {
  const { history } = props;
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setItems(convertStringToArrayObj(localStorage.getItem('done-recipes') || '[]'));
  }, []);

  return (
    <div>
      <Header2 title="Receitas feitas" history={history} />
      <Filters setItems={setItems} local="done-recipes" />
      {items.map((item) => {
        const { category, id, image, type, doneDate } = item;
        return (
          <SubCard2
            key={id}
            category={category}
            id={id}
            setShow={setShow}
            type={type}
            doneDate={doneDate}
            history={history}
            image={image}
          />
        );
      })}
      <Message message="Cliped!" show={show} setShow={setShow} />
    </div>
  );
};

DoneRecipes.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
};

export default DoneRecipes;
