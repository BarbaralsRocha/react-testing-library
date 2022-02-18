import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../components/NotFound';

describe('Teste a página contém as informações', () => {
  test('contém um heading h2 com o texto Page requested not found 😭', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const title = screen.getByRole('heading', {
      name: 'Page requested not found Crying emoji',
    });
    expect(title).toBeInTheDocument();
  });

  test('a img com a url requerida.', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(img.src).toBe(URL);
  });
});
