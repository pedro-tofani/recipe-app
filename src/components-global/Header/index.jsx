import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import FixedHeader from './FixedHeader';
import HiddenableHeader from './HiddenableHeader';
import RenderRecipes from '../renderCards/index';
import RecipeAppContext from '../../context/Context';

const Header = ({ title, hasSearchBar }) => {
  const { isOnSearchBar } = useContext(RecipeAppContext);

  return (
    <div className="container-HeaderPerfil">
      <FixedHeader title={title} hasSearchBar={hasSearchBar} />
      {isOnSearchBar && <HiddenableHeader />}
      {isOnSearchBar && <RenderRecipes />}
    </div>
  );
};

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  hasSearchBar: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  hasSearchBar: false,
};
