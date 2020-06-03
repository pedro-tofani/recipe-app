import React, { useEffect } from 'react';
import propTypes from 'prop-types';

import './style.css';

function render(message) {
  return (
    <div className="comp_message">
      <p>{message}</p>
    </div>
  );
}

const Message = (props) => {
  const { message, show, setShow } = props;

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => setShow(false), 2000);
      return (() => clearTimeout(timeout));
    }
    return (() => {});
  }, [show]);

  return (
    show && render(message)
  );
};

Message.propTypes = {
  message: propTypes.string.isRequired,
  show: propTypes.bool.isRequired,
  setShow: propTypes.func.isRequired,
};

export default Message;
