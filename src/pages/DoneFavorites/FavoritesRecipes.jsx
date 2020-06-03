import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import Filters from './components/Filters';
import Header2 from '../../components-global/Header2';
import SubCard from './components/SubCard';
import Message from '../../components-global/Message';
import { convertStringToArrayObj } from '../../components-global/services/localservice';
import './style/style.css';

const FavoritesRecipes = (props) => {
  const { history } = props;
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setItems(convertStringToArrayObj(localStorage.getItem('favorite-recipes') || '[]'));
  }, []);
  return (
    <div>
      <Header2 title="Receitas favoritas" history={history} />
      <Filters setItems={setItems} local="favorite-recipes" />
      {items.map((item) => {
        const { category, id, image, type } = item;
        return (
          <SubCard
            key={id}
            category={category}
            id={id}
            setShow={setShow}
            type={type}
            setItems={setItems}
            history={history}
            image={image}
          />
        );
      })}
      <Message message="Cliped!" show={show} setShow={setShow} />
    </div>
  );
};

FavoritesRecipes.propTypes = {
  history: propTypes.instanceOf(Object).isRequired,
};

export default FavoritesRecipes;
