import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Testing About component', () => {
  it('Should have an h2 with the text "About Pokédex"', () => {
    renderWithRouter(<About />);
    const aboutText = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(aboutText).toBeInTheDocument();
  });
  it('Should have two <p> with text', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex/i); // Dica Lucas Petzinger, só precisamos de parte da frase para ele achar o elemento
    const p2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });
  it('Should have an specific image', () => {
    renderWithRouter(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img');
    expect(image.src).toContain(url); // https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
  });
});
