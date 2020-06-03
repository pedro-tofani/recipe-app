import React, { useContext, useEffect } from 'react';
import RecipeAppContext from '../../context/Context';
import useDebounce from '../../customHooks/useDebounce';

const typeOfSearch = (typeState, searchBarInput) => {
  console.log(searchBarInput[0]);
  console.log(searchBarInput);
  switch (typeState) {
    case 'ingredients':
      return `filter.php?i=${searchBarInput}`;
    case 'first':
      return `search.php?f=${searchBarInput[0]}`;
    case 'name':
      return `search.php?s=${searchBarInput}`;
    default: return 'error';
  }
};

const inputDiv = (searchBarInput, setSearchBarInput) => (
  <div className="input-search-container">
    <input
      onChange={(e) => setSearchBarInput(e.target.value)}
      value={searchBarInput}
      placeholder="Digite aqui sua busca"
      className="input-search"
      data-testid="search-input"
    />
  </div>
);

const InputSearchBar = () => {
  const { searchBarInput, setSearchBarInput, setIsLoading, results: [, setData],
    radioButtonSearch, fetchRecipe, dataBase: [db],
  } = useContext(RecipeAppContext);

  const debouncedSearchTerm = useDebounce(searchBarInput, 600);

  const searchInputRadio = (response) => {
    setData(response);
    setIsLoading(false);
  };

  useEffect(
    () => {
      if (debouncedSearchTerm && radioButtonSearch && searchBarInput) {
        setIsLoading(true);
        fetchRecipe(db, typeOfSearch(radioButtonSearch, searchBarInput), searchInputRadio);
      } else {
        setData([]);
      }
    }, [debouncedSearchTerm],
  );

  return inputDiv(searchBarInput, setSearchBarInput);
};

export default InputSearchBar;
