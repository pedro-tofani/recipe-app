import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';

import Card2 from '../../../components-global/Card2';
import { convertTypeToData, switchType } from '../../../services/convertDataType';
import RecipeAppContext from '../../../context/Context';
import Share from '../../../components-global/Share';
import '../style/style.css';

const btnSubCard2 = (history, type, { id }) => {
  history.push(`/receitas/${type}/${id}`);
};

function render(data, setShow, doneDate, type, history) {
  return (
    <Card2 image={data.strThumb} key={data.id} data={data} history={history} type={type} >
      <React.Fragment>
        <div className="header">
          <p className="subtitle">{data.strCategory}</p>
          <Share setShow={setShow} />
        </div>
        <button type="button" className="title" onClick={() => btnSubCard2(history, type, data)}>
          {data.strFood}
        </button>
        <p className="date">Feita em: {doneDate}</p>
        {(type === 'comida') ?
          <div className="tags">
            {data.strTags && data.strTags.split(',').slice(0, 2).map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div> :
          <div />}
      </React.Fragment>
    </Card2>
  );
}

const SubCard2 = (props) => {
  const { setShow, doneDate, id, type, history } = props;
  const { fetchRecipe } = useContext(RecipeAppContext);
  const [data, setData] = useState();
  const cb = (resp) => {
    setData(convertTypeToData(type, resp));
  };

  useEffect(() => {
    fetchRecipe(switchType(type), `lookup.php?i=${id}`, cb);
  }, []);

  return (
    <div className="comp_subcard2">
      {(data) ? render(data, setShow, doneDate, type, history) : <div />}
    </div>
  );
};

SubCard2.propTypes = {
  setShow: propTypes.func.isRequired,
  doneDate: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  history: propTypes.instanceOf(Object).isRequired,
};

export default SubCard2;
