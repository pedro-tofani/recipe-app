import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RecipeAppContext from './Context';
import recipeAPI from '../services/callAPI';

const RecipeAppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchBarInput, setSearchBarInput] = useState('');
  const [isOnSearchBar, setIsOnSearchBar] = useState(false);
  const [radioButtonSearch, setRadioButtonSearch] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState('');
  const [data, setData] = useState([]);
  const [db, setDB] = useState('themealdb');
  const [error, setError] = useState('');
  const [emailBool, setEmailBool] = useState(false);
  const [emailUser, setEmailUser] = useState('');
  const [pass, setPass] = useState(false);
  const [storage, setStorage] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [renderID, setRenderID] = useState(false);
  const [localBol, setLocalBol] = useState(false);
  const [idRecipe, setIdRecipe] = useState('');

  const fetchRecipe = (type, search, toDoFunction) => {
    recipeAPI(type, search)
      .then((response) => toDoFunction(response),
        (respError) => setError(respError),
      );
  };

  const defaultSettings = () => {
    setData([]);
    setSearchBarInput('');
    setRadioButtonSearch('');
    setSelectedFilter('All');
  };

  const submitLogin = () => {
    localStorage.setItem('meals-token', 1);
    localStorage.setItem('cocktails-token', 1);
    setStorage(() => {
      const dados = { email: emailUser };
      localStorage.setItem('user', JSON.stringify(dados));
      return dados;
    });
    setEmailBool(true);
  };

  const context = {
    isLoading,
    setIsLoading,
    fetchRecipe,
    searchBarInput,
    setSearchBarInput,
    isOnSearchBar,
    setIsOnSearchBar,
    radioButtonSearch,
    setRadioButtonSearch,
    debounceState: [debouncedValue, setDebouncedValue],
    results: [data, setData],
    dataBase: [db, setDB],
    errorHandler: [error, setError],
    emailBool,
    setEmailBool,
    emailUser,
    setEmailUser,
    pass,
    setPass,
    submitLogin,
    storage,
    setStorage,
    ing: [ingredients, setIngredients],
    selectedFilterContext: [selectedFilter, setSelectedFilter],
    defaultSettings,
    renderID,
    setRenderID,
    localBol,
    setLocalBol,
    idRecipe,
    setIdRecipe,
  };

  return (
    <RecipeAppContext.Provider value={context}> {children}</RecipeAppContext.Provider>
  );
};

export default RecipeAppProvider;

RecipeAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
