import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import pokemons from '../data';
import { Pokemon } from '../components';
import renderWithRouter from '../renderWithRouter';

const { name, type, averageWeight: { value, measurementUnit } } = pokemons[0];

describe('Teste a página contém as informações', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon.textContent).toBe(name);
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon.textContent).toBe(type);
    const weigthPokemon = screen.getByTestId('pokemon-weight');
    const avarage = `Average weight: ${value} ${measurementUnit}`;
    expect(weigthPokemon.textContent).toBe(avarage);
    const URL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const image = screen.getByRole('img', { name: `${name} sprite` });
    expect(image.src).toBe(URL);
  });

  test('se  contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    const { id } = pokemons[0];
    render(
      <MemoryRouter>
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite={ false }
        />
      </MemoryRouter>,
    );
    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    expect(details).toHaveAttribute('href', `/pokemons/${id}`);
  });

  test('se é feito o redirecionamento para a página de detalhes de Pokémon.', () => {
    const { id } = pokemons[0];
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    history.push(`/pokemons/${id}`);
  });

  test(' Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    render(
      <MemoryRouter>
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite
        />
      </MemoryRouter>,
    );
    const image = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(image).toHaveAttribute('src', '/star-icon.svg');
  });
});
