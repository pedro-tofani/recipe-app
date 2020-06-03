import React from 'react';
import renderWithRouter from './services/renderWithRouter';
import { fireEvent } from '@testing-library/react';
import App from './App';

describe('Testing login page', () => {
  test('Testing all inputs', () => {
    const route = '/';
    const { getByText, getByTestId } = renderWithRouter(<App />, { route });
    const login = getByText(/login/i);
    const email = getByTestId("email-input");
    const pass = getByTestId("password-input");
    const btn = getByTestId("login-submit-btn");
    expect(login).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(pass).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(btn.disabled).toBeTruthy();
    fireEvent.change(email, { target: { value: "teste" } });
    fireEvent.change(pass, { target: { value: "123456789" } });
    expect(btn.disabled).toBeTruthy();
    fireEvent.change(email, { target: { value: "teste@test.com" } });
    fireEvent.change(pass, { target: { value: "123456" } });
    expect(btn.disabled).toBeTruthy();
    fireEvent.change(pass, { target: { value: "1234567" } });
    expect(btn.disabled).toBeFalsy();
    fireEvent.click(btn);
    const lsMeals = localStorage.getItem("meals-token");
    const lsDrinks = localStorage.getItem("cocktails-token");
    const user = localStorage.getItem("user");
    expect(lsMeals).toBe("1");
    expect(lsDrinks).toBe("1");
    expect(user).toBe( "{\"email\":\"teste@test.com\"}");
    expect(getByText("Comidas")).toBeInTheDocument();
  });
});
