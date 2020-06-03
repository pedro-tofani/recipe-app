import {
  stringToObj,
  objToString,
} from '../../../components-global/services/localservice';


export const addProggress = (data, name) => {
  const { id } = data;
  let obj = stringToObj(localStorage.getItem('proggress'));
  if (obj[id]) {
    obj[id].push(name);
  } else {
    obj = { ...obj, [id]: [name] };
  }
  localStorage.setItem('proggress', objToString(obj));
};

export const deleteProggress = (data, name) => {
  const { id } = data;
  const obj = stringToObj(localStorage.getItem('proggress'));
  obj[id].splice(obj[id].indexOf(name), 1);
  localStorage.setItem('proggress', objToString(obj));
};
