import { faker as fakerPT_BR } from '@faker-js/faker/locale/pt_BR';

describe('User Settings spec', () => {
  const newUser = {
    name: fakerPT_BR.name.fullName(),
    email: fakerPT_BR.internet.email(),
    password: fakerPT_BR.internet.password()
  };

  it('should let user update their data', () => {
    cy.fixture('users').as('users');

    cy.get('@users').then(([{ email, senha, nome }]) => {
      cy.login(email, senha);

      cy.visit('/home');
      cy.url().should('contain', '/home');

      cy.contains(nome).should('be.visible');

      cy.getByDataCy('app-home').find('a').eq(1).click();
      cy.url().should('contain', '/minha-conta');

      cy.getByDataCy('botao-salvar-alteracoes').should('be.disabled');

      cy.get('[name="nome"]').type(newUser.name);
      cy.get('[name="senha"]').type(newUser.password);

      cy.getByDataCy('botao-salvar-alteracoes').should('not.be.disabled');
      cy.getByDataCy('botao-salvar-alteracoes').click();
    });
  });
});