const filterIngridient = (food) => {
  const arr = [];
  Object.keys(food).forEach((item) => {
    if (/^strIngredient/.test(item) && food[item]) {
      arr.push(food[item]);
    }
  });
  return arr;
};

const filterMeasure = (food) => {
  const arr = [];
  Object.keys(food).forEach((item) => {
    if (/^strMeasure/.test(item) && food[item]) {
      arr.push(food[item]);
    }
  });
  return arr;
};

const filterX = (food) => {
  const ingridients = [...filterIngridient(food)];
  const measure = [...filterMeasure(food)];
  return ingridients.map((item, index) => [item, measure[index]]);
};

const dataMeal = (andrey) => {
  const id = andrey.meals[0].idMeal;
  const strFood = andrey.meals[0].strMeal;
  const strThumb = andrey.meals[0].strMealThumb;
  const strCategory = andrey.meals[0].strCategory;
  const strInstructions = andrey.meals[0].strInstructions;
  const strYoutube = andrey.meals[0].strYoutube;
  const strTags = andrey.meals[0].strTags;
  const ingridients = filterX(andrey.meals[0]);
  const strArea = andrey.meals[0].strArea;

  return {
    id, strArea, strFood, strThumb, strCategory, strInstructions, strYoutube, ingridients, strTags,
  };
};

const dataCocktail = (andrey) => {
  const id = andrey.drinks[0].idDrink;
  const strFood = andrey.drinks[0].strDrink;
  const strThumb = andrey.drinks[0].strDrinkThumb;
  const strCategory = andrey.drinks[0].strAlcoholic;
  const strInstructions = andrey.drinks[0].strInstructions;
  const strYoutube = andrey.drinks[0].strYoutube;
  const strTags = andrey.drinks[0].strTags;
  const ingridients = filterX(andrey.drinks[0]);
  const strArea = andrey.drinks[0].strArea;

  return {
    id, strArea, strFood, strThumb, strCategory, strInstructions, strYoutube, ingridients, strTags,
  };
};

export const convertTypeToData = (type, andrey) => {
  switch (type) {
    case 'comida':
      return dataMeal(andrey);
    case 'bebida':
      return dataCocktail(andrey);
    default:
      return null;
  }
};

export function switchType(type) {
  switch (type) {
    case 'comida':
      return 'themealdb';
    case 'bebida':
      return 'thecocktaildb';
    default:
      return null;
  }
}
