const returnDB = (type) => {
  if (type === 'bebidas') return 'thecocktaildb';
  return 'themealdb';
};

export default returnDB;
