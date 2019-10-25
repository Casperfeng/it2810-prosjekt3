import { first25pokemon } from '../fixtures/first25pokemon';
import { popularPokemon } from '../fixtures/popularPokemon';

describe('PokemonList and PokemonWordCloud', () => {
  beforeEach(() => {
    // Go to website with known data
    cy.fixture('first25pokemon').as('pokemon');
    cy.server();
    cy.route('/pokemon/?skip=0&sort=id', '@pokemon').as('getPokemon');
    cy.visit(Cypress.config('appUrl'));
    cy.wait(100);
    cy.wait('@getPokemon');
  });

  it('shows word cloud after clicking corresponding button', () => {
    cy.contains('Show word cloud').click();
    cy.get('.wordCloud').should('be.visible');
    cy.get('.dropDownListContainer').should('not.be.visible');
  });

  it('shows list of pokemon after clicking corresponding button', () => {
    cy.contains('Show word cloud').click();
    cy.contains('Show pokemon').click();
    cy.get('.wordCloud').should('not.be.visible');
    cy.get('.pokemonDropdown').should('be.visible');
  });

  it('shares the same pokemon after filtering', () => {
    const length = 14;
    cy.server();
    cy.fixture('grassPokemon').as('grassPokemon');
    cy.route('/pokemon/?skip=0&type=grass&sort=id', '@grassPokemon').as(
      'getGrass'
    );
    cy.contains('Show word cloud').click();
    cy.contains('grass').click();
    cy.wait('@getGrass');
    cy.get('.wordCloud')
      .children()
      .children()
      .children()
      .children()
      .should('have.length', length);
    cy.contains('Show pokemon').click();
    cy.get('.pokemonListContainer')
      .children()
      .should('have.length', length);
  });

  it('shares the same pokemon after sorting', () => {
    cy.fixture('popularPokemon').as('popular');
    cy.route('/pokemon/?skip=0&sort=viewsDESC', '@popular').as(
      'getPopularPokemon'
    );
    cy.get('.pokemonDropdown').select('Most popular');
    cy.wait('@getPopularPokemon');

    // Check pokemon list
    cy.get('.pokemonListContainer')
      .children()
      .should('have.length', popularPokemon.length);
    for (let i = 0; i < popularPokemon.length; i++) {
      cy.get('.pokemonListContainer').contains(popularPokemon[i].name);
    }

    // Check word cloud
    cy.contains('Show word cloud').click();
    cy.wait(100);
    for (let i = 0; i < popularPokemon.length; i++) {
      cy.get('.wordCloud').contains(popularPokemon[i].name);
    }
  });

  context('Pokemon Word Cloud', () => {
    it('contains correct pokemon names', () => {
      cy.contains('Show word cloud').click();
      cy.get('.wordCloud')
        .children()
        .children()
        .children()
        .children()
        .should('have.length', 25);
      for (let i = 0; i < 25; i++) {
        cy.get('.wordCloud').contains(first25pokemon[i].name);
      }
    });
  });
});
