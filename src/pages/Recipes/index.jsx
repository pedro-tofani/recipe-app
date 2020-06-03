import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import context from '../../context/Context';
import Header from '../../components-global/Header';
import RecipeFilters from './components/RecipeFilters';
import Recipes from './components/Recipes';
import Footer from '../../components-global/Footer';

const Recipe = () => {
  const { type } = useParams();
  const { isOnSearchBar } = useContext(context);

  return (
    <div>
      {type === 'comidas' && <Header title="Comidas" hasSearchBar />}
      {type === 'bebidas' && <Header title="Bebidas" hasSearchBar />}
      {!isOnSearchBar && <RecipeFilters />}
      {!isOnSearchBar && <Recipes />}
      <Footer />
    </div>
  );
};

export default Recipe;
