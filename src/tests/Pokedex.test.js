import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import pokemons from '../data';
import App from '../App';

const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

describe('Teste o componente <Pokedex.js />', () => {
  test('se página contém um heading h2 com o texto Encountered pokémons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const titleHome = screen.getByRole('heading', {
      name: /encountered pokémons/i, level: 2,
    });
    expect(titleHome).toBeInTheDocument();
  });

  test('se é exibido o próximo da lista quando o botão Próximo pokémon é clicado', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    // O botão deve conter o texto Próximo pokémon;
    // const buttoTypes = screen.getAllByTestId('pokemon-type-button');
    const buttonNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    // const next = buttonNextPokemon.map((next)=> next === /próximo pokémon/i)
    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    pokemons.forEach((pokemon, index) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(buttonNextPokemon);
      if (pokemons.length - 1 === index) {
        expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
      }
    });
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const img = screen.getAllByRole('img');
    expect(img).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const ALL_BUTTONS = 7;
    const buttonType = screen.getAllByTestId('pokemon-type-button');
    expect(buttonType).toHaveLength(ALL_BUTTONS);

    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    types.forEach((type) => {
      const buttonTypeName = screen.getByRole('button', { name: type });
      userEvent.click(buttonTypeName);
      const filterByType = pokemons.filter((pokemonType) => pokemonType.type === type);
      const buttonNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      filterByType.forEach((pokemon, index) => {
        expect(screen.getByText(pokemon.name)).toBeInTheDocument();
        userEvent.click(buttonNextPokemon);
        if (filterByType.length - 1 === index) {
          expect(screen.getByText(filterByType[0].name)).toBeInTheDocument();
        }
      });
    });

    // O botão All precisa estar sempre visível.
    const all = screen.getByRole('button', { name: /all/i });
    expect(all).toBeInTheDocument();
    const buttonNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(all);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    userEvent.click(buttonNextPokemon);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
});
