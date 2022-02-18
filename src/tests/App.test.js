import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(' Teste o componente <App.js />', () => {
  test('se contém um conjunto fixo de links de navegação.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkHome = screen.getByRole('link', { name: /home/i });
    const linkAbout = screen.getByRole('link', { name: /about/i });
    const linkFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorites).toBeInTheDocument();
  });

  test('se é redirecionada para a página inicial, ao clicar no link Home.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const title = screen.getByRole('heading', {
      name: /encountered pokémons/i, level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  test('se é redirecionada para a página de About, ao clicar no link About.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const titleHome = screen.getByRole('heading', {
      name: /encountered pokémons/i, level: 2,
    });
    expect(titleHome).toBeInTheDocument();
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);
    const titleAbout = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(titleAbout).toBeInTheDocument();
  });

  test('se é redirecionada para Pokémons Favoritados, clicando no link', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const titleHome = screen.getByRole('heading', {
      name: /encountered pokémons/i, level: 2,
    });
    expect(titleHome).toBeInTheDocument();
    const linkFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavorites).toBeInTheDocument();
    userEvent.click(linkFavorites);
    const titleFavorites = screen.getByRole('heading', {
      name: /favorite pokémons/i, level: 2,
    });
    expect(titleFavorites).toBeInTheDocument();
  });

  test('se é redirecionada para a página inicial, ao clicar no link Home.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const titleHome = screen.getByRole('heading', {
      name: /encountered pokémons/i, level: 2,
    });
    expect(titleHome).toBeInTheDocument();
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
    expect(titleHome).toBeInTheDocument();
  });

  test('se é redirecionada para a página Not Found clicando em URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-inexistente');

    const title = screen.getByRole('heading', {
      name: 'Page requested not found Crying emoji', level: 2,
    });
    expect(title).toBeInTheDocument();
  });
});
