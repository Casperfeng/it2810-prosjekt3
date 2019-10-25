import { colorFromType } from '../../src/common/constants';
import Color from 'color';
import { pokemon } from '../fixtures/pokemon';

describe('Pokemon list', () => {
  beforeEach(() => {
    // Go to website with known data
    cy.fixture('first25pokemon').as('pokemon');
    cy.server();
    cy.route('GET', '/pokemon/?skip=0&sort=id', '@pokemon').as('getPokemon');
    cy.visit(Cypress.config('appUrl'));
    cy.wait('@getPokemon');
  });

  context('Load more pokemon button', () => {
    it('loads in more pokemon by clicking load button', () => {
      cy.server();
      cy.route('/pokemon/?skip=25&sort=id').as('load1');
      cy.route('/pokemon/?skip=50&sort=id').as('load2');
      cy.route('/pokemon/?skip=75&sort=id').as('load3');
      cy.get('.loadbutton').click();
      cy.wait('@load1');
      cy.get('.loadbutton').click();
      cy.wait('@load2');
      cy.get('.loadbutton').click();
      cy.wait('@load3');
      cy.get('.pokemonName').should('have.length', 100);

      // Checking for a couple of pokemon
      cy.get('.pokemonName')
        .eq(25)
        .should('have.text', 'raichu');
      cy.get('.pokemonName')
        .eq(60)
        .should('have.text', 'poliwhirl');
      cy.get('.pokemonName')
        .eq(98)
        .should('have.text', 'kingler');
    });

    it('is only visible when there is more pokemon to load in', () => {
      cy.server();
      cy.route('/pokemon/?skip=0&type=fire&sort=id').as('getFire');
      cy.route('/pokemon/?skip=0&type=fire&type1=psychic&sort=id').as(
        'getFireAndPsychic'
      );
      cy.route('/pokemon/?skip=25&type=fire&type1=psychic&sort=id').as(
        'getMore'
      );

      // Turn on fire filter and check if button is visible
      cy.contains('fire').click();
      cy.wait('@getFire');
      cy.get('.loadbutton').should('not.be.visible');

      // Turn on psychic filter as well and check if button is visible
      cy.contains('psychic').click();
      cy.wait('@getFireAndPsychic');
      cy.get('.loadbutton').should('be.visible');
      cy.get('.loadbutton').click();
      cy.wait('@getMore');
      cy.get('.loadbutton').should('not.be.visible');
    });
  });

  context('Pokemon modal', () => {
    beforeEach(() => {
      // Avoid actually affecting views in database by using fixture
      cy.fixture('incrementViews').as('putResponse');
      cy.server();
      cy.route('PUT', '/pokemon/1', '@putResponse').as('incViews');
    });

    it('shows modal if a pokemon item is clicked', () => {
      cy.get('.pokemonItemContainer')
        .first()
        .click();
      cy.get('.pokemonModal').should('be.visible');
    });

    it('shows correct name, id and type (for pokemon with 1 type)', () => {
      const pokemonId = 10;
      const selectedPokemon = pokemon[pokemonId - 1];
      const number = '010';
      cy.get('.pokemonItemContainer')
        .eq(pokemonId - 1)
        .click();
      cy.get('.pokemonText').should(
        'have.text',
        selectedPokemon.name + ' #' + number
      );
      cy.get('.pokemonType')
        .first()
        .should('have.text', selectedPokemon.types[0]);
      if (selectedPokemon.types.length == 2) {
        cy.get('.pokemonType')
          .eq(1)
          .should('have.text', selectedPokemon.types[1]);
      }
      cy.get('.pokemonImage')
        .should('have.attr', 'src')
        .should(
          'include',
          'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + number
        );
    });

    it('shows correct name, id and type (for pokemon with 2 types)', () => {
      const pokemonId = 1;
      const selectedPokemon = pokemon[pokemonId - 1];
      const number = '001';

      cy.get('.pokemonItemContainer')
        .eq(pokemonId - 1)
        .click();
      cy.get('.pokemonText').should(
        'have.text',
        selectedPokemon.name + ' #' + number
      );
      cy.get('.pokemonType')
        .first()
        .should('have.text', selectedPokemon.types[0]);
      if (selectedPokemon.types.length == 2) {
        cy.get('.pokemonType')
          .eq(1)
          .should('have.text', selectedPokemon.types[1]);
      }
      cy.get('.pokemonImage')
        .should('have.attr', 'src')
        .should(
          'include',
          'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + number
        );
    });

    it('shows correct stats', () => {
      const id = 22;
      const stats = pokemon[id - 1].stats;

      const statNames = [
        'HP',
        'Attack',
        'Defence',
        'Sp. Atk',
        'Sp. Def',
        'Speed'
      ];

      cy.get('.pokemonItemContainer')
        .eq(id - 1)
        .click();

      let i = 0;
      for (const stat of Object.keys(stats)) {
        cy.get('.pokemonStatText')
          .eq(i)
          .should('have.text', statNames[i]);
        cy.get('.progressBar')
          .eq(i)
          .should('have.text', stats[i].toString());
        i++;
      }
    });

    it('sends PUT request to increment views on click', () => {
      cy.get('.pokemonItemContainer')
        .first()
        .click();
      cy.wait('@incViews');
    });

    it('uses correct background colors on types', () => {
      cy.get('.pokemonItemContainer')
        .first()
        .click();

      // Test on a pokemon
      cy.get('.pokemonType')
        .eq(0)
        .should('have.css', 'background-color')
        .and('eq', Color(colorFromType['grass']).toString());
      cy.get('.pokemonType')
        .eq(1)
        .should('have.css', 'background-color')
        .and('eq', Color(colorFromType['poison']).toString());
    });

    it('closes the modal on click of x', () => {
      cy.get('.pokemonItemContainer')
        .first()
        .click();
      cy.get('.modalCloseButton').click();
      cy.get('.pokemonModal').should('not.be.visible');
    });

    it('increments views each time pokemon is clicked', () => {
      // Open modal
      cy.get('.pokemonItemContainer')
        .first()
        .click();
      cy.wait('@incViews');
      cy.get('.viewsText').should('have.text', '283');

      // Close modal
      cy.get('.modalCloseButton').click();

      // Open modal
      cy.get('.pokemonItemContainer')
        .first()
        .click();
      cy.wait('@incViews');
      cy.get('.viewsText').should('have.text', '284');
    });
  });

  context('Pokemon list item', () => {
    it('shows correct image', () => {
      for (let i; i < 25; i++) {
        cy.get('.pokemonSprite')
          .first()
          .should('have.attr', 'src')
          .should(
            'include',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
              i +
              '.png'
          );
      }
    });

    it('shows correct name', () => {
      for (let i; i < 25; i++) {
        cy.get('.pokemonName').should('have.text', pokemon[i].name);
      }
    });
  });
});
