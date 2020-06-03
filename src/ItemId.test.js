import React from 'react';
import { createMemoryHistory } from 'history';
import {
  render, cleanup, wait, fireEvent,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import { randomMeal, randomDrink } from './services/mockResults';
import App from './App';


function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

const mockApi1 = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(randomMeal),
    }))
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(randomDrink),
    }));
}

const mockApi2 = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(randomDrink),
    }))
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(randomMeal),
    }));
}

const mockMeal = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(randomMeal),
    }));
};

const mockDrink = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(randomDrink),
    }));
};

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe('ItemId', () => {
  test('/receitas/comida/52928', async () => {
    mockApi1();
    const {
      getByTestId, getAllByTestId, container, history,
    } = renderWithRouter(
      <App />,
      { route: '/receitas/comida/52928' },
    );
    expect(history.location.pathname).toBe('/receitas/comida/52928');
    const apiMeals = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52928';
    const apiDrinkRandom = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    expect(global.fetch).toHaveBeenCalledWith(apiMeals);
    await wait();
    expect(global.fetch).toHaveBeenCalledWith(apiDrinkRandom);

    fireEvent.click(getByTestId('favorite-btn'));
    expect(localStorage.getItem('favorite-recipes'))
      .toBe('[{"id":"52928","category":"Dessert","image":"https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg","type":"comida"}]');
    fireEvent.click(getByTestId('favorite-btn'));
    expect(localStorage.getItem('favorite-recipes'))
      .toBe('[]');

    expect(getByTestId('recipe-photo').src)
      .toBe('https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg');
    expect(getByTestId('share-btn')).toBeInTheDocument();
    expect(getByTestId('favorite-btn')).toBeInTheDocument();
    expect(getByTestId('recipe-title').innerHTML).toBe('BeaverTails');

    expect(container.querySelector('p[class="type"]').innerHTML).toBe('Dessert');
    const ingrids = getAllByTestId(/ingredient-name/i);
    expect(ingrids[0].innerHTML).toBe('Water');
    expect(ingrids[1].innerHTML).toBe('Yeast');
    expect(ingrids[2].innerHTML).toBe('Sugar');

    const measures = getAllByTestId(/ingredient-measure/i);
    expect(measures[0].innerHTML).toBe(' - 1/2 cup');
    expect(measures[1].innerHTML).toBe(' - 2 parts');
    expect(measures[2].innerHTML).toBe(' - 1/2 cup');

    expect(getByTestId('video').src).toBe('https://www.youtube.com/embed/Ds1Jb8H5Sg8');

    const recomended = getAllByTestId('17245-recomendation-card');
    expect(recomended[0].querySelector('img[class="img-card"]').src)
      .toBe('https://www.thecocktaildb.com/images/media/drink/qwc5f91512406543.jpg');
    expect(recomended[0].querySelector('div[class="categorie-card"]').innerHTML)
      .toBe('Cocktail');
    expect(recomended[0].querySelector('div[class="recipe-card"]').innerHTML)
      .toBe('Rosemary Blue');
    expect(getByTestId('start-recipe-btn').innerHTML).toBe('Iniciar receita');

    fireEvent.click(getByTestId('start-recipe-btn'));
    expect(history.location.pathname).toBe('/receitas/comida/52928/making');
    expect(localStorage.getItem('in-proggress')).toBe('[52928]');
  });

  test('/receitas/bebida/17245', async () => {
    mockApi2();
    const {
      getByTestId,queryByTestId, getAllByTestId, container, history,
    } = renderWithRouter(
      <App />,
      { route: '/receitas/bebida/17245' },
    );
    await wait();

    expect(getByTestId('recipe-photo').src)
      .toBe('https://www.thecocktaildb.com/images/media/drink/qwc5f91512406543.jpg');
    expect(getByTestId('share-btn')).toBeInTheDocument();
    expect(getByTestId('favorite-btn')).toBeInTheDocument();
    expect(getByTestId('recipe-title').innerHTML).toBe('Rosemary Blue');

    expect(container.querySelector('p[class="type"]').innerHTML).toBe('Alcoholic');
    const ingrids = getAllByTestId(/ingredient-name/i);
    expect(ingrids[0].innerHTML).toBe('Gin');
    expect(ingrids[1].innerHTML).toBe('Blue Curacao');

    const measures = getAllByTestId(/ingredient-measure/i);
    expect(measures[0].innerHTML).toBe(' - 50 ml');
    expect(measures[1].innerHTML).toBe(' - 15 ml');

    expect(queryByTestId('video')).not.toBeInTheDocument();

    const recomended = getAllByTestId('52928-recomendation-card');
    expect(recomended[0].querySelector('img[class="img-card"]').src)
      .toBe('https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg');
    expect(recomended[0].querySelector('div[class="categorie-card"]').innerHTML)
      .toBe('Dessert');
    expect(recomended[0].querySelector('div[class="recipe-card"]').innerHTML)
      .toBe('BeaverTails');
    expect(getByTestId('start-recipe-btn').innerHTML).toBe('Iniciar receita');

    localStorage.setItem('in-proggress', '[52928]');
    fireEvent.click(getByTestId('start-recipe-btn'));
    expect(localStorage.getItem('in-proggress')).toBe('[52928,17245]');
  });


  test('/receitas/comida/52928/making', async () => {
    mockMeal();
    const {
      getByTestId, queryByTestId, getAllByTestId, container, history,
    } = renderWithRouter (
      <App />,
      { route: '/receitas/comida/52928/making' },
    );
    expect(history.location.pathname).toBe('/receitas/comida/52928/making');
    await wait();
    expect(getByTestId('recipe-photo').src)
      .toBe('https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg');
    expect(getByTestId('share-btn')).toBeInTheDocument();
    expect(getByTestId('favorite-btn')).toBeInTheDocument();
    expect(getByTestId('recipe-title').innerHTML).toBe('BeaverTails');

    expect(queryByTestId('video')).not.toBeInTheDocument();
    expect(queryByTestId('52928-recomendation-card')).not.toBeInTheDocument();

    expect(getByTestId('start-recipe-btn').disabled).toBe(true);

    const inputs = container.querySelectorAll('input[type="checkbox"]');
    fireEvent.click(inputs[0]);
    expect(localStorage.getItem('proggress')).toBe('{"52928":["0"]}');
    fireEvent.click(inputs[1]);
    expect(localStorage.getItem('proggress')).toBe('{"52928":["0","1"]}');
    fireEvent.click(inputs[2]);
    expect(localStorage.getItem('proggress')).toBe('{"52928":["0","1","2"]}');
    expect(getByTestId('start-recipe-btn').disabled).toBe(false);
    fireEvent.click(inputs[2]);
    expect(localStorage.getItem('proggress')).toBe('{"52928":["0","1"]}');
    fireEvent.click(inputs[2]);
    fireEvent.click(getByTestId('start-recipe-btn'));
    expect(history.location.pathname).toBe('/receitas-feitas');
    expect(localStorage.getItem('done-recipes'))
      .toEqual('[{"id":"52928","category":"Dessert","title":"BeaverTails","image":"https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg","doneDate":"30/4/2020","type":"comida"}]');
  });


  test('/receitas/bebida/17245/making', async () => {
    mockDrink();
    const {
      getByTestId, queryByTestId, getAllByTestId, container, history,
    } = renderWithRouter (
      <App />,
      { route: '/receitas/bebida/17245/making' },
    );
    expect(history.location.pathname).toBe('/receitas/bebida/17245/making');
    await wait();
    expect(getByTestId('recipe-photo').src)
      .toBe('https://www.thecocktaildb.com/images/media/drink/qwc5f91512406543.jpg');
    expect(getByTestId('share-btn')).toBeInTheDocument();
    expect(getByTestId('favorite-btn')).toBeInTheDocument();
    expect(getByTestId('recipe-title').innerHTML).toBe('Rosemary Blue');

    expect(queryByTestId('video')).not.toBeInTheDocument();
    expect(queryByTestId('17245-recomendation-card')).not.toBeInTheDocument();

    expect(getByTestId('start-recipe-btn').disabled).toBe(true);

    const inputs = container.querySelectorAll('input[type="checkbox"]');
    fireEvent.click(inputs[0]);
    expect(localStorage.getItem('proggress')).toBe('{"17245":["0"]}');
    fireEvent.click(inputs[1]);
    expect(localStorage.getItem('proggress')).toBe('{"17245":["0","1"]}');
    expect(getByTestId('start-recipe-btn').disabled).toBe(false);
  });
});
