import { fakerPT_BR } from '@faker-js/faker';

describe('User Settings spec', () => {
  const newUser = {
    name: fakerPT_BR.person.fullName(),
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
    });
  });
});
