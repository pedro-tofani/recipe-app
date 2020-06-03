import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import {
  convertArrayObjToString,
  convertStringToArrayObj,
} from '../../../components-global/services/localservice';

import { inProggressHasId, addInProggress } from '../services/inProggress';
import Carousel from './Carousel';
import CardRecomended from './CardRecomended';
import Message from '../../../components-global/Message';
import Favorite from '../../../components-global/Favorite';
import Share from '../../../components-global/Share';
import Ingridients from './Ingridients';


const recomended = (type) => (
  <div className="recomended">
    <p className="subtitle">Recomended</p>
    <Carousel>
      <CardRecomended type={type} />
      <CardRecomended type={type} />
      <CardRecomended type={type} />
    </Carousel>
  </div>
);

const instruction = (strInstructions) => (
  <div className="intructions">
    <p className="subtitle">Intructions</p>
    <div className="box">
      <p data-testid="instructions">{strInstructions}</p>
    </div>
  </div>
);

const renderVideo = (strYoutube) => {
  const str = strYoutube.replace('watch?v=', 'embed/');
  return (
    <iframe width="420" height="345" src={str} data-testid="video" />
  );
};

const not = () => (
  <div className="video">
    <p>Video not found</p>
  </div>
);

const video = (strYoutube) => (
  <div className="video">
    <p className="subtitle">Video</p>
    {(strYoutube) ? renderVideo(strYoutube) : not()}
  </div>
);

const switchInit = (bool) => {
  if (bool) {
    return 'Continuar receita';
  }
  return 'Iniciar receita';
};

const header = (strFood, data, setShow, type) => (
  <div className="header">
    <p className="title" data-testid="recipe-title">{strFood}</p>
    <div>
      <Share setShow={setShow} />
      <Favorite data={data} type={type} />
    </div>
  </div>
);

const handleBtnMaking = (history, data, type) => {
  const { strCategory: category, id, strFood: title, strThumb: image } = data;
  const arr = convertStringToArrayObj(localStorage.getItem('done-recipes') || '[]');
  const date = new Date();
  const doneDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  if (!arr.some((obj) => obj.id === id)) {
    arr.push({ id, category, title, image, doneDate, type });
  }
  localStorage.setItem('done-recipes', convertArrayObjToString(arr));
  history.push('/receitas-feitas');
};

const handleBtnStart = (data, type, history) => {
  addInProggress(data);
  const { id } = data;
  history.push(`/receitas/${type}/${id}/making`);
};

const btnMaking = (history, allChecked2, data, type) => (
  <button
    type="button"
    className="init"
    data-testid="start-recipe-btn"
    onClick={() => handleBtnMaking(history, data, type)}
    disabled={allChecked2}
  >
    Finalizar receita
  </button>
);

const btnStart = (data, type, history) => (
  <button
    type="button"
    className="init"
    data-testid="start-recipe-btn"
    onClick={() => handleBtnStart(data, type, history)}
  >
    {switchInit(inProggressHasId(data))}
  </button>
);

const buttonSwitch = (making, data, type, history, checks) => {
  if (making) {
    return btnMaking(history, checks, data, type);
  }
  return btnStart(data, type, history);
};

function Generics(props) {
  const { data, making, type } = props;
  const { strFood, strThumb, strCategory, strYoutube, strInstructions, ingridients } = data;
  const [show, setShow] = useState(false);
  const [allChecked, setAllChecked] = useState(true);
  const history = useHistory();

  return (
    <React.Fragment>
      <img src={strThumb} data-testid="recipe-photo" alt="" />
      <div className="main">
        {header(strFood, data, setShow, type)}
        <p className="type">{strCategory}</p>
        <Ingridients
          ingridients={ingridients}
          setAllChecked={setAllChecked}
          making={making}
          data={data}
        />
        {instruction(strInstructions)}
        {(making) ? <div /> : (video(strYoutube))}
        {(making) ? <div /> : recomended(type)}
        {buttonSwitch(making, data, type, history, allChecked)}
      </div>
      <Message message="Cliped!" show={show} setShow={setShow} />
    </React.Fragment>
  );
}

Generics.propTypes = {
  data: propTypes.instanceOf(Object).isRequired,
  making: propTypes.string,
  type: propTypes.string.isRequired,
};

Generics.defaultProps = {
  making: undefined,
};

export default Generics;
