describe('LoginForm spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should NOT submit form when e-mail is invalid', () => {
    cy.getByDataCy('botao-login').click();
    cy.getByDataCy('email-input').type('damn@bro');
    cy.getByDataCy('senha-input').type('123456');

    cy.getByDataCy('botao-enviar').click();

    cy.getByDataCy('mensagem-erro').should('exist').and('have.text', 'O email digitado é inválido');
  })
})
