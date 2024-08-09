import { isMobile } from '../support/utils';

describe('Testing multiple pages', () => {
  it('should access card page', () => {
    cy.login(Cypress.env('email'), Cypress.env('senha'));

    cy.visit('/home');
    cy.location('pathname').should('eq', '/home');

    if (isMobile()) {
      cy.getByDataCy('menu-burguer').should('be.visible');
      cy.getByDataCy('menu-burguer').click();
      cy.getByDataCy('menu-lateral').find('a').eq(2).click();
    } else {
      cy.getByDataCy('app-home').find('a').eq(2).click();
    }

    cy.getByDataCy('titulo-cartoes').should('exist').and('have.text', 'Meus cartões');
    cy.location('pathname').should('eq', '/home/cartoes');
  });
});
