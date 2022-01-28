import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testing FavoritePokemons component', () => {
  it('Should show "No favorite pokemon found" if the list is empty ', () => {
    renderWithRouter(<FavoritePokemons />);
    const noPoke = screen.getByText(/No favorite pokemon found/i);
    expect(noPoke).toBeInTheDocument();
  });
  it('Should show all favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonDetails = screen.getByText(/More details/i);
    userEvent.click(pokemonDetails);
    const favoriteCheck = screen.getByLabelText(/Pokémon favoritado?/);
    userEvent.click(favoriteCheck);
    history.push('/favorites');
    const cards = screen.getAllByTestId('pokemon-name');
    expect(cards).toHaveLength(1);
  });
});
it('', () => {});
