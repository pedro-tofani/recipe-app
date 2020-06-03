import React from 'react';
import { fireEvent, cleanup, waitForDomChange } from '@testing-library/react';
import renderWithRouter from './services/renderWithRouter';
import App from './App';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup;
  localStorage.clear();
});

beforeEach(() => {
  localStorage.clear();
})

test('Testing Static Items on RecipesDone', async () => {
  const { getByText, getByTestId, history, getAllByText } = renderWithRouter(<App />);

  history.push('receitas/bebida/12786/making');

  await waitForDomChange();

  expect(getByText(/Thai Iced Tea/i)).toBeInTheDocument();
  const input1 = document.querySelectorAll('input');
  const finishBtn = getByTestId('start-recipe-btn');
  expect(finishBtn).toBeInTheDocument();
  expect(finishBtn).toBeDisabled();
  expect(input1.length).toEqual(5)
  expect(input1[0].checked).toBeFalsy();
  expect(input1[1].checked).toBeFalsy();
  expect(input1[2].checked).toBeFalsy();
  expect(input1[3].checked).toBeFalsy();
  expect(input1[4].checked).toBeFalsy();
  fireEvent.click(input1[0]);
  fireEvent.click(input1[1]);
  fireEvent.click(input1[2]);
  fireEvent.click(input1[3]);
  fireEvent.click(input1[4]);
  expect(input1[0].checked).not.toBeFalsy();
  expect(input1[1].checked).not.toBeFalsy();
  expect(input1[2].checked).not.toBeFalsy();
  expect(input1[3].checked).not.toBeFalsy();
  expect(input1[4].checked).not.toBeFalsy();
  expect(finishBtn).toBeEnabled();
  fireEvent.click(finishBtn);
  expect(history.location.pathname).toEqual('/receitas-feitas');
  await waitForDomChange();
  const subtitle = getAllByText(/Non alcoholic/i);
  const shareBtn = getByTestId('share-btn');
  const btnRecipe = getAllByText(/Thai Iced Tea/i);
  const date = getByText('Feita em: 30/4/2020');
  const imageSrc = document.querySelector('img');
  const btnAll = getByText(/All/i);
  const btnFood = getByText(/Food/i);
  const btnDrinks = getByText(/Drinks/i);
  expect(subtitle[0].innerHTML).toEqual('Non alcoholic');
  expect(subtitle[0]).toBeInTheDocument();
  expect(shareBtn).toBeInTheDocument();
  expect(btnRecipe[0]).toBeInTheDocument();
  expect(btnRecipe[0].innerHTML).toEqual('Thai Iced Tea');
  expect(date).toBeInTheDocument();
  expect(imageSrc.src).toEqual('https://www.thecocktaildb.com/images/media/drink/trvwpu1441245568.jpg');
  expect(imageSrc).toBeInTheDocument();
  expect(btnAll).toBeInTheDocument();
  expect(btnFood).toBeInTheDocument();
  expect(btnDrinks).toBeInTheDocument();
})
