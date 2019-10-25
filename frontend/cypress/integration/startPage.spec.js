import { colorFromType } from '../../src/common/constants';
import Color from 'color';
import { types } from '../fixtures/types';

describe('Start Page', () => {
  it('gets correct pokemon at starting page', () => {
    // Go to website and fetch from correct end-point
    cy.server();
    cy.route('GET', '/pokemon/?skip=0&sort=id').as('getPokemon');
    cy.visit(Cypress.config('appUrl'));
    cy.wait('@getPokemon');
  });

  context('Elements on start page', () => {
    beforeEach(() => {
      // Go to website with known data
      cy.fixture('first25pokemon').as('pokemon');
      cy.server();
      cy.route('GET', '/pokemon/?skip=0&sort=id', '@pokemon').as('getPokemon');
      cy.visit(Cypress.config('appUrl'));
      cy.wait('@getPokemon');
    });

    it('has all types as buttons with correct color and text', () => {
      cy.contains('Filter by:').should('be.visible');
      cy.get('.filterButton').should('have.length', types.length);
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

    it('has searchbar and dropdown with correct options', () => {
      cy.get('.searchbar').should('be.visible');
      cy.get('.pokemonDropdown').should('be.visible');
      cy.get('.pokemonDropdown')
        .children()
        .should('have.length', 6);
      const options = [
        'Lowest to highest id',
        'Highest to lowest id',
        'A to Z',
        'Z to A',
        'Least popular',
        'Most popular'
      ];
      for (let i = 0; i < 6; i++) {
        cy.get('.pokemonDropdown')
          .children()
          .eq(i)
          .should('have.text', options[i]);
      }
    });

    it('has correct content selector button', () => {
      cy.get('.contentSelectorButtons').should('have.length', 1);
      cy.contains('Show pokemon').should('not.be.visible');
      cy.contains('Show word cloud').should('be.visible');
    });
  });
});
