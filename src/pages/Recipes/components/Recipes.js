import React, { useContext, useEffect } from 'react';
import context from '../../../context/Context';
import RenderAllCards from '../../../components-global/RenderAllCards';
import RenderByFilter from '../components/RenderByFilter';
import '../style/Recipes.css';

const Recipes = () => {
  const { selectedFilterContext: [selectedFilter], dataBase: [db] } = useContext(context);

  useEffect(() => { }, [db]);

  return (
    <div className="container-allCards">
      {selectedFilter === 'All' && <RenderAllCards />}
      {selectedFilter !== 'All' && <RenderByFilter />}
    </div>
  );
};

export default Recipes;
