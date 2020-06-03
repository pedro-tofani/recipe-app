import React from 'react';
import { fireEvent, cleanup, waitForDomChange, queryAllByAltText, queryByText } from '@testing-library/react';
import renderWithRouter from './services/renderWithRouter';
import App from './App';
import {
  listFiltersMeal, randomMeal, searchByIng, searchByName, searchByFirstLetter, randomDrink,
} from './services/mockResults';

afterEach(cleanup);

const mockMultipleAPI = (result1ToBeMocked, result2ToBeMocked) => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        console.log('primeiro mock');
        return Promise.resolve(result1ToBeMocked)
      },
    }))
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        console.log('segundo mock');
        return Promise.resolve(result2ToBeMocked)
      },
    }));
}

const mockResultsAPI = (resultToBeMocked) => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        return Promise.resolve(resultToBeMocked)
      },
    }));
};

const mockTripleAPI = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        console.log('primeiro mock');
        return Promise.resolve(randomMeal)
      },
    }))
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        console.log('segundo mock');
        return Promise.resolve(randomMeal)
      },
    }))
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        console.log('terceiro mock');
        return Promise.resolve(randomDrink)
      },
    }));
}

describe('Testing Header', () => {
  mockMultipleAPI(listFiltersMeal, randomMeal);
  test('Testing Header', async () => {
    const { getByText, getByTestId, queryByText } = renderWithRouter(
      <App />, {
      route: '/comidas',
    });

    expect(getByText("Comidas")).toBeInTheDocument();
    await waitForDomChange();

    const btnSearch = getByTestId("search-top-btn");
    fireEvent.click(btnSearch);
    expect(getByText("Faça sua pesquisa")).toBeInTheDocument();

    const inpSearch = getByTestId("search-input");
    const radioBtn = getByTestId("radio-value");
    const ingBtn = getByTestId("ingredient-search-radio");
    const nameBtn = getByTestId("name-search-radio");
    const firstBtn = getByTestId("first-letter-search-radio");
    expect(inpSearch).toBeInTheDocument();
    expect(radioBtn).toBeInTheDocument();
    expect(ingBtn).toBeInTheDocument();
    expect(nameBtn).toBeInTheDocument();
    expect(firstBtn).toBeInTheDocument();

    mockResultsAPI(searchByIng);
    fireEvent.click(ingBtn);
    console.log(radioBtn);
    fireEvent.change(inpSearch, { target: { value: "chicken" } });
    await waitForDomChange();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
    searchByIng.meals.map(({ strMeal }) => {
      expect(getByText(strMeal)).toBeInTheDocument();
    })

    mockResultsAPI(searchByName);

    fireEvent.click(nameBtn);
    fireEvent.change(inpSearch, { target: { value: "pie" } });
    await waitForDomChange();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=pie');
    searchByName.meals.map(({ strMeal }) => {
      expect(getByText(strMeal)).toBeInTheDocument();
    });

    mockResultsAPI(searchByFirstLetter);

    fireEvent.click(firstBtn);
    fireEvent.change(inpSearch, { target: { value: "abc" } });
    await waitForDomChange();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=a');
    searchByFirstLetter.meals.map(({ strMeal }) => {
      expect(getByText(strMeal)).toBeInTheDocument();
    });

    mockTripleAPI();

    fireEvent.click(nameBtn);
    fireEvent.change(inpSearch, { target: { value: "Beaver" } });
    await waitForDomChange();
    expect(getByText('BeaverTails')).toBeInTheDocument();

  });
});
