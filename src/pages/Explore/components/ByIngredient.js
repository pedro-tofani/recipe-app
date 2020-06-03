import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import context from '../../../context/Context';
import Loading from '../../../components-global/Loading';
import RenderIngredients from './RenderIngredients';
import returnDB from '../../../services/returnDB';

const ByIngredient = () => {
  const [searchingIngredients, setSearchingIngredients] = useState(true);

  const { fetchRecipe, ing: [, setIngredients], dataBase: [, setDB] } = useContext(context);
  const { type } = useParams();

  const getIngredients = (response) => {
    setIngredients(response);
    setSearchingIngredients(false);
  };

  useEffect(() => {
    fetchRecipe(returnDB(type), 'list.php?i=list', getIngredients);
    const dataBase = type === 'comidas' ? 'themealdb' : 'thecocktaildb';
    setDB(dataBase);
    return () => setIngredients([]);
  }, []);

  return (
    <div>
      {searchingIngredients && <Loading />}
      {!searchingIngredients && <RenderIngredients />}
    </div>
  );
};

export default ByIngredient;
