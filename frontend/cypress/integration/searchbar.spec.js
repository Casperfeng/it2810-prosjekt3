describe('Searchbar', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('appUrl'));
  });

  it('accepts input', () => {
    const typeInput = 'mew';
    cy.get('.searchbarInput')
      .type(typeInput)
      .should('have.value', typeInput);
  });

  it('gets pokemon with names containing input', () => {
    const typeInput = 'mew';
    cy.fixture('searchbarMew').as('searchResponse');
    cy.server();
    cy.route('/pokemon/?skip=0&name=mew&sort=id', '@searchResponse').as(
      'search'
    );
    cy.get('.searchbarInput')
      .type(typeInput)
      .should('have.value', typeInput);
    cy.wait('@search');
    cy.get('.pokemonName')
      .should('length', 2)
      .first()
      .should('have.text', 'mewtwo');
    cy.get('.pokemonName')
      .should('length', 2)
      .eq(1)
      .should('have.text', 'mew');
  });

  it('gets pokemon in alphabetical order with name in searchbar', () => {
    cy.server();
    cy.route('/pokemon/?skip=0&sort=name').as('sorted');
    cy.get('.pokemonDropdown').select('A to Z');
    cy.wait('@sorted');
  });
});
