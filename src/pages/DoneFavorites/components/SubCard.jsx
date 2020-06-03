import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import Card2 from '../../../components-global/Card2';
import { convertTypeToData, switchType } from '../../../services/convertDataType';
import RecipeAppContext from '../../../context/Context';
import Share from '../../../components-global/Share';
import Favorite from './Favorite';
import '../style/style.css';

const btnSubCard = (history, type, data) => {
  const { id } = data;
  history.push(`/receitas/${type}/${id}`);
};

const render = (data, setShow, setItems, history, type, id) => (
  <Card2 image={data.strThumb} key={data.id} history={history} type={type} data={data} >
    <React.Fragment>
      <p className="subtitle">{data.strCategory}</p>
      <button type="button" className="title" onClick={() => btnSubCard(history, type, data)}>
        {data.strFood}
      </button>
      {(type === 'comida') ? <p>{data.strArea}</p> : <div />}
      <div className="icons">
        <Favorite data={data} setItems={setItems} id={id} />
        <Share setShow={setShow} />
      </div>
    </React.Fragment>
  </Card2>
);

const SubCard = (props) => {
  const { setShow, setItems, id, type, history } = props;
  const { fetchRecipe } = useContext(RecipeAppContext);
  const [data, setData] = useState();
  const cb = (resp) => {
    setData(convertTypeToData(type, resp));
  };

  useEffect(() => {
    fetchRecipe(switchType(type), `lookup.php?i=${id}`, cb);
  }, []);

  return (
    <div className="comp_subcard">
      {(data) ? render(data, setShow, setItems, history, type, id) : <div />}
    </div>
  );
};

SubCard.propTypes = {
  setShow: propTypes.func.isRequired,
  setItems: propTypes.func.isRequired,
  id: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  history: propTypes.instanceOf(Object).isRequired,
};

export default SubCard;
