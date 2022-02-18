import { screen, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import About from '../components/About';

describe('Teste a página contém as informações sobre a Pokédex.', () => {
  test('contém um heading h2 com o texto About Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const title = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(title).toBeInTheDocument();
  });

  test('contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const findSameWords = screen.getAllByText(/pokémons/i);
    expect(findSameWords).toHaveLength(2);
  });

  test('a img com a url requerida.', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img.src).toBe(URL);
  });
});
