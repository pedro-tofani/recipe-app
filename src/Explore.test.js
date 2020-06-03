import React from 'react';
import { fireEvent, cleanup, waitForDomChange } from '@testing-library/react';
import renderWithRouter from './services/renderWithRouter';
import App from './App';
import {
  ingredientsResults, areaResults,
  americanArea, randomMeal, randomDrink, lookupIngDrink
} from './services/mockResults';

afterEach(cleanup);

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

const mockMultipleAPI = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        return Promise.resolve(randomDrink)
      },
    }))
    .mockImplementationOnce(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        return Promise.resolve(lookupIngDrink)
      },
    }))
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        return Promise.resolve(randomMeal)
      },
    }));
}

describe('Testing explore page', () => {
  test('Testing first page of explore', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <App />, {
      route: '/explorar',
    });

    const btnExploreMeal = getByTestId("explore-food");
    const btnExploreDrink = getByTestId("explore-drinks");

    expect(btnExploreMeal).toBeInTheDocument();
    expect(btnExploreDrink).toBeInTheDocument();

    fireEvent.click(btnExploreMeal);
    expect(getByText("Por local de origem")).toBeInTheDocument();
    expect(getByText("Me surpreenda!")).toBeInTheDocument();
    expect(getByText("Explorar - Comidas")).toBeInTheDocument();
    expect(getByText("Por ingredientes")).toBeInTheDocument();
  });

  test('Testing drink page of explore', () => {
    const { getByText, queryByText, getByTestId } = renderWithRouter(
      <App />, {
      route: '/explorar',
    });

    const btnExploreDrink = getByTestId("explore-drinks");
    fireEvent.click(btnExploreDrink);

    expect(queryByText("Por local de origem")).toBeNull()
    expect(getByText("Me surpreenda!")).toBeInTheDocument();
    expect(getByText("Explorar - Bebidas")).toBeInTheDocument();
    expect(getByText("Por ingredientes")).toBeInTheDocument();
  });

  test('Testing ingredients page explore', async () => {
    const { getByText, getByTestId, queryByText, getAllByText } = renderWithRouter(
      <App />, {
      route: '/explorar/comidas',
    });

    mockResultsAPI(ingredientsResults);

    const btnByIng = getByTestId("explore-by-ingredient");
    expect(btnByIng).toBeInTheDocument();
    fireEvent.click(btnByIng);
    await waitForDomChange();
    expect(getByText("Explorar ingredientes")).toBeInTheDocument();
    expect(getByText("Chicken")).toBeInTheDocument();
    expect(getByText("Salmon")).toBeInTheDocument();
    expect(getByText("Beef")).toBeInTheDocument();
    expect(queryByText("Pork")).toBeNull();
    fireEvent.click(getAllByText(/Ver Receitas!/i)[0]);
    expect(getByText("Comidas")).toBeInTheDocument();
  });

  test('Testing by area page explore', async () => {
    const { getByText, getByTestId, queryByText, queryAllByText } = renderWithRouter(
      <App />, {
      route: '/explorar/comidas',
    });

    mockResultsAPI(areaResults);

    const btnByArea = getByTestId("explore-by-area");
    expect(btnByArea).toBeInTheDocument();
    fireEvent.click(btnByArea);
    await waitForDomChange();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    expect(getByText("Explorar area")).toBeInTheDocument();
    const btnDropdown = getByTestId("explore-by-area-dropdown");
    expect(btnDropdown).toBeInTheDocument();

    mockResultsAPI(americanArea);

    fireEvent.change(btnDropdown, { target: { value: "American" } });
    await waitForDomChange();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?a=American');
    expect(getByText("Banana Pancakes")).toBeInTheDocument();
    expect(getByText("BBQ Pork Sloppy Joes with Pickled Onion & Sweet Potato Wedges")).toBeInTheDocument();
    expect(getByText("Beef Brisket Pot Roast")).toBeInTheDocument();
    expect(queryByText("Big Mac")).toBeNull();

    mockResultsAPI(randomMeal);

    fireEvent.change(btnDropdown, { target: { value: "All areas" } });
    await waitForDomChange();
    expect(queryAllByText(/BeaverTails/i)).toBeDefined();
    expect(queryAllByText(/BeaverTails/i).length).toBe(12);
  });

  test('Testing surprise me', async () => {
    mockMultipleAPI()
    const { getByText, getByTestId, queryByText, queryAllByText } = renderWithRouter(
      <App />, {
      route: '/explorar/bebidas',
    });

    const btnSurprise = getByTestId("explore-surprise");
    expect(btnSurprise).toBeInTheDocument();
    fireEvent.click(btnSurprise);
    await waitForDomChange();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/random.php');

    expect(getByText('Margarita')).toBeInTheDocument();
    expect(getByText('Ingredients')).toBeInTheDocument();
    expect(getByText(/Rub the rim /i)).toBeInTheDocument();
    expect(queryAllByText('BeaverTails')).toBeDefined();
    expect(queryAllByText('BeaverTails').length).toBe(6);
  });
});
