// import '@testing-library/cypress/add-commands'

Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-test=${selector}]`);
});

Cypress.Commands.add('containsText', (selector, text) => {
  return cy.get(`[data-test=${selector}]`).contains(text);
});

Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.visit('/')

    cy.getByDataCy('botao-login').click();
    cy.getByDataCy('email-input').type(email);
    cy.getByDataCy('senha-input').type(password);
    cy.getByDataCy('botao-enviar').click();

    cy.url().should('contain', '/home');
  })
});
