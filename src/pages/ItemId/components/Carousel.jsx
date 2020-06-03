import React from 'react';
import propTypes from 'prop-types';

import '../style/carousel.css';

function Carousel(props) {
  const { children } = props;
  return (
    <div className="carousel">
      <div className="slides">
        <input type="radio" name="r" className="r1" id="r1" />
        <input type="radio" name="r" className="r2" id="r2" />
        <input type="radio" name="r" className="r3" id="r3" />
        <div className="slide s1">
          {children[0]}
        </div>
        <div className="slide">
          {children[1]}
        </div>
        <div className="slide">
          {children[2]}
        </div>
      </div>
      <div className="navigation">
        <label htmlFor="r1" className="bar" />
        <label htmlFor="r2" className="bar" />
        <label htmlFor="r3" className="bar" />
      </div>
    </div>
  );
}

Carousel.propTypes = {
  children: propTypes.instanceOf(Array).isRequired,
};

export default Carousel;
