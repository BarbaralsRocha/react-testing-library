import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Teste a página contém as informações', () => {
  test('mensagem No favorite pokemon found, se não tiver pokémons favoritos.', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );
    const notFoundMessage = screen.getByText('No favorite pokemon found');
    expect(notFoundMessage).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons pokemons={ pokemons } />
      </MemoryRouter>,
    );
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
