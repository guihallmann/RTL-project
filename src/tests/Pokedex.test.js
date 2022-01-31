import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const totalFilterButtons = 7;

describe('Testing Pokedex component', () => {
  it('Should have an h2 with text "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const text = screen.getByRole('heading', { name: /Encountered pokémons/, level: 2 });
    expect(text).toBeInTheDocument();
  });
  it('Should show next Pokémon on the list when clicking "Próximo Pokémon"', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByTestId('next-pokemon');
    expect(nextBtn).toBeInTheDocument();
    userEvent.click(nextBtn);
    const nextPokemon = screen.getByTestId('pokemon-name');
    expect(nextPokemon).toHaveTextContent('Charmander');
  });
  it('Should show only one Pokémon at a time', () => {
    renderWithRouter(<App />);
    const card = screen.getAllByTestId('pokemon-name');
    expect(card).toHaveLength(1);
  });
  it('Should have buttons for every Pokémon type', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByTestId('next-pokemon');
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const allButton = screen.getByRole('button', { name: /All/ });
    expect(buttons).toHaveLength(totalFilterButtons);
    userEvent.click(buttons[1]);
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Fire');
    expect(buttons[1]).toHaveTextContent('Fire');
    userEvent.click(nextBtn);
    expect(type).toHaveTextContent('Fire');
    expect(buttons[1]).toHaveTextContent('Fire');
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
