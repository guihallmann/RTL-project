import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing Pokemon Details component', () => {
  it('Should show "Pokemon Name" Details', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByText(/More details/i);
    userEvent.click(pokemonDetails);
    const name = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(name).toHaveTextContent('Pikachu Details');
  });
  it('Should not have a details link', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByText(/More details/i);
    userEvent.click(pokemonDetails);
    expect(pokemonDetails).not.toBeInTheDocument();
  });
  it('Should show the text "Summary" on the details page', () => {
    renderWithRouter(<App />);
    const { summary } = pokemons[0];
    const pokemonDetails = screen.getByText(/More details/i);
    userEvent.click(pokemonDetails);
    const summaryH2 = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    const summaryText = screen.getByText(summary);
    expect(summaryH2).toBeInTheDocument('Summary');
    expect(summaryText).toBeInTheDocument();
  });
  it('Should show "Game Locations of Pokemon Name"', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByText(/More details/i);
    userEvent.click(pokemonDetails);
    const locationText = screen.getByText(/Game Locations of Pikachu/i);
    expect(locationText).toBeInTheDocument();
  });
  it('Show all Pokémon locations', () => {
    renderWithRouter(<App />);
    const { foundAt } = pokemons[0];
    const pokemonDetails = screen.getByText(/More details/i);
    userEvent.click(pokemonDetails);
    foundAt.forEach((local, index) => {
      const location = screen.getByText(local.location);
      const locationMap = screen.getAllByRole('img')[index + 1]; // Consultei a PR do colega Breno para conseguir resolver essa parte
      expect(location).toBeInTheDocument();
      expect(locationMap.src).toContain(local.map);
      expect(locationMap).toHaveAttribute('alt', 'Pikachu location');
    });
  });
  it('Should have a favorite Pokémon checkbox', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText(/More details/i);
    userEvent.click(detailsLink);
    const favoriteCheck = screen.getByLabelText(/Pokémon favoritado?/);
    expect(favoriteCheck).toBeInTheDocument();
  });
  it('Should be able to check the checkbox', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText(/More details/i);
    userEvent.click(detailsLink);
    const favoriteCheck = screen.getByLabelText(/Pokémon favoritado?/);
    userEvent.click(favoriteCheck);
    const icon = screen.getByAltText('Pikachu is marked as favorite');
    expect(icon).toBeInTheDocument();
    userEvent.click(favoriteCheck);
    expect(icon).not.toBeInTheDocument();
  });
});
it('', () => {});
// npx stryker run ./stryker/PokemonDetails.conf.json
