describe('User Journeys', () => {
  it('should access the app, create a transaction and logout', () => {
    cy.visit('/');

    cy.getByDataCy('botao-login').click();
    cy.getByDataCy('email-input').type('hello2@world.com');
    cy.getByDataCy('senha-input').type('123456');
    cy.getByDataCy('botao-enviar').click();

    cy.location('pathname').should('eq', '/home');

    cy.getByDataCy('select-opcoes').select('Transferência');
    cy.getByDataCy('form-input').type('99.99');
    cy.getByDataCy('realiza-transacao').click();

    cy.getByDataCy('lista-transacoes').find('li').last().contains('- R$ 99.99');

    cy.getByDataCy('botao-sair').click();

    cy.location('pathname').should('eq', '/');
  })

  it('should create an account and login', () => {
    const user = {
      name: 'John Wick',
      email: `hello${Math.random()}@world.com`,
      password: '123456'
    }

    cy.visit('/');

    cy.getByDataCy('botao-cadastro').click();
    cy.getByDataCy('nome-input').type(user.name);
    cy.getByDataCy('email-input').type(user.email);
    cy.getByDataCy('senha-input').type(user.password);
    cy.getByDataCy('botao-enviar').click();

    cy.getByDataCy('mensagem-sucesso').should('exist').and('have.text', 'Usuário cadastrado com sucesso!');

    cy.getByDataCy('botao-login').click();
    cy.getByDataCy('email-input').type(user.email);
    cy.getByDataCy('senha-input').type(user.password);
    cy.getByDataCy('botao-enviar').click();

    cy.location('pathname').should('eq', '/home');
  });
})
