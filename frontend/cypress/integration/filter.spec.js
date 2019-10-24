import { poisonPokemon } from '../common/poisonPokemon';

describe('Filter', () => {
  beforeEach(() => {
    // Go to website
    cy.fixture('first25pokemon').as('pokemon');
    cy.server();
    cy.route('GET', '/pokemon/?skip=0&sort=id', '@pokemon').as('getPokemon');
    cy.visit(Cypress.config('appUrl'));
  });

  it('gets pokemon of specified type', () => {
    cy.fixture('poisonPokemon').as('poisonPokemon');
    cy.server();
    cy.route('/pokemon/?skip=0&type=poison&sort=id', '@poisonPokemon').as(
      'poison'
    );
    cy.contains('poison').click();
    cy.wait('@poison');
    cy.get('.pokemonName').should('length', 25);
    for (let i = 0; i < 25; i++) {
      cy.get('.pokemonName')
        .eq(i)
        .should('have.text', poisonPokemon[i]);
    }
  });

  it('gets pokemon of multiple specified types', () => {
    cy.server();
    cy.route('/pokemon/?skip=0&type=poison&sort=id').as('poison');
    cy.contains('poison').click();
    cy.wait('@poison');

    cy.route('/pokemon/?skip=0&type=poison&type1=fighting&sort=id').as(
      'poisonAndFighting'
    );
    cy.contains('fighting').click();
    cy.wait('@poisonAndFighting');
  });
});
