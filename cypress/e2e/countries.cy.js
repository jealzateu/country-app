/// <reference types="cypress" />

describe('Countries App E2E - flujo completo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/countries/list');
  });

  it('buscar país, ir a detalle, volver a lista, y toggle favorito', () => {
    // Buscar país "France"
    cy.get('app-search-input input').type('France');
    cy.wait(500); // esperar debounce

    // Ver que aparece el país "France"
    cy.contains('.country-list-item h2', 'France').should('exist');

    // Marcar favorito
    cy.contains('.country-list-item', 'France')
      .find('app-favorite-toggle button')
      .click()
      .should('have.attr', 'aria-pressed', 'true');

    // Desmarcar favorito
    cy.contains('.country-list-item', 'France')
      .find('app-favorite-toggle button')
      .click()
      .should('have.attr', 'aria-pressed', 'false');

    // Click en botón "Ver detalle" de France
    cy.contains('.country-list-item', 'France')
      .find('button.view-detail-btn')
      .click();

    // Verificar URL detalle
    cy.url().should('match', /\/countries\/country\/FR$/i);

    // Ver nombre país en detalle
    cy.get('h1#countryName').should('contain.text', 'France');

    // Click en botón "Volver a la lista"
    cy.get('button.back-button').click();

    // Ver que estamos en la lista de nuevo
    cy.url().should('include', '/countries/list');
  });
});
