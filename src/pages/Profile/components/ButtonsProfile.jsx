import React from 'react';
import { Link } from 'react-router-dom';

const ButtonsProfile = () => {
  const clearStorage = () => {
    localStorage.clear();
  };

  return (
    <React.Fragment>
      <div className="buttons">
        <Link to="/receitas-feitas">
          <button data-testid="profile-done-btn">Receitas Feitas</button>
        </Link>
      </div>
      <div className="buttons">
        <Link to="/receitas-favoritas">
          <button data-testid="profile-favorite-btn">Receitas Favoritas</button>
        </Link>
      </div>
      <div className="buttons">
        <Link to="/">
          <button data-testid="profile-logout-btn" onClick={() => clearStorage()}>Sair</button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default ButtonsProfile;
