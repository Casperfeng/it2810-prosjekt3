describe('PokemonList and PokemonWordCloud', () => {
  beforeEach(() => {
    // Go to website
    cy.visit(Cypress.config('appUrl'));
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
});
