import { colorFromType } from '../../src/common/constants';
import Color from 'color';
import { types } from '../fixtures/types';

describe('Start Page', () => {
  it('gets correct pokemon at starting page', () => {
    // Go to website
    cy.fixture('first25pokemon').as('pokemon');
    cy.server();
    cy.route('GET', '/pokemon/?skip=0&sort=id', '@pokemon').as('getPokemon');
    cy.visit(Cypress.config('appUrl'));
    cy.wait('@getPokemon');
  });

  it('has all types as buttons with correct color and text', () => {
    for (let i = 0; i < types.length; i++) {
      const expectedType = types[i];
      const expectedColor = Color(colorFromType[types[i]]).toString();
      cy.get('.filterButton')
        .eq(i)
        .should('have.text', expectedType)
        .and('have.css', 'background-color')
        .and('eq', expectedColor);
    }
  });

  it('has load more button', () => {
    cy.get('.loadbutton').should('be.visible');
  });

  it('has searchbar', () => {
    cy.get('.searchbar').should('be.visible');
  });
});
