import React from 'react';
import propTypes from 'prop-types';

import './style.css';

function btnPerson(history) {
  history.push('/perfil');
}

const Header2 = (props) => {
  const { title, history } = props;
  return (
    <div className="comp_header2">
      <button
        type="button"
        onClick={() => btnPerson(history)}
        className="material-icons"
      >
        person
      </button>
      <p className="title">{title}</p>
    </div>
  );
};

Header2.propTypes = {
  title: propTypes.string.isRequired,
  history: propTypes.instanceOf(Object).isRequired,
};

export default Header2;
