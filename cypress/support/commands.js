Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-cy=${selector}]`);
});

Cypress.Commands.add('containsText', (selector, text) => {
  return cy.get(`[data-cy=${selector}]`).contains(text);
});
