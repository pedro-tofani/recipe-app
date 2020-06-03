import React, { useContext } from 'react';
import RecipeAppContext from '../../../context/Context';

const InputPass = () => {
  const { setPass } = useContext(RecipeAppContext);

  const onChangeHandlePass = (e) => {
    if (e.value.length > 6) {
      setPass(true);
      e.style.border = '1px solid green';
    } else {
      e.style.borderColor = 'red';
      setPass(false);
    }
  };

  return (
    <React.Fragment>
      <input
        type="password"
        placeholder="SENHA"
        name="password"
        data-testid="password-input"
        required minLength="7"
        onChange={(e) => onChangeHandlePass(e.target)}
      />
    </React.Fragment>
  );
};

export default InputPass;
