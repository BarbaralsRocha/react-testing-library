import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

const URL_POKEMON = '/pokemons/25';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Se as informações detalhadas do Pokémon selecionado são mostrada.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL_POKEMON);

    const pokemonDetailTitle = screen.getByText(/Pikachu Details/i);
    expect(pokemonDetailTitle).toBeInTheDocument();

    const details = screen.queryByRole('link', { name: /more details/i });
    expect(details).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summary).toBeInTheDocument();

    const infosPokemon = screen.getByText(pokemons[0].summary);
    expect(infosPokemon).toBeInTheDocument();
  });

  test('Se existe na página uma seção com os mapas contendo as localizações', () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL_POKEMON);

    const location = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    expect(location).toBeInTheDocument();

    pokemons[0].foundAt.forEach((pokLocation, index) => {
      const locationPikachu = screen.getByText(pokLocation.location);
      expect(locationPikachu).toBeInTheDocument();
      const URL = pokLocation.map;
      const image = screen.getAllByRole('img', { name: /Pikachu location/i });
      expect(image[index].src).toBe(URL);
    });
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(URL_POKEMON);
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);

    const image = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(image).toHaveAttribute('src', '/star-icon.svg');
  });
});
