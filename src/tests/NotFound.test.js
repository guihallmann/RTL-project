import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testing NotFound component', () => {
  it('Should have an h2 with the text "Page requested not found 😭"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/teste');
    const text = screen.getByRole('heading', { name: /Page requested not found/i });
    const image = screen.getByAltText(/Pikachu crying because the page requested/); // https://testing-library.com/docs/queries/byalttext
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(text).toBeInTheDocument();
    expect(image.src).toContain(url);
  });
});
