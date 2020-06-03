import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeAppContext from '../../context/Context';
import Header from '../../components-global/Header';
import BtnExplore from './components/BtnExplore';
import BtnKindOfRecipe from './components/BtnKindOfRecipe';
import ByIngredient from './components/ByIngredient';
import ByOrign from './components/ByOrign';
import Surpise from './components/Surpise';
import Footer from '../../components-global/Footer';

const adjustTitle = (type, kindOfRecipe) => {
  if (!type && !kindOfRecipe) return 'Explorar';
  if (type && !kindOfRecipe) {
    return `Explorar - ${type.substring(0, 1).toUpperCase().concat(type.substring(1))}`;
  }
  return `Explorar ${kindOfRecipe}`;
};

const Explore = () => {
  const { type, kindOfRecipe } = useParams();

  const { results: [, setData] } = useContext(RecipeAppContext);

  useEffect(() => { setData('themealdb'); }, []);

  return (
    <div>
      <Header title={adjustTitle(type, kindOfRecipe)} hasSearchBar />
      {!type && !kindOfRecipe && <BtnExplore />}
      {type && !kindOfRecipe && <BtnKindOfRecipe />}
      {type && kindOfRecipe === 'ingredientes' && <ByIngredient />}
      {type && kindOfRecipe === 'area' && <ByOrign />}
      {type && kindOfRecipe === 'surprise-me' && <Surpise />}
      <Footer />
    </div>
  );
};

export default Explore;
