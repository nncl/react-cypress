Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-test=${selector}]`);
});

Cypress.Commands.add('containsText', (selector, text) => {
  return cy.get(`[data-test=${selector}]`).contains(text);
});
