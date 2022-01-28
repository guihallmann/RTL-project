import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testing App component', () => {
  it('Should have home, about and favorites links', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });
  // it('Should redirect to "/" when clicking the home link', () => {
  //   const { history } = renderWithRouter(<App />);
  //   const linkHome = screen.getByRole('link', { name: 'Home' });
  //   userEvent.click(linkHome);
  //   history.push('/');
  //   const { pathname } = history.location;
  //   expect(pathname).toBe('/');
  // });
});

// it('', () => {});
