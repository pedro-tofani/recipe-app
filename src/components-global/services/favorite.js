import {
  convertArrayObjToString,
  convertStringToArrayObj,
} from './localservice';

export const favoriteDeletebyId = (data) => {
  const id = data.id;
  const arr = convertStringToArrayObj(localStorage.getItem('favorite-recipes')) || [];
  return arr.filter((item) => item.id !== id);
};

export const favoriteById = (data) => {
  const id = data.id;
  const arr = convertStringToArrayObj(localStorage.getItem('favorite-recipes')) || [];
  return arr.find((item) => item.id === id);
};

export const favoriteAdd = (data, type) => {
  const arr = convertStringToArrayObj(localStorage.getItem('favorite-recipes')) || [];
  const { id, strCategory: category, strThumb: image } = data;
  arr.push({ id, category, image, type });
  localStorage.setItem('favorite-recipes', convertArrayObjToString(arr));
};

export const initFavoriteParam = (data) => {
  if (favoriteById(data)) {
    return true;
  }
  return false;
};

export const favoriteLocal = (data, setFavorite, type) => {
  let arr = convertStringToArrayObj(localStorage.getItem('favorite-recipes')) || [];
  if (!favoriteById(data)) {
    favoriteAdd(data, type);
  } else {
    arr = favoriteDeletebyId(data);
    localStorage.setItem('favorite-recipes', convertArrayObjToString(arr));
  }
  setFavorite((currFavorite) => !currFavorite);
};
