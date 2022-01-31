import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const NAME = 'pokemon-name';
const TYPE = 'pokemon-type';
const WEIGHT = 'pokemon-weight';

describe('Testing Pokémon componente', () => {
  it('Should render the correct Pokémon name', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByTestId(NAME);
    expect(pokemon).toHaveTextContent('Pikachu');
  });
  it('Should render the correct Pokémon type', () => {
    renderWithRouter(<App />);
    const type = screen.getByTestId(TYPE);
    expect(type).toHaveTextContent('Electric');
  });
  it('Should render the correct average weight', () => {
    renderWithRouter(<App />);
    const weight = screen.getByTestId(WEIGHT);
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
  });
  it('Should render the correct Pokémon sprite', () => {
    renderWithRouter(<App />);
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const img = screen.getByAltText(/Pikachu sprite/);
    expect(img.src).toContain(url);
  });
  it('Should render the correct link', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/ });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
    // https://stackoverflow.com/questions/57827126/how-to-test-anchors-href-with-react-testing-library
  });
  it('Should redirect to the Pokémon details and change URL', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/ });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });
  it('Should have a star icon if the Pokémon is favorited', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/ });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const favoriteCheck = screen.getByLabelText(/Pokémon favoritado?/);
    userEvent.click(favoriteCheck);
    const icon = screen.getByAltText('Pikachu is marked as favorite');
    expect(icon.src).toContain('/star-icon.svg');
  });
});
test('', () => {});
