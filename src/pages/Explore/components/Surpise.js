import React, { useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import context from '../../../context/Context';
import Loading from '../../../components-global/Loading';
import returnDB from '../../../services/returnDB';

const Surprise = () => {
  const { fetchRecipe } = useContext(context);

  const history = useHistory();
  const { type } = useParams();

  const changeHistory = (response) => {
    const route = response.meals || response.drinks;
    const { idDrink, idMeal } = route[0];
    const id = idDrink || idMeal;
    history.push(`/receitas/${(type === 'comidas') ? 'comida' : 'bebida'}/${id}`);
  };

  useEffect(() => {
    fetchRecipe(returnDB(type), 'random.php', changeHistory);
  }, []);

  return <Loading />;
};

export default Surprise;
