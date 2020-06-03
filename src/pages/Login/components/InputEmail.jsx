import React, { useContext } from 'react';
import RecipeAppContext from '../../../context/Context';

const InputEmail = () => {
  const resultadoEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const { setEmailBool, setEmailUser, setLocalBol } = useContext(RecipeAppContext);

  const onChangeHandleEmail = (e) => {
    if (resultadoEmail.test(e.value)) {
      setEmailBool(true);
      setEmailUser(e.value);
      setLocalBol(true);
      e.style.border = '1px solid green';
    } else {
      e.style.borderColor = '1px solid red';
      setEmailBool(false);
    }
  };

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="EMAIL"
        data-testid="email-input"
        name="email"
        required
        onChange={(e) => onChangeHandleEmail(e.target)}
      />
    </React.Fragment>
  );
};

export default InputEmail;
