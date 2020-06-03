import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import InputEmail from './components/InputEmail.jsx';
import InputPass from './components/InputPass';
import RecipeAppContext from '../../context/Context';
import './style/style.css';

const Login = () => {
  const { emailBool, pass, submitLogin } = useContext(RecipeAppContext);
  const hist = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    hist.push('/comidas');
    submitLogin();
  };

  return (
    <div className="containerLogin">
      <h1>Login</h1>
      <form className="containerForm">
        <InputEmail />
        <InputPass />
        {emailBool && pass
        ? <button
          data-testid="login-submit-btn"
          onClick={(e) => handleSubmit(e)}
        >Entrar
        </button>
        : <button data-testid="login-submit-btn" disabled>Entrar</button>}
      </form>
    </div>
  );
};

export default Login;
