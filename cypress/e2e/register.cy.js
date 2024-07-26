describe('Register Form Testing', () => {
  const user = {
    name: 'John wick',
    email: 'john@witkc.com',
    password: 'john890'
  };

  it('should allow a user to register', () => {
    cy.visit('/');

    cy.getByDataCy('botao-cadastro').click();

    cy.getByDataCy('nome-input').type(user.name);
    cy.getByDataCy('email-input').type(user.email);
    cy.getByDataCy('senha-input').type(user.password);
    cy.getByDataCy('checkbox-input').check();

    cy.getByDataCy('botao-enviar').click();

    cy.getByDataCy('mensagem-sucesso').should('contain.text', 'Cadastro realizado com sucesso!');

    cy.request('GET', '/users').then(response => {
      expect(response.body).to.have.lengthOf.at.least(1);
      expect(response.body[response.body.length - 1 ]).to.deep.include(user);
    })
  });
});
