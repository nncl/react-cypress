describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should register user successfully', () => {
    cy.getByDataCy('botao-cadastro').click();
    cy.getByDataCy('nome-input').type('John Wick');
    cy.getByDataCy('email-input').type(`damn-${new Date().getTime()}@bro.com.br`);
    cy.getByDataCy('senha-input').type('123456');

    cy.getByDataCy('botao-enviar').click();

    cy.getByDataCy('mensagem-sucesso').should('exist').and('have.text', 'Usuário cadastrado com sucesso!');
  })

  it('should NOT allow an empty e-mail', () => {
    cy.getByDataCy('botao-cadastro').click();
    // cy.getByDataCy('email-input').type(''); NO NEED
    cy.getByDataCy('senha-input').type('123456');

    cy.getByDataCy('botao-enviar').click();

    cy.getByDataCy('mensagem-erro').should('exist').and('have.text', 'O campo email é obrigatório');
  })

  it('should NOT allow an empty name', () => {
    cy.getByDataCy('botao-cadastro').click();
    cy.getByDataCy('email-input').type(`damn-${new Date().getTime()}@bro.com.br`);
    cy.getByDataCy('senha-input').type('123456');

    cy.getByDataCy('botao-enviar').click();

    cy.getByDataCy('mensagem-erro').should('exist').and('have.text', 'O campo de nome é obrigatório');
  })
})
