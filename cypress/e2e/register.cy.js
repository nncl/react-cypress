import { fakerPT_BR } from '@faker-js/faker';

describe('Register Form Testing', () => {
  const user = {
    name: fakerPT_BR.person.firstName(),
    email: fakerPT_BR.internet.email(),
    password: fakerPT_BR.internet.password(),
  };

  it('should allow a user to register', () => {
    cy.visit('/');

    cy.getByDataCy('botao-cadastro').click();

    cy.getByDataCy('nome-input').type(user.name);
    cy.getByDataCy('email-input').type(user.email);
    cy.getByDataCy('senha-input').type(user.password);
    cy.getByDataCy('checkbox-input').check();

    cy.getByDataCy('botao-enviar').click();

    cy.getByDataCy('mensagem-sucesso').should('exist', 'Usuário cadastrado com sucesso!');

    cy.request('GET', 'http://localhost:8000/users').then(response => {
      expect(response.body).to.have.lengthOf.at.least(1);
      expect(response.body[response.body.length - 1 ]).to.deep.include(user);
    })
  });
});
