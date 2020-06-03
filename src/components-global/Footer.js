import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/Context';
import './Footer.css';

const setLinksProperly = (db, setDB, setSelectedFilter, setData) => {
  setDB(db);
  setSelectedFilter('All');
  setData([]);
};

const linkToDrinks = (setDB, setSelectedFilter, setData) => (
  <Link
    data-testid="drinks-bottom-btn"
    to="/bebidas"
    onClick={() => {
      setLinksProperly('thecocktaildb', setDB, setSelectedFilter, setData);
    }}
  >
    <li><span className="material-icons">local_bar</span></li>
  </Link>
);

const linkToExplore = (setDB, setSelectedFilter, setData, setIsOnSearchBar) => (
  <Link
    to="/explorar"
    data-testid="explore-bottom-btn"
    onClick={() => {
      setLinksProperly('themealdb', setDB, setSelectedFilter, setData);
      setIsOnSearchBar(false);
    }}

  >
    <li><span className="material-icons">explore</span></li>
  </Link>
);

const linkToFood = (setDB, setSelectedFilter, setData) => (
  <Link
    data-testid="food-bottom-btn"
    to="/comidas"
    onClick={() => {
      setLinksProperly('themealdb', setDB, setSelectedFilter, setData);
    }}
  >
    <li><span className="material-icons">local_pizza</span></li>
  </Link>
);

const Footer = () => {
  const { dataBase: [, setDB], selectedFilterContext: [, setSelectedFilter], setIsOnSearchBar,
    results: [, setData],
  } = useContext(context);
  return (
    <div className="footer-container">
      <div className="phantom-footer" />
      <div className="footer-list-container">
        <ul className="flex-footer-container">
          {linkToDrinks(setDB, setSelectedFilter, setData)}
          {linkToExplore(setDB, setSelectedFilter, setData, setIsOnSearchBar)}
          {linkToFood(setDB, setSelectedFilter, setData)}
        </ul>
      </div>
    </div >
  );
};

export default Footer;
