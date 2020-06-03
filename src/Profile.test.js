import React from 'react';
import { fireEvent, cleanup, waitForDomChange } from '@testing-library/react';
import renderWithRouter from './services/renderWithRouter';
import App from './App';

afterEach(cleanup);

describe('Testing profile page and footer', () => {

  test('Testing footer', async () => {
    const { getByText, getByTestId } = renderWithRouter(
      <App />, {
      route: '/comidas',
    });
    const drinksBtn = getByTestId('drinks-bottom-btn');
    const mealsBtn = getByTestId('food-bottom-btn');
    const exploreBtn = getByTestId('explore-bottom-btn');
    await waitForDomChange();

    fireEvent.click(drinksBtn);
    await waitForDomChange();
    expect(getByText('Bebidas')).toBeInTheDocument();

    fireEvent.click(mealsBtn);
    await waitForDomChange();
    expect(getByText('Comidas')).toBeInTheDocument();

    fireEvent.click(exploreBtn);
    expect(getByText('Explorar')).toBeInTheDocument();

  });


  test('Testing profile page', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <App />, {
      route: '/',
    });
    const email = getByTestId("email-input");
    const pass = getByTestId("password-input");
    const btn = getByTestId("login-submit-btn");
    fireEvent.change(email, { target: { value: "teste@test.com" } });
    fireEvent.change(pass, { target: { value: "123456789" } });
    fireEvent.click(btn);
    const profileLink = getByTestId('profile-top-btn');
    fireEvent.click(profileLink);
    expect(getByText('teste@test.com')).toBeInTheDocument();
    const rDone = getByText('Receitas Feitas');
    expect(rDone).toBeInTheDocument();
    const rFavorites = getByText('Receitas Favoritas');
    expect(rFavorites).toBeInTheDocument();
    const rExit = getByText('Sair');
    expect(rExit).toBeInTheDocument();
    fireEvent.click(rExit);
    expect(getByText(/login/i)).toBeInTheDocument();
  });

});
