describe('LoginForm spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should access homepage', () => {
    cy.login('hello@world.com', '123456')
    cy.visit('/home')

    cy.getByDataCy('titulo-boas-vindas').should('contain', 'Bem vindo de volta');
  })

  it('should NOT submit form when e-mail is invalid', () => {
    cy.getByDataCy('botao-login').click();
    cy.getByDataCy('email-input').type('damn@bro');
    cy.getByDataCy('senha-input').type('123456');

    cy.getByDataCy('botao-enviar').click();

    cy.getByDataCy('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido');
  })

  it('should NOT allow an empty e-mail', () => {
    cy.getByDataCy('botao-login').click();
    // cy.getByDataCy('email-input').type(''); NO NEED
    cy.getByDataCy('senha-input').type('123456');

    cy.getByDataCy('botao-enviar').click();

    cy.getByDataCy('mensagem-erro').should('exist').and('have.text', 'O campo email é obrigatório');
  })
})
